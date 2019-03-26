$(function() {
	var flag = true;
    
	$("#jqGrid").jqGrid({
		url : rootPath + '/systemManage/publish/sordPublishSortByLevel.shtml?type='+type,
		mtype : "GET",
		curRowNum: 1,
		postData:{ status : status },
		viewrecords : true,
		autowidth : true,
		shrinkToFit : true,
		sortname : 'create_time',
		height : $(window).height() -160,
		rowNum : 10,
		styleUI : 'Bootstrap',
		datatype : "json",
		pager : "#jqGridPager",
		colModel : [
		{
			label: 'id',
			name : 'id',
			index : 'id',
			hidden:true
		},{ label: '序号',
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
			formatter: function (cellvalue) {
				  if(flag){
			          var p = $(this).jqGrid("getGridParam"),
			              rn = p.curRowNum +
			                  (parseInt(p.page, 10) - 1)*parseInt(p.rowNum, 10);
			              p.curRowNum++;
			          return rn.toString();
				  }else{
					  return cellvalue;
				  }
		    } 
		},{
			label:'选择',
			name : 'radioBtn',
			index : 'radioBtn',
			align : 'center',
			width: '50',
			cellattr: function(rowId, val, rawObject) {
			     return "style=vertical-align:middle;text-align:center;";
			}
		},  {
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
				}else{
					return "--";
				}
        	}
		},  {
			label : '发布时间',
			name : 'publish_time',
			index : 'publish_time',
			formatter:function(cellvalue, options, rowObject){
				if(cellvalue==null||cellvalue==""){
					return "无";
				}
        		return new Date(cellvalue).format("yyyy-MM-dd hh:mm:ss");
        	}
		}, {
			label : '为格式化的时间',
			name : 'unformatTime',
			index : 'unformatTime',
			hidden:true
		} 
	    ],
		
		loadComplete: function () {
		    var p = $(this).jqGrid("getGridParam");
		    p.curRowNum = 1;
		},
		
	    gridComplete: function() {
            var ids = $("#jqGrid").jqGrid('getDataIDs');
            for(var i = 0; i < ids.length; i++) {
                j = i + 1;
                var radioBtnHtml = '<input type="radio" name="radioBtn" onclick="onSelectRadio(\''+i+'\',\''+ids[i]+'\')" id="radioBtn' + j + '"/>';
                $("#jqGrid").jqGrid('setRowData', ids[i], {radioBtn:radioBtnHtml});
            }
            
            $("#sordTop").attr("disabled",true);
            $("#goLower").attr("disabled",true);
            $("#goUpper").attr("disabled",true);
        },
        
        onSelectRow: function(id){
        	 $("#sordTop").attr("disabled",false);
             $("#goLower").attr("disabled",false);
             $("#goUpper").attr("disabled",false);
        	
        	
        	var index = $("#"+id)[0].rowIndex;
        	  var obj = document.getElementById("radioBtn" + index);
                if(obj){
                	obj.checked = true;
                }
        },
	      
		
	});
	
	
	
	
	
	$( "#jqGrid" ).tableDnD({
			scrollAmount : 0
	});
	 
	//置顶
	$("#sordTop").click(function(){
		flag = false;
		var id =    $("#jqGrid").jqGrid("getGridParam",'selrow');
		if(!id) return;
		var data =  $("#jqGrid").jqGrid("getRowData",id);
		$("#jqGrid").jqGrid("delRowData", id);
		var changeData={
				id:id,
				rowNumber:data.rowNumber,
				type:type,
				title:data.title,
				unformatTime:data.unformatTime,
				publish_time:parseInt(data.unformatTime)
		};
		$("#jqGrid").jqGrid("addRowData", id, changeData, "first");
		$("#jqGrid").jqGrid('setSelection',id);
		  var obj = document.getElementById("radioBtn" + 1);
            if(obj){
            	obj.checked = true;
            }
	});


    $("#confirm").click(function(){
	  var allData = $("#jqGrid").jqGrid('getDataIDs');
	    $.ajax({
			async:false,
			cache:false,
			data:{
				indexAndId:allData.toString()
			},
			type:"POST",
			dataType:"json",
			url:rootPath + '/systemManage/publish/sortInfo.shtml',
			error:function(){
				parent.layer.msg('设置首页失败！', {icon : 2,time:1000});
				var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
				parent.layer.close(index);
			},
			success:function(){
				parent.layer.msg('设置首页成功！', {icon : 1,time:1000});
				var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
				parent.layer.close(index); 
			}
		});
	 });


    //上移
	$("#goLower").click(function(){
	    flag = false;
		var id =    $("#jqGrid").jqGrid("getGridParam",'selrow');
		var data =  $("#jqGrid").jqGrid("getRowData",id);
		var allData = $("#jqGrid").jqGrid('getDataIDs');
		
		
		for(var i=0;i<allData.length;i++){
		
			var index = $("#"+allData[i])[0].rowIndex;
		
			if(index==($("#"+id)[0].rowIndex)-1){	
				$("#jqGrid").jqGrid("delRowData", id);
				
				var changeData={
						id:id,
						rowNumber:data.rowNumber,
						type:type,
						title:data.title,
						unformatTime:data.unformatTime,
						publish_time:parseInt(data.unformatTime)
				};
				$("#jqGrid").jqGrid("addRowData", id, changeData, "before",allData[i]);  
				$("#jqGrid").jqGrid('setSelection',id);		
					  var obj = document.getElementById("radioBtn" + (index));
		                if(obj){
		                	obj.checked = true;
		                }
			}
		}
		
	});
		
	//下移
	$("#goUpper").click(function(){
		flag = false;
		var id =    $("#jqGrid").jqGrid("getGridParam",'selrow');
		var data =  $("#jqGrid").jqGrid("getRowData",id);
		var allData = $("#jqGrid").jqGrid('getDataIDs');
		var t = ($("#"+id)[0].rowIndex);
	
		for(var i=0;i<allData.length;i++){
			var index = $("#"+allData[i])[0].rowIndex;
			if(index==t&&t<allData.length){
				$("#jqGrid").jqGrid("delRowData", id);
				var changeData={
						id:id,
						rowNumber:data.rowNumber,
						type:type,
						title:data.title,
						unformatTime:data.unformatTime,
						publish_time:parseInt(data.unformatTime)
				};
			
				$("#jqGrid").jqGrid("addRowData", id, changeData, "after",allData[i]);  
				$("#jqGrid").jqGrid('setSelection',id);
				  var obj = document.getElementById("radioBtn" + (index+1));
	                if(obj){
	                	obj.checked = true;
	                }
			}
	   }
   });
		
		
});

function onSelectRadio(rowNumber,id){
	var radioBtnNo =  Number(rowNumber) +1;
	var obj = document.getElementById("radioBtn" + radioBtnNo);
    if(obj.checked){
    	$("#jqGrid").jqGrid('setSelection',id);
    }
}