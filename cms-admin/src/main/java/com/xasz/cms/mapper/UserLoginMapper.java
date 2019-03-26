package com.xasz.cms.mapper;

import java.util.List;

import com.xasz.cms.entity.UserLoginFormMap;

public interface UserLoginMapper {
	public List<UserLoginFormMap> findByPage(UserLoginFormMap userLoginFormMap);
}
