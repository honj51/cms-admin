package com.xasz.cms.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;

public class XmlUtil {
	/**
	 * map转成xml
	 * 
	 * @param arr
	 * @return
	 */
	public static String mapToXml(Map<String, String> arr) {

		String xml = "<xml>";

		Iterator<Entry<String, String>> iter = arr.entrySet().iterator();
		while (iter.hasNext()) {
			Entry<String, String> entry = iter.next();
			String key = entry.getKey();
			String val = entry.getValue();
			xml += "<" + key + ">" + val + "</" + key + ">";
		}

		xml += "</xml>";
		return xml;
	}

	public static Map<String, String> xmlToMap(String xml) {
		Map<String, String> result = null;

		InputStream inputStream = new ByteArrayInputStream(xml.getBytes());
		try {
			XmlPullParser pullParser = XmlPullParserFactory.newInstance().newPullParser();
			pullParser.setInput(inputStream, "UTF-8");
			// 为xml设置要解析的xml数据
			int eventType = pullParser.getEventType();

			while (eventType != XmlPullParser.END_DOCUMENT) {
				switch (eventType) {
				case XmlPullParser.START_DOCUMENT:
					result = new HashMap<String, String>();
					break;
				case XmlPullParser.START_TAG:
					String key = pullParser.getName();
					if (key.equals("xml")) {
						break;
					}
					String value = pullParser.nextText();
					result.put(key, value);
					break;
				case XmlPullParser.END_TAG:
					break;
				}
				eventType = pullParser.next();
			}
		} catch (XmlPullParserException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}

}
