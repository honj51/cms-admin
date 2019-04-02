package com.xasz.cms.property.complaint.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.property.complaint.entity.PropertyComplaintFormMap;
import com.xasz.cms.property.complaint.mapper.PropertyComplaintMapper;

@Service
public class PropertyComplaintService {

	@Inject
	private PropertyComplaintMapper mapper;

	@Transactional(readOnly = true)
	public List<PropertyComplaintFormMap> findByPage(PropertyComplaintFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	@Transactional(readOnly = false)
	public void add(PropertyComplaintFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	@Transactional(readOnly = false)
	public void updateById(PropertyComplaintFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	@Transactional(readOnly = true)
	public PropertyComplaintFormMap findById(String id) {
		return mapper.findById(id);
	}
	@Transactional(readOnly = true)
	public PropertyComplaintFormMap getfindById(String openid){
		return mapper.getfindById(openid);
	};
	@Transactional(readOnly = true)
	public List<PropertyComplaintFormMap> getfindAll(String openid){
		return mapper.getfindAll(openid);
	};
	
	@Transactional(readOnly = true)
	public List<PropertyComplaintFormMap> findAll() {
		return mapper.findAll();
	}
}
