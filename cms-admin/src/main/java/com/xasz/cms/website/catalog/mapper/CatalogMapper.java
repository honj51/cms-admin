package com.xasz.cms.website.catalog.mapper;

import java.util.List;

import com.xasz.cms.website.catalog.entity.CatalogFormMap;

public interface CatalogMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<CatalogFormMap> findByPage(CatalogFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(CatalogFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(CatalogFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public CatalogFormMap findById(String id);

	/**
	 * 查找所有目录
	 * 
	 * @return
	 */
	public List<CatalogFormMap> findAll();
}
