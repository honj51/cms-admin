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
		url: rootPath + '/statistics/findByPageForBroker.shtml',
		mtype: "get",
		postData: {
			quaryParam : $("#quaryParam").val().trim(),
			startDate: days,
			endDate: days
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
			label: '经纪人编号',
			name: 'code',
			index: 'code',
			hidden: true
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
			
			label: '所属公司',
			name: 'companyName',
			index: 'companyName',

		},
		{
			label: '来源',
			name: 'source',
			index: 'source',
			formatter: function(value, opt, rec) {
				if (value == '1') {
			        return '后台';
			    } else if (value == '6') {
			    	return '经纪人H5';
			    } else if(value == '7'){
			    	return '经纪人PC'
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
			label: '接单次数',
			name: 'delivery_times',
			index: 'delivery_times'
			
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
				var brokerId = rowObject.id;
				if(typeof(cellvalue) == 'undefined'){
					if(createUserId == brokerId) {
						return "经纪人";
					}
					return "";
				}
				return cellvalue;
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
				status : $("#targetType option:selected").val(),
				startDate : days,
				endDate : days,
				quaryParam : $("#quaryParam").val().trim(),
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
				quaryParam :"",
				status : "",
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