var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 160);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {

	$(".selectpicker").selectpicker({
		size: 7
	});

	$("#startDate").datetimepicker({
		format: "YYYY-MM-DD"
	});

	$("#endDate").datetimepicker({
		format: "YYYY-MM-DD"
	});


	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/location/findByPage.shtml',
		mtype: "get",
		postData: {
			deliveryId : deliveryId,
			vehicleId : vehicleId,
			userId : userId
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
			label: '经度',
			name: 'longitude',
			index: 'longitude',
			sortable: false,
			editable: false
		},
		{
			label: '纬度',
			name: 'latitude',
			index: 'latitude',
			sortable: false,
			editable: false
		},
		{
			label: '精度',
			name: 'accuracy',
			index: 'accuracy',
			sortable: false,
			editable: false
		},
		{
			label: '详细地址',
			name: 'address',
			index: 'address',
			sortable: false,
			editable: false
		},
		{
			label: '定位来源',
			name: 'source',
			index: 'source',
			formatter: function(cellValue, opt, rec) {
				if("1" == cellValue){
					return "微信";
				} else if("2" == cellValue){
					return "中交兴路";
				} else if("3" == cellValue){
					return "神州伟智";
				} else {
					return "货达定位";
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
		}],
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: true,
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
	$("#refresh").click("click",function() {
		document.getElementById("searchForm").reset();
		grid.jqGrid('setGridParam', {
			postData: {
				startDate: '',
				endDate: '',
				address : ''
			},
			page : 1
		}).trigger("reloadGrid");
	});
	$("#search").click('click',function() {
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();
		var address = $("#address").val().trim();
		grid.jqGrid('setGridParam', {
			postData: {
				startDate: startDate,
				endDate: endDate,
				address : address
			},
			page : 1
		}).trigger("reloadGrid");

	});

});


$("#position").click("click",function(){
	position();
})
function position(){
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");

	if (rowIds.length == 0) {
		parent.layer.msg('请选择运单', {
			icon: 20,
			time: 1000
		});
		return;
	}
	if (rowIds.length > 1) {
		parent.layer.msg('只能选择一个运单！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	var deliveryId = rowIds[0];
	var rowData = $('#jqGrid').jqGrid('getRowData', brokerId);
	
	parent.layer.open({
		title : "通讯录",
		type : 2,
		area : [ "90%", "90%" ],
		content : rootPath + '/delivery/positionList.shtml?deliveryId=' + deliveryId,
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
	
}


