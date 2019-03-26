var nameCheck = false;
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
			"basedataCompanyQualTypeFormMap.name": $("#qualtypeName").val(),
			"basedataCompanyQualTypeFormMap.code": $("#qualtypeCode").val(),
			"basedataCompanyQualTypeFormMap.id": $("#qualtypeId").val()
		},
		dataType: "json",
		url: rootPath + '/basedata/companyqualtype/editEntity.shtml',
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