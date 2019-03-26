package com.xasz.cms.hotel.food.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.hotel.food.entity.HotelFoodFormMap;
import com.xasz.cms.hotel.food.mapper.HotelFoodMapper;

@Service
public class HotelFoodService {

	@Inject
	private HotelFoodMapper foodMapper;

	public List<HotelFoodFormMap> findByPage(HotelFoodFormMap HotelFoodFormMap) {
		return foodMapper.findByPage(HotelFoodFormMap);
	}

	public HotelFoodFormMap findById(String id) {
		return foodMapper.findById(id);
	}

	public void updateById(HotelFoodFormMap formMap) {
		foodMapper.updateById(formMap);
	}

	public void add(HotelFoodFormMap formMap) {
		foodMapper.add(formMap);
	}

	public List<HotelFoodFormMap> findAll() {
		return foodMapper.findAll();
	}

}
