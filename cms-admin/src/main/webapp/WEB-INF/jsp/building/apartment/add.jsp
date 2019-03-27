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
					<label class="col-sm-3 control-label">类型</font></label>
					<div class="col-sm-8">
						<select id="position" class="selectpicker" data-width="200px">
							<c:forEach  items="${types}" var="type">
								<option value="${type.id}">${type.name }</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">名称</label>
					<div class="col-sm-8">
						<input id="name" name="name" type="file" class="file-loading" />
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-3 control-label">缩略图</label>
					<div class="col-sm-8">
						<input id="url" name="url" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">轮播一</label>
					<div class="col-sm-8">
						<input id="url_one" name="url_one" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">轮播二</label>
					<div class="col-sm-8">
						<input id="url_two" name="url_two" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">轮播三</label>
					<div class="col-sm-8">
						<input id="url_three" name="url_three" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>

			</form>
		</div>
	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${id}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/building/apartment/add.js<%=ts%>"></script>
</body>
</html>