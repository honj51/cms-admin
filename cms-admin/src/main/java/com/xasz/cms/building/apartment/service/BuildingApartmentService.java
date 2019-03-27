package com.xasz.cms.building.apartment.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.xasz.cms.building.apartment.entity.BuildingApartmentFormMap;
import com.xasz.cms.building.apartment.mapper.BuildingApartmentMapper;
import com.xasz.cms.building.type.entity.BuildingTypeFormMap;
import com.xasz.cms.website.advertisement.entity.AdvertisementFormMap;

@Service
public class BuildingApartmentService {

	@Inject
	private BuildingApartmentMapper apartmentMapper;

	public List<BuildingApartmentFormMap> findByPage(BuildingTypeFormMap buildingTypeFormMap) {
		return apartmentMapper.findByPage(buildingTypeFormMap);
	}

	public BuildingApartmentFormMap findById(String id) {
		return apartmentMapper.findById(id);
	}

	public void updateById(AdvertisementFormMap formMap) throws Exception {
		apartmentMapper.updateById(formMap);
	}

	public void add(BuildingApartmentFormMap formMap) throws Exception {
		apartmentMapper.add(formMap);
	}
	

}
