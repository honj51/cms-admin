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

	@ResponseBody
	@RequestMapping("manage")
	@Transactional(readOnly = false)
	@SystemLog(module = "楼盘管理-预定管理", methods = "处理预定")
	public String manage(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		String type = request.getParameter("type");

		if (StringUtils.isBlank(ids) || StringUtils.isBlank(type)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		String[] idsArray = ids.split(",");
		for (String id : idsArray) {
			BuildingReserveFormMap formMap = new BuildingReserveFormMap();
			formMap.put("id", id);
			if (type.equals("yes")) {
				formMap.put("is_manage", String.valueOf(Constants.YES));
			} else if (type.equals("no")) {
				formMap.put("is_manage", String.valueOf(Constants.NO));
			}
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);

			try {
				reserveService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
			}
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

		String reserveTime = request.getParameter("reserveTime");
		String clientName = request.getParameter("clientName");
		String clientPhone = request.getParameter("clientPhone");
		String remarks = request.getParameter("remarks");

		if (StringUtils.isBlank(reserveTime) || StringUtils.isBlank(clientName) || StringUtils.isBlank(clientPhone)) {
			return "fail";
		}

		reserveTime = reserveTime.replaceAll("T", " ");

		BuildingReserveFormMap formMap = new BuildingReserveFormMap();
		formMap.put("id", idService.getID());
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
