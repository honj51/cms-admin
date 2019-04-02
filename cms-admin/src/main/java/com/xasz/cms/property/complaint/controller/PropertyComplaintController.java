package com.xasz.cms.property.complaint.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.property.complaint.entity.PropertyComplaintFormMap;
import com.xasz.cms.property.complaint.service.PropertyComplaintService;
import com.xasz.cms.property.guarantee.entity.PropertyGuaranteeFormMap;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.websocket.server.Websocket;

@Controller
@Scope("request")
@RequestMapping("/property/complaint")
public class PropertyComplaintController extends BaseController{

	@Inject
	private PropertyComplaintService propertyComplaintService;
	@Inject
	private IDService idService;
	
	@Inject
	private  UserService  userService;
	
	
	@RequestMapping("list")
	@SystemLog(module = "物业管理-投诉记录", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/property/complaint/list";
	}
	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "物业管理-投诉记录", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		PropertyComplaintFormMap propertyComplaintFormMap = new PropertyComplaintFormMap();
		propertyComplaintFormMap = toFormMap(propertyComplaintFormMap, page, rows);
		String state = request.getParameter("state");
		String type_name = request.getParameter("type_name");
		propertyComplaintFormMap.put("type_name", type_name);
		propertyComplaintFormMap.put("state", state);
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			propertyComplaintFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<PropertyComplaintFormMap> adFormMaps = (Page<PropertyComplaintFormMap>) propertyComplaintService.findByPage(propertyComplaintFormMap);
		List<PropertyComplaintFormMap> formMaps = new ArrayList<PropertyComplaintFormMap>();
		for (PropertyComplaintFormMap map : adFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(adFormMaps.getTotal());
		pageView.setTotal(adFormMaps.getPages());
		return pageView;
	}
	@RequestMapping("auditUI")
	@SystemLog(module = "物业管理-投诉处理", methods = "打开页面")
	public String auditUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		PropertyComplaintFormMap formMap = propertyComplaintService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/property/complaint/audit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@SystemLog(module = "物业管理-投诉处理", methods = "处理")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String state = request.getParameter("state");
		String remarks = request.getParameter("remarks");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		PropertyComplaintFormMap formMap = new PropertyComplaintFormMap();
		formMap.put("id", id);
		formMap.put("state", state);
		formMap.put("remarks", remarks);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			propertyComplaintService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}
	@ResponseBody
	@PostMapping("add")
	@SystemLog(module = "物业管理-申请投诉", methods = "申请投诉")
	public String add(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String type_name = request.getParameter("type_name");
		String content = request.getParameter("content");
		String url_one = request.getParameter("url_one");
		String url_two = request.getParameter("url_two");
		String openid = request.getParameter("openid");
		if (StringUtils.isBlank(type_name)) {
			return "fail";
		}
		if (StringUtils.isBlank(content)) {
			return "fail";
		}
		if (StringUtils.isBlank(openid)) {
			return "fail";
		}
		
		PropertyComplaintFormMap formMap = new PropertyComplaintFormMap();
		formMap.put("id", idService.getID());
		formMap.put("type_name", type_name);
		formMap.put("content", content);
		formMap.put("url_one", url_one);
		formMap.put("url_two", url_two);
		formMap.put("openid", openid);
		try {
			propertyComplaintService.add(formMap);;
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		// 发送消息到当前楼盘用户
		List<UserFormMap> userFormMaps = userService.findByDeptId("C35E283F82C442248C95ED68A630A6D7");
			for (UserFormMap userFormMap : userFormMaps) {
				Websocket websocket = new Websocket();
				try {
					websocket.sendToUser((String) userFormMap.get("account_name"), "new_pro_comol_reserve");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		return "success";
	}
	@ResponseBody
	@PostMapping("getComplaintList")
	@SystemLog(module = "物业管理-获取投诉列表", methods = "列表")
	public List<PropertyComplaintFormMap> getComplaintList(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String openid = request.getParameter("openid");
		List<PropertyComplaintFormMap> formMaps = propertyComplaintService.getfindAll(openid);
		return formMaps;
	}
	@ResponseBody
	@PostMapping("getComplaintById")
	@SystemLog(module = "物业管理-获取投诉详情", methods = "详情")
	public PropertyComplaintFormMap getComplaintById(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String id = request.getParameter("id");
		PropertyComplaintFormMap formMaps = propertyComplaintService.findById(id);
		return formMaps;
	}
}
