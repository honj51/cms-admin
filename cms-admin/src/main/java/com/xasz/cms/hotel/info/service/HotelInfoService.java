package com.xasz.cms.hotel.info.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.hotel.info.entity.HotelInfoFormMap;
import com.xasz.cms.hotel.info.mapper.HotelInfoMapper;

@Service
public class HotelInfoService {

	@Inject
	private HotelInfoMapper infoMapper;

	@Transactional(readOnly = true)
	public List<HotelInfoFormMap> findByPage(HotelInfoFormMap HotelInfoFormMap) {
		return infoMapper.findByPage(HotelInfoFormMap);
	}

	@Transactional(readOnly = true)
	public HotelInfoFormMap findById(String id) {
		return infoMapper.findById(id);
	}

	@Transactional(readOnly = false)
	public void updateById(HotelInfoFormMap formMap) {
		infoMapper.updateById(formMap);
	}

	@Transactional(readOnly = false)
	public void add(HotelInfoFormMap formMap) {
		infoMapper.add(formMap);
	}

	@Transactional(readOnly = true)
	public HotelInfoFormMap findHotelInfo() {
		return infoMapper.findHotelInfo();
	}

}
