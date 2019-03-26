package com.xasz.cms.hotel.prop.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.hotel.prop.entity.HotelPropFormMap;
import com.xasz.cms.hotel.prop.mapper.HotelPropMapper;

@Service
public class HotelPropService {

	@Inject
	private HotelPropMapper propMapper;

	public List<HotelPropFormMap> findByPage(HotelPropFormMap hotelPropFormMap) {
		return propMapper.findByPage(hotelPropFormMap);
	}

	public HotelPropFormMap findById(String id) {
		return propMapper.findById(id);
	}

	public void updateById(HotelPropFormMap formMap) {
		propMapper.updateById(formMap);
	}

	public void add(HotelPropFormMap formMap) {
		propMapper.add(formMap);
	}

	public List<HotelPropFormMap> findAll(HotelPropFormMap formMap) {
		return propMapper.findAll(formMap);
	}

}
