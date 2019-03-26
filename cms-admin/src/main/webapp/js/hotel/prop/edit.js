$(document).ready(function() {
	init();

	$("#url").fileinput({
		language : "zh",
		uploadUrl : rootPath + "/hotel/prop/upload.shtml",
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
			url : rootPath + "/hotel/prop/deletePhoto.shtml",// 预展示图片的删除调取路径
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

		var type = $("#type option:selected").val();
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/hotel/prop/add.shtml',
			data : {
				type : type,
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
	var type = $("#type option:selected").val();
	if ("" === type || type == null) {
		parent.layer.msg('请选择宣传图片位置！', {
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