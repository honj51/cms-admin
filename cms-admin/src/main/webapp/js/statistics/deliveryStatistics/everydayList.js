var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 160);
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
		url: rootPath + '/statistics/deliveryStatistics/findEveryDayDelivery.shtml',
		mtype: "get",
		postData: {
			goodsId:goodsId,
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
			label: '日期',
			name: 'create_time',
			index: 'create_time',
			formatter: function(cellValue, opt, rec) {
				return new Date(cellValue).format("yyyy-MM-dd");
			}
		},
		{
			label: '运单数量',
			name: 'total_delivery',
			index: 'total_delivery'
		},
		{
			label: '司机有姓名的总数',
			name: 'driver_name_total',
			index: 'driver_name_total',
			width: 200
		},
		{
			label: '司机有手机号的总数',
			name: 'driver_phone_total',
			index: 'driver_phone_total',
			width: 200
		},
		{
			label: '司机有身份证号的总数',
			name: 'driver_id_card_no_total',
			index: 'driver_id_card_no_total',
			width: 200
		},
		{
			label: '有行驶证照片的总数',
			name: 'driver_vehicle_license_total',
			index: 'driver_vehicle_license_total',
			width: 200
		},
		{
			label: '有驾驶证照片的总数',
			name: 'driver_driving_license_total',
			index: 'driver_driving_license_total',
			width: 200
		},
		{
			label: '有身份证照片的总数',
			name: 'driver_id_card_front_side_total',
			index: 'driver_id_card_front_side_total',
			width: 200
		},
		{
			label: '有装货磅单照片的总数',
			name: 'loading_pound_total',
			index: 'loading_pound_total',
			width: 200
		},
		{
			label: '有卸货磅单照片的总数',
			name: 'loading_pound_total',
			index: 'loading_pound_total',
			width: 200
		},
		{
			label: '运单详情',
			name: 'delivery_detail',
			index: 'delivery_detail',
			formatter : function(cellvalue, options, rowObject) {
				var createTime = new Date(rowObject.create_time).format("yyyy-MM-dd");
				return '<a href="javascript:void(0)" onclick="lookEverydayDetailList(\''+createTime+'\')">'+'派车明细'+'</a>';
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
		shrinkToFit: false,
		sortname: 'create_time',
		sortorder: "desc",
		height: (window.document.body.clientHeight - 160),
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
			goodsId:goodsId,
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		page : 1
	}).trigger("reloadGrid");h
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.selectpicker').selectpicker('refresh');
	grid.jqGrid('setGridParam', {
		postData: {
			goodsId:goodsId,
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		page : 1
	}).trigger("reloadGrid");
}

function lookEverydayDetailList(createTime){
	parent.layer.open({
		title : "每日统计列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/deliveryStatistics/lookEverydayDetailList.shtml?goodsId='+goodsId +'&createTime=' + createTime,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}