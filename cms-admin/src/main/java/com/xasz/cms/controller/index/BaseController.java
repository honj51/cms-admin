package com.xasz.cms.controller.index;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.xasz.cms.entity.ResFormMap;
import com.xasz.cms.mapper.ResourcesMapper;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.FormMap;

public class BaseController {

	@Inject
	private ResourcesMapper resourcesMapper;

	protected PageView pageView;

	@Value("${platform.id}")
	protected String platformId;

	@Value("${platform.name}")
	protected String platformName;

	private PageView getPageView(String pageNo, String rowNum) {
		// 设定页码
		if (StringUtils.isBlank(pageNo)) {
			pageView = new PageView(1);
		} else {
			pageView = new PageView(Integer.parseInt(pageNo));
		}

		// 设定行数
		if (StringUtils.isBlank(rowNum)) {
			rowNum = "20";
		}
		pageView.setPageSize(Integer.parseInt(rowNum));
		return pageView;
	}

	public <T> T toFormMap(T t, String pageNo, String rowNum) {
		FormMap<String, Object> formMap = (FormMap<String, Object>) t;
		formMap.put("paging", getPageView(pageNo, rowNum));
		return t;
	}

	public List<ResFormMap> findByRes() {
		// 资源ID
		String id = getPara("id");
		// 获取request
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		// 通过工具类获取当前登录的bean
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		// user id
		String userId = userFormMap.getStr("id");
		ResFormMap resQueryForm = new ResFormMap();
		resQueryForm.put("parentId", id);
		resQueryForm.put("userId", userId);
		List<ResFormMap> rse = resourcesMapper.findRes(resQueryForm);
		for (ResFormMap resFormMap : rse) {
			Object o = resFormMap.get("description");
			if (o != null && !StringUtils.isBlank(o.toString())) {
				resFormMap.put("description", Common.stringtohtml(o.toString()));
			}
		}
		return rse;
	}

	public String getPara(String key) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		return request.getParameter(key);
	}

	public String[] getParaValues(String key) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		return request.getParameterValues(key);
	}
}