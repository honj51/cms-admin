<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>
	<div class="col-md-12">
		<header class="choice_condition_menu">
			<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>
		</header>

		<div style="margin-left: 5px">
			<table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>

	<script>
		var vehicleId = "${vehicleId}";
	</script>
	<script src="${ctx}/js/vehicle/deliveryList.js<%=ts%>"></script>
</body>
</html>
