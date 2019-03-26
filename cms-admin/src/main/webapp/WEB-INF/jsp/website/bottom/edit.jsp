<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<style type="text/css">
.file-drop-zone {
	height: auto;
}

.file-caption-main {
	display: none;
}

.kv-preview-data file-preview-image {
	max-width: 100%;
}
</style>
</head>
<body style="overflow-x: hidden">
	<div class="choice_condition_menu fixtop">
		<button id="save" type="button" class="btn btn-primary btn-sm">保存</button>
		<button id="addWeb" type="button" class="btn btn-primary btn-sm">添加页面</button>
	</div>

	<div class="row table_content" id="accordion">
		<div class="col-md-6">
			<form role="form" class="form-horizontal">
				<div class="form-group">
					<label class="col-sm-3 control-label">底部链接名称</font></label>
					<div class="col-sm-9">
						<input id="name" type="text" class="form-control" value="${formMap.name}"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">底部链接图片</label>
					<div class="col-sm-9">
						<input id="picUrl" name="picUrl" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>
			</form>
		</div>
	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${formMap.id}";
		var picUrl = "${formMap.pic_url}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/website/bottom/edit.js<%=ts%>"></script>
</body>
</html>