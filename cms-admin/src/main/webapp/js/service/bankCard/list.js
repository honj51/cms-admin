var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 260);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});


$(function() {
	$(".selectpicker").selectpicker({
		size : 7
	});
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/service/bankCard/findByPage.shtml',
		mtype: "get",
		postData: {
			status : status,
		},
		styleUI: 'Bootstrap',
		datatype: "json",
		curRowNum: 1,
		colModel: [{
			label: '序号',
			name: "rowNumber",
			index: 'rowNumber',
			width: 50,
			sortable: false,
			resizable: false,
			hidedlg:false,
			search: false,
			align: "center",
			fixed: true,
			formatter: function() {
				var p = $(this).jqGrid("getGridParam"),
				rn = p.curRowNum + (parseInt(p.page, 10) - 1) * parseInt(p.rowNum, 10);
				p.curRowNum++;
				return rn.toString();
			}
		},{
			label : '司机电话',
			name : 'driver_phone',
			index : 'driver_phone',
			sortable : false,
			editable : false
		},{
			label : '司机姓名',
			name : 'driver_name',
			index : 'driver_name',
			sortable : false,
			editable : false
			
		},{
			label : '状态',
			name : 'status',
			index : 'status',
			sortable : false,
			editable : false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '待审核';
				} else if (value == '2') {
					return '已驳回';
				} else if (value == '3') {
					return '已批准';
				} else {
					return '未定义';
				}
			}
		},{
			label : '创建时间',
			name : 'create_time',
			index : 'create_time',
			sortable : false,
			editable : false,
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
			}
		},{
			label : '更新时间',
			name : 'update_time',
			index : 'update_time',
			sortable : false,
			editable : false,
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
			}
		},{
			label : '原因',
			name : 'reject_cause',
			index : 'reject_cause',
			sortable : false,
			editable : false
			
		},{
			label : '驳回时间',
			name : 'reject_time',
			index : 'reject_time',
			sortable : false,
			editable : false,
			formatter: function(cellValue, options, rowObject) {
				if(cellValue=="" || cellValue==null || "undefined"==typeof(cellValue)){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},{
			label : '通过时间',
			name : 'pass_time',
			index : 'pass_time',
			sortable : false,
			editable : false,
			formatter: function(cellValue, options, rowObject) {
				if(cellValue=="" || cellValue==null || "undefined"==typeof(cellValue)){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		}],
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: true,
		sortname : 'update_time', 
		sortorder: "desc",
		height: (window.document.body.clientHeight - 260),
		width: (window.document.body.clientWidth - 10),
		rowNum: 20,
		pager: "#jqGridPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		}
	});

	$("#refresh").click("click", function() {
		document.getElementById("searchForm").reset();
		$('.selectpicker').selectpicker('refresh');
		grid.jqGrid('setGridParam', {
			postData: {
				quaryParam : "",
	        	  status : ""
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#search").click("click", function() {
		var phone = $("#phone").val();
		var name = $("#name").val();
		var status = $("#status option:selected").val();
		grid.jqGrid('setGridParam', {
	           postData: {
	        	   quaryParam : quaryParam,
	        	   status : status
			},
			page : 1
		}).trigger("reloadGrid");	
	});
	
$("#reject").click("click",function(){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	var rowData = $('#jqGrid').jqGrid('getRowData', rowIds[0]);
	var status = rowData.status;
	if(status == '已驳回'){
		parent.layer.msg('不可重复操作！', {icon : 0, time: 1000});
		return;
	}
	if(status == '已批准'){
		parent.layer.msg('不可操作！', {icon : 0, time: 1000});
		return;
	}
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	if (rowIds.length > 1) {
		parent.layer.msg('只能选择一条数据进行修改！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	parent.layer.open({
		title : "修改回复",
		type : 2,
		area : [ "58%", "50%" ],
		content : rootPath + '/service/bankCard/rejectUI.shtml?id=' + rowIds[0],
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
	
	
});
	
	$("#pass").click("click",function(){
		var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
		var rowData = $('#jqGrid').jqGrid('getRowData', rowIds[0]);
		var status = rowData.status;
		if(status == '已驳回'){
			parent.layer.msg('不可操作！', {icon : 0, time: 1000});
			return;
		}
		if(status == '已批准'){
			parent.layer.msg('不可重复操作！', {icon : 0, time: 1000});
			return;
		}
		if (rowIds.length == 0) {
			parent.layer.msg('请选择数据！', {
				icon: 20,
				time: 1000
			});
			return;
		}
		if (rowIds.length > 1) {
			parent.layer.msg('只能选择一条数据进行操作！', {
				icon: 20,
				time: 1000
			});
			return;
		}
		
		 $.ajax({
			    type: "post",
			    url: rootPath + '/service/bankCard/pass.shtml',
			    data: {
			        id: rowIds[0]
			    },
			    dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(response) {
			    	top.ajaxLoadEnd();
			    	if(response == "success"){
				    	parent.layer.msg('审核通过！', {icon : 1, time: 1000});
			    	}else{
			    		parent.layer.msg('审核失败！', {icon : 2, time: 1000});
			    	}
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					
					$("#jqGrid").trigger("reloadGrid");
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
	         error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('审核失败！', {icon : 2, time: 1000});
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					
					$("#jqGrid").trigger("reloadGrid");
			    }
			});
	});
		
	$("#preview").click("click",function(){
		var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
		if (rowIds.length == 0) {
			parent.layer.msg('请选择数据！', {
				icon: 20,
				time: 1000
			});
			return;
		}
		if (rowIds.length > 1) {
			parent.layer.msg('只能选择一条数据进行预览！', {
				icon: 20,
				time: 1000
			});
			return;
		}
		parent.layer.open({
			title : "证件预览",
			type : 2,
			area : [ "70%", "80%" ],
			content : rootPath + '/service/bankCard/previewUI.shtml?id=' + rowIds[0],
			maxmin: true,
			end : function(){
				$("#jqGrid").trigger('reloadGrid');
		    }
		});
		
	});
	
	$("#delete").click("click",function(){
		deleteBankCard(); 
	});
	$("#export").click("click",function(){
		exportExcel();
	});

});


function exportExcel() {

	var quaryParam = $("#quaryParam").val();
	var status = $("#status option:selected").val();

	window.location.href = rootPath + '/service/bankCard/exportExcel.shtml?quaryParam='+quaryParam+'&status='+status;
}
function deleteBankCard() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	parent.layer.confirm('确定要删除信息吗？', function(index) {
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/service/bankCard/deleteEntity.shtml',
			    data: {
			        ids: rowIds.toString()
			    },
			    dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(response) {
			    	top.ajaxLoadEnd();
			    	if(response == "success"){
				    	parent.layer.msg('删除成功！', {icon : 1, time: 1000});
			    	}else{
			    		parent.layer.msg('删除失败！', {icon : 2, time: 1000});
			    	}
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					
					$("#jqGrid").trigger("reloadGrid");
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
	            error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('删除失败！', {icon : 2, time: 1000});
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					
					$("#jqGrid").trigger("reloadGrid");
			    }
			});
	});

};
