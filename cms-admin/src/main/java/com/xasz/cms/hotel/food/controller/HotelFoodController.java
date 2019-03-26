package com.xasz.cms.hotel.food.controller;

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

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.hotel.food.entity.HotelFoodFormMap;
import com.xasz.cms.hotel.food.service.HotelFoodService;
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
@RequestMapping("/hotel/food/")
public class HotelFoodController extends BaseController {

	@Inject
	private HotelFoodService foodService;

	@Inject
	private IDService idService;

	@Inject
	private HotelPropService propService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/hotel/food/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@Transactional(readOnly = true)
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		String queryParam = request.getParameter("queryparam");
		String starLevel = request.getParameter("starLevel");

		HotelFoodFormMap foodFormMap = new HotelFoodFormMap();

		foodFormMap = toFormMap(foodFormMap, page, rows);
		foodFormMap.put("queryParam", queryParam);
		foodFormMap.put("starLevel", starLevel);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			foodFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<HotelFoodFormMap> hotelFoodFormMaps = (Page<HotelFoodFormMap>) foodService.findByPage(foodFormMap);
		List<HotelFoodFormMap> formMaps = new ArrayList<HotelFoodFormMap>();
		for (HotelFoodFormMap map : hotelFoodFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(hotelFoodFormMaps.getTotal());
		pageView.setTotal(hotelFoodFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());
		return Common.BACKGROUND_PATH + "/hotel/food/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@Transactional(readOnly = false)
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "新增宣传")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String title = request.getParameter("title");
		String starLevel = request.getParameter("starLevel");
		String content = request.getParameter("content");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(title)) {
			return "fail";
		}
		if (StringUtils.isBlank(starLevel) || StringUtils.isBlank(content)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		HotelFoodFormMap HotelFoodFormMap = foodService.findById(id);
		if (null != HotelFoodFormMap) {
			HotelFoodFormMap formMap = new HotelFoodFormMap();
			formMap.put("id", id);
			formMap.put("title", title);
			formMap.put("star_level", starLevel);
			formMap.put("content", content);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				foodService.updateById(formMap);
			} catch (Exception e) {
			}
		} else {
			HotelFoodFormMap formMap = new HotelFoodFormMap();
			formMap.put("id", id);
			formMap.put("title", title);
			formMap.put("star_level", starLevel);
			formMap.put("content", content);
			formMap.put("create_user_id", userId);
			formMap.put("create_user_name", userName);
			formMap.put("create_time", currentDateTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				foodService.add(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("uploadFirst")
	@Transactional(readOnly = false)
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "上传图片")
	public String uploadFirst(@RequestParam("firstUrl") MultipartFile file, HttpServletRequest request) {
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

			HotelFoodFormMap HotelFoodFormMap = foodService.findById(id);
			if (null != HotelFoodFormMap) {
				// 保存图片上传信息
				HotelFoodFormMap formMap = new HotelFoodFormMap();
				formMap.put("id", id);
				formMap.put("first_url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					foodService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				HotelFoodFormMap formMap = new HotelFoodFormMap();
				formMap.put("id", id);
				formMap.put("first_url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					foodService.add(formMap);
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
	@RequestMapping("uploadSecond")
	@Transactional(readOnly = false)
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "上传图片")
	public String uploadSecond(@RequestParam("secondUrl") MultipartFile file, HttpServletRequest request) {
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

			HotelFoodFormMap HotelFoodFormMap = foodService.findById(id);
			if (null != HotelFoodFormMap) {
				// 保存图片上传信息
				HotelFoodFormMap formMap = new HotelFoodFormMap();
				formMap.put("id", id);
				formMap.put("second_url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					foodService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				HotelFoodFormMap formMap = new HotelFoodFormMap();
				formMap.put("id", id);
				formMap.put("second_url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					foodService.add(formMap);
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
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "删除图片")
	public String deletePhoto(HttpServletRequest request) {
		String id = request.getParameter("id");
		String position = request.getParameter("position");

		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		HotelFoodFormMap formMap = new HotelFoodFormMap();
		formMap.put("id", id);
		if (position.equals("first")) {
			formMap.put("first_url", "");
		}
		if (position.equals("second")) {
			formMap.put("second_url", "");
		}
		try {
			foodService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		HotelFoodFormMap formMap = foodService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/hotel/food/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@Transactional(readOnly = false)
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "修改宣传")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String title = request.getParameter("title");
		String starLevel = request.getParameter("starLevel");
		String content = request.getParameter("content");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(title)) {
			return "fail";
		}
		if (StringUtils.isBlank(starLevel) || StringUtils.isBlank(content)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		HotelFoodFormMap formMap = new HotelFoodFormMap();
		formMap.put("id", id);
		formMap.put("title", title);
		formMap.put("star_level", starLevel);
		formMap.put("content", content);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			foodService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@Transactional(readOnly = false)
	@SystemLog(module = "酒店管理-当日餐品管理", methods = "删除广告")
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

			HotelFoodFormMap formMap = new HotelFoodFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				foodService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	/**
	 * 当日餐品请求接口
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findAll", method = RequestMethod.GET)
	public JSONObject findAll(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		JSONObject result = new JSONObject();

		// 当日餐品
		List<HotelFoodFormMap> formMaps = foodService.findAll();

		HotelPropFormMap formMap = new HotelPropFormMap();
		formMap.put("type", "2");
		// 餐品轮播图
		List<HotelPropFormMap> propFormMaps = propService.findAll(formMap);

		result.put("foods", formMaps);
		result.put("images", propFormMaps);

		return result;
	}

}
