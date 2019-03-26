$(document).ready(function() {
	init();

	$("#save").click(function() {
		if (!isValid()) {
			return;
		}

		var name = $("#name").val().trim();
		var enName = $("#enName").val().trim();

		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/website/newsTitle/edit.shtml',
			data : {
				id : id,
				name : name,
				enName : enName,
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
	});

});

function isValid() {
	var name = $("#name").val().trim();
	if ("" === name || name == null) {
		parent.layer.msg('请输入新闻标题名称！', {
			icon : 0,
			time : 2000
		});
		return false;
	}

	var enName = $("#enName").val().trim();
	if ("" === enName || enName == null) {
		parent.layer.msg('请输入英文名称！', {
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