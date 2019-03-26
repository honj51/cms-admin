var menuTree;
var ok;
var treeNodes;
$(function() {
	//initSalesTeamDropDown();
	init();
	$('#saveUser').click(function() {
		saveUser();
	});
	
});


var setting = {  
		 view: {                                    
		  //dblClickExpand: false,  
		  expandSpeed: 300 ,//设置树展开的动画速度，IE6下面没效果，
		 },                            
		 data: {                                    
		  simpleData: {   //简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的                           
		   enable: true,  
		   idKey: "id",  //id和pid，这里不用多说了吧，树的目录级别  
		   pIdKey: "parent_id",  
		   rootPId: 0   //根节点 
		   
		  }                            
		 }, 
		 edit: {
				enable: true,
				showRemoveBtn: false,
				showRenameBtn: false,
				drag: {
					isCopy: false,
					isMove: true
				}
			},
		 callback: {     
		/* beforeClick: beforeClick */
			 onClick: zTreeOnClick  
		 }
			 
}; 


function zTreeOnClick(event, treeId, treeNode) {  
    var zTree = $.fn.zTree.getZTreeObj("deptTree"), nodes = zTree  
            .getSelectedNodes(), v = "", ids = "";  
    nodes.sort(function compare(a, b) {  
        return a.id - b.id;  
    });  
   for (var i = 0, l = nodes.length; i < l; i++) {  
     v += nodes[i].name;  
    ids += nodes[i].id;  
   }  
    //if (v.length > 0)  
    //  v = v.substring(0, v.length - 1);  
    var catObj = $("#deptName"),deptId = $("#deptId");  
    catObj.val(v);  
    deptId.val(ids);
    hideMenu();
}  


function showMenu() {
    var cityObj = $("#deptName");
    var cityOffset = $("#deptName").offset();  
    $("#menuContent").css({  
        left : cityOffset.left + "px",  
        top : cityOffset.top + cityObj.outerHeight() + "px"  
    }).slideDown("fast");  

    $("body").bind("mousedown", onBodyDown);  
}  
function hideMenu() {  
    $("#menuContent").fadeOut("fast");  
    $("body").unbind("mousedown", onBodyDown);  
}  
function onBodyDown(event) {  
    if (!(event.target.id == "menuBtn"  
            || event.target.id == "menuContent" || $(event.target)  
            .parents("#menuContent").length > 0)) {  
        hideMenu();  
    }  
}  
function init() {
	$(".js-example-basic-single").select2({
		language : "zh-CN"
	});

	$.ajax({
		async : false,
		cache : false,
		type : 'POST',
		dataType : "json",
		url : rootPath + '/dept/findAll.shtml',
		error : function() {
			parent.layer.msg('请求失败！', {
				icon : 2,
				time : 1000
			});
		},
		success : function(data) {
			menuTree = $.fn.zTree.init($("#deptTree"), setting, data);
			menuTree.expandAll(true); // 若为true，加载页面地区信息默认为展开方式
		}

	});

}

/*function initSalesTeamDropDown(){
	var $departmentDropDown =  $('#department');
	
	$.ajax({
		url : rootPath + '/dept/findAll.shtml',
		type : "get",
		async: true,
		dataType : "json",
		success : function(data) {
			$departmentDropDown.empty();
			$departmentDropDown.append($("<option></option>").attr("value", '').text('=请选择='));
			for (var i = 0; i < data.length; i++) {
				$departmentDropDown.append($("<option></option>").attr("value", data[i].id).text(data[i].name));
 	        }
			$departmentDropDown.selectpicker('refresh');
		},
	});
	
}*/

function saveUser(){
	

	var userName = $("#userName").val().trim();
	if(userName == ""||null==userName ){
		parent.layer.msg('请输入姓名！', {icon: 0, time: 2000});
    	return;
	}
	
	var accountName = $("#accountName").val().trim();
	if(accountName == ""||null==accountName){
		parent.layer.msg('请输入用户名！', {icon: 0, time: 2000});
    	return;
	}
	
	var phone = $("#phone").val().trim();
	if(phone == ""||null==phone){
		parent.layer.msg('请输入电话！', {icon: 0, time: 2000});
    	return;
	}
	if(!isCellphoneNumber(phone)){
		parent.layer.msg("您输入的电话号码有误，请重新输入", {icon: 0, time: 2000});
		return;
	}
	
	var role =$("#role option:selected").val();
	if(role == ""){
		parent.layer.msg('请选择角色!', {icon: 0, time: 2000});
    	return;
	}
	var departmentId =$("#deptId").val();
	var departmentName = $("#deptName").val().trim();
	if(departmentId == ""||null==departmentId || departmentName == ""||null==departmentName){
		parent.layer.msg('请选择所属部门!', {icon: 0, time: 2000});
    	return;
	}
	
	
	var orgId = $("#transportationCompany option:selected").val();
	var orgName = $("#transportationCompany option:selected").text().trim();
	
	if(orgId == ""||null==orgId){
		orgName = "";
	}

	var locked =$("#locked option:selected").val();
	
	top.ajaxLoading();

	$.ajax({
		url : rootPath + '/user/addEntity.shtml',
		type : "post",
		data:{
			userName : userName,
			accountName : accountName,
			phone : phone,
			role : role,
			orgId : orgId,
			orgName : orgName,
			departmentId : departmentId,
			departmentName : departmentName,
			locked : locked,
			remarks : $("#remarks").val()
		},
		dataType: "json",
		async: true,
		success : function(data) {
			top.ajaxLoadEnd();
			if("accountNameDuplicated" == data){
				parent.layer.msg('用户名已经存在！', {icon: 0, time: 2000});
		    	return;
			} else if("success" == data){
				parent.layer.msg('保存成功！', {icon: 1, time: 2000});
		    	var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			}else{
				parent.layer.msg('保存失败！', {icon: 2, time: 2000});
		    	return;
			}

		},
		error : function() {
			top.ajaxLoadEnd();
			parent.layer.msg('保存失败！', {
				icon : 2,
				time : 1000
			});
		}
	});
}