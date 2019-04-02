package com.xasz.cms.property.authent.controller;

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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.building.ad.entity.BuildingAdFormMap;
import com.xasz.cms.building.apartment.entity.BuildingApartmentFormMap;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.property.authent.entity.PropertyAuthentFormMap;
import com.xasz.cms.property.authent.service.PropertyAuthentService;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.ImgUtil;
import com.xasz.cms.websocket.server.Websocket;

import net.sf.json.JSONObject;

@Controller
@Scope("request")
@RequestMapping("/property/authent")
public class PropertyAuthentController extends BaseController{

	@Inject
	private PropertyAuthentService propertyAuthentService;

	@Inject
	private IDService idService;
	
	@Inject
	private  UserService  userService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "物业管理-业主认证", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/property/authent/list";
	}
	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "物业管理-业主认证", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		PropertyAuthentFormMap propertyAuthentFormMap = new PropertyAuthentFormMap();
		propertyAuthentFormMap = toFormMap(propertyAuthentFormMap, page, rows);
		String state = request.getParameter("state");
		String idcord = request.getParameter("idcord");
		String name = request.getParameter("name");
		propertyAuthentFormMap.put("name", name);
		propertyAuthentFormMap.put("idcord", idcord);
		propertyAuthentFormMap.put("state", state);
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			propertyAuthentFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<PropertyAuthentFormMap> adFormMaps = (Page<PropertyAuthentFormMap>) propertyAuthentService.findByPage(propertyAuthentFormMap);
		List<PropertyAuthentFormMap> formMaps = new ArrayList<PropertyAuthentFormMap>();
		for (PropertyAuthentFormMap map : adFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(adFormMaps.getTotal());
		pageView.setTotal(adFormMaps.getPages());
		return pageView;
	}
	@RequestMapping("auditUI")
	@SystemLog(module = "物业管理-业主认证审核", methods = "打开页面")
	public String auditUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		PropertyAuthentFormMap formMap = propertyAuthentService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/property/authent/audit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@SystemLog(module = "物业管理-业主认证审核", methods = "审核")
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

		PropertyAuthentFormMap formMap = new PropertyAuthentFormMap();
		formMap.put("id", id);
		formMap.put("state", state);
		formMap.put("remarks", remarks);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			propertyAuthentService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}
	@ResponseBody
	@PostMapping("add")
	@SystemLog(module = "物业管理-业主认证", methods = "进行认证")
	public String add(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String name = request.getParameter("name");
		String address = request.getParameter("address");
		String mobile = request.getParameter("mobile");
		String idcord = request.getParameter("idcord");
		String id_url = request.getParameter("id_url");
		String openid = request.getParameter("openid");
		String id_urls = request.getParameter("id_urls");
		if (StringUtils.isBlank(name)) {
			return "fail";
		}
		if (StringUtils.isBlank(address)) {
			return "fail";
		}
		if (StringUtils.isBlank(mobile)) {
			return "fail";
		}
		if (StringUtils.isBlank(idcord)) {
			return "fail";
		}
		if (StringUtils.isBlank(id_url)) {
			return "fail";
		}
		if (StringUtils.isBlank(openid)) {
			return "fail";
		}
		if (StringUtils.isBlank(id_urls)) {
			return "fail";
		}
		
		PropertyAuthentFormMap formMap = new PropertyAuthentFormMap();
		formMap.put("id", idService.getID());
		formMap.put("name", name);
		formMap.put("address", address);
		formMap.put("mobile", mobile);
		formMap.put("idcord", idcord);
		formMap.put("id_url", id_url);
		formMap.put("openid", openid);
		formMap.put("id_urls", id_urls);
		try {
			propertyAuthentService.add(formMap);;
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		// 发送消息到当前楼盘用户
		List<UserFormMap> userFormMaps = userService.findByDeptId("C35E283F82C442248C95ED68A630A6D7");
			for (UserFormMap userFormMap : userFormMaps) {
				Websocket websocket = new Websocket();
				try {
					websocket.sendToUser((String) userFormMap.get("account_name"), "new_pro_auth_reserve");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		return "success";
	}
	@ResponseBody
	@PostMapping("getAuthent")
	@SystemLog(module = "物业管理-获取认证结果", methods = "如果有一条审核通过的业主信息进入下一个页面")
	public String getAuthent(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String openid = request.getParameter("openid");
		if (StringUtils.isBlank(openid)) {
			return "fail";
		}
		try {
			PropertyAuthentFormMap formMap = propertyAuthentService.getfindById(openid);
			if(formMap==null){
				return "fail";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		
		return "success";
	}
	@ResponseBody
	@PostMapping("getAuthentList")
	@SystemLog(module = "物业管理-获取认证列表", methods = "列表")
	public List<PropertyAuthentFormMap> getAuthentList(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String openid = request.getParameter("openid");
		List<PropertyAuthentFormMap> formMaps = propertyAuthentService.getfindAll(openid);

		return formMaps;
	}
	@ResponseBody
	@PostMapping("getAuthentSucList")
	@SystemLog(module = "物业管理-获取已认证认证列表", methods = "列表")
	public List<PropertyAuthentFormMap> getAuthentSucList(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String openid = request.getParameter("openid");
		List<PropertyAuthentFormMap> formMaps = propertyAuthentService.getfindAllScee(openid);
		
		return formMaps;
	}
	@ResponseBody
	@PostMapping("getAuthentById")
	@SystemLog(module = "物业管理-获取认证详情", methods = "详情")
	public PropertyAuthentFormMap getAuthentById(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		String id = request.getParameter("id");
		PropertyAuthentFormMap formMaps = propertyAuthentService.findById(id);
		return formMaps;
	}
	@ResponseBody
	@PostMapping("fileupload")
	@SystemLog(module = "所有的图片上传", methods = "上传广告图片")
	public String upload(@RequestParam("url") MultipartFile file, HttpServletRequest request) throws IOException {
		String filename = new Date().getTime() + "" + new Random().nextInt() + file.getOriginalFilename()
				.substring(file.getOriginalFilename().indexOf("."), file.getOriginalFilename().length());
		ImgUtil.savePic(file.getInputStream(), filename);

		String url = fileUploadUrl + filename;
		return url;
	}
	
}
