package com.xasz.cms.hotel.reserve.mapper;

import java.util.List;

import com.xasz.cms.hotel.reserve.entity.HotelReserveFormMap;

public interface HotelReserveMapper {

	/**
	 * 分页查找
	 * 
	 * @param HotelReserveFormMap
	 * @return
	 */
	public List<HotelReserveFormMap> findByPage(HotelReserveFormMap formMap);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public HotelReserveFormMap findById(String id);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(HotelReserveFormMap formMap) throws Exception;

	/**
	 * 新增
	 * 
	 * @param formMap
	 */
	public void add(HotelReserveFormMap formMap) throws Exception;

}
