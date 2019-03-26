package com.xasz.cms.website.bottom.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.website.bottom.entity.BottomFormMap;
import com.xasz.cms.website.bottom.mapper.BottomMapper;

@Service
public class BottomService {

	@Inject
	private BottomMapper bottomMapper;

	public List<BottomFormMap> findByPage(BottomFormMap bottomFormMap) {
		return bottomMapper.findByPage(bottomFormMap);
	}

	public BottomFormMap findById(String id) {
		return bottomMapper.findById(id);
	}

	public void updateById(BottomFormMap formMap) {
		bottomMapper.updateById(formMap);
	}

	public void add(BottomFormMap formMap) {
		bottomMapper.add(formMap);
	}

	public List<BottomFormMap> findAll() {
		return bottomMapper.findAll();
	}

}
