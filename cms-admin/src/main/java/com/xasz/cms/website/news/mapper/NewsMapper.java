package com.xasz.cms.website.news.mapper;

import java.util.List;

import com.xasz.cms.website.news.entity.NewsFormMap;

public interface NewsMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<NewsFormMap> findByPage(NewsFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(NewsFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(NewsFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public NewsFormMap findById(String id);
}
