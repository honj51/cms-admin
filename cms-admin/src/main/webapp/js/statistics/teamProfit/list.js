var pageii = null;
var grid = null;
var gridUser = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight((window.document.body.clientHeight - 335)*0.25);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$("#jqGridUser").setGridHeight((window.document.body.clientHeight-335)*0.75);
	$("#jqGridUser").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {
	
	$("#startDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	$("#endDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/dept/findPerformanceByPage.shtml',
		mtype: "get",
		postData: {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
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
			label: '组名',
			name: 'name',
			index: 'name'
		},
		{
			label: '服务费',
			name: 'service_charge_total',
			index: 'service_charge_total'
		},
		{
			label: '会员费',
			name: 'membership_fee_total',
			index: 'membership_fee_total'
		},
		{
			label: '合计',
			name: 'total',
			index: 'total'
		}
		],
		onSelectAll: function(ids, status) {
		},
		onSelectRow: function(id) {
			var startDate = $("#startDate").val();
			var endDate = $("#endDate").val();
			if(typeof(id) != 'undefined'){
				userProfit(id,startDate,endDate);
			}
		},
		ondblClickRow: function(id) {
		},
		multiselect: false,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: true,
		sortname: 'total',
		sortorder: "desc",
		height: ((window.document.body.clientHeight - 335)*0.25),
		width: (window.document.body.clientWidth - 10),
		rowNum: 20,
		pager: "#jqGridPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		}

	});
	
	gridUser = $("#jqGridUser").jqGrid({
		mtype: "get",
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
			label: 'user_id',
			name: 'user_id',
			index: 'user_id',
			hidden : true
		},
		{
			label: '姓名',
			name: 'userName',
			index: 'userName'
		},
		{
			label: '服务费',
			name: 'service_charge_total',
			index: 'service_charge_total',
			formatter : function(cellvalue, options, rowObject) {
				var userId = rowObject.user_id;
				return '<a href="javascript:void(0)" onclick="delivery(\'' + userId + '\')">' + cellvalue + '</a>';
			}
		},
		{
			label: '会员费',
			name: 'membership_fee_total',
			index: 'membership_fee_total'
		},{
			label: '合计',
			name: 'total',
			index: 'total'
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
		sortname: 'total',
		sortorder: "desc",
		height: ((window.document.body.clientHeight - 335)*0.75),
		width: (window.document.body.clientWidth - 10),
		rowNum: 20,
		pager: "#jqGridPagerUser",
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
	
});

function search(){
	grid.jqGrid('setGridParam', {
		postData: {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		page : 1
	}).trigger("reloadGrid");
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.selectpicker').selectpicker('refresh');
	grid.jqGrid('setGridParam', {
		postData: {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		page : 1
	}).trigger("reloadGrid");
	$("#jqGridUser").clearGridData();
}

function userProfit(deptId, startDate, endDate){
    $("#jqGridUser").jqGrid('setGridParam', {
        url: rootPath + '/user/findPerformanceByPage.shtml',
        curRowNum: 1,
        postData:{
        	deptId : deptId,
        	startDate : startDate,
        	endDate : endDate
        },
        page: 1
    });
	$("#jqGridUser").trigger('reloadGrid');
}

function delivery(userId){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "运单列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/common/delivery.shtml?createUserId=' + userId + '&startDate=' + startDate + '&endDate=' + endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}
