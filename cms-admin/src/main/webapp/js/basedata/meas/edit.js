var codeCheck = false;
var nameCheck = false;
var isCodeOnblur = false;
var isNameOnblur = false;
$(function() {
	$("#commit").click(function(e) {
		commit();
	});
})

function commit() {
	$.ajax({
		async: true,
		cache: false,
		type: 'post',
		data: {
			measName: $("#measName").val(),
			measCode: $("#measCode").val()
		},
		dataType: "json",
		url: rootPath + '/basedata/meas/editEntity.shtml',
		error: function() {
			parent.layer.msg('修改失败！', {
				icon: 2,
				time: 1000
			});
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);

		},
		success: function() {
			parent.layer.msg('修改成功！', {
				icon: 1,
				time: 1000
			});
	    	var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		}
	});
}