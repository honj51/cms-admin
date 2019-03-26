package com.xasz.cms.dept.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.dept.entity.DeptFormMap;
import com.xasz.cms.dept.mapper.DeptMapper;

@Service
public class DeptService {

	@Inject
	private DeptMapper mapper;

	public List<DeptFormMap> findByPage(DeptFormMap deptFormMap) {
		return mapper.findByPage(deptFormMap);
	}

	public List<DeptFormMap> findByName(DeptFormMap deptFormMap) {
		return mapper.findByName(deptFormMap);
	}

	public void add(DeptFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	public DeptFormMap findById(String id) {
		return mapper.findById(id);
	}

	public void updateById(DeptFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	public List<DeptFormMap> findAll() {
		return mapper.findAll();
	}

}
