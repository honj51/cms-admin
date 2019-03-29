package com.xasz.cms.website.news.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.website.news.entity.NewsFormMap;
import com.xasz.cms.website.news.mapper.NewsMapper;

@Service
public class NewsService {

	@Inject
	private NewsMapper mapper;
	@Transactional(readOnly = true)
	public List<NewsFormMap> findByPage(NewsFormMap formMap) {
		return mapper.findByPage(formMap);
	}
	@Transactional(readOnly = true)
	public void add(NewsFormMap formMap) throws Exception {
		mapper.add(formMap);
	}
	@Transactional(readOnly = false)
	public void updateById(NewsFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}
	@Transactional(readOnly = true)
	public NewsFormMap findById(String id) {
		return mapper.findById(id);
	}

}
