package com.xasz.cms.hotel.info.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.hotel.info.entity.HotelInfoFormMap;
import com.xasz.cms.hotel.info.mapper.HotelInfoMapper;

@Service
public class HotelInfoService {

	@Inject
	private HotelInfoMapper infoMapper;

	public List<HotelInfoFormMap> findByPage(HotelInfoFormMap HotelInfoFormMap) {
		return infoMapper.findByPage(HotelInfoFormMap);
	}

	public HotelInfoFormMap findById(String id) {
		return infoMapper.findById(id);
	}

	public void updateById(HotelInfoFormMap formMap) {
		infoMapper.updateById(formMap);
	}

	public void add(HotelInfoFormMap formMap) {
		infoMapper.add(formMap);
	}

	public HotelInfoFormMap findHotelInfo() {
		return infoMapper.findHotelInfo();
	}

}
