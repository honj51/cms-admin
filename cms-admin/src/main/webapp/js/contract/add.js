$(document).ready(function() {
	init();
    $("#shipperCompany").change('click',function(){
    	findShipperCompany();
    })
    
	$("#save").click(function() {
		if(!isValid()){
		 return;
		}
		
		var code = $("#code").val().trim();
		var shipperCompanyId = $("#shipperCompany option:selected").val();
		var shipperCompanyName = $("#shipperCompany option:selected").text().trim();
		var signDate = $("#signDate").val().trim();
		var limitDate = $("#limitDate").val().trim();
		var contactPersonName = $("#contactPersonName").val().trim();
		var contactPersonPhone = $("#contactPersonPhone").val().trim();
		var remarks = $("#remarks").val().trim();
		
		var transportationCompanyId = $("#transportationCompany option:selected").val();
		var transportationCompanyName = $("#transportationCompany option:selected").text().trim();
		
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/contract/addEntity.shtml',
			    data: {
			    	code : code,
			    	shipperCompanyId : shipperCompanyId,
			    	shipperCompanyName : shipperCompanyName,
			    	signDate : signDate,
			    	limitDate : limitDate,
			    	contactPersonName : contactPersonName,
			    	contactPersonPhone : contactPersonPhone,
			    	remarks : remarks,
			    	transportationCompanyId : transportationCompanyId,
			    	transportationCompanyName : transportationCompanyName
			    },
			    dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(data) {
			    	top.ajaxLoadEnd();
			    	if(data == "success"){
			    		parent.layer.msg('新增成功！', {icon : 1, time: 1000});
			    		var index = parent.layer.getFrameIndex(window.name);
						parent.layer.close(index);
			    	}else if(data == "code_duplicate"){
			    		parent.layer.msg('合同编号重复！', {icon : 20, time: 1500});
			    	} else {
			    		parent.layer.msg('新增失败！', {icon : 2, time: 1000});
			    	}
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
                error: function() {
			    	top.ajaxLoadEnd();
			    	parent.layer.msg('新增异常！', {icon : 2, time: 1000});
			    }
			});
	});
	
});

function findShipperCompany(){
	
	$("#contactPersonPhone").val('');
	$("#contactPersonName").val('');
	
	$("#transportationCompany").select2({
		language: "zh-CN"
	});
	
	var id = $("#shipperCompany option:selected").val();
	if(id == ''){
		return;
	}
	top.ajaxLoading();
	$.ajax({
		type : "post",
		url : rootPath + '/shipperCompany/findById.shtml',
		data : {			
			id : id
		},
		dataType:"json",
		beforeSend : function() {
		},
		success : function(data) {
			top.ajaxLoadEnd();
			
			var contactPersonPhone = data.contact_person_phone;
			var contactPersonName = data.contact_person_name;
			var carrierId = data.carrier_id;
			if(typeof(contactPersonPhone) == 'undefined'){
				contactPersonPhone = '';
			}
			if(typeof(contactPersonName) == 'undefined'){
				contactPersonName = '';
			}
			
			$("#contactPersonPhone").val(contactPersonPhone);
			$("#contactPersonName").val(contactPersonName);

			if(typeof(carrierId) == 'undefined'){
				carrierId = '';
			}
			$('#transportationCompany').select2().val(carrierId).trigger("change");
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function() {
		}
	});
}

function isValid(){
	
	var code = $("#code").val().trim();
	if("" == code){
		parent.layer.msg('请输入合同编号！', {icon: 0, time: 2000});
		return false;
	}
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(code)){
		parent.layer.msg('合同编号不可以包含汉字！', {icon: 0, time: 2000});
		return false;
	}
	
	var shipperCompanyId = $("#shipperCompany option:selected").val();
	if("" == shipperCompanyId){
		parent.layer.msg('请选择货主公司！', {icon: 0, time: 2000});
		return false;
	}
	
	var transportationCompanyId = $("#transportationCompany option:selected").val();
	if("" == transportationCompanyId){
		parent.layer.msg('请选择承运公司！', {icon: 0, time: 2000});
		return false;
	}
	
	var signDate = $("#signDate").val().trim();
	if(signDate == ""){
		parent.layer.msg('请选择签订日期！', {icon: 0, time: 2000});
		return false;
	}
	
	var limitDate = $("#limitDate").val().trim();
	if(limitDate == ""){
		parent.layer.msg('请选择到期日期！', {icon: 0, time: 2000});
		return false;
	}
	
	if(new Date(limitDate).getTime() < new Date(signDate).getTime()){
		parent.layer.msg('到期日期要大于签订日期！', {icon: 0, time: 2000});
		return false;
	}
	
	var contactPersonName = $("#contactPersonName").val().trim();
	if("" == contactPersonName){
		parent.layer.msg('请输入联系人！', {icon: 0, time: 2000});
		return false;
	}
	
	var contactPersonPhone = $("#contactPersonPhone").val().trim();
	if("" == contactPersonPhone){
		parent.layer.msg('请输入联系电话！', {icon: 0, time: 2000});
		return false;
	}
	
	return true;
}

function init(){
	$(".fixtop").fixtop();

	$('#signDate').datetimepicker({
		format:"YYYY-MM-DD",
	});
	$('#limitDate').datetimepicker({
		format:"YYYY-MM-DD",
	});
	$(".js-example-basic-single").select2({
		language: "zh-CN"
	});
}

