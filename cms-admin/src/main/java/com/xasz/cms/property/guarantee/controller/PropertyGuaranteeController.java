package com.xasz.cms.property.guarantee.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
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
import com.xasz.cms.property.authent.entity.PropertyAuthentFormMap;
import com.xasz.cms.property.guarantee.entity.PropertyGuaranteeFormMap;
import com.xasz.cms.property.guarantee.service.PropertyGuaranteeService;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.websocket.server.Websocket;

@Controller
@Scope("request")
@RequestMapping("/property/guarantee")
public class PropertyGuaranteeController extends BaseController{
	@Inject
	private PropertyGuaranteeService propertyGuaranteeService;

	@Inject
	private IDService idService;
	
	@Inject
	private  UserService  userService;
	
	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;
	
	@RequestMapping("list")
	@SystemLog(module = "物业管理-报修记录", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/property/guarantee/list";
	}
	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "物业管理-报修记录", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		PropertyGuaranteeFormMap propertyGuaranteeFormMap = new PropertyGuaranteeFormMap();
		propertyGuaranteeFormMap = toFormMap(propertyGuaranteeFormMap, page, rows);
		String state = request.getParameter("state");
		String type_name = request.getParameter("type_name");
		String user_name = request.getParameter("user_name");
		String user_phone = request.getParameter("user_phone");
		propertyGuaranteeFormMap.put("user_phone", user_phone);
		propertyGuaranteeFormMap.put("user_name", user_name);
		propertyGuaranteeFormMap.put("type_name", type_name);
		propertyGuaranteeFormMap.put("state", state);
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			propertyGuaranteeFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<PropertyGuaranteeFormMap> adFormMaps = (Page<PropertyGuaranteeFormMap>) propertyGuaranteeService.findByPage(propertyGuaranteeFormMap);
		List<PropertyGuaranteeFormMap> formMaps = new ArrayList<PropertyGuaranteeFormMap>();
		for (PropertyGuaranteeFormMap map : adFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(adFormMaps.getTotal());
		pageView.setTotal(adFormMaps.getPages());
		return pageView;
	}
	@RequestMapping("auditUI")
	@SystemLog(module = "物业管理-报修处理", methods = "打开页面")
	public String auditUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		PropertyGuaranteeFormMap formMap = propertyGuaranteeService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/property/guarantee/audit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@SystemLog(module = "物业管理-报修处理", methods = "处理")
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

		PropertyGuaranteeFormMap formMap = new PropertyGuaranteeFormMap();
		formMap.put("id", id);
		formMap.put("state", state);
		formMap.put("remarks", remarks);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			propertyGuaranteeService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}
	@ResponseBody
	@PostMapping("add")
	@SystemLog(module = "物业管理-申请报修", methods = "申请报修")
	public String add(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String type_name = request.getParameter("type_name");
		String content = request.getParameter("content");
		String user_name = request.getParameter("user_name");
		String user_phone = request.getParameter("user_phone");
		String user_address = request.getParameter("user_address");
		String url_one = request.getParameter("url_one");
		String url_two = request.getParameter("url_two");
		String openid = request.getParameter("openid");
		if (StringUtils.isBlank(type_name)) {
			return "fail";
		}
		if (StringUtils.isBlank(content)) {
			return "fail";
		}
		if (StringUtils.isBlank(user_name)) {
			return "fail";
		}
		if (StringUtils.isBlank(user_phone)) {
			return "fail";
		}
		if (StringUtils.isBlank(user_address)) {
			return "fail";
		}
		if (StringUtils.isBlank(openid)) {
			return "fail";
		}
		
		PropertyGuaranteeFormMap formMap = new PropertyGuaranteeFormMap();
		formMap.put("id", idService.getID());
		formMap.put("type_name", type_name);
		formMap.put("content", content);
		formMap.put("user_name", user_name);
		formMap.put("user_phone", user_phone);
		formMap.put("user_address", user_address);
		formMap.put("url_one", url_one);
		formMap.put("url_two", url_two);
		formMap.put("openid", openid);
		try {
			propertyGuaranteeService.add(formMap);;
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		// 发送消息到当前楼盘用户
		List<UserFormMap> userFormMaps = userService.findByDeptId("C35E283F82C442248C95ED68A630A6D7");
			for (UserFormMap userFormMap : userFormMaps) {
				Websocket websocket = new Websocket();
				try {
					websocket.sendToUser((String) userFormMap.get("account_name"), "new_pro_guar_reserve");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		return "success";
	}
	@ResponseBody
	@PostMapping("getGuaranteeList")
	@SystemLog(module = "物业管理-获取报修列表", methods = "列表")
	public List<PropertyGuaranteeFormMap> getGuaranteeList(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String openid = request.getParameter("openid");
		List<PropertyGuaranteeFormMap> formMaps = propertyGuaranteeService.getfindAll(openid);
		return formMaps;
	}
	@ResponseBody
	@PostMapping("getGuaranteeById")
	@SystemLog(module = "物业管理-获取报修详情", methods = "详情")
	public PropertyGuaranteeFormMap getGuaranteeById(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String id = request.getParameter("id");
		PropertyGuaranteeFormMap formMaps = propertyGuaranteeService.findById(id);
		return formMaps;
	}
	
}

