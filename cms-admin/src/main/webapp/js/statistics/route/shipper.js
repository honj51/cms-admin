var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 160);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 30);
	$(window).bind("onresize", this);
});

$(function() {
	$(".selectpicker").selectpicker({size:7});
	
	$("#startDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	$("#endDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/statistics/findRouteShipper.shtml',
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
			label: '货主编号',
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
			label: '所属企业',
			name: 'company_name',
			index: 'company_name'
		},
		{
			label: '类型',
			name: 'type',
			index: 'type',
			formatter: function(value, opt, rec) {
			    if (value == '1') {
			        return '老板';
			    } else if (value == '2') {
			    	return '业务员';
			    } else if (value == '3') {
			    	return '上游煤贩子';
			    } else if (value == '4') {
			    	return '下游煤贩子';
			    } else if (value == '5') {
			    	return '煤矿';
			    } else {
			    	return '未定义';
			    }
			}
		},
		{
			label: '状态',
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
			
			label: '所属人',
			name: 'userName',
			index: 'userName',

		},
		{
			label: '所属到期时间(天)',
			name: 'remain_days',
			index: 'remain_days',
			formatter: function(value, opt, rec) {
			    if (value >=0) {
			    	 return value;
			    }else{
			    	 return "";
			    }
			}
			
		},
		{
			label: '发货次数',
			name: 'delivery_times',
			index: 'delivery_times'
			
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
			label: 'owner_id',
			name: 'owner_id',
			index: 'owner_id',
			hidden: true
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
		/*{
			label: '拜访剩余时间',
			name: 'visit_remain_days',
			index: 'visit_remain_days',
			formatter: function(cellValue, opt, rec) {
				if("" == cellValue || null == cellValue){
					return "";
				}
				return cellValue;
			}
		},*/
		{
			label: '最终拜访结果',
			name: 'last_visit_result',
			index: 'last_visit_result',
			formatter: function(cellValue, opt, rec) {
				if("1" == cellValue){
					return "可发货";
				}else if("2" == cellValue){
					return "不可发货";
				}else if("3" == cellValue){
					return "无效货主";
				}else{
					return "";
				}
			}
		},
		{
			label: '创建时间',
			name: 'create_time',
			index: 'create_time',
			formatter: function(cellValue, opt, rec) {
				if(cellValue=="" || typeof(cellValue)=="undefined"){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '更新时间',
			name: 'update_time',
			index: 'update_time',
			formatter: function(cellValue, opt, rec) {
				if(cellValue=="" || typeof(cellValue)=="undefined"){
					return "";
				}
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
		shrinkToFit: true,
		sortname: 'update_time',
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
	
	
	$("#refresh").click("click", function() {
		$('.selectpicker').selectpicker('refresh');
		grid.jqGrid('setGridParam', {
			postData: {
				
			},
			page : 1
		}).trigger("reloadGrid");
	});

});
