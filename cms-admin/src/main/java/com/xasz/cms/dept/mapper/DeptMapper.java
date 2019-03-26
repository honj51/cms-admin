package com.xasz.cms.dept.mapper;

import java.util.List;

import com.xasz.cms.dept.entity.DeptFormMap;

public interface DeptMapper {

	/**
	 * 分页查找
	 * 
	 * @param deptFormMap
	 * @return
	 */
	public List<DeptFormMap> findByPage(DeptFormMap deptFormMap);

	/**
	 * 根据名称查找
	 * 
	 * @param deptFormMap
	 * @return
	 */
	public List<DeptFormMap> findByName(DeptFormMap deptFormMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(DeptFormMap formMap);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public DeptFormMap findById(String id);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(DeptFormMap formMap) throws Exception;

	/**
	 * 查找所有部门
	 * 
	 * @return
	 */
	public List<DeptFormMap> findAll();

}
