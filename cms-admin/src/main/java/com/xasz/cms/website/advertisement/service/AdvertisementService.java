package com.xasz.cms.website.advertisement.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.website.advertisement.entity.AdvertisementFormMap;
import com.xasz.cms.website.advertisement.mapper.AdvertisementMapper;

@Service
public class AdvertisementService {

	@Inject
	private AdvertisementMapper mapper;

	public List<AdvertisementFormMap> findByPage(AdvertisementFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	public void add(AdvertisementFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	public void updateById(AdvertisementFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	public AdvertisementFormMap findById(String id) {
		return mapper.findById(id);
	}

	public List<AdvertisementFormMap> findAll(AdvertisementFormMap formMap) {
		return mapper.findAll(formMap);
	}

}
