var codeCheck = false;
var nameCheck = false;
$(function() {	
	$("button").click(function(e){
		
				if(!codeCheck||!nameCheck){
					return false;
				}else{
					subInput();
				}
});
})
//效验表单

function check(thisElement){

	if(thisElement.id=="measName"){
		//验证物资名称
	var rslt = checkValueByName(thisElement.value.trim());
	if(rslt=='ok'){
		$(thisElement).val(thisElement.value.trim());
		$(thisElement).attr('placeholder','');
		$(thisElement).attr('class','form-control');//绿色
		nameCheck = true;
		return true;
	
	}else{
		$(thisElement).val('');
		$(thisElement).attr('class','form-control alert-danger');//红色
		$(thisElement).attr('placeholder',rslt);
		nameCheck = false;
		return false;
		}
	}else if(thisElement.id=="shortName"){//验证物资编码
	
		var rsltCode = checkValueByCode(thisElement.value.trim());
		if(rsltCode=='ok'){
			$(thisElement).val(thisElement.value.trim());
			$(thisElement).attr('placeholder','');
			$(thisElement).attr('class','form-control');//绿色
			codeCheck = true;
			return true;
		}else{
			$(thisElement).val('');
			$(thisElement).attr('class','form-control alert-danger');//红色
			$(thisElement).attr('placeholder',rsltCode);
			codeCheck = false;
			return false;
		}
	}
	
	}
function checkValueByName(value){
	var result;
	if(value==""){
		result="计量单位名称不能为空";
	}else{
		$.ajax({
   			async : false,
   			cache:false,
   			type: 'POST',
   			data:{
   				val:value,
   				type:"name"
   			},
   			dataType : "json",
   			url:rootPath + '/basedata/meas/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="计量单位名称已经存在";
   				}else{
   					result="ok";
   				}
   			}
   		});
	}
	return result;
}
function checkValueByCode(value){
	var result;
	if(value==""){
		result="计量单位编码不能为空"
	}else{
		$.ajax({
   			async : false,
   			cache:false,
   			type: 'POST',
   			data:{
   				val:value,
   				type:"code"
   			},
   			dataType : "json",
   			url:rootPath + '/basedata/meas/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="计量单位编码已经存在";
   				}else{
   					result="ok";
   				}
   			}
   		});
	}
	return result;
}
function checkClassByName(value){
	var result;
	if(value==""){
		result="计量单位名称不能为空";
	}else{
		$.ajax({
   			async : false,
   			cache:false,
   			type: 'POST',
   			data:{
   				val:value,
   				type:"name"
   			},
   			dataType : "json",
   			url:rootPath + '/basedata/meas/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="计量单位编码已经存在";
   				}else{
   					result="ok";
   				}
   			}
   		});
	}
	return result;
}

function subInput(){
	$("form").submit(function(){
		$.ajax({
   			async : false,
   			cache:false,
   			type: 'GET',
   			data:$('form').serialize(),
   			dataType : "json",
   			url:rootPath + '/basedata/meas/addEntity.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('新增失败！', {icon : 2,time:1000});
				var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
				parent.layer.close(index);
   			
   			},
   			success:function(){ //请求成功后处理函数。
   				parent.layer.msg('新增成功！', {icon : 1,time:1000});
				var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
				parent.layer.close(index);
							
				
   			}
   		});
	});
}