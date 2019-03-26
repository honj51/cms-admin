var pageii = null;

$(window).resize(function(){ 
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 220); 
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 20); 
	$(window).bind("onresize", this); 
});


$(function() {
	//status为状态，当status=1时，当status=2时，未发布状态
	//type为栏目类型，当type=1时，政策法规。当type=2,行业咨询。当type=3,软件下载
	// -----------------------初始化grid---------------------------/
	var tableHeight = function() {
		return $(window).height() - 220;
	};
	 $("#jqGrid").jqGrid({
		url : rootPath + '/systemManage/publish/findByPage.shtml',
		mtype : "GET",
		postData:{ type : $("#publishType").val(), status: $("#publishStatus").val()},
		multiselect: true,
		styleUI : 'Bootstrap',
		datatype : "json",
		colModel : [     { label: '序号', name: "index",
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
	          } },
	          {
			label : '标题',
			name : 'title',
			index : 'title'
		}, {
			label : '栏目类型',
			name : 'type',
			index : 'type',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue=="1"){
					return "政策法规"
				}else if(cellvalue=="2"){
					return "行业资讯"
				}else if(cellvalue=="3"){
					return "资料下载"
				}else if(cellvalue=="4"){
					return "医院动态"
				}else if(cellvalue=="7"){
					return "最新公告"
				}else{
					return "--"
				}
        		}
		}, {
			label : '创建人',
			name : 'create_person',
			index : 'create_person'
		}, {
			label : '创建时间',
			name : 'create_time',
			index : 'create_time',
			formatter:function(cellvalue, options, rowObject){
				
        		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss")
        		}
		}, {
			label : '发布人',
			name : 'publish_person',
			index : 'publish_person'
		}, {
			label : '发布时间',
			name : 'publish_time',
			index : 'publish_time',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue==null||cellvalue==""){
					return "无"
				}
        		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss")}
		} , {
			label : '状态',
			name : 'status',
			index : 'status',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue=="1"){
					return "已发布";
				}if(cellvalue=="2"){
					return "未发布";
				}
        		return "--";
        		}
				
		} , {
			label : '是否首页显示',
			name : 'is_show_home_page',
			index : 'is_show_home_page',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue=="n"){
					return "否"
				}
        		return "是"
        		}
		}  ],
		viewrecords: true,
		autowidth: false,
		shrinkToFit : true,
		sortname : 'create_time',
		height: (window.document.body.clientHeight-220),
	    width : (window.document.body.clientWidth-20),
		onSelectRow: function(id){
		
			var rows =  $("#jqGrid").jqGrid('getGridParam','selarrrow');
			var isPublish = true;
			var isStatus = true;
			if(rows.length>=1){
				$("#del").attr("disabled",false);
				 
				if(rows.length>1){
				$("#edit").attr("disabled","disabled");
				}else{
					$("#edit").removeAttr("disabled");
				}
				for(var i=0;i<rows.length;i++){
					var status =  $("#jqGrid").jqGrid('getCell',rows[i],"status");
					if(status!="已发布"){
						isPublish = false;
					}
					if(status=="已发布"){
						isStatus = false;
					}
				}
				if(isStatus==false){
					$("#publish").attr("disabled","disabled");
				}else{
					$("#publish").removeAttr("disabled");
				}
				if(isPublish==false){
				$("#cancel").attr("disabled","disabled");
				
				return;
				}else{
					
					$("#cancel").removeAttr("disabled");
					return;
				}
				}else{
					$("#edit").attr("disabled","disabled");
		            $("#del").attr("disabled","disabled");
		            $("#publish").attr("disabled","disabled");
		            $("#cancel").attr("disabled","disabled");
				}
			
			},
		rowNum :20,
		 curRowNum: 1,
		  loadComplete: function () {
	            var p = $(this).jqGrid("getGridParam");
	            p.curRowNum = 1;
	            
	            $("#edit").attr("disabled","disabled");
	            $("#del").attr("disabled","disabled");
	            $("#publish").attr("disabled","disabled");
	            $("#cancel").attr("disabled","disabled");
	        },
		pager : "#jqGridPager"
	});

});

function addPublishInfo() {
	pageii = parent.layer.open({
		title : "新增",
		type : 2,
		area : [ "80%", "80%" ],
		content : rootPath + '/systemManage/publish/addUI.shtml',
		end:function(){ 
			$("#jqGrid").trigger("reloadGrid")
		}
	});
}

function editPublishInfo(){
	var selRowId = $("#jqGrid").jqGrid("getGridParam",'selrow');
	 var rowIds = $("#jqGrid").jqGrid('getGridParam','selarrrow');
	 if(rowIds.length>1){
		 return;
	 }
	if(selRowId==null||selRowId==""){
		 return;
	}
	pageii = parent.layer.open({
		title : "编辑",
		type : 2,
		area : [ "80%", "80%" ],
		content : rootPath + '/systemManage/publish/editUI.shtml?id='+selRowId,
		end:function(){ 
			$("#jqGrid").trigger("reloadGrid")
		}
	});
}

$("#add").click(function(){
	
	addPublishInfo();
})
$("#cancel").click(function(){
	cancelPublishInfo();
})
$("#edit").click(function(){
	
	editPublishInfo();
})
$("#del").click(function(){
	
	delPublishInfo();
})
$("#publish").click(function(){
	publishInfo();
})
$("#refresh").click(function(){
	refreshPublishInfo();
})
$("#isShowPage").click(function(){
	
	isShowPage();
})
function delPublishInfo() {
	// 获取选中行index
	var myGrid = $("#jqGrid");
	var selRowId = myGrid.jqGrid("getGridParam",'selrow');
if(selRowId==null||selRowId==""){
		
	}else{
	        var rowIds = jQuery("#jqGrid").jqGrid('getGridParam', 'selarrrow');        
	parent.layer.confirm('是否删除？', function(index) {
		var url = rootPath + '/systemManage/publish/deleteEntity.shtml?ids='+rowIds;
		var s = CommnUtil.ajax(url, {
			ids : rowIds
		}, "json");
		if (s == "success") {
			parent.layer.msg('删除成功！', {icon : 1,time:1000});
		
		
			$("#jqGrid").trigger("reloadGrid");
			
		} else {
			parent.layer.msg('删除失败！', {icon : 2,time:1000});
			 
		}
	});
}
}
function cancelPublishInfo(){
	// 获取选中行index
	var myGrid = $("#jqGrid");
	var selRowId = myGrid.jqGrid("getGridParam",'selrow');
if(selRowId==null||selRowId==""){
		
	}else{
	        var rowIds = $("#jqGrid").jqGrid('getGridParam', 'selarrrow'); 
	        
	parent.layer.confirm('是否撤销'+rowIds.length+'条记录？', function(index) {
		var url = rootPath + '/systemManage/publish/cancel.shtml?ids='+rowIds;
		var s = CommnUtil.ajax(url, {
			ids : rowIds
		}, "json");
		if (s == "success") {
			parent.layer.msg('撤销成功！', {icon : 1,time:1000});
			
			$("#jqGrid").trigger("reloadGrid");
			
		} else {
			parent.layer.msg('撤销失败！', {icon : 2,time:1000});
		}
	});
}
}
function publishInfo(){
	// 获取选中行index
	var myGrid = $("#jqGrid");
	var selRowId = myGrid.jqGrid("getGridParam",'selrow');
if(selRowId==null||selRowId==""){
		
	}else{
	        var rowIds = $("#jqGrid").jqGrid('getGridParam', 'selarrrow'); 	        
	parent.layer.confirm('是否发布'+rowIds.length+'条记录？', function(index) {
		var url = rootPath + '/systemManage/publish/publishInfo.shtml?ids='+rowIds;
		var s = CommnUtil.ajax(url, {
			ids : rowIds,
			accountName:accountName
		}, "json");
		if (s == "success") {
			parent.layer.msg('发布成功！', {icon : 1,time:1000});
			
			$("#jqGrid").trigger("reloadGrid");
		
		} else {
			parent.layer.msg('发布失败！', {icon : 2,time:1000});
		}
	});
}
}
function refreshPublishInfo(){
	
	$("#publishType").val('0');
	$('#publishType').selectpicker('refresh');
	$("#publishStatus").val('0');
	$('#publishStatus').selectpicker('refresh');
	$("#jqGrid").jqGrid('setGridParam', {
		postData:{ 
			type : $("#publishType").val(),
			status: $("#publishStatus").val()
		},
		page : 1
	}).trigger("reloadGrid");
}
function isShowPage(){
		pageii = parent.layer.open({
			title : "首页发布",
			type : 2,
			area : [ "80%", "80%" ],
			content : rootPath + '/systemManage/publish/isShowPage.shtml',
			end:function(){ 
				$("#jqGrid").trigger("reloadGrid");
			}
		});
}
$("#publishType").change(function(){
	$("#jqGrid").jqGrid('setGridParam', {
		postData:{ type : $("#publishType").val(), status: $("#publishStatus").val()}
	}).trigger("reloadGrid");
})
$("#publishStatus").change(function(){
	$("#jqGrid").jqGrid('setGridParam', {
		postData:{ type : $("#publishType").val(), status: $("#publishStatus").val()}
	}).trigger("reloadGrid");
})