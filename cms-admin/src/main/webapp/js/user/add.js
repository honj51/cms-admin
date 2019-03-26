$(function() {
	init();
	$('#save').click(function() {
		save();
	});

});

function init() {
	$(".js-example-basic-single").select2({
		language : "zh-CN"
	});
	
	$("#dept").on("select2:close",function(e){
		changeRole();
	});
}

function save() {

	var name = $("#name").val().trim();
	if (name == "" || null == name) {
		parent.layer.msg('请输入姓名！', {
			icon : 0,
			time : 2000
		});
		return;
	}

	var accountName = $("#accountName").val().trim();
	if (accountName == "" || null == accountName) {
		parent.layer.msg('请输入用户名！', {
			icon : 0,
			time : 2000
		});
		return;
	}

	var phone = $("#phone").val().trim();
	if (phone != "" && null != phone) {
		if (!isCellphoneNumber(phone)) {
			parent.layer.msg("您输入的电话号码有误，请重新输入", {
				icon : 0,
				time : 2000
			});
			return;
		}
	}
	
	var deptId = $("#dept option:selected").val();
	var deptName = $("#dept option:selected").text().trim();
	if (deptId == "" || null == deptId) {
		parent.layer.msg('请选择所属部门!', {
			icon : 0,
			time : 2000
		});
		return;
	}

	var roleId = $("#role option:selected").val();
	var roleName = $("#role option:selected").text().trim();
	if (roleId == "") {
		parent.layer.msg('请选择角色!', {
			icon : 0,
			time : 2000
		});
		return;
	}
	
	var locked = $("#locked option:selected").val();

	top.ajaxLoading();

	$.ajax({
		url : rootPath + '/user/add.shtml',
		type : "post",
		data : {
			name : name,
			accountName : accountName,
			phone : phone,
			deptId : deptId,
			deptName : deptName,
			roleId : roleId,
			roleName : roleName,
			locked : locked,
			remarks : $("#remarks").val()
		},
		dataType : "json",
		async : true,
		success : function(data) {
			top.ajaxLoadEnd();
			if ("accountNameDuplicated" == data) {
				parent.layer.msg('用户名已经存在！', {
					icon : 0,
					time : 2000
				});
				return;
			} else if ("success" == data) {
				parent.layer.msg('保存成功！', {
					icon : 1,
					time : 2000
				});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			} else {
				parent.layer.msg('保存失败！', {
					icon : 2,
					time : 2000
				});
				return;
			}

		},
		error : function() {
			top.ajaxLoadEnd();
			parent.layer.msg('保存失败！', {
				icon : 2,
				time : 1000
			});
		}
	});
}

function changeRole(){
	var deptId = $("#dept option:selected").val();
	if("" == deptId || null == deptId){
		$("#role").empty();
		$("#role").append($("<option></option>").attr("value", '').text('请选择角色'));
		$("#role").selectpicker('refresh');
		return;
	}
	
	$.ajax({
		type : "POST",
		async: true,
		dataType : "json",
		data:{
			deptId : deptId
		},
		url : rootPath + '/role/findByDeptId.shtml',
		success : function(data) {
			$("#role").empty();
			$("#role").append($("<option></option>").attr("value", '').text('请选择'));
			for (var i = 0; i < data.length; i++) {
				$("#role").append($("<option></option>").attr("value", data[i].id).text(data[i].name));
 	        }
			$("#role").selectpicker('refresh');
		},
	});
	
}