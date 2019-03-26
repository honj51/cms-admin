package com.xasz.cms.hotel.prop.mapper;

import java.util.List;

import com.xasz.cms.hotel.prop.entity.HotelPropFormMap;

public interface HotelPropMapper {

	/**
	 * 分页查找
	 * 
	 * @param hotelPropFormMap
	 * @return
	 */
	public List<HotelPropFormMap> findByPage(HotelPropFormMap hotelPropFormMap);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public HotelPropFormMap findById(String id);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(HotelPropFormMap formMap);

	/**
	 * 新增
	 * 
	 * @param formMap
	 */
	public void add(HotelPropFormMap formMap);

	/**
	 * 查找所有
	 * 
	 * @param formMap
	 * @return
	 */
	public List<HotelPropFormMap> findAll(HotelPropFormMap formMap);

}
