$(document).ready(function() {
	init();
	$('#save').click(function() {
		save();
	});
});

function save(){
	var parentarea = $("#parentarea").val();
	if(typeof(parentarea) == 'undefined'){
		parentarea = "0";
	}
	var areaname = $("#areaname").val();
	if(areaname == null || areaname == ""){
		layer.msg('请输入菜单名称！', {
			icon : 0,
			time : 1000
		});
		return false;
	}
	var resUrl = $("#resUrlName").val();
	var reskey = $("#reskey").val();
	if(reskey == null || reskey == ""){
		layer.msg('请输入key！', {
			icon : 0,
			time : 1000
		});
		return false;
	}
	var description = $("#description").val();
	var icon = $("#icon").val();
	top.ajaxLoading();
	$.ajax({
		async : true,
		cache : false,
		type : 'POST',
		data : {
			"id" : id,
			"areaname" : areaname,
			"resUrl" : resUrl,
			"description" : description,
			"parentId" : parentarea,
			"icon" : icon,
			"reskey" : reskey,
		},
		dataType : "json",
		url : rootPath + '/menu/editEntity.shtml?id=' + id,// 请求的action路径
		error : function() {// 请求失败处理函数
			layer.msg('请求失败！', {
				icon : 2,
				time : 1000
			});
		},
		success : function(data) { // 请求成功后处理函数。
			if (data == "success") {
				top.ajaxLoadEnd();
				parent.layer.msg('更新成功！',{icon: 1,time:1000});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			} else {
				layer.msg('更新失败！', {
					icon : 2,
					time : 1000
				});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			}
		}
	});
}
function init(){
	$(".js-example-basic-single").select2({
		language : "zh-CN"
	});
}