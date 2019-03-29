package com.xasz.cms.hotel.food.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.hotel.food.entity.HotelFoodFormMap;
import com.xasz.cms.hotel.food.mapper.HotelFoodMapper;

@Service
public class HotelFoodService {

	@Inject
	private HotelFoodMapper foodMapper;

	@Transactional(readOnly = true)
	public List<HotelFoodFormMap> findByPage(HotelFoodFormMap HotelFoodFormMap) {
		return foodMapper.findByPage(HotelFoodFormMap);
	}

	@Transactional(readOnly = true)
	public HotelFoodFormMap findById(String id) {
		return foodMapper.findById(id);
	}

	@Transactional(readOnly = false)
	public void updateById(HotelFoodFormMap formMap) {
		foodMapper.updateById(formMap);
	}

	@Transactional(readOnly = false)
	public void add(HotelFoodFormMap formMap) {
		foodMapper.add(formMap);
	}

	@Transactional(readOnly = true)
	public List<HotelFoodFormMap> findAll() {
		return foodMapper.findAll();
	}

}
