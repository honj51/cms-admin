var codeCheck = false;
var urbnameCheck = false;
var isOnblurName = false;
var isOnblurCode = false;
$(function() {
	$("button").click(function(e){

				if(!isOnblurName){
					urbnameCheck = true;
				}
				if(!isOnblurCode){
					codeCheck = true;
				}

				if(!codeCheck||!urbnameCheck){
					return false;
				}else{
					subInput();
				}
		
})
});
function check (thisElement){
	
	if(thisElement.id=="areaname"){
		//验证物资名称
		isOnblurName = true;
		if(thisElement.value.trim()==name){
			$(thisElement).val(thisElement.value.trim());
			$(thisElement).attr('class','form-control');//绿色
			urbnameCheck = true;
			return true;
		}
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
	}else if(thisElement.id=="areacode"){//验证编码
		isOnblurCode = true;
		if(code==thisElement.value.trim()){
			$(thisElement).val(thisElement.value.trim());
			$(thisElement).attr('class','form-control');//绿色
			urbnameCheck = true;
			return true;
		}
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
	}
	
	}
function checkValueByName(value){
	var result;
	if(value==""){
		result="城市名称不能为空";
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
   					result="城市名称已经存在";
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
		result="城市编码不能为空"
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
   					result="城市编码已经存在";
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
   			url:rootPath + '/basedata/area/editEntity.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   				
   			},
   			success:function(data){ //请求成功后处理函数。

   					parent.layer.msg('修改成功！', {icon : 1,time:1000});	
					parent.updateZtreeNode($("#beforeName").val(),$("#areaname").val());	
					parent.layer.closeAll();
				
   			}
   		});
	});
}