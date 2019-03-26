package com.xasz.cms.user.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.common.Locked;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.dept.entity.DeptFormMap;
import com.xasz.cms.dept.service.DeptService;
import com.xasz.cms.global.Constants;
import com.xasz.cms.password.service.PasswordService;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.role.entity.RoleFormMap;
import com.xasz.cms.role.service.RoleService;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.mapper.UserMapper;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.PasswordHelper;

@Controller
@Scope("request")
@RequestMapping("/user/")
public class UserController extends BaseController {

	@Inject
	private UserService userService;

	@Inject
	private UserMapper userMapper;

	@Inject
	private IDService idService;

	@Inject
	private PasswordService passwordService;

	@Inject
	private DeptService deptService;

	@Inject
	private RoleService roleService;

	@RequestMapping("list")
	@SystemLog(module = "内部管理-用户管理", methods = "打开列表")
	public String listUI(Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/user/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "内部管理-用户管理", methods = "加载数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		UserFormMap userFormMap = new UserFormMap();
		userFormMap = toFormMap(userFormMap, page, rows);

		String queryParam = request.getParameter("queryParam");
		String isLocked = request.getParameter("isLocked");
		userFormMap.put("queryParam", queryParam);
		userFormMap.put("name", queryParam);
		userFormMap.put("roleName", queryParam);
		userFormMap.put("deptName", queryParam);
		userFormMap.put("isLocked", isLocked);
		userFormMap.put("phone", queryParam);
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			userFormMap.put("orderPart", sidx + " " + sord);
		}
		Page<UserFormMap> userFormMaps = (Page<UserFormMap>) userService.findByPage(userFormMap);
		List<UserFormMap> formMaps = new ArrayList<UserFormMap>();
		for (UserFormMap map : userFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(userFormMaps.getTotal());
		pageView.setTotal(userFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "内部管理-用户管理", methods = "新增页面")
	public String addUI(Model model) throws Exception {
		List<DeptFormMap> deptFormMaps = deptService.findAll();

		model.addAttribute("deptFormMaps", deptFormMaps);
		return Common.BACKGROUND_PATH + "/user/add";
	}

	@ResponseBody
	@RequestMapping("resetPassword")
	@SystemLog(module = "用户管理", methods = "用户管理-重置密码")
	public String resetPassword(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		UserFormMap userFormMapPass = userMapper.findById(id);
		userFormMapPass.put("id", id);
		userFormMapPass.put("password", Constants.ADMIN_DEFAULT_PASS_WORD);
		new PasswordHelper().encryptPasswordForUpdate(userFormMapPass);
		try {
			userMapper.updateById(userFormMapPass);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping("add")
	@SystemLog(module = "系统管理", methods = "用户管理-新增用户")
	public String add(HttpServletRequest request) throws Exception {
		String name = request.getParameter("name");
		String accountName = request.getParameter("accountName");
		String phone = request.getParameter("phone");
		String roleId = request.getParameter("roleId");
		String roleName = request.getParameter("roleName");
		String deptId = request.getParameter("deptId");
		String deptName = request.getParameter("deptName");
		String locked = request.getParameter("locked");
		String remarks = request.getParameter("remarks");

		UserFormMap theUserFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) theUserFormMap.get("id");
		String userName = (String) theUserFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		UserFormMap findUserFormMap = new UserFormMap();
		findUserFormMap.put("accountName", accountName);
		List<UserFormMap> userQuantityByAccountName = userService.findQuantityByAccountName(findUserFormMap);
		if (userQuantityByAccountName.size() > 0) {
			return "accountNameDuplicated";
		}

		UserFormMap userFormMap = new UserFormMap();
		userFormMap.put("id", idService.getID());
		userFormMap.put("name", name);
		userFormMap.put("account_name", accountName);
		userFormMap.put("phone", phone);
		userFormMap.put("role_id", roleId);
		userFormMap.put("role_name", roleName);
		userFormMap.put("dept_id", deptId);
		userFormMap.put("dept_name", deptName);
		userFormMap.put("is_locked", locked);
		userFormMap.put("remarks", remarks);
		userFormMap.put("create_user_id", userId);
		userFormMap.put("create_user_name", userName);
		userFormMap.put("create_time", currentDateTime);
		userFormMap.put("update_user_id", userId);
		userFormMap.put("update_user_name", userName);
		userFormMap.put("update_time", currentDateTime);
		userService.add(userFormMap);
		return "success";
	}

	@ResponseBody
	@RequestMapping("deleteEntity")
	@SystemLog(module = "系统管理", methods = "用户管理-删除用户") // 凡需要处理业务逻辑的.都需要记录操作日志
	public String deleteEntity(HttpServletRequest request) {
		String idStr = request.getParameter("ids");

		UserFormMap theUserFormMap = (UserFormMap) Common.findUserSession(request);
		String theUserId = (String) theUserFormMap.get("id");
		String theUserName = (String) theUserFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		String[] ids = idStr.split(",");
		for (String id : ids) {
			if (StringUtils.isBlank(id)) {
				return "fail";
			}
			UserFormMap userFormMap = new UserFormMap();
			userFormMap.put("id", id);
			userFormMap.put("is_delete", Constants.DELETE);
			userFormMap.put("update_user_id", theUserId);
			userFormMap.put("update_user_name", theUserName);
			userFormMap.put("update_time", currentDateTime);
			try {
				userService.updateById(userFormMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	@RequestMapping("editUI")
	public String editUI(HttpServletRequest request, Model model) throws Exception {
		String id = request.getParameter("id");
		UserFormMap userFormMap = userService.findById(id);
		model.addAttribute("userFormMap", userFormMap);

		List<DeptFormMap> deptFormMaps = deptService.findAll();
		model.addAttribute("deptFormMaps", deptFormMaps);

		String deptId = (String) userFormMap.get("dept_id");
		// 获取所有角色
		List<RoleFormMap> roleFormMaps = roleService.findByDeptId(deptId);
		model.addAttribute("roleFormMaps", roleFormMaps);
		return Common.BACKGROUND_PATH + "/user/edit";
	}

	@ResponseBody
	@RequestMapping("editEntity")
	@SystemLog(module = "系统管理", methods = "用户管理-修改用户")
	public String editEntity(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String phone = request.getParameter("phone");
		String roleId = request.getParameter("roleId");
		String roleName = request.getParameter("roleName");
		String deptId = request.getParameter("deptId");
		String deptName = request.getParameter("deptName");
		String locked = request.getParameter("locked");
		String remarks = request.getParameter("remarks");

		UserFormMap theUserFormMap = (UserFormMap) Common.findUserSession(request);
		String theUserId = (String) theUserFormMap.get("id");
		String theUserName = (String) theUserFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		UserFormMap userFormMap = new UserFormMap();
		userFormMap.put("id", id);
		userFormMap.put("name", name);
		userFormMap.put("phone", phone);
		userFormMap.put("role_id", roleId);
		userFormMap.put("role_name", roleName);
		userFormMap.put("dept_id", deptId);
		userFormMap.put("dept_name", deptName);
		userFormMap.put("is_locked", locked);
		userFormMap.put("remarks", remarks);
		userFormMap.put("update_user_id", theUserId);
		userFormMap.put("update_user_name", theUserName);
		userFormMap.put("update_time", currentDateTime);
		userService.edit(userFormMap);
		return "success";
	}

	/**
	 * 验证账号是否存在
	 * 
	 * @return
	 */
	@RequestMapping("isAccountNameExists")
	@ResponseBody
	public boolean isAccountNameExists(HttpServletRequest request) {
		String accountName = request.getParameter("accountName");
		UserFormMap searchUserFormMap = new UserFormMap();
		searchUserFormMap.put("name", accountName);
		UserFormMap userFormMap = userMapper.findByAccountName(searchUserFormMap);
		if (userFormMap == null) {
			return true;
		} else {
			return false;
		}
	}

	// 密码修改
	@RequestMapping("updatePassword")
	public String updatePassword(Model model) throws Exception {
		return Common.BACKGROUND_PATH + "/system/user/updatePassword";
	}

	// 保存新密码
	@RequestMapping("editPassword")
	@ResponseBody
	@SystemLog(module = "系统管理", methods = "用户管理-修改密码") // 凡需要处理业务逻辑的.都需要记录操作日志
	public String editPassword() throws Exception {
		// 当验证都通过后，把用户信息放在session里
		UserFormMap userFormMap = new UserFormMap();
		userFormMap.put("password", userFormMap.get("newpassword"));
		// 这里对修改的密码进行加密
		PasswordHelper passwordHelper = new PasswordHelper();
		passwordHelper.encryptPassword(userFormMap);

		userMapper.updateById(userFormMap);
		return "success";
	}

	@ResponseBody
	@RequestMapping("findPerformanceByPage")
	public PageView findPerforanceByPage(HttpServletRequest request) throws Exception {
		UserFormMap currentUserFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) currentUserFormMap.get("id");

		String rows = request.getParameter("rows");
		String page = request.getParameter("page");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");

		String deptId = request.getParameter("deptId");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");

		UserFormMap userFormMap = new UserFormMap();
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			userFormMap.put("orderByPart", sidx + " " + sord);
		}
		userFormMap = toFormMap(userFormMap, page, rows);
		userFormMap.put("userId", userId);
		userFormMap.put("deptId", deptId);
		userFormMap.put("reserveStartDate", startDate);
		userFormMap.put("reserveEndDate", endDate);
		userFormMap.put("memberStartDate", startDate);
		userFormMap.put("memberEndDate", endDate);
		pageView.setRows(userMapper.findPerformanceByPage(userFormMap));
		return pageView;
	}

	@ResponseBody
	@RequestMapping(value = "lock")
	public String locked(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		UserFormMap electUserFormMap = new UserFormMap();
		electUserFormMap.put("id", id);
		electUserFormMap.put("is_locked", Locked.yes.getCode());
		electUserFormMap.put("update_user_id", userId);
		electUserFormMap.put("update_user_name", userName);
		electUserFormMap.put("update_time", currentDateTime);
		try {
			userService.updateById(electUserFormMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping(value = "unlock")
	public String cancelLocked(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		UserFormMap electUserFormMap = new UserFormMap();
		electUserFormMap.put("id", id);
		electUserFormMap.put("is_locked", Locked.no.getCode());
		electUserFormMap.put("update_user_id", userId);
		electUserFormMap.put("update_user_name", userName);
		electUserFormMap.put("update_time", currentDateTime);
		try {
			userService.updateById(electUserFormMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping("findAllUser")
	public PageView findAllUser(HttpServletRequest request) throws Exception {
		String rows = request.getParameter("rows");
		String page = request.getParameter("page");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");

		String queryParam = request.getParameter("queryParam");

		UserFormMap userFormMap = new UserFormMap();
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			userFormMap.put("orderByPart", sidx + " " + sord);
		}
		userFormMap = toFormMap(userFormMap, page, rows);
		userFormMap.put("queryParam", queryParam);
		userFormMap.put("userName", queryParam);
		userFormMap.put("phone", queryParam);
		pageView.setRows(userMapper.findAllUserByPage(userFormMap));
		return pageView;
	}

	@RequestMapping("recycleList")
	@SystemLog(module = "用户管理", methods = "回收站")
	public String listUI(HttpServletRequest request, Model model) {
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		model.addAttribute("userId", userId);
		return Common.BACKGROUND_PATH + "/system/user/recycleList";
	}

	@ResponseBody
	@RequestMapping("findRecycle")
	@SystemLog(module = "用户管理-回收站", methods = "打开列表")
	public PageView findRecycle(HttpServletRequest request) throws Exception {
		String rows = request.getParameter("rows");
		String page = request.getParameter("page");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		String queryParam = request.getParameter("queryParam");
		UserFormMap userFormMap = new UserFormMap();
		userFormMap = toFormMap(userFormMap, page, rows);
		String isLocked = request.getParameter("isLocked");
		userFormMap.put("userName", queryParam);
		userFormMap.put("supName", queryParam);
		userFormMap.put("isLocked", isLocked);
		userFormMap.put("accountName", queryParam);
		userFormMap.put("phone", queryParam);
		userFormMap.put("queryParam", queryParam);
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			userFormMap.put("orderByPart", sidx + " " + sord);
		}
		pageView.setRows(userService.findRecycleByPage(userFormMap));
		return pageView;
	}

	@ResponseBody
	@RequestMapping("recovery")
	@SystemLog(module = "用户管理", methods = "回收站-还原")
	public String reduce(HttpServletRequest request) throws Exception {
		String id = request.getParameter("ids");
		String accountName = request.getParameter("accountNames");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		if (StringUtils.isBlank(accountName)) {
			return "fail";
		}
		UserFormMap theUserFormMap = (UserFormMap) Common.findUserSession(request);
		String theUserId = (String) theUserFormMap.get("id");
		String theUserName = (String) theUserFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		String[] idArray = id.split(",");
		String[] nameArray = accountName.split(",");
		UserFormMap userFormMap = new UserFormMap();
		for (int i = 0; i < idArray.length; i++) {
			userFormMap.put("id", idArray[i]);
			userFormMap.put("accountName", nameArray[i]);
			userFormMap.put("update_user_id", theUserId);
			userFormMap.put("update_user_name", theUserName);
			userFormMap.put("update_time", currentDateTime);
			List<UserFormMap> userFormMaps = userService.findByCode(userFormMap);
			if (userFormMaps.size() > 0) {
				return "duplicate_user";
			}
			userService.recovery(userFormMap);
		}

		return "success";
	}

}