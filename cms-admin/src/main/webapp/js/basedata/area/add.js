var pronameCheck = false;
var codeCheck = false;
var urbnameCheck = false;
$(function() {
	$("button").click(function(e){
	
			if($("#proName").attr("disabled")=="disabled"){

					if(!codeCheck||!urbnameCheck){
						return false;
					}else{
						subInput();
					}
				}else{
					if(!pronameCheck||!codeCheck){
						return false;
					}else{
						subInput();
					}
				}
	})
});
function check (thisElement){
	if(thisElement.id=="urbanName"){
		//验证物资名称
	var rslt = checkValueByName(thisElement.value.trim());
	if(rslt=='ok'){
		$(thisElement).val(thisElement.value.trim());

		$(thisElement).attr('class','form-control');//绿色
		urbnameCheck = true;
		return true;
	
	}else{
		$(thisElement).val('');
		$(thisElement).attr('class','form-control alert-danger');//红色
		$(thisElement).attr('placeholder',rslt);
		urbnameCheck = false
		return false;
		}
	}else if(thisElement.id=="areaCode"){//验证物资编码
		var rsltCode = checkValueByCode(thisElement.value.trim());
		if(rsltCode=='ok'){
			$(thisElement).val(thisElement.value.trim());
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
	}else{
		
		var rsltCode = checkClassByName(thisElement.value.trim());
		if(rsltCode=='ok'){
		
			$(thisElement).val(thisElement.value.trim());
			$(thisElement).attr('class','form-control');//绿色
			pronameCheck = true;
			return true;
		}else{
			$(thisElement).val('');
			$(thisElement).attr('class','form-control alert-danger');//红色
			$(thisElement).attr('placeholder',rsltCode);
			pronameCheck = false;
			return false;
		}
	}
	
	}
function checkValueByName(value){
	var result;
	if(value==""){
		result="市名称不能为空";
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
   			url:rootPath + '/basedata/area/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="市名称已经存在";
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
		result="市编码不能为空"
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
   			url:rootPath + '/basedata/area/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="市编码已经存在";
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
		result="省不能为空";
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
   			url:rootPath + '/basedata/area/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="省名称已经存在";
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
	   			type: 'POST',
	   			data:$('form').serialize(),
	   			dataType : "json",
	   			url:rootPath + '/basedata/area/addEntity.shtml',//请求的action路径
	   			error: function () {//请求失败处理函数
	   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
	   				
	   			},
	   			success:function(data){ //请求成功后处理函数。
	   				if (data.rtnstate == "success") {
						layer.msg('添加成功！', {icon : 1,time:1000});
						var proName = $("#proName").val();
						var urbanName = $("#urbanName");
						
						if(urbanName.length<=0){
							parent.addTree(null,proName,$("#areaCode").val(),data.pk);	
							}else{
							parent.addTree(proName,$("#urbanName").val(),$("#areaCode").val(),data.pk);		
							}
							parent.layer.closeAll();
						
					} else {
						parent.layer.msg('添加失败！', {icon : 2,time:1000});
					}
	   			}
	   		});
		});
	}