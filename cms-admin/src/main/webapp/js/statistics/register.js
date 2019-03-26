var pageii = null;
var gridShipper = null;
var gridBroker = null;
var gridDriver = null;
var type = "shipper";
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 260);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});

$(function() {
	$("#startDate").datetimepicker({
		format: "YYYY-MM-DD"
	});
	
	$("#endDate").datetimepicker({
		format: "YYYY-MM-DD"
	});
	
	gridShipper = $("#jqGridShipper").jqGrid({
		url: rootPath + '/shipper/findRegisterStats.shtml',
		mtype: "get",
		postData: {
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
			hidedlg:true,
			search: false,
			key: true,
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
			label : '日期',
			name : 'days',
			index : 'days',
			sortable : true,
			editable : false
		},
		{
			label : '注册量',
			name : 'registerQuantity',
			index : 'registerQuantity',
			sortable : true,
			editable : false,
			formatter: function(value, opt, rec) {
				var days = rec.days;
				if(typeof(value) == 'undefined') {
					value = '';
				}
				return '<a href="javascript:void(0)" onclick= lookShipperInfo(\'' + days + '\')>' + value + '</a>';
			}
		},
		],
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: true,
		sortname : 'days', 
		sortorder: "desc",
		height: (window.document.body.clientHeight - 260),
		width: (window.document.body.clientWidth - 10),
		rowNum:20,
		rowList:[20,50,100,200,300,500],
		pager: "#jqGridShipperPager",
		loadComplete: function() {
			var p = $(this).jqGrid("getGridParam");
			p.curRowNum = 1;
		},
		gridComplete: function() {
			countAll("jqGridShipper");
		}
	});
	
	$("a[href='#broker'").click(function(e){
		type = "broker";
		var source = $("#souce option:selected").val();
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();
		gridBroker = $("#jqGridBroker").jqGrid({
			url: rootPath + '/brokerUser/findRegisterStats.shtml',
			mtype: "get",
			postData: {
				startDate : startDate,
				endDate : endDate,
				source : source
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
				hidedlg:true,
				search: false,
				key: true,
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
				label : '日期',
				name : 'days',
				index : 'days',
				sortable : true,
				editable : false
			},
			{
				label : '注册量',
				name : 'registerQuantity',
				index : 'registerQuantity',
				sortable : true,
				editable : false,
				formatter: function(value, opt, rec) {
					var days = rec.days;
					if(typeof(value) == 'undefined') {
						value = '';
					}
					return '<a href="javascript:void(0)" onclick= lookBrokerInfo(\'' + days + '\')>' + value + '</a>';
				}
			},
			],
			multiselect: true,
			viewrecords: true,
			autowidth: false,
			shrinkToFit: true,
			sortname : 'days', 
			sortorder: "desc",
			height: (window.document.body.clientHeight - 260),
			width: (window.document.body.clientWidth - 10),
			rowNum:20,
			rowList:[20,50,100,200,300,500],
			pager: "#jqGridBrokerPager",
			loadComplete: function() {
				var p = $(this).jqGrid("getGridParam");
				p.curRowNum = 1;
			},
			gridComplete: function() {
				countAll("jqGridBroker");
			}
		});
		
		tabBroker(e);
	});
	
	$("a[href='#driver'").click(function(e){
		type = "driver";
		var source = $("#souce option:selected").val();
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();
		gridDriver = $("#jqGridDriver").jqGrid({
			url: rootPath + '/driver/findRegisterStats.shtml',
			mtype: "get",
			postData: {
				startDate : startDate,
				endDate : endDate,
				source : source
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
				hidedlg:true,
				search: false,
				key: true,
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
				label : '日期',
				name : 'days',
				index : 'days',
				sortable : true,
				editable : false
			},
			{
				label : '注册量',
				name : 'registerQuantity',
				index : 'registerQuantity',
				sortable : true,
				editable : false
			},
			],
			multiselect: true,
			viewrecords: true,
			autowidth: false,
			shrinkToFit: true,
			sortname : 'days', 
			sortorder: "desc",
			height: (window.document.body.clientHeight - 260),
			width: (window.document.body.clientWidth - 10),
			rowNum:20,
			rowList:[20,50,100,200,300,500],
			pager: "#jqGridDriverPager",
			loadComplete: function() {
				var p = $(this).jqGrid("getGridParam");
				p.curRowNum = 1;
			},
			gridComplete: function() {
				 countAll("jqGridDriver");
			}
		});
		tabDriver(e);
	});
	
	$("#exportExcel").click("click", function() {
		exportExcel();
	});
	
	$("#refresh").click("click", function() {
		document.getElementById("searchForm").reset();
		$('.selectpicker').selectpicker('refresh');
		$("a[href='#shipper'").click();
	});
	
	$("#search").click("click", function() {
		$("a[href='#shipper'").click();
	});
	
	//tab点击事件
	$("a[href='#shipper'").click(function(e){
		type = "shipper"
		tabShipper(e);
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
})

function exportExcel(){
	var source = $("#source option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var url = rootPath;
	if(type == "shipper"){
		url += '/shipperRegister/exportExcel.shtml?';
	}else if(type == "broker"){
		url += '/brokerRegister/exportExcel.shtml?';
	}else if(type == "driver"){
		url += '/driverRegister/exportExcel.shtml?';
	}
	if("" != source){
		url += '&source=' + source;
	}
	if("" != startDate){
		url += '&startDate=' + startDate;
	}
	if("" != endDate){
		url += '&endDate=' + endDate;
	}
	window.location.href = url;
}

function lookShipperInfo(days){
	parent.layer.open({
		title: "货主注册信息",
		type: 2,
		area: ["80%", "80%"],
		content: rootPath + '/statistics/registerShipperUI.shtml?days='+days,
		maxmin: true,
		end: function() {
			$("#jqGrid").trigger('reloadGrid');
		}
	});
}

function lookBrokerInfo(days){
	parent.layer.open({
		title: "经纪人注册信息",
		type: 2,
		area: ["80%", "80%"],
		content: rootPath + '/statistics/registerBrokerUI.shtml?days='+days,
		maxmin: true,
		end: function() {
			$("#jqGrid").trigger('reloadGrid');
		}
	});
}
function tabShipper(e){
	$(this).tab('show');
	//e.preventDefault(); //阻止a标签的默认行为
	var source = $("#source option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	gridShipper.jqGrid('setGridParam', {
		postData: {
			source : source,
    	   startDate : startDate,
    	   endDate : endDate
		},
		page : 1
	}).trigger("reloadGrid");
}

function tabBroker(e){
	$(this).tab('show');
	e.preventDefault(); //阻止a标签的默认行为
	var source = $("#source option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	gridBroker.jqGrid('setGridParam', {
		postData: {
			source : source,
    	   startDate : startDate,
    	   endDate : endDate
		},
		page : 1
	}).trigger("reloadGrid");
	
}

function tabDriver(e){
	$(this).tab('show');
	e.preventDefault(); //阻止a标签的默认行为
	var source = $("#source option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	gridDriver.jqGrid('setGridParam', {
		postData: {
			source : source,
    	   startDate : startDate,
    	   endDate : endDate
		},
		page : 1
	}).trigger("reloadGrid");
}

function countAll(id){
	var source = $("#source").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	if('jqGridShipper' == id){
		$.ajax({
			async : false,
			cache : false,
			type : 'get',
			dataType : "json",
			url : rootPath + '/shipper/countRegisterAll.shtml',
			data : {
				source: source,
				startDate : startDate,
				endDate : endDate
			},
			error : function() {
				parent.layer.msg('请求失败！', {
					icon : 2,
					time : 1000
				});
			},
			success : function(data) {
				$("#pageCountAll").text(data[1]);
				$("#pageCount").text(data[0]);
			}
		});
	}else if('jqGridBroker' == id){
		$.ajax({
			async : false,
			cache : false,
			type : 'get',
			dataType : "json",
			url : rootPath + '/brokerUser/countRegisterAll.shtml',
			data : {
				source: source,
				startDate : startDate,
				endDate : endDate
			},
			error : function() {
				parent.layer.msg('请求失败！', {
					icon : 2,
					time : 1000
				});
			},
			success : function(data) {
				$("#pageCountAll").text(data[1]);
				$("#pageCount").text(data[0]);
			}
		});
	}else if('jqGridDriver' == id){
		$.ajax({
			async : false,
			cache : false,
			type : 'get',
			dataType : "json",
			url : rootPath + '/driver/countRegisterAll.shtml',
			data : {
				source: source,
				startDate : startDate,
				endDate : endDate
			},
			error : function() {
				parent.layer.msg('请求失败！', {
					icon : 2,
					time : 1000
				});
			},
			success : function(data) {
				$("#pageCountAll").text(data[1]);
				$("#pageCount").text(data[0]);
			}
		});
	}
	
}
