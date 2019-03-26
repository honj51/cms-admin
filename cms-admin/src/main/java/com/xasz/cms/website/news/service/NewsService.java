package com.xasz.cms.website.news.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.website.news.entity.NewsFormMap;
import com.xasz.cms.website.news.mapper.NewsMapper;

@Service
public class NewsService {

	@Inject
	private NewsMapper mapper;

	public List<NewsFormMap> findByPage(NewsFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	public void add(NewsFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	public void updateById(NewsFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	public NewsFormMap findById(String id) {
		return mapper.findById(id);
	}

}
