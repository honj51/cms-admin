package com.xasz.cms.controller.system;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.entity.Params;
import com.xasz.cms.entity.ResFormMap;
import com.xasz.cms.entity.ResRoleFormMap;
import com.xasz.cms.entity.ResUserFormMap;
import com.xasz.cms.entity.UserRoleFormMap;
import com.xasz.cms.mapper.ResourcesMapper;
import com.xasz.cms.service.IDService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.TreeObject;
import com.xasz.cms.util.TreeUtil;

@Controller
@Scope("request")
@RequestMapping("/resources/")
public class ResourcesController extends BaseController {
	@Inject
	private ResourcesMapper resourcesMapper;

	@Inject
	private IDService idService;

	@Value("${platform.nickname}")
	private String nickname;

	/**
	 * @param model 存放返回界面的model
	 * @return
	 */
	@ResponseBody
	@RequestMapping("treelists")
	public ResFormMap findByPage(Model model) {
		ResFormMap resFormMap = new ResFormMap();
		String order = " order by level asc";
		resFormMap.put("$orderby", order);
		List<ResFormMap> mps = resourcesMapper.findByNames(resFormMap);
		List<TreeObject> list = new ArrayList<TreeObject>();
		for (ResFormMap map : mps) {
			TreeObject ts = new TreeObject();
			Common.flushObject(ts, map);
			list.add(ts);
		}
		TreeUtil treeUtil = new TreeUtil();
		List<TreeObject> ns = treeUtil.getChildTreeObjects(list, "0");
		resFormMap = new ResFormMap();
		resFormMap.put("treelists", ns);
		return resFormMap;
	}

	@ResponseBody
	@RequestMapping("reslists")
	public List<TreeObject> reslists(Model model) throws Exception {

		List<ResFormMap> mps = resourcesMapper.findAll();
		List<TreeObject> list = new ArrayList<TreeObject>();
		for (ResFormMap map : mps) {
			TreeObject ts = new TreeObject();
			Common.flushObject(ts, map);
			list.add(ts);
		}
		TreeUtil treeUtil = new TreeUtil();
		List<TreeObject> ns = treeUtil.getChildTreeObjects(list, "0", "　");
		return ns;
	}

	/**
	 * @param model 存放返回界面的model
	 * @return
	 */
	@RequestMapping("list")
	public String list(Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/system/resources/list";
	}

	/**
	 * 跳转到修改界面
	 * 
	 * @param model
	 * @param resourcesId 修改菜单信息ID
	 * @return
	 */
	@RequestMapping("editUI")
	public String editUI(Model model) {
		String id = getPara("id");
		if (StringUtils.isNotBlank(id)) {
			model.addAttribute("resources", resourcesMapper.findById(id));
		}
		return Common.BACKGROUND_PATH + "/system/resources/edit";
	}

	/**
	 * 跳转到新增界面
	 * 
	 * @return
	 */
	@RequestMapping("addUI")
	public String addUI(Model model) {
		return Common.BACKGROUND_PATH + "/system/resources/add";
	}

	/**
	 * 权限分配页面
	 * 
	 * @return
	 */
	@RequestMapping("permissions")
	public String permissions(Model model) {

		List<ResFormMap> mps = resourcesMapper.findAll();
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
		return Common.BACKGROUND_PATH + "/system/resources/permissions";
	}

	/**
	 * 角色权限分配页面
	 * 
	 * @return
	 */
	@RequestMapping("rolepermissions")
	public String rolePermissions(Model model) {

		List<ResFormMap> mps = resourcesMapper.findAll();
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
		return Common.BACKGROUND_PATH + "/system/resources/rolepermissions";
	}

	/**
	 * 添加菜单
	 * 
	 * @param resources
	 * @return Map
	 * @throws Exception
	 */
	@RequestMapping("addEntity")
	@ResponseBody

	@SystemLog(module = "系统管理", methods = "资源管理-新增资源") // 凡需要处理业务逻辑的.都需要记录操作日志
	public String addEntity() throws Exception {
		ResFormMap resFormMap = new ResFormMap();
		resFormMap.put("id", idService.getID());
		if ("2".equals(resFormMap.get("type"))) {
			resFormMap.put("description", Common.htmltoString(resFormMap.get("description") + ""));
		}
		Object o = resFormMap.get("ishide");
		if (null == o) {
			resFormMap.set("ishide", "0");
		}

		resourcesMapper.addEntity(resFormMap);
		return "success";
	}

	/**
	 * 更新菜单
	 * 
	 * @param model
	 * @param Map
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("editEntity")
	@SystemLog(module = "系统管理", methods = "资源管理-修改资源") // 凡需要处理业务逻辑的.都需要记录操作日志
	public String editEntity(Model model) throws Exception {
		ResFormMap resFormMap = new ResFormMap();
		if ("2".equals(resFormMap.get("type"))) {
			resFormMap.put("description", Common.htmltoString(resFormMap.get("description") + ""));
		}
		Object o = resFormMap.get("ishide");
		if (null == o) {
			resFormMap.set("ishide", "0");
		}
		resourcesMapper.editEntity(resFormMap);
		return "success";
	}

	/**
	 * 根据ID删除菜单
	 * 
	 * @param model
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("deleteEntity")
	@SystemLog(module = "系统管理", methods = "资源管理-删除资源") // 凡需要处理业务逻辑的.都需要记录操作日志
	public String deleteEntity(Model model) throws Exception {
		String[] ids = getParaValues("ids");
		for (String id : ids) {
			resourcesMapper.deleteByAttribute("id", "'" + id + "'", ResFormMap.class);
		}
		return "success";
	}

	@RequestMapping("sortUpdate")
	@ResponseBody
	public String sortUpdate(Params params) throws Exception {
		List<String> ids = params.getId();
		List<String> es = params.getRowId();
		List<ResFormMap> maps = new ArrayList<ResFormMap>();
		for (int i = 0; i < ids.size(); i++) {
			ResFormMap map = new ResFormMap();
			map.put("id", ids.get(i));
			map.put("level", es.get(i));
			maps.add(map);
		}
		resourcesMapper.updateSortOrder(maps);
		return "success";
	}

	@ResponseBody
	@RequestMapping("findRes")
	public List<ResFormMap> findUserRes(HttpServletRequest rquest) {
		String userId = rquest.getParameter("userId");

		ResFormMap resFormMap = new ResFormMap();
		resFormMap.put("userId", userId);
		List<ResFormMap> rs = resourcesMapper.findRes(resFormMap);
		return rs;
	}

	@ResponseBody
	@RequestMapping("findRoleRes")
	public List<ResRoleFormMap> findRoleRes() {
		ResRoleFormMap resRoleFormMap = new ResRoleFormMap();
		List<ResRoleFormMap> rrs = resourcesMapper.findRoleRes(resRoleFormMap);
		return rrs;
	}

	@ResponseBody
	@RequestMapping("addUserRes")
	@SystemLog(module = "系统管理", methods = "用户管理/组管理-修改权限") // 凡需要处理业务逻辑的.都需要记录操作日志
	public String addUserRes() throws Exception {
		String userId = "";
		String u = getPara("userId");
		String g = getPara("roleId");
		if (null != u && !StringUtils.isBlank(u.toString())) {
			userId = u.toString();
		} else if (null != g && !StringUtils.isBlank(g.toString())) {
			List<UserRoleFormMap> gs = resourcesMapper.findUserRes(g.toString());
			for (UserRoleFormMap ug : gs) {
				userId += ug.get("userId") + ",";
			}
		}
		userId = Common.trimComma(userId);
		String[] users = userId.split(",");
		for (String uid : users) {
			resourcesMapper.deleteUserRes(uid);
			String[] s = getParaValues("resId[]");
			List<ResUserFormMap> resUserFormMaps = new ArrayList<ResUserFormMap>();
			if (StringUtils.isNotBlank(uid)) {
				if (!(null == s || s.length == 0)) {
					for (String rid : s) {
						ResUserFormMap resUserFormMap = new ResUserFormMap();
						resUserFormMap.put("resId", rid);
						resUserFormMap.put("userId", uid);
						resUserFormMaps.add(resUserFormMap);
					}
					resourcesMapper.batchSaveUserRes(resUserFormMaps);
				}
			}
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping("addRoleRes")
	@SystemLog(module = "系统管理", methods = "用户管理/角色管理-修改权限") // 凡需要处理业务逻辑的.都需要记录操作日志
	public String addRoleRes() throws Exception {
		String roleId = getPara("roleId");
		String[] s = getParaValues("resId[]");
		if (StringUtils.isNotBlank(roleId)) {
			resourcesMapper.deleteByAttribute("roleId", "'" + roleId + "'", ResRoleFormMap.class);

			if (!(null == s || s.length == 0)) {
				List<ResRoleFormMap> resRoleFormMaps = new ArrayList<ResRoleFormMap>();
				for (String rid : s) {
					ResRoleFormMap resRoleFormMap = new ResRoleFormMap();
					resRoleFormMap.put("resId", rid);
					resRoleFormMap.put("roleId", roleId);
					resRoleFormMaps.add(resRoleFormMap);
				}
				resourcesMapper.batchSaveA(resRoleFormMaps);
			}
		}
		return "success";
	}

	/**
	 * 刷新指定角色的所有相关用户的资源
	 * 
	 * @param roleId
	 * @throws Exception
	 */
	private void refreshRelatedUserResByRoleId(String roleId) throws Exception {
		// 找到角色的所有相关的用户
		List<UserRoleFormMap> users = resourcesMapper.findByAttribute("roleId", roleId, UserRoleFormMap.class);
		for (int i = 0; i < users.size(); i++) {
			UserRoleFormMap user = users.get(i);
			String userId = user.get("userId").toString();
			Set<String> resIds = new HashSet<String>();
			// 清空用户的资源
			resourcesMapper.deleteByAttribute("userId", "'" + userId + "'", ResUserFormMap.class);
			// 找到该用户所有的角色
			List<UserRoleFormMap> roles4user = resourcesMapper.findByAttribute("userId", userId, UserRoleFormMap.class);
			for (UserRoleFormMap role : roles4user) {
				// 取得角色所有的资源
				List<ResRoleFormMap> ress = resourcesMapper.getTSysResRoleByRoleId(role.get("roleId").toString());
				for (ResRoleFormMap Res : ress) {
					String resId = Res.get("resId").toString();
					resIds.add(resId);
				}
			}
			// 重新给用户分配应有的资源
			List<ResUserFormMap> resUserFormMaps = new ArrayList<ResUserFormMap>();
			for (String resId : resIds) {
				ResUserFormMap resUserFormMap = new ResUserFormMap();
				resUserFormMap.put("userId", userId);
				resUserFormMap.put("resId", resId);
				resUserFormMaps.add(resUserFormMap);
			}
			resourcesMapper.batchSave(resUserFormMaps);
		}
	}

	@ResponseBody
	@RequestMapping("findByButtom")
	public List<ResFormMap> findByButtom() {
		return resourcesMapper.findAll();
	}

	/**
	 * 验证菜单是否存在
	 * 
	 * @param name
	 * @return
	 */
	@RequestMapping("isExist")
	@ResponseBody
	public boolean isExist(String name, String resKey) {
		ResFormMap resFormMap = new ResFormMap();
		List<ResFormMap> r = resourcesMapper.findByNames(resFormMap);
		if (r.size() == 0) {
			return true;
		} else {
			return false;
		}
	}
}