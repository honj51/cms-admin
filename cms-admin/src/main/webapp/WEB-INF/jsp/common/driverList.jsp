<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>

	<div class="choice_condition_menu">
		<button id="confirm" type="button" class="btn btn-primary btn-sm">确定</button>
	</div>

	<div class="choice_condition_menu">
		<label class="control-label"> 姓名</label> <input id="name" name="name"
			type="text" /> <label class="control-label"> 电话</label> <input
			id="phone" name="phone" type="text" />
		<button id="search" class="btn btn-primary btn-sm">查询</button>
	</div>

	<div class="table_content">
		<table id="jqGrid"></table>
		<div id="jqGridPager"></div>
	</div>
	<script src="${ctx}/js/common/driverList.js<%=ts%>"></script>
</body>
</html>