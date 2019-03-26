package com.xasz.cms.website.news.controller;

import java.io.IOException;
import java.sql.Timestamp;
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
import com.xasz.cms.website.news.entity.NewsFormMap;
import com.xasz.cms.website.news.service.NewsService;
import com.xasz.cms.website.newsTitle.service.NewsTitleService;

@Controller
@Scope("request")
@RequestMapping("/website/news")
public class NewsController extends BaseController {

	@Inject
	private NewsService newsService;

	@Inject
	private NewsTitleService newsTitleService;

	@Inject
	private IDService idService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "集团官网管理-新闻管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());

		model.addAttribute("newsTitleFormMaps", newsTitleService.findAll());
		return Common.BACKGROUND_PATH + "/website/news/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@Transactional(readOnly = true)
	@SystemLog(module = "集团官网管理-新闻管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		NewsFormMap newsFormMap = new NewsFormMap();
		newsFormMap = toFormMap(newsFormMap, page, rows);
		String queryparam = request.getParameter("queryparam");
		String newsTitleId = request.getParameter("newsTitleId");

		newsFormMap.put("queryparam", queryparam);
		newsFormMap.put("title", queryparam);
		newsFormMap.put("newsTitleId", newsTitleId);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			newsFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<NewsFormMap> newsFormMaps = (Page<NewsFormMap>) newsService.findByPage(newsFormMap);
		List<NewsFormMap> formMaps = new ArrayList<NewsFormMap>();
		for (NewsFormMap map : newsFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(newsFormMaps);
		pageView.setRecords(newsFormMaps.getTotal());
		pageView.setTotal(newsFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "集团官网管理-新闻管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());

		model.addAttribute("newsTitleFormMaps", newsTitleService.findAll());
		return Common.BACKGROUND_PATH + "/website/news/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-新闻管理", methods = "新增新闻")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String newsTitleId = request.getParameter("newsTitleId");
		String newsTitleName = request.getParameter("newsTitleName");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(title)) {
			return "fail";
		}
		if (StringUtils.isBlank(content) || StringUtils.isBlank(newsTitleId)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		NewsFormMap newsFormMap = newsService.findById(id);
		if (null != newsFormMap) {
			NewsFormMap formMap = new NewsFormMap();
			formMap.put("id", id);
			formMap.put("news_title_id", newsTitleId);
			formMap.put("news_title_name", newsTitleName);
			formMap.put("title", title);
			formMap.put("content", content);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				newsService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		} else {
			NewsFormMap formMap = new NewsFormMap();
			formMap.put("id", id);
			formMap.put("news_title_id", newsTitleId);
			formMap.put("news_title_name", newsTitleName);
			formMap.put("title", title);
			formMap.put("content", content);
			formMap.put("create_user_id", userId);
			formMap.put("create_user_name", userName);
			formMap.put("create_time", currentDateTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				newsService.add(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("upload")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-新闻管理", methods = "上传新闻列表图片")
	public String upload(@RequestParam("url") MultipartFile file, HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
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

			NewsFormMap newsFormMap = newsService.findById(id);

			// 保存图片上传信息
			NewsFormMap formMap = new NewsFormMap();
			if (null != newsFormMap) {
				formMap.put("id", id);
				formMap.put("url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					newsService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				formMap.put("id", id);
				formMap.put("url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					newsService.add(formMap);
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
	@RequestMapping("uploadDetail")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-新闻管理", methods = "上传新闻详情图片")
	public String uploadDetail(@RequestParam("detailUrl") MultipartFile file, HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
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

			NewsFormMap newsFormMap = newsService.findById(id);

			// 保存图片上传信息
			NewsFormMap formMap = new NewsFormMap();
			if (null != newsFormMap) {
				formMap.put("id", id);
				formMap.put("detail_url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					newsService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				formMap.put("id", id);
				formMap.put("detail_url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					newsService.add(formMap);
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
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-新闻管理", methods = "删除集团图片")
	public String deletePhoto(HttpServletRequest request) {
		String id = request.getParameter("id");
		String type = request.getParameter("type");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		NewsFormMap formMap = new NewsFormMap();
		formMap.put("id", id);
		if (type.equals("url")) {
			formMap.put("url", "");
		}
		if (type.equals("detailUrl")) {
			formMap.put("detail_url", "");
		}
		try {
			newsService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "集团官网管理-新闻管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		NewsFormMap formMap = newsService.findById(id);
		model.addAttribute("formMap", formMap);

		model.addAttribute("newsTitleFormMaps", newsTitleService.findAll());
		return Common.BACKGROUND_PATH + "/website/news/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-新闻管理", methods = "修改新闻")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String newsTitleId = request.getParameter("newsTitleId");
		String newsTitleName = request.getParameter("newsTitleName");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(title)) {
			return "fail";
		}
		if (StringUtils.isBlank(content) || StringUtils.isBlank(newsTitleId)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		NewsFormMap formMap = new NewsFormMap();
		formMap.put("id", id);
		formMap.put("news_title_id", newsTitleId);
		formMap.put("news_title_name", newsTitleName);
		formMap.put("title", title);
		formMap.put("content", content);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			newsService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@Transactional(readOnly = false)
	@SystemLog(module = "集团官网管理-新闻管理", methods = "删除集团")
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

			NewsFormMap formMap = new NewsFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				newsService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping(value = "findByNewsTitleId", method = RequestMethod.POST)
	public PageView findByNesTitleId(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		NewsFormMap newsFormMap = new NewsFormMap();
		newsFormMap = toFormMap(newsFormMap, page, rows);
		String newsTitleId = request.getParameter("newsTitleId");

		newsFormMap.put("newsTitleId", newsTitleId);
		newsFormMap.put("orderbypart", "create_time asc");

		Page<NewsFormMap> newsFormMaps = (Page<NewsFormMap>) newsService.findByPage(newsFormMap);
		List<NewsFormMap> formMaps = new ArrayList<NewsFormMap>();
		for (NewsFormMap map : newsFormMaps) {
			String time = ((Timestamp) map.get("create_time")).toString();
			time = DateTimeUtil.format(time, "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd");

			map.put("create_time", time);
			formMaps.add(map);
		}
		pageView.setRows(newsFormMaps);
		pageView.setRecords(newsFormMaps.getTotal());
		pageView.setTotal(newsFormMaps.getPages());
		return pageView;
	}

	@ResponseBody
	@RequestMapping(value = "findById", method = RequestMethod.POST)
	public NewsFormMap findById(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		String id = request.getParameter("id");
		
		NewsFormMap formMap = newsService.findById(id);
		
		String createTime = ((Timestamp) formMap.get("create_time")).toString();
		String updateTime = ((Timestamp) formMap.get("update_time")).toString();
		createTime = DateTimeUtil.format(createTime, "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd");
		updateTime = DateTimeUtil.format(updateTime, "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd");

		formMap.put("create_time", createTime);
		formMap.put("update_time", updateTime);
		
		return formMap;
	}

}
