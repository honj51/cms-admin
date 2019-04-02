var htmlUrl = "";

$(document).ready(function() {
	init();

	$("#picUrl").fileinput({
		language : "zh",
		uploadUrl : rootPath + "/cinemaInfo/upload.shtml",
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
		initialPreview : [ picUrl, ],
		initialPreviewConfig : [ {
			showDelete : true,
			url : rootPath + "/cinemaInfo/deletePhoto.shtml",// 预展示图片的删除调取路径  
			extra : {
				"type" : "url",
				"id" : id
			}
		//调用删除路径所传参数 
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

		var type = $("#type option:selected").val().trim();
		var date = $("#date").val().trim();
		var title = $("#title").val().trim();
		var description = $("#description").val().trim();

		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/cinemaInfo/edit.shtml',
			data : {
				id : id,
				date : date,
				type : type,
				title : title,
				description : description,
				url : htmlUrl
			},
			dataType : "json",
			beforeSend : function() {
			},
			success : function(data) {
				top.ajaxLoadEnd();
				if (data == "success") {
					parent.layer.msg('保存提交！', {
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
			complete : function(XMLHttpRequest, textStatus) {
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
			content : rootPath + '/ueditor/addNormalUI.shtml',
			end : function() {
				$("#jqGrid").trigger('reloadGrid');
			}
		});
	});

});

function isValid() {
	var type = $("#type option:selected").val().trim();
	if ("" === type || type == null) {
		parent.layer.msg('请选择影讯类型！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var date = $("#date").val().trim();
	if ("" === date || date == null) {
		parent.layer.msg('请选择影讯日期！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var title = $("#title").val().trim();
	if ("" === title || title == null) {
		parent.layer.msg('请输入影讯标题！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var description = $("#description").val().trim();
	if ("" === description || description == null) {
		parent.layer.msg('请输入影讯描述！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	return true;
}

function init() {
	$(".fixtop").fixtop();
	
	$('#date').datetimepicker({
		format : "YYYY-MM-DD"
	});
}