var codeCheck = false;
var nameCheck = false;
$(function() {
	$("#save").click(function(){
		addInfo("save");
	});
	$("#publish").click(function(){
		addInfo("publish");
	});

});
function addInfo(status){
	var v_title = $("#title").val().trim();
	var v_content = editor1.text().trim();
	
	if(!(CommnUtil.notNull(v_title) && CommnUtil.notNull(v_content))){
		parent.layer.msg('标题或内容不能为空！', {icon : 0,time:1000});
		return;
	}
	
	
	$.ajax({
		async:false,
		cache:false,
		data:{
			content:editor1.html(),
			infoType:$("#infoType").val(),
			title:$("#title").val(),
			status:status,
			accountName:accountName
		},
		type:"POST",
		dataType:"json",
		url:rootPath + '/systemManage/publish/addEntity.shtml',
		error:function(){
			parent.layer.msg('新增失败！', {icon : 2,time:1000});
			//var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
			//parent.layer.close(index); 
			parent.layer.closeAll('iframe');
		},
		success:function(){
			if(status=="save"){
		//	parent.layer.msg('添加成功', {icon : 1});
			parent.layer.msg('保存成功！',{icon : 1,time:1000});
			//var index = parent.layer.getFrameIndex(parent.window.name); // 先得到当前iframe层的索引
			//parent.layer.close(index); 	
			parent.layer.closeAll('iframe'); 
			}else{
				parent.layer.msg('发布成功！', {icon : 1,time:1000});
				//var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
				//parent.layer.close(index); 	
				parent.layer.closeAll('iframe');
			}
		}
	});
}
