package com.xasz.cms.website.newsTitle.controller;

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
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.website.newsTitle.entity.NewsTitleFormMap;
import com.xasz.cms.website.newsTitle.service.NewsTitleService;

@Controller
@Scope("request")
@RequestMapping("/website/newsTitle")
public class NewsTitleController extends BaseController {

	@Inject
	private NewsTitleService newsTitleService;

	@Inject
	private IDService idService;

	@RequestMapping("list")
	@SystemLog(module = "集团官网管理-新闻标题管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/website/newsTitle/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "集团官网管理-新闻标题管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		NewsTitleFormMap NewsTitleFormMap = new NewsTitleFormMap();
		NewsTitleFormMap = toFormMap(NewsTitleFormMap, page, rows);
		String queryparam = request.getParameter("queryparam");

		NewsTitleFormMap.put("queryparam", queryparam);
		NewsTitleFormMap.put("title", queryparam);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			NewsTitleFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<NewsTitleFormMap> newsTitleFormMaps = (Page<NewsTitleFormMap>) newsTitleService
				.findByPage(NewsTitleFormMap);
		List<NewsTitleFormMap> formMaps = new ArrayList<NewsTitleFormMap>();
		for (NewsTitleFormMap map : newsTitleFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(newsTitleFormMaps.getTotal());
		pageView.setTotal(newsTitleFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "集团官网管理-新闻标题管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request) {
		return Common.BACKGROUND_PATH + "/website/newsTitle/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@SystemLog(module = "集团官网管理-新闻标题管理", methods = "新增新闻")
	public String add(HttpServletRequest request) {
		String name = request.getParameter("name");
		String enName = request.getParameter("enName");

		if (StringUtils.isBlank(name)) {
			return "fail";
		}
		if (StringUtils.isBlank(enName)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		NewsTitleFormMap formMap = new NewsTitleFormMap();
		formMap.put("id", idService.getID());
		formMap.put("name", name);
		formMap.put("en_name", enName);
		formMap.put("create_user_id", userId);
		formMap.put("create_user_name", userName);
		formMap.put("create_time", currentDateTime);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			newsTitleService.add(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "集团官网管理-新闻标题管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		NewsTitleFormMap formMap = newsTitleService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/website/newsTitle/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@SystemLog(module = "集团官网管理-新闻标题管理", methods = "修改新闻")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String enName = request.getParameter("enName");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(name)) {
			return "fail";
		}
		if (StringUtils.isBlank(enName)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		NewsTitleFormMap formMap = new NewsTitleFormMap();
		formMap.put("id", id);
		formMap.put("name", name);
		formMap.put("en_name", enName);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			newsTitleService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@SystemLog(module = "集团官网管理-新闻标题管理", methods = "删除集团")
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

			NewsTitleFormMap formMap = new NewsTitleFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				newsTitleService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping(value = "findAllList", method = RequestMethod.GET)
	public List<NewsTitleFormMap> findAllList(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		List<NewsTitleFormMap> formMaps = newsTitleService.findAll();
		return formMaps;
	}

}
