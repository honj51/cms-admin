package com.xasz.cms.role.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.xasz.cms.deptRes.entity.DeptResFormMap;
import com.xasz.cms.deptRes.mapper.DeptResMapper;
import com.xasz.cms.role.entity.RoleFormMap;
import com.xasz.cms.role.mapper.RoleMapper;
import com.xasz.cms.roleRes.entity.RoleResFormMap;
import com.xasz.cms.roleRes.mapper.RoleResMapper;

@Service
public class RoleService {

	@Inject
	private RoleMapper roleMapper;

	@Inject
	private DeptResMapper deptResMapper;

	@Inject
	private RoleResMapper roleResMapper;

	public List<RoleFormMap> findByDeptId(String id) {
		return roleMapper.findByDeptId(id);
	}

	public List<RoleFormMap> findByPage(RoleFormMap roleFormMap) {
		return roleMapper.findByPage(roleFormMap);
	}

	public List<RoleFormMap> findByName(RoleFormMap roleFormMap) {
		return roleMapper.findByName(roleFormMap);
	}

	public void add(RoleFormMap formMap) throws Exception {
		// 为角色赋予部门拥有的权限
		String deptId = (String) formMap.get("dept_id");

		List<DeptResFormMap> deptResFormMaps = deptResMapper.findByDeptId(deptId);
		List<RoleResFormMap> roleResFormMaps = new ArrayList<RoleResFormMap>();
		for (DeptResFormMap deptResFormMap : deptResFormMaps) {
			String resId = (String) deptResFormMap.get("resId");

			RoleResFormMap roleResFormMap = new RoleResFormMap();
			roleResFormMap.put("resId", resId);
			roleResFormMap.put("roleId", formMap.get("id"));

			roleResFormMaps.add(roleResFormMap);
		}

		if (roleResFormMaps.size() > 0) {
			roleResMapper.batchSave(roleResFormMaps);
		}
		roleMapper.add(formMap);
	}

	public RoleFormMap findById(String id) {
		return roleMapper.findById(id);
	}

	public void updateById(RoleFormMap formMap) throws Exception {
		// 为角色赋予部门拥有的权限
		String deptId = (String) formMap.get("dept_id");
		if (StringUtils.isNotBlank(deptId)) {
			List<DeptResFormMap> deptResFormMaps = deptResMapper.findByDeptId(deptId);
			List<RoleResFormMap> roleResFormMaps = new ArrayList<RoleResFormMap>();
			for (DeptResFormMap deptResFormMap : deptResFormMaps) {
				String resId = (String) deptResFormMap.get("resId");

				RoleResFormMap roleResFormMap = new RoleResFormMap();
				roleResFormMap.put("resId", resId);
				roleResFormMap.put("roleId", formMap.get("id"));

				roleResFormMaps.add(roleResFormMap);
			}

			if (roleResFormMaps.size() > 0) {
				roleResMapper.deleteRoleRes((String) formMap.get("id"));
				roleResMapper.batchSave(roleResFormMaps);
			}
		}
		roleMapper.updateById(formMap);

	}

}
