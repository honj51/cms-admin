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
				<label class="control-label">广告位置</label> <select id="position"
					class="selectpicker" data-width="200px">
					<option value="">全部</option>
					<option value="1">集团首页轮播图</option>
					<option value="2">集团介绍轮播图</option>
					<option value="3">企业文化轮播图</option>
					<option value="4">新闻动态轮播图</option>
					<option value="5">业务领域轮播图</option>
					<option value="6">人才招聘轮播图</option>
					<option value="7">联系我们轮播图</option>
					<option value="8">集团首页左下方轮播图</option>
					<option value="9">集团首页右下方轮播图</option>
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
	<script src="${ctx}/js/website/advertisement/list.js<%=ts%>"></script>
</body>
</html>
