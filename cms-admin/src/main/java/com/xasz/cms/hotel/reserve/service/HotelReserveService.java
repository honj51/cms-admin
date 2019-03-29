package com.xasz.cms.hotel.reserve.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.hotel.reserve.entity.HotelReserveFormMap;
import com.xasz.cms.hotel.reserve.mapper.HotelReserveMapper;

@Service
public class HotelReserveService {

	@Inject
	private HotelReserveMapper reserveMapper;

	@Transactional(readOnly = true)
	public List<HotelReserveFormMap> findByPage(HotelReserveFormMap formMap) {
		return reserveMapper.findByPage(formMap);
	}

	@Transactional(readOnly = true)
	public HotelReserveFormMap findById(String id) {
		return reserveMapper.findById(id);
	}

	@Transactional(readOnly = false)
	public void updateById(HotelReserveFormMap formMap) throws Exception {
		reserveMapper.updateById(formMap);
	}

	@Transactional(readOnly = false)
	public void add(HotelReserveFormMap formMap) throws Exception {
		reserveMapper.add(formMap);
	}

}
