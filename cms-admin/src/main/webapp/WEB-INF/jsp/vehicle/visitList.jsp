<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>
	<div class="col-md-12">
		<form role="form" id="searchForm" name="searchForm">
			<div class="choice_condition_menu">
				<label class="control-label">日期</label> <input id="startDate"
					type="text"> 一 <input id="endDate" type="text" />
				<button onclick="return false;" class="btn btn-primary btn-sm"
					id="search">查询</button>
			</div>
		</form>

		<header class="choice_condition_menu">
			<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>
		    <a type="button" id="delete" class="btn btn-primary btn-sm">删除</a>
		    <a type="button" id="edit" class="btn btn-primary btn-sm">修改</a>
		</header>

		<div style="margin-left: 5px">
			<table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>

	<script>
		var targetId = "${targetId}";
		var targetType = "${targetType}";
	</script>
	<script src="${ctx}/js/driver/visitList.js<%=ts%>"></script>
</body>
</html>
