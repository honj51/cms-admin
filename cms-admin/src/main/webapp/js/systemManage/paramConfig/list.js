$(document).ready(function() {
	$("#save").click(function() {
		save();
	})

});

function save() {
	var urgentOrderRemindTime = $("#urgentOrderRemindTime").val();
	var urgentOrderSiteRemind = 0;
	if($("#urgentOrderSiteRemind").prop("checked")){
		urgentOrderSiteRemind = 1;
	}
	var urgentOrderShortMsgRemind = 0;
	if($("#urgentOrderShortMsgRemind").prop("checked")){
		urgentOrderShortMsgRemind = 1;
	}
	
	var rushOrderRemindTime = $("#rushOrderRemindTime").val();
	var rushOrderSiteRemind = 0;
	if($("#rushOrderSiteRemind").prop("checked")){
		rushOrderSiteRemind = 1;
	}
	var rushOrderShortMsgRemind = 0;
	if($("#rushOrderShortMsgRemind").prop("checked")){
		rushOrderShortMsgRemind = 1;
	}
	
	$.ajax({
		type: "post",
		async: true,
		url: rootPath + '/systemManage/paramConfig/editEntity.shtml',
		data: {
			urgentOrderRemindTime: urgentOrderRemindTime,
			urgentOrderSiteRemind: urgentOrderSiteRemind,
			urgentOrderShortMsgRemind: urgentOrderShortMsgRemind,
			rushOrderRemindTime: rushOrderRemindTime,
			rushOrderSiteRemind: rushOrderSiteRemind,
			rushOrderShortMsgRemind: rushOrderShortMsgRemind
		},
		dataType: "json",
		success: function(response) {
			parent.layer.msg('保存成功！', {
				icon : 1,
				time: 1000
			});
		},
	    error: function() {
	    	parent.layer.msg('请求失败！', {
				icon : 2,
				time: 1000
			});
	    }
	});
}