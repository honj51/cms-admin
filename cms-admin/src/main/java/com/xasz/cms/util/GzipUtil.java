package com.xasz.cms.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import org.apache.commons.lang.StringUtils;

public class GzipUtil {
	/**
	 * 压缩
	 * 
	 * @param str
	 * @return
	 * @throws IOException
	 */
	public static String compress(String str) {
		if (StringUtils.isBlank(str)) {
			return null;
		}
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		GZIPOutputStream gzipos = null;
		try {
			gzipos = new GZIPOutputStream(baos);
			gzipos.write(str.getBytes());
			return baos.toString();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != gzipos) {
				try {
					gzipos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (null != baos) {
				try {
					baos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}

	/**
	 * 解压缩
	 * 
	 * @param str
	 * @return
	 * @throws IOException
	 */
	public static String uncompress(String str) {
		if (StringUtils.isBlank(str)) {
			return null;
		}
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ByteArrayInputStream bais = null;
		GZIPInputStream gzipis = null;
		try {
			bais = new ByteArrayInputStream(str.getBytes());
			gzipis = new GZIPInputStream(bais);
			byte[] buffer = new byte[256];
			int n;
			while ((n = gzipis.read(buffer)) >= 0) {
				baos.write(buffer, 0, n);
			}
			// toString()使用平台默认编码，也可以显式的指定如toString(&quot;GBK&quot;)
			return baos.toString();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != gzipis) {
				try {
					gzipis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (null != baos) {
				try {
					baos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (null != bais) {
				try {
					bais.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}

	public static String uncompress(InputStream is) {
		if (null == is) {
			return null;
		}
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		GZIPInputStream gzipis = null;
		try {
			gzipis = new GZIPInputStream(is);
			byte[] buffer = new byte[256];
			int n;
			while ((n = gzipis.read(buffer)) >= 0) {
				baos.write(buffer, 0, n);
			}
			// toString()使用平台默认编码，也可以显式的指定如toString(&quot;GBK&quot;)
			return baos.toString();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != gzipis) {
				try {
					gzipis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (null != baos) {
				try {
					baos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}

	// 测试方法
	public static void main(String[] args) throws IOException {

		// 测试字符串
		String str = "{\"type\":1,\"service_id\":2741}";

		System.out.println("原长度：" + str.length());

		System.out.println("压缩后：" + GzipUtil.compress(str).length());

		System.out.println("解压缩：" + GzipUtil.uncompress(GzipUtil.compress(str)));
	}
}
