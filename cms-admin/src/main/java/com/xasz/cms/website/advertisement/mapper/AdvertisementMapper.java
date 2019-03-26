package com.xasz.cms.website.advertisement.mapper;

import java.util.List;

import com.xasz.cms.website.advertisement.entity.AdvertisementFormMap;

public interface AdvertisementMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<AdvertisementFormMap> findByPage(AdvertisementFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(AdvertisementFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(AdvertisementFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public AdvertisementFormMap findById(String id);

	/**
	 * 查找所有
	 * 
	 * @param formMap
	 * @return
	 */
	public List<AdvertisementFormMap> findAll(AdvertisementFormMap formMap);
}
