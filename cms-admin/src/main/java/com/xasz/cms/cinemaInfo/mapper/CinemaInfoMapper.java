package com.xasz.cms.cinemaInfo.mapper;

import java.util.List;

import com.xasz.cms.cinemaInfo.entity.CinemaInfoFormMap;

public interface CinemaInfoMapper {

	/**
	 * 分页查找
	 * 
	 * @param cinemaInfoFormMap
	 * @return
	 */
	public List<CinemaInfoFormMap> findByPage(CinemaInfoFormMap cinemaInfoFormMap);

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(CinemaInfoFormMap formMap);

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public CinemaInfoFormMap findById(String id);

	public void add(CinemaInfoFormMap formMap);

}
