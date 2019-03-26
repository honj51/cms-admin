<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<style type="text/css">
.ui-jqgrid .ui-jqgrid-htable .ui-th-div {
    height: 19px;
    margin-top: 0px;
}
</style>
</head>
<body>
	<form role="form" id="searchForm" name="searchForm">
		<div class="col-md-12">
			<div class="choice_condition_menu">
				<!-- <label class="control-label">车牌号</label> 
				<input id="carNo" type="text" class="selectpicker" /> --> 
				<input id="queryParam"type="text" class="selectpicker" placeholder="车牌号/车辆编号" style="width:150px"/>
				<label
					class="control-label">会员类型</label> 
					<select id="type"  class="selectpicker" data-width="100px">
						<option value="">全部</option>
						<option value="1">非会员</option>
						<option value="2">普通会员</option>
						<option value="3">黄金会员</option>
					</select>
				<label class="control-label">创建时间</label> <input id="startDate"
					type="text" class="selectpicker" /> 一 <input id="endDate"
					type="text" class="selectpicker" /> 
					
				<label class="control-label">定位设备状态</label> 
				<select id="yysnStatus"  class="selectpicker" data-width="100px">
					<option value="">全部</option>
					<option value="1">正常</option>
					<option value="2">异常</option>
				</select>
				<button onclick="return false;" class="btn btn-primary btn-sm"
					id="search">查询</button>
			</div>

			<header class="choice_condition_menu">
				<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>
				<c:forEach items="${res}" var="key">
				${key.description}
			</c:forEach>                                                                                                                                                                                         
			</header>

			<div style="margin-left: 5px">
				<table id="jqGrid"></table>
				<div id="jqGridPager"></div>
			</div>
		</div>
	</form>
	<script>
		var displayType = "${displayType}";
		var userId = "${userId}";
	</script>
	<script src="${ctx}/js/vehicle/list.js<%=ts%>"></script>
</body>
</html>
