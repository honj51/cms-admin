$(function() {	
if(status=="1"){
	$("#save").attr("disabled","disabled");
}
$("#save").click(function(){
	editInfo("save");
});
$("#publish").click(function(){
	editInfo("publish");
});
});
function editInfo(status){
	$.ajax({
		async:false,
		cache:false,
		data:{
			content:editor1.html(),
			infoType:$("#type").val(),
			title:$("#title").val(),
			status:status,
			
			accountName:accountName,
			id:id,
			isShowPage:showPage
		},
		type:"POST",
		dataType:"json",
		url:rootPath + '/systemManage/publish/editEntity.shtml',
		error:function(){
			parent.layer.msg('修改失败！', {icon : 2,time:1000});
			var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
			parent.layer.close(index); 
		},
		success:function(){
			parent.layer.msg('修改成功！', {icon : 1,time:1000});
			var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
			parent.layer.close(index); 
		}
	});
}
