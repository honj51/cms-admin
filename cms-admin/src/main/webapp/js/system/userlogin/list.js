var pageii = null;
var grid = null;

var tableHeight = function() {
	return window.document.body.clientHeight  - 220;
};
var tableWidth = function() {
	return window.document.body.clientWidth-30;
};
$(window).resize(function(){ 
	$(window).unbind("onresize");
	grid.setGridHeight(tableHeight()); 
	grid.setGridWidth(tableWidth()); 
	$(window).bind("onresize", this); 
});

$(function()  {
	grid=$("#jqGrid").jqGrid({
        url: rootPath + '/userlogin/findByPage.shtml',
        mtype: "POST",
		styleUI : 'Bootstrap',
        datatype: "json",
        colModel: [
            { label: '主键', name: 'id', index:'id', key: true,hidden:true},
		    { label: '序号', name: "rowNumber",
		    			index : 'rowNumber',
		    			width: 50,
		    			sortable: false,
		    			resizable: false,
		    			hidedlg: true,
		    			search: false, 
		    			align: "center",
		    			fixed: true,
		    			formatter: function () {
				              var p = $(this).jqGrid("getGridParam");
				                  rn = p.curRowNum +
				                      (parseInt(p.page, 10) - 1)*parseInt(p.rowNum, 10);
				              p.curRowNum++;
				              return rn.toString();
		    	          } },
            { label: '用户', name: 'accountName', index:'accountName'},
            { label: '姓名', name: 'userName', index:'userName'},
            { label: '联系电话', name: 'phone', index:'phone'},
            { label: '登入时间', name: 'loginTime', index:'loginTime',formatter:function(cellvalue, options, rowObject){
            		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
            }},
            { label: '登入IP', name: 'loginIP', index:'loginIP'} 
        ],
        altRows: true,
        altclass:'altRowsClass',
		viewrecords: true,
		multiselect:true,
		autowidth: false, 
		shrinkToFit: true,
		height : tableHeight(),
		width : tableWidth(),
        sortname: 'loginTime',
        sortorder: "desc",
        rowNum: 20,
        curRowNum: 1,
        pager: "#jqGridPager",
		loadComplete: function () {
            var p = $(this).jqGrid("getGridParam");
            p.curRowNum = 1;
        }
	});
	$("#searchLoginLog").click("click", function() {// 绑定查询按扭
		$("#jqGrid").jqGrid('setGridParam', {
	        url: rootPath + "/userlogin/findByPage.shtml",
	        mtype: "get",
	        postData: {
	        	quaryParam: $("#accountName").val().trim()
	        },
	        page: 1
	    });
	    $("#jqGrid").trigger('reloadGrid');
	});
	
	$("#refreshbutton").click("click", function() {
		document.getElementById("searchForm").reset();
		$('.selectpicker').selectpicker('refresh');
		grid.jqGrid('setGridParam', {
			postData: {
				quaryParam : ''
			},
			page : 1
		}).trigger("reloadGrid");
	});
});
