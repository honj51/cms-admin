package com.xasz.cms.login.controller;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xasz.cms.common.Locked;
import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.entity.UserLoginFormMap;
import com.xasz.cms.service.IDService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.service.UserService;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;

@Controller
@Scope("request")
@RequestMapping("/")
public class LoginController extends BaseController {

	@Inject
	private UserService userService;

	@Inject
	private IDService idService;

	@Value("${index.background}")
	private String indexBackground;

	@Value("${index.logo}")
	private String indexLogo;

	@Value("${index.left}")
	private String indexLeft;

	@Value("${index.title}")
	private String indexTitle;

	@Value("${index.headTitle}")
	private String indexHeadTitle;

	/**
	 * @return
	 */
	@RequestMapping(value = "login", method = RequestMethod.GET, produces = "text/html; charset=utf-8")
	public String login(HttpServletRequest request, Model model) {
		request.removeAttribute("error");

		model.addAttribute("indexBackground", indexBackground);
		model.addAttribute("indexLogo", indexLogo);
		model.addAttribute("indexHeadTitle", indexHeadTitle);
		return Common.BACKGROUND_PATH + "/login/login";
	}

	@ResponseBody
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public Map<String, String> loginLog(HttpServletRequest request, Model model) {
		Map<String, String> result = new HashMap<String, String>();
		String name = request.getParameter("userName");
		String password = request.getParameter("password");
		UserFormMap userFormMap = null;
		try {
			if (!request.getMethod().equals("POST")) {
				result.put("result", "支持POST方法提交！");
			}
			if (StringUtils.isBlank(name) || StringUtils.isBlank(password)) {
				result.put("result", "用户名密码不能为空！");
				return result;
			}
			UserFormMap searchUserFormMap = new UserFormMap();
			searchUserFormMap.put("name", name);
			searchUserFormMap.put("isLocked", String.valueOf(Locked.no));
			userFormMap = userService.findByAccountName(searchUserFormMap);
			if (userFormMap == null) {
				result.put("result", "请联系管理员");
				return result;
			}

			int isLocked = (int) userFormMap.get("is_locked");
			if (Locked.yes.getCode() == isLocked) {
				result.put("result", "请联系管理员");
				return result;
			}
			UsernamePasswordToken token = new UsernamePasswordToken(name, password);

			// 想要得到 SecurityUtils.getSubject() 的对象．．访问地址必须跟ｓｈｉｒｏ的拦截地址内．不然后会报空指针
			Subject user = SecurityUtils.getSubject();
			// 用户输入的账号和密码,,存到UsernamePasswordToken对象中..然后由shiro内部认证对比,
			// 认证执行者交由ShiroDbRealm中doGetAuthenticationInfo处理
			// 当以上认证成功后会向下执行,认证失败会抛出异常
			try {
				user.login(token);
			} catch (LockedAccountException lae) {
				result.put("result", "用户已经被锁定不能登录，请与管理员联系！");
				return result;
			} /*
				 * catch (ExcessiveAttemptsException e) { result.put("result", "账号：" + phone +
				 * " 登录失败次数过多,锁定10分钟!"); return result; }
				 */ catch (AuthenticationException e) {
				token.clear();
				result.put("result", "用户或密码不正确！");
				return result;
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put("result", "登录异常，请联系管理员！");
			return result;
		}

		// 记录登录日志
		String currentDataTime = DateTimeUtil.getCurrentDateTime();
		UserLoginFormMap loginLogFormMap = new UserLoginFormMap();
		Session session = SecurityUtils.getSubject().getSession();
		loginLogFormMap.put("id", idService.getID());
		loginLogFormMap.put("userId", userFormMap.get("id"));
		loginLogFormMap.put("accountName", name);
		loginLogFormMap.put("loginTime", currentDataTime);
		loginLogFormMap.put("loginIP", session.getHost());
		try {
			// userLoginService.add(loginLogFormMap);
		} catch (Exception e) {
			e.printStackTrace();
		}

		result.put("result", "success");
		return result;
	}

	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout() {
		// 使用权限管理工具进行用户的退出，注销登录
		SecurityUtils.getSubject().logout(); // session
												// 会销毁，在SessionListener监听session销毁，清理权限缓存
		return "redirect:login.shtml";
	}

}