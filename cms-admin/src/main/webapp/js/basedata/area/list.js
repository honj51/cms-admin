/**ztree的参数配置，setting主要是设置一些tree的属性，是本地数据源，还是远程，动画效果，是否含有复选框等等**/
var setting = {

	view: { 
		expandSpeed: 300 //设置树展开的动画速度，IE6下面没效果，  
	},
	data: {
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "parent_id",
			rootPId: 0
		}
	},
	callback: {
		/**回调函数的设置，随便写了两个**/
		beforeClick: beforeClick,
		onCheck: onCheck
	}
};
var zTree;
function beforeClick(treeId, treeNode) {
	$("#jqGrid").jqGrid('setGridParam', {
		url: rootPath + '/basedata/area/findByTree.shtml?treeId=' + treeNode.id
	}).trigger('reloadGrid');
	onclicktree(treeNode.id);
}
function onCheck(e, treeId, treeNode) {

}

$(document).ready(function() { //初始化ztree对象     
	refresh();
	$("#add").click(function() {
		addAreas();
	});
	
	$("#edit").click(function() {
		editAreas();
	});
	
	$("#del").click(function() {
		delAreas();
	});
});
//
function onclicktree(treeId) {
	$("#jqGrid").jqGrid({
		url: rootPath + '/basedata/area/findByTree.shtml?treeId=' + treeId + "&date=" + (new Date()).getTime(),
		mtype: "GET",
		multiselect: true,


		styleUI: 'Bootstrap',
		datatype: "json",
		colModel: [ { label: '序号', name: "rowNumber",
			index : 'rowNumber',
			width: 50,
			sortable: false,
			resizable: false,
			hidedlg: true,
			search: false, 
			align: "center",
			fixed: true,
			formatter: function () {
	              var p = $(this).jqGrid("getGridParam");
	                  rn = p.curRowNum +
	                      (parseInt(p.page, 10) - 1)*parseInt(p.rowNum, 10);
	              p.curRowNum++;
	              return rn.toString();
	          } },{
			label: '地区名称',
			name: 'name',
			index: 'areaname'
		},
		{
			label: '地区编码',
			name: 'code',
			index: 'areacode'
		},
		{
			label: 'parent_id',
			name: 'parent_id',
			index: 'parent_id',
			hidden: 'true'
		}],
		viewrecords: true,
		width: 700,
		shrinkToFit: true,
		sortname: 'code',
		
		height: 210,
		rowNum: 10,
		 curRowNum: 1,
		  loadComplete: function () {
	            var p = $(this).jqGrid("getGridParam");
	            p.curRowNum = 1;
	        },
		pager: "#jqGridPager"
	});

	$("#search").click("click",
	function() { // 绑定查询按扭
		var searchParams = $("#searchForm").serializeJson(); // 初始化传参数
		$("#jqGrid").jqGrid('setGridParam', {
			postData: searchParams,
			page : 1
		}).trigger("reloadGrid");
	});
};

function addAreas() {
	var ids = $("#jqGrid").jqGrid('getDataIDs');
	var parentId = $("#jqGrid").jqGrid('getCell', ids[0], 'parent_id');
	var name =  $("#jqGrid").jqGrid('getCell', ids[0], 'name');
	parent.layer.open({
		title: "新增",
		type: 2,
		area: ["60%", "40%"],
		content: rootPath + '/basedata/area/addUI.shtml?parent_id=' + parentId + "&id=" + ids+"&name="+name,
	});
}

function delAreas() {
	delArea();
}

function editAreas() {

	var selRowId = $("#jqGrid").jqGrid('getDataIDs');
	var beforeName = $("#jqGrid").jqGrid('getCell',selRowId, 'name');
	if (selRowId == null || selRowId == "") {
		return;
	}
	var celValue = $("#jqGrid").jqGrid('getCell', selRowId, 'areacode');
	parent.layer.open({
		title: "修改",
		type: 2,
		area: ["60%", "40%"],
		content: rootPath + '/basedata/area/editUI.shtml?id=' + selRowId+'&beforeName='+beforeName,
		end:function(){
		$("#jqGrid").jqGrid('setGridParam', {
			url: rootPath + '/basedata/area/findByTree.shtml?treeId=' + selRowId
			}).trigger('reloadGrid');
		}
	});
}
function refresh(){
	$.ajax({
		async: false,
		cache: false,
		type: 'get',
		dataType: "json",
		url: rootPath + "/basedata/area/ztreeGetPar.shtml",
		//请求的action路径
		error: function() { //请求失败处理函数
			parent.layer.msg('请求失败！', {icon : 2,time:1000});
		},
		success: function(data) { //请求成功后处理函数。
			var zTreeDemo = $.fn.zTree.init($("#cityTree"), setting, data);
		}
	});
	}
function delArea() {
	var selRowId = $("#jqGrid").jqGrid('getDataIDs');
if(selRowId==null||selRowId==""){
		return;
	}else{		         
	    	parent.layer.confirm('是否删除？', function(index) {
	    		var url = rootPath + '/basedata/area/deleteEntity.shtml?id='+ selRowId;
	    		var s = CommnUtil.ajax(url, {
	    			
	    		}, "json");
	    		if (s == "success") {
	    			parent.layer.msg('删除成功！', {icon : 1,time:1000});
	    			removeTree(selRowId);
	    			
	    			$("#jqGrid").jqGrid("clearGridData");
	    			
	    			parent.layer.closeAll();
	    			
	    		} else {
	    			parent.layer.msg('删除失败！', {icon : 2,time:1000});
	    		}
	    	});
}
}
function refreshGrid(){
	$("#jqGrid").jqGrid("clearGridData");	
}
function updateZtreeNode(nodeNameBefore,nodeNameAfter){
	var treeObj = $.fn.zTree.getZTreeObj("cityTree");
	var nodes = treeObj.getNodeByParam('name',nodeNameBefore);
	nodes.name=nodeNameAfter;
	treeObj.updateNode(nodes);
}
function removeTree(id){
	var treeObj = $.fn.zTree.getZTreeObj("cityTree");
	var nodes = treeObj.getNodeByParam('id',id);
	treeObj.hideNode(nodes);
}
function addTree(parentName,name,code,id){
	var treeObj = $.fn.zTree.getZTreeObj("cityTree");
	var newNode = {name:name,code:code,id:id};
	var nodes = treeObj.getNodeByParam('name',parentName);
	if(parentName==null){
	newNode = treeObj.addNodes(null, newNode);
	}else{
	newNode = treeObj.addNodes(nodes, newNode);
	}
}