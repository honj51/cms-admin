var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 260);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {
	$(".selectpicker").selectpicker({size:7 });
	
	$("#startDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	$("#endDate").datetimepicker({
		format:"YYYY-MM-DD"
	});
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/statistics/common/findDriverMemberByPage.shtml',
		mtype: "get",
		postData: {
			ownerId : ownerId,
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
			name: 'id',
			index: 'id',
			hidden: true
		},
		{
			label: '司机id',
			name: 'driver_id',
			index: 'driver_id',
			hidden: true
		},
		{
			label: '司机姓名',
			name: 'driver_name',
			index: 'driver_name'
		},
		{
			label: '车牌号',
			name: 'vehicle_no',
			index: 'vehicle_no'
		},
		{
			label: '电话',
			name: 'driver_phone',
			index: 'driver_phone'
		},
		{
			label: '缴费时间',
			name: 'payment_date',
			index: 'payment_date',
			formatter: function(cellValue, opt, rec) {
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '到期时间',
			name: 'due_date',
			index: 'due_date',
			formatter: function(cellValue, opt, rec) {
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
			
		},
		{
			label: '缴费金额',
			name: 'payment_amount',
			index: 'payment_amount'
		},
		{
			label: '是否支付',
			name: 'is_paid',
			index: 'is_paid',
			formatter: function(cellValue, opt, rec) {
				if("1" == cellValue){
					return "是";
				}else if("0" == cellValue){
					return "否";
				}else{
					return "未定义";
				}
			}
		},
		{
			label: '会员类型',
			name: 'member_type',
			index: 'member_type',
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
			label: '所属人',
			name: 'owner_name',
			index: 'owner_name'
		},
		{
			label: '更新时间',
			name: 'update_time',
			index: 'update_time',
			formatter: function(cellValue, opt, rec) {
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label: '创建时间',
			name: 'create_time',
			index: 'create_time',
			formatter: function(cellValue, opt, rec) {
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
		shrinkToFit: true,
		sortname: 'update_time',
		sortorder: "desc",
		height: (window.document.body.clientHeight - 180),
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
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val(),
				driverName : $("#driverName").val().trim(),
				driverPhone : $("#driverPhone").val().trim(),
				carNo : $("#carNo").val().trim()			
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
	
	$("#exportExcel").click("click", function() {
		exportExcel();
	});
});

function exportExcel(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var driverName = $("#driverName").val().trim();
	var driverPhone = $("#driverPhone").val().trim();
	var carNo = $("#carNo").val().trim();
	var owner = $("#owner").val();
	var isPaid = $("#isPaid").val();
	var driverId = driverId;
	window.location.href = rootPath + '/driverMember/exportExcel.shtml?startDate='+startDate+'&endDate='+endDate+'&driverName='+driverName+'&driverPhone='+driverPhone+'&carNo='+carNo+'&owner='+owner+'&isPaid='+isPaid+'&driverId='+driverId;
}


function edit(){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	var rowData = $('#jqGrid').jqGrid('getRowData', rowIds[0]);
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	if (rowIds.length > 1) {
		parent.layer.msg('只能选择一条数据进行修改！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	parent.layer.open({
		title : "修改会员",
		type : 2,
		area : [ "80%", "80%" ],
		content : rootPath + '/driverMember/editUI.shtml?id=' + rowIds[0],
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function del(){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	var rowData = $('#jqGrid').jqGrid('getRowData', rowIds[0]);
	var isPaid = rowData.is_paid;
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	parent.layer.confirm('确定要删除会员记录吗？', function(index) {
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/driverMember/deleteEntity.shtml',
			    data: {
			        ids: rowIds.toString()
			    },
			    dataType: "json",
			    beforeSend: function() {
			    },
			    success: function(response) {
			    	top.ajaxLoadEnd();
			    	if(response == "success"){
				    	parent.layer.msg('删除成功！', {icon : 1, time: 1000});
			    	}else{
			    		parent.layer.msg('删除失败！', {icon : 2, time: 1000});
			    	}
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					
					$("#jqGrid").trigger("reloadGrid");
			    },
			    complete: function(XMLHttpRequest, textStatus) {
			    },
	            error: function() {
			    	top.ajaxLoadEnd();
			    	parent.layer.msg('删除失败！', {icon : 2, time: 1000});
			    	var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
					
					$("#jqGrid").trigger("reloadGrid");
			    }
			});
	});
	
}