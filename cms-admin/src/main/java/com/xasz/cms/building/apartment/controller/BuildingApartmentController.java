package com.xasz.cms.building.apartment.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.building.apartment.entity.BuildingApartmentFormMap;
import com.xasz.cms.building.apartment.service.BuildingApartmentService;
import com.xasz.cms.building.type.entity.BuildingTypeFormMap;
import com.xasz.cms.building.type.service.BuildingTypeService;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.ImgUtil;
import com.xasz.cms.util.ZipUtil;

@Controller
@Scope("request")
@RequestMapping("/building/apartment/")
public class BuildingApartmentController extends BaseController {

	@Inject
	private BuildingApartmentService apartmentService;

	@Inject
	private BuildingTypeService buildingTypeService;

	@Inject
	private IDService idService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "楼盘管理-户型管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		model.addAttribute("types", buildingTypeService.findAll());
		return Common.BACKGROUND_PATH + "/building/apartment/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "楼盘管理-户型管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		BuildingTypeFormMap buildingTypeFormMap = new BuildingTypeFormMap();
		buildingTypeFormMap = toFormMap(buildingTypeFormMap, page, rows);
		String queryparam = request.getParameter("queryparam");
		String type_id = request.getParameter("type_id");

		buildingTypeFormMap.put("queryparam", queryparam);
		buildingTypeFormMap.put("name", queryparam);
		buildingTypeFormMap.put("type_id", type_id);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			buildingTypeFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<BuildingApartmentFormMap> cinemaInfoFormMaps = (Page<BuildingApartmentFormMap>) apartmentService
				.findByPage(buildingTypeFormMap);
		List<BuildingApartmentFormMap> formMaps = new ArrayList<BuildingApartmentFormMap>();
		for (BuildingApartmentFormMap map : cinemaInfoFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(cinemaInfoFormMaps.getTotal());
		pageView.setTotal(cinemaInfoFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "楼盘管理-户型管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());
		model.addAttribute("typeFormMaps", buildingTypeService.findAll());
		return Common.BACKGROUND_PATH + "/building/apartment/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@SystemLog(module = "楼盘管理-户型管理", methods = "新增户型")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String typeId = request.getParameter("typeId");
		String typeName = request.getParameter("typeName");
		String floor = request.getParameter("floor");
		String renovation = request.getParameter("renovation");
		String name = request.getParameter("name");
		String address = request.getParameter("address");
		String price = request.getParameter("price");
		String phone = request.getParameter("phone");
		String openingTime = request.getParameter("openingTime");
		String handTime = request.getParameter("handTime");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(typeId)) {
			return "fail";
		}
		if (StringUtils.isBlank(floor) || StringUtils.isBlank(renovation)) {
			return "fail";
		}
		if (StringUtils.isBlank(name) || StringUtils.isBlank(address)) {
			return "fail";
		}
		if (StringUtils.isBlank(price) || StringUtils.isBlank(phone)) {
			return "fail";
		}
		if (StringUtils.isBlank(openingTime) || StringUtils.isBlank(handTime)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		BuildingApartmentFormMap apartmentFormMap = apartmentService.findById(id);
		if (null != apartmentFormMap) {
			BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
			formMap.put("id", id);
			formMap.put("type_id", typeId);
			formMap.put("type_name", typeName);
			formMap.put("floor", floor);
			formMap.put("renovation", renovation);
			formMap.put("name", name);
			formMap.put("address", address);
			formMap.put("price", price);
			formMap.put("phone", phone);
			formMap.put("opening_time", openingTime);
			formMap.put("hand_time", handTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				apartmentService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		} else {
			BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
			formMap.put("id", id);
			formMap.put("type_id", typeId);
			formMap.put("type_name", typeName);
			formMap.put("floor", floor);
			formMap.put("renovation", renovation);
			formMap.put("name", name);
			formMap.put("address", address);
			formMap.put("price", price);
			formMap.put("phone", phone);
			formMap.put("opening_time", openingTime);
			formMap.put("hand_time", handTime);
			formMap.put("create_user_id", userId);
			formMap.put("create_user_name", userName);
			formMap.put("create_time", currentDateTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				apartmentService.add(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "楼盘管理-户型管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		BuildingApartmentFormMap formMap = apartmentService.findById(id);
		model.addAttribute("formMap", formMap);

		model.addAttribute("typeFormMaps", buildingTypeService.findAll());
		return Common.BACKGROUND_PATH + "/building/apartment/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	@SystemLog(module = "楼盘管理-户型管理", methods = "修改户型")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String typeId = request.getParameter("typeId");
		String typeName = request.getParameter("typeName");
		String floor = request.getParameter("floor");
		String renovation = request.getParameter("renovation");
		String name = request.getParameter("name");
		String address = request.getParameter("address");
		String price = request.getParameter("price");
		String phone = request.getParameter("phone");
		String openingTime = request.getParameter("openingTime");
		String handTime = request.getParameter("handTime");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(typeId)) {
			return "fail";
		}
		if (StringUtils.isBlank(floor) || StringUtils.isBlank(renovation)) {
			return "fail";
		}
		if (StringUtils.isBlank(name) || StringUtils.isBlank(address)) {
			return "fail";
		}
		if (StringUtils.isBlank(price) || StringUtils.isBlank(phone)) {
			return "fail";
		}
		if (StringUtils.isBlank(openingTime) || StringUtils.isBlank(handTime)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
		formMap.put("id", id);
		formMap.put("type_id", typeId);
		formMap.put("type_name", typeName);
		formMap.put("floor", floor);
		formMap.put("renovation", renovation);
		formMap.put("name", name);
		formMap.put("address", address);
		formMap.put("price", price);
		formMap.put("phone", phone);
		formMap.put("opening_time", openingTime);
		formMap.put("hand_time", handTime);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			apartmentService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@SystemLog(module = "楼盘管理-户型管理", methods = "删除户型")
	public String del(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		if (StringUtils.isBlank(ids)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		String[] idsArraay = ids.split(",");
		for (int i = 0; i < idsArraay.length; i++) {
			String id = idsArraay[i];

			BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				apartmentService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	@ResponseBody
	@RequestMapping("upload")
	@SystemLog(module = "楼盘管理-户型管理", methods = "上传缩略图")
	public String upload(@RequestParam("url") MultipartFile file, HttpServletRequest request) {
		String id = request.getParameter("id");
		if (file.isEmpty() || StringUtils.isBlank(id)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		try {
			String filename = new Date().getTime() + "" + new Random().nextInt() + file.getOriginalFilename()
					.substring(file.getOriginalFilename().indexOf("."), file.getOriginalFilename().length());

			ImgUtil.savePic(file.getInputStream(), filename);

			String url = fileUploadUrl + filename;

			BuildingApartmentFormMap apartmentFormMap = apartmentService.findById(id);
			if (null != apartmentFormMap) {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.add(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("uploadUrlOne")
	@SystemLog(module = "楼盘管理-户型管理", methods = "上传轮播图一")
	public String uploadUrlOne(@RequestParam("urlOne") MultipartFile file, HttpServletRequest request) {
		String id = request.getParameter("id");
		if (file.isEmpty() || StringUtils.isBlank(id)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		try {
			String filename = new Date().getTime() + "" + new Random().nextInt() + file.getOriginalFilename()
					.substring(file.getOriginalFilename().indexOf("."), file.getOriginalFilename().length());

			ImgUtil.savePic(file.getInputStream(), filename);

			String url = fileUploadUrl + filename;

			BuildingApartmentFormMap apartmentFormMap = apartmentService.findById(id);
			if (null != apartmentFormMap) {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("url_one", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("url_one", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.add(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("uploadUrlTwo")
	@SystemLog(module = "楼盘管理-户型管理", methods = "上传轮播图一")
	public String uploadUrlTwo(@RequestParam("urlTwo") MultipartFile file, HttpServletRequest request) {
		String id = request.getParameter("id");
		if (file.isEmpty() || StringUtils.isBlank(id)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		try {
			String filename = new Date().getTime() + "" + new Random().nextInt() + file.getOriginalFilename()
					.substring(file.getOriginalFilename().indexOf("."), file.getOriginalFilename().length());

			ImgUtil.savePic(file.getInputStream(), filename);

			String url = fileUploadUrl + filename;

			BuildingApartmentFormMap apartmentFormMap = apartmentService.findById(id);
			if (null != apartmentFormMap) {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("url_two", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("url_two", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.add(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("uploadUrlThree")
	@SystemLog(module = "楼盘管理-户型管理", methods = "上传轮播图一")
	public String uploadUrlThree(@RequestParam("urlThree") MultipartFile file, HttpServletRequest request) {
		String id = request.getParameter("id");
		if (file.isEmpty() || StringUtils.isBlank(id)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		try {
			String filename = new Date().getTime() + "" + new Random().nextInt() + file.getOriginalFilename()
					.substring(file.getOriginalFilename().indexOf("."), file.getOriginalFilename().length());

			ImgUtil.savePic(file.getInputStream(), filename);

			String url = fileUploadUrl + filename;

			BuildingApartmentFormMap apartmentFormMap = apartmentService.findById(id);
			if (null != apartmentFormMap) {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("url_three", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("url_three", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.add(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("uploadZip")
	@SystemLog(module = "楼盘管理-户型管理", methods = "上传360全景图")
	public String uploadZip(@RequestParam("zipFile") MultipartFile file, HttpServletRequest request) {
		String id = request.getParameter("id");
		if (file.isEmpty() || StringUtils.isBlank(id)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		try {
			String fileId = idService.getID();
			String fileName = fileId + file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."),
					file.getOriginalFilename().length());

			ZipUtil.saveFile(file.getInputStream(), fileName);

			String url = fileUploadUrl + "360/" + fileId + "/index.html";

			String zipFilePath = "E:/apache-tomcat-7.0.68/webapps/upload/360/" + fileName;
			String outZipFilePath = "E:/apache-tomcat-7.0.68/webapps/upload/360/" + fileId;

			ZipUtil.unzip(zipFilePath, outZipFilePath, true);

			BuildingApartmentFormMap apartmentFormMap = apartmentService.findById(id);
			if (null != apartmentFormMap) {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("panorama_url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();
				formMap.put("id", id);
				formMap.put("panorama_url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					apartmentService.add(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	/**
	 * 户型查询接口
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@PostMapping("findAll")
	public List<BuildingApartmentFormMap> findAll(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		String price = request.getParameter("price");
		String floor = request.getParameter("floor");
		String typeId = request.getParameter("typeId");

		BuildingApartmentFormMap searchFormMap = new BuildingApartmentFormMap();
		searchFormMap.put("price", price);
		searchFormMap.put("floor", floor);
		searchFormMap.put("typeId", typeId);
		List<BuildingApartmentFormMap> formMaps = apartmentService.findAll(searchFormMap);

		return formMaps;
	}

	@ResponseBody
	@PostMapping("findById")
	public BuildingApartmentFormMap findById(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		BuildingApartmentFormMap formMap = new BuildingApartmentFormMap();

		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return formMap;
		}

		formMap = apartmentService.findById(id);

		return formMap;
	}

}
