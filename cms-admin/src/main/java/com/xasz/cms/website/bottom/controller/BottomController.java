package com.xasz.cms.website.bottom.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.ImgUtil;
import com.xasz.cms.website.bottom.entity.BottomFormMap;
import com.xasz.cms.website.bottom.service.BottomService;

@Controller
@Scope("request")
@RequestMapping("/website/bottom/")
public class BottomController extends BaseController {

	@Inject
	private BottomService bottomService;

	@Inject
	private IDService idService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/website/bottom/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@Transactional(readOnly = true)
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		BottomFormMap bottomFormMap = new BottomFormMap();
		bottomFormMap = toFormMap(bottomFormMap, page, rows);
		String queryparam = request.getParameter("queryparam");

		bottomFormMap.put("queryparam", queryparam);
		bottomFormMap.put("name", queryparam);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			bottomFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<BottomFormMap> bottomFormMaps = (Page<BottomFormMap>) bottomService.findByPage(bottomFormMap);
		List<BottomFormMap> formMaps = new ArrayList<BottomFormMap>();
		for (BottomFormMap map : bottomFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(bottomFormMaps.getTotal());
		pageView.setTotal(bottomFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());
		return Common.BACKGROUND_PATH + "/website/bottom/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "新增底部链接")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String webUrl = request.getParameter("webUrl");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(name)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		BottomFormMap bottomFormMap = bottomService.findById(id);
		if (null != bottomFormMap) {
			BottomFormMap formMap = new BottomFormMap();
			formMap.put("id", id);
			formMap.put("name", name);
			if(StringUtils.isNotBlank(webUrl)) {
				formMap.put("web_url", webUrl);
			}
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				bottomService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		} else {
			BottomFormMap formMap = new BottomFormMap();
			formMap.put("id", id);
			formMap.put("name", name);
			if(StringUtils.isNotBlank(webUrl)) {
				formMap.put("web_url", webUrl);
			}
			formMap.put("create_user_id", userId);
			formMap.put("create_user_name", userName);
			formMap.put("create_time", currentDateTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				bottomService.add(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("upload")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "上传底部链接图片")
	public String upload(@RequestParam("picUrl") MultipartFile file, HttpServletRequest request) {
		String id = request.getParameter("id");

		if (file.isEmpty() || StringUtils.isBlank(id)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		try {
			String filename = new Date().getTime() + "" + new Random().nextInt() + file.getOriginalFilename()
					.substring(file.getOriginalFilename().indexOf("."), file.getOriginalFilename().length());

			ImgUtil.savePic(file.getInputStream(), filename);

			String url = fileUploadUrl + filename;

			BottomFormMap BottomFormMap = bottomService.findById(id);
			if (null != BottomFormMap) {
				// 保存图片上传信息
				BottomFormMap formMap = new BottomFormMap();
				formMap.put("id", id);
				formMap.put("pic_url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					bottomService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				BottomFormMap formMap = new BottomFormMap();
				formMap.put("id", id);
				formMap.put("pic_url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					bottomService.add(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("deletePhoto")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "删除底部链接图片")
	public String deletePhoto(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		BottomFormMap formMap = new BottomFormMap();
		formMap.put("id", id);
		formMap.put("pic_url", "");
		try {
			bottomService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		BottomFormMap formMap = bottomService.findById(id);
		model.addAttribute("formMap", formMap);
		return Common.BACKGROUND_PATH + "/website/bottom/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "修改底部链接")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String webUrl = request.getParameter("webUrl");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(name)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		BottomFormMap formMap = new BottomFormMap();
		formMap.put("id", id);
		formMap.put("name", name);
		if(StringUtils.isNotBlank(webUrl)) {
			formMap.put("web_url", webUrl);
		}
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			bottomService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-底部链接管理", methods = "删除底部链接")
	public String del(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		if (StringUtils.isBlank(ids)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		String[] idsArraay = ids.split(",");
		for (int i = 0; i < idsArraay.length; i++) {
			String id = idsArraay[i];

			BottomFormMap formMap = new BottomFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				bottomService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	/**
	 * 集团官网底部链接信息请求接口
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findAllList", method = RequestMethod.GET)
	public List<BottomFormMap> findAllList(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		List<BottomFormMap> formMaps = bottomService.findAll();
		return formMaps;
	}

}
