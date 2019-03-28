package com.xasz.cms.building.reserve.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.building.apartment.entity.BuildingApartmentFormMap;
import com.xasz.cms.building.apartment.service.BuildingApartmentService;
import com.xasz.cms.building.reserve.entity.BuildingReserveFormMap;
import com.xasz.cms.building.reserve.service.BuildingReserveService;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.websocket.server.Websocket;

@Controller
@Scope("request")
@RequestMapping("/building/reserve/")
public class BuildingReserveController extends BaseController {

	@Inject
	private BuildingReserveService reserveService;

	@Inject
	private BuildingApartmentService apartmentService;

	@Inject
	private IDService idService;

	@Inject
	private UserService userService;

	@RequestMapping("list")
	@SystemLog(module = "楼盘管理-预定管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/building/reserve/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "楼盘管理-预定管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		BuildingReserveFormMap reserveFormMap = new BuildingReserveFormMap();
		reserveFormMap = toFormMap(reserveFormMap, page, rows);

		String queryparam = request.getParameter("queryparam");
		String reserveStartTime = request.getParameter("reserveStartTime");
		String reserveEndTime = request.getParameter("reserveEndTime");
		String isManage = request.getParameter("isManage");

		reserveFormMap.put("queryparam", queryparam);
		reserveFormMap.put("apartmentName", queryparam);
		reserveFormMap.put("clientName", queryparam);
		reserveFormMap.put("clientPhone", queryparam);
		reserveFormMap.put("reserveStartTime", reserveStartTime);
		reserveFormMap.put("reserveEndTime", reserveEndTime);
		reserveFormMap.put("isManage", isManage);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			reserveFormMap.put("orderbypart", sidx + " " + sord);
		}

		Page<BuildingReserveFormMap> reserveFormMaps = (Page<BuildingReserveFormMap>) reserveService
				.findByPage(reserveFormMap);
		List<BuildingReserveFormMap> formMaps = new ArrayList<BuildingReserveFormMap>();
		for (BuildingReserveFormMap map : reserveFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(reserveFormMaps.getTotal());
		pageView.setTotal(reserveFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("manageUI")
	@SystemLog(module = "楼盘管理-预定管理", methods = "打开预约处理页面")
	public String manageUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		model.addAttribute("id", id);
		return Common.BACKGROUND_PATH + "/building/reserve/manage";
	}

	@ResponseBody
	@RequestMapping("manage")
	@Transactional(readOnly = false)
	@SystemLog(module = "楼盘管理-预定管理", methods = "处理预定")
	public String manage(HttpServletRequest request) {
		String id = request.getParameter("id");
		String manageResult = request.getParameter("manageResult");
		String manageTime = request.getParameter("manageTime");
		String manageUserName = request.getParameter("manageUserName");
		String manageUserPhone = request.getParameter("manageUserPhone");

		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		if (StringUtils.isBlank(manageResult) || StringUtils.isBlank(manageTime)) {
			return "fail";
		}
		if (StringUtils.isBlank(manageUserName) || StringUtils.isBlank(manageUserPhone)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		BuildingReserveFormMap formMap = new BuildingReserveFormMap();
		formMap.put("id", id);
		formMap.put("is_manage", String.valueOf(Constants.YES));
		formMap.put("manage_result", manageResult);
		formMap.put("manage_time", manageTime);
		formMap.put("manage_user_name", manageUserName);
		formMap.put("manage_user_phone", manageUserPhone);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);

		try {
			reserveService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}

	/**
	 * 楼盘预定请求接口
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addReserve", method = RequestMethod.POST)
	public String addReserve(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		String appartmentId = request.getParameter("apartmentId");
		String reserveTime = request.getParameter("reserveTime");
		String clientName = request.getParameter("clientName");
		String clientPhone = request.getParameter("clientPhone");
		String remarks = request.getParameter("remarks");

		if (StringUtils.isBlank(appartmentId) || StringUtils.isBlank(reserveTime) || StringUtils.isBlank(clientName)
				|| StringUtils.isBlank(clientPhone)) {
			return "fail";
		}

		// 查询户型信息
		BuildingApartmentFormMap apartmentFormMap = apartmentService.findById(appartmentId);
		if (null == apartmentFormMap) {
			return "no_apartment";
		}

		reserveTime = reserveTime.replaceAll("T", " ");

		BuildingReserveFormMap formMap = new BuildingReserveFormMap();
		formMap.put("id", idService.getID());
		formMap.put("appartment_id", appartmentId);
		formMap.put("appartment_name", (String) apartmentFormMap.get("name"));
		formMap.put("reserve_time", reserveTime);
		formMap.put("client_name", clientName);
		formMap.put("client_phone", clientPhone);
		formMap.put("remarks", remarks);

		try {
			reserveService.add(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "reserve_fail";
		}

		// 发送消息到当前楼盘用户
		List<UserFormMap> userFormMaps = userService.findByDeptId("2B23BE5BA39845009869381DE7278660");
		for (UserFormMap userFormMap : userFormMaps) {
			Websocket websocket = new Websocket();
			try {
				websocket.sendToUser((String) userFormMap.get("account_name"), "new_apartment_reserve");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return "success";
	}

}
