package com.xasz.cms.mapper;

import com.xasz.cms.entity.ResUserFormMap;

public interface ResUserMapper {

	/**
	 * 给用户添加资源
	 * 
	 * @param ResUserFormMap
	 */
	public void addUserRes(ResUserFormMap resUserFormMap);

	/**
	 * 给用户删除资源
	 * 
	 * @param resUserFormMap
	 */
	public void deleteByUserId(ResUserFormMap resUserFormMap);
}
