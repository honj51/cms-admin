$(document).ready(function() {
	init();

	$("#save").click(function() {
		if(!isValid()){
			return;
		}
		
		var manageResult = $("#manageResult option:selected").val();
		var manageTime = $("#manageTime").val().trim();
		var manageUserName = $("#manageUserName").val().trim();
		var manageUserPhone = $("#manageUserPhone").val().trim();
		
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/building/reserve/manage.shtml',
			    data: {
			    	id : id,
			    	manageResult : manageResult,
			    	manageTime : manageTime,
			    	manageUserName : manageUserName,
			    	manageUserPhone : manageUserPhone
			    },
				dataType: "json",
			    success: function(data) {
			    	top.ajaxLoadEnd();
			    	if(data == "success"){
			    		parent.layer.msg('处理成功！', {icon : 1, time: 1000});
			    		var index = parent.layer.getFrameIndex(window.name);
			    		parent.layer.close(index);
			    	} else {
			    		parent.layer.msg('处理失败！', {icon : 2, time: 1000});
			    	}
			    	
			    },
                error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('处理失败！', {icon : 2, time: 1000});
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
			    }
			});
	});
	
});


function isValid(){
	var manageResult = $("#manageResult option:selected").val();
	if("" === manageResult || manageResult==null){
    	parent.layer.msg('请选择预约结果！', {icon: 0, time: 2000});
    	return false;
	}
	
	var manageTime = $("#manageTime").val().trim();
	if("" === manageTime || null == manageTime){
		parent.layer.msg('请选择预约处理时间！', {icon: 0, time: 2000});
    	return false;
	}
	
	var manageUserName = $("#manageUserName").val().trim();
	if("" === manageUserName || null == manageUserName){
		parent.layer.msg('请输入处理人姓名！', {icon: 0, time: 2000});
    	return false;
	}
	
	var manageUserPhone = $("#manageUserPhone").val().trim();
	if("" === manageUserPhone || null == manageUserPhone){
		parent.layer.msg('请输入处理人电话！', {icon: 0, time: 2000});
    	return false;
	}
	
	return true;
}
 
function init(){
	$(".fixtop").fixtop();
	
	$("#manageTime").datetimepicker({
		format:"YYYY-MM-DD HH:mm:ss"
	});
}