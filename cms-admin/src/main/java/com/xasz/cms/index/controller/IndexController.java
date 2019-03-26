package com.xasz.cms.index.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.entity.ResFormMap;
import com.xasz.cms.mapper.ResourcesMapper;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.mapper.UserMapper;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.PasswordHelper;
import com.xasz.cms.util.TreeObject;
import com.xasz.cms.util.TreeUtil;

@Controller
@Scope("request")
@RequestMapping("/")
public class IndexController extends BaseController {

	@Inject
	private ResourcesMapper resourcesMapper;

	@Inject
	private UserMapper userMapper;

	@Value("${platform.nickname}")
	private String nickname;

	@Value("${dashboard.logo}")
	private String dashboardLogo;

	@Value("${index.headTitle}")
	private String indexHeadTitle;

	@Value("${index.adminTitle}")
	private String adminTitle;

	@RequestMapping("index")
	public String index(HttpServletRequest request, Model model) throws Exception {
		// 获取登录的bean
		UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
		ResFormMap resFormMap = new ResFormMap();
		resFormMap.put("userId", userFormMap.get("id"));
		List<ResFormMap> mps = resourcesMapper.findRes(resFormMap);
		// List<ResFormMap> mps = resourcesMapper.findByWhere(new ResFormMap());
		List<TreeObject> list = new ArrayList<TreeObject>();
		for (ResFormMap map : mps) {
			TreeObject ts = new TreeObject();
			Common.flushObject(ts, map);
			list.add(ts);
		}
		TreeUtil treeUtil = new TreeUtil();
		List<TreeObject> ns = treeUtil.getChildTreeObjects(list, "0");
		model.addAttribute("list", ns);
		// 登陆的信息回传页面
		model.addAttribute("userFormMap", userFormMap);

		model.addAttribute("dashboardLogo", dashboardLogo);
		model.addAttribute("indexHeadTitle", indexHeadTitle);
		model.addAttribute("userFormMap", userFormMap);
		return Common.BACKGROUND_PATH + "/index/index";
	}

	/**
	 * 首页修改密码
	 * 
	 * @return
	 * @throws IOException
	 */
	@ResponseBody
	@RequestMapping(value = "doChangePwdByIndexPage", method = RequestMethod.POST, produces = "text/html; charset=utf-8")
	public Map<String, String> doChangePwdByIndexPage(HttpServletRequest request, HttpServletResponse rsp)
			throws Exception {
		/**
		 * 修改密码业务
		 */
		String oldPsw = request.getParameter("oldPassword");
		String newPsw = request.getParameter("editPassword");
		String againPsw = request.getParameter("newPassword");
		String checkRslt = checkForChangePwd(oldPsw, newPsw, againPsw);
		Map<String, String> result = new HashMap<String, String>();
		if (checkRslt.equals("ok")) {
			UserFormMap userFormMap = (UserFormMap) Common.findUserSession(request);
			if (null == userFormMap || userFormMap.keySet().isEmpty()) {
				result.put("result", "用户会话已过期！");
				return result;
			} else {
				userFormMap.put("password", oldPsw);
				new PasswordHelper().encryptPasswordForUpdate(userFormMap);
				List<UserFormMap> userFormMaps = userMapper.findByNames(userFormMap);
				if (userFormMaps.size() == 0) {
					result.put("result", "原始密码错误！");
					return result;
				} else {
					UserFormMap targetUser = userFormMaps.get(0);
					targetUser.put("password", newPsw);
					new PasswordHelper().encryptPassword(targetUser);
					userMapper.updateById(targetUser);
					result.put("result", "success");
					return result;
				}
			}
		} else {
			result.put("result", checkRslt);
			return result;
		}
	}

	public String checkForChangePwd(String oldPsw, String newPsw, String againPsw) {
		// 匹配标识符必须由字母、数字、下划线组成，且开头和结尾不能有下划线
		// final String regex1 = "(^[a-z0-9A-Z])[a-z0-9A-Z_]+([a-z0-9-A-Z])";
		// 由数字和字母组成的字符串
		final String regex2 = "^[A-Za-z0-9]+$";
		String rslt = "ok";

		if (null == oldPsw || oldPsw.equals("") || oldPsw.equals("null")) {
			rslt = "原始密码不能为空";
			return rslt;
		}
		if (null == newPsw || newPsw.equals("") || newPsw.equals("null")) {
			rslt = "新密码不能为空";
			return rslt;
		}
		if (null == againPsw || againPsw.equals("") || againPsw.equals("null")) {
			rslt = "请填写确认密码";
			return rslt;
		}

		if (!Pattern.matches(regex2, newPsw)) {
			rslt = "新密码符必须为数字或字母组成";
			return rslt;
		}

//		if (newPsw.length() != 6) {
//			rslt = "新密码长度应为6";
//			return rslt;
//		}

		if (!newPsw.equals(againPsw)) {
			rslt = "新密码与确认密码不同，请重新确认";
			return rslt;
		}

		return rslt;
	}

}
