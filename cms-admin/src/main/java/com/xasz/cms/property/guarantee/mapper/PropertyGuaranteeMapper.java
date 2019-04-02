package com.xasz.cms.property.guarantee.mapper;

import java.util.List;

import com.xasz.cms.property.guarantee.entity.PropertyGuaranteeFormMap;


public interface PropertyGuaranteeMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<PropertyGuaranteeFormMap> findByPage(PropertyGuaranteeFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(PropertyGuaranteeFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(PropertyGuaranteeFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public PropertyGuaranteeFormMap findById(String id);
	/**
	 * 根据openid查找 已经通过审核的
	 * 
	 * @param id
	 * @return
	 */
	public PropertyGuaranteeFormMap getfindById(String openid);
	/**
	 * 根据openid查找 已经通过审核的
	 * 
	 * @param id
	 * @return
	 */
	public List<PropertyGuaranteeFormMap> getfindAll(String openid);

	/**
	 * 查找所有
	 * 
	 * @return
	 */
	public List<PropertyGuaranteeFormMap> findAll();
}
