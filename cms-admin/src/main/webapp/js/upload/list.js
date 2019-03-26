$(document).ready(function() {
	
	var batch;
	$('#input-711').on('filepreajax', function(event, previewId, index) {
		batch = {
			"batchNo" : $("#input-711").val(),
			"targetId" : targetId,
			"type" : "photo"
		};
	});

	$("#input-711").fileinput({
		// uploadUrl: "http://localhost/file-upload-single/1", // server upload
		// action
		uploadUrl : rootPath + "/service/oilCard/upload.shtml", // server upload action
		uploadExtraData : function() {
			return batch;
		},
		allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
		uploadAsync : true,
		maxFileCount : 1,
		showBrowse : false,
		browseOnZoneClick : true
	});
	
})
