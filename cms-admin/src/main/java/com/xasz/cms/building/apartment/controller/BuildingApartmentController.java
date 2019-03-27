package com.xasz.cms.building.apartment.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.building.apartment.entity.BuildingApartmentFormMap;
import com.xasz.cms.building.apartment.service.BuildingApartmentService;
import com.xasz.cms.building.type.entity.BuildingTypeFormMap;
import com.xasz.cms.building.type.service.BuildingTypeService;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.website.advertisement.entity.AdvertisementFormMap;

@Controller
@Scope("request")
@RequestMapping("/building/apartment/")
public class BuildingApartmentController extends BaseController {

	@Inject
	private BuildingApartmentService apartmentService;

	@Inject
	private BuildingTypeService buildingTypeService;
	
	@Inject
	private IDService idService;
	
	@RequestMapping("list")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		model.addAttribute("types", buildingTypeService.findAll());
		return Common.BACKGROUND_PATH + "/building/apartment/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		BuildingTypeFormMap buildingTypeFormMap = new BuildingTypeFormMap();
		buildingTypeFormMap = toFormMap(buildingTypeFormMap, page, rows);
		String queryparam = request.getParameter("queryparam");
		String type_id = request.getParameter("type_id");

		buildingTypeFormMap.put("queryparam", queryparam);
		buildingTypeFormMap.put("name", queryparam);
		buildingTypeFormMap.put("type_id", type_id);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			buildingTypeFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<BuildingApartmentFormMap> cinemaInfoFormMaps = (Page<BuildingApartmentFormMap>) apartmentService
				.findByPage(buildingTypeFormMap);
		List<BuildingApartmentFormMap> formMaps = new ArrayList<BuildingApartmentFormMap>();
		for (BuildingApartmentFormMap map : cinemaInfoFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(cinemaInfoFormMaps.getTotal());
		pageView.setTotal(cinemaInfoFormMaps.getPages());
		return pageView;
	}
	@RequestMapping("addUI")
	@SystemLog(module = "楼盘管理-户型管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());
		model.addAttribute("types", buildingTypeService.findAll());
		return Common.BACKGROUND_PATH + "/building/apartment/add";
	}
	@ResponseBody
	@RequestMapping("add")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-广告管理", methods = "新增广告")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String position = request.getParameter("position");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(position)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		BuildingApartmentFormMap advertisementFormMap = apartmentService.findById(id);
		if (null != advertisementFormMap) {
			AdvertisementFormMap formMap = new AdvertisementFormMap();
			formMap.put("id", id);
			formMap.put("position", position);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				apartmentService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		} else {
			BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
			formMap.put("id", id);
			formMap.put("position", position);
			formMap.put("create_user_id", userId);
			formMap.put("create_user_name", userName);
			formMap.put("create_time", currentDateTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				apartmentService.add(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}

		return "success";
	}
	
}
