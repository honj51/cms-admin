$(document).ready(function() {

	function tableHeight() {
		return $(window).height() - 190
	}

	$("#jqGrid").jqGrid({
		url: rootPath + '/common/findDriverByPage.shtml',
		postData: {
			name : $("#name").val(),
			phone : $("#phone").val()
		},
		mtype: "get",
		styleUI: 'Bootstrap',
		datatype: "json",
		curRowNum: 1,
		colModel: [{
			label: 'id',
			name: 'id',
			index: 'id',
			sortable: false,
			editable: false,
			hidden: true
		},
		{
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
				var p = $(this).jqGrid("getGridParam");
				var rn = p.curRowNum + (parseInt(p.page, 10) - 1) * parseInt(p.rowNum, 10);
				p.curRowNum++;
				return rn.toString();
			}
		},
		{
			label: '号码',
			name: 'check_state_user_id',
			index: 'check_state_user_id',
			sortable: false,
			editable: false
		},
		{
			label: '姓名',
			name: 'name',
			index: 'name',
			sortable: false,
			editable: false
		},
		{
			label: '电话',
			name: 'tel',
			index: 'tel',
			sortable: false,
			editable: false
		},
		{
			label: '车牌号',
			name: 'vehicle_no',
			index: 'vehicle_no',
			sortable: false,
			editable: false
		},
		{
			label: '车队',
			name: 'team_id',
			index: 'team_id',
			sortable: false,
			editable: false
		},
		{
			label: '状态',
			name: 'status',
			index: 'status',
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '有效';
				} else if (value == '0') {
					return '无效';
				}
			}
		},
		{
			label: '审核状态',
			name: 'check_state',
			index: 'check_state',
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if (value == '1') {
					return '审核通过';
				} else if (value == '0') {
					return '未验证';
				}
			}
		},
		{
			label: '所属用户',
			name: 'user_code',
			index: 'user_code',
			sortable: false,
			editable: false
		},
		{
			label: '注册时间',
			name: 'reg_date',
			index: 'reg_date',
			sortable: false,
			editable: false,
			formatter: function(cellValue, opt, rec) {
				return new Date(cellValue).format("yyyy-MM-dd hh:mm:ss");
			}
		}],
		viewrecords: true,
		shrinkToFit: true,
		sortname: 'update_time',
		sortorder: "desc",
		autowidth: true,
		height: tableHeight(),
		multiselect: false,
		rowNum: 20,
		pager: "#jqGridPager",
		loadComplete: function() {
			var gridParam = $(this).jqGrid("getGridParam");
			gridParam.curRowNum = 1;
		}
	});

	$("#search").click("click", function() {
		search();
	});

	$("#confirm").click("click", function() {
		confirm();
	});

});

function search(){
	$("#jqGrid").jqGrid('setGridParam', {
		postData: {
			name: $("#name").val(),
			phone: $("#phone").val()
		},
		page : 1
	}).trigger("reloadGrid");
}

function confirm() {
	var id = $("#jqGrid").jqGrid('getGridParam','selrow');
	
	if(null == id){
		parent.layer.msg('请选择司机！', {
			icon : 0,
			time: 1000
		});
		return;
	}
	
	var rowData = $("#jqGrid").jqGrid('getRowData', id);
	parent.driverCallback(id, rowData.name, rowData.tel);
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 315);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 20);
	$(window).bind("onresize", this);
});