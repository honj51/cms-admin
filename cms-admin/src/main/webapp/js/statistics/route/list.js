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
		url: rootPath + '/statistics/findRouteStatsByPage.shtml',
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
			label: '出发省',
			name: 'start_province_name',
			index: 'start_province_name'
		},
		{
			label: '出发市',
			name: 'start_city_name',
			index: 'start_city_name'
		},
		{
			label: '出发区/县',
			name: 'start_country_name',
			index: 'start_country_name'
		},
		{
			label: '到达省',
			name: 'end_province_name',
			index: 'end_province_name'
		},
		{
			label: '到达市',
			name: 'end_city_name',
			index: 'end_city_name'
		},
		{
			label: '到达区/县',
			name: 'end_country_name',
			index: 'end_country_name'
		},
		{
			label: '拉货总数',
			name: 'delivery_quantity',
			index: 'delivery_quantity',
			formatter : function(cellvalue, options, rowObject) {
				var startProvinceName = rowObject.start_province_name;
				if(typeof(startProvinceName) == 'undefined'){
					startProvinceName = '';
				}
				var startCityName = rowObject.start_city_name;
				if(typeof(startCityName) == 'undefined'){
					startCityName = '';
				}
				var startCountryName = rowObject.start_country_name;
				if(typeof(startCountryName) == 'undefined'){
					startCountryName = '';
				}
				var endProvinceName = rowObject.end_province_name;
				if(typeof(endProvinceName) == 'undefined'){
					endProvinceName = '';
				}
				var endCityName = rowObject.end_city_name;
				if(typeof(endCityName) == 'undefined'){
					endCityName = '';
				}
				var endCountryName = rowObject.end_country_name;
				if(typeof(endCountryName) == 'undefined'){
					endCountryName = '';
				}
				return '<a href="javascript:void(0)" onclick="delivery(\''+startProvinceName+'\',\''+startCityName+'\',\''+startCountryName+'\',\''+endProvinceName+'\',\''+endCityName+'\',\''+endCountryName+'\')">' + cellvalue + '</a>';
			}
		},
		{
			label: '货主总数',
			name: 'shipper_quantity',
			index: 'shipper_quantity',
			formatter : function(cellvalue, options, rowObject) {
				var startProvinceName = rowObject.start_province_name;
				if(typeof(startProvinceName) == 'undefined'){
					startProvinceName = '';
				}
				var startCityName = rowObject.start_city_name;
				if(typeof(startCityName) == 'undefined'){
					startCityName = '';
				}
				var startCountryName = rowObject.start_country_name;
				if(typeof(startCountryName) == 'undefined'){
					startCountryName = '';
				}
				var endProvinceName = rowObject.end_province_name;
				if(typeof(endProvinceName) == 'undefined'){
					endProvinceName = '';
				}
				var endCityName = rowObject.end_city_name;
				if(typeof(endCityName) == 'undefined'){
					endCityName = '';
				}
				var endCountryName = rowObject.end_country_name;
				if(typeof(endCountryName) == 'undefined'){
					endCountryName = '';
				}
				return '<a href="javascript:void(0)" onclick="shipper(\''+startProvinceName+'\',\''+startCityName+'\',\''+startCountryName+'\',\''+endProvinceName+'\',\''+endCityName+'\',\''+endCountryName+'\')">' + cellvalue + '</a>';
			}
		},
		{
			label: '司机总数',
			name: 'driver_quantity',
			index: 'driver_quantity',
			formatter : function(cellvalue, options, rowObject) {
				var startProvinceName = rowObject.start_province_name;
				if(typeof(startProvinceName) == 'undefined'){
					startProvinceName = '';
				}
				var startCityName = rowObject.start_city_name;
				if(typeof(startCityName) == 'undefined'){
					startCityName = '';
				}
				var startCountryName = rowObject.start_country_name;
				if(typeof(startCountryName) == 'undefined'){
					startCountryName = '';
				}
				var endProvinceName = rowObject.end_province_name;
				if(typeof(endProvinceName) == 'undefined'){
					endProvinceName = '';
				}
				var endCityName = rowObject.end_city_name;
				if(typeof(endCityName) == 'undefined'){
					endCityName = '';
				}
				var endCountryName = rowObject.end_country_name;
				if(typeof(endCountryName) == 'undefined'){
					endCountryName = '';
				}
				return '<a href="javascript:void(0)" onclick="driver(\''+startProvinceName+'\',\''+startCityName+'\',\''+startCountryName+'\',\''+endProvinceName+'\',\''+endCityName+'\',\''+endCountryName+'\')">' + cellvalue + '</a>';
			}
		},
		{
			label: '服务费总额',
			name: 'service_charge',
			index: 'service_charge',
			formatter: function(value, opt, rec) {
				return parseFloat(value).toFixed(2);
			}
		},
		{
			label: '装货净重总计',
			name: 'load_net_weight',
			index: 'load_net_weight',
			formatter: function(value, opt, rec) {
				return parseFloat(value).toFixed(2);
			}
		},
		{
			label: '卸货净重总计',
			name: 'unload_net_weight',
			index: 'unload_net_weight',
			formatter: function(value, opt, rec) {
				return parseFloat(value).toFixed(2);
			}
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
		sortname: 'delivery_quantity',
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
	
	$("#exportExcel").click("click",function() {
		exportExcel();
	});
	
});

function search(){
	grid.jqGrid('setGridParam', {
		postData: {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val(),
			startArea : $("#startArea").val(),
			endArea : $("#endArea").val()
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
			endDate : $("#endDate").val(),
			startArea : '',
			endArea : ''
		},
		page : 1
	}).trigger("reloadGrid");
}
function delivery(startProvinceName,startCityName,startCountryName,endProvinceName,endCityName,endCountryName){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "运单列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/delivery.shtml?startProvinceName=' + startProvinceName + '&startCityName=' + startCityName + '&startCountryName=' + startCountryName+ '&endProvinceName=' + endProvinceName + '&endCityName=' + endCityName+'&endCountryName=' + endCountryName+'&startDate='+startDate+'&endDate='+endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}
function shipper(startProvinceName,startCityName,startCountryName,endProvinceName,endCityName,endCountryName){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "货主列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/routeShipper.shtml?startProvinceName=' + startProvinceName + '&startCityName=' + startCityName + '&startCountryName=' + startCountryName+ '&endProvinceName=' + endProvinceName + '&endCityName=' + endCityName+'&endCountryName=' + endCountryName+'&startDate='+startDate+'&endDate='+endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}
function driver(startProvinceName,startCityName,startCountryName,endProvinceName,endCityName,endCountryName){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "司机列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/routeDriver.shtml?startProvinceName=' + startProvinceName + '&startCityName=' + startCityName + '&startCountryName=' + startCountryName+ '&endProvinceName=' + endProvinceName + '&endCityName=' + endCityName+'&endCountryName=' + endCountryName+'&startDate='+startDate+'&endDate='+endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function exportExcel() {
	var startArea = $("#startArea").val();
	var endArea = $("#endArea").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	window.location.href = rootPath + '/route/exportExcel.shtml?startArea='+startArea+'&endArea='+endArea+'&startDate='+startDate+'&endDate='+endDate;
}