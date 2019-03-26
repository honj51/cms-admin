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
		url: rootPath + '/delivery/findStatsByPage.shtml',
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
			name: 'goods_id',
			index: 'goods_id',
			key: true,
			hidden: true
		},
		
		{
			label: '货源出发地',
			name: 'start_station_name',
			index: 'start_station_name'
		},
		{
			label: '货源目的地',
			name: 'end_station_name',
			index: 'end_station_name'
		},
		{
			label: '货主姓名',
			name: 'shipper_name',
			index: 'shipper_name'
		},
		{
			label: '货主号码',
			name: 'shipper_phone',
			index: 'shipper_phone'
		},
		{
			label: '运费',
			name: 'freight',
			index: 'freight',
			formatter: function(value, opt, rec) {
				return parseFloat(value).toFixed(2);
			}
		},
		{
			label: '总装货吨位',
			name: 'load_net_weight_total',
			index: 'load_net_weight_total',
			formatter: function(value, opt, rec) {
				return parseFloat(value).toFixed(2);
			}
		},
		{
			label: '总卸货吨位',
			name: 'unload_net_weight_total',
			index: 'unload_net_weight_total',
			formatter: function(value, opt, rec) {
				return parseFloat(value).toFixed(2);
			}
		},
		{
			label: '总运费',
			name: 'goods_total_freight',
			index: 'goods_total_freight',
			formatter: function(value, opt, rec) {
				return parseFloat(value).toFixed(2);
			}
		},
		{
			label: '公司利润',
			name: 'service_charge_total',
			index: 'service_charge_total',
			formatter: function(value, opt, rec) {
				return parseFloat(value).toFixed(2);
			}
		},
		{
			label: '货源类型',
			name: 'level',
			index: 'level',
			formatter: function(value, opt, rec) {
			    if (value == '1') {
			        return 'A';
			    } else if (value == '2') {
			    	return 'B';
			    } else if (value == '3') {
			    	return 'C';
			    } else if (value == '4'){
			    	return 'D';
			    } else {
			    	return '';
			    }
			}
		},
		{
			label: '货源所属人',
			name: 'goods_owner_name',
			index: 'goods_owner_name'
		},
		{
			label: '开票人',
			name: 'drawer_name',
			index: 'drawer_name'
		},
		{
			label: '总需车数',
			name: 'total_require_vehicle_quantity',
			index: 'total_require_vehicle_quantity'
		},
		{
			label: '运单数量',
			name: 'delivery_quantity',
			index: 'delivery_quantity'
		},
		{
			label: '车辆总数',
			name: 'driver_quantity',
			index: 'driver_quantity'
		},
		{
			label: '司机总数',
			name: 'driver_quantity',
			index: 'driver_quantity'
		},
		{
			label: '复购率',
			name: 'repea_purchase_rate',
			index: 'repea_purchase_rate',
			formatter : function(cellvalue, options, rowObject) {
				var deliveryQuantity = rowObject.delivery_quantity;
				var driverQuantity = rowObject.driver_quantity;
				if(0 == driverQuantity){
					return 0;
				}
				return (deliveryQuantity/driverQuantity).toFixed(2);
			}
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
				var goodsId = rowObject.goods_id;
				return '<a href="javascript:void(0)" onclick="lookEverydayList(\''+goodsId+'\')">'+'每日明细'+'</a>';
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
	
	$("#advanceSearch").click("click", function() {
		advanceSearch();
	});

	$("#refresh").click("click", function() {
		refresh();
	});

	$('#expredsearch').click(function(){
		$('#expredsearch').popModal({
			html : $('#content'),
			placement : 'bottomLeft',
			showCloseBut : true,
			onDocumentClickClose : true,
			onOkBut : function(){},
			onCancelBut : function(){},
			onLoad : function(){},
			onClose : function(){}
		});
	});
	
});

function search(){
	var queryParam = $("#queryParam").val();
	grid.jqGrid('setGridParam', {
		postData: {
			queryParam: queryParam
		},
		page : 1
	}).trigger("reloadGrid");		
}

function advanceSearch(){
	var queryParam = $("#queryParam").val();
	var ownerId = $("#owner option:selected").val();
	var level = $("#level").val();
	grid.jqGrid('setGridParam', {
		postData: {
			ownerId: ownerId,
			queryParam: queryParam,
			level : level,
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		page : 1
	}).trigger("reloadGrid");		
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.selectpicker').selectpicker('refresh');
	$('.js-example-basic-single').select2({
		language: "zh-CN"
	});
	grid.jqGrid('setGridParam', {
		postData: {
			ownerId: '',
			queryParam: '',
			level : '',
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		page : 1
	}).trigger("reloadGrid");
}

function lookEverydayList(goodsId){
	parent.layer.open({
		title : "日期统计列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/deliveryStatistics/lookEverydayList.shtml?goodsId='+goodsId,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}
$(".js-example-basic-single").select2({
	  language: "zh-CN"
});