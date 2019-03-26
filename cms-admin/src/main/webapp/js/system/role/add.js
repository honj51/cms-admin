
$(document).ready(function() {
	$('#saveRole').click(function() {
		saveRole();
	});
});


	    	

function saveRole(){
	var name = $("#name").val();
	if(name == ""||null==name ){
		parent.layer.msg('请输入角色名！', {icon: 0, time: 2000});
    	return;
	}
	top.ajaxLoading();
	$.ajax({
		url : rootPath + '/role/addEntity.shtml',
		type : "post",
		data:{
			name : name,
			description : $("#description").val()
		},
		dataType: "json",
	    async: true,
		success : function(data) {
			top.ajaxLoadEnd();
			if("nameDuplicated" == data){
				parent.layer.msg('角色名已经存在！', {icon: 0, time: 2000});
		    	return;
			} else if("success" == data){
				parent.layer.msg('新增成功！', {icon: 1, time: 2000});
		    	var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			}else{
				parent.layer.msg('新增失败！', {icon: 2, time: 2000});
		    	return;
			}

		},
		error : function(){
			top.ajaxLoadEnd();
			parent.layer.msg('新增失败！', {icon: 2, time: 2000});
		}
	});
}