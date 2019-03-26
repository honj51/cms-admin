$(document).ready(function() {
	$(".fixtop").fixtop();

	$("#contract").fileinput({
    	language: "zh",
    	uploadUrl : rootPath + "/contract/upload.shtml",
    	uploadExtraData : {
			"contractId" : contractId
		},
		allowedFileExtensions: ['pdf'],
		allowedFileTypes: ['pdf'],
		uploadAsync : true,
		showPreview : false,
		showUpload : false,
		showBrowse : true,
		showRemove :false, 
		browseOnZoneClick : false,
		overwriteInitial: false,
		dropZoneEnabled: false,
		autoReplace : true,
		maxFileCount : 1
	}).on("filebatchselected", function(event, files) {
		 $(this).fileinput("upload");
    }).on("fileuploaded", function(event, data) {
    	 if(data.response.result == "success") {
 	    	parent.layer.msg('上传成功！', {icon: 1, time: 1000});
 	    	var index = parent.layer.getFrameIndex(window.name);
 			parent.layer.close(index);
 			$("#jqGrid").trigger("reloadGrid");
 	    }else{
 	    	parent.layer.msg('上传失败！', {icon: 20, time: 1000});
 	    }
 	}); 
});
