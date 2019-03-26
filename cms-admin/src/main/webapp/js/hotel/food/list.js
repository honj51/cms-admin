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
		url: rootPath + '/hotel/food/findByPage.shtml',
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
			label: '标题',
			name: 'title',
			index: 'title',
		},
		{
			label: '推荐星级',
			name: 'star_level',
			index: 'star_level',
			formatter: function(value, opt, rec) {
				if(value == 1){
					return "一星";
				}else if(value == 2){
					return "二星";
				}else if(value == 3){
					return "三星";
				}else if(value == 4){
					return "四星";
				}else if(value == 5){
					return "五星";
				}else{
					return "";
				}
			}
		},
		{
			label: '所属酒店',
			name: 'content',
			index: 'content'
		},
		{
			label: '餐品展示图片',
			name: 'first_url',
			index: 'first_url',
			formatter: function(value, opt, rec) {
				if(value != null && value != '' && typeof(value) != 'undefined'){
					return '<img src="'+value+ '"  style="width:50px;height:50px;" />';
				}else{
					return "";
				}
			}
		},
		{
			label: '餐品展示图片',
			name: 'second_url',
			index: 'second_url',
			formatter: function(value, opt, rec) {
				if(value != null && value != '' && typeof(value) != 'undefined'){
					return '<img src="'+value+ '"  style="width:50px;height:50px;" />';
				}else{
					return "";
				}
			}
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
	
});

function search(){
	grid.jqGrid('setGridParam', {
		postData: {
			queryparam : $("#queryparam").val().trim(),
			starLevel : $("#starLevel option:selected").val()
		},
		page: 1
	}).trigger("reloadGrid");
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.selectpicker').selectpicker('refresh');
	grid.jqGrid('setGridParam', {
		postData: {
			queryparam : "",
			starLevel : ""
		},
		page : 1
	}).trigger("reloadGrid");
}

function add(){
	parent.layer.open({
		title: "新增餐品",
		type: 2,
		area: ["60%", "70%"],
		content: rootPath + '/hotel/food/addUI.shtml',
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
		title: "修改餐品",
		type: 2,
		area: ["60%", "70%"],
		content: rootPath + '/hotel/food/editUI.shtml?id=' + rowId,
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

	parent.layer.confirm('确定要删除餐品吗？', function(index) {
		top.ajaxLoading();
		$.ajax({
			type : "post",
			url : rootPath + '/hotel/food/delete.shtml',
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