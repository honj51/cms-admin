package com.xasz.cms.role.mapper;

import java.util.List;

import com.xasz.cms.role.entity.RoleFormMap;

public interface RoleMapper {

	/**
	 * 根据部门id查找角色
	 * 
	 * @param id
	 * @return
	 */
	public List<RoleFormMap> findByDeptId(String id);

	/**
	 * 分页查找
	 * 
	 * @param roleFormMap
	 * @return
	 */
	public List<RoleFormMap> findByPage(RoleFormMap roleFormMap);

	/**
	 * 根据名称查找
	 * 
	 * @param roleFormMap
	 * @return
	 */
	public List<RoleFormMap> findByName(RoleFormMap roleFormMap);

	/**
	 * 新增
	 * 
	 * @param formMap
	 */
	public void add(RoleFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public RoleFormMap findById(String id);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(RoleFormMap formMap);

}
