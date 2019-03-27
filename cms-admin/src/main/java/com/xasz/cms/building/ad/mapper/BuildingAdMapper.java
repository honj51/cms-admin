package com.xasz.cms.building.ad.mapper;

import java.util.List;

import com.xasz.cms.building.ad.entity.BuildingAdFormMap;

public interface BuildingAdMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<BuildingAdFormMap> findByPage(BuildingAdFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(BuildingAdFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(BuildingAdFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public BuildingAdFormMap findById(String id);

	/**
	 * 查找所有
	 * 
	 * @return
	 */
	public List<BuildingAdFormMap> findAll();
}
