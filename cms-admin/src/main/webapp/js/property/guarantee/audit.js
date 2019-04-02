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
		initialPreview: [
            url,
        ],
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
		initialPreview: [
            urlOne,
        ],
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
		initialPreview: [
            urlTwo,
        ],
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
		initialPreview: [
			urlThree,
        ],
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
		
		var state = $("#type option:selected").val().trim();
		var remarks = $("#remarks").val();
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/property/guarantee/edit.shtml',
			    data: {
			    	id : id,
			    	state : state,
			    	remarks : remarks,
			    },
				dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(data) {
			    	top.ajaxLoadEnd();
			    	if(data == "success"){
			    		parent.layer.msg('处理成功!', {icon : 1, time: 1000});
			    		var index = parent.layer.getFrameIndex(window.name);
			    		parent.layer.close(index);
			    	} else {
			    		parent.layer.msg('处理失败！', {icon : 2, time: 1000});
			    	}
			    	
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
                error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('处理失败！', {icon : 2, time: 1000});
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
			    }
			});
	});
	
});


function isValid(){
	var typeId = $("#type option:selected").val().trim();
	if("" === typeId || typeId==null){
    	parent.layer.msg('请选择审核结果！', {icon: 0, time: 2000});
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