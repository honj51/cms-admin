package com.xasz.cms.hotel.info.controller;

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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.hotel.info.entity.HotelInfoFormMap;
import com.xasz.cms.hotel.info.service.HotelInfoService;
import com.xasz.cms.hotel.prop.entity.HotelPropFormMap;
import com.xasz.cms.hotel.prop.service.HotelPropService;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.ImgUtil;

@Controller
@Scope("request")
@RequestMapping("/hotel/info/")
public class HotelInfoController extends BaseController {

	@Inject
	private HotelInfoService infoService;

	@Inject
	private IDService idService;

	@Inject
	private HotelPropService propService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/hotel/info/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		HotelInfoFormMap hotelInfoFormMap = new HotelInfoFormMap();
		hotelInfoFormMap = toFormMap(hotelInfoFormMap, page, rows);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			hotelInfoFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<HotelInfoFormMap> hotelInfoFormMaps = (Page<HotelInfoFormMap>) infoService.findByPage(hotelInfoFormMap);
		List<HotelInfoFormMap> formMaps = new ArrayList<HotelInfoFormMap>();
		for (HotelInfoFormMap map : hotelInfoFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(hotelInfoFormMaps.getTotal());
		pageView.setTotal(hotelInfoFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());
		return Common.BACKGROUND_PATH + "/hotel/info/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "新增宣传")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String businessTime = request.getParameter("businessTime");
		String phone = request.getParameter("phone");
		String info = request.getParameter("info");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(businessTime)) {
			return "fail";
		}
		if (StringUtils.isBlank(phone) || StringUtils.isBlank(info)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		HotelInfoFormMap HotelInfoFormMap = infoService.findById(id);
		if (null != HotelInfoFormMap) {
			HotelInfoFormMap formMap = new HotelInfoFormMap();
			formMap.put("id", id);
			formMap.put("business_time", businessTime);
			formMap.put("phone", phone);
			formMap.put("info", info);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				infoService.updateById(formMap);
			} catch (Exception e) {
			}
		} else {
			HotelInfoFormMap formMap = new HotelInfoFormMap();
			formMap.put("id", id);
			formMap.put("business_time", businessTime);
			formMap.put("phone", phone);
			formMap.put("info", info);
			formMap.put("create_user_id", userId);
			formMap.put("create_user_name", userName);
			formMap.put("create_time", currentDateTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				infoService.add(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("upload")
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "上传图片")
	public String upload(@RequestParam("addressUrl") MultipartFile file, HttpServletRequest request) {
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

			HotelInfoFormMap HotelInfoFormMap = infoService.findById(id);
			if (null != HotelInfoFormMap) {
				// 保存图片上传信息
				HotelInfoFormMap formMap = new HotelInfoFormMap();
				formMap.put("id", id);
				formMap.put("address_url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					infoService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				HotelInfoFormMap formMap = new HotelInfoFormMap();
				formMap.put("id", id);
				formMap.put("address_url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					infoService.add(formMap);
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
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "删除图片")
	public String deletePhoto(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		HotelInfoFormMap formMap = new HotelInfoFormMap();
		formMap.put("id", id);
		formMap.put("address_url", "");
		try {
			infoService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		HotelInfoFormMap formMap = infoService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/hotel/info/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "修改宣传")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String businessTime = request.getParameter("businessTime");
		String phone = request.getParameter("phone");
		String info = request.getParameter("info");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(businessTime)) {
			return "fail";
		}
		if (StringUtils.isBlank(phone) || StringUtils.isBlank(info)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		HotelInfoFormMap formMap = new HotelInfoFormMap();
		formMap.put("id", id);
		formMap.put("business_time", businessTime);
		formMap.put("phone", phone);
		formMap.put("info", info);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			infoService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@SystemLog(module = "酒店管理-酒店信息管理", methods = "删除广告")
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

			HotelInfoFormMap formMap = new HotelInfoFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				infoService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	/**
	 * 酒店信息请求接口
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findHotelInfo", method = RequestMethod.GET)
	public JSONObject findHotelInfo(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		JSONObject result = new JSONObject();

		// 酒店信息
		HotelInfoFormMap formMap = infoService.findHotelInfo();

		// 酒店轮播图
		HotelPropFormMap propFormMap = new HotelPropFormMap();
		propFormMap.put("type", "1");
		// 餐品轮播图
		List<HotelPropFormMap> propFormMaps = propService.findAll(propFormMap);

		result.put("info", formMap);
		result.put("images", propFormMaps);

		return result;
	}

}
