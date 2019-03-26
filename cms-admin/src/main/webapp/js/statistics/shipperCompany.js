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
		url: rootPath + '/statistics/findShipperCompanyStatsByPage.shtml',
		mtype: "get",
		postData: {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val(),
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
			label: '企业类型',
			name: 'type',
			index: 'type',
			key:true,
			sortable: true,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '煤矿';
				} else if (value == '2') {
					return '本地贸易商';
				} else if (value == '3') {
					return '外地贸易商';
				} else if (value == '4') {
					return '终端';
				} else {
					return '';
				}
			}
		},
		{
			label: '服务费',
			name: 'service_charge',
			index: 'service_charge',
			formatter:function(value, opt, rec) {
				var shipperCompanyType = rec.type
				return '<a href="javascript:void(0)" onclick=deliveryList(\'' + shipperCompanyType +'\')>'+value+'</a>';
			}
		},
		{
			label: '装车数',
			name: 'loaded_vehicle_quantity',
			index: 'loaded_vehicle_quantity'
		},
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
		sortname: 'level',
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
	document.getElementById("searchForm").reset();
	$('.selectpicker').selectpicker('refresh');
	grid.jqGrid('setGridParam', {
		postData: {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		page : 1
	}).trigger("reloadGrid");
}

function deliveryList(shipperCompanyType){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "运单列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/common/deliveryList.shtml?shipperCompanyType=' + shipperCompanyType + '&startDate=' + startDate + '&endDate=' + endDate+'&status='+8,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

