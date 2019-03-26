var pageii = null;
var tableHeight = function() {
	return window.document.body.clientHeight  - 280;
};
var tableWidth = function() {
	return window.document.body.clientWidth-20;
};
$(window).resize(function(){ 
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(tableHeight()); 
	$("#jqGrid").setGridWidth(tableWidth()); 
	$(window).bind("onresize", this); 
});
$(function() {
	// -----------------------初始化grid---------------------------/
	 $("#jqGrid").jqGrid({
		url : rootPath + '/basedata/qualtype/findByPage.shtml',
		mtype : "GET",
		multiselect: true,
			
		styleUI : 'Bootstrap',
		datatype : "json",
		colModel : [     { label: '序号', name: "rowNumber",
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
	        	  label : '类型编码',
	  			name : 'code',
	  			index : 'code'
			
		}, {
			label : '类型名称',
			name : 'name',
			index : 'name'
		}, {
			label : '操作人',
		name : 'update_user',
		index : 'update_user'
		}, {
			label : '操作时间',
		name : 'update_time',
		index : 'update_time'
		} ],
		viewrecords : true,
		autowidth: false, 
		shrinkToFit: true,
		height : tableHeight(),
		width : tableWidth(),
		sortname : 'code',
	    sortorder: "ASC",
		rowNum : 10,
		 curRowNum: 1,
		 onSelectRow: function(id){
				var rows =  $("#jqGrid").jqGrid('getGridParam','selarrrow');
				if(rows.length>1){
					$("#edit").attr("disabled",true);
				}else{
					$("#edit").attr("disabled",false);
				}
			 
		 },
		  loadComplete: function () {
	            var p = $(this).jqGrid("getGridParam");
	            p.curRowNum = 1;
	        },
		pager : "#jqGridPager"
	});
	// -----------------------初始化grid end---------------------------/

	// -----------------给按钮绑定事件---------------
	selRowId = $("#jqGrid").jqGrid("getGridParam",'selrow');
	celValue=$("#jqGrid").jqGrid('getCell',selRowId,'columnName');

	$("#search").click("click", function() {// 绑定查询按扭	
		
		var searchParams = $("#searchForm").serializeJson();
		$("#jqGrid").jqGrid('setGridParam', {
			postData : searchParams,
			page : 1
		}).trigger("reloadGrid");
		
	});
	
	
	$("#refreshbutton").click("click", function() {
		document.getElementById("searchForm").reset(); 
		 $("#jqGrid").jqGrid('setGridParam', {
			postData : $("#searchForm").serializeObject(),
			page : 1
		}).trigger("reloadGrid");
	});
	// -----------------给按钮绑定事件end---------------
});



//循环取表单数据,返回json
$.fn.serializeObject = function() {
	var o = {};
	var a  = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	
	return eval('('+ (JSON.stringify(o)).replace(/}{/, ',') + ')');
};

function addMeas() {
	pageii = parent.layer.open({
		title : "新增",
		type : 2,
		area : [ "60%", "40%" ],
		content : rootPath + '/basedata/qualtype/addUI.shtml',
		end:function(){ 
			$("#jqGrid").trigger("reloadGrid")
		}
	});
}

function editMeas(){

	var selRowId = $("#jqGrid").jqGrid("getGridParam",'selrow');
	 var rowIds = $("#jqGrid").jqGrid('getGridParam','selarrrow');
	 if(rowIds.length>1){
		 return;
	 }
	if(selRowId==null||selRowId==""){
		 return;
	}else{
	var celValue=$("#jqGrid").jqGrid('getCell',selRowId,'code');
	pageii = parent.layer.open({
		title : "修改",
		type : 2,
		area : [ "60%", "40%" ],
		content : rootPath + '/basedata/qualtype/editUI.shtml?number='+celValue,
		end:function(){ 
			$("#jqGrid").trigger("reloadGrid")
		}
	});
}
}

$("#add").click(function(){
	
	addMeas();
})
$("#edit").click(function(){
	
	editMeas();
})
$("#del").click(function(){
	
	delMeas();
})
function delMeas() {
	// 获取选中行index
	var myGrid = $("#jqGrid");
	var selRowId = myGrid.jqGrid("getGridParam",'selrow');
	var celValue=myGrid.jqGrid('getCell',selRowId,'code');
if(selRowId==null||selRowId==""){
		
	}else{
	        var rowIds = jQuery("#jqGrid").jqGrid('getGridParam', 'selarrrow');        
	parent.layer.confirm('是否删除？', function(index) {
		var url = rootPath + '/basedata/qualtype/deleteEntity.shtml?ids='+rowIds;
		var s = CommnUtil.ajax(url, {
			ids : rowIds
		}, "json");
		if (s == "success") {
			parent.layer.msg('删除成功！', {icon : 1,time:1000});
			$("#edit").attr("disabled",false);
			$("#jqGrid").trigger("reloadGrid");
		
		
		} else {
			parent.layer.msg('删除失败！', {icon : 2,time:1000});
		}
	});
}
}
