$(document).ready(function() {
	init();

	$("#firstUrl").fileinput({
		language : "zh",
		uploadUrl : rootPath + "/hotel/food/uploadFirst.shtml",
		uploadExtraData : {
			"type" : "firstUrl",
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
			url : rootPath + "/hotel/food/deletePhoto.shtml",// 预展示图片的删除调取路径
			extra : {
				"type" : "firstUrl",
				"position" : "first",
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

	$("#secondUrl").fileinput({
		language : "zh",
		uploadUrl : rootPath + "/hotel/food/uploadSecond.shtml",
		uploadExtraData : {
			"type" : "secondUrl",
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
			url : rootPath + "/hotel/food/deletePhoto.shtml",// 预展示图片的删除调取路径
			extra : {
				"type" : "secondUrl",
				"position" : "second",
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
		var starLevel = $("#starLevel option:selected").val();
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/hotel/food/add.shtml',
			data : {
				starLevel : starLevel,
				title : title,
				content : content,
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
	var title = $("#title").val().trim();
	if ("" === title || title == null) {
		parent.layer.msg('请输入标题！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var starLevel = $("#starLevel option:selected").val();
	if ("" === starLevel || starLevel == null) {
		parent.layer.msg('请选择星级！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var content = $("#content").val().trim();
	if ("" === content || content == null) {
		parent.layer.msg('请输入所属酒店！', {
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