package com.xasz.cms.menu.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.entity.ResFormMap;
import com.xasz.cms.entity.ResUserFormMap;
import com.xasz.cms.mapper.ResUserMapper;
import com.xasz.cms.mapper.ResourcesMapper;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.StringUtil;

@Controller
@Scope("request")
@RequestMapping("/menu/")
public class MenuController extends BaseController {

	private static final Logger log = LoggerFactory.getLogger(MenuController.class);

	@Inject
	private ResourcesMapper resourcesMapper;

	@Inject
	private UserService userService;

	@Inject
	private ResUserMapper resUserMapper;

	/**
	 * 模块入口
	 */
	@RequestMapping("list")
	@SystemLog(module = "菜单管理", methods = "打开列表")
	public String listUI(Model model) {
		model.addAttribute("res", findByRes());
		model.addAttribute("menuFormMaps", resourcesMapper.findByParentId());
		return Common.BACKGROUND_PATH + "/menu/list";
	}

	@ResponseBody
	@RequestMapping("findByTree")
	public ResFormMap findByTree(String treeId) throws Exception {

		List<ResFormMap> districtList = resourcesMapper.findResByZtreeNodeName(treeId);
		if (null != districtList && !districtList.isEmpty()) {
			ResFormMap districtFormMap = (ResFormMap) districtList.get(0);
			return districtFormMap;
		}
		return null;
	}

	@ResponseBody
	@RequestMapping("findAll")
	@SystemLog(module = "定位管理", methods = "数据显示")
	public List<ResFormMap> findAll() throws Exception {
		return resourcesMapper.findAll();
	}

	/**
	 * 区域信息菜单列表获取数据
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "菜单信息", methods = "列表获取数据")
	public PageView findByPage(String rows, String page) throws Exception {
		try {
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
					.getRequest();
			String order = request.getParameter("sidx");
			String dirc = request.getParameter("sord");
			ResFormMap districtFormMap = new ResFormMap();
			String name = StringUtil.escape(districtFormMap.getStr("name"));
			districtFormMap.put("name", name);
			districtFormMap = toFormMap(districtFormMap, page, rows);
			String parent_id = getPara("treeId");
			if (parent_id == null || parent_id.equals("")) {
				return pageView;
			}
			districtFormMap.put("parentId", parent_id);
			if (StringUtils.isNotBlank(order) && StringUtils.isNotBlank(dirc)) {
				// districtFormMap.put("orderbypart", " order by " + order + " "
				// + dirc);
				districtFormMap.put("orderbypart", " order by level desc");
			}
			pageView.setRows(resourcesMapper.findByPage(districtFormMap));
		} catch (Exception e) {
			log.error("菜单列表获取数据异常：" + e);
			throw new Exception("菜单列表获取数据异常!");
		}
		return pageView;
	}

	/**
	 * 新增
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("addUI")
	@SystemLog(module = "菜单信息", methods = "新增页面")
	public String addUI(Model model, HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		// String id = request.getParameter("parent_id");
		ResFormMap resFormMap = new ResFormMap();
		if (!StringUtils.isBlank(id)) {
			resFormMap = resourcesMapper.findById(id);
			if (resFormMap == null) {
				// throw new ParameterException("加载上级节点数据异常!");
				return "fail";
			}
			model.addAttribute("parentDistrictFormMap", resFormMap);
			model.addAttribute("type", "parentMenu");
		}
		return Common.BACKGROUND_PATH + "/menu/add";
	}

	/**
	 * 新增保存方法
	 * 
	 * @param txtGroupsSelect
	 * @return
	 */
	@ResponseBody
	@RequestMapping("addEntity")
	@SystemLog(module = "菜单信息", methods = "新增保存")
	public String addEntity(HttpServletRequest request) throws Exception {
		try {

			ResFormMap districtFormMap = new ResFormMap();
			String parentId = (String) districtFormMap.get("parentId");
			if (StringUtils.isBlank(parentId)) {
				districtFormMap.put("type", "0");
				districtFormMap.put("parentId", "0");
				List<ResFormMap> checkDistrictFormMap = resourcesMapper.findByNameAndParentId(districtFormMap);
				if (checkDistrictFormMap != null && !checkDistrictFormMap.isEmpty()) {
					return "nameRepeat";
				}
			} else {
				int type = Integer.parseInt((String) resourcesMapper.findById(parentId).get("type"));
				List<ResFormMap> checkDistrictFormMap = resourcesMapper.findByNameAndParentId(districtFormMap);
				if (checkDistrictFormMap != null && !checkDistrictFormMap.isEmpty()) {
					return "nameRepeat";
				}
				districtFormMap.put("type", type + 1);
			}
			resourcesMapper.addEntity(districtFormMap);
		} catch (Exception e) {
			log.error("菜单信息新增保存异常：" + e);
			throw new Exception("菜单信息新增保存异常!");
		}
		return "success";
	}

	/**
	 * 删除校验方法
	 * 
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("checkDelete")
	public String checkDelete() {
		String[] ids = getPara("ids").split(",");
		for (String id : ids) {
			ResFormMap districtFormMap = new ResFormMap();
			districtFormMap.put("parentId", id);
			List<ResFormMap> districtFormMaps = resourcesMapper.findByPage(districtFormMap);
			if (districtFormMaps != null && districtFormMaps.size() > 0) {
				return "fail";
			}
		}
		return "success";
	}

	/**
	 * 删除方法
	 * 
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("deleteEntity")
	@SystemLog(module = "菜单信息", methods = "删除")
	public String deleteEntity() throws Exception {
		try {
			String[] ids = getPara("ids").split(",");
			for (String id : ids) {
				if (StringUtils.isNotBlank(id)) {
					resourcesMapper.deleteById(id);
				}
			}
		} catch (Exception e) {
			log.error("菜单信息删除数据异常：" + e);
			throw new Exception("区域信息删除数据异常!");
		}

		return "success";
	}

	@RequestMapping("editUI")
	public String editUI(Model model) {
		String id = getPara("id");
		if (StringUtils.isNotBlank(id)) {
			ResFormMap districtFormMap = resourcesMapper.findById(id);
			if (!"0".equals(districtFormMap.get("parentId"))) {
				model.addAttribute("type", "parentMenu");
			}
			model.addAttribute("resFormMap", districtFormMap);
			model.addAttribute("menuFormMaps", resourcesMapper.findByParentId());
		}
		return Common.BACKGROUND_PATH + "/menu/edit";
	}

	@ResponseBody
	@RequestMapping("editRes")
	@SystemLog(module = "菜单管理", methods = "修改")
	public String editDistrict(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		String name = request.getParameter("areaname");
		String resUrl = request.getParameter("resUrl");
		String parentId = request.getParameter("parentId");
		String description = request.getParameter("description");
		String type = request.getParameter("type");
		ResFormMap resFormMap = new ResFormMap();
		if ("inner".equals(type)) {
			if (!StringUtils.isBlank(parentId)) {
				if ("0".equals((String) resourcesMapper.findById(id).get("parentId"))) {
					return "fail";
				}
				resFormMap.put("parentId", parentId);
				resFormMap.put("id", id);
			}
		} else if ("next".equals(type)) {
			ResFormMap res = resourcesMapper.findById(id);
			ResFormMap resNext = resourcesMapper.findById(parentId);
			resFormMap.put("level", (int) resNext.get("level"));
			resFormMap.put("id", id);
			resourcesMapper.updateSort(resFormMap);
			ResFormMap resFormMapNext = new ResFormMap();
			resFormMapNext.put("id", parentId);
			resFormMapNext.put("level", (int) res.get("level"));
			resourcesMapper.updateSort(resFormMapNext);

		} else if ("prev".equals(type)) {
			ResFormMap res = resourcesMapper.findById(id);
			ResFormMap resPrev = resourcesMapper.findById(parentId);
			resFormMap.put("level", (int) resPrev.get("level"));
			resFormMap.put("id", id);
			resourcesMapper.updateSort(resFormMap);
			ResFormMap resFormMapPrev = new ResFormMap();
			resFormMapPrev.put("id", parentId);
			resFormMapPrev.put("level", (int) res.get("level"));
			resourcesMapper.updateSort(resFormMapPrev);

		} else {
			resFormMap.put("id", id);
			resFormMap.put("name", name);
			resFormMap.put("resUrl", resUrl);
			resFormMap.put("parentId", parentId);
			resFormMap.put("description", description);
		}

		resourcesMapper.editEntity(resFormMap);
		return "success";
	}

	/**
	 * 修改保存方法
	 * 
	 * @param txtGroupsSelect
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("editEntity")
	@SystemLog(module = "菜单管理", methods = "修改保存")
	public String editEntity(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}
		String name = request.getParameter("areaname");
		String icon = request.getParameter("icon");
		String resUrl = request.getParameter("resUrl");
		String reskey = request.getParameter("reskey");
		String parentId = request.getParameter("parentId");
		String description = request.getParameter("description");
		ResFormMap resFormMap = new ResFormMap();
		resFormMap.put("id", id);
		resFormMap.put("name", name);
		resFormMap.put("reskey", reskey);
		resFormMap.put("icon", icon);
		resFormMap.put("resUrl", resUrl);
		resFormMap.put("parentId", parentId);
		resFormMap.put("description", description);
		try {
			resourcesMapper.editEntity(resFormMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		return "success";
	}

	@RequestMapping("resListUI")
	@SystemLog(module = "菜单管理", methods = "权限列表")
	public String resListUI(HttpServletRequest request, Model model) {
		String resId = request.getParameter("resId");
		model.addAttribute("resId", resId);
		return Common.BACKGROUND_PATH + "/menu/resList";
	}

	@ResponseBody
	@RequestMapping("findByResId")
	public PageView findByResId(HttpServletRequest request) {
		String resId = request.getParameter("resId");
		String rows = request.getParameter("rows");
		String page = request.getParameter("page");
		UserFormMap userFormMap = new UserFormMap();
		userFormMap.put("resId", resId);
		userFormMap = toFormMap(userFormMap, page, rows);
		pageView.setRows(userService.findByResId(userFormMap));
		return pageView;
	}

	@ResponseBody
	@RequestMapping("deleteResEntity")
	@SystemLog(module = "菜单管理", methods = "权限取消")
	public String delete(HttpServletRequest request) {
		String resId = request.getParameter("resId");
		String userIds = request.getParameter("userIds");
		if (StringUtils.isBlank(resId) || StringUtils.isBlank(userIds)) {
			return "fail";
		}
		String[] idArray = userIds.split(",");
		for (String userId : idArray) {
			ResUserFormMap resUserFormMap = new ResUserFormMap();
			resUserFormMap.put("resId", resId);
			resUserFormMap.put("userId", userId);
			resUserMapper.deleteByUserId(resUserFormMap);
		}
		return "success";
	}

}
