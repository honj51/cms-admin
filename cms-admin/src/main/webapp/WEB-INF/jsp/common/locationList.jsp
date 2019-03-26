<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>
	<form role="form" id="searchForm" name="searchForm">
		<div class="col-md-12">
			<div class="choice_condition_menu">
				<label class="control-label">创建时间</label> <input id="startDate"
					type="text" class="selectpicker" /> 一 <input id="endDate"
					type="text" class="selectpicker" /> <label class="control-label">地址</label>
				<input id="address" type="text" class="selectpicker" />
				<button onclick="return false;" class="btn btn-primary btn-sm"
					id="search">查询</button>
			</div>

			<div class="choice_condition_menu">
				<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>
			</div>

			<div style="margin-left: 5px">
				<table id="jqGrid"></table>
				<div id="jqGridPager"></div>
			</div>
		</div>
	</form>

	<script>
		var deliveryId = "${deliveryId}";
		var vehicleId = "${vehicleId}";
		var userId = "${userId}";
	</script>
	<script src="${ctx}/js/common/locationList.js<%=ts%>"></script>
</body>
</html>
