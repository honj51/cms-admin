<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<style type="text/css">
.papers{
	display: inline-block;
	float: right;
	padding-left: 20px;
}
</style>
</head>
<body>
	<div class="col-md-12">
		<form role="form" id="searchForm" name="searchForm">
			<div class="choice_condition_menu">
				<input id="queryParam" type="text" class="selectpicker" placeholder="所属市" style="width:160px;"/> 
				<button onclick="return false;" class="btn btn-primary btn-sm" id="search">查询</button>
			</div>
		</form>
		
		   <header class="choice_condition_menu">
				<a type="button" id="refresh" class="btn btn-primary btn-sm">刷新</a>                                                                                                                                                                    
			</header>
		<div style="margin-left: 5px">
			<table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>
	<script type="text/javascript">
	   var provienceAbbre  = "${provienceAbbre}"
	</script>
	<script src="${ctx}/js/vehicle/districtDetailStats.js<%=ts%>"></script>
</body>
</html>
