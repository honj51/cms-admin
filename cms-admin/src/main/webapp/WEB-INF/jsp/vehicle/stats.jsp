<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<style type="text/css">
.papers{
	display: inline-block;
	float: right;
	padding-left: 20px;
}
</style>
</head>
<body>
	<div class="col-md-12">
		<form role="form" id="searchForm" name="searchForm">
			<div class="choice_condition_menu">
				<input id="queryParam" type="text" class="selectpicker" placeholder="车牌号" style="width:140px;"/> 
				<label class="control-label">日期:</label> 
				<input id="startDate" type="text" class="selectpicker" value="${firstDay}"/>
				一
				<input id="endDate" type="text" class="selectpicker" value="${lastDay}" />
				<button onclick="return false;" class="btn btn-primary btn-sm" id="search">查询</button>
			</div>
			<div style="display:none;">
				<div id="content">
					<div class="row" style="border-bottom:1px solid#dddddd;padding:5px; ">  
							<label class="control-label">
								&nbsp;日期
							</label> 
							<input id="startDate" type="text" class="selectpicker" value="${firstDay}"/>
							一
							<input id="endDate" type="text" class="selectpicker" value="${lastDay}" />
						</div>
					<div class="row" style="border-bottom:1px solid#dddddd;padding:5px; "> 
		          		<button onclick="return false;" class="btn btn-primary btn-sm"
		               		id="advanceSearch" style="margin:0 auto;display:block; width:150px">查询</button>
		            </div>
				</div>
			</div>
		</form>
		
		<header class="choice_condition_menu">
			<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>
			<span class="papers">道运证：${sumRoadTransportCode}</span>
			<span class="papers">行驶证：${sumVehicleLicense}</span>
		</header>
		
		<div style="margin-left: 5px">
			<table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>

	<script>
		var status = "${status}";
	</script>
	<script src="${ctx}/js/vehicle/stats.js<%=ts%>"></script>
</body>
</html>
