var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 120);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/statistics/deliveryStatistics/findDeliveryDetailByCreateUser.shtml',
		mtype: "get",
		postData: {
			goodsId:goodsId,
			createTime:createTime,
			createUserId:createUserId
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
		/*{
			label: '运单编号',
			name: 'code',
			index: 'code',
		},*/
		{
			label: '运单状态',
			name: 'status',
			index: 'status',
			sortable: true,
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
			label: '创建时间',
			name: 'create_time',
			index: 'create_time',
			formatter: function(cellValue, opt, rec) {
				if ("undefined" == typeof(cellValue)) {
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
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
			label: '运费',
			name: 'freight',
			index: 'freight'
		},
		{
			label: '总运费',
			name: 'total_freight',
			index: 'total_freight'
		},
		{
			label: '服务费',
			name: 'service_charge',
			index: 'service_charge'
		},
		{
			label: '装车费',
			name: 'loading_charge',
			index: 'loading_charge',
			sortable: true,
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
			label: '卸车费',
			name: 'unloading_charge',
			index: 'unloading_charge',
			sortable: true,
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
			label: '货主补贴',
			name: 'shipper_subsidy',
			index: 'shipper_subsidy',
			sortable: true,
			editable: false
		},
		{
			label: '结算方式',
			name: 'settlement_type',
			index: 'settlement_type',
			sortable: true,
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
			sortable: true,
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
			label: '结算依据',
			name: 'settlement_condition',
			index: 'settlement_condition',
			sortable: true,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '装货磅单';
				} else if (value == '2') {
					return '卸货磅单';
				} else if (value == '3') {
					return '装卸货磅单';
				} else {
					return '未定义';
				}
			}
		},
		{
			label: '支付方式',
			name: 'payment_type',
			index: 'payment_type',
			sortable: true,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '线上支付';
				} else if (value == '2') {
					return '线下支付';
				} else {
					return '';
				}
			}
		},
		{
			label: '是否开运输税票',
			name: 'is_invoice',
			index: 'is_invoice',
			sortable: true,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '是';
				} else if (value == '0') {
					return '否';
				} else {
					return '';
				}
			}
		},
		{
			label: '是否开提煤单',
			name: 'is_bill_coal_sheet',
			index: 'is_bill_coal_sheet',
			sortable: true,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '是';
				} else if (value == '0') {
					return '否';
				} else {
					return '';
				}
			}
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
			label: '司机姓名',
			name: 'driver_name',
			index: 'driver_name'
		},
		{
			label: '司机电话',
			name: 'driver_phone',
			index: 'driver_phone'
		},
		{
			label: '司机车牌号',
			name: 'vehicle_no',
			index: 'vehicle_no'
		},
		{
			label: '磅单',
			name: '',
			index: '',
			formatter: function(cellvalue, options, rowObject) {
				var delivery = rowObject.id;
				var  loadingPound = rowObject.loading_pound;
				var  unloadingPound = rowObject.unloading_pound;
				var html = "";
				 if(typeof(loadingPound) != 'undefined' && loadingPound != null && loadingPound != ''){
					 html  += '<a href="javascript:void(0)" onclick=getLoadPoundUrl(\'loadingPound\',\'' + delivery +'\')>'+'装货磅单 '+'</a>';
				} if(typeof(unloadingPound) != 'undefined' && unloadingPound != null && unloadingPound != ''){
					 html  += '<a href="javascript:void(0)" onclick=getLoadPoundUrl(\'unloadingPound\',\'' + delivery +'\')>'+'卸货磅单 '+'</a>';
				} 
					return html;
				
				
			}
		},
		{
			label: '装货磅单',
			name: 'loading_pound',
			index: 'loading_pound',
			hidden: true
		},
		{
			label: '卸货磅单',
			name: 'unloading_pound',
			index: 'unloading_pound',
			hidden: true
		},
		{
			label: '更新时间',
			name: 'update_time',
			index: 'update_time',
			formatter: function(cellValue, opt, rec) {
				if ("undefined" == typeof(cellValue)) {
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
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
		height: (window.document.body.clientHeight - 81),
		width: (window.document.body.clientWidth - 10),
		rowNum: 20,
		pager: "#jqGridPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		}

	});

	$("#refresh").click("click", function() {
		refresh();
	});

});


function refresh(){
	grid.jqGrid('setGridParam', {
		postData: {
			goodsId:goodsId,
			createTime:createTime,
			createUserId:createUserId
		},
		page : 1
	}).trigger("reloadGrid");
}
function getLoadPoundUrl(type,deliveryId){
	 $.ajax({
		    type: "post",
		    url: rootPath + '/delivery/getLoadPoundUrl.shtml',
		    data: {
		    	id : deliveryId,
		    	type : type
		    },
		    dataType: "json",
		    success: function(data) {
		    	top.showImage(data);
		    },
		    complete: function(XMLHttpRequest, textStatus) {
		    },
		    error: function() {
		    }
		});
}
