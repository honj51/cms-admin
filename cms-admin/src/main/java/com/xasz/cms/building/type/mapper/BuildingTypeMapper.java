package com.xasz.cms.building.type.mapper;

import java.util.List;

import com.xasz.cms.building.type.entity.BuildingTypeFormMap;

public interface BuildingTypeMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<BuildingTypeFormMap> findByPage(BuildingTypeFormMap formMap);

	/**
	 * 根据名称判重
	 * 
	 * @param formMap
	 * @return
	 */
	public List<BuildingTypeFormMap> findByName(BuildingTypeFormMap formMap);

	/**
	 * 新增
	 * 
	 * @param formMap
	 */
	public void add(BuildingTypeFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(BuildingTypeFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public BuildingTypeFormMap findById(String id);

	/**
	 * 查找所有
	 * 
	 * @return
	 */
	public List<BuildingTypeFormMap> findAll();

}
