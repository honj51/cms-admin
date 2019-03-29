package com.xasz.cms.website.bottom.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.website.bottom.entity.BottomFormMap;
import com.xasz.cms.website.bottom.mapper.BottomMapper;

@Service
public class BottomService {

	@Inject
	private BottomMapper bottomMapper;
	@Transactional(readOnly = true)
	public List<BottomFormMap> findByPage(BottomFormMap bottomFormMap) {
		return bottomMapper.findByPage(bottomFormMap);
	}
	@Transactional(readOnly = true)
	public BottomFormMap findById(String id) {
		return bottomMapper.findById(id);
	}
	@Transactional(readOnly = false)
	public void updateById(BottomFormMap formMap) {
		bottomMapper.updateById(formMap);
	}
	@Transactional(readOnly = true)
	public void add(BottomFormMap formMap) {
		bottomMapper.add(formMap);
	}
	@Transactional(readOnly = true)
	public List<BottomFormMap> findAll() {
		return bottomMapper.findAll();
	}

}
