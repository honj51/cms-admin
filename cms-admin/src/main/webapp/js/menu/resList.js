var pageii = null;
var grid = null;
var tableHeight = function() {
	return window.document.body.clientHeight - 120;
};
var tableWidth = function() {
	return window.document.body.clientWidth - 30;
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
		url: rootPath + '/menu/findByResId.shtml',
		mtype: "POST",
		postData: {
			resId : resId
			
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
			label: '用户',
			name: 'accountName',
			index: 'accountName'
		},
		{
			label: '电话',
			name: 'phone',
			index: 'phone'
		}/*,
		{
			label: '所属部门',
			name: 'deptName',
			index: 'deptName'
		},
		{
			label: '所属角色',
			name: 'roleName',
			index: 'roleName'
		}*/,
		{
			label: '是否禁用',
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
			label: '描述',
			name: 'description',
			index: 'description'
		},
		{
			label: '创建时间',
			name: 'createTime',
			index: 'createTime',
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
			}
		}],
		altRows: true,
		altclass: 'altRowsClass',
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: true,
		height: tableHeight(),
		width: tableWidth(),
		sortname: 'createTime',
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
		var userName = $("#userName").val();
		var supName = $("#supName").val();
		var accountName = $("#accountName").val();
		var isLocked = $("#isLocked").val();
		grid.jqGrid('setGridParam', {
			postData: {
				userName: userName,
				supName: supName,
				accountName: accountName,
				isLocked : isLocked
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	//-----------------给按钮绑定事件end---------------
	$("#refreshbutton").click("click",
	function() {
		document.getElementById("searchForm").reset()
		grid.jqGrid('setGridParam', {
			postData: {
				userName: "",
				supName: "",
				accountName: ""
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#cancelRes").click("click",function(){
		cancelRes();
	});
});

function cancelRes(){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	parent.layer.confirm('确定要取消此用户此权限吗？',
			function(index) {
				top.ajaxLoading();
				$.ajax({
					type: "post",
					url: rootPath + '/menu/deleteResEntity.shtml',
					data: {
						userIds: rowIds.toString(),
						resId : resId
					},
					dataType: "json",
					beforeSend: function() {},
					success: function(response) {
						top.ajaxLoadEnd();
						if (response == "success") {
							parent.layer.msg('取消成功！', {
								icon: 1,
								time: 1000
							});
						} else {
							parent.layer.msg('取消失败！', {
								icon: 2,
								time: 1000
							});
						}

						$("#jqGrid").trigger("reloadGrid");
					},
					complete: function(XMLHttpRequest, textStatus) {},
					error: function() {
						top.ajaxLoadEnd();

						parent.layer.msg('取消失败！', {
							icon: 2,
							time: 1000
						});
						var index = parent.layer.getFrameIndex(window.name);
						parent.layer.close(index);

						$("#jqGrid").trigger("reloadGrid");
					}
				});
			});
	
}

