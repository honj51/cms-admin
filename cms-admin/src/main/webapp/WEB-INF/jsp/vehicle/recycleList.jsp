<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>
<form role="form" id="searchForm" name="searchForm">
	<div class="col-md-12">
		<form role="form" id="searchForm" name="searchForm">
			<div class="choice_condition_menu">
				<input id="no" type="text" class="selectpicker" placeholder="车牌号" style="width:200px;">
				<button onclick="return false;" class="btn btn-primary btn-sm" id="search">查询</button>
			</div>
		</form>
		<header class="choice_condition_menu">
		<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a> 
			<a type="button" id="restore" class="btn btn-primary btn-sm">还原</a> 
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
		var userId = "${userId}";
	</script>
	<script src="${ctx}/js/vehicle/recycleList.js<%=ts%>"></script>
</body>
</html>
