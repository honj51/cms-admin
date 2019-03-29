package com.xasz.cms.hotel.prop.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.hotel.prop.entity.HotelPropFormMap;
import com.xasz.cms.hotel.prop.mapper.HotelPropMapper;

@Service
public class HotelPropService {

	@Inject
	private HotelPropMapper propMapper;

	@Transactional(readOnly = true)
	public List<HotelPropFormMap> findByPage(HotelPropFormMap hotelPropFormMap) {
		return propMapper.findByPage(hotelPropFormMap);
	}

	@Transactional(readOnly = true)
	public HotelPropFormMap findById(String id) {
		return propMapper.findById(id);
	}

	@Transactional(readOnly = false)
	public void updateById(HotelPropFormMap formMap) {
		propMapper.updateById(formMap);
	}

	@Transactional(readOnly = false)
	public void add(HotelPropFormMap formMap) {
		propMapper.add(formMap);
	}

	@Transactional(readOnly = true)
	public List<HotelPropFormMap> findAll(HotelPropFormMap formMap) {
		return propMapper.findAll(formMap);
	}

}
