<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/common/common.jspf"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/log/list.js<%=ts%>"></script>
<div class="col-md-12 content">	
	<div class="choice_condition_menu">
		<form role="form" id="searchForm" name="searchForm">
			<input id="queryParam" placeholder="用户/模块">
			<button class="btn btn-primary btn-sm" id="searchLog" onclick="return false;">查询</button>
			<a type="button" id="refreshbutton" class="btn btn-primary btn-sm">刷新</a>
		</form>
	</div>
	
	<div style="margin-left:20px">
		    <table id="jqGrid"></table>
		    <div id="jqGridPager"></div>
	</div>
	
	<div class="table-responsive">
		<div id="paging" class="pagclass"></div>
	</div>
</div>