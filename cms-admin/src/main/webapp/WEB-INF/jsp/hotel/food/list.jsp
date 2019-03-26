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
		<div class="choice_condition_menu">
			<input id="queryparam" class="selectpicker" placeholder="标题"
				style="width: 150px;"> <label class="control-label">推荐星级</label>
			<select id="starLevel" class="selectpicker" data-width="100px">
				<option value="">全部</option>
				<option value="1">一星</option>
				<option value="2">二星</option>
				<option value="3">三星</option>
				<option value="4">四星</option>
				<option value="5">五星</option>
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
	<script src="${ctx}/js/hotel/food/list.js<%=ts%>"></script>
</body>
</html>
