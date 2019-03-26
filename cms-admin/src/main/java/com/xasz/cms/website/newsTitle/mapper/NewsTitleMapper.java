package com.xasz.cms.website.newsTitle.mapper;

import java.util.List;

import com.xasz.cms.website.newsTitle.entity.NewsTitleFormMap;

public interface NewsTitleMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<NewsTitleFormMap> findByPage(NewsTitleFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(NewsTitleFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(NewsTitleFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public NewsTitleFormMap findById(String id);

	public List<NewsTitleFormMap> findAll();
}
