package com.xasz.cms.building.ad.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.building.ad.entity.BuildingAdFormMap;
import com.xasz.cms.building.ad.mapper.BuildingAdMapper;

@Service
public class BuildingAdService {

	@Inject
	private BuildingAdMapper mapper;

	@Transactional(readOnly = true)
	public List<BuildingAdFormMap> findByPage(BuildingAdFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	@Transactional(readOnly = false)
	public void add(BuildingAdFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	@Transactional(readOnly = false)
	public void updateById(BuildingAdFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	@Transactional(readOnly = true)
	public BuildingAdFormMap findById(String id) {
		return mapper.findById(id);
	}

	@Transactional(readOnly = true)
	public List<BuildingAdFormMap> findAll() {
		return mapper.findAll();
	}

}
