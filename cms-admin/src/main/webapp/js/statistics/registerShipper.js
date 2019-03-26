var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 160);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {
	$(".selectpicker").selectpicker({size:7});
	
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
		url: rootPath + '/statistics/findByPageForShipper.shtml',
		mtype: "get",
		postData: {
			status : status,
			displayType : displayType,
			name : $("#name").val(),
			phone : $("#phone").val(),
			type : $("#checkType option:selected").val(),
			owner_id : $("#owner option:selected").val(),
			startDate: days,
			endDate: days,
			startArea: $("#startArea").val(),
			endArea: $("#endArea").val()
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
			
			label: '所属人',
			name: 'owner_name',
			index: 'owner_name',

		},
		{
			label: '来源',
			name: 'source',
			index: 'source',
			formatter: function(value, opt, rec) {
				if (value == '1') {
			        return '后台';
			    } else if (value == '2') {
			    	return '地推';
			    } else if (value == '4') {
			    	return '货主H5';
			    } else if(value == '5'){
			    	return '货主PC'
			    }else {
			    	return '未定义';
			    }
			}
		},
		{
			label: '是否登陆微信',
			name: 'openid',
			index: 'openid',
			formatter: function(value, opt, rec) {
				if (value != undefined) {
			        return '是';
			    } else {
			    	return '否';
			    }
			}
		},
		{
			label: '发货次数',
			name: 'delivery_times',
			index: 'delivery_times'
			
		},
		{
			label: '所属人最终拜访时间',
			name: 'owner_last_visit_time',
			index: 'owner_last_visit_time',
			formatter: function(cellValue, opt, rec) {
				if("" == cellValue || null == cellValue){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
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
			label: '创建人',
			name: 'create_user_name',
			index: 'create_user_name',
			sortable: true,
			editable: false,
			formatter: function(cellvalue, options, rowObject) {
				var createUserId = rowObject.create_user_id;
				var shipperId = rowObject.id;
				if(typeof(cellvalue) == 'undefined'){
					if(createUserId == shipperId) {
						return "货主";
					}
					return "";
				}
				return cellvalue;
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
			label: '所属企业',
			name: 'company_name',
			index: 'company_name'
		},
		{
			label: '所属部门',
			name: 'dept_name',
			index: 'dept_name'
		},
		{
			label: '类型',
			name: 'type',
			index: 'type',
			formatter: function(value, opt, rec) {
			    if (value == '1') {
			        return '老板';
			    } else if (value == '2') {
			    	return '会计';
			    } else if (value == '3') {
			    	return '业务员';
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
			    	return '已批准';
			    }else {
			    	return '未定义';
			    }
			}
		},
		{
			label: '创建人id',
			name: 'create_user_id',
			index: 'create_user_id',
			hidden: true
		},
		{
			label: '更新人id',
			name: 'update_user_id',
			index: 'update_user_id',
			hidden: true
		},
		{
			label: '更新人',
			name: 'update_user_uame',
			index: 'update_user_name',
			sortable: true,
			editable: false,
			formatter: function(cellvalue, options, rowObject) {
				var updateUserId = rowObject.update_user_id;
				var shipperId = rowObject.id;
				if(typeof(cellvalue) == 'undefined'){
					if(updateUserId == shipperId) {
						return "货主";
					}
					return "";
				}
				return cellvalue;
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
			label: '是否停用',
			name: 'is_locked',
			index: 'is_locked',
			formatter: function(value, opt, rec) {
			    if (value == '0') {
			        return '否';
			    } else if (value == '1') {
			    	return '是';
			    } else {
			    	return '未知';
			    }
			}
		},
		{
			label: '捡回时间',
			name: 'own_time',
			index: 'own_time',
			formatter: function(cellValue, opt, rec) {
				if(cellValue=="" || typeof(cellValue)=="undefined"){
					return "";
				}
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
			
		},
		{
			label: '无接单开放时间(天)',
			name: 'delivery_remain_days',
			index: 'delivery_remain_days',
			formatter: function(value, opt, rec) {
			    if (value >=0) {
			    	 return value;
			    }else{
			    	 return "";
			    }
			}
			
		},
		{
			label: '最后的成交时间',
			name: 'last_delivery_time',
			index: 'last_delivery_time',
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
			label: '无拜访开放时间(天)',
			name: 'visit_remain_days',
			index: 'visit_remain_days',
			formatter: function(value, opt, rec) {
			    if (value >=0) {
			    	 return value;
			    }else{
			    	 return "";
			    }
			}
			
		},
		{
			label: 'company_id',
			name: 'company_id',
			index: 'company_id',
			hidden: true
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
		width: (window.document.body.clientWidth - 10),
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
				displayType : displayType,
				name:$("#name").val(),
				phone:$("#phone").val(),
				type : $("#checkType option:selected").val(),
				status : $("#targetType option:selected").val(),
				owner_id : $("#owner option:selected").val(),
				startDate : days,
				endDate : days,
				startArea : $("#startArea").val(),
				endArea : $("#endArea").val(),
				queryParam : $("#queryParam").val().trim(),
				source : $("#source").val(),
				isWX : $("#isWX option:selected").val()
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#refresh").click("click", function() {
		document.getElementById("searchForm").reset();
		$('.selectpicker').selectpicker('refresh');
		$('.js-example-basic-single').select2({
			language: "zh-CN"
		});
		grid.jqGrid('setGridParam', {
			postData: {
				displayType : displayType,
				queryParam :"",
				type : "",
				status : "",
				owner_id : "",
				startArea : "",
				endArea : "",
				source : "",
				isWX : ""
			},
			page : 1
		}).trigger("reloadGrid");
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