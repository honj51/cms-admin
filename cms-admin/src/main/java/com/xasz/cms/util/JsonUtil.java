package com.xasz.cms.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSONObject;

public class JsonUtil {
	/**
	 * 将json格式封装的字符串数据转换成java中的Map数据
	 * 
	 * @return
	 */
	public static Map<String, Object> JSON2Map(String text) {
		Map<String, Object> map = new HashMap<String, Object>();
		JSONObject jsonObject = JSONObject.parseObject(text);
		for (Entry<String, Object> entry : jsonObject.entrySet()) {
			map.put(entry.getKey(), entry.getValue());
		}
		return map;
	}
}
