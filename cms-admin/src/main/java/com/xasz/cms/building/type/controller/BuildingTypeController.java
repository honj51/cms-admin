package com.xasz.cms.building.type.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.building.type.entity.BuildingTypeFormMap;
import com.xasz.cms.building.type.service.BuildingTypeService;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;

@Controller
@Scope("request")
@RequestMapping("/building/type/")
public class BuildingTypeController extends BaseController {

	@Inject
	private BuildingTypeService typeService;

	@Inject
	private IDService idService;

	@RequestMapping("list")
	@SystemLog(module = "楼盘管理-户型类型管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/building/type/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@Transactional(readOnly = true)
	@SystemLog(module = "楼盘管理-户型类型管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		BuildingTypeFormMap buildingTypeFormMap = new BuildingTypeFormMap();
		buildingTypeFormMap = toFormMap(buildingTypeFormMap, page, rows);
		String queryparam = request.getParameter("queryparam");

		buildingTypeFormMap.put("queryparam", queryparam);
		buildingTypeFormMap.put("name", queryparam);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			buildingTypeFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<BuildingTypeFormMap> cinemaInfoFormMaps = (Page<BuildingTypeFormMap>) typeService
				.findByPage(buildingTypeFormMap);
		List<BuildingTypeFormMap> formMaps = new ArrayList<BuildingTypeFormMap>();
		for (BuildingTypeFormMap map : cinemaInfoFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(cinemaInfoFormMaps.getTotal());
		pageView.setTotal(cinemaInfoFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "楼盘管理-户型类型管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request) {
		return Common.BACKGROUND_PATH + "/building/type/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@Transactional(readOnly = false)
	@SystemLog(module = "楼盘管理-户型类型管理", methods = "新增类型")
	public String add(HttpServletRequest request) {
		String name = request.getParameter("name");
		String remarks = request.getParameter("remarks");

		if (StringUtils.isBlank(name)) {
			return "fail";
		}

		// 判断改名称类型是否存在
		BuildingTypeFormMap formMap = new BuildingTypeFormMap();
		formMap.put("name", name);
		List<BuildingTypeFormMap> formMaps = typeService.findByName(formMap);
		if (formMaps.size() > 0) {
			return "duplicate_name";
		}

		// 获取登陆用户信息
		UserFormMap theformMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) theformMap.get("id");
		String userName = (String) theformMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		BuildingTypeFormMap addFormMap = new BuildingTypeFormMap();
		addFormMap.put("id", idService.getID());
		addFormMap.put("name", name);
		if (StringUtils.isNotBlank(remarks)) {
			addFormMap.put("remarks", remarks);
		}
		addFormMap.put("create_user_id", userId);
		addFormMap.put("create_user_name", userName);
		addFormMap.put("create_time", currentDateTime);
		addFormMap.put("update_user_id", userId);
		addFormMap.put("update_user_name", userName);
		addFormMap.put("update_time", currentDateTime);

		try {
			typeService.add(addFormMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "楼盘管理-户型类型管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		model.addAttribute("formMap", typeService.findById(id));
		return Common.BACKGROUND_PATH + "/building/type/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@Transactional(readOnly = false)
	@SystemLog(module = "楼盘管理-户型类型管理", methods = "新增类型")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String remarks = request.getParameter("remarks");

		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		if (StringUtils.isBlank(name)) {
			return "fail";
		}

		// 判断改名称类型是否存在
		BuildingTypeFormMap formMap = new BuildingTypeFormMap();
		formMap.put("id", id);
		formMap.put("name", name);
		List<BuildingTypeFormMap> formMaps = typeService.findByName(formMap);
		if (formMaps.size() > 0) {
			return "duplicate_name";
		}

		// 获取登陆用户信息
		UserFormMap theformMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) theformMap.get("id");
		String userName = (String) theformMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		BuildingTypeFormMap addFormMap = new BuildingTypeFormMap();
		addFormMap.put("id", id);
		addFormMap.put("name", name);
		if (StringUtils.isNotBlank(remarks)) {
			addFormMap.put("remarks", remarks);
		}
		addFormMap.put("update_user_id", userId);
		addFormMap.put("update_user_name", userName);
		addFormMap.put("update_time", currentDateTime);

		try {
			typeService.updateById(addFormMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-部门管理", methods = "删除部门")
	public String del(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		if (StringUtils.isBlank(ids)) {
			return "fail";
		}

		// 获取登陆用户信息
		UserFormMap theformMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) theformMap.get("id");
		String userName = (String) theformMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		String[] idsArray = ids.split(",");
		for (String id : idsArray) {
			BuildingTypeFormMap formMap = new BuildingTypeFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);

			try {
				typeService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}

		}

		return "success";
	}

	@ResponseBody
	@GetMapping("findAll")
	public List<BuildingTypeFormMap> findAll(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		return typeService.findAll();
	}

}
