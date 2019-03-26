package com.xasz.cms.cinemaInfo.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.cinemaInfo.entity.CinemaInfoFormMap;
import com.xasz.cms.cinemaInfo.service.CinemaInfoService;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.ImgUtil;

@Controller
@Scope("request")
@RequestMapping("/cinemaInfo/")
public class CinemaInfoController extends BaseController {

	@Inject
	private CinemaInfoService cinemaInfoService;

	@Inject
	private IDService idService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "影院资讯管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/cinemaInfo/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@Transactional(readOnly = true)
	@SystemLog(module = "影院资讯管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		CinemaInfoFormMap cinemaInfoFormMap = new CinemaInfoFormMap();
		cinemaInfoFormMap = toFormMap(cinemaInfoFormMap, page, rows);
		String type = request.getParameter("type");
		String date = request.getParameter("date");

		cinemaInfoFormMap.put("type", type);
		cinemaInfoFormMap.put("date", date);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			cinemaInfoFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<CinemaInfoFormMap> cinemaInfoFormMaps = (Page<CinemaInfoFormMap>) cinemaInfoService
				.findByPage(cinemaInfoFormMap);
		List<CinemaInfoFormMap> formMaps = new ArrayList<CinemaInfoFormMap>();
		for (CinemaInfoFormMap map : cinemaInfoFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(cinemaInfoFormMaps.getTotal());
		pageView.setTotal(cinemaInfoFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "影院资讯管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());
		return Common.BACKGROUND_PATH + "/cinemaInfo/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@Transactional(readOnly = false)
	@SystemLog(module = "影院资讯管理", methods = "新增广告")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String date = request.getParameter("date");
		String type = request.getParameter("type");
		String title = request.getParameter("title");
		String description = request.getParameter("description");
		String url = request.getParameter("url");

		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		if (StringUtils.isBlank(date)) {
			return "fail";
		}
		if (StringUtils.isBlank(type)) {
			return "fail";
		}
		if (StringUtils.isBlank(title)) {
			return "fail";
		}
		if (StringUtils.isBlank(description)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		CinemaInfoFormMap formMap = new CinemaInfoFormMap();
		formMap.put("id", id);
		formMap.put("date", date);
		formMap.put("type", type);
		formMap.put("title", title);
		formMap.put("description", description);
		if (StringUtils.isNotBlank(url)) {
			formMap.put("url", url);
		}
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			cinemaInfoService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("upload")
	@Transactional(readOnly = false)
	@SystemLog(module = "影院资讯管理", methods = "上传图片")
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

			CinemaInfoFormMap cinemaInfoFormMap = cinemaInfoService.findById(id);
			if (null != cinemaInfoFormMap) {
				// 保存图片上传信息
				CinemaInfoFormMap formMap = new CinemaInfoFormMap();
				formMap.put("id", id);
				formMap.put("pic_url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					cinemaInfoService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				CinemaInfoFormMap formMap = new CinemaInfoFormMap();
				formMap.put("id", id);
				formMap.put("pic_url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					cinemaInfoService.add(formMap);
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
	@SystemLog(module = "影院资讯管理", methods = "删除图片")
	public String deletePhoto(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		CinemaInfoFormMap formMap = new CinemaInfoFormMap();
		formMap.put("id", id);
		formMap.put("pic_url", "");
		try {
			cinemaInfoService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "影院资讯管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		CinemaInfoFormMap formMap = cinemaInfoService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/cinemaInfo/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@Transactional(readOnly = false)
	@SystemLog(module = "影院资讯管理", methods = "修改广告")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String date = request.getParameter("date");
		String type = request.getParameter("type");
		String title = request.getParameter("title");
		String description = request.getParameter("description");
		String url = request.getParameter("url");

		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		if (StringUtils.isBlank(date)) {
			return "fail";
		}
		if (StringUtils.isBlank(type)) {
			return "fail";
		}
		if (StringUtils.isBlank(title)) {
			return "fail";
		}
		if (StringUtils.isBlank(description)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		CinemaInfoFormMap formMap = new CinemaInfoFormMap();
		formMap.put("id", id);
		formMap.put("date", date);
		formMap.put("type", type);
		formMap.put("title", title);
		formMap.put("description", description);
		if (StringUtils.isNotBlank(url)) {
			formMap.put("url", url);
		}
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			cinemaInfoService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@Transactional(readOnly = false)
	@SystemLog(module = "影院资讯管理", methods = "删除广告")
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

			CinemaInfoFormMap formMap = new CinemaInfoFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				cinemaInfoService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

}
