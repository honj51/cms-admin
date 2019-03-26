<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<style>
.popModal .popModal_content.popModal_contentOverflow {
	max-height: 258px;
	overflow-y: auto;
	overflow-x: hidden;
	margin: 15px -8px;
	padding: 0 7px;
}

.select2-dropdown {
	z-index: 9999 !important;
}

.choice_condition_menu input {
	width: 87px;
}

.popModal .popModal_content.popModal_contentOverflow {
	max-height: 360px;
}
</style>
</head>
<body>
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

	<script>
		var status = "${status}";
		var displayType = "${displayType}";
		var userId = "${userId}";
		var isAdmin = "${isAdmin}";
		var vehicleId = "${vehicleId}";
	</script>
	<script src="${ctx}/js/vehicle/driverList.js<%=ts%>"></script>

</body>
</html>
