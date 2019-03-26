var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 120);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {

	$(".selectpicker").selectpicker({
		size: 7
	});

	$("#reserveStartDate").datetimepicker({
		format: "YYYY-MM-DD"
	});

	$("#reserveEndDate").datetimepicker({
		format: "YYYY-MM-DD"
	});

	$("#finishStartDate").datetimepicker({
		format: "YYYY-MM-DD"
	});

	$("#finishEndDate").datetimepicker({
		format: "YYYY-MM-DD"
	});
	
	$("#createStartDate").datetimepicker({
		format: "YYYY-MM-DD"
	});

	$("#createEndDate").datetimepicker({
		format: "YYYY-MM-DD"
	});

	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/statistics/common/findDeliveryByPage.shtml',
		mtype: "get",
		postData: {
			ownerId: ownerId,
			goodsOwnerId: goodsOwnerId,
			createUserId: createUserId,
			driverId : driverId,
			level : level,
			status : status,
			shipperPhone: $("#shipperPhone").val(),
			driverPhone: $("#driverPhone").val(),
			reserveStartDate: $("#reserveStartDate").val(),
			reserveEndDate: $("#reserveEndDate").val(),
			createStartDate: $("#createStartDate").val(),
			createEndDate: $("#createEndDate").val(),
			goodsId : goodsId,
			dispatchingOrgId : dispatchingOrgId
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
			label: '运单号',
			name: 'code',
			index: 'code',
			sortable: false,
			editable: false
		},
		{
			label: '运单状态',
			name: 'status',
			index: 'status',
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '0') {
					return '待支付服务费';
				} else if (value == '1') {
					return '待装车';
				} else if (value == '2') {
					return '已到达';
				} else if (value == '3') {
					return '待卸车';
				} else if (value == '4') {
					return '待审核';
				} else if (value == '5') {
					return '已取消';
				}  else if (value == '6') {
					return '取消申请中';
				} else if (value == '7') {
					return '待支付运费';
				} else if (value == '8') {
					return '已完成';
				} else {
					return '未定义';
				}
			}
		},
		{
			label: '运费',
			name: 'freight',
			index: 'freight',
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '-1') {
					return '正常';
				} else {
					return value;
				}
			}
		},
		{
			label: '装车费',
			name: 'loading_charge',
			index: 'loading_charge',
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '-1') {
					return '正常';
				}  else if(value==undefined) {
					return 0;
				}else {
					return value;
				}
			}
		},
		{
			label: '卸车费',
			name: 'unloading_charge',
			index: 'unloading_charge',
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '-1') {
					return '正常';
				} else if(value==undefined) {
					return 0;
				}else {
					return value;
				}
			}
		},
		{
			label: '货主补贴',
			name: 'shipper_subsidy',
			index: 'shipper_subsidy',
			sortable: false,
			editable: false
		},
		{
			label: '结算方式',
			name: 'settlement_type',
			index: 'settlement_type',
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '货到现金';
				} else if (value == '2') {
					return '货到打卡';
				} else if (value == '3') {
					return '货到回来结算';
				} else if (value == '4') {
					return '油卡结算';
				} else if (value == '5') {
					return '货到现金+油卡';
				} else {
					return '其它';
				}
			}
		},
		{
			label: '煤种信息',
			name: 'coal_type',
			index: 'coal_type',
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '原煤';
				} else if (value == '2') {
					return '大块';
				} else if (value == '3') {
					return '38块';
				} else if (value == '4') {
					return '815块';
				} else if (value == '5') {
					return '25籽';
				} else if (value == '6') {
					return '36籽';
				} else if (value == '7') {
					return '13籽';
				} else if (value == '8') {
					return '沫煤';
				} else if (value == '9') {
					return '煤泥';
				} else if (value == '10') {
					return '水洗38块';
				} else if (value == '11') {
					return '水洗沫煤';
				} else if (value == '12') {
					return '水洗籽煤';
				} else {
					return '其它';
				}
			}
		},
		{
			label: '出发区/县',
			name: 'start_country_name',
			index: 'start_country_name',
			sortable: false,
			editable: false
		},
		{
			label: '出发站点',
			name: 'start_station_name',
			index: 'start_station_name',
			sortable: false,
			editable: false
		},
		{
			label: '目的省',
			name: 'end_province_name',
			index: 'end_province_name',
			sortable: false,
			editable: false
		},
		{
			label: '目的市',
			name: 'end_city_name',
			index: 'end_city_name',
			sortable: false,
			editable: false
		},
		{
			label: '目的区/县',
			name: 'end_country_name',
			index: 'end_country_name',
			sortable: false,
			editable: false
		},
		{
			label: '目的站点',
			name: 'end_station_name',
			index: 'end_station_name',
			sortable: false,
			editable: false
		},
		{
			label: '司机车牌号',
			name: 'vehicle_no',
			index: 'vehicle_no',
			sortable: false,
			editable: false
		},
		{
			label: '司机姓名',
			name: 'driver_name',
			index: 'driver_name',
			sortable: false,
			editable: false
		},
		{
			label: '司机电话',
			name: 'driver_phone',
			index: 'driver_phone',
			sortable: false,
			editable: false
		},
		{
			label: '货主姓名',
			name: 'shipper_name',
			index: 'shipper_name',
			sortable: false,
			editable: false
		},
		{
			label: '货主电话',
			name: 'shipper_phone',
			index: 'shipper_phone',
			sortable: false,
			editable: false
		},
		{
			label: '所属人姓名',
			name: 'owner_name',
			index: 'owner_name',
			sortable: false,
			editable: false
		},
		{
			label: '货源所属人姓名',
			name: 'goods_owner_name',
			index: 'goods_owner_name',
			sortable: false,
			editable: false
		},
		{
			label: '运单取消驳回原因',
			name: 'reject_cause',
			index: 'reject_cause'
			
		},
		{
			label: '预定时间',
			name: 'reserve_time',
			index: 'reserve_time',
			formatter: function(cellValue, opt, rec) {
				if(typeof(cellValue) == "undefined" ||cellValue =="" || cellValue ==null){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '完成时间',
			name: 'finish_time',
			index: 'finish_time',
			formatter: function(cellValue, opt, rec) {
				if ("undefined" == typeof(cellValue)) {
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '服务费',
			name: 'service_charge',
			index: 'service_charge'
		},
		{
			label: '创建人',
			name: 'create_user_name',
			index: 'create_user_name'
		},
		{
			label: '创建时间',
			name: 'create_time',
			index: 'create_time',
			formatter: function(cellValue, opt, rec) {
				if ("undefined" == typeof(cellValue)) {
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		}],
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: false,
		sortname: 'reserve_time',
		sortorder: "desc",
		height: (window.document.body.clientHeight - 120),
		width: (window.document.body.clientWidth - 10),
		rowNum: 20,
		pager: "#jqGridPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		}

	});
	$("#refresh").click("click",function() {
		$('.selectpicker').selectpicker('refresh');
		grid.jqGrid('setGridParam', {
			postData: {
				
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#search").click("click",function() {
		grid.jqGrid('setGridParam', {
			postData: {
				reserveStartDate: $("#reserveStartDate").val().trim(),
				reserveEndDate: $("#reserveEndDate").val().trim(),
				createStartDate: $("#createStartDate").val(),
				createEndDate: $("#createEndDate").val(),
				/*shipperPhone:$("#shipperPhone").val().trim(),
				driverPhone: $("#driverPhone").val().trim(),*/
				queryParam : $("#queryParam").val().trim(),
				status: $("#status option:selected").val()
			},
			page : 1
		}).trigger("reloadGrid");
			
	});

});
