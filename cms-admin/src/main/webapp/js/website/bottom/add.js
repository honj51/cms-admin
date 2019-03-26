var htmlUrl = "";

$(document).ready(function() {
	init();

	$("#picUrl").fileinput({
		language : "zh",
		uploadUrl : rootPath + "/website/bottom/upload.shtml",
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
		initialPreviewConfig : [ {
			showDelete : true,
			url : rootPath + "/website/bottom/deletePhoto.shtml",// 预展示图片的删除调取路径
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

	$("#save").click(function() {
		if (!isValid()) {
			return;
		}

		var name = $("#name").val().trim();
		
		
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/website/bottom/add.shtml',
			data : {
				name : name,
				id : id,
				webUrl : htmlUrl
			},
			dataType : "json",
			success : function(data) {
				top.ajaxLoadEnd();
				if (data == "success") {
					parent.layer.msg('保存成功！', {
						icon : 1,
						time : 1000
					});
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
				} else {
					parent.layer.msg('保存失败！', {
						icon : 2,
						time : 1000
					});
				}
			},
			error : function() {
				top.ajaxLoadEnd();

				parent.layer.msg('保存失败！', {
					icon : 2,
					time : 1000
				});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			}
		});
	});

	$("#addWeb").click(function() {
		layer.open({
			title : "新增底部链接页面",
			type : 2,
			area : [ "90%", "90%" ],
			content : rootPath + '/ueditor/addUI.shtml',
			end : function() {
				$("#jqGrid").trigger('reloadGrid');
			}
		});
	});

});

function isValid() {
	var name = $("#name").val().trim();
	if ("" === name || name == null) {
		parent.layer.msg('请输入底部链接名称！', {
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