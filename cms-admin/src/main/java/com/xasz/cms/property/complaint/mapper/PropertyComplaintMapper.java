package com.xasz.cms.property.complaint.mapper;

import java.util.List;

import com.xasz.cms.property.complaint.entity.PropertyComplaintFormMap;

public interface PropertyComplaintMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<PropertyComplaintFormMap> findByPage(PropertyComplaintFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(PropertyComplaintFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(PropertyComplaintFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public PropertyComplaintFormMap findById(String id);
	/**
	 * 根据openid查找 已经通过审核的
	 * 
	 * @param id
	 * @return
	 */
	public PropertyComplaintFormMap getfindById(String openid);
	/**
	 * 根据openid查找 已经通过审核的
	 * 
	 * @param id
	 * @return
	 */
	public List<PropertyComplaintFormMap> getfindAll(String openid);

	/**
	 * 查找所有
	 * 
	 * @return
	 */
	public List<PropertyComplaintFormMap> findAll();
}
