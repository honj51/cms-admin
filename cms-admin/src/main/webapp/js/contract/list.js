var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 260);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});


$(function() {
	$(".selectpicker").selectpicker({
		size : 7
	});
	$(".js-example-basic-single").select2({
		language: "zh-CN"
	});
	
	$('#signStartTime').datetimepicker({
		format:"YYYY-MM-DD",
	});
	$('#signEndTime').datetimepicker({
		format:"YYYY-MM-DD",
	});
	$('#limitStartTime').datetimepicker({
		format:"YYYY-MM-DD",
	});
	$('#limitEndTime').datetimepicker({
		format:"YYYY-MM-DD",
	});
	
	grid = $("#jqGrid").jqGrid({
		url: rootPath + '/contract/findByPage.shtml',
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
			label: '合同编号',
			name: 'code',
			index: 'code',
			sortable : true,
			editable : false
		}, 
		{
			label: '货主公司',
			name: 'org_name',
			index: 'org_name',
			sortable : true,
			editable : false
		}, 
		{
			label: '承运公司',
			name: 'transportation_company_name',
			index: 'transportation_company_name',
			sortable : true,
			editable : false
		}, 
		{
			label : '签订日期',
			name : 'sign_time',
			index : 'sign_time',
			sortable : true,
			editable : false,
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd");
			}
		},
		{
			label : '到期日期',
			name : 'limit_time',
			index : 'limit_time',
			sortable : true,
			editable : false,
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd");
			}
		},
		{
			label : '状态',
			name : 'status',
			index : 'status',
			sortable : true,
			editable : false,
			formatter: function(value, opt, rec) {
				if(value == '1'){
					return "正常";
				}else if(value == '2'){
					return "挂起";
				}else{
					return "";
				}
			}
		},
		{
			label : '合同',
			name : 'contract_img_url',
			index : 'contract_img_url',
			sortable : true,
			editable : false,
			formatter: function(value, opt, rec) {
				if(typeof(value) == 'undefined' || value == '' || value == null){
					return "";
				}
				var contractId = rec.id;
				return '<a href="javascript:void(0)" onclick=lookContract(\'' + contractId +'\')>查看</a>';
			}
		},
		{
			label: '联系人',
			name: 'contact_person_name',
			index: 'contact_person_name',
			sortable : true,
			editable : false
		}, 
		{
			label: '联系电话',
			name: 'contact_phone',
			index: 'contact_phone',
			sortable : true,
			editable : false
		}, 
		{
			label : '备注',
			name : 'remarks',
			index : 'remarks',
			sortable : true,
			editable : false
		},
		{
			label : '创建人',
			name : 'create_user_name',
			index : 'create_user_name',
			sortable : true,
			editable : false
		},
		{
			label : '创建时间',
			name : 'create_time',
			index : 'create_time',
			sortable : true,
			editable : false,
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			label : '更新人',
			name : 'update_user_name',
			index : 'update_user_name',
			sortable : true,
			editable : false
		},
		{
			label : '更新时间',
			name : 'update_time',
			index : 'update_time',
			sortable : true,
			editable : false,
			formatter: function(cellvalue, options, rowObject) {
				return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
			}
		}],
		multiselect: true,
		viewrecords: true,
		autowidth: false,
		shrinkToFit: false,
		sortname : 'update_time', 
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
		var shipperCompanyId = $("#shipperCompany option:selected").val();
		var transportationCompanyId = $("#transportationCompany option:selected").val();
		var code = $("#code").val().trim();
		var signStartTime = $("#signStartTime").val().trim();
		var signEndTime = $("#signEndTime").val().trim();
		var limitStartTime = $("#limitStartTime").val().trim();
		var limitEndTime = $("#limitEndTime").val().trim();
		var status = $("#status option:selected").val();
		 grid.jqGrid('setGridParam', {
	           postData: {
	        	   shipperCompanyId : shipperCompanyId,
	        	   transportationCompanyId : transportationCompanyId,
	        	   code : code,
	        	   signStartTime : signStartTime,
	        	   signEndTime : signEndTime,
	        	   limitStartTime : limitStartTime,
	        	   limitEndTime : limitEndTime,
	        	   status : status
			},
			page : 1
		}).trigger("reloadGrid");	
	});
	
	$("#refresh").click("click", function() {
		document.getElementById("searchForm").reset();
		$('.selectpicker').selectpicker('refresh');
		$("#shipperCompany").select2({
			language: "zh-CN"
		});
		$("#transportationCompany").select2({
			language: "zh-CN"
		});
		grid.jqGrid('setGridParam', {
			postData: {
				shipperCompanyId : '',
				transportationCompanyId : '',
        	    code : '',
        	    signStartTime : '',
        	    signEndTime : '',
        	    limitStartTime : '',
        	    limitEndTime : '',
        	    status : ''
			},
			page : 1
		}).trigger("reloadGrid");
	});
	
	$("#add").click("click", function() {
		add();
	});
	
	$("#edit").click("click", function() {
		edit();
	});
	
	$("#delete").click("click", function() {
		deleteContract();
	});
	
	//停用
	$("#locked").click("click", function() {
		locked();
	});
	
	//启用
	$("#cancelLocked").click("click", function() {
		cancelLocked();
	});
	$("#upload").click("click", function() {
		upload();
	});
	$("#seeContract").click("click", function() {
		seeContract();
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

function upload() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	if (rowIds.length > 1) {
		parent.layer.msg('只能选择一条数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	parent.openLayer({
		title : "上传",
		type : 2,
		area : [ "40%", "40%" ],
		content : rootPath + '/contract/uploadUI.shtml?contractId=' + rowIds[0],
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function lookContract(contractId) {
	$.ajax({
		type: "post",
		url: rootPath + '/contract/displayPDF.shtml',
		data: {
			contractId : contractId
		},
		dataType: "json",
		beforeSend: function() {
		},
		success: function(response) {
			if(response != '' && response != null){
				parent.openLayer({
					title : "合同",
					type : 2,
					area : [ "80%", "80%" ],
					maxmin: true,
					content : response,
					end : function(){
						$("#jqGrid").trigger('reloadGrid');
					}
				});
			}
		},
		complete: function(XMLHttpRequest, textStatus) {
		},
		error: function() {
		}
	});
}
function add() {
	parent.openLayer({
		title : "新增",
		type : 2,
		area : [ "80%", "80%" ],
		content : rootPath + '/contract/addUI.shtml',
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});
}

function edit() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
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
		title : "修改",
		type : 2,
		area : [ "80%", "80%" ],
		content : rootPath + '/contract/editUI.shtml?id=' + rowIds[0],
		maxmin: true,
		end : function(){
			$("#jqGrid").trigger('reloadGrid');
	    }
	});

};

function deleteContract() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	
	parent.layer.confirm('确定要删除吗？', function(index) {
		top.ajaxLoading();
		 $.ajax({
			    type: "post",
			    url: rootPath + '/contract/deleteEntity.shtml',
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
};

function locked() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	/*if(rowIds.length > 1){
		parent.layer.msg('只能选择一条数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}*/
	for(var i=0;i<rowIds.length;i++){
		var rowData = $('#jqGrid').jqGrid('getRowData',rowIds[i]);
		var status = rowData.status;
		if(status != '正常'){
			parent.layer.msg('只有正常的可以停用！', {
				icon: 20,
				time: 1000
			});
			return;
		}
	}
	
	parent.layer.confirm('确定要停用吗？', function(index) {
		top.ajaxLoading();
		$.ajax({
			type: "post",
			url: rootPath + '/contract/locked.shtml',
			data: {
				ids : rowIds.toString()
			},
			dataType: "json",
			beforeSend: function() {
			},
			success: function(response) {
				top.ajaxLoadEnd();
				if(response == "success"){
					parent.layer.msg('停用成功！', {icon : 1, time: 1000});
				}else{
					parent.layer.msg('停用失败！', {icon : 2, time: 1000});
				}
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
				
				$("#jqGrid").trigger("reloadGrid");
			},
			complete: function(XMLHttpRequest, textStatus) {
			},
			error: function() {
				top.ajaxLoadEnd();
				
				parent.layer.msg('停用失败！', {icon : 2, time: 1000});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
				
				$("#jqGrid").trigger("reloadGrid");
			}
		});
	});
};

function cancelLocked() {
	var rowIds = $("#jqGrid").jqGrid('getGridParam', "selarrrow");
	if (rowIds.length == 0) {
		parent.layer.msg('请选择数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}
	/*if (rowIds.length > 1) {
		parent.layer.msg('只能选择一条数据！', {
			icon: 20,
			time: 1000
		});
		return;
	}*/
	for(var i=0;i<rowIds.length;i++){
		var rowData = $('#jqGrid').jqGrid('getRowData',rowIds[i]);
		var status = rowData.status;
		if(status != '挂起'){
			parent.layer.msg('只有挂起的可以启用！', {
				icon: 20,
				time: 1000
			});
			return;
		}
	}
	
	parent.layer.confirm('确定要启用吗？', function(index) {
		top.ajaxLoading();
		$.ajax({
			type: "post",
			url: rootPath + '/contract/cancelLocked.shtml',
			data: {
				ids : rowIds.toString()
			},
			dataType: "json",
			beforeSend: function() {
			},
			success: function(response) {
				top.ajaxLoadEnd();
				if(response == "success"){
					parent.layer.msg('启用成功！', {icon : 1, time: 1000});
				}else{
					parent.layer.msg('启用失败！', {icon : 2, time: 1000});
				}
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
				
				$("#jqGrid").trigger("reloadGrid");
			},
			complete: function(XMLHttpRequest, textStatus) {
			},
			error: function() {
				top.ajaxLoadEnd();
				
				parent.layer.msg('启用失败！', {icon : 2, time: 1000});
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
				
				$("#jqGrid").trigger("reloadGrid");
			}
		});
	});
};
