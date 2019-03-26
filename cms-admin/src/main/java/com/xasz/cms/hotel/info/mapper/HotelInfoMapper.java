package com.xasz.cms.hotel.info.mapper;

import java.util.List;

import com.xasz.cms.hotel.info.entity.HotelInfoFormMap;

public interface HotelInfoMapper {

	/**
	 * 分页查找
	 * 
	 * @param HotelInfoFormMap
	 * @return
	 */
	public List<HotelInfoFormMap> findByPage(HotelInfoFormMap HotelInfoFormMap);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public HotelInfoFormMap findById(String id);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(HotelInfoFormMap formMap);

	/**
	 * 新增
	 * 
	 * @param formMap
	 */
	public void add(HotelInfoFormMap formMap);

	/**
	 * 查找酒店信息
	 * 
	 * @param formMap
	 * @return
	 */
	public HotelInfoFormMap findHotelInfo();

}
