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
			name: 'name',
			index: 'name'
		},
		{
			label: '用户名',
			name: 'account_name',
			index: 'account_name'
		},
		{
			label: '电话',
			name: 'phone',
			index: 'phone'
		},
		{
			label: '所属部门',
			name: 'dept_name',
			index: 'dept_name'
		},
		{
			label: '所属角色',
			name: 'role_name',
			index: 'role_name'
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
		rowNum: 10,
		curRowNum: 1,
		pager: "#jqGridPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		}
	});
	
	$("#search").click("click",function() { // 绑定查询按扭
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
	
	$("#add").click("click",function() {
		addAccount();
	});
	
	$("#edit").click("click",function() {
		editAccount();
	});
	
	$("#del").click("click",function() {
		delAccount();
	});
	
	$("#permissions").click("click",function() {
		permissions();
	});
	
	$("#locked").click("click",function() {
		locked();
	});
	
	$("#unlocked").click("click",function() {
		cancelLocked();
	});
	
	$("#resetpassword").click("click",function() {
		resetpassword();
	});
	
	$("#refreshbutton").click("click",function() {
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

function resetpassword(){
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
	var url = rootPath + '/user/resetPassword.shtml';
	top.ajaxLoading();
	 $.ajax({
		    type: "post",
		    url: url,
		    dataType:"json",
		    data: {
		    	id : ids[0]
		    },
		    success: function(data) {
		    	top.ajaxLoadEnd();
		    	if(data== "success"){
		    		top.ajaxLoadEnd();
		    		parent.layer.msg('密码重置成功!请牢记您的新密码：123456789', {icon : 1, time: 2000});
		    	}else{
		    		parent.layer.msg('密码重置失败！', {icon : 2, time: 1000});
		    	}
		    	
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