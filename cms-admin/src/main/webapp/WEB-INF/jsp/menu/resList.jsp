<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<script type="text/javascript">
	
</script>
</head>
<body>
	<div class="col-md-12">
		<header class="choice_condition_menu">
			<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>
			<a type="button" id="cancelRes" class="btn btn-primary btn-sm">取消</a>
		</header>
		<div style="margin-left: 5px">
			<table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>

	<script>
		var resId = "${resId}";
	</script>
	<script src="${ctx}/js/menu/resList.js<%=ts%>"></script>

</body>
</html>