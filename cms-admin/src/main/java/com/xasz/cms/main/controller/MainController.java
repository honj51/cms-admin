package com.xasz.cms.main.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xasz.cms.controller.index.BaseController;
import com.xasz.cms.util.Common;
import com.xasz.cms.util.DateTimeUtil;

import net.coobird.thumbnailator.geometry.Coordinate;

@Controller
@Scope("request")
@RequestMapping("/main/")
public class MainController extends BaseController {

	@Value("${platform.nickname}")
	private String nickname;

	@Value("${dashboard.welcome}")
	private String welcome;

	@Value("${dashboard.provision}")
	private String provision;

	@Value("${dashboard.phone}")
	private String phone;

	@RequestMapping("list")
	public String listUI(HttpServletRequest request, Model model) {
		String firstDay = DateTimeUtil.getFirstDayOfMonth();
		model.addAttribute("firstDay", firstDay);

		String lastDay = DateTimeUtil.getLastDayOfMonth();
		model.addAttribute("lastDay", lastDay);
		return Common.BACKGROUND_PATH + "/main/list";
	}

	@ResponseBody
	@RequestMapping("findGoodsQuantityForEcharts")
	public Coordinate findGoodsQuantityForEcharts(HttpServletRequest request, Model model) {
		return null;
		/*
		 * 
		 * String type = request.getParameter("type");
		 * 
		 * List<String> xAxis = new ArrayList<String>(); List<Long> yAxis = new
		 * ArrayList<Long>();
		 * 
		 * if (String.valueOf(EchartsType.day.getCode()).equals(type)) { // 日统计 int
		 * dayNum = Constants.STATS_DAY_NUM; for (int i = 0; i < dayNum; i++) { int
		 * dayNo = i - dayNum + 1; String day = DateTimeUtil.getIntervalDate(dayNo);
		 * xAxis.add(day); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getIntervalDate(-dayNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询货源数量 GoodsFormMap goodsFormMap = new
		 * GoodsFormMap(); goodsFormMap.put("startDate", startDate);
		 * goodsFormMap.put("endDate", endDate); List<GoodsFormMap> statsInfos =
		 * goodsService.findStatsByDay(goodsFormMap);
		 * 
		 * for (GoodsFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_date").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * day = xAxis.get(i); if (day.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.month.getCode()).equals(type)) { //
		 * 月统计 int monthNum = Constants.STATS_MONTH_NUM; for (int i = 0; i < monthNum;
		 * i++) { int monthNo = i - monthNum + 1; String month =
		 * DateTimeUtil.getMonth(monthNo); xAxis.add(month); yAxis.add(0l); } String
		 * startDate = DateTimeUtil.getMonth(-monthNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询货源数量 GoodsFormMap goodsFormMap = new
		 * GoodsFormMap();
		 * 
		 * goodsFormMap.put("startDate", startDate); goodsFormMap.put("endDate",
		 * endDate); List<GoodsFormMap> statsInfos =
		 * goodsService.findStatsByMonth(goodsFormMap);
		 * 
		 * for (GoodsFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_month").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * month = xAxis.get(i); if (month.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.year.getCode()).equals(type)) { //
		 * 年统计 int yearNum = Constants.STATS_YEAR_NUM; for (int i = 0; i < yearNum; i++)
		 * { int yearNo = i - yearNum + 1; String year = DateTimeUtil.getYear(yearNo);
		 * xAxis.add(year); yAxis.add(0l); } String startDate =
		 * DateTimeUtil.getYear(-yearNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询货源数量 GoodsFormMap goodsFormMap = new
		 * GoodsFormMap();
		 * 
		 * goodsFormMap.put("startDate", startDate); goodsFormMap.put("endDate",
		 * endDate); List<GoodsFormMap> statsInfos =
		 * goodsService.findStatsByYear(goodsFormMap);
		 * 
		 * for (GoodsFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_year").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * year = xAxis.get(i); if (year.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } }
		 * 
		 * Coordinate result = new Coordinate(); result.setxAxis(xAxis); // 货源数量
		 * result.setyAxis(yAxis); return result;
		 */}

	@ResponseBody
	@RequestMapping("findDispatchingDocQuantityForEcharts")
	public Coordinate findDispatchingDocQuantityForEcharts(HttpServletRequest request, Model model) {
		return null;
		/*
		 * 
		 * String type = request.getParameter("type");
		 * 
		 * List<String> xAxis = new ArrayList<String>(); List<Long> yAxis = new
		 * ArrayList<Long>();
		 * 
		 * if (String.valueOf(EchartsType.day.getCode()).equals(type)) { // 日统计 int
		 * dayNum = Constants.STATS_DAY_NUM; for (int i = 0; i < dayNum; i++) { int
		 * dayNo = i - dayNum + 1; String day = DateTimeUtil.getIntervalDate(dayNo);
		 * xAxis.add(day); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getIntervalDate(-dayNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询派车单数量 DispachingDocFormMap
		 * dispachingDocFormMap = new DispachingDocFormMap();
		 * 
		 * dispachingDocFormMap.put("startDate", startDate);
		 * dispachingDocFormMap.put("endDate", endDate); List<DispachingDocFormMap>
		 * statsInfos = dispachingDocService.findStatsByDay(dispachingDocFormMap);
		 * 
		 * for (DispachingDocFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_date").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * day = xAxis.get(i); if (day.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.month.getCode()).equals(type)) { //
		 * 月统计 int monthNum = Constants.STATS_MONTH_NUM; for (int i = 0; i < monthNum;
		 * i++) { int monthNo = i - monthNum + 1; String month =
		 * DateTimeUtil.getMonth(monthNo); xAxis.add(month); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getMonth(-monthNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询派车单数量 DispachingDocFormMap
		 * dispatchingDocFormMap = new DispachingDocFormMap();
		 * 
		 * dispatchingDocFormMap.put("startDate", startDate);
		 * dispatchingDocFormMap.put("endDate", endDate); List<DispachingDocFormMap>
		 * statsInfos = dispachingDocService.findStatsByMonth(dispatchingDocFormMap);
		 * 
		 * for (DispachingDocFormMap statsInfo : statsInfos) { String statsMonth =
		 * statsInfo.get("stats_month").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * month = xAxis.get(i); if (month.equals(statsMonth)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.year.getCode()).equals(type)) { //
		 * 年统计 int yearNum = Constants.STATS_YEAR_NUM; for (int i = 0; i < yearNum; i++)
		 * { int yearNo = i - yearNum + 1; String year = DateTimeUtil.getYear(yearNo);
		 * xAxis.add(year); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getYear(-yearNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询派车单数量 DispachingDocFormMap
		 * dispatchingDocFormMap = new DispachingDocFormMap();
		 * 
		 * dispatchingDocFormMap.put("startDate", startDate);
		 * dispatchingDocFormMap.put("endDate", endDate); List<DispachingDocFormMap>
		 * statsInfos = dispachingDocService.findStatsByYear(dispatchingDocFormMap);
		 * 
		 * for (DispachingDocFormMap statsInfo : statsInfos) { String statsYear =
		 * statsInfo.get("stats_year").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * year = xAxis.get(i); if (year.equals(statsYear)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } }
		 * 
		 * Coordinate result = new Coordinate(); result.setxAxis(xAxis); // 派车单数量
		 * result.setyAxis(yAxis); return result;
		 */}

	@ResponseBody
	@RequestMapping("findDeliveryQuantityForEcharts")
	public Coordinate findDeliveryQuantityForEcharts(HttpServletRequest request, Model model) {
		return null;
		/*
		 * 
		 * String type = request.getParameter("type");
		 * 
		 * List<String> xAxis = new ArrayList<String>(); List<Long> yAxis = new
		 * ArrayList<Long>(); if
		 * (String.valueOf(EchartsType.day.getCode()).equals(type)) { // 日统计 int dayNum
		 * = Constants.STATS_DAY_NUM; for (int i = 0; i < dayNum; i++) { int dayNo = i -
		 * dayNum + 1; String day = DateTimeUtil.getIntervalDate(dayNo); xAxis.add(day);
		 * yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getIntervalDate(-dayNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询运单数量 DeliveryFormMap deliveryFormMap =
		 * new DeliveryFormMap();
		 * 
		 * deliveryFormMap.put("startDate", startDate); deliveryFormMap.put("endDate",
		 * endDate); List<DeliveryFormMap> statsInfos =
		 * deliveryService.findStatsByDay(deliveryFormMap);
		 * 
		 * for (DeliveryFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_date").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * day = xAxis.get(i); if (day.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.month.getCode()).equals(type)) { //
		 * 月统计 int monthNum = Constants.STATS_MONTH_NUM; for (int i = 0; i < monthNum;
		 * i++) { int monthNo = i - monthNum + 1; String month =
		 * DateTimeUtil.getMonth(monthNo); xAxis.add(month); yAxis.add(0l); } String
		 * startDate = DateTimeUtil.getMonth(-monthNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询运单数量 DeliveryFormMap deliveryFormMap =
		 * new DeliveryFormMap();
		 * 
		 * deliveryFormMap.put("startDate", startDate); deliveryFormMap.put("endDate",
		 * endDate); List<DeliveryFormMap> statsInfos =
		 * deliveryService.findStatsByMonth(deliveryFormMap);
		 * 
		 * for (DeliveryFormMap statsInfo : statsInfos) { String statsMonth =
		 * statsInfo.get("stats_month").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * month = xAxis.get(i); if (month.equals(statsMonth)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.year.getCode()).equals(type)) { //
		 * 年统计 int yearNum = Constants.STATS_YEAR_NUM; for (int i = 0; i < yearNum; i++)
		 * { int yearNo = i - yearNum + 1; String year = DateTimeUtil.getYear(yearNo);
		 * xAxis.add(year); yAxis.add(0l); } String startDate =
		 * DateTimeUtil.getYear(-yearNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询运单数量 DeliveryFormMap deliveryFormMap =
		 * new DeliveryFormMap();
		 * 
		 * deliveryFormMap.put("startDate", startDate); deliveryFormMap.put("endDate",
		 * endDate); List<DeliveryFormMap> statsInfos =
		 * deliveryService.findStatsByYear(deliveryFormMap);
		 * 
		 * for (DeliveryFormMap statsInfo : statsInfos) { String statsYear =
		 * statsInfo.get("stats_year").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * year = xAxis.get(i); if (year.equals(statsYear)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } }
		 * 
		 * Coordinate result = new Coordinate(); result.setxAxis(xAxis); // 运单数量
		 * result.setyAxis(yAxis); return result;
		 */}

	@ResponseBody
	@RequestMapping("findSettlementQuantityForEcharts")
	public Coordinate findSettlementQuantityForEcharts(HttpServletRequest request, Model model) {
		return null;
		/*
		 * 
		 * String type = request.getParameter("type");
		 * 
		 * List<String> xAxis = new ArrayList<String>(); List<Long> yAxis = new
		 * ArrayList<Long>();
		 * 
		 * if (String.valueOf(EchartsType.day.getCode()).equals(type)) { // 日统计 int
		 * dayNum = Constants.STATS_DAY_NUM; for (int i = 0; i < dayNum; i++) { int
		 * dayNo = i - dayNum + 1; String day = DateTimeUtil.getIntervalDate(dayNo);
		 * xAxis.add(day); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getIntervalDate(-dayNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询结算单数量 SettlementFormMap settlementFormMap
		 * = new SettlementFormMap();
		 * 
		 * settlementFormMap.put("startDate", startDate);
		 * settlementFormMap.put("endDate", endDate); List<SettlementFormMap> statsInfos
		 * = settlementService.findStatsByDay(settlementFormMap);
		 * 
		 * for (SettlementFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_date").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * day = xAxis.get(i); if (day.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.month.getCode()).equals(type)) { //
		 * 月统计 int monthNum = Constants.STATS_MONTH_NUM; for (int i = 0; i < monthNum;
		 * i++) { int monthNo = i - monthNum + 1; String month =
		 * DateTimeUtil.getMonth(monthNo); xAxis.add(month); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getMonth(-monthNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询结算单数量 SettlementFormMap settlementFormMap
		 * = new SettlementFormMap();
		 * 
		 * settlementFormMap.put("startDate", startDate);
		 * settlementFormMap.put("endDate", endDate); List<SettlementFormMap> statsInfos
		 * = settlementService.findStatsByMonth(settlementFormMap);
		 * 
		 * for (SettlementFormMap statsInfo : statsInfos) { String statsMonth =
		 * statsInfo.get("stats_month").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * month = xAxis.get(i); if (month.equals(statsMonth)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.year.getCode()).equals(type)) { //
		 * 年统计 int yearNum = Constants.STATS_YEAR_NUM; for (int i = 0; i < yearNum; i++)
		 * { int yearNo = i - yearNum + 1; String year = DateTimeUtil.getYear(yearNo);
		 * xAxis.add(year); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getYear(-yearNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询结算单数量 SettlementFormMap settlementFormMap
		 * = new SettlementFormMap();
		 * 
		 * settlementFormMap.put("startDate", startDate);
		 * settlementFormMap.put("endDate", endDate); List<SettlementFormMap> statsInfos
		 * = settlementService.findStatsByYear(settlementFormMap);
		 * 
		 * for (SettlementFormMap statsInfo : statsInfos) { String statsYear =
		 * statsInfo.get("stats_year").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * year = xAxis.get(i); if (year.equals(statsYear)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } }
		 * 
		 * Coordinate result = new Coordinate(); result.setxAxis(xAxis); // 结算单数量
		 * result.setyAxis(yAxis); return result;
		 */}

	@ResponseBody
	@RequestMapping("findPaymentQuantityForEcharts")
	public Coordinate findPaymentQuantityForEcharts(HttpServletRequest request, Model model) {
		return null;
		/*
		 * return null;
		 * 
		 * 
		 * String type = request.getParameter("type");
		 * 
		 * List<String> xAxis = new ArrayList<String>(); List<Long> yAxis = new
		 * ArrayList<Long>();
		 * 
		 * if (String.valueOf(EchartsType.day.getCode()).equals(type)) { // 日统计 int
		 * dayNum = Constants.STATS_DAY_NUM; for (int i = 0; i < dayNum; i++) { int
		 * dayNo = i - dayNum + 1; String day = DateTimeUtil.getIntervalDate(dayNo);
		 * xAxis.add(day); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getIntervalDate(-dayNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询支付单数量 PaymentFormMap paymentFormMap = new
		 * PaymentFormMap(); paymentFormMap.put("startDate", startDate);
		 * paymentFormMap.put("endDate", endDate); List<PaymentFormMap> statsInfos =
		 * paymentService.findStatsByDay(paymentFormMap);
		 * 
		 * for (PaymentFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_date").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * day = xAxis.get(i); if (day.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.month.getCode()).equals(type)) { //
		 * 月统计 int monthNum = Constants.STATS_MONTH_NUM; for (int i = 0; i < monthNum;
		 * i++) { int monthNo = i - monthNum + 1; String month =
		 * DateTimeUtil.getMonth(monthNo); xAxis.add(month); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getMonth(-monthNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询支付单数量 PaymentFormMap paymentFormMap = new
		 * PaymentFormMap(); paymentFormMap.put("startDate", startDate);
		 * paymentFormMap.put("endDate", endDate); List<PaymentFormMap> statsInfos =
		 * paymentService.findStatsByMonth(paymentFormMap);
		 * 
		 * for (PaymentFormMap statsInfo : statsInfos) { String statsMonth =
		 * statsInfo.get("stats_month").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * month = xAxis.get(i); if (month.equals(statsMonth)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.year.getCode()).equals(type)) { //
		 * 年统计 int yearNum = Constants.STATS_YEAR_NUM; for (int i = 0; i < yearNum; i++)
		 * { int yearNo = i - yearNum + 1; String year = DateTimeUtil.getYear(yearNo);
		 * xAxis.add(year); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getYear(-yearNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询支付单数量 PaymentFormMap paymentFormMap = new
		 * PaymentFormMap(); paymentFormMap.put("startDate", startDate);
		 * paymentFormMap.put("endDate", endDate); List<PaymentFormMap> statsInfos =
		 * paymentService.findStatsByYear(paymentFormMap);
		 * 
		 * for (PaymentFormMap statsInfo : statsInfos) { String statsYear =
		 * statsInfo.get("stats_year").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * year = xAxis.get(i); if (year.equals(statsYear)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } }
		 * 
		 * Coordinate result = new Coordinate(); result.setxAxis(xAxis); // 支付单数量
		 * result.setyAxis(yAxis); return result;
		 */}

	@ResponseBody
	@RequestMapping("findInvoiceQuantityForEcharts")
	public Coordinate findInvoiceQuantityForEcharts(HttpServletRequest request, Model model) {
		return null;
		/*
		 * 
		 * String type = request.getParameter("type");
		 * 
		 * List<String> xAxis = new ArrayList<String>(); List<Long> yAxis = new
		 * ArrayList<Long>();
		 * 
		 * if (String.valueOf(EchartsType.day.getCode()).equals(type)) { // 日统计 int
		 * dayNum = Constants.STATS_DAY_NUM; for (int i = 0; i < dayNum; i++) { int
		 * dayNo = i - dayNum + 1; String day = DateTimeUtil.getIntervalDate(dayNo);
		 * xAxis.add(day); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getIntervalDate(-dayNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询发票单数量 FreightInvoiceFormMap
		 * invoiceApplyFormMap = new FreightInvoiceFormMap();
		 * invoiceApplyFormMap.put("startDate", startDate);
		 * invoiceApplyFormMap.put("endDate", endDate);
		 * invoiceApplyFormMap.put("status", FreightInvoiceStatus.finished.getCode());
		 * List<FreightInvoiceFormMap> statsInfos =
		 * invoiceApplyService.findStatsByDay(invoiceApplyFormMap);
		 * 
		 * for (FreightInvoiceFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_date").toString(); long quantity = (long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * day = xAxis.get(i); if (day.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.month.getCode()).equals(type)) { //
		 * 月统计 int monthNum = Constants.STATS_MONTH_NUM; for (int i = 0; i < monthNum;
		 * i++) { int monthNo = i - monthNum + 1; String month =
		 * DateTimeUtil.getMonth(monthNo); xAxis.add(month); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getMonth(-monthNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询发票数量 FreightInvoiceFormMap
		 * invoiceApplyFormMap = new FreightInvoiceFormMap();
		 * invoiceApplyFormMap.put("startDate", startDate);
		 * invoiceApplyFormMap.put("endDate", endDate);
		 * invoiceApplyFormMap.put("status", FreightInvoiceStatus.finished.getCode());
		 * List<FreightInvoiceFormMap> statsInfos =
		 * invoiceApplyService.findStatsByMonth(invoiceApplyFormMap);
		 * 
		 * for (FreightInvoiceFormMap statsInfo : statsInfos) { String statsMonth =
		 * statsInfo.get("stats_month").toString(); long quantity = (long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * month = xAxis.get(i); if (month.equals(statsMonth)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.year.getCode()).equals(type)) { //
		 * 年统计 int yearNum = Constants.STATS_YEAR_NUM; for (int i = 0; i < yearNum; i++)
		 * { int yearNo = i - yearNum + 1; String year = DateTimeUtil.getYear(yearNo);
		 * xAxis.add(year); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getYear(-yearNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询发票数量 FreightInvoiceFormMap
		 * invoiceApplyFormMap = new FreightInvoiceFormMap();
		 * invoiceApplyFormMap.put("startDate", startDate);
		 * invoiceApplyFormMap.put("endDate", endDate);
		 * invoiceApplyFormMap.put("status", FreightInvoiceStatus.finished.getCode());
		 * List<FreightInvoiceFormMap> statsInfos =
		 * invoiceApplyService.findStatsByYear(invoiceApplyFormMap);
		 * 
		 * for (FreightInvoiceFormMap statsInfo : statsInfos) { String statsYear =
		 * statsInfo.get("stats_year").toString(); long quantity = (long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * year = xAxis.get(i); if (year.equals(statsYear)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } }
		 * 
		 * Coordinate result = new Coordinate(); result.setxAxis(xAxis); // 发票数量
		 * result.setyAxis(yAxis); return result;
		 */}

	/**
	 * 方法描述: 统计合同数量 修改时间: Mar 16, 2018 3:24:53 PM 修改备注:
	 * 
	 * @param contractFormMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping("countContract")
	public long countContract(HttpServletRequest request) {
		return 0;
		/*
		 * ContractFormMap contractFormMap = new ContractFormMap(); return
		 * contractService.countContract(contractFormMap);
		 */}

	/**
	 * 方法描述: 合同统计 修改时间: Mar 16, 2018 5:56:06 PM 修改备注:
	 * 
	 * @param request
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping("findContractQuantityForEcharts")
	public Coordinate findContractQuantityForEcharts(HttpServletRequest request, Model model) {
		return null;
		/*
		 * 
		 * String type = request.getParameter("type");
		 * 
		 * List<String> xAxis = new ArrayList<String>(); List<Long> yAxis = new
		 * ArrayList<Long>();
		 * 
		 * if (String.valueOf(EchartsType.day.getCode()).equals(type)) { // 日统计 int
		 * dayNum = Constants.STATS_DAY_NUM; for (int i = 0; i < dayNum; i++) { int
		 * dayNo = i - dayNum + 1; String day = DateTimeUtil.getIntervalDate(dayNo);
		 * xAxis.add(day); yAxis.add(0l); }
		 * 
		 * String startDate = DateTimeUtil.getIntervalDate(-dayNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询货源数量 ContractFormMap contractFormMap =
		 * new ContractFormMap(); contractFormMap.put("startDate", startDate);
		 * contractFormMap.put("endDate", endDate); List<ContractFormMap> statsInfos =
		 * contractService.findStatsByDay(contractFormMap);
		 * 
		 * for (ContractFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_date").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * day = xAxis.get(i); if (day.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.month.getCode()).equals(type)) { //
		 * 月统计 int monthNum = Constants.STATS_MONTH_NUM; for (int i = 0; i < monthNum;
		 * i++) { int monthNo = i - monthNum + 1; String month =
		 * DateTimeUtil.getMonth(monthNo); xAxis.add(month); yAxis.add(0l); } String
		 * startDate = DateTimeUtil.getMonth(-monthNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询货源数量 ContractFormMap contractFormMap =
		 * new ContractFormMap();
		 * 
		 * contractFormMap.put("startDate", startDate); contractFormMap.put("endDate",
		 * endDate); List<ContractFormMap> statsInfos =
		 * contractService.findStatsByMonth(contractFormMap);
		 * 
		 * for (ContractFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_month").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * month = xAxis.get(i); if (month.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } else if (String.valueOf(EchartsType.year.getCode()).equals(type)) { //
		 * 年统计 int yearNum = Constants.STATS_YEAR_NUM; for (int i = 0; i < yearNum; i++)
		 * { int yearNo = i - yearNum + 1; String year = DateTimeUtil.getYear(yearNo);
		 * xAxis.add(year); yAxis.add(0l); } String startDate =
		 * DateTimeUtil.getYear(-yearNum); String endDate =
		 * DateTimeUtil.getCurrentData(); // 查询合同数量 ContractFormMap contractFormMap =
		 * new ContractFormMap();
		 * 
		 * contractFormMap.put("startDate", startDate); contractFormMap.put("endDate",
		 * endDate); List<ContractFormMap> statsInfos =
		 * contractService.findStatsByYear(contractFormMap);
		 * 
		 * for (ContractFormMap statsInfo : statsInfos) { String statsDate =
		 * statsInfo.get("stats_year").toString(); Long quantity = (Long)
		 * statsInfo.get("quantity"); for (int i = 0; i < xAxis.size(); i++) { String
		 * year = xAxis.get(i); if (year.equals(statsDate)) { yAxis.set(i, quantity);
		 * break; } }
		 * 
		 * } } Coordinate result = new Coordinate(); result.setxAxis(xAxis); // 货源数量
		 * result.setyAxis(yAxis); return result;
		 */}
}
