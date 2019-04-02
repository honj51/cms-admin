package com.xasz.cms.property.authent.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.property.authent.entity.PropertyAuthentFormMap;
import com.xasz.cms.property.authent.mapper.PropertyAuthentMapper;


@Service
public class PropertyAuthentService {

	@Inject
	private PropertyAuthentMapper mapper;

	@Transactional(readOnly = true)
	public List<PropertyAuthentFormMap> findByPage(PropertyAuthentFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	@Transactional(readOnly = false)
	public void add(PropertyAuthentFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	@Transactional(readOnly = false)
	public void updateById(PropertyAuthentFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	@Transactional(readOnly = true)
	public PropertyAuthentFormMap findById(String id) {
		return mapper.findById(id);
	}
	@Transactional(readOnly = true)
	public PropertyAuthentFormMap getfindById(String openid){
		return mapper.getfindById(openid);
	};
	@Transactional(readOnly = true)
	public List<PropertyAuthentFormMap> getfindAll(String openid){
		return mapper.getfindAll(openid);
	};
	@Transactional(readOnly = true)
	public List<PropertyAuthentFormMap> getfindAllScee(String openid){
		return mapper.getfindAll(openid);
	};
	
	@Transactional(readOnly = true)
	public List<PropertyAuthentFormMap> findAll() {
		return mapper.findAll();
	}
}
