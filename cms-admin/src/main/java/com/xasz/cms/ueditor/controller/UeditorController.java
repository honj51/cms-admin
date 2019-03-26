package com.xasz.cms.ueditor.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.service.IDService;
import com.xasz.cms.util.Common;

@Controller
@Scope("request")
@RequestMapping("/ueditor/")
public class UeditorController extends BaseController {

	@Inject
	private IDService idService;

	@Value("${host.webFileUrl}")
	private String webFileUrl;

	// 文件路径+名称
	private static String filenameTemp;

	@RequestMapping("addUI")
	public String addUI(HttpServletRequest request, Model model) {
		return Common.BACKGROUND_PATH + "/ueditor/add";
	}

	@ResponseBody
	@RequestMapping("add")
	public Map<String, Object> add(HttpServletRequest request) {
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		Map<String, Object> result = new HashMap<String, Object>();

		String webHtml = request.getParameter("html");

		String path = "E:/apache-tomcat-7.0.68/webapps/upload/html/";
		String fileName = idService.getID() + ".html";

		StringBuilder sb = new StringBuilder();
		PrintStream printStream = null;
		try {
			printStream = new PrintStream(new FileOutputStream(path + fileName),true,"utf-8");// 路径默认在项目根目录下
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		sb.append("<html>");
		sb.append("<head>");
		sb.append("<title></title>");
		sb.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />");
		sb.append("</head>");
		sb.append("<body>");
		sb.append(webHtml);
		sb.append("</body>");
		sb.append("</html>");

		printStream.println(sb.toString());

//		createFile(path + fileName, html);

		String url = webFileUrl + fileName;

		result.put("url", url);
		result.put("result", "success");

		return result;
	}

	public static boolean createFile(String fileName, String filecontent) {
		Boolean bool = false;
		filenameTemp = fileName;// 文件路径+名称+文件类型
		File file = new File(filenameTemp);
		try {
			// 如果文件不存在，则创建新的文件
			if (!file.exists()) {
				file.createNewFile();
				bool = true;
				// 创建文件成功后，写入内容到文件里
				writeFileContent(filenameTemp, filecontent);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return bool;
	}

	/**
	 * 向文件中写入内容
	 * 
	 * @param filepath 文件路径与名称
	 * @param newstr   写入的内容
	 * @return
	 * @throws IOException
	 */
	public static boolean writeFileContent(String filepath, String newstr) throws IOException {
		Boolean bool = false;
		String filein = newstr + "\r\n";// 新写入的行，换行
		String temp = "";

		FileInputStream fis = null;
		InputStreamReader isr = null;
		BufferedReader br = null;
		FileOutputStream fos = null;
		PrintWriter pw = null;
		try {
			File file = new File(filepath);// 文件路径(包括文件名称)
			// 将文件读入输入流
			fis = new FileInputStream(file);
			isr = new InputStreamReader(fis, "UTF-8");
			br = new BufferedReader(isr);
			StringBuffer buffer = new StringBuffer();

			// 文件原有内容
			for (int i = 0; (temp = br.readLine()) != null; i++) {
				buffer.append(temp);
				// 行与行之间的分隔符 相当于“\n”
				buffer = buffer.append(System.getProperty("line.separator"));
			}
			buffer.append(filein);

			fos = new FileOutputStream(file);
			pw = new PrintWriter(fos);
			pw.write(buffer.toString().toCharArray());
			pw.flush();
			bool = true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 不要忘记关闭
			if (pw != null) {
				pw.close();
			}
			if (fos != null) {
				fos.close();
			}
			if (br != null) {
				br.close();
			}
			if (isr != null) {
				isr.close();
			}
			if (fis != null) {
				fis.close();
			}
		}
		return bool;
	}

	/**
	 * 删除文件
	 * 
	 * @param fileName 文件名称
	 * @return
	 */
	public static boolean delFile(String fileName) {
		Boolean bool = false;
		filenameTemp = fileName + ".html";
		File file = new File(filenameTemp);
		try {
			if (file.exists()) {
				file.delete();
				bool = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bool;
	}

}
