package com.xasz.cms.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public class StringUtil {
	/**
	 * 判断变量是否为空
	 * 
	 * @param s
	 * @return
	 */
	public static boolean isEmpty(String s) {
		if (null == s || "".equals(s) || "".equals(s.trim()) || "null".equalsIgnoreCase(s)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 查询参数的前面加上/，防止sql注入
	 * 
	 * @param string
	 * @return
	 */
	public static String escape(String string) {
		String result = null;
		if (!isEmpty(string)) {
			result = string.replace("%", "/%").replace("_", "/_");
		}
		return result;
	}

	/**
	 * 数组转字符串，元素间用逗号分隔
	 * 
	 * @param arr
	 *            数组
	 * @return 字符串
	 */
	public static String arrayToStr(String[] arr) {
		StringBuffer bf = new StringBuffer();
		for (String str : arr) {
			bf.append(str + ",");
		}
		String Strs = bf.toString();
		if (Strs.length() > 0) {
			Strs = Strs.substring(0, Strs.length() - 1);
		}

		return Strs;
	}

	/**
	 * 判断是否为手机号
	 * 
	 * @param mobiles
	 *            手机号码
	 * @return
	 */
	public static boolean isMobileNO(String mobiles) {
		String regExp = "^1[34578]\\d{9}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(mobiles);
		return m.find();
	}

	/**
	 * 利用正则表达式判断字符串是否是小数
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isDecimal(String str) {
		String regExp = "^\\d*\\.\\d*$";
		Pattern pattern = Pattern.compile(regExp);
		Matcher matcher = pattern.matcher(str);
		if (!matcher.matches()) {
			return false;
		}
		return true;
	}

	/**
	 * 删除最后一个逗号
	 * 
	 * @param para
	 * @return
	 */
	public static String trimLastComma(String para) {
		if (StringUtils.isBlank(para)) {
			return "";
		}

		if (para.endsWith(",")) {
			return para.substring(0, para.length() - 1);
		} else {
			return para;
		}
	}

	public static void main(String[] args) {
		System.out.println(StringUtil.isDecimal("38.99"));
	}
}
