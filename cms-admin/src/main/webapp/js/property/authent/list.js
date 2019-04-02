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
		url: rootPath + '/property/authent/findByPage.shtml',
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
			label: '业主名称',
			name: 'name',
			index: 'name',
		},
		{
			label: '业主电话',
			name: 'name',
			index: 'name',
		},
		{
			label: '业主身份证号',
			name: 'idcord',
			index: 'idcord',
		},
		{
			label: '业主地址',
			name: 'address',
			index: 'address',
		},
		{
			label: '审核状态',
			name: 'state',
			index: 'state',
			formatter: function(value, opt, rec) {
				if(value==1){
					return "待审核";
				}else if(value==2){
					return "审核通过";
				}else if(value==3){
					return "审核失败";
				}
			}
		},
		{
			label: '审核原因',
			name: 'remarks',
			index: 'remarks',
		},
		{
			label: '图一',
			name: 'id_url',
			index: 'id_url',
			formatter: function(value, opt, rec) {
				if(value != null && value != '' && typeof(value) != 'undefined'){
					return '<img src="'+value+ '"  style="width:50px;height:50px;" onclick=getUrl("'+ value +'") />';
				}else{
					return "";
				}
			}
		},
		{
			label: '图二',
			name: 'id_urls',
			index: 'id_urls',
			formatter: function(value, opt, rec) {
				if(value != null && value != '' && typeof(value) != 'undefined'){
					return '<img src="'+value+ '"  style="width:50px;height:50px;" onclick=getUrl("'+ value +'") />';
				}else{
					return "";
				}
			}
		},
		{
			label: '申请时间',
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
		shrinkToFit: false,
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
	
	$("#audit").click("click", function() {
		audit();
	});
	$("#erraudit").click("click", function() {
		erraudit();
	});
	
	$("#del").click("click", function() {
		del();
	});
	
});

function search(){
	grid.jqGrid('setGridParam', {
		postData: {
			state : $("#isManage option:selected").val(),
			name : $("#queryparam").val().trim(),
			idcord : $("#idcord").val().trim(),
		},
		page: 1
	}).trigger("reloadGrid");
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.selectpicker').selectpicker('refresh');
	grid.jqGrid('setGridParam', {
		postData: {
			state : "",
			name :"",
			idcord : "",
		},
		page : 1
	}).trigger("reloadGrid");
}

function add(){
	parent.layer.open({
		title: "新增户型",
		type: 2,
		area: ["60%", "70%"],
		content: rootPath + '/building/apartment/addUI.shtml',
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}
function audit(){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	console.log(rowIds+" mmm")
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
		title: "审核业主信息",
		type: 2,
		area: ["70%", "70%"],
		content: rootPath + '/property/authent/auditUI.shtml?id=' + rowId,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});

}
function erraudit(){
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
	parent.layer.confirm('确定要审核失败？', function(index) {
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/property/authent/edit.shtml',
			data : {
				id : rowIds.toString(),
				state:3
			},
			dataType : "json",
			beforeSend : function() {
			},
			success : function(response) {
				top.ajaxLoadEnd();
				if (response == "success") {
					parent.layer.msg('审核成功！', {
						icon : 1,
						time : 1000
					});
				} else if (response == "transfer_delivery") {
					parent.layer.msg('转账的运单不能删除', {
						icon : 0,
						time : 2000
					});
				} else {
					parent.layer.msg('审核失败！', {
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
				
				parent.layer.msg('审核失败！', {
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
		title: "修改户型",
		type: 2,
		area: ["60%", "70%"],
		content: rootPath + '/building/apartment/editUI.shtml?id=' + rowId,
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

	parent.layer.confirm('确定要删除户型吗？', function(index) {
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/building/apartment/delete.shtml',
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
				} else if (response == "transfer_delivery") {
					parent.layer.msg('转账的运单不能删除', {
						icon : 0,
						time : 2000
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

function getUrl(url){
	top.showImage(url);
}

function lookPanorama(url){
	parent.layer.open({
		title: "查看全景图",
		type: 2,
		area: ["90%", "90%"],
		content: url,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}