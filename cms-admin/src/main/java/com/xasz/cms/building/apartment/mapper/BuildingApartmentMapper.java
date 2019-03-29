package com.xasz.cms.building.apartment.mapper;

import java.util.List;

import com.xasz.cms.building.apartment.entity.BuildingApartmentFormMap;
import com.xasz.cms.building.type.entity.BuildingTypeFormMap;

public interface BuildingApartmentMapper {

	/**
	 * 分页查找
	 * 
	 * @param buildingTypeFormMap
	 * @return
	 */
	public List<BuildingApartmentFormMap> findByPage(BuildingTypeFormMap buildingTypeFormMap);

	public BuildingApartmentFormMap findById(String id);

	public void updateById(BuildingApartmentFormMap formMap) throws Exception;

	public void add(BuildingApartmentFormMap formMap) throws Exception;

	/**
	 * 根据条件查找所有户型
	 * 
	 * @param formMap
	 * @return
	 */
	public List<BuildingApartmentFormMap> findAll(BuildingApartmentFormMap formMap);

}
