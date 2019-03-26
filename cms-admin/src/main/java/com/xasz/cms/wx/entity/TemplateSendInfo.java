package com.xasz.cms.wx.entity;

public class TemplateSendInfo {

	private String touser;
	private String template_id;
	private String url;
	private Object data;
	
	public String getTouser() {
		return touser;
	}
	public void setTouser(String touser) {
		this.touser = touser;
	}
	public String getTemplate_id() {
		return template_id;
	}
	public void setTemplate_id(String template_id) {
		this.template_id = template_id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
	
	/*{
        "touser":"OPENID",
        "template_id":"ngqIpbwh8bUfcSsECmogfXcV14J0tQlEpBO27izEYtY",
        "url":"http://weixin.qq.com/download",  
        "miniprogram":{
          "appid":"xiaochengxuappid12345",
          "pagepath":"index?foo=bar"
        },          
        "data":{
                "first": {
                    "value":"恭喜你购买成功！",
                    "color":"#173177"
                },
                "keynote1":{
                    "value":"巧克力",
                    "color":"#173177"
                },
                "keynote2": {
                    "value":"39.8元",
                    "color":"#173177"
                },
                "keynote3": {
                    "value":"2014年9月22日",
                    "color":"#173177"
                },
                "remark":{
                    "value":"欢迎再次购买！",
                    "color":"#173177"
                }
        }
    }*/
}
