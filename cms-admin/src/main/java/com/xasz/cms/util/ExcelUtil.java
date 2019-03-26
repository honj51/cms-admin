package com.xasz.cms.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import eu.bitwalker.useragentutils.Browser;
import eu.bitwalker.useragentutils.UserAgent;

public class ExcelUtil {
	/**
	 * 设置下载文件中文件的名称
	 * 
	 * @param filename
	 * @param request
	 * @return
	 */
	public static String encodeFilename(String filename, HttpServletRequest request) {
		UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
		if (null == userAgent) {
			return filename;
		}

		Browser browserGroup = userAgent.getBrowser().getGroup();
		// IE的情况下

		if (Browser.IE.equals(browserGroup) || Browser.EDGE.equals(browserGroup)) {
			String newFileName;
			try {
				newFileName = URLEncoder.encode(filename, "UTF-8");
				newFileName = StringUtils.replace(newFileName, "+", "%20");
				if (newFileName.length() > 150) {
					newFileName = new String(filename.getBytes("GB2312"), "ISO8859-1");
					newFileName = StringUtils.replace(newFileName, " ", "%20");
				}
				return newFileName;
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

		}
		// 火狐的情况下
		if (Browser.FIREFOX.equals(browserGroup) || Browser.CHROME.equals(browserGroup)) {
			try {
				return MimeUtility.encodeText(filename, "UTF-8", "B");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		// 其他情况下
		return filename;
	}
}
