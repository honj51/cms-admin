$(document).ready(function() {
	init();

	$("#save").click(function() {
		save();
	});

});

function isValid() {
	var deptId = $("#dept option:selected").val();
	if ("" === deptId || null == deptId) {
		parent.layer.msg('请选择部门！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var name = $("#name").val().trim();
	if ("" === name || name == null) {
		parent.layer.msg('请输入角色名称！', {
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

function save() {
	if (!isValid()) {
		return;
	}

	var name = $("#name").val().trim();
	var deptId = $("#dept option:selected").val();
	var deptName = $("#dept option:selected").text().trim();
	var rolereamrks = $("#remarks").val().trim();

	top.ajaxLoading();
	$.ajax({
		type : "post",
		url : rootPath + '/role/add.shtml',
		data : {
			name : name,
			deptId : deptId,
			deptName : deptName,
			isLocked : $("#locked").val(),
			remarks : rolereamrks
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
			} else if (data == "duplicated_name") {
				parent.layer.msg('保存失败，角色名称重复！', {
					icon : 0,
					time : 1000
				});
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
}
