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
	</div>

	<div class="row table_content" id="accordion">
		<div class="col-md-6">
			<form role="form" class="form-horizontal">

				<div class="form-group">
					<label class="col-sm-3 control-label">类型名称</label>
					<div class="col-sm-8">
						<input id="name" class="form-control" type="text"
							value="${formMap.name}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">备注</label>
					<div class="col-sm-8">
						<textarea rows="2" id="remarks" type="text" class="form-control">${formMaps.remarks}</textarea>
					</div>
				</div>

			</form>
		</div>
	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${formMap.id}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/building/type/edit.js<%=ts%>"></script>
</body>
</html>