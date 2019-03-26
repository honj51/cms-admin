package com.xasz.cms.wx.service;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xasz.cms.http.service.HttpService;
import com.xasz.cms.util.JsonUtil;
import com.xasz.cms.wx.entity.TemplateSendInfo;

@Service
public class WxService {

	@Inject
	private HttpService httpService;

	@Value("${wxAppId}")
	private String wxAppId;

	@Value("${fleetWxAppId}")
	private String fleetWxAppId;

	@Value("${fleetWxAppSecret}")
	private String fleetWxAppSecret;

	private String getWxUrl(String url) {
		String encodeUrl = URLEncoder.encode(url);
		String wxUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxAppId + "&redirect_uri="
				+ encodeUrl + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
		return wxUrl;
	}

	public String getWxOilStationUrl(String oilStationId) {
		return getWxUrl("http://wx.xasz.com/driver/oil/refuel.shtml?stationId=" + oilStationId);
	}

	public String getWxCouponUrl(String couponId) {
		return getWxUrl("http://wx.xasz.com/driver/coupon/receive.shtml?couponId=" + couponId);
	}

	public String getFleetAccessToken() {
		String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + fleetWxAppId
				+ "&secret=" + fleetWxAppSecret;
		if (httpService == null) {
			httpService = new HttpService();
		}
		String result = httpService.executGet(url);
		Map<String, Object> map = JsonUtil.JSON2Map(result);
		return (String) map.get("access_token");
	}

	public String templateSendDeliveryAudit() {
		return fleetWxAppId;
		/*
		 * String openId = (String) deliveryFormMap.get("driverOpenId"); String
		 * deliveryCode = (String) deliveryFormMap.get("code"); String actualAmount =
		 * (String) deliveryFormMap.get("actualAmount"); String vehicleNo = (String)
		 * deliveryFormMap.get("vehicleNo"); String driverName = (String)
		 * deliveryFormMap.get("driverName"); if(StringUtils.isBlank(driverName)){
		 * driverName = ""; } String loadTime = (String)
		 * deliveryFormMap.get("loadTime"); if(StringUtils.isBlank(loadTime)){ loadTime
		 * = ""; } String startStationName = (String)
		 * deliveryFormMap.get("startStationName"); String endStationName = (String)
		 * deliveryFormMap.get("endStationName");
		 * 
		 * String accessToken = getFleetAccessToken();
		 * 
		 * String url =
		 * "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" +
		 * accessToken; TemplateSendInfo templateSendInfo = new TemplateSendInfo();
		 * templateSendInfo.setTouser(openId);
		 * //templateSendInfo.setTouser("o90Y0w1W7xsn6BR99iyZVt1SMDj8");
		 * templateSendInfo.setTemplate_id("so3lMI-jTlh480qLLDcYjA3cvikHQhMY8l3splprz5w"
		 * );
		 * 
		 * Map<String, Object> dataMap = new HashMap<String, Object>();
		 * 
		 * Map<String, Object> firstMap = new HashMap<String, Object>();
		 * firstMap.put("value", "您好，您的订单已完成审核。等待支付！"); //firstMap.put("color",
		 * "#173177");
		 * 
		 * Map<String, Object> keyword1Map = new HashMap<String, Object>();
		 * keyword1Map.put("value", deliveryCode);
		 * 
		 * Map<String, Object> keyword2Map = new HashMap<String, Object>();
		 * keyword2Map.put("value", actualAmount + "元");
		 * 
		 * Map<String, Object> keyword3Map = new HashMap<String, Object>();
		 * keyword3Map.put("value", vehicleNo + " " + driverName);
		 * 
		 * Map<String, Object> keyword4Map = new HashMap<String, Object>();
		 * keyword4Map.put("value", loadTime);
		 * 
		 * Map<String, Object> keyword5Map = new HashMap<String, Object>();
		 * keyword5Map.put("value", startStationName + "-" +endStationName);
		 * 
		 * Map<String, Object> remarkMap = new HashMap<String, Object>();
		 * remarkMap.put("value", "客服电话：400-993-7878");
		 * 
		 * dataMap.put("first", firstMap); dataMap.put("keyword1", keyword1Map);
		 * dataMap.put("keyword2", keyword2Map); dataMap.put("keyword3", keyword3Map);
		 * dataMap.put("keyword4", keyword4Map); dataMap.put("keyword5", keyword5Map);
		 * dataMap.put("remark", remarkMap);
		 * 
		 * templateSendInfo.setData(dataMap);
		 * 
		 * String reponse = httpService.executPost(url,
		 * JSON.toJSONString(templateSendInfo)); { "errcode":0, "errmsg":"ok",
		 * "msgid":200228332 } if(StringUtils.isNotBlank(reponse)){ JSONObject
		 * reponseJSON = JSON.parseObject(reponse); }
		 * 
		 * return "success";
		 */}

	public String templateSendDeliveryPayment() {
		return fleetWxAppId;
		/*
		 * String deliveryId = (String) deliveryFormMap.get("deliveryId"); double
		 * actualAmount = (double) deliveryFormMap.get("actualAmount"); BigDecimal
		 * actualAmountBd = new BigDecimal(actualAmount); actualAmountBd =
		 * actualAmountBd.setScale(2, RoundingMode.HALF_UP); String actualAmountStr =
		 * actualAmountBd.toString();
		 * 
		 * DeliveryFormMap resultDeliveryFormMap = deliveryService.findById(deliveryId);
		 * String code = (String) resultDeliveryFormMap.get("code"); String driverId =
		 * (String) resultDeliveryFormMap.get("driver_id");
		 * 
		 * String bankCardNo = (String) resultDeliveryFormMap.get("bank_card_no"); if
		 * (StringUtils.isNotBlank(bankCardNo)) { bankCardNo =
		 * bankCardNo.substring(bankCardNo.length() - 4); } String bankName = (String)
		 * resultDeliveryFormMap.get("bank_name");
		 * 
		 * if (StringUtils.isNotBlank(driverId)) { DriverFormMap driverFormMap =
		 * driverService.findById(driverId); if (driverFormMap != null) { String openId
		 * = (String) driverFormMap.get("openid"); if (StringUtils.isNotBlank(openId)) {
		 * String accessToken = getFleetAccessToken();
		 * 
		 * String url =
		 * "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" +
		 * accessToken; TemplateSendInfo templateSendInfo = new TemplateSendInfo();
		 * templateSendInfo.setTouser(openId); //
		 * templateSendInfo.setTouser("o90Y0w1W7xsn6BR99iyZVt1SMDj8");
		 * templateSendInfo.setTemplate_id("AZbjDRSKZl_luhQPWRFjw_340_5DcXPhqct9MbulOgk"
		 * );
		 * 
		 * Map<String, Object> dataMap = new HashMap<String, Object>();
		 * 
		 * Map<String, Object> firstMap = new HashMap<String, Object>();
		 * firstMap.put("value", "您好，你的订单货款已成功转账！"); // firstMap.put("color",
		 * "#173177");
		 * 
		 * Map<String, Object> keyword1Map = new HashMap<String, Object>();
		 * keyword1Map.put("value", code);
		 * 
		 * Map<String, Object> keyword2Map = new HashMap<String, Object>();
		 * keyword2Map.put("value", actualAmountStr + "元");
		 * 
		 * Map<String, Object> keyword3Map = new HashMap<String, Object>();
		 * keyword3Map.put("value", bankCardNo + " " + bankName);
		 * 
		 * Map<String, Object> remarkMap = new HashMap<String, Object>();
		 * remarkMap.put("value", "请注意查收！");
		 * 
		 * dataMap.put("first", firstMap); dataMap.put("keyword1", keyword1Map);
		 * dataMap.put("keyword2", keyword2Map); dataMap.put("keyword3", keyword3Map);
		 * dataMap.put("remark", remarkMap);
		 * 
		 * templateSendInfo.setData(dataMap);
		 * 
		 * String reponse = httpService.executPost(url,
		 * JSON.toJSONString(templateSendInfo)); } } }
		 * 
		 * return "success";
		 */}

	public static void main(String[] args) {

		String fleetWxAppId = "wx7d0089392a954154";
		String fleetWxAppSecret = "d87bb5df81a7480f52dd8104363066aa";

		String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + fleetWxAppId
				+ "&secret=" + fleetWxAppSecret;

		HttpService hhttpService = new HttpService();
		String result = hhttpService.executGet(url);
		Map<String, Object> map = JsonUtil.JSON2Map(result);

		String accessToken = (String) map.get("access_token");

		String sendurl = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + accessToken;
		TemplateSendInfo templateSendInfo = new TemplateSendInfo();
		// templateSendInfo.setTouser(openId);
		// templateSendInfo.setTouser("o90Y0w1W7xsn6BR99iyZVt1SMDj8");
		templateSendInfo.setTouser("omiHA00HULvfMNL7vvN5CXbTpXck");
		templateSendInfo.setTemplate_id("so3lMI-jTlh480qLLDcYjA3cvikHQhMY8l3splprz5w");
		// templateSendInfo.setUrl("");

		Map<String, Object> dataMap = new HashMap<String, Object>();

		Map<String, Object> firstMap = new HashMap<String, Object>();
		firstMap.put("value", "您好，你的订单已完成审核。等待支付！");
		// firstMap.put("color", "#173177");

		Map<String, Object> keyword1Map = new HashMap<String, Object>();
		keyword1Map.put("value", "0001");

		Map<String, Object> keyword2Map = new HashMap<String, Object>();
		keyword2Map.put("value", "10元");

		Map<String, Object> keyword3Map = new HashMap<String, Object>();
		keyword3Map.put("value", "陕A12345 司机");

		Map<String, Object> keyword4Map = new HashMap<String, Object>();
		keyword4Map.put("value", "2018年02月06日09点");

		Map<String, Object> keyword5Map = new HashMap<String, Object>();
		keyword5Map.put("value", "西安-北京");

		Map<String, Object> remarkMap = new HashMap<String, Object>();
		remarkMap.put("value", "客服电话：400-993-7878");

		dataMap.put("first", firstMap);
		dataMap.put("keyword1", keyword1Map);
		dataMap.put("keyword2", keyword2Map);
		dataMap.put("keyword3", keyword3Map);
		dataMap.put("keyword4", keyword4Map);
		dataMap.put("keyword5", keyword5Map);
		dataMap.put("remark", remarkMap);

		templateSendInfo.setData(dataMap);

		String sendResult = hhttpService.executPost(sendurl, JSON.toJSONString(templateSendInfo));

		JSONObject sendResultJson = JSON.parseObject(sendResult);

		System.out.println(sendResult);
	}

}
