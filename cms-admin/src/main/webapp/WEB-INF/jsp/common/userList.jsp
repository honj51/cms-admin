<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>
	<div class="col-md-12">
		<div class="choice_condition_menu">
			<label class="control-label"> 姓名</label> <input id="name" name="name"
				type="text" /> <label class="control-label"> 电话</label> <input
				id="phone" name="phone" type="text" />
			<button id="search" class="btn btn-primary btn-sm">查询</button>
			<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>
			<button onclick="return false;" class="btn btn-primary btn-sm"
				id="commit">确定</button>
		</div>

		<div style="margin-left: 5px">
			<table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>

	<script>
		var targetId = "${targetId}";
	</script>
	<script src="${ctx}/js/common/userList.js<%=ts%>"></script>
</body>
</html>
