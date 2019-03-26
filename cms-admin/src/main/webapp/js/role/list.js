var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 260);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {
	$(".selectpicker").selectpicker({size:7});
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/role/findByPage.shtml',
		mtype: "POST",
		postData: {
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
			hidedlg: true,
			search: false,
			align: "center",
			fixed: true,
			formatter: function() {
				var p = $(this).jqGrid("getGridParam"),
				rn = p.curRowNum + (parseInt(p.page, 10) - 1) * parseInt(p.rowNum, 10);
				p.curRowNum++;
				return rn.toString();
			}
		},
		{
			label: 'id',
			name: 'id',
			index: 'id',
			key: true,
			hidden: true
		},
		{
			label: '角色名称',
			name: 'name',
			index: 'name',
		},
		{
			label: '部门名称',
			name: 'dept_name',
			index: 'dept_name',
		},
		{
			label: '是否锁定',
			name: 'is_locked',
			index: 'is_locked',
			formatter: function(value, opt, rec) {
				if(0 == value){
					return "否";
				}else if(1 == value){
					return "是";
				}else{
					return "";
				}
			}
		},
		{
			label: '备注',
			name: 'remarks',
			index: 'remarks',
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
			formatter: function(cellValue, opt, rec) {
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
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
			formatter: function(cellValue, opt, rec) {
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		}],
		onSelectAll: function(ids, status) {
		},
		onSelectRow: function(id) {
		},
		ondblClickRow: function(id) {
		},
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: true,
		sortname: 'update_time',
		sortorder: "desc",
		height: (window.document.body.clientHeight - 260),
		width: (window.document.body.clientWidth - 10),
		rowNum: 10,
		pager: "#jqGridPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		}
	});
	
	$("#search").click("click", function() {
		search();
	});

	$("#refresh").click("click", function() {
		refresh();
	});
	
	$("#add").click("click", function() {
		add();
	});
	
	$("#edit").click("click", function() {
		edit();
	});
	
	$("#del").click("click", function() {
		del();
	});
	
	$("#permissions").click("click",function() {
		permissions();
	});
	
	$("#locked").click("click",function() {
		locked();
	});
	
	$("#unlocked").click("click",function() {
		unlocked();
	});
	
});

function search(){
	grid.jqGrid('setGridParam', {
		postData: {
			queryParam : $("#queryParam").val().trim(),
			isLocked : $("#isLocked").val()
		},
		page: 1
	}).trigger("reloadGrid");
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.selectpicker').selectpicker('refresh');
	grid.jqGrid('setGridParam', {
		postData: {
			queryParam : "",
			isLocked : ""
		},
		page : 1
	}).trigger("reloadGrid");
}

function add(){
	parent.layer.open({
		title: "新增角色",
		type: 2,
		area: ["60%", "70%"],
		content: rootPath + '/role/addUI.shtml',
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function edit(){
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
	parent.layer.open({
		title: "修改角色",
		type: 2,
		area: ["60%", "70%"],
		content: rootPath + '/role/editUI.shtml?id=' + rowId,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function del() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon : 20,
			time : 1000
		});
		return;
	}

	parent.layer.confirm('确定要删除角色吗？', function(index) {
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/role/delete.shtml',
			data : {
				ids : rowIds.toString()
			},
			dataType : "json",
			beforeSend : function() {
			},
			success : function(response) {
				top.ajaxLoadEnd();
				if (response == "success") {
					parent.layer.msg('删除成功！', {
						icon : 1,
						time : 1000
					});
				} else if(response == "have_users"){
					parent.layer.msg('删除失败，部门下存在角色！', {
						icon : 1,
						time : 1000
					});
				} else {
					parent.layer.msg('删除失败！', {
						icon : 2,
						time : 1000
					});
				}
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);

				$("#jqGrid").trigger("reloadGrid");
			},
			error : function() {
				top.ajaxLoadEnd();

				parent.layer.msg('删除失败！', {
					icon : 2,
					time : 1000
				});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);

				$("#jqGrid").trigger("reloadGrid");
			}
		});
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
	
	var url = rootPath + '/role/permissions.shtml?id=' + ids[0];
	pageii = parent.openLayer({
		title: "分配功能权限",
		type: 2,
		area: ["70%", "85%"],
		content: url
	});
}

function locked() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon : 20,
			time : 1000
		});
		return;
	}

	parent.layer.confirm('确定要停用角色吗？', function(index) {
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/role/locked.shtml',
			data : {
				ids : rowIds.toString()
			},
			dataType : "json",
			success : function(response) {
				top.ajaxLoadEnd();
				if (response == "success") {
					parent.layer.msg('停用成功！', {
						icon : 1,
						time : 1000
					});
				} else {
					parent.layer.msg('停用失败！', {
						icon : 2,
						time : 1000
					});
				}
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);

				$("#jqGrid").trigger("reloadGrid");
			},
			error : function() {
				top.ajaxLoadEnd();

				parent.layer.msg('停用失败！', {
					icon : 2,
					time : 1000
				});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);

				$("#jqGrid").trigger("reloadGrid");
			}
		});
	});
}

function unlocked() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon : 20,
			time : 1000
		});
		return;
	}

	parent.layer.confirm('确定要启用角色吗？', function(index) {
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/role/unlocked.shtml',
			data : {
				ids : rowIds.toString()
			},
			dataType : "json",
			success : function(response) {
				top.ajaxLoadEnd();
				if (response == "success") {
					parent.layer.msg('启用成功！', {
						icon : 1,
						time : 1000
					});
				} else {
					parent.layer.msg('启用失败！', {
						icon : 2,
						time : 1000
					});
				}
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);

				$("#jqGrid").trigger("reloadGrid");
			},
			error : function() {
				top.ajaxLoadEnd();

				parent.layer.msg('启用失败！', {
					icon : 2,
					time : 1000
				});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);

				$("#jqGrid").trigger("reloadGrid");
			}
		});
	});
}