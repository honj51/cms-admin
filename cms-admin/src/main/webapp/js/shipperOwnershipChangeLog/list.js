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
	
	$("#startDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	$("#endDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	$(".js-example-basic-single").select2({
		language: "zh-CN"
	});
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/shipperOwnershipChangeLog/findByPage.shtml',
		mtype: "get",
		postData: {
			shipperId : shipperId,
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val(),
			startArea : $("#startArea").val(),
			endArea : $("#endArea").val()
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
			label: '姓名',
			name: 'name',
			index: 'name'
		},

		{
			label: '电话',
			name: 'phone',
			index: 'phone'
		},
		{
			label: '所属人',
			name: 'owner_name',
			index: 'owner_name'
		},
		{
			label: 'owner_id',
			name: 'owner_id',
			index: 'owner_id',
			hidden: true
		},
		{
			label: '类型',
			name: 'type',
			index: 'type',
			formatter: function(cellValue, opt, rec) {
				if("1" == cellValue){
					return "捡回";
				} else {
					return "开放";
				}
				
			}
		},
		{
			label: '改变时间',
			name: 'change_time',
			index: 'change_time',
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
		sortname: 'change_time',
		sortorder: "desc",
		height: (window.document.body.clientHeight - 260),
		width: (window.document.body.clientWidth - 10),
		rowNum: 20,
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
	
	$("#exportExcel").click("click", function() {
		exportExcel();
	});
	
});

function search(){
	grid.jqGrid('setGridParam', {
		postData: {
			startDate : $("#startDate").val().trim(),
			endDate : $("#endDate").val().trim(),
			ownerId :  $("#owner option:selected").val()
		},
		page: 1
	}).trigger("reloadGrid");
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.js-example-basic-single').select2({
		language: "zh-CN"
	});
	$('.selectpicker').selectpicker('refresh');
	grid.jqGrid('setGridParam', {
		postData: {
			startDate : "",
			endDate : "",
			ownerId : ""
		},
		page : 1
	}).trigger("reloadGrid");
}

function exportExcel(){
	var ownerId =  $("#owner option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	window.location.href = rootPath + '/shipperOwnershipChangeLog/exportExcel.shtml?startDate=' + startDate + 
	'&endDate=' + endDate+'&ownerId=' + ownerId;
}