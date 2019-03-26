var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 260);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});
$(function() {
	
	$(".js-example-basic-single").select2({
		language: "zh-CN"
	});
	
	$("#billingMonth").datetimepicker({
		format:"YYYY-MM"
	});
	
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/statistics/invoice/findStatsByCarrier.shtml',
		mtype: "get",
		postData: {
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
			label: '承运公司',
			name: 'drawer_org_name',
			index: 'drawer_org_name',
			align: "center",
			sortable: false,
			editable: false,
		},
		{
			label: '开票月份',
			name: 'billing_month',
			index: 'billing_month',
			align: "center",
			sortable: false,
			editable: false,
		},
		{
			label: '运单数',
			name: 'total_delivery_quantity',
			index: 'total_delivery_quantity',
			align: "center",
			sortable: false,
			editable: false,
		},
		{
			label: '车数',
			name: 'total_vehicle_quantity',
			index: 'total_vehicle_quantity',
			align: "center",
			sortable: false,
			editable: false,
		},
		{
			label: '运费金额',
			name: 'invoice_amount',
			index: 'invoice_amount',
			align: "center",
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if(typeof(value) == "undefined"){
					return "";
				}
				
				var invoiceAmount = parseFloat(value).toFixed(2).toString();
				
				var invoiceAmountInt = invoiceAmount.substring(0,invoiceAmount.length-3);
				var invoiceAmountDec = invoiceAmount.substring(invoiceAmount.length-3);
				
				var result = '',counter = 0;
				for(var i=invoiceAmountInt.length-1;i>=0;i--){
					counter++;
					result = invoiceAmountInt.charAt(i) + result;
					if(!(counter%3) && i!=0){
						result = "," + result;
					}
				}
				return result + invoiceAmountDec;
			}
		},
		{
			label: '发票金额',
			name: 'settlement_total_freight',
			index: 'settlement_total_freight',
			align: "center",
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if(typeof(value) == "undefined"){
					return "";
				}
				
				var settlementTotalFreight = parseFloat(value).toFixed(2).toString();
				
				var settlementTotalFreightInt = settlementTotalFreight.substring(0,settlementTotalFreight.length-3);
				var settlementTotalFreightDec = settlementTotalFreight.substring(settlementTotalFreight.length-3);
				
				var result = '',counter = 0;
				for(var i=settlementTotalFreightInt.length-1;i>=0;i--){
					counter++;
					result = settlementTotalFreightInt.charAt(i) + result;
					if(!(counter%3) && i!=0){
						result = "," + result;
					}
				}
				return result + settlementTotalFreightDec;
			}
		},
		{
			label: '发票吨位',
			name: 'settlement_net_weight',
			index: 'settlement_net_weight',
			align: "center",
			sortable: false,
			editable: false,
			formatter: function(value, opt, rec) {
				if(typeof(value) == "undefined"){
					return "";
				}
				
				var settlementNetWeight = parseFloat(value).toFixed(2).toString();
				
				var settlementNetWeightInt = settlementNetWeight.substring(0,settlementNetWeight.length-3);
				var settlementNetWeightDec = settlementNetWeight.substring(settlementNetWeight.length-3);
				
				var result = '',counter = 0;
				for(var i=settlementNetWeightInt.length-1;i>=0;i--){
					counter++;
					result = settlementNetWeightInt.charAt(i) + result;
					if(!(counter%3) && i!=0){
						result = "," + result;
					}
				}
				return result + settlementNetWeightDec;
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
		sortname: 'delivery_quantity',
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
	
});

function search(){
	grid.jqGrid('setGridParam', {
		postData: {
			carrierOrgId : $("#transportationCompany option:selected").val(),
			billingMonth : $("#billingMonth").val().trim()
		},
		page : 1
	}).trigger("reloadGrid");
}

function refresh(){
	document.getElementById("searchForm").reset();
	$('.selectpicker').selectpicker('refresh');
	$("#transportationCompany").select2({
		language: "zh-CN"
	});
	$("#billingMonth").val("");
	
	grid.jqGrid('setGridParam', {
		postData: {
			carrierOrgId : "",
			billingMonth : ""
		},
		page : 1
	}).trigger("reloadGrid");
}

