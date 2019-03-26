var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 160);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/common/findUserByPage.shtml',
		mtype: "get",
		postData: {
			name : $("#name").val(),
			phone : $("#phone").val()
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
			label: '姓名',
			name: 'userName',
			index: 'userName',
		},
		{
			label: '电话',
			name: 'phone',
			index: 'phone'
		}],
		onSelectAll: function(aRowids, status) {
		},
		onSelectRow: function(id) {
		},
		ondblClickRow: function(rowid) {
		},
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

	//提交数据的校验
	$("#commit").click("click",
	function() {
		var rowIds = grid.jqGrid('getGridParam', "selarrrow");
		if (rowIds.length == 0) {
			parent.layer.msg('请选择地推人员！', {
				icon: 20,
				time: 1000
			});
			return;
		}
		
		
    	if (rowIds.length > 1 ) {
			parent.layer.msg('一次只能选择一个地推人员!', {
					icon: 20,
					time: 1000
			});	
			return;	
		}
		
			
	});
		
	$("#search").click("click", function() { // 绑定查询按扭
		grid.jqGrid('setGridParam', {
			postData: {
				name : $("#name").val(),
				phone : $("#phone").val(),
			},
			page : 1
		}).trigger("reloadGrid");
	});

	$("#refresh").click("click", function() {
		$('.selectpicker').selectpicker('refresh');
		grid.jqGrid('setGridParam', {
			postData: {
				name : $("#name").val(),
				phone : $("#phone").val(),
			},
			page : 1
		}).trigger("reloadGrid");
	});

});

