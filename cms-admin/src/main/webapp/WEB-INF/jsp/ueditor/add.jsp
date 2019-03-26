<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<script type="text/javascript" src="${ctx}/vendor/ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="${ctx}/vendor/ueditor/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/vendor/ueditor/lang/zh-cn/zh-cn.js"></script>
</head>
<body style="overflow-x: hidden">
	<div class="choice_condition_menu fixtop">
		<button id="save" type="button" class="btn btn-primary btn-sm">保存</button>
	</div>
	<textarea id="ueditor" name="content" type="text/plain" style="width: 100%;height: 100%;">
    </textarea>
	
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/ueditor/add.js<%=ts%>"></script>
	<!-- 加载编辑器的容器 -->
</body>
</html>