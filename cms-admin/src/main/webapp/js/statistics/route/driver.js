var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 160);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 30);
	$(window).bind("onresize", this);
});

$(function() {
	$(".js-example-basic-single").select2({
		language: "zh-CN"
	});
	
	$("#startDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	$("#endDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/statistics/findRouteDriver.shtml',
		mtype: "get",
		postData: {
			startProvinceName: startProvinceName,
			startCityName: startCityName,
			startCountryName: startCountryName,
			endProvinceName: endProvinceName,
			endCityName: endCityName,
			endCountryName: endCountryName,
			startDate : startDate,
			endDate : endDate
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
			label: 'owner_id',
			name: 'owner_id',
			index: 'owner_id',
			hidden: true
		},
		{
			label: '司机编号',
			name: 'code',
			index: 'code'
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
			label: '身份证号',
			name: 'id_card_no',
			index: 'id_card_no'
		},
		{
			label: '车牌号',
			name: 'vehicle_no',
			index: 'vehicle_no'
		},
		{
			label: '是否登录微信',
			name: 'openid',
			index: 'openid',
			hidden : true
		},
		{
			label: '是否登录微信',
			name: 'openid',
			index: 'openid',
			formatter: function(value, opt, rec) {
			    if (value == null) {
			        return '否';
			    } else if (value != null) {
			    	return '是';
			    }
			}
		},
		{
			label: '是否注册易极付',
			name: 'yj_user_id',
			index: 'yj_user_id',
			formatter: function(value, opt, rec) {
			    if (value == null) {
			        return '否';
			    } else if (value != null) {
			    	return "是";
			    }
			}
		},
		{
			label: '是否开通账户',
			name: 'yj_account',
			index: 'yj_account',
			formatter: function(value, opt, rec) {
			    if (value == 1) {
			        return '是';
			    } else  {
			    	return '否';
			    }
			}
		},
		{
			label: '司机类型',
			name: 'type',
			index: 'type',
			formatter: function(value, opt, rec) {
			    if (value == '1') {
			        return '非会员';
			    } else if (value == '2') {
			    	return '普通会员';
			    } else if (value == '3') {
			    	return '黄金会员';
			    } else {
			    	return '未定义';
			    }
			}
		},
		{
			label: '接单次数',
			name: 'delivery_times',
			index: 'delivery_times',
			formatter : function(cellvalue, options, rowObject) {
				var driverId = rowObject.id;
				return '<a href="javascript:void(0)" onclick="delivery(\'' + driverId + '\')">' + cellvalue + '</a>';
			}
		},
		{
			label: '定位次数',
			name: 'location_times',
			index: 'location_times',
			formatter : function(cellvalue, options, rowObject) {
				var driverId = rowObject.id;
				return '<a href="javascript:void(0)" onclick="position(\'' + driverId + '\')">' + cellvalue + '</a>';
			}
		},
		{
			label: '所属人',
			name: 'userName',
			index: 'userName'
		},
		{
			label: '最终拜访时间',
			name: 'last_visit_time',
			index: 'last_visit_time',
			formatter: function(cellValue, opt, rec) {
				if("" == cellValue || null == cellValue){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '最终拜访结果',
			name: 'last_visit_result',
			index: 'last_visit_result',
			formatter: function(cellValue, opt, rec) {
				if("1" == cellValue){
					return "可派车";
				}else if("2" == cellValue){
					return "不可派车";
				}else if("3" == cellValue){
					return "无效司机";
				}else{
					return "";
				}
			}
		},
		{
			label: '拜访剩余时间',
			name: 'visit_remain_days',
			index: 'visit_remain_days',
			formatter: function(cellValue, opt, rowObject) {
				var type = rowObject["type"];
				var ownerId = rowObject["owner_id"];
				if("1" != type || "undefined" == typeof(cellValue) || "undefined" == typeof(ownerId)){
					return "";
				}
				return cellValue;
			}
		},
		{
			label: '运单剩余时间',
			name: 'delivery_remain_days',
			index: 'delivery_remain_days',
			formatter: function(cellValue, opt, rowObject) {
				var type = rowObject["type"];
				var ownerId = rowObject["owner_id"];
				if("1" != type || "undefined" == typeof(cellValue) || "undefined" == typeof(ownerId)){
					return "";
				}
				return cellValue;
			}
		},
		{
			label: 'owner_name',
			name: 'owner_name',
			index: 'owner_name',
			hidden: true
		},
		{
			label: '审核状态',
			name: 'status',
			index: 'status',
			formatter: function(value, opt, rec) {
			    if (value == '1') {
			        return '待审核';
			    } else if (value == '2') {
			    	return '已驳回';
			    } else if(value == '3'){
			    	return '已批准'
			    }else {
			    	return '未定义';
			    }
			}
		},
		{
			label: '审核时间',
			name: 'audit_time',
			index: 'audit_time',
			formatter: function(cellValue, opt, rec) {
				if("" == cellValue || null == cellValue){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '保险公司',
			name: 'insurance_company',
			index: 'insurance_company'			
		},
		{
			label: '保险到期日期',
			name: 'insurance_expiration_date',
			index: 'insurance_expiration_date',			
			formatter: function(cellValue, opt, rec) {
				if("" == cellValue || null == cellValue){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd");
			}
		},
		{
			label: '创建时间',
			name: 'create_time',
			index: 'create_time',
			formatter: function(cellValue, opt, rec) {
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},{
			label: '更新时间',
			name: 'update_time',
			index: 'update_time',
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
		shrinkToFit: false,
		sortname: 'create_time',
		sortorder: "desc",
		height: (window.document.body.clientHeight - 160),
		width: (window.document.body.clientWidth - 30),
		rowNum: 20,
		pager: "#jqGridPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		}

	});

	$("#search").click("click", function() {
		grid.jqGrid('setGridParam', {
			postData: {
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val()
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	
});