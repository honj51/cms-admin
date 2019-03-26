package com.xasz.cms.cinemaInfo.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.cinemaInfo.entity.CinemaInfoFormMap;
import com.xasz.cms.cinemaInfo.mapper.CinemaInfoMapper;
import com.xasz.cms.website.advertisement.entity.AdvertisementFormMap;

@Service
public class CinemaInfoService {

	@Inject
	private CinemaInfoMapper mapper;

	public List<CinemaInfoFormMap> findByPage(CinemaInfoFormMap cinemaInfoFormMap) {
		return mapper.findByPage(cinemaInfoFormMap);
	}

	public void updateById(CinemaInfoFormMap formMap) {
		mapper.updateById(formMap);
	}

	public CinemaInfoFormMap findById(String id) {
		return mapper.findById(id);
	}

	public void add(CinemaInfoFormMap formMap) {
		mapper.add(formMap);
	}

}
