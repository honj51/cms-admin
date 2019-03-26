var selectedIds = new Array();

function findStringFromArray(arr,idStr){
    var tempStr = arr.join(","); 
    return tempStr.indexOf(idStr); 
}

function addItemToArray(arr,idStr){
	if(findStringFromArray(arr,idStr) < 0){
		arr.unshift(idStr);
	}
}

function removeItemFromArray(arr,idStr){
	for(var i = 0 ;i<arr.length ;i++){
		if(arr[i]==idStr){
			arr.splice(i,1);
			break;
		}
	}
}
function pageInit (type){
	selectedIds.length = 0;//初始化
	$.ajax({
		type : "get",
		async : false,
		dataType : "json",
		url : rootPath + '/systemManage/publish/findPublishInfoById.shtml?type='+type,
		data:null,
		success : function(dataStr) {
			if(CommnUtil.notNull(dataStr)){
				selectedIds = dataStr.split(',');
			}
		},
		error : function() {
			 parent.layer.msg('无法确定发布类型，参数错误！', {icon : 3,time:1000});
		}
	});
}



$(function() {
	 var typeValue = $("#type").val();
	 if(CommnUtil.notNull(typeValue)){
		 pageInit(typeValue);
	 }
	 
	 
	 $("#jqGrid").jqGrid({
		url : rootPath + '/systemManage/publish/findByPage.shtml?type=1',
		mtype : "GET",
		postData:{ status : status },
		curRowNum: 1,
		multiselect: true,
		styleUI : 'Bootstrap',
		datatype : "json",
		
		colModel : [ 
        {   label: '序号',
			name: "rowNumber",
			index : 'rowNumber',
			width: 50,
			sortable: false,
			resizable: false,
			hidedlg: true,
			search: false, 
			align: "center",
			fixed: true,
			width: '50',
			formatter: function () {
		          var p = $(this).jqGrid("getGridParam"),
		              rn = p.curRowNum +
		                  (parseInt(p.page, 10) - 1)*parseInt(p.rowNum, 10);
		              p.curRowNum++;
		          return rn.toString();
		      } 
		},{ 
			label : '标题',
			name : 'title',
			index : 'title'
		}, {
			label : '栏目类型',
			name : 'type',
			index : 'type',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue=="1"){
					return "政策法规";
				}else if(cellvalue=="2"){
					return "行业资讯";
				}else if(cellvalue=="3"){
					return "资料下载";
				}else if(cellvalue=="4"){
					return "医院动态";
				}else if(cellvalue=="7"){
					return "最新公告";
				}else{
					return "--";
				}
        		}
		}, {
			label : '创建人',
			name : 'create_person',
			index : 'create_person'
		}, {
			label : '创建时间',
			name : 'create_time',
			index : 'create_time',
			formatter:function(cellvalue, options, rowObject){
				
        		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
        		}
		}, {
			label : '发布人',
			name : 'publish_person',
			index : 'publish_person'
		}, {
			label : '发布时间',
			name : 'publish_time',
			index : 'publish_time',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue==null||cellvalue==""){
					return "无";
				}
        		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
        	}
		} , {
			label : '状态',
			name : 'status',
			index : 'status',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue=="1"){
					return "已发布";
				}if(cellvalue=="2"){
					return "未发布";
				}
        		return "获取失败";
        		}
				
		} , {
			label : '是否显示首页',
			name : 'is_show_home_page',
			index : 'is_show_home_page',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue=="n"){
					return "否";
				}
        		return "是";
        		}
		}  ],
		viewrecords : true,
		autowidth : true,
		shrinkToFit : true,
		sortname : 'create_time',
		pager : "#jqGridPager",
		height :  $(window).height() - 120,
		rowNum : 10,
		
		loadComplete: function () {
		    var p = $(this).jqGrid("getGridParam");
		    p.curRowNum = 1;
		    
		    var allRowIds= $("#jqGrid").jqGrid('getDataIDs');
		    for(var i=0;i<allRowIds.length;i++){
		    	if(findStringFromArray(selectedIds,allRowIds[i]) >= 0){
		    		$("#jqGrid").jqGrid('setSelection',allRowIds[i],true);
		    	}
		    }
		},
		
		onSelectRow: function(id , status){		
			if(status){
				addItemToArray(selectedIds,id);
			}else{
				removeItemFromArray(selectedIds,id);
			}
		},
		
		onSelectAll: function(ids,status){
        	for(var i=0 ; i<ids.length ; i++){
        		if(status){
        			addItemToArray(selectedIds,ids[i]);
            	}else{
            		removeItemFromArray(selectedIds,ids[i]);
            	}
        	}
        }
		
	});
	 
	 
	$("#type").change(function(){
		var typeValue = $("#type").val();
		if(CommnUtil.notNull(typeValue)){
			pageInit(typeValue);
			$("#jqGrid").jqGrid('setGridParam', {
				url: rootPath + '/systemManage/publish/findByPage.shtml?type='+typeValue
			}).trigger('reloadGrid');
		}
	});		
	 
	 
	$("#confirm").click(function(){
		if(selectedIds.length>6){
			 parent.layer.msg('设置首页最多选择6项！', {icon : 3,time:2000});
			 return;
		}
		
		if(selectedIds.length==0){
			parent.layer.msg('请选择公告数据！', {icon : 3,time:2000});
			 return;
		}
		
		$.ajax({
			async:false,
			cache:false,
			data:{
				type    : $("#type").val(),
				idsStr  : selectedIds.join(",")
			},
			type:"post",
			dataType:"json",
			url:rootPath + '/systemManage/publish/toHomePage.shtml',
			success:function(){
				parent.layer.msg('设置首页成功！', {icon : 1,time:2000});
				var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
				parent.layer.close(index); 
		
			},
			error:function(){
				parent.layer.msg('设置首页失败！', {icon : 2,time:2000});
			},
		});
		
		
	});
	
	
	
	
	$("#sordTop").click(function(){
		sordToTop();
	});
});


function sordToTop() {
	pageii = parent.layer.open({
		title : "首页排序",
		type : 2,
		area : [ "50%", "70%" ],
		content : rootPath + '/systemManage/publish/sordToTop.shtml?type='+$("#type").val(),
		end:function(){ 
			$("#jqGrid").trigger("reloadGrid");
		}
	});
}