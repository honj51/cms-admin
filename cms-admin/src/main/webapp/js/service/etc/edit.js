
$(document).ready(function() {

	$("#save").click("click",function(){
		$.ajax({
		    type: "post",
		    url: rootPath + '/service/etc/rejectStatus.shtml',
		    data: {
		        id: id,
		        replyContent:$("#replyContent").val()
		    },
		    dataType: "json",
		    beforeSend: function() {
		    },
		    success: function(response) {
		    	top.ajaxLoadEnd();
		    	if(response == "success"){
			    	parent.layer.msg('修改成功！', {icon : 1, time: 1000});
		    	}else{
		    		parent.layer.msg('修改失败！', {icon : 2, time: 1000});
		    	}
		    	var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
				
				$("#jqGrid").trigger("reloadGrid");
		    },
		    complete: function(XMLHttpRequest, textStatus) {
		    },
      error: function() {
		    	top.ajaxLoadEnd();
		    	
		    	parent.layer.msg('修改失败！', {icon : 2, time: 1000});
		    	var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
				
				$("#jqGrid").trigger("reloadGrid");
		    }
		});
	});
});
	