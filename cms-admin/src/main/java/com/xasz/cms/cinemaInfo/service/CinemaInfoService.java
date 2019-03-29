package com.xasz.cms.cinemaInfo.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.cinemaInfo.entity.CinemaInfoFormMap;
import com.xasz.cms.cinemaInfo.mapper.CinemaInfoMapper;

@Service
public class CinemaInfoService {

	@Inject
	private CinemaInfoMapper mapper;

	@Transactional(readOnly = true)
	public List<CinemaInfoFormMap> findByPage(CinemaInfoFormMap cinemaInfoFormMap) {
		return mapper.findByPage(cinemaInfoFormMap);
	}

	@Transactional(readOnly = false)
	public void updateById(CinemaInfoFormMap formMap) {
		mapper.updateById(formMap);
	}

	@Transactional(readOnly = true)
	public CinemaInfoFormMap findById(String id) {
		return mapper.findById(id);
	}

	@Transactional(readOnly = false)
	public void add(CinemaInfoFormMap formMap) {
		mapper.add(formMap);
	}

}
