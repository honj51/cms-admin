package com.xasz.cms.website.advertisement.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.website.advertisement.entity.AdvertisementFormMap;
import com.xasz.cms.website.advertisement.mapper.AdvertisementMapper;

@Service
public class AdvertisementService {

	@Inject
	private AdvertisementMapper mapper;

	@Transactional(readOnly = true)
	public List<AdvertisementFormMap> findByPage(AdvertisementFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	@Transactional(readOnly = false)
	public void add(AdvertisementFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	@Transactional(readOnly = false)
	public void updateById(AdvertisementFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	@Transactional(readOnly = true)
	public AdvertisementFormMap findById(String id) {
		return mapper.findById(id);
	}

	@Transactional(readOnly = true)
	public List<AdvertisementFormMap> findAll(AdvertisementFormMap formMap) {
		return mapper.findAll(formMap);
	}

}
