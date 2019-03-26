package com.xasz.cms.roleRes.mapper;

import java.util.List;

import com.xasz.cms.roleRes.entity.RoleResFormMap;

public interface RoleResMapper {

	/**
	 * 批量保存
	 * 
	 * @param roleResFormMaps
	 */
	public void batchSave(List<RoleResFormMap> roleResFormMaps) throws Exception;

	/**
	 * 根据角色id删除权限
	 * 
	 * @param roleId
	 * @throws Exception
	 */
	public void deleteRoleRes(String roleId) throws Exception;

	/**
	 * 查找角色权限
	 * 
	 * @param roleResFormMap
	 * @return
	 */
	public List<RoleResFormMap> findRoleRes(RoleResFormMap roleResFormMap);

}
