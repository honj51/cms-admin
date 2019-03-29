package com.xasz.cms.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipFile;

public class ZipUtil {

	/**
	 * 根据传入目录解压缩文件
	 * 
	 * @param zipFilePath  压缩文件所在路径
	 * @param fileSavePath 解压至路径
	 * @param isDelete     是否删除原压缩文件
	 * @throws IOException 
	 */
	public static void unzip(String zipFilePath, String fileSavePath, boolean isDelete) throws IOException {
		int BUFFEREDSIZE = 1024;

		BufferedOutputStream bos = null;
		FileOutputStream fos = null;
		ZipFile zipFile = null;

		try {
			(new File(fileSavePath)).mkdirs();
			File f = new File(zipFilePath);
			if ((!f.exists()) && (f.length() <= 0)) {
				throw new Exception("要解压的文件不存在!");
			}
			zipFile = new ZipFile(f);
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
					fos = new FileOutputStream(strtemp);
					bos = new BufferedOutputStream(fos);
					int len;
					byte[] buff = new byte[BUFFEREDSIZE];
					while ((len = bis.read(buff)) != -1) {
						bos.write(buff, 0, len);
					}
					bos.close();
					fos.close();
				}
			}
			zipFile.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (isDelete) {
			new File(zipFilePath).delete();
		}
	}

	/**
	 * 保存文件到本地
	 * 
	 * @param inputStream
	 * @param fileName
	 */
	public static void saveFile(InputStream inputStream, String fileName) {
		OutputStream os = null;
		try {
			// 1K的数据缓冲
			byte[] bs = new byte[1024];
			// 读取到的数据长度
			int len;
			// 输出的文件流保存到本地文件

			File tempFile = new File("E:/apache-tomcat-7.0.68/webapps/upload/360");
			if (!tempFile.exists()) {
				tempFile.mkdirs();
			}
			os = new FileOutputStream(tempFile.getPath() + File.separator + fileName);
			// 开始读取
			while ((len = inputStream.read(bs)) != -1) {
				os.write(bs, 0, len);
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 完毕，关闭所有链接
			try {
				os.close();
				inputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
