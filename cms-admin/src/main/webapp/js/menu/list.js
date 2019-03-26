var menuTree;
var ok;
var treeNodes;
var resId;
$(document).ready(function() {
	init();
	$("#open").click("click", function() {
		menuTree.expandAll(true);
		ok = true;
	});
	$("#close").click("click", function() {
		menuTree.expandAll(false);
		ok = false;
	});
});

$("#addRes").click("click", function() {
	addRes();
});

$("#save").click("click", function() {
	editRes();
});
$("#editRes").click("click", function() {
	editResUI();
});
$("#delRes").click("click", function() {
	delRes();
});
$("#searchRes").click("click",function(){
	resList(resId);
});
function addRes() {
	var id = $("#disnum").val();
	var index;
	 
		    index = parent.layer.open({
			title : "新增菜单",
			type : 2,
			maxmin : true,
			area : [ "55%", "55%" ],
			content : rootPath + '/menu/addUI.shtml?&id='+id,
			end : function() {
				refreshDistrictTree("");
			}
		});
	

	
	parent._layer_index = index;
}

function editResUI() {
	var id = $("#disnum").val();
	if (id == null || id == '') {
		layer.msg('请选择菜单！', {
			icon : 0,
			time : 1000
		});
		return false;
	}
	var index = parent.layer.open({
			title : "修改菜单",
			type : 2,
			maxmin : true,
			area : [ "55%", "55%" ],
			content : rootPath + '/menu/editUI.shtml?&id='+id,
			end : function() {
				refreshDistrictTree("");
			}
		});
	

	
	parent._layer_index = index;
}
function editRes() {

	var selIndex = $("#disnum").val();
	if (selIndex == null || selIndex == '') {
		layer.msg('请选择需要更新的节点！', {
			icon : 0,
			time : 1000
		});
		return false;
	} else {
		var id = $("#disnum").val();
		var code = $("#parentarea").val();
		var areaname = $("#areaname").val();
		var resUrl = $("#resUrlName").val();
		var description = $("#description").val();
		$.ajax({
			async : true,
			cache : false,
			type : 'POST',
			data : {
				"id" : id,
				"areaname" : areaname,
				"resUrl" : resUrl,
				"description" : description,
				"parentId" : code,
			},
			dataType : "json",
			url : rootPath + '/menu/editRes.shtml?id=' + id,// 请求的action路径
			error : function() {// 请求失败处理函数
				layer.msg('请求失败！', {
					icon : 2,
					time : 1000
				});
			},
			success : function(data) { // 请求成功后处理函数。
				if (data == "success") {
					refreshDistrictTree("");
					layer.msg('更新成功！', {
						icon : 1,
						time : 1000
					});
				} else {
					layer.msg('更新失败！', {
						icon : 2,
						time : 1000
					});
				}
			}
		});
	}
}

$("#refreshbutton").click(
		"click",
		function() {
			// document.getElementById("searchForm").reset();
			$("#detailDiv").find("input[type=text],input[type=hidden]").each(
					function() {
						$(this).val('');
					});
			refreshOrg();
		});

function delRes() {
	// 获取选中行index
	var selIndex = $("#disnum").val();

	if (selIndex == null || selIndex == "") {
		parent.layer.msg('请选择数据！', {
			icon : 0,
			time : 2000
		});
		return;
	}
	if (selIndex == '17600') {
		parent.layer.msg('不可删除此数据！', {
			icon : 0,
			time : 2000
		});
		return;
	}
	var checkUrl = rootPath + '/menu/checkDelete.shtml';
	var checkResult = CommnUtil.ajax(checkUrl, {
		ids : selIndex + ","
	}, "json");
	if (checkResult == 'success') {
		parent.layer.confirm('确认删除吗?', function(index) {
			var url = rootPath + '/menu/deleteEntity.shtml';
			var s = CommnUtil.ajax(url, {
				ids : selIndex + ","
			}, "json");
			if (s == "success") {
				parent.layer.msg('删除成功！', {
					icon : 1,
					time : 1000
				});
				refreshDistrictTree('');
			} else {
				parent.layer.msg('删除失败！', {
					icon : 2,
					time : 1000
				});
			}
		});
	} else {
		parent.layer.msg('菜单存在下级,不能越级删除！', {
			icon : 0,
			time : 2000
		});
		return;
	}

}
var setting = {  
		 view: {                                    
		  //dblClickExpand: false,  
		  expandSpeed: 300 ,//设置树展开的动画速度，IE6下面没效果，
		 },                            
		 data: {                                    
		  simpleData: {   //简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的                           
		   enable: true,  
		   idKey: "id",  //id和pid，这里不用多说了吧，树的目录级别  
		   pIdKey: "parentId",  
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
		 beforeClick: beforeClick,    
		 onDrop: zTreeOnDrop
		 }
			 
}; 

function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
	
	var id = treeNodes[0].id;//获得被拖拽的节点id
	var targetId = targetNode.id;//获得目标id
	movetree(id,targetId,moveType);
	
};

function onDrop(event, treeId, treeNodes, targetNode, moveType){
	var id = treeNodes[0].id;//获得被拖拽的节点id
	var targetId = targetNode.id;//获得目标id
	movetree(id,targetId);
	
	}
function beforeClick(treeId, treeNode) {
	var node_id = treeNode.id;
	var node_parent_id = treeNode.parentId;
	$("#node_id").val(node_id);
	$("#parentId").val(node_parent_id);
	var clickUrl = rootPath + '/menu/findByPage.shtml?treeId=' + node_id;
	onclicktree(node_id);
	resId = node_id;
}
function resList(resId){
	if (resId == null || resId == '') {
		parent.layer.msg('请选择要查看的节点！', {
			icon : 0,
			time : 1000
		});
		return;
	}
	parent.layer.open({
		title: "权限列表",
		type: 2,
		area: ["90%", "90%"],
		content: rootPath + '/menu/resListUI.shtml?resId=' + resId,
		maxmin: true,
		end: function() {
			$("#jqGrid").trigger('reloadGrid');
		}
	});

}

function movetree(id,targetId,type) {
	var editUrl = rootPath + '/menu/editRes.shtml';
	var s = CommnUtil.ajax(editUrl, {
		id : id,
		parentId : targetId,
		type : type
	}, "json");
	if (s == "success") {
		parent.layer.msg('移动成功！', {
			icon : 1,
			time : 1000
		});
	} else if(s == "fail"){
		parent.layer.msg('根目录禁止此操作！', {
			icon : 0,
			time : 1000
		});
		refreshDistrictTree('');
	}else {
		parent.layer.msg('移动失败！', {
			icon : 2,
			time : 1000
		});
	}
}
function onclicktree(treeId) {
	var url = rootPath + '/menu/findByTree.shtml?treeId=' + treeId;
	var districtMap = CommnUtil.ajax(url, {}, "json");
	if (districtMap != null && districtMap != '') {
		if (districtMap.parentId == '0') {
			$("#menu").hide();
			$("#resUrl").hide();
		} else {
			$("#menu").show();
			$("#resUrl").show();
		}
		$("#disnum").val(districtMap.id);
		$("#parentarea").prepend(
				$("<option selected='selected'></option>").attr("value",
						districtMap.parentId).text(districtMap.parent_name));
		$("#areaname").val(districtMap.name);
		$("#resUrlName").val(districtMap.resUrl);
		$("#level").val(districtMap.level);
		$("#description").val(districtMap.description);
	}
};

function refreshDistrictTree(parent_id) {
	$(function() {
		$.ajax({
			async : false,
			cache : false,
			type : 'POST',
			dataType : "json",
			url : rootPath + '/menu/findAll.shtml',
			error : function() {
				parent.layer.msg('请求失败！', {
					icon : 2,
					time : 1000
				});
			},
			success : function(data) {
				menuTree = $.fn.zTree.init($("#resTree"), setting, data);
				menuTree.expandAll(ok);
			}
		});
	});

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
		url : rootPath + '/menu/findAll.shtml',
		error : function() {
			parent.layer.msg('请求失败！', {
				icon : 2,
				time : 1000
			});
		},
		success : function(data) {
			menuTree = $.fn.zTree.init($("#resTree"), setting, data);
			menuTree.expandAll(false); // 若为true，加载页面地区信息默认为展开方式
		}

	});

}