package com.xasz.cms.building.reserve.mapper;

import java.util.List;

import com.xasz.cms.building.reserve.entity.BuildingReserveFormMap;

public interface BuildingReserveMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<BuildingReserveFormMap> findByPage(BuildingReserveFormMap formMap);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(BuildingReserveFormMap formMap);

	/**
	 * 新增数据
	 * 
	 * @param formMap
	 */
	public void add(BuildingReserveFormMap formMap);

}
