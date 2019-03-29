package com.xasz.cms.website.group.controller;

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

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.ImgUtil;
import com.xasz.cms.website.group.entity.GroupFormMap;
import com.xasz.cms.website.group.service.GroupService;

@Controller
@Scope("request")
@RequestMapping("/website/group")
public class GroupController extends BaseController {

	@Inject
	private GroupService groupService;

	@Inject
	private IDService idService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "集团官网管理-集团管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/website/group/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "集团官网管理-集团管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		GroupFormMap groupFormMap = new GroupFormMap();
		groupFormMap = toFormMap(groupFormMap, page, rows);
		String position = request.getParameter("position");

		groupFormMap.put("position", position);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			groupFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<GroupFormMap> groupFormMaps = (Page<GroupFormMap>) groupService.findByPage(groupFormMap);
		List<GroupFormMap> formMaps = new ArrayList<GroupFormMap>();
		for (GroupFormMap map : groupFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(groupFormMaps.getTotal());
		pageView.setTotal(groupFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "集团官网管理-集团管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());
		return Common.BACKGROUND_PATH + "/website/group/add";
	}

	@ResponseBody
	@RequestMapping("add")
	
	@SystemLog(module = "集团官网管理-集团管理", methods = "新增集团")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String content = request.getParameter("content");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(name)) {
			return "fail";
		}
		if (StringUtils.isBlank(content)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		GroupFormMap groupFormMap = groupService.findById(id);
		if (null != groupFormMap) {
			GroupFormMap formMap = new GroupFormMap();
			formMap.put("id", id);
			formMap.put("name", name);
			formMap.put("content", content);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				groupService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		} else {
			GroupFormMap formMap = new GroupFormMap();
			formMap.put("id", id);
			formMap.put("name", name);
			formMap.put("content", content);
			formMap.put("create_user_id", userId);
			formMap.put("create_user_name", userName);
			formMap.put("create_time", currentDateTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				groupService.add(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("upload")
	
	@SystemLog(module = "集团官网管理-集团管理", methods = "上传集团图片")
	public String upload(@RequestParam("url") MultipartFile file, HttpServletRequest request) {
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

			GroupFormMap groupFormMap = groupService.findById(id);
			if (null != groupFormMap) {
				// 保存图片上传信息
				GroupFormMap formMap = new GroupFormMap();
				formMap.put("id", id);
				formMap.put("url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					groupService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				GroupFormMap formMap = new GroupFormMap();
				formMap.put("id", id);
				formMap.put("url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					groupService.add(formMap);
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
	
	@SystemLog(module = "集团官网管理-集团管理", methods = "删除集团图片")
	public String deletePhoto(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		GroupFormMap formMap = new GroupFormMap();
		formMap.put("id", id);
		formMap.put("url", "");
		try {
			groupService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "集团官网管理-集团管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		GroupFormMap formMap = groupService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/website/group/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	
	@SystemLog(module = "集团官网管理-集团管理", methods = "修改集团")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String content = request.getParameter("content");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(name)) {
			return "fail";
		}
		if (StringUtils.isBlank(content)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		GroupFormMap formMap = new GroupFormMap();
		formMap.put("id", id);
		formMap.put("name", name);
		formMap.put("content", content);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			groupService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	
	@SystemLog(module = "集团官网管理-集团管理", methods = "删除集团")
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

			GroupFormMap formMap = new GroupFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				groupService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping(path = "findGroupInfo", method = RequestMethod.GET)
	public GroupFormMap findGroupInfo(HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		GroupFormMap groupFormMap = groupService.findLastCreate();

		return groupFormMap;
	}

}
