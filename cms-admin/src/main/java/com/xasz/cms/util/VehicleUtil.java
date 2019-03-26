package com.xasz.cms.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public class VehicleUtil {

	/**
	 * 判断车牌号是否有效
	 * 
	 * @param vehicleNo
	 * @return
	 */
	public static boolean isVehicleNoValid(String vehicleNo) {
		if (StringUtils.isBlank(vehicleNo)) {
			return false;
		}

		Pattern pattern = Pattern.compile("^[\u4e00-\u9fa5|WJ]{1}[A-Z0-9]{6}$");
		Matcher matcher = pattern.matcher(vehicleNo);
		if (!matcher.matches()) {
			return false;
		}

		return true;
	}

	/**
	 * 判断车牌号前缀是否正确
	 * 
	 * @param name
	 * @return
	 */
	public static boolean matcheVehicleNo(String name) {
		return name.matches("^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}$");
	}

}
