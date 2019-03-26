package com.xasz.cms.role.controller;

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
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.role.entity.RoleFormMap;
import com.xasz.cms.role.service.RoleService;
import com.xasz.cms.roleRes.entity.RoleResFormMap;
import com.xasz.cms.roleRes.mapper.RoleResMapper;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.TreeObject;
import com.xasz.cms.util.TreeUtil;

@Controller
@Scope("request")
@RequestMapping("/role/")
public class RoleController extends BaseController {

	@Inject
	private RoleService roleService;

	@Inject
	private DeptService deptService;

	@Inject
	private IDService idService;

	@Inject
	private UserService userService;

	@Inject
	private RoleResMapper roleResMapper;

	@Inject
	private DeptResMapper deptResMapper;

	@RequestMapping("list")
	@SystemLog(module = "内部管理-角色管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/role/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "内部管理-角色管理", methods = "加载数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		RoleFormMap roleFormMap = new RoleFormMap();
		roleFormMap = toFormMap(roleFormMap, page, rows);
		
		String queryParam = request.getParameter("queryParam");
		String isLocked = request.getParameter("isLocked");
		roleFormMap.put("queryParam", queryParam);
		roleFormMap.put("name", queryParam);
		roleFormMap.put("deptName", queryParam);
		roleFormMap.put("isLocked", isLocked);
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			roleFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<RoleFormMap> roleFormMaps = (Page<RoleFormMap>) roleService.findByPage(roleFormMap);
		List<RoleFormMap> formMaps = new ArrayList<RoleFormMap>();
		for (RoleFormMap map : roleFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(roleFormMaps.getTotal());
		pageView.setTotal(roleFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "内部管理-角色管理", methods = "新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("deptFormMaps", deptService.findAll());
		return Common.BACKGROUND_PATH + "/role/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-角色管理", methods = "新增角色")
	public String add(HttpServletRequest request) {
		String deptId = request.getParameter("deptId");
		String deptName = request.getParameter("deptName");
		String name = request.getParameter("name");
		String remarks = request.getParameter("remarks");
		String isLocked = request.getParameter("isLocked");

		if (StringUtils.isBlank(deptId) || StringUtils.isBlank(deptName)) {
			return "fail";
		}

		if (StringUtils.isBlank(name)) {
			return "fail";
		}

		// 获取登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		RoleFormMap roleFormMap = new RoleFormMap();
		roleFormMap.put("name", name);
		List<RoleFormMap> deptFormMaps = roleService.findByName(roleFormMap);
		if (deptFormMaps.size() > 0) {
			return "duplicated_name";
		}

		RoleFormMap formMap = new RoleFormMap();
		formMap.put("id", idService.getID());
		formMap.put("dept_id", deptId);
		formMap.put("dept_name", deptName);
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
			roleService.add(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "内部管理-角色管理", methods = "修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		RoleFormMap roleFormMap = roleService.findById(id);

		model.addAttribute("roleFormMap", roleFormMap);

		model.addAttribute("deptFormMaps", deptService.findAll());
		return Common.BACKGROUND_PATH + "/role/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-角色管理", methods = "修改角色")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String deptId = request.getParameter("deptId");
		String deptName = request.getParameter("deptName");
		String name = request.getParameter("name");
		String remarks = request.getParameter("remarks");
		String isLocked = request.getParameter("isLocked");

		if (StringUtils.isBlank(deptId) || StringUtils.isBlank(deptName)) {
			return "fail";
		}

		if (StringUtils.isBlank(id) || StringUtils.isBlank(name)) {
			return "fail";
		}

		// 获取登陆用户信息
		UserFormMap theformMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) theformMap.get("id");
		String userName = (String) theformMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		RoleFormMap roleFormMap = new RoleFormMap();
		roleFormMap.put("id", id);
		roleFormMap.put("name", name);
		List<RoleFormMap> roleFormMaps = roleService.findByName(roleFormMap);
		if (roleFormMaps.size() > 0) {
			return "duplicated_name";
		}

		RoleFormMap formMap = new RoleFormMap();
		formMap.put("id", id);
		formMap.put("dept_id", deptId);
		formMap.put("dept_name", deptName);
		formMap.put("name", name);
		formMap.put("is_locked", isLocked);
		formMap.put("remarks", remarks);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);

		try {
			roleService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-角色管理", methods = "删除角色")
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

			List<UserFormMap> userFormMaps = userService.findByRoleId(id);
			if (userFormMaps.size() > 0) {
				return "have_users";
			}

			RoleFormMap formMap = new RoleFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);

			try {
				roleService.updateById(formMap);
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
	@SystemLog(module = "内部管理-角色管理", methods = "停用角色")
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
			RoleFormMap formMap = new RoleFormMap();
			formMap.put("id", id);
			formMap.put("is_locked", String.valueOf(Constants.YES));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);

			try {
				roleService.updateById(formMap);
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
	@SystemLog(module = "内部管理-角色管理", methods = "启用角色")
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
			RoleFormMap formMap = new RoleFormMap();
			formMap.put("id", id);
			formMap.put("is_locked", String.valueOf(Constants.NO));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);

			try {
				roleService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}

		}

		return "success";
	}

	@RequestMapping("permissions")
	@SystemLog(module = "内部管理-角色管理", methods = "打开分配权限页面")
	public String permissions(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		RoleFormMap roleFormMap = roleService.findById(id);
		String deptId = (String) roleFormMap.get("dept_id");

		DeptResFormMap deptResFormMap = new DeptResFormMap();
		deptResFormMap.put("deptId", deptId);

		List<DeptResFormMap> mps = deptResMapper.findDeptRes(deptResFormMap);
		List<TreeObject> list = new ArrayList<TreeObject>();
		TreeObject ts = null;
		for (DeptResFormMap map : mps) {
			ts = new TreeObject();
			Common.flushObject(ts, map);
			list.add(ts);
		}
		TreeUtil treeUtil = new TreeUtil();
		List<TreeObject> ns = treeUtil.getChildTreeObjects(list, "0");
		model.addAttribute("permissions", ns);
		return Common.BACKGROUND_PATH + "/role/permissions";
	}

	@ResponseBody
	@RequestMapping("addRoleRes")
	@Transactional(readOnly = false)
	@SystemLog(module = "内部管理-角色管理", methods = "分配权限")
	public String addDeptRes() {
		String roleId = getPara("roleId");
		if (StringUtils.isNotBlank(roleId)) {
			try {
				roleResMapper.deleteRoleRes(roleId);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
			String[] s = getParaValues("resId[]");
			List<RoleResFormMap> roleResFormMaps = new ArrayList<RoleResFormMap>();
			if (!(null == s || s.length == 0)) {
				for (String rid : s) {
					RoleResFormMap roleResFormMap = new RoleResFormMap();
					roleResFormMap.put("resId", rid);
					roleResFormMap.put("roleId", roleId);
					roleResFormMaps.add(roleResFormMap);
				}
				try {
					roleResMapper.batchSave(roleResFormMaps);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			}
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping("findRes")
	public List<RoleResFormMap> findUserRes(HttpServletRequest request) {
		String roleId = request.getParameter("roleId");
		RoleResFormMap roleResFormMap = new RoleResFormMap();
		roleResFormMap.put("roleId", roleId);
		List<RoleResFormMap> rs = roleResMapper.findRoleRes(roleResFormMap);
		return rs;
	}

	@ResponseBody
	@RequestMapping("findByDeptId")
	public List<RoleFormMap> findByDeptId(HttpServletRequest request) {
		String deptId = request.getParameter("deptId");
		List<RoleFormMap> roleFormMaps = roleService.findByDeptId(deptId);
		return roleFormMaps;
	}

}
