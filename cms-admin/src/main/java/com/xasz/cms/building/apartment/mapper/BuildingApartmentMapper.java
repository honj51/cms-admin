package com.xasz.cms.building.apartment.mapper;

import java.util.List;

import com.xasz.cms.building.apartment.entity.BuildingApartmentFormMap;
import com.xasz.cms.building.type.entity.BuildingTypeFormMap;
import com.xasz.cms.website.advertisement.entity.AdvertisementFormMap;

public interface BuildingApartmentMapper {

	/**
	 * 分页查找
	 * @param buildingTypeFormMap
	 * @return
	 */
	List<BuildingApartmentFormMap> findByPage(BuildingTypeFormMap buildingTypeFormMap);

	BuildingApartmentFormMap findById(String id);

	void updateById(AdvertisementFormMap formMap) throws Exception;

	void add(BuildingApartmentFormMap formMap) throws Exception;

}
