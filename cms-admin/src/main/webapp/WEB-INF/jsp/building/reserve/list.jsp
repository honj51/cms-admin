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
	<form role="form" id="searchForm" name="searchForm" style="position:relative">
		<div class="choice_condition_menu">
			<input id="queryparam" class="selectpicker" placeholder="客户姓名/客户电话/户型名称"
				style="width: 250px;">
				<input id="reserveStartTime" class="selectpicker"
					placeholder="预约开始时间" style="width: 150px;">
			-
				<input id="reserveEndTime" class="selectpicker" placeholder="预约结束时间"
					style="width: 150px;">
			<label class="control-label">是否处理</label> <select id="isManage"
				class="selectpicker" data-width="100px">
				<option value="">全部</option>
				<option value="0">未处理</option>
				<option value="1">已处理</option>
			</select>
			<button onclick="return false;" class="btn btn-primary btn-sm"
				id="search">查询</button>
		</div>

		<div class="col-md-12">
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
	<script src="${ctx}/js/building/reserve/list.js<%=ts%>"></script>
</body>
</html>
