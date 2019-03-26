package com.xasz.cms.building.reserve.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.building.reserve.entity.BuildingReserveFormMap;
import com.xasz.cms.building.reserve.mapper.BuildingReserveMapper;

@Service
public class BuildingReserveService {

	@Inject
	private BuildingReserveMapper reserveMapper;

	public List<BuildingReserveFormMap> findByPage(BuildingReserveFormMap formMap) {
		return reserveMapper.findByPage(formMap);
	}

	public void updateById(BuildingReserveFormMap formMap) {
		reserveMapper.updateById(formMap);
	}

	public void add(BuildingReserveFormMap formMap) {
		reserveMapper.add(formMap);
	}

}
