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
	
	$('#reserveStartTime').datetimepicker({
		format:"YYYY-MM-DD HH:mm:ss"
	});
	
	$('#reserveEndTime').datetimepicker({
		format:"YYYY-MM-DD HH:mm:ss"
	});
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/hotel/reserve/findByPage.shtml',
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
			label: '预定时间',
			name: 'reserve_time',
			index: 'reserve_time',
			formatter: function(value, opt, rec) {
				return new Date(value).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '预定人数',
			name: 'person_num',
			index: 'person_num',
		},
		{
			label: '包厢类型',
			name: 'box_type',
			index: 'box_type',
			formatter: function(value, opt, rec) {
				if(value == 1){
					return "大厅";
				}else if(value == 2){
					return "包间";
				}else{
					return "";
				}
			}
		},
		{
			label: '顾客名称',
			name: 'client_name',
			index: 'client_name',
		},
		{
			label: '顾客电话',
			name: 'client_phone',
			index: 'client_phone',
		},
		{
			label: '顾客备注',
			name: 'remarks',
			index: 'remarks',
		},
		{
			label: '是否处理',
			name: 'is_manage',
			index: 'is_manage',
			formatter: function(value, opt, rec) {
				if(value == 0){
					return "未处理";
				}else if(value == 1){
					return "已处理";
				}else{
					return "";
				}
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
		sortname: 'reserve_time',
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
	
	$("#mangeYes").click("click", function() {
		mange("yes");
	});
	
	$("#mangeNo").click("click", function() {
		mange("no");
	});
	
	$("#del").click("click", function() {
		del();
	});
	
});

function search(){
	grid.jqGrid('setGridParam', {
		postData: {
			queryparam : $("#queryparam").val().trim(),
			reserveStartTime : $("#reserveStartTime").val().trim(),
			reserveEndTime : $("#reserveEndTime").val().trim(),
			boxType : $("#boxType option:selected").val(),
			isManage : $("#isManage option:selected").val()
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
			reserveStartTime : "",
			reserveEndTime : "",
			boxType : "",
			isManage : "",
		},
		page : 1
	}).trigger("reloadGrid");
}

function mange(type){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	

	top.ajaxLoading();
	$.ajax({
		type : "post",
		url : rootPath + '/hotel/reserve/manage.shtml',
		data : {
			ids : rowIds.toString(),
			type : type
		},
		dataType : "json",
		success : function(response) {
			top.ajaxLoadEnd();
			if (response == "success") {
				parent.layer.msg('处理成功！', {
					icon : 1,
					time : 1000
				});
			} else {
				parent.layer.msg('处理失败！', {
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

			parent.layer.msg('处理失败！', {
				icon : 2,
				time : 1000
			});
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);

			$("#jqGrid").trigger("reloadGrid");
		}
	});
}