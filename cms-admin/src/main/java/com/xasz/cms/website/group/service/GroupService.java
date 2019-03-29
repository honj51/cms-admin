package com.xasz.cms.website.group.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xasz.cms.website.group.entity.GroupFormMap;
import com.xasz.cms.website.group.mapper.GroupMapper;

@Service
public class GroupService {

	@Inject
	private GroupMapper mapper;

	@Transactional(readOnly = true)
	public List<GroupFormMap> findByPage(GroupFormMap formMap) {
		return mapper.findByPage(formMap);
	}
	@Transactional(readOnly = true)
	public void add(GroupFormMap formMap) throws Exception {
		mapper.add(formMap);
	}
	@Transactional(readOnly = false)
	public void updateById(GroupFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}
	@Transactional(readOnly = true)
	public GroupFormMap findById(String id) {
		return mapper.findById(id);
	}
	@Transactional(readOnly = true)
	public GroupFormMap findLastCreate() {
		return mapper.findLastCreate();
	}

}
