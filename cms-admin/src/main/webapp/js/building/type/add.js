$(document).ready(function() {
	init();

	$("#save").click(function() {
		if (!isValid()) {
			return;
		}

		var name = $("#name").val().trim();
		var remarks = $("#remarks").val().trim();

		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/building/type/add.shtml',
			data : {
				name : name,
				remarks : remarks
			},
			dataType : "json",
			beforeSend : function() {
			},
			success : function(data) {
				top.ajaxLoadEnd();
				if (data == "success") {
					parent.layer.msg('保存成功！', {
						icon : 1,
						time : 1000
					});
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
				} else if(data == "duplicate_name"){
					parent.layer.msg('保存失败，当前类型名称已存在！', {
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

});

function isValid() {
	var name = $("#name").val().trim();
	if ("" === name || null == name) {
		parent.layer.msg('请输入类型名称！', {
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