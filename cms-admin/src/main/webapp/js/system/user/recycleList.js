var pageii = null;
var grid = null;
var tableHeight = function() {
	return window.document.body.clientHeight - 260;
};
var tableWidth = function() {
	return window.document.body.clientWidth - 10;
};
$(window).resize(function() {
	$(window).unbind("onresize");
	grid.setGridHeight(tableHeight());
	grid.setGridWidth(tableWidth());
	$(window).bind("onresize", this);
});
$(function() {
	//-----------------------初始化grid---------------------------/
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/user/findRecycle.shtml',
		mtype: "POST",
		postData: {
			isLocked : $("#isLocked option:selected").val()
			
		},
		styleUI: 'Bootstrap',
		datatype: "json",
		colModel: [{
			label: '主键',
			name: 'id',
			index: 'id',
			key: true,
			hidden: true
		},
		{
			label: '序号',
			name: "rowNumber",
			index: 'rowNumber',
			width: 50,
			sortable: false,
			resizable: false,
			hidedlg: true,
			search: false,
			align: "center",
			fixed: true,
			formatter: function() {
				var p = $(this).jqGrid("getGridParam");
				rn = p.curRowNum + (parseInt(p.page, 10) - 1) * parseInt(p.rowNum, 10);
				p.curRowNum++;
				return rn.toString();
			}
		},
		{
			label: '姓名',
			name: 'userName',
			index: 'userName'
		},
		{
			label: '用户名',
			name: 'accountName',
			index: 'accountName'
		},
		{
			label: '电话',
			name: 'phone',
			index: 'phone'
		},
		{
			label: '所属部门',
			name: 'deptName',
			index: 'deptName'
		},
		{
			label: '所属公司',
			name: 'org_name',
			index: 'org_name'
		},
		{
			label: '是否停用',
			name: 'is_locked',
			index: 'is_locked',
			formatter: function(cellvalue, options, rowObject) {
				if (cellvalue == '1') {
					return '是';
				}else if(cellvalue == '0'){
					return '否';
				}
				return '';
			}
		},
		{
			label: '备注',
			name: 'remarks',
			index: 'remarks'
		},
		{
			label: '创建人',
			name: 'create_user_name',
			index: 'create_user_name'
		},
		{
			label: '创建时间',
			name: 'create_time',
			index: 'create_time',
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '更新人',
			name: 'update_user_name',
			index: 'update_user_name'
		},
		{
			label: '更新时间',
			name: 'update_time',
			index: 'update_time',
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
			}
		}
		],
		altRows: true,
		altclass: 'altRowsClass',
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: true,
		height: tableHeight(),
		width: tableWidth(),
		sortname: 'create_time',
		sortorder: "desc",
		rowNum: 20,
		curRowNum: 1,
		pager: "#jqGridPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		}
	});
	//-----------------------初始化grid end---------------------------/

	//-----------------给按钮绑定事件---------------
	
	$("#search").click("click", function() { // 绑定查询按扭
		var queryParam = $("#queryParam").val().trim();
		var isLocked = $("#isLocked option:selected").val();
		grid.jqGrid('setGridParam', {
			postData: {
				queryParam: queryParam,
				isLocked : isLocked
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#refreshbutton").click("click", function() {
		document.getElementById("searchForm").reset()
		$('.selectpicker').selectpicker('refresh');
		grid.jqGrid('setGridParam', {
			postData: {
				queryParam: "",
				isLocked:""
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#recovery").click("click", function() {
		recovery();
	});
});

function recovery() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	var accountNames = [];
	for(i=0;i<rowIds.length;i++){
		var rowData = $('#jqGrid').jqGrid('getRowData', rowIds[i]);
		var accountName = rowData.accountName;
			accountNames.push(accountName)
	}
	
	parent.layer.confirm('确定要还原吗？', function(index) {
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/user/recovery.shtml',
			    data: {
			        ids: rowIds.toString(),
			        accountNames : accountNames.toString()
			    },
			    dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(response) {
			    	top.ajaxLoadEnd();
			    	if(response == "success"){
				    	parent.layer.msg('还原成功！', {icon : 1, time: 1000});
			    	}else if(response == "duplicate_user"){
			    		parent.layer.msg('还原失败,该用户已存在！', {icon : 2, time: 1000});
			    	}else{
			    		parent.layer.msg('还原失败！', {icon : 2, time: 1000});
			    	}
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					
					$("#jqGrid").trigger("reloadGrid");
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
	            error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('还原失败！', {icon : 2, time: 1000});
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					
					$("#jqGrid").trigger("reloadGrid");
			    }
			});
	});

};
