package com.xasz.cms.property.guarantee.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.property.guarantee.entity.PropertyGuaranteeFormMap;
import com.xasz.cms.property.guarantee.mapper.PropertyGuaranteeMapper;

@Service
public class PropertyGuaranteeService {

	@Inject
	private PropertyGuaranteeMapper mapper;

	@Transactional(readOnly = true)
	public List<PropertyGuaranteeFormMap> findByPage(PropertyGuaranteeFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	@Transactional(readOnly = false)
	public void add(PropertyGuaranteeFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	@Transactional(readOnly = false)
	public void updateById(PropertyGuaranteeFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	@Transactional(readOnly = true)
	public PropertyGuaranteeFormMap findById(String id) {
		return mapper.findById(id);
	}
	@Transactional(readOnly = true)
	public PropertyGuaranteeFormMap getfindById(String openid){
		return mapper.getfindById(openid);
	};
	@Transactional(readOnly = true)
	public List<PropertyGuaranteeFormMap> getfindAll(String openid){
		return mapper.getfindAll(openid);
	};
	
	@Transactional(readOnly = true)
	public List<PropertyGuaranteeFormMap> findAll() {
		return mapper.findAll();
	}
}
