package com.xasz.cms.dept.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.dept.entity.DeptFormMap;
import com.xasz.cms.dept.service.DeptService;
import com.xasz.cms.deptRes.entity.DeptResFormMap;
import com.xasz.cms.deptRes.mapper.DeptResMapper;
import com.xasz.cms.entity.ResFormMap;
import com.xasz.cms.global.Constants;
import com.xasz.cms.mapper.ResourcesMapper;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.role.entity.RoleFormMap;
import com.xasz.cms.role.service.RoleService;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.TreeObject;
import com.xasz.cms.util.TreeUtil;

@Controller
@Scope("request")
@RequestMapping("/dept/")
public class DeptController extends BaseController {

	@Inject
	private DeptService deptService;

	@Inject
	private IDService idService;

	@Inject
	private UserService userService;

	@Inject
	private RoleService roleService;

	@Inject
	private ResourcesMapper resourcesMapper;

	@Inject
	private DeptResMapper deptResMapper;

	@RequestMapping("list")
	@SystemLog(module = "内部管理-部门管理", methods = "打开列表")
	public String listUI(Model model) throws Exception {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/dept/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "内部管理-部门管理", methods = "加载数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		DeptFormMap deptFormMap = new DeptFormMap();
		deptFormMap = toFormMap(deptFormMap, page, rows);
		
		String queryParam = request.getParameter("queryParam");
		String isLocked = request.getParameter("isLocked");
		deptFormMap.put("queryParam", queryParam);
		deptFormMap.put("name", queryParam);
		deptFormMap.put("isLocked", isLocked);
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			deptFormMap.put("orderPart", sidx + " " + sord);
		}
		Page<DeptFormMap> deptFormMaps = (Page<DeptFormMap>) deptService.findByPage(deptFormMap);
		List<DeptFormMap> formMaps = new ArrayList<DeptFormMap>();
		for (DeptFormMap map : deptFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(deptFormMaps.getTotal());
		pageView.setTotal(deptFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "内部管理-部门管理", methods = "新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		return Common.BACKGROUND_PATH + "/dept/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-部门管理", methods = "新增部门")
	public String add(HttpServletRequest request) {
		String name = request.getParameter("name");
		String remarks = request.getParameter("remarks");
		String isLocked = request.getParameter("isLocked");

		if (StringUtils.isBlank(name)) {
			return "fail";
		}

		// 获取登陆用户信息
		UserFormMap theformMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) theformMap.get("id");
		String userName = (String) theformMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		DeptFormMap deptFormMap = new DeptFormMap();
		deptFormMap.put("name", name);
		List<DeptFormMap> deptFormMaps = deptService.findByName(deptFormMap);
		if (deptFormMaps.size() > 0) {
			return "duplicated_name";
		}

		DeptFormMap formMap = new DeptFormMap();
		formMap.put("id", idService.getID());
		formMap.put("name", name);
		formMap.put("is_locked", isLocked);
		formMap.put("remarks", remarks);
		formMap.put("create_user_id", userId);
		formMap.put("create_user_name", userName);
		formMap.put("create_time", currentDateTime);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);

		try {
			deptService.add(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "内部管理-部门管理", methods = "修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		DeptFormMap deptFormMap = deptService.findById(id);

		model.addAttribute("deptFormMap", deptFormMap);
		return Common.BACKGROUND_PATH + "/dept/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-部门管理", methods = "修改部门")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String remarks = request.getParameter("remarks");
		String isLocked = request.getParameter("isLocked");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(name)) {
			return "fail";
		}

		// 获取登陆用户信息
		UserFormMap theformMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) theformMap.get("id");
		String userName = (String) theformMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		DeptFormMap deptFormMap = new DeptFormMap();
		deptFormMap.put("id", id);
		deptFormMap.put("name", name);
		List<DeptFormMap> deptFormMaps = deptService.findByName(deptFormMap);
		if (deptFormMaps.size() > 0) {
			return "duplicated_name";
		}

		DeptFormMap formMap = new DeptFormMap();
		formMap.put("id", id);
		formMap.put("name", name);
		formMap.put("is_locked", isLocked);
		formMap.put("remarks", remarks);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);

		try {
			deptService.updateById(formMap);
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

			List<RoleFormMap> roleFormMaps = roleService.findByDeptId(id);
			if (roleFormMaps.size() > 0) {
				return "have_roles";
			}

			List<UserFormMap> userFormMaps = userService.findByDeptId(id);
			if (userFormMaps.size() > 0) {
				return "have_users";
			}

			DeptFormMap formMap = new DeptFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);

			try {
				deptService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}

		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("locked")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-部门管理", methods = "停用部门")
	public String locked(HttpServletRequest request) {
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
			DeptFormMap formMap = new DeptFormMap();
			formMap.put("id", id);
			formMap.put("is_locked", String.valueOf(Constants.YES));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);

			try {
				deptService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}

		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("unlocked")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-部门管理", methods = "启用部门")
	public String unlocked(HttpServletRequest request) {
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
			DeptFormMap formMap = new DeptFormMap();
			formMap.put("id", id);
			formMap.put("is_locked", String.valueOf(Constants.NO));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);

			try {
				deptService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}

		}

		return "success";
	}

	@RequestMapping("permissions")
	@SystemLog(module = "内部管理-部门管理", methods = "打开分配权限页面")
	public String permissions(HttpServletRequest request, Model model) {
		// 获取登陆用户信息
		UserFormMap theformMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) theformMap.get("id");

		List<ResFormMap> mps = resourcesMapper.findUserResourcess(userId);
		List<TreeObject> list = new ArrayList<TreeObject>();
		TreeObject ts = null;
		for (ResFormMap map : mps) {
			ts = new TreeObject();
			Common.flushObject(ts, map);
			list.add(ts);
		}
		TreeUtil treeUtil = new TreeUtil();
		List<TreeObject> ns = treeUtil.getChildTreeObjects(list, "0");
		model.addAttribute("permissions", ns);
		return Common.BACKGROUND_PATH + "/dept/permissions";
	}

	@ResponseBody
	@RequestMapping("addDeptRes")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-部门管理", methods = "分配权限")
	public String addDeptRes() {
		String deptId = getPara("deptId");
		if (StringUtils.isNotBlank(deptId)) {
			deptResMapper.deleteDeptRes(deptId);
			String[] s = getParaValues("resId[]");
			List<DeptResFormMap> deptResFormMaps = new ArrayList<DeptResFormMap>();
			if (!(null == s || s.length == 0)) {
				for (String rid : s) {
					DeptResFormMap deptResFormMap = new DeptResFormMap();
					deptResFormMap.put("resId", rid);
					deptResFormMap.put("deptId", deptId);
					deptResFormMaps.add(deptResFormMap);
				}
				deptResMapper.batchSaveDeptRes(deptResFormMaps);
			}
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping("findRes")
	public List<DeptResFormMap> findUserRes(HttpServletRequest request) {
		String deptId = request.getParameter("deptId");
		DeptResFormMap deptResFormMap = new DeptResFormMap();
		deptResFormMap.put("deptId", deptId);
		List<DeptResFormMap> rs = deptResMapper.findDeptRes(deptResFormMap);
		return rs;
	}

}
