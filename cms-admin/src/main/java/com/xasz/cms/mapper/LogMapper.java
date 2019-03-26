package com.xasz.cms.mapper;

import java.util.List;

public interface LogMapper {
	public <T> List<T> findLogPage(T formMap);
}
