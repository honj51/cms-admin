<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@include file="/common/common.jspf"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/lyGrid.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/resources/list.js<%=ts%>"></script>
<div class="col-md-12 content">	
	<div class="choice_condition_menu">
		<form role="form" id="searchForm"
			name="searchForm">
				<label> 菜单名:</label> <input id="name" name="resFormMap.name">
			<a href="javascript:void(0)" class="btn btn-primary btn-sm" id="search">查询</a>
		</form>
	</div>
	
    <div class="choice_condition_menu">
		<c:forEach items="${res}" var="key">
			${key.description}
		</c:forEach>
	</div>
	
	<div class="table-responsive">
		<div id="paging" class="pagclass"></div>
	</div>
</div>