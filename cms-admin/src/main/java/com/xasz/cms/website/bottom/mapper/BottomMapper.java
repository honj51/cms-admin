package com.xasz.cms.website.bottom.mapper;

import java.util.List;

import com.xasz.cms.website.bottom.entity.BottomFormMap;

public interface BottomMapper {

	/**
	 * 分页查找
	 * 
	 * @param bottomFormMap
	 * @return
	 */
	public List<BottomFormMap> findByPage(BottomFormMap bottomFormMap);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public BottomFormMap findById(String id);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(BottomFormMap formMap);

	/**
	 * 新增
	 * 
	 * @param formMap
	 */
	public void add(BottomFormMap formMap);

	/**
	 * 查找所有
	 * 
	 * @return
	 */
	public List<BottomFormMap> findAll();

}
