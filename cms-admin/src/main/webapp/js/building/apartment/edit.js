$(document).ready(function() {
	init();

	$("#url").fileinput({
		language: "zh",
		uploadUrl : rootPath + "/website/advertisement/upload.shtml",
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
		    	 url: rootPath + "/website/advertisement/deletePhoto.shtml",// 预展示图片的删除调取路径  
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
		
		var position = $("#position option:selected").val().trim();
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/website/advertisement/edit.shtml',
			    data: {
			    	position : position,
			    	id : id
			    },
				dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(data) {
			    	top.ajaxLoadEnd();
			    	if(data == "success"){
			    		parent.layer.msg('成功提交！', {icon : 1, time: 1000});
			    		var index = parent.layer.getFrameIndex(window.name);
			    		parent.layer.close(index);
			    	}else if(data == "less_than_load_time"){
			    		parent.layer.msg('卸货时间不能小于装货时间！', {icon : 0, time: 1000});
			    	} else {
			    		parent.layer.msg('提交失败！', {icon : 2, time: 1000});
			    	}
			    	
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
                error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('提交失败！', {icon : 2, time: 1000});
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
			    }
			});
	});
	
});


function isValid(){
	var position = $("#position option:selected").val();
	if("" === position || position==null){
    	parent.layer.msg('请选择广告位置！', {icon: 0, time: 2000});
    	return false;
	}
	return true;
}
 
function init(){
	$(".fixtop").fixtop();
}