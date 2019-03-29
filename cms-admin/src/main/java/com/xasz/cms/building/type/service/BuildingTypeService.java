package com.xasz.cms.building.type.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.building.type.entity.BuildingTypeFormMap;
import com.xasz.cms.building.type.mapper.BuildingTypeMapper;

@Service
public class BuildingTypeService {

	@Inject
	private BuildingTypeMapper typeMapper;

	@Transactional(readOnly = true)
	public List<BuildingTypeFormMap> findByPage(BuildingTypeFormMap formMap) {
		return typeMapper.findByPage(formMap);
	}

	@Transactional(readOnly = true)
	public List<BuildingTypeFormMap> findByName(BuildingTypeFormMap formMap) {
		return typeMapper.findByName(formMap);
	}

	@Transactional(readOnly = false)
	public void add(BuildingTypeFormMap formMap) throws Exception {
		typeMapper.add(formMap);
	}

	@Transactional(readOnly = false)
	public void updateById(BuildingTypeFormMap formMap) throws Exception {
		typeMapper.updateById(formMap);
	}

	@Transactional(readOnly = true)
	public BuildingTypeFormMap findById(String id) {
		return typeMapper.findById(id);
	}

	@Transactional(readOnly = true)
	public List<BuildingTypeFormMap> findAll() {
		return typeMapper.findAll();
	}

}
