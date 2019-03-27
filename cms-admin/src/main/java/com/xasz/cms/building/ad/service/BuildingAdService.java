package com.xasz.cms.building.ad.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.building.ad.entity.BuildingAdFormMap;
import com.xasz.cms.building.ad.mapper.BuildingAdMapper;

@Service
public class BuildingAdService {

	@Inject
	private BuildingAdMapper mapper;

	public List<BuildingAdFormMap> findByPage(BuildingAdFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	public void add(BuildingAdFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	public void updateById(BuildingAdFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	public BuildingAdFormMap findById(String id) {
		return mapper.findById(id);
	}

	public List<BuildingAdFormMap> findAll() {
		return mapper.findAll();
	}

}
