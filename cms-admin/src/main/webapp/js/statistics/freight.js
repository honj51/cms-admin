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
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/statistics/findFreightStatsByPage.shtml',
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
			key: true,
			hidden: true,
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
			label : '预定日期',
			name : 'reserve_date',
			index : 'reserve_date',
			sortable : false,
			editable : false,
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd");
			}

		},
		{
			label : '出发省',
			name : 'start_province_name',
			index : 'start_province_name',
			sortable : false,
			editable : false
		},{
			label : '出发市',
			name : 'start_city_name',
			index : 'start_city_name',
			sortable : false,
			editable : false
		},{
			label : '出发县/区',
			name : 'start_country_name',
			index : 'start_country_name',
			sortable : false,
			editable : false
		},{
			label : '目的省',
			name : 'end_province_name',
			index : 'end_province_name',
			sortable : false,
			editable : false
		},{
			label : '目的市',
			name : 'end_city_name',
			index : 'end_city_name',
			sortable : false,
			editable : false
		},{
			label : '目的区/县',
			name : 'end_country_name',
			index : 'end_country_name',
			sortable : false,
			editable : false
		},{
			label : '最少运费(元/吨)',
			name : 'min_freight',
			index : 'min_freight',
			sortable : false,
			editable : false
		},{
			label : '最高运费(元/吨)',
			name : 'max_freight',
			index : 'max_freight',
			sortable : false,
			editable : false
		},{
			label : '平均运费(元/吨)',
			name : 'avg_freight',
			index : 'avg_freight',
			sortable : false,
			editable : false
		}],
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: true,
		sortname: 'reserve_date',
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

	$("#refresh").click("click", function() {
		document.getElementById("searchForm").reset();
		$("#startProvince").select2({
			language: "zh-CN"
		});
		$("#startCity").select2({
			language: "zh-CN"
		});
		$("#startCounty").select2({
			language: "zh-CN"
		});
		$("#endProvince").select2({
			language: "zh-CN"
		});
		$("#endCity").select2({
			language: "zh-CN"
		});
		$("#endCounty").select2({
			language: "zh-CN"
		});
		grid.jqGrid('setGridParam', {
		postData: {
		   startProvinceId : '',
      	   startCityId : '',
      	   startCountyId : '',
      	   endProvinceId : '',
      	   endCityId : '',
      	   endCountyId : ''
		},
		page : 1
		}).trigger("reloadGrid");
	});

	$("#advanceSearch").click("click", function() {
		var startProvinceId = $("#startProvince").val();
		var startCityId =  $("#startCity").val();
		var startCountyId = $("#startCounty").val();
		var endProvinceId = $("#endProvince").val();
		var endCityId = $("#endCity").val();
		var endCountyId =  $("#endCounty").val();		

		 grid.jqGrid('setGridParam', {
	           postData: {
	        	   startProvinceId : startProvinceId,
	        	   startCityId : startCityId,
	        	   startCountyId : startCountyId,
	        	   endProvinceId : endProvinceId,
	        	   endCityId : endCityId,
	        	   endCountyId : endCountyId
				
			},
			page : 1
		}).trigger("reloadGrid");	
	});

	$("#startProvince").change(function(){
		
		var provinceId = this.value;
		var startCity = $("#startCity")
		reloadCity(provinceId,startCity);	
		$("#startCounty").empty();
		$("#startCounty").append($("<option></option>").attr("value", '').text('请选择 区/县'));
		$("#startCounty").selectpicker('refresh');
	});	
	$("#startCity").change(function(){
		var provinceId = this.value;
		var startCity = $("#startCounty")
		reloadCity(provinceId,startCity);
		
	});	

	$("#endProvince").change(function(){
		var provinceId = this.value;
		var startCity = $("#endCity")
		reloadCity(provinceId,startCity);
		$("#endCounty").empty();
		$("#endCounty").append($("<option></option>").attr("value", '').text('请选择 区/县 '));
		$("#endCounty").selectpicker('refresh');
	});

	$("#endCity").change(function(){
		var provinceId = this.value;
		var startCity = $("#endCounty")
		reloadCity(provinceId,startCity);
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



function reloadCity(provinceId, cityDropDown){
	if(null == provinceId || "" == provinceId){
		cityDropDown.empty();
		cityDropDown.append($("<option></option>").attr("value", '').text('请选择市 '));
		cityDropDown.selectpicker('refresh');
		return;
	}
	$.ajax({
		type : "POST",
		async: true,
		dataType : "json",
		data:{
			id:provinceId
		},
		url : rootPath + '/district/getAllCityByProvinceId.shtml',
		success : function(data) {
			cityDropDown.empty();
			cityDropDown.append($("<option></option>").attr("value", '').text('请选择市 '));
			for (var i = 0; i < data.length; i++) {
				cityDropDown.append($("<option></option>").attr("value", data[i].id).text(data[i].name));
		        }
			cityDropDown.selectpicker('refresh');
		},
	});
}