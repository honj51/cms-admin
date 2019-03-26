package com.xasz.cms.building.apartment.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xasz.cms.building.apartment.service.BuildingApartmentService;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.util.Common;

@Controller
@Scope("request")
@RequestMapping("/building/apartment/")
public class BuildingApartmentController extends BaseController {

	@Inject
	private BuildingApartmentService apartmentService;

	@RequestMapping("list")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/building/apartment/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	public PageView findByPage(HttpServletRequest request) {
		
		
		
		return pageView;
	}

}
