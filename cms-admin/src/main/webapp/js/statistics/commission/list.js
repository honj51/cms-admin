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
		url: rootPath + '/statistics/commission/findByPage.shtml',
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
			label: 'user_id',
			name: 'user_id',
			index: 'user_id',
			hidden : true
		},
		{
			label: '姓名',
			name: 'userName',
			index: 'userName'
		},
		{
			label: '司机提成',
			name: 'driver_commission',
			index: 'driver_commission',
			formatter : function(cellvalue, options, rowObject) {
				var userId = rowObject.user_id;
				return '<a href="javascript:void(0)" onclick="driverCommission(\'' + userId + '\')">' + cellvalue.toFixed(2) + '</a>';
			}
		},
		{
			label: '货源提成',
			name: 'goods_commission',
			index: 'goods_commission',
			formatter : function(cellvalue, options, rowObject) {
				var userId = rowObject.user_id;
				return '<a href="javascript:void(0)" onclick="goodsCommission(\'' + userId + '\')">' + cellvalue.toFixed(2) + '</a>';
			}
		},
		{
			label: '开提煤单提成',
			name: 'drawer_commission',
			index: 'drawer_commission',
			formatter : function(cellvalue, options, rowObject) {
				var userId = rowObject.user_id;
				return '<a href="javascript:void(0)" onclick="drawerCommission(\'' + userId + '\')">' + cellvalue.toFixed(2) + '</a>';
			}
		},
		{
			label: '派车提成',
			name: 'delivery_commission',
			index: 'delivery_commission',
			formatter : function(cellvalue, options, rowObject) {
				var userId = rowObject.user_id;
				return '<a href="javascript:void(0)" onclick="deliveryCommission(\'' + userId + '\')">' + cellvalue.toFixed(2) + '</a>';
			}
		},
		{
			label: '会员费提成',
			name: 'member_commission',
			index: 'member_commission',
			formatter : function(cellvalue, options, rowObject) {
				var userId = rowObject.user_id;
				return '<a href="javascript:void(0)" onclick="driverMemberCommission(\'' + userId + '\')">' + cellvalue.toFixed(2) + '</a>';
			}
		},
		{
			label: '合计',
			name: 'total',
			index: 'total',
			formatter : function(cellvalue, options, rowObject) { 
				return  cellvalue.toFixed(2);
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
		sortname: 'total',
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
	
	$("#recalculate").click("click", function() {
		recalculate();
	});

});

function recalculate(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	if(startDate =='' || endDate == ''){
		parent.layer.msg('请输入日期！', {icon : 0, time: 1000});
		return;
	}
	top.ajaxLoading();
	 $.ajax({
		    type: "post",
		    url: rootPath + '/statistics/commission/recalculate.shtml',
		    data: {
		    	startDate : startDate,
		    	endDate : endDate
		    },
		    dataType: "json",
		    beforeSend: function() {
		    },
		    success: function(data) {
		    	top.ajaxLoadEnd();
		    	grid.jqGrid('setGridParam', {
		    	}).trigger("reloadGrid");
		    },
		    complete: function(XMLHttpRequest, textStatus) {
		    },
           error: function() {
		    	top.ajaxLoadEnd();
		    	parent.layer.msg('计算失败！', {icon : 2, time: 1000});
		    }
		});
}

function search(){
	var salesId = $("#sales option:selected").val();
	grid.jqGrid('setGridParam', {
		postData: {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val(),
			salesId:salesId
		},
		page : 1
	}).trigger("reloadGrid");
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.js-example-basic-single').select2({
		language: "zh-CN"
	});
	grid.jqGrid('setGridParam', {
		postData: {
			startDate :  $("#startDate").val(),
			endDate : $("#endDate").val(),
			salesId:''
		},
		page : 1
	}).trigger("reloadGrid");
}

function driverCommission(userId){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "运单列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/common/delivery.shtml?ownerId=' + userId + '&startDate=' + startDate + '&endDate=' + endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function goodsCommission(userId){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "运单列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/common/delivery.shtml?goodsOwnerId=' + userId + '&startDate=' + startDate + '&endDate=' + endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function drawerCommission(userId){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "运单列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/common/delivery.shtml?createUserId=' + userId + '&startDate=' + startDate + '&endDate=' + endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function deliveryCommission(userId){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "运单列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/common/delivery.shtml?createUserId=' + userId + '&startDate=' + startDate + '&endDate=' + endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function driverMemberCommission(userId){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	parent.layer.open({
		title : "司机会员列表",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/statistics/common/driverMember.shtml?ownerId=' + userId + '&startDate=' + startDate + '&endDate=' + endDate,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}
$(".js-example-basic-single").select2({
	  language: "zh-CN"
});
