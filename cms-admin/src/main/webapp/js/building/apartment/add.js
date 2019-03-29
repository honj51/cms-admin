$(document).ready(function() {
	init();

	$("#url").fileinput({
		language: "zh",
		uploadUrl : rootPath + "/building/apartment/upload.shtml",
		uploadExtraData :  {
			"type" : "url",
			id : id
		},
		uploadAsync : true,
		showPreview : true,
		showBrowse : true,
		browseOnZoneClick : true,
		overwriteInitial: true,
		autoReplace : true,
		maxFileCount : 1,
         initialPreviewConfig: [
		    {
		    	showDelete: true,
		    	 url: rootPath + "/building/apartment/deletePhoto.shtml",// 预展示图片的删除调取路径  
		         extra: {"type" : "url","id":id} //调用删除路径所传参数 
		    }
		 ],
         initialPreviewAsData: true
	}).on("filebatchselected", function(event, files) {
        $(this).fileinput("upload");
    }).on("fileuploaded", function(event, data) {
	    if(data.response) {
	    	parent.layer.msg('上传成功！', {icon: 0, time: 1000});
	    }
	});
	
	$("#urlOne").fileinput({
		language: "zh",
		uploadUrl : rootPath + "/building/apartment/uploadUrlOne.shtml",
		uploadExtraData :  {
			"type" : "urlOne",
			id : id
		},
		uploadAsync : true,
		showPreview : true,
		showBrowse : true,
		browseOnZoneClick : true,
		overwriteInitial: true,
		autoReplace : true,
		maxFileCount : 1,
         initialPreviewConfig: [
		    {
		    	showDelete: true,
		    	 url: rootPath + "/building/apartment/deletePhoto.shtml",// 预展示图片的删除调取路径  
		         extra: {"type" : "urlOne","id":id} //调用删除路径所传参数 
		    }
		 ],
         initialPreviewAsData: true
	}).on("filebatchselected", function(event, files) {
        $(this).fileinput("upload");
    }).on("fileuploaded", function(event, data) {
	    if(data.response) {
	    	parent.layer.msg('上传成功！', {icon: 0, time: 1000});
	    }
	});
	
	$("#urlTwo").fileinput({
		language: "zh",
		uploadUrl : rootPath + "/building/apartment/uploadUrlTwo.shtml",
		uploadExtraData :  {
			"type" : "urlTwo",
			id : id
		},
		uploadAsync : true,
		showPreview : true,
		showBrowse : true,
		browseOnZoneClick : true,
		overwriteInitial: true,
		autoReplace : true,
		maxFileCount : 1,
         initialPreviewConfig: [
		    {
		    	showDelete: true,
		    	 url: rootPath + "/building/apartment/deletePhoto.shtml",// 预展示图片的删除调取路径  
		         extra: {"type" : "urlTwo","id":id} //调用删除路径所传参数 
		    }
		 ],
         initialPreviewAsData: true
	}).on("filebatchselected", function(event, files) {
        $(this).fileinput("upload");
    }).on("fileuploaded", function(event, data) {
	    if(data.response) {
	    	parent.layer.msg('上传成功！', {icon: 0, time: 1000});
	    }
	});
	
	$("#urlThree").fileinput({
		language: "zh",
		uploadUrl : rootPath + "/building/apartment/uploadUrlThree.shtml",
		uploadExtraData :  {
			"type" : "urlThree",
			id : id
		},
		uploadAsync : true,
		showPreview : true,
		showBrowse : true,
		browseOnZoneClick : true,
		overwriteInitial: true,
		autoReplace : true,
		maxFileCount : 1,
         initialPreviewConfig: [
		    {
		    	showDelete: true,
		    	 url: rootPath + "/building/apartment/deletePhoto.shtml",// 预展示图片的删除调取路径  
		         extra: {"type" : "urlThree","id":id} //调用删除路径所传参数 
		    }
		 ],
         initialPreviewAsData: true
	}).on("filebatchselected", function(event, files) {
        $(this).fileinput("upload");
    }).on("fileuploaded", function(event, data) {
	    if(data.response) {
	    	parent.layer.msg('上传成功！', {icon: 0, time: 1000});
	    }
	});
	
	$("#zipFile").fileinput({
		language: "zh",
		uploadUrl : rootPath + "/building/apartment/uploadZip.shtml",
		uploadExtraData :  {
			"type" : "zipFile",
			id : id
		},
		uploadAsync : true,
		showPreview : true,
		showBrowse : true,
		browseOnZoneClick : true,
		overwriteInitial: true,
		autoReplace : true,
		maxFileCount : 1,
         initialPreviewConfig: [
		    {
		    	showDelete: true,
		    	 url: rootPath + "/building/apartment/deletePhoto.shtml",// 预展示图片的删除调取路径  
		         extra: {"type" : "zipFile","id":id} //调用删除路径所传参数 
		    }
		 ],
         initialPreviewAsData: true
	}).on("filebatchselected", function(event, files) {
        $(this).fileinput("upload");
    }).on("fileuploaded", function(event, data) {
	    if(data.response) {
	    	parent.layer.msg('上传成功！', {icon: 0, time: 1000});
	    }
	});
	
	$("#save").click(function() {
		if(!isValid()){
			return;
		}
		
		var typeId = $("#type option:selected").val().trim();
		var typeName = $("#type option:selected").text().trim();
		var floor = $("#floor option:selected").val().trim();
		var renovation = $("#renovation option:selected").val().trim();
		var name = $("#name").val().trim();
		var address = $("#address").val().trim();
		var price = $("#price").val().trim();
		var phone = $("#phone").val().trim();
		var openingTime = $("#openingTime").val().trim();
		var handTime = $("#handTime").val().trim();
		
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/building/apartment/add.shtml',
			    data: {
			    	id : id,
			    	typeId : typeId,
			    	typeName : typeName,
			    	floor : floor,
			    	renovation : renovation,
			    	name : name,
			    	address : address,
			    	price : price,
			    	phone : phone,
			    	openingTime : openingTime,
			    	handTime : handTime,
			    },
				dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(data) {
			    	top.ajaxLoadEnd();
			    	if(data == "success"){
			    		parent.layer.msg('保存提交！', {icon : 1, time: 1000});
			    		var index = parent.layer.getFrameIndex(window.name);
			    		parent.layer.close(index);
			    	} else {
			    		parent.layer.msg('保存失败！', {icon : 2, time: 1000});
			    	}
			    	
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
                error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('保存失败！', {icon : 2, time: 1000});
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
			    }
			});
	});
	
});


function isValid(){
	var typeId = $("#type option:selected").val().trim();
	if("" === typeId || typeId==null){
    	parent.layer.msg('请选择类型！', {icon: 0, time: 2000});
    	return false;
	}
	
	var floor = $("#floor option:selected").val().trim();
	if("" === floor || floor==null){
		parent.layer.msg('请选择楼层！', {icon: 0, time: 2000});
		return false;
	}
	
	var renovation = $("#renovation option:selected").val().trim();
	if("" === renovation || renovation==null){
		parent.layer.msg('请选择装修类型！', {icon: 0, time: 2000});
		return false;
	}
	
	var name = $("#name").val().trim();
	if("" == name || name == null){
		parent.layer.msg('请输入名称！', {icon: 0, time: 2000});
		return false;
	}
	
	var address = $("#address").val().trim();
	if("" == address || address == null){
		parent.layer.msg('请输入楼盘位置！', {icon: 0, time: 2000});
		return false;
	}
	
	var price = $("#price").val().trim();
	if("" == price || price == null){
		parent.layer.msg('请输入房价！', {icon: 0, time: 2000});
		return false;
	}
	if(isNaN(price)){
		parent.layer.msg('请输入正确的房价！', {icon: 0, time: 2000});
		return false;
	}
	
	var phone = $("#phone").val().trim();
	if("" == phone || phone == null){
		parent.layer.msg('请输入售楼电话！', {icon: 0, time: 2000});
		return false;
	}
	
	var openingTime = $("#openingTime").val().trim();
	if("" == openingTime || openingTime == null){
		parent.layer.msg('请选择开盘时间！', {icon: 0, time: 2000});
		return false;
	}
	
	var handTime = $("#handTime").val().trim();
	if("" == handTime || handTime == null){
		parent.layer.msg('请选择交房时间！', {icon: 0, time: 2000});
		return false;
	}
	
	return true;
}
 
function init(){
	$(".fixtop").fixtop();
	
	$("#openingTime").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	$("#handTime").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
}