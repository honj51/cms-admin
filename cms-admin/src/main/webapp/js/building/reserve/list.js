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
		url: rootPath + '/building/reserve/findByPage.shtml',
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
			label: '预约看房时间',
			name: 'reserve_time',
			index: 'reserve_time',
			formatter: function(value, opt, rec) {
				return new Date(value).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '预约户型',
			name: 'apartment_name',
			index: 'apartment_name',
		},
		{
			label: '客户名称',
			name: 'client_name',
			index: 'client_name',
		},
		{
			label: '客户电话',
			name: 'client_phone',
			index: 'client_phone',
		},
		{
			label: '客户备注',
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
			label: '处理结果',
			name: 'manage_result',
			index: 'manage_result',
			formatter: function(value, opt, rec) {
				if(value == 1){
					return "可看房";
				}else if(value == 2){
					return "不可看房";
				}else{
					return "";
				}
			}
		},
		{
			label: '处理人',
			name: 'manage_user_name',
			index: 'manage_user_name',
		},
		{
			label: '处理人电话',
			name: 'manage_user_phone',
			index: 'manage_user_phone',
		},
		{
			label: '处理时间',
			name: 'manage_time',
			index: 'manage_time',
			formatter: function(value, opt, rec) {
				if(value != null && value != '' && typeof(value) != 'undefined'){
					return new Date(value).format("yyyy-MM-dd hh:mm:ss");
				}
				return '';
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
	
	$("#manage").click("click", function() {
		manage();
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
			isManage : "",
		},
		page : 1
	}).trigger("reloadGrid");
}

function manage(){
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

	parent.layer.open({
		title: "管理预约",
		type: 2,
		area: ["60%", "60%"],
		content: rootPath + '/building/reserve/manageUI.shtml?id=' + rowIds[0],
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});

	
}