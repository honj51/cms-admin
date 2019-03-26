package com.xasz.cms.website.group.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.website.group.entity.GroupFormMap;
import com.xasz.cms.website.group.mapper.GroupMapper;

@Service
public class GroupService {

	@Inject
	private GroupMapper mapper;

	public List<GroupFormMap> findByPage(GroupFormMap formMap) {
		return mapper.findByPage(formMap);
	}

	public void add(GroupFormMap formMap) throws Exception {
		mapper.add(formMap);
	}

	public void updateById(GroupFormMap formMap) throws Exception {
		mapper.updateById(formMap);
	}

	public GroupFormMap findById(String id) {
		return mapper.findById(id);
	}

	public GroupFormMap findLastCreate() {
		return mapper.findLastCreate();
	}

}
