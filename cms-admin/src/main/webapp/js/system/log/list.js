var dialog;
var grid;
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
	//-----------------------初始化grid---------------------------/
	grid=$("#jqGrid").jqGrid({
        url: rootPath + '/log/findByPage.shtml',
        mtype: "GET",
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
            { label: '模块', name: 'module', index:'module'},
            { label: '方法', name: 'methods', index:'methods'},
            { label: '响应时间', name: 'actionTime', index:'actionTime'},
            { label: 'IP地址', name: 'userIP', index:'userIP'},
            { label: '执行时间', name: 'operTime', index:'operTime',formatter:function(cellvalue, options, rowObject){
            		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
            }},
			 { label: '执行描述', name: 'description', index:'description'}
        ],
        altRows: true,
        altclass:'altRowsClass',
        multiselect:true,
		viewrecords: true,
		autowidth: false, 
		shrinkToFit: true,
		height : tableHeight(),
		width : tableWidth(),
        sortname: 'operTime',
        sortorder: "desc",
        rowNum: 20,
        curRowNum: 1,
        pager: "#jqGridPager",
		loadComplete: function () {
            var p = $(this).jqGrid("getGridParam");
            p.curRowNum = 1;
        }
	});
	
	$("#searchLog").click("click", function() {//绑定查询按扭
		$("#jqGrid").jqGrid('setGridParam', {
			postData : {
				queryParam : $("#queryParam").val().trim()
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#refreshbutton").click("click", function() {
		document.getElementById("searchForm").reset(); 
		$("#jqGrid").jqGrid('setGridParam', {
			postData : {
				queryParam : ''
			},
			page : 1
		}).trigger("reloadGrid");
	});
});