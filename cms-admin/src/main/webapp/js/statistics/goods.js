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
		url: rootPath + '/statistics/findGoodsStatsByPage.shtml',
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
			label: '货源等级',
			name: 'level',
			index: 'level',
			sortable: true,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return 'A';
				} else if (value == '2') {
					return 'B';
				} else if (value == '3') {
					return 'C';
				} else if (value == '4') {
					return 'D';
				} else {
					return '';
				}
			}
		},
		{
			label: '合计货源',
			name: 'total_goods',
			index: 'total_goods',
			hidden: true
		},
		{
			label: '服务费',
			name: 'service_charge',
			index: 'service_charge',
			formatter:function(value, opt, rec) {
				var level = rec.level
				return '<a href="javascript:void(0)" onclick=delivery(\'' + level +'\')>'+value+'</a>';
			}
		},
		{
			label: '派动条数',
			name: 'delivery_goods_quantity',
			index: 'delivery_goods_quantity',
			hidden: true
		},{
			label: '需车数',
			name: 'total_require_vehicle_quantity',
			index: 'total_require_vehicle_quantity',
			hidden: true
		},{
			label: '实际派车数量',
			name: 'loaded_vehicle_quantity',
			index: 'loaded_vehicle_quantity'
		},
		{
			label: '平均派车数量',
			name: '',
			index: '',
			hidden: true,
			formatter: function(value, opt, rec) {
				var deliveryVehicleQuantity = rec.delivery_vehicle_quantity;
				var deliveryGoodsQuantity = rec.delivery_goods_quantity;
				var avgDeliveryVehicleQuantity = deliveryVehicleQuantity/deliveryGoodsQuantity;
				return avgDeliveryVehicleQuantity.toFixed(0);
			}
		},
		{
			label: '派车满足率',
			name: '',
			index: '',
			hidden: true,
			formatter: function(value, opt, rec) {
				var deliveryVehicleQuantity = rec.delivery_vehicle_quantity;
				var totalRequireVehicleQuantity = rec.total_require_vehicle_quantity;
				var deliveryRate = (deliveryVehicleQuantity/totalRequireVehicleQuantity)*100;
				return deliveryRate.toFixed(2)+'%';
			}
		},
		{
			label: '货源派动满足率',
			name: '',
			index: '',
			hidden: true,
			formatter: function(value, opt, rec) {
				var deliveryGoodsQuantity = rec.delivery_goods_quantity;
				var totalGoods = rec.total_goods;
				var deliveryRate = (deliveryGoodsQuantity/totalGoods)*100;
				return deliveryRate.toFixed(2)+'%';
			}
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

function delivery(level){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "运单列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/common/delivery.shtml?level=' + level + '&createStartDate=' + startDate + '&createEndDate=' + endDate+'&status='+8,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

