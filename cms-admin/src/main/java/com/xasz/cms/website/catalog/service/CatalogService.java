package com.xasz.cms.website.catalog.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.website.catalog.entity.CatalogFormMap;
import com.xasz.cms.website.catalog.mapper.CatalogMapper;

@Service
public class CatalogService {

	@Inject
	private CatalogMapper mapper;
	@Transactional(readOnly = true)
	public List<CatalogFormMap> findByPage(CatalogFormMap formMap) {
		return mapper.findByPage(formMap);
	}
	@Transactional(readOnly = true)
	public void add(CatalogFormMap formMap) throws Exception {
		mapper.add(formMap);
	}
	@Transactional(readOnly = false)
	public void updateById(CatalogFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}
	@Transactional(readOnly = true)
	public CatalogFormMap findById(String id) {
		return mapper.findById(id);
	}
	@Transactional(readOnly = true)
	public List<CatalogFormMap> findAll() {
		return mapper.findAll();
	}

}
