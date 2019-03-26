package com.xasz.cms.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class IDService {
	/**
	 * 获取32位的uuid
	 * 
	 * @return
	 */
	public String getID() {
		UUID uuid = UUID.randomUUID();
		// 得到对象产生的ID
		String id = uuid.toString().replaceAll("-", "").toUpperCase();
		return id;
	}
}
