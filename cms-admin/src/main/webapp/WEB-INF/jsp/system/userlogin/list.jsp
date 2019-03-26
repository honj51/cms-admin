<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>
	<div class="col-md-12 content">	
		<div class="choice_condition_menu">
			<form role="form" id="searchForm"
				name="searchForm">
				<input class="selectpicker" id="accountName" placeholder="用户/姓名/电话" style="width:200px">
				<button  class="btn btn-primary btn-sm" id="searchLoginLog" onclick="return false;">查询</button>
				<a href="javascript:void(0)"   id="refreshbutton" class="btn btn-primary btn-sm">刷新</a>
			</form>
		</div>
		<div style="margin-left:20px">
			    <table id="jqGrid"></table>
			    <div id="jqGridPager"></div>
		</div>
	</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/userlogin/list.js<%=ts%>"></script>