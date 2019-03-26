package com.xasz.cms.controller.system;

import java.util.Iterator;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.entity.LogFormMap;
import com.xasz.cms.mapper.LogMapper;
import com.xasz.cms.plugin.PageView;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.FormMap;

/**
 * 
 * @version 3.0v
 */
@Controller
@Scope("request")
@RequestMapping("/log/")
public class LogController extends BaseController {
	@Inject
	private LogMapper logMapper;

	@RequestMapping("list")
	public String listUI(Model model) throws Exception {
		return Common.BACKGROUND_PATH + "/system/log/list";
	}

	@ResponseBody
	@RequestMapping("findByPage")
	public PageView findByPage(String rows, String page, HttpServletRequest request) throws Exception {
		String queryParam = request.getParameter("queryParam");
		LogFormMap logFormMap = new LogFormMap();
		logFormMap.put("accountName", queryParam);
		logFormMap.put("module", queryParam);
		logFormMap.put("queryParam", queryParam);

		logFormMap = toFormMap(logFormMap, page, rows);
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		if (StringUtils.isNotBlank(sidx) && StringUtils.isNotBlank(sord)) {
			logFormMap.put("orderPart", sidx + " " + sord);
		}
		pageView.setRows(logMapper.findLogPage(logFormMap));
		return pageView;
	}

	private FormMap removeEmptyForMap(FormMap map) {
		Iterator it = map.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();
			Object key = entry.getKey();
			Object value = entry.getValue();
			if (StringUtils.isBlank(value + "")) {
				map.remove(key);
			}
		}

		return map;
	}
}