package com.xasz.cms.property.authent.mapper;

import java.util.List;

import com.xasz.cms.property.authent.entity.PropertyAuthentFormMap;


public interface PropertyAuthentMapper {
	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<PropertyAuthentFormMap> findByPage(PropertyAuthentFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(PropertyAuthentFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(PropertyAuthentFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public PropertyAuthentFormMap findById(String id);
	/**
	 * 根据openid查找 已经申请
	 * 
	 * @param id
	 * @return
	 */
	public PropertyAuthentFormMap getfindById(String openid);
	/**
	 * 根据openid查找 已经通过审核的
	 * 
	 * @param id
	 * @return
	 */
	public List<PropertyAuthentFormMap> getfindAll(String openid);
	/**
	 * 根据openid查找 已经通过审核的
	 * 
	 * @param id
	 * @return
	 */
	public List<PropertyAuthentFormMap> getfindAllScee(String openid);

	/**
	 * 查找所有
	 * 
	 * @return
	 */
	public List<PropertyAuthentFormMap> findAll();
}
