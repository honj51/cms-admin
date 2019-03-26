package com.xasz.cms.deptRes.mapper;

import java.util.List;

import com.xasz.cms.deptRes.entity.DeptResFormMap;

public interface DeptResMapper {

	/**
	 * 根据部门查找权限
	 * 
	 * @param deptResFormMap
	 * @return
	 */
	public List<DeptResFormMap> findDeptRes(DeptResFormMap deptResFormMap);

	/**
	 * 删除部门权限
	 * 
	 * @param uid
	 */
	public void deleteDeptRes(String uid);

	/**
	 * 批量保存部门权限
	 * 
	 * @param deptResFormMaps
	 */
	public void batchSaveDeptRes(List<DeptResFormMap> deptResFormMaps);

	/**
	 * 根据部门id查找所有权限
	 * 
	 * @param deptId
	 * @return
	 */
	public List<DeptResFormMap> findByDeptId(String deptId);

}
