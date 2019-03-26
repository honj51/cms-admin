$(document).ready(function() {
	init();

	$("#url").fileinput({
		language : "zh",
		uploadUrl : rootPath + "/website/news/upload.shtml",
		uploadExtraData : {
			"type" : "url",
			id : id
		},
		uploadAsync : true,
		showPreview : true,
		showBrowse : true,
		browseOnZoneClick : true,
		overwriteInitial : true,
		autoReplace : true,
		maxFileCount : 1,
		initialPreview: [
            url,
        ],
		initialPreviewConfig : [ {
			showDelete : true,
			url : rootPath + "/website/news/deletePhoto.shtml",// 预展示图片的删除调取路径
			extra : {
				"type" : "url",
				"id" : id
			}
		// 调用删除路径所传参数
		} ],
		initialPreviewAsData : true
	}).on("filebatchselected", function(event, files) {
		$(this).fileinput("upload");
	}).on("fileuploaded", function(event, data) {
		if (data.response) {
			parent.layer.msg('上传成功！', {
				icon : 0,
				time : 1000
			});
		}
	});

	$("#detailUrl").fileinput({
		language : "zh",
		uploadUrl : rootPath + "/website/news/uploadDetail.shtml",
		uploadExtraData : {
			"type" : "detailUrl",
			id : id
		},
		uploadAsync : true,
		showPreview : true,
		showBrowse : true,
		browseOnZoneClick : true,
		overwriteInitial : true,
		autoReplace : true,
		maxFileCount : 1,
		initialPreview: [
			detailUrl,
        ],
		initialPreviewConfig : [ {
			showDelete : true,
			url : rootPath + "/website/news/deletePhoto.shtml",// 预展示图片的删除调取路径
			extra : {
				"type" : "detailUrl",
				"id" : id
			}
		// 调用删除路径所传参数
		} ],
		initialPreviewAsData : true
	}).on("filebatchselected", function(event, files) {
		$(this).fileinput("upload");
	}).on("fileuploaded", function(event, data) {
		if (data.response) {
			parent.layer.msg('上传成功！', {
				icon : 0,
				time : 1000
			});
		}
	});

	$("#save").click(function() {
		if (!isValid()) {
			return;
		}

		var title = $("#title").val().trim();
		var content = $("#content").val().trim();
		var newsTitleId = $("#newsTitle option:selected").val();
		var newsTitleName = $("#newsTitle option:selected").text().trim();
		
		if(newsTitleName == "专题报告"){
			if(content != '' && content.length > 200){
				parent.layer.msg('专题内容不得大于200字！当前字数' + content.length + '字', {
					icon : 0,
					time : 2000
				});
			}
		}

		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/website/news/edit.shtml',
			data : {
				title : title,
				content : content,
				id : id,
				newsTitleId : newsTitleId,
				newsTitleName : newsTitleName
			},
			dataType : "json",
			success : function(data) {
				top.ajaxLoadEnd();
				if (data == "success") {
					parent.layer.msg('修改成功！', {
						icon : 1,
						time : 1000
					});
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
				} else {
					parent.layer.msg('修改失败！', {
						icon : 2,
						time : 1000
					});
				}

			},
			error : function() {
				top.ajaxLoadEnd();

				parent.layer.msg('修改失败！', {
					icon : 2,
					time : 1000
				});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			}
		});
	});

});

function isValid() {
	var newsTitleId = $("#newsTitle option:selected").val();
	if ("" === newsTitleId || newsTitleId == null) {
		parent.layer.msg('请选择所属新闻标题！', {
			icon : 0,
			time : 2000
		});
		return false;
	}
	
	var title = $("#title").val().trim();
	if ("" === title || title == null) {
		parent.layer.msg('请输入新闻标题！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var content = $("#content").val().trim();
	if ("" === content || content == null) {
		parent.layer.msg('请输入新闻内容！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	return true;
}

function init() {
	$(".fixtop").fixtop();
	
	$(".js-example-basic-single").select2({
		language : "zh-CN"
	});
}

function keynam(event,th){
	var keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
	if(keyCode==13){
		$(th).val($(th).val().replace(/\n/g,"<br/>"));
	}
}