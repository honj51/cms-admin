package com.xasz.cms.website.catalog.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.website.catalog.entity.CatalogFormMap;
import com.xasz.cms.website.catalog.mapper.CatalogMapper;

@Service
public class CatalogService {

	@Inject
	private CatalogMapper mapper;

	public List<CatalogFormMap> findByPage(CatalogFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	public void add(CatalogFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	public void updateById(CatalogFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	public CatalogFormMap findById(String id) {
		return mapper.findById(id);
	}

	public List<CatalogFormMap> findAll() {
		return mapper.findAll();
	}

}
