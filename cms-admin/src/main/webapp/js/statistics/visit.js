var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 260);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
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
		url: rootPath + '/statistics/findVisitStatsByPage.shtml',
		mtype: "get",
		postData: {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val(),
			visitorId : $("#visitor option:selected").val(),
			targetType : $("#targetType option:selected").val(),
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
			label: '姓名',
			name: 'userName',
			index: 'userName'
		},
		{
			label: '见面拜访次数',
			name: 'face_visit_quantity',
			index: 'face_visit_quantity'
		},
		{
			label: '电话拜访次数',
			name: 'phone_visit_quantity',
			index: 'phone_visit_quantity'
		},
		{
			label: '总拜访次数',
			name: 'total',
			index: 'total'
		}
		],
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
	grid.jqGrid('setGridParam', {
		postData: {
			
		},
		page : 1
	}).trigger("reloadGrid");
}