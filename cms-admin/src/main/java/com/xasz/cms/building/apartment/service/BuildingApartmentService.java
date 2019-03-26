package com.xasz.cms.building.apartment.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.building.apartment.mapper.BuildingApartmentMapper;

@Service
public class BuildingApartmentService {

	@Inject
	private BuildingApartmentMapper apartmentMapper;

}
