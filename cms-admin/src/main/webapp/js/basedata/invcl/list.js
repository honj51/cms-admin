var pageii = null;
var flag = false;
//
/**ztree的参数配置，setting主要是设置一些tree的属性，是本地数据源，还是远程，动画效果，是否含有复选框等等**/    
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
  beforeClick: beforeClick,                                    
  onCheck: onCheck ,

 }  
}; 
var zTree;
	var treeNodes;
	$(function(){
		refresh();

   	});
	var node_id="";
function beforeClick(treeId, treeNode) {  
 $("#jqGrid").jqGrid('setGridParam', 
		 { url: rootPath + '/basedata/invcl/findByTree.shtml?treeId='+treeNode.id }).trigger('reloadGrid');
 		node_id = treeNode.id;
 		onclicktree(treeNode.id);
}  
function onCheck(e, treeId, treeNode) {  
 
}       

$(document).ready(function(){//初始化ztree对象     

 
	$("#add").click(function(){
		
		addInvcl();
	})
	$("#edit").click(function(){

		editInvcl();
	})
	$("#del").click(function(){
		
		delInvcl();
	});
	
	

	$("#refreshbutton").click("click", function() {
		document.getElementById("searchForm").reset(); 

		refresh();
		$("#jqGrid").jqGrid("clearGridData");
	});
	
	
	$("#search").click(function(){
		var invname = $("#invname").val();
		if(invname==null||invname==""){
		return;
		}else{
		
		if(flag==true){
			
		$("#jqGrid").jqGrid('setGridParam', 
				 { url: rootPath + '/basedata/invcl/searchInv.shtml?invname='+invname }).trigger('reloadGrid');
		}else{
		
			flag=true;
		 $("#jqGrid").jqGrid({
				url : rootPath + '/basedata/invcl/searchInv.shtml?invname='+invname+"&date="+(new Date()).getTime(),
				mtype : "GET",
				multiselect: true,
				styleUI : 'Bootstrap',
				datatype : "json",
				colModel : [  { label: '序号', name: "rowNumber",
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
					label : '分类名称',
					name : 'name',
					index : 'name',
			
				},{
					label : '上级分类',
					name : 'parent_name',
					index : 'parent_name',
				
				},{
					label : '编码',
					name : 'code',
					index : 'code'
				},{
					label : '创建时间',
					name : 'create_time',
					formatter:function(cellvalue, options, rowObject){
		        		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss")},
					index : 'create_time'
				}],
				viewrecords : true,
				width:700,
				shrinkToFit : true,
				sortname : 'code',
				height : 200,
				rowNum : 10,
				 curRowNum: 1,
				  loadComplete: function () {
			            var p = $(this).jqGrid("getGridParam");
			            p.curRowNum = 1;
			        },
				pager : "#jqGridPager"
			});
		}
		}
	})
}); 

//
function onclicktree(treeId) {
	// -----------------------初始化grid---------------------------/
	flag = true;
	$("#jqGrid").jqGrid({
		url : rootPath + '/basedata/invcl/findByTree.shtml?treeId='+treeId+"&date="+(new Date()).getTime(),
		mtype : "GET",
		multiselect: true,
	
		styleUI : 'Bootstrap',
		datatype : "json",
		colModel : [  { label: '序号', name: "rowNumber",
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
			label : '分类名称',
			name : 'name',
			index : 'name'
		},{
			label : '上级分类',
			name : 'parent_name',
			index : 'parent_name',
			
		},{
			label : '分类编码',
			name : 'code',
			index : 'code'
		},{
			label : '类别',
			name : 'level',
			index : 'level',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue=="1"){
					return "Ⅰ级"
				}else if(cellvalue=="2"){
					return "Ⅱ级"
				}else if(cellvalue=="3"){
					return "Ⅲ级"
				}else if(cellvalue=="0"){
					return "无"
				}
        		}
		},{
			label : '创建时间',
			name : 'create_time',
			formatter:function(cellvalue, options, rowObject){
        		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss")
        		},
			index : 'create_time'
		},{
			label:'parent_id',
			name:'parent_id',
			index:'parent_id',
			hidden:'true'
		}],
		viewrecords : true,
		width:700,
		shrinkToFit : true,
		sortname : 'code',
		height : 200,
		rowNum : 10,
		 curRowNum: 1,
		  loadComplete: function () {
	            var p = $(this).jqGrid("getGridParam");
	            p.curRowNum = 1;
	        },
		pager : "#jqGridPager"
	});
};
function delInvcls() {
	var selRowId =$("#jqGrid").jqGrid('getDataIDs');
	var name = $("#jqGrid").jqGrid('getCell',selRowId,'name');
if(selRowId==null||selRowId==""){
		
	}else{		          
	parent.layer.confirm('是否删除？', function(index) {
		var url = rootPath + '/basedata/invcl/deleteEntity.shtml?id='+selRowId;
		var s = CommnUtil.ajax(url, {
			
		}, "json");
		if (s == "success") {
			parent.layer.msg('删除成功！', {icon : 1,time:1000});
			
			$("#jqGrid").jqGrid("clearGridData");
			removeTree(selRowId);
			parent.layer.closeAll();
		} else {
			parent.layer.msg('删除失败！', {icon : 2,time:1000});
		}
	});
}
}

 function addInvcl() {
		
		var ids = $("#jqGrid").jqGrid('getDataIDs');
		var parentId = $("#jqGrid").jqGrid('getCell',ids[0],'parent_id');

		pageii = parent.openLayer({
			title : "新增",
			type : 2,
			area : [ "60%", "60%" ],
			content : rootPath + '/basedata/invcl/addUI.shtml?id='+ids+"&parent_id="+parentId
		});
		
	}
	function delInvcl(){
		delInvcls();
	}
	function editInvcl(){
		var selRowId =$("#jqGrid").jqGrid('getDataIDs');
		
		if(selRowId==null||selRowId==""){
		return;
		}else{
		
		var celValue=$("#jqGrid").jqGrid('getCell',selRowId,'areacode');
		var beforeName = $("#jqGrid").jqGrid('getCell',selRowId,'name');
		pageii = parent.openLayer({
			title : "修改",
			type : 2,
			area :  [ "60%", "60%" ],
			content : rootPath + '/basedata/invcl/editUI.shtml?id='+selRowId,
			end:function(){
				$("#jqGrid").jqGrid('setGridParam', {
					url: rootPath + '/basedata/invcl/findByTree.shtml?treeId=' + selRowId
					}).trigger('reloadGrid');
			}
		});
	}
	}
	
function refresh(){
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
   			  var zTreeDemo = $.fn.zTree.init($("#cityTree"),setting, data);  
   			}
   		});
		}
			function updateZtreeNode(nodeNameBefore,nodeNameAfter,parentNode){
				
				if(parentNode==null||parentNode==undefined){
					var treeObj = $.fn.zTree.getZTreeObj("cityTree");
					var nodes = treeObj.getNodeByParam('name',nodeNameBefore);
				
					nodes.name=nodeNameAfter;
					treeObj.updateNode(nodes);
					treeObj.moveNode(null,nodes,"inner",true);
				
					return;
				}if(parentNode==1){
					var treeObj = $.fn.zTree.getZTreeObj("cityTree");
					var nodes = treeObj.getNodeByParam('name',nodeNameBefore);
				
					nodes.name=nodeNameAfter;
					treeObj.updateNode(nodes);
					return;
				}
				var treeObj = $.fn.zTree.getZTreeObj("cityTree");
		
				var nodes = treeObj.getNodeByParam('name',nodeNameBefore);
				nodes.name=nodeNameAfter;
				treeObj.updateNode(nodes);
			
				treeObj.moveNode(parentNode,nodes,"inner",true);
				
			}
			function removeTree(id){
				var treeObj = $.fn.zTree.getZTreeObj("cityTree");
				var nodes = treeObj.getNodeByParam('id',id);
				treeObj.removeNode(nodes);

			}
			function addTree(parentName,name,code,id){
				var treeObj = $.fn.zTree.getZTreeObj("cityTree");
				var nodes = treeObj.getNodeByParam('name',parentName);
				var newNode = {name:name,code:code,id:id};
				if(parentName==null||parentName==""){
					nodes = null;
				}
				newNode = treeObj.addNodes(nodes, newNode);
			}
	
