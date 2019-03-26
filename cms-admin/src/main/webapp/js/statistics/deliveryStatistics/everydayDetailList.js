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
		url: rootPath + '/statistics/deliveryStatistics/findEveryDayDetailDelivery.shtml',
		mtype: "get",
		postData: {
			goodsId:goodsId,
			createTime:createTime
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
			label: 'dispatching_user_id',
			name: 'dispatching_user_id',
			index: 'dispatching_user_id',
			key: true,
			hidden: true
		},
		{
			label: 'driver_id',
			name: 'driver_id',
			index: 'driver_id',
			hidden: true
		},
		{
			label: '运单创建人',
			name: 'create_user_name',
			index: 'create_user_name',
			formatter: function(cellvalue, options, rowObject) {
				var createUserId = rowObject.dispatching_user_id;
				var driverId = rowObject.driver_id;
				if(typeof(cellvalue) == 'undefined' ) {
					return "";
				}else if(createUserId == driverId ) {	
					return cellvalue +"(司机)";
				}  else {
					return cellvalue;
				}
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
				var createUserId = rowObject.dispatching_user_id;
				return '<a href="javascript:void(0)" onclick="lookDeliveryDetailList(\''+createUserId+'\')">'+'运单详情'+'</a>';
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
		sortname: 'total_delivery',
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
			createTime:createTime
		},
		page : 1
	}).trigger("reloadGrid");
}

function lookDeliveryDetailList(createUserId){
	parent.layer.open({
		title : "运单详情列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/deliveryStatistics/lookDeliveryDetailList.shtml?goodsId='+goodsId +'&createTime=' + createTime + '&createUserId=' + createUserId,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}