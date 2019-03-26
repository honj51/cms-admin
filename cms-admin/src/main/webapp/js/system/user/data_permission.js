var pageii = null;
var grid = null;
var tableHeight = function() {
	return window.document.body.clientHeight - 200;
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
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/user/findByPage.shtml',
		mtype: "POST",
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
			label: '所属企业',
			name: 'org_name',
			index: 'org_name'
		},
		{
			label: '所属角色',
			name: 'roleName',
			index: 'roleName'
		},
		{
			label: '是否禁用',
			name: 'locked',
			index: 'locked',
			formatter: function(cellvalue, options, rowObject) {
				if (cellvalue == '1') {
					return "否";
				}
				return '是';
			}
		},
		{
			label: '描述',
			name: 'remarks',
			index: 'remarks'
		},
		{
			label: '更新时间',
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
		sortname: 'accountName',
		sortorder: "desc",
		rowNum: 20,
		curRowNum: 1,
		pager: "#jqGridPager",
		onSelectRow: function(id, status) {
			if(status){
				relatedUserIdSet.add(id);
			} else {
				relatedUserIdSet.delete(id);
			}
			
		},
		onSelectAll: function(ids, status) {
			if(status){
				for (var i = 0; i < ids.length; i++) {
					var id = ids[i];
					relatedUserIdSet.add(id);
				}
			} else {
				for (var i = 0; i < ids.length; i++) {
					var id = ids[i];
					relatedUserIdSet.delete(id);
				}
			}
		},
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
			
			var ids = $("#jqGrid").jqGrid('getDataIDs');
			for (var i = 0; i < ids.length; i++) {
				var id = ids[i];
				for (var relatedUserId of relatedUserIdSet) {
					if(id == relatedUserId){
						$("#jqGrid").jqGrid('setSelection', id, true);
					}
				}
			}
			
		}
	});

	$("#save").click(function() {
		save();
	});
	
	$("#search").click("click", function() {// 绑定查询按扭
		search();
	});
	
});

function save(){
	top.ajaxLoading();
	var relatedUserIdArray = [];
	for (var relatedUserId of relatedUserIdSet){
		relatedUserIdArray.push(relatedUserId);
	}
	 $.ajax({
		    type: "post",
		    url: rootPath + '/user/editDataPermission.shtml',
		    data: {
		    	userId : userId,
		    	relatedUserIds : relatedUserIdArray.toString()
		    },
			dataType: "json",
		    beforeSend: function() {
		    },
		    success: function(data) {
		    	top.ajaxLoadEnd();
		    	if(data == "success"){
		    		parent.layer.msg('更新成功！', {icon : 1, time: 1000});
		    	} else {
		    		parent.layer.msg('更新失败！', {icon : 2, time: 1000});
		    	}
		    	
		    	var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
		    },
		    complete: function(XMLHttpRequest, textStatus) {
		    },
            error: function() {
		    	top.ajaxLoadEnd();
		    	
		    	parent.layer.msg('更新失败！', {icon : 2, time: 1000});
		    	var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
		    }
		});
}

function search(){
	var userName = $("#userName").val();
	var supName = $("#supName").val();
	var accountName = $("#accountName").val();
	grid.jqGrid('setGridParam', {
		postData : {
			userName : userName,
			supName : supName,
			accountName : accountName
		},
		page : 1
	}).trigger("reloadGrid");
}