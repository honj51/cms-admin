<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>

	<div class="col-md-12 content">

		<div class="choice_condition_menu">
			<a id="save" type="button" class="btn btn-primary btn-sm">保存</a>
		</div>

		<div class="choice_condition_menu">
			<form>
				<label>姓名</label><input type="text" id="userName"
					name="userFormMap.userName"> <label>用户</label><input
					type="text" id="accountName" name="userFormMap.accountName">
				<label>所属企业</label><input type="text" id="supName"
					name="userFormMap.supName">
				<button class="btn btn-primary btn-sm" id="search"
					onclick="return false;">查询</button>
			</form>
		</div>

		<div class="table_content">
			<table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>

	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/system/user/data_permission.js<%=ts%>"></script>

	<script type="text/javascript">
		var userId = '${userId}';
		var relatedUserIdSet = new Set();
		<c:forEach items="${dataPermissionFormMaps}" var="dataPermission">
		relatedUserIdSet.add("${dataPermission.related_user_id}");
		</c:forEach>
	</script>
</body>
</html>