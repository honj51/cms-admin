package com.xasz.cms.hotel.food.mapper;

import java.util.List;

import com.xasz.cms.hotel.food.entity.HotelFoodFormMap;

public interface HotelFoodMapper {

	/**
	 * 分页查找
	 * 
	 * @param HotelFoodFormMap
	 * @return
	 */
	public List<HotelFoodFormMap> findByPage(HotelFoodFormMap HotelFoodFormMap);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public HotelFoodFormMap findById(String id);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(HotelFoodFormMap formMap);

	/**
	 * 新增
	 * 
	 * @param formMap
	 */
	public void add(HotelFoodFormMap formMap);

	/**
	 * 查找酒店信息
	 * 
	 * @param formMap
	 * @return
	 */
	public List<HotelFoodFormMap> findAll();

}
