<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<style>
.table_content {
	padding: 0 0 0 5px;
}
</style>
</head>
<body>
	<div class="col-md-12 content">

		<form id="searchForm">
			<div class="choice_condition_menu">
				<input type="text" id="queryParam" placeholder="名称"
					style="width: 350px"> <label class="control-label">是否锁定</label>
				<select id="isLocked" class="selectpicker" data-width="70px">
					<option value="" checked>全部</option>
					<option value="0">否</option>
					<option value="1">是</option>
				</select>
				<button class="btn btn-primary btn-sm" id="search"
					onclick="return false;">查询</button>
			</div>
		</form>

		<div class="choice_condition_menu">
			<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>
			<c:forEach items="${res}" var="key">
				<c:if test="${key.ishide=='0'}"> 
			  ${key.description}
			</c:if>
			</c:forEach>
		</div>
		<div class="table_content">
			<table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>

	<script type="text/javascript" src="${ctx}/js/dept/list.js<%=ts%>"></script>
</body>
</html>