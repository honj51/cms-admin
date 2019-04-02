package com.xasz.cms.property.notice.controller;

import javax.inject.Inject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.property.notice.mapper.PropertyNoticeMapper;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.service.UserService;

@Controller
@Scope("request")
@RequestMapping("/property/notice")
public class PropertyNoticeController extends BaseController{

	@Inject
	private PropertyNoticeMapper propertyNoticeMapper;

	@Inject
	private IDService idService;
	
	@Inject
	private  UserService  userService;
	
}
