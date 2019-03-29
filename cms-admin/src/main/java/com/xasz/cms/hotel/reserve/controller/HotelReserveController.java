package com.xasz.cms.hotel.reserve.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.hotel.reserve.entity.HotelReserveFormMap;
import com.xasz.cms.hotel.reserve.service.HotelReserveService;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.websocket.server.Websocket;

@Controller
@Scope("request")
@RequestMapping("/hotel/reserve/")
public class HotelReserveController extends BaseController {

	@Inject
	private HotelReserveService reserveService;

	@Inject
	private IDService idService;

	@Inject
	private UserService userService;

	@RequestMapping("list")
	@SystemLog(module = "酒店管理-预定管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/hotel/reserve/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "酒店管理-预定管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		HotelReserveFormMap reserveFormMap = new HotelReserveFormMap();
		reserveFormMap = toFormMap(reserveFormMap, page, rows);

		String queryparam = request.getParameter("queryparam");
		String reserveStartTime = request.getParameter("reserveStartTime");
		String reserveEndTime = request.getParameter("reserveEndTime");
		String boxType = request.getParameter("boxType");
		String isManage = request.getParameter("isManage");

		reserveFormMap.put("queryparam", queryparam);
		reserveFormMap.put("clientName", queryparam);
		reserveFormMap.put("clientPhone", queryparam);
		reserveFormMap.put("reserveStartTime", reserveStartTime);
		reserveFormMap.put("reserveEndTime", reserveEndTime);
		reserveFormMap.put("boxType", boxType);
		reserveFormMap.put("isManage", isManage);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			reserveFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<HotelReserveFormMap> reserveFormMaps = (Page<HotelReserveFormMap>) reserveService
				.findByPage(reserveFormMap);
		List<HotelReserveFormMap> formMaps = new ArrayList<HotelReserveFormMap>();
		for (HotelReserveFormMap map : reserveFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(reserveFormMaps.getTotal());
		pageView.setTotal(reserveFormMaps.getPages());
		return pageView;
	}

	@ResponseBody
	@RequestMapping("manage")
	@SystemLog(module = "酒店管理-预定管理", methods = "处理预定")
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
			HotelReserveFormMap formMap = new HotelReserveFormMap();
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
	 * 酒店预定请求接口
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addReserve", method = RequestMethod.POST)
	public String addReserve(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		String reserveTime = request.getParameter("reserveTime");
		String personNum = request.getParameter("personNum");
		String boxType = request.getParameter("boxType");
		String clientName = request.getParameter("clientName");
		String clientPhone = request.getParameter("clientPhone");
		String remarks = request.getParameter("remarks");

		if (StringUtils.isBlank(reserveTime) || StringUtils.isBlank(personNum) || StringUtils.isBlank(boxType)
				|| StringUtils.isBlank(clientName) || StringUtils.isBlank(clientPhone)) {
			return "fail";
		}
		
		reserveTime = reserveTime.replaceAll("T", " ");
		
		HotelReserveFormMap formMap = new HotelReserveFormMap();
		formMap.put("id", idService.getID());
		formMap.put("reserve_time", reserveTime);
		formMap.put("person_num", personNum);
		formMap.put("box_type", boxType);
		formMap.put("client_name", clientName);
		formMap.put("client_phone", clientPhone);
		formMap.put("remarks", remarks);

		try {
			reserveService.add(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "reserve_fail";
		}

		// 发送消息到当前酒店用户
		List<UserFormMap> userFormMaps = userService.findByDeptId("E56F56C281C748CAACB589648F18676B");
		for (UserFormMap userFormMap : userFormMaps) {
			Websocket websocket = new Websocket();
			try {
				websocket.sendToUser((String) userFormMap.get("account_name"), "new_hotel_reserve");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return "success";
	}

}
