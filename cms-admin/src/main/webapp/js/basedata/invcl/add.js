var nameCheck = false;
var codeCheck = false;
var classCheck = false;
$(function() {

	
	
	$("#invclname").click(function(){
		$("#invclname").attr('placeholder','');
		$("#invclname").attr('class','form-control');//绿色
	})
	
	$("#parentclass").click(function(){
		
		showMenu();
	})
	
$("button").click(function(){

		if($("input:radio:checked").length==0){
			parent.layer.msg('请选择管理级别！', {icon : 3,time:1000});
			return false;
		};
	
		if(nameCheck==false&&codeCheck==false){
			return false;
		}else{
			subInput();
		}
	
})
	
});
//效验表单

function check (thisElement){

	if(thisElement.id=="invclname"){
		//验证分类名称
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
	}else if(thisElement.id=="invclcode"){//验证分类编码
	
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
	}else{
		
		var rsltCode = checkClassByName(thisElement.value.trim());
		if(rsltCode=='ok'){
			$(thisElement).val(thisElement.value.trim());
			$(thisElement).attr('placeholder','');
			$(thisElement).attr('class','form-control');//绿色
			classCheck = true;
			return true;
		}else{
			$(thisElement).val('');
			$(thisElement).attr('class','form-control alert-danger');//红色
			$(thisElement).attr('placeholder',rsltCode);
			classCheck = false;
			return false;
		}
	}
	
	}
function checkValueByName(value){
	var result;
	if(value==""){
		result="分类名称不能为空";
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
   			url:rootPath + '/basedata/invcl/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="分类名称已经存在";
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
		result="分类编码不能为空"
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
   			url:rootPath + '/basedata/invcl/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="分类编码已经存在";
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
		result="分类名称不能为空";
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
   			url:rootPath + '/basedata/invcl/checkInput.shtml',//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			
   			},
   			success:function(data){ //请求成功后处理函数。
   				if(data=="exist"){
   					result="分类名称已经存在";
   				}else{
   					result="ok";
   				}
   			}
   		});
	}
	return result;
}

function subInput(){

	if(parentId==undefined||parentId==null){
		parentId = id;
	}
	$("form").submit(function(){
		var radio = $("input[name='level']:checked").val();
		$.ajax({
   			async : false,
   			cache:false,
   			type: 'POST',
   			data:$('form').serialize(),
   			dataType : "json",
   			url:rootPath + '/basedata/invcl/addEntity.shtml?parentId='+parentId+"&level="+radio,//请求的action路径
   			error: function () {//请求失败处理函数
   				parent.layer.msg('请求失败！', {icon : 2,time:1000});
   			
   			},
   			success:function(data){ //请求成功后处理函数。
   				
   				if (data.rtnstate == "success") {
   					
					var parentName = $("#parentclass").val();
					var invclName = $("#invclname");
					if(invclName.length<=0){
						parent.addTree(null,parentName,$("#invclcode").val());	
					}else{
						parent.addTree(parentName,$("#invclname").val(),$("#invclcode").val(),data.pk);		
					}
				
			//		parent.layer.closeAll();
				parent.layer.msg('新增成功！', {icon : 1,time:1000});
					var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
					parent.layer.close(index); // 再执行关闭
			//		alert(data.rtnstate);
				//	parent.layer.closeAll();
					//parent.refreshWithIframe();
					
				} else {			
					parent.layer.msg('新增失败！', {icon : 2,time:1000});
				}
   			}
   		});
	});
}
//一下代码-设置下拉菜单+ztree
var setting = {  
		 
		 view: {                                    
		  //dblClickExpand: false,  
		  expandSpeed: 300 //设置树展开的动画速度，IE6下面没效果，  
		 },                            
		 data: {                                    
		  simpleData: {   //简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的                           
		   enable: true,  
		   idKey: "id",  //id和pid，这里不用多说了吧，树的目录级别  
		   pIdKey: "parent_id",  
		   rootPId: 0   //根节点  
		  }                            
		 },                           
		 callback: {     /**回调函数的设置，随便写了两个**/  
		                                  
		  onClick: onClick
                           
		 }  
		}; 
	var parentId;
	function onClick(e, treeId, treeNode) {
		
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		parentId = treeNode.id;
		var node = zTree.getNodeByTId(treeId);
		
		nodes = zTree.getSelectedNodes(),
		v = "";
		nodes.sort(function compare(a,b){return a.id-b.id;});
		for (var i=0, l=nodes.length; i<l; i++) {
			v += nodes[i].name + ",";
		}
		if (v.length > 0 ) v = v.substring(0, v.length-1);

		$("#parentclass").attr("value", v);
		$("#menuContent").hide();
		return false;
	
	}

	function showMenu() {
	
		var cityObj = $("#parentclass");
		var cityOffset = $("#parentclass").offset();
		$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

		$("body").bind("mousedown", onBodyDown);
	}
	function hideMenu() {
		$("#menuContent").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDown);
	}
	function onBodyDown(event) {
		if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
			hideMenu();
		}
	}

	$(document).ready(function(){
		var result;
		$.ajax({
			async : false,
			cache:false,
			type: 'POST',
			dataType : "json",
			url:rootPath + "/basedata/invcl/ztreeGetPar.shtml",//请求的action路径
			error: function () {//请求失败处理函数
				parent.layer.msg('请求失败！', {icon : 2,time:1000});
			},
			success:function(data){ //请求成功后处理函数。
				result = data;
				
			  var zTreeDemo = $.fn.zTree.init($("#treeDemo"),setting, result);  
			}
		});
		
	});
