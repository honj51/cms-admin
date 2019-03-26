package com.xasz.cms.website.group.mapper;

import java.util.List;

import com.xasz.cms.website.group.entity.GroupFormMap;

public interface GroupMapper {

	/**
	 * 分页查找
	 * 
	 * @param formMap
	 * @return
	 */
	public List<GroupFormMap> findByPage(GroupFormMap formMap);

	/**
	 * 新增方法
	 * 
	 * @param formMap
	 */
	public void add(GroupFormMap formMap) throws Exception;

	/**
	 * 根据id更新
	 * 
	 * @param formMap
	 */
	public void updateById(GroupFormMap formMap) throws Exception;

	/**
	 * 根据id查找
	 * 
	 * @param id
	 * @return
	 */
	public GroupFormMap findById(String id);

	/**
	 * 查找最新的集团信息
	 * 
	 * @return
	 */
	public GroupFormMap findLastCreate();
}
