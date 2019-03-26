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
					<label class="col-sm-3 control-label">营业时间</font></label>
					<div class="col-sm-8">
						<input id="businessTime" type="text" class="form-control" placeholder="请输入营业时间" value="${formMap.business_time}"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">电话</font></label>
					<div class="col-sm-8">
						<input id="phone" type="text" class="form-control" placeholder="请输入电话" value="${formMap.phone}"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">餐饮介绍</label>
					<div class="col-sm-8">
						<textarea row="2" type="text" class="form-control" id="info">${formMap.info}</textarea>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">地理位置图片</label>
					<div class="col-sm-8">
						<input id="addressUrl" name="addressUrl" type="file" class="file-loading"
							accept="image/*" />
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
	<script src="${ctx}/js/hotel/info/edit.js<%=ts%>"></script>
</body>
</html>