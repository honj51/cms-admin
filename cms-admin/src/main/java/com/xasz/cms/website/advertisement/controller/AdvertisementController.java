package com.xasz.cms.website.advertisement.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Random;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xasz.cms.annotation.SystemLog;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.global.Constants;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;
import com.xasz.cms.util.ImgUtil;
import com.xasz.cms.website.advertisement.entity.AdvertisementFormMap;
import com.xasz.cms.website.advertisement.service.AdvertisementService;

@Controller
@Scope("request")
@RequestMapping("/website/advertisement")
public class AdvertisementController extends BaseController {

	@Inject
	private AdvertisementService advertisementService;

	@Inject
	private IDService idService;

	@Value("${host.fileUploadUrl}")
	private String fileUploadUrl;

	@RequestMapping("list")
	@SystemLog(module = "集团官网管理-广告管理", methods = "打开页面")
	public String list(HttpServletRequest request, Model model) {
		model.addAttribute("res", findByRes());
		return Common.BACKGROUND_PATH + "/website/advertisement/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	@SystemLog(module = "集团官网管理-广告管理", methods = "加载页面数据")
	public PageView findByPage(HttpServletRequest request) {
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		PageHelper.startPage(Integer.parseInt(page), Integer.parseInt(rows));

		AdvertisementFormMap advertisementFormMap = new AdvertisementFormMap();
		advertisementFormMap = toFormMap(advertisementFormMap, page, rows);
		String position = request.getParameter("position");

		advertisementFormMap.put("position", position);

		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			advertisementFormMap.put("orderbypart", sidx + " " + sord);
		}
		Page<AdvertisementFormMap> adFormMaps = (Page<AdvertisementFormMap>) advertisementService
				.findByPage(advertisementFormMap);
		List<AdvertisementFormMap> formMaps = new ArrayList<AdvertisementFormMap>();
		for (AdvertisementFormMap map : adFormMaps) {
			formMaps.add(map);
		}
		pageView.setRows(formMaps);
		pageView.setRecords(adFormMaps.getTotal());
		pageView.setTotal(adFormMaps.getPages());
		return pageView;
	}

	@RequestMapping("addUI")
	@SystemLog(module = "集团官网管理-广告管理", methods = "打开新增页面")
	public String addUI(HttpServletRequest request, Model model) {
		model.addAttribute("id", idService.getID());
		return Common.BACKGROUND_PATH + "/website/advertisement/add";
	}

	@ResponseBody
	@RequestMapping("add")
	@SystemLog(module = "集团官网管理-广告管理", methods = "新增广告")
	public String add(HttpServletRequest request) {
		String id = request.getParameter("id");
		String position = request.getParameter("position");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(position)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		AdvertisementFormMap advertisementFormMap = advertisementService.findById(id);
		if (null != advertisementFormMap) {
			AdvertisementFormMap formMap = new AdvertisementFormMap();
			formMap.put("id", id);
			formMap.put("position", position);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				advertisementService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		} else {
			AdvertisementFormMap formMap = new AdvertisementFormMap();
			formMap.put("id", id);
			formMap.put("position", position);
			formMap.put("create_user_id", userId);
			formMap.put("create_user_name", userName);
			formMap.put("create_time", currentDateTime);
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				advertisementService.add(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("upload")
	@SystemLog(module = "集团官网管理-广告管理", methods = "上传广告图片")
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

			AdvertisementFormMap advertisementFormMap = advertisementService.findById(id);
			if (null != advertisementFormMap) {
				// 保存图片上传信息
				AdvertisementFormMap formMap = new AdvertisementFormMap();
				formMap.put("id", id);
				formMap.put("url", url);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					advertisementService.updateById(formMap);
				} catch (Exception e) {
					e.printStackTrace();
					return "fail";
				}
			} else {
				// 保存图片上传信息
				AdvertisementFormMap formMap = new AdvertisementFormMap();
				formMap.put("id", id);
				formMap.put("url", url);
				formMap.put("create_user_id", userId);
				formMap.put("create_user_name", userName);
				formMap.put("create_time", currentDateTime);
				formMap.put("update_user_id", userId);
				formMap.put("update_user_name", userName);
				formMap.put("update_time", currentDateTime);
				try {
					advertisementService.add(formMap);
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
	@RequestMapping("deletePhoto")
	@SystemLog(module = "集团官网管理-广告管理", methods = "删除广告图片")
	public String deletePhoto(HttpServletRequest request) {
		String id = request.getParameter("id");
		if (StringUtils.isBlank(id)) {
			return "fail";
		}

		AdvertisementFormMap formMap = new AdvertisementFormMap();
		formMap.put("id", id);
		formMap.put("url", "");
		try {
			advertisementService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@RequestMapping("editUI")
	@SystemLog(module = "集团官网管理-广告管理", methods = "打开修改页面")
	public String editUI(HttpServletRequest request, Model model) {
		String id = request.getParameter("id");
		AdvertisementFormMap formMap = advertisementService.findById(id);
		model.addAttribute("formMap", formMap);

		return Common.BACKGROUND_PATH + "/website/advertisement/edit";
	}

	@ResponseBody
	@RequestMapping("edit")
	
	@SystemLog(module = "集团官网管理-广告管理", methods = "修改广告")
	public String edit(HttpServletRequest request) {
		String id = request.getParameter("id");
		String position = request.getParameter("position");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(position)) {
			return "fail";
		}

		// 获取当前登陆用户信息
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		String userId = (String) userFormMap.get("id");
		String userName = (String) userFormMap.get("name");
		String currentDateTime = DateTimeUtil.getCurrentDateTime();

		AdvertisementFormMap formMap = new AdvertisementFormMap();
		formMap.put("id", id);
		formMap.put("position", position);
		formMap.put("update_user_id", userId);
		formMap.put("update_user_name", userName);
		formMap.put("update_time", currentDateTime);
		try {
			advertisementService.updateById(formMap);
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "success";
	}

	@ResponseBody
	@RequestMapping("delete")
	@SystemLog(module = "集团官网管理-广告管理", methods = "删除广告")
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

			AdvertisementFormMap formMap = new AdvertisementFormMap();
			formMap.put("id", id);
			formMap.put("is_delete", String.valueOf(Constants.DELETE));
			formMap.put("update_user_id", userId);
			formMap.put("update_user_name", userName);
			formMap.put("update_time", currentDateTime);
			try {
				advertisementService.updateById(formMap);
			} catch (Exception e) {
				e.printStackTrace();
				return "fail";
			}
		}
		return "success";
	}

	/**
	 * 集团官网图片请求接口
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "findAllList", method = RequestMethod.POST)
	public List<AdvertisementFormMap> findAllList(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");

		String position = request.getParameter("position");

		AdvertisementFormMap formMap = new AdvertisementFormMap();
		formMap.put("position", position);
		List<AdvertisementFormMap> formMaps = advertisementService.findAll(formMap);
		return formMaps;
	}

	public static void main(String[] args) throws Exception {
		String zipFilePath = "C:\\Users\\rod\\Desktop\\新建文件夹\\images.zip";
		String fileSavePath = "C:\\Users\\rod\\Desktop\\新建文件夹";
		boolean isDelete = false;
		int BUFFEREDSIZE  = 1024;

		try {
			(new File(fileSavePath)).mkdirs();
			File f = new File(zipFilePath);
			if ((!f.exists()) && (f.length() <= 0)) {
				throw new Exception("要解压的文件不存在!");
			}
			ZipFile zipFile = new ZipFile(f);
			String strPath, gbkPath, strtemp;
			File tempFile = new File(fileSavePath);// 从当前目录开始
			strPath = tempFile.getAbsolutePath();// 输出的绝对位置
			Enumeration<ZipEntry> e = zipFile.getEntries();
			while (e.hasMoreElements()) {
				ZipEntry zipEnt = e.nextElement();
				gbkPath = zipEnt.getName();
				if (zipEnt.isDirectory()) {
					strtemp = strPath + File.separator + gbkPath;
					File dir = new File(strtemp);
					dir.mkdirs();
					continue;
				} else {
					// 读写文件
					InputStream is = zipFile.getInputStream(zipEnt);
					BufferedInputStream bis = new BufferedInputStream(is);
					gbkPath = zipEnt.getName();
					strtemp = strPath + File.separator + gbkPath;
					// 建目录
					String strsubdir = gbkPath;
					for (int i = 0; i < strsubdir.length(); i++) {
						if (strsubdir.substring(i, i + 1).equalsIgnoreCase("/")) {
							String temp = strPath + File.separator + strsubdir.substring(0, i);
							File subdir = new File(temp);
							if (!subdir.exists())
								subdir.mkdir();
						}
					}
					FileOutputStream fos = new FileOutputStream(strtemp);
					BufferedOutputStream bos = new BufferedOutputStream(fos);
					int len;
					byte[] buff = new byte[BUFFEREDSIZE];
					while ((len = bis.read(buff)) != -1) {
						bos.write(buff, 0, len);
					}
					bos.close();
					fos.close();
					zipFile.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		if (isDelete) {
			new File(zipFilePath).delete();
		}
	}

}
