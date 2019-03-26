$(document).ready(function() {
	init();

	$("#addressUrl").fileinput({
		language : "zh",
		uploadUrl : rootPath + "/hotel/info/upload.shtml",
		uploadExtraData : {
			"type" : "addressUrl",
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
			url : rootPath + "/hotel/info/deletePhoto.shtml",// 预展示图片的删除调取路径
			extra : {
				"type" : "addressUrl",
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

		var businessTime = $("#businessTime").val().trim();
		var phone = $("#phone").val().trim();
		var info = $("#info").val().trim();

		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/hotel/info/add.shtml',
			data : {
				businessTime : businessTime,
				phone : phone,
				info : info,
				id : id
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

});

function isValid() {
	var businessTime = $("#businessTime").val().trim();
	if ("" === businessTime || null == businessTime) {
		parent.layer.msg('请输入营业时间！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var phone = $("#phone").val().trim();
	if ("" === phone || null == phone) {
		parent.layer.msg('请输入电话！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var info = $("#info").val().trim();
	if ("" === phone || null == phone) {
		parent.layer.msg('请输入餐饮介绍！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	return true;
}

function init() {
	$(".fixtop").fixtop();
}