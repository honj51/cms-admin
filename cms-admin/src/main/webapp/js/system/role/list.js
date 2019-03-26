var pageii = null;
var grid = null;
var tableHeight = function() {
	return window.document.body.clientHeight  - 260;
};
var tableWidth = function() {
	return window.document.body.clientWidth-10;
};
$(window).resize(function(){ 
	$(window).unbind("onresize");
	grid.setGridHeight(tableHeight()); 
	grid.setGridWidth(tableWidth()); 
	$(window).bind("onresize", this); 
});
$(function()  {
	grid=$("#jqGrid").jqGrid({
        url: rootPath + '/role/findByPage.shtml',
        mtype: "GET",
        curRowNum: 1,
		styleUI : 'Bootstrap',
        datatype: "json",
        colModel: [
			{ label: '序号', name: "rowNumber",
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
			      }
			},
            { label: 'id', name: 'id', index:'id', key: true,hidden:true},
            { label: '角色名', name: 'name', index:'name'},
            { label: '状态', name: 'state', index:'state',hidden:true},
            { label: 'roleKey', name: 'roleKey', index:'roleKey' ,hidden:true},
            { label: '描述', name: 'description', index:'description'} ,
            { label: '修改时间', name: 'update_time', index:'update_time',formatter:function(cellvalue, options, rowObject){
																		if(cellvalue==null||cellvalue==""){
																			return "";
																		}
														        		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss")
													        		}
            } 
        ],
		altRows : true,
		altclass : 'altRowsClass',
		viewrecords: true,
		multiselect:true,
		autowidth: false, 
		shrinkToFit: true,
		height : tableHeight(),
		width : tableWidth(),
        sortname: 'update_time',
        sortorder: "desc",
        rowNum: 20,
        pager: "#jqGridPager",
        loadComplete: function () {
            var p = $(this).jqGrid("getGridParam");
            p.curRowNum = 1;
        }
	});
	
	$("#search").click("click", function() {// 绑定查询按扭
		var name = $("#name").val().trim();
		grid.jqGrid('setGridParam', {
			postData : {
				name : name
			},
			page : 1
		}).trigger("reloadGrid");
	});
	$("#addRole").click("click", function() {
		addRole();
	});
	$("#editRole").click("click", function() {
		editRole();
	});
	$("#delRole").click("click", function() {
		delRole();
	});
	$("#permissions").click("click", function() {
		permissions();
	});
	
	$("#refreshbutton").click("click", function() {
		$("#name").val('');
		grid.jqGrid('setGridParam', {
			postData : {
				name : ""
			},
			page : 1
		}).trigger("reloadGrid");
	});
});
function editRole() {
	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if(ids.length==0){
		parent.layer.msg('请选择数据！', {icon : 0,time:1000});
		return;
	}
	if(ids.length>1){
		parent.layer.msg('只能选择一条数据！', {icon : 0,time:1000});
		return;
	}
	pageii =  parent.openLayer({
		title : "编辑",
		type : 2,
		area : [ "600px", "250px" ],
		content : rootPath + '/role/editUI.shtml?id=' + ids[0],
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}
function permissions() {
	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if(ids.length==0){
		parent.layer.msg('请选择数据！', {icon : 0,time:1000});
		return;
	}
	if(ids.length>1){
		parent.layer.msg('只能选择一条数据！', {icon : 0,time:1000});
		return;
	}
	var url = rootPath + '/resources/rolepermissions.shtml?roleId='+ids[0];
	pageii = parent.openLayer({
		title : "分配权限",
		type : 2,
		area : [ "70%", "85%" ],
		content : url
	});
}
function addRole() {
	pageii =   parent.openLayer({
		title : "新增",
		type : 2,
		area : [ "600px", "250px" ],
		content : rootPath + '/role/addUI.shtml',
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}
function delRole() {
	var ids = grid.jqGrid('getGridParam', "selarrrow");
	if(ids.length==0){
		parent.layer.msg('请选择数据！', {icon : 2,time:1000});
		return;
	}
	
	parent.layer.confirm('是否删除？', function(index) {
		var url = rootPath + '/role/deleteEntity.shtml';
		var s = CommnUtil.ajax(url, {"ids":ids.toString()}, "json");
		if (s == "success") {
			parent.layer.msg('删除成功！', {icon : 1,time:1000});
			grid.trigger("reloadGrid");
		} else {
			parent.layer.msg('删除失败！', {icon : 2,time:1000});
		}
	});
}
