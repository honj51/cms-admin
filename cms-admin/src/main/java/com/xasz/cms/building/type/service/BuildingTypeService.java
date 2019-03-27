package com.xasz.cms.building.type.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.building.type.entity.BuildingTypeFormMap;
import com.xasz.cms.building.type.mapper.BuildingTypeMapper;

@Service
public class BuildingTypeService {

	@Inject
	private BuildingTypeMapper typeMapper;

	public List<BuildingTypeFormMap> findByPage(BuildingTypeFormMap formMap) {
		return typeMapper.findByPage(formMap);
	}

	public List<BuildingTypeFormMap> findByName(BuildingTypeFormMap formMap) {
		return typeMapper.findByName(formMap);
	}

	public void add(BuildingTypeFormMap formMap) throws Exception {
		typeMapper.add(formMap);
	}

	public void updateById(BuildingTypeFormMap formMap) throws Exception {
		typeMapper.updateById(formMap);
	}

	public BuildingTypeFormMap findById(String id) {
		return typeMapper.findById(id);
	}
	
	public List<BuildingTypeFormMap> findAll(){
		return typeMapper.findAll();
	}

}
