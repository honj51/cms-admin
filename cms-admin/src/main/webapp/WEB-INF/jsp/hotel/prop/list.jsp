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
				<label class="control-label">宣传图片位置</label> <select id="type"
					class="selectpicker" data-width="100px">
					<option value="">全部</option>
					<option value="1">酒店页面</option>
					<option value="2">当日餐品页面</option>
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
	<script src="${ctx}/js/hotel/prop/list.js<%=ts%>"></script>
</body>
</html>
