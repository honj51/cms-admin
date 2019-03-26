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
		url: rootPath + '/user/findByPage.shtml',
		mtype: "POST",
		postData: {
			isLocked : $("#isLocked").val()
			
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
			label: '所属公司',
			name: 'org_name',
			index: 'org_name'
		},
		{
			label: '所属部门',
			name: 'dept_name',
			index: 'dept_name'
		},
		{
			label: '所属角色',
			name: 'roleName',
			index: 'roleName'
		},
		{
			label: '是否管理员',
			name: 'is_admin',
			index: 'is_admin',
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
		shrinkToFit: false,
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
	
	$("#search").click("click",
			function() { // 绑定查询按扭
		var queryParam = $("#queryParam").val().trim();
		var isLocked = $("#isLocked").val();
		grid.jqGrid('setGridParam', {
			postData: {
				queryParam: queryParam,
				isLocked : isLocked
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#addAccount").click("click",
	function() {
		addAccount();
	});
	$("#editAccount").click("click",
	function() {
		editAccount();
	});
	$("#delAccount").click("click",
	function() {
		delAccount();
	});
	$("#permissions").click("click",
	function() {
		permissions();
	});
	$("#locked").click("click",function() {
		locked();
	});
	
	$("#cancelLocked").click("click",function() {
		cancelLocked();
	});
	$("#resetPassword").click("click",
	function() {
		generate();
	});
	$("#dataPermission").click("click",
	function() {
		data_permission();
	});
	//-----------------给按钮绑定事件end---------------
	$("#refreshbutton").click("click",
	function() {
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
	
});

function generate(){
	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if (ids.length == 0) {
		layer.msg('请选择数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	if (ids.length > 1) {
		parent.layer.msg('只能选择一条数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	var rowData = grid.jqGrid("getRowData",ids[0]);
	var phone = rowData.phone;
	var accountName = rowData.accountName;
	var url = rootPath + '/user/resetPassword.shtml';
	top.ajaxLoading();
	 $.ajax({
		    type: "post",
		    url: url,
		    dataType:"json",
		    data: {
		    	id : ids[0],
		    	phone : phone,
		    	accountName : accountName
		    },
		    beforeSend: function() {
		    },
		    success: function(data) {
		    	top.ajaxLoadEnd();
		    	if(data== "success"){
		    		top.ajaxLoadEnd();
		    		parent.layer.msg('发送成功！', {icon : 1, time: 1000});
		    	}else{
		    		parent.layer.msg('修改失败！', {icon : 2, time: 1000});
		    	}
		    	
		    },
		    complete: function(XMLHttpRequest, textStatus) {
		    },
           error: function() {
		    	top.ajaxLoadEnd();		    		
		    }
		});
	
}
function resetPassWordByUserId() {

	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if (ids.length == 0) {
		layer.msg('请选择数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	var idStrs = "";
	for (var i = 0; i < ids.length; i++) {
		idStrs = idStrs + ids[i] + ",";
	}
	idStrs = idStrs.substring(0, idStrs.length - 1);

	parent.layer.confirm('密码将重置为“' + defaultPassWord + '”?', {
		icon: 3,
		title: '注意'
	},
	function(index) {

		if (idStrs != null && idStrs != '') {
			var url = rootPath + '/user/resetPassWordByUserId.shtml';
			var s = CommnUtil.ajax(url, {
				ids: idStrs
			},
			"json");
			if (s == "success") {
				grid.trigger("reloadGrid");
				layer.msg('重置成功！', {
					icon: 1,
					time: 1000
				});
			} else {
				layer.msg('重置失败:' + s, {
					icon: 2,
					time: 1000
				});
			}
		} else {
			layer.msg('请选择数据！', {
				icon: 0,
				time: 1000
			});
		}

		parent.layer.close(index);
	});
}

function editAccount() {
	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if (ids.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	if (ids.length > 1) {
		parent.layer.msg('只能选择一条数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	pageii = parent.openLayer({
		title: "编辑用户",
		type: 2,
		area: ["60%", "70%"],
		content: rootPath + '/user/editUI.shtml?id=' + ids[0],
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function addAccount() {
	pageii = parent.openLayer({
		title: "新增用户",
		type: 2,
		area: ["60%", "70%"],
		content: rootPath + '/user/addUI.shtml',
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function delAccount() {
	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if (ids.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	parent.layer.confirm('是否删除？',
	function(index) {
		var url = rootPath + '/user/deleteEntity.shtml';
		var s = CommnUtil.ajax(url, {
			"ids": ids.toString()
		},
		"json");
		if (s == "success") {
			parent.layer.msg('删除成功！', {
				icon: 1,
				time: 1000
			});
			grid.trigger("reloadGrid");
		} else {
			parent.layer.msg('删除失败！', {
				icon: 2,
				time: 1000
			});
		}
	});
}
function permissions() {
	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if (ids.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	if (ids.length > 1) {
		parent.layer.msg('只能选择一条数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	var selIndex = grid.jqGrid('getGridParam', "selrow");
	var url = rootPath + '/resources/permissions.shtml?userId=' + ids[0];
	pageii = parent.openLayer({
		title: "分配功能权限",
		type: 2,
		area: ["70%", "85%"],
		content: url
	});
}
function data_permission() {
	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if (ids.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	if (ids.length > 1) {
		parent.layer.msg('只能选择一条数据！', {
			icon: 0,
			time: 1000
		});
		return;
	}
	var selIndex = grid.jqGrid('getGridParam', "selrow");
	var url = rootPath + '/user/dataPermissionUI.shtml?userId=' + ids[0];
	pageii = parent.openLayer({
		title: "分配数据权限",
		type: 2,
		area: ["70%", "85%"],
		content: url
	});
}

function locked(){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	if (rowIds.length > 1) {
		parent.layer.msg('只能选择一条数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	var rowId = rowIds[0];
	var rowData = $('#jqGrid').jqGrid('getRowData', rowId);
	var isLocked = rowData.is_locked;
	if("是" == isLocked){
		parent.layer.msg('该用户已被停用！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	parent.layer.confirm('确定要停用该用户吗？', function(index) {
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/user/lock.shtml',
			    data: {
			    	id : rowId
			    },
			    dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(response) {
			    	top.ajaxLoadEnd();
			    	if(response == "success"){
				    	parent.layer.msg('停用成功！', {icon : 1, time: 1000});
				    	var index = parent.layer.getFrameIndex(window.name);
				    	parent.layer.close(index);
			    	}  else {
			    		parent.layer.msg('停用失败！', {icon : 2, time: 1000});
			    	}
					
					$("#jqGrid").trigger("reloadGrid");
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
	            error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('停用失败！', {icon : 2, time: 1000});
					$("#jqGrid").trigger("reloadGrid");
			    }
			});
	});
}
function cancelLocked(){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	if (rowIds.length > 1) {
		parent.layer.msg('只能选择一条数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	var rowId = rowIds[0];
	var rowData = $('#jqGrid').jqGrid('getRowData', rowId);
	var isLocked = rowData.is_locked;
	if("否" == isLocked){
		parent.layer.msg('该用户已被启用！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	parent.layer.confirm('确定要启用该用户吗？', function(index) {
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/user/unlock.shtml',
			    data: {
			    	id : rowId
			    },
			    dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(response) {
			    	top.ajaxLoadEnd();
			    	if(response == "success"){
				    	parent.layer.msg('启用成功！', {icon : 1, time: 1000});
				    	var index = parent.layer.getFrameIndex(window.name);
				    	parent.layer.close(index);
			    	}  else {
			    		parent.layer.msg('启用失败！', {icon : 2, time: 1000});
			    	}
					
					$("#jqGrid").trigger("reloadGrid");
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
	            error: function() {
			    	top.ajaxLoadEnd();
			    	
			    	parent.layer.msg('启用失败！', {icon : 2, time: 1000});
					
					$("#jqGrid").trigger("reloadGrid");
			    }
			});
	});
}