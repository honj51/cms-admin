package com.xasz.cms.website.newsTitle.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.website.newsTitle.entity.NewsTitleFormMap;
import com.xasz.cms.website.newsTitle.mapper.NewsTitleMapper;

@Service
public class NewsTitleService {

	@Inject
	private NewsTitleMapper mapper;
	@Transactional(readOnly = true)
	public List<NewsTitleFormMap> findByPage(NewsTitleFormMap formMap) {
		return mapper.findByPage(formMap);
	}
	@Transactional(readOnly = true)
	public void add(NewsTitleFormMap formMap) throws Exception {
		mapper.add(formMap);
	}
	@Transactional(readOnly = false)
	public void updateById(NewsTitleFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}
	@Transactional(readOnly = true)
	public NewsTitleFormMap findById(String id) {
		return mapper.findById(id);
	}
	@Transactional(readOnly = true)
	public List<NewsTitleFormMap> findAll() {
		return mapper.findAll();
	}

}
