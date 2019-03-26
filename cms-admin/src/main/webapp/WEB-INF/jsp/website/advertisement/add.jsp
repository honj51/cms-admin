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
					<label class="col-sm-3 control-label">广告位置</font></label>
					<div class="col-sm-8">
						<select id="position" class="selectpicker" data-width="200px">
							<option value="1">集团首页轮播图</option>
							<option value="2">集团介绍轮播图</option>
							<option value="3">企业文化轮播图</option>
							<option value="4">新闻动态轮播图</option>
							<option value="5">业务领域轮播图</option>
							<option value="6">人才招聘轮播图</option>
							<option value="7">联系我们轮播图</option>
							<option value="8">集团首页左下方轮播图</option>
							<option value="9">集团首页右下方轮播图</option>
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
		var id = "${id}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/website/advertisement/add.js<%=ts%>"></script>
</body>
</html>