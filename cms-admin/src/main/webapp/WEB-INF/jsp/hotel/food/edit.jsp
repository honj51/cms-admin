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
					<label class="col-sm-3 control-label">标题</font></label>
					<div class="col-sm-8">
						<input id="title" type="text" class="form-control"
							placeholder="请输入标题" value="${formMap.title}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">推荐星级</font></label>
					<div class="col-sm-8">
						<select id="starLevel" class="selectpicker" data-width="150px">
							<option value="1"
								<c:if test="${1==formMap.star_level }">
							selected = "selected"
							</c:if>>一星</option>
							<option value="2"
								<c:if test="${2==formMap.star_level }">
							selected = "selected"
							</c:if>>二星</option>
							<option value="3"
								<c:if test="${3==formMap.star_level }">
							selected = "selected"
							</c:if>>三星</option>
							<option value="4"
								<c:if test="${4==formMap.star_level }">
							selected = "selected"
							</c:if>>四星</option>
							<option value="5"
								<c:if test="${5==formMap.star_level }">
							selected = "selected"
							</c:if>>五星</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">所属酒店</font></label>
					<div class="col-sm-8">
						<input id="content" type="text" class="form-control"
							placeholder="请输入所属酒店" value="${formMap.content}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">餐品展示图片</label>
					<div class="col-sm-8">
						<input id="firstUrl" name="firstUrl" type="file"
							class="file-loading" accept="image/*" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">餐品展示图片</label>
					<div class="col-sm-8">
						<input id="secondUrl" name="secondUrl" type="file"
							class="file-loading" accept="image/*" />
					</div>
				</div>

			</form>
		</div>
	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${formMap.id}";
		var firstUrl = "${formMap.first_url}";
		var secondUrl = "${formMap.second_url}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/hotel/food/edit.js<%=ts%>"></script>
</body>
</html>