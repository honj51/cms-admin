<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<style>
.table_content {padding: 0 0 0 5px;}
</style>
</head>
<body>
<div class="col-md-12 content">

	<div class="choice_condition_menu">
		<form>
			<label>角色名</label><input type="text" id="name" name="roleFormMap.name">
			<button class="btn btn-primary btn-sm" id="search" onclick="return false;">查询</button>
		</form>
	</div>

	<div class="choice_condition_menu">
		<a type="button" id="refreshbutton" class="btn btn-primary btn-sm">刷新</a>
		<c:forEach items="${res}" var="key">
			${key.description}
		</c:forEach>
	</div>

	<div class="table_content">
		<table id="jqGrid"></table>
		<div id="jqGridPager"></div>
	</div>


	<div class="table-responsive">
		<div id="paging" class="pagclass"></div>
	</div>
</div>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/system/role/list.js<%=ts%>"></script>
</body>
</html>