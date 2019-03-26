$(document).ready(function() {
	init();

	$("#url").fileinput({
		language: "zh",
		uploadUrl : rootPath + "/website/group/upload.shtml",
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
		    	 url: rootPath + "/website/group/deletePhoto.shtml",// 预展示图片的删除调取路径  
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
	
	$("#save").click(function() {
		if(!isValid()){
			return;
		}
		
		var name = $("#name").val().trim();
		var content = $("#content").val().trim();
		
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/website/group/add.shtml',
			    data: {
			    	id : id,
			    	name : name,
			    	content : content
			    },
				dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(data) {
			    	top.ajaxLoadEnd();
			    	if(data == "success"){
			    		parent.layer.msg('保存成功！', {icon : 1, time: 1000});
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
	var name = $("#name").val().trim();
	if("" === name || name==null){
    	parent.layer.msg('请输入介绍名称！', {icon: 0, time: 2000});
    	return false;
	}
	
	var content = $("#content").val().trim();
	if("" === content || content==null){
		parent.layer.msg('请输入介绍内容！', {icon: 0, time: 2000});
		return false;
	}
	return true;
}
 
function init(){
	$(".fixtop").fixtop();
}

function keynam(event,th){
	var keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
	if(keyCode==13){
		$(th).val($(th).val().replace(/\n/g,"<br/>"));
	}
}