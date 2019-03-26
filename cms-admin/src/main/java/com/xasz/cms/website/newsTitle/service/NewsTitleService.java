package com.xasz.cms.website.newsTitle.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.website.newsTitle.entity.NewsTitleFormMap;
import com.xasz.cms.website.newsTitle.mapper.NewsTitleMapper;

@Service
public class NewsTitleService {

	@Inject
	private NewsTitleMapper mapper;

	public List<NewsTitleFormMap> findByPage(NewsTitleFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	public void add(NewsTitleFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	public void updateById(NewsTitleFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	public NewsTitleFormMap findById(String id) {
		return mapper.findById(id);
	}

	public List<NewsTitleFormMap> findAll() {
		return mapper.findAll();
	}

}
