package com.xasz.cms.building.apartment.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.building.apartment.entity.BuildingApartmentFormMap;
import com.xasz.cms.building.apartment.mapper.BuildingApartmentMapper;
import com.xasz.cms.building.type.entity.BuildingTypeFormMap;

@Service
public class BuildingApartmentService {

	@Inject
	private BuildingApartmentMapper apartmentMapper;

	@Transactional(readOnly = true)
	public List<BuildingApartmentFormMap> findByPage(BuildingTypeFormMap buildingTypeFormMap) {
		return apartmentMapper.findByPage(buildingTypeFormMap);
	}

	@Transactional(readOnly = true)
	public BuildingApartmentFormMap findById(String id) {
		return apartmentMapper.findById(id);
	}

	@Transactional(readOnly = false)
	public void updateById(BuildingApartmentFormMap formMap) throws Exception {
		apartmentMapper.updateById(formMap);
	}

	@Transactional(readOnly = false)
	public void add(BuildingApartmentFormMap formMap) throws Exception {
		apartmentMapper.add(formMap);
	}

	@Transactional(readOnly = true)
	public List<BuildingApartmentFormMap> findAll(BuildingApartmentFormMap formMap) {
		return apartmentMapper.findAll(formMap);
	}

}
