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
				<select id="newsTitle" class="js-example-basic-single" style="width: 200px;">
					<option value="">请选择所属新闻标题</option>
					<c:forEach var="newsTitleFormMap" items="${newsTitleFormMaps}">
						<option value="${newsTitleFormMap.id}">${newsTitleFormMap.name}</option>
					</c:forEach>
				</select> <input id="queryparam" lass="selectpicker" placeholder="新闻标题"
					style="width: 120px">
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
	<script src="${ctx}/js/website/news/list.js<%=ts%>"></script>
</body>
</html>
