$(document).ready(function() {
	init();

	$("#save").click(function() {
		save();
	});

});

function isValid() {
	var name = $("#name").val().trim();
	if ("" === name || name == null) {
		parent.layer.msg('请输入目录名称！', {
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

function save() {
	if(!isValid()){
		return;
	}
	
	var name = $("#name").val().trim();
	var catalogremarks = $("#remarks").val().trim();
	
	top.ajaxLoading();
	$.ajax({
		type : "post",
		url : rootPath + '/website/catalog/edit.shtml',
		data : {
			id : id,
			name : name,
			remarks : catalogremarks
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
}