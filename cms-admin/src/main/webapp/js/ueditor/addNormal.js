$(document).ready(function() {

	var ue = UE.getEditor('ueditor');
	ue.ready(function(editor) {
		
	});

	$("#save").click(function() {
		var html = ue.getContent();

		$.ajax({
			type : "post",
			url : rootPath + '/ueditor/addNormal.shtml',
			data : {
				html : html
			},
			dataType : "json",
			success : function(data) {
				top.ajaxLoadEnd();
				if (data.result == "success") {
					parent.layer.msg('保存成功！', {
						icon : 1,
						time : 1000
					});
					
					var htmlUrl = data.url;
					if("" != htmlUrl && null != htmlUrl && typeof(htmlUrl) != 'undefined'){
						parent.htmlUrl=data.url;
					}
					
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
				} else if(data.result == "fail") {
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

})
