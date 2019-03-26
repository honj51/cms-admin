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
					<label class="col-sm-3 control-label">宣传图片位置</font></label>
					<div class="col-sm-8">
						<select id="type" class="selectpicker" data-width="100px">
							<option value="1"
								<c:if test="${1==formMap.type }">
							selected = "selected"
							</c:if>>酒店页面</option>
							<option value="2"
								<c:if test="${2==formMap.type }">
							selected = "selected"
							</c:if>>当日餐品页面</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">广告图片</label>
					<div class="col-sm-8">
						<input id="url" name="url" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>

			</form>
		</div>
	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${formMap.id}";
		var url = "${formMap.url}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/hotel/prop/edit.js<%=ts%>"></script>
</body>
</html>