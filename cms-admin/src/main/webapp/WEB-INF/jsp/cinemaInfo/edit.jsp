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
					<label class="col-sm-3 control-label">影讯类型</font></label>
					<div class="col-sm-8">
						<select id="type" class="selectpicker" data-width="150px">
							<option value="1"
								<c:if test="${1==formMap.type }">
							selected = "selected"
							</c:if>>今日影讯</option>
							<option value="2"
								<c:if test="${2==formMap.type }">
							selected = "selected"
							</c:if>>明日影讯</option>
						</select>
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-3 control-label">影讯日期</label>
					<div class="col-sm-8">
						<input id="date" name="date" class="form-control" type="text" value="${formMap.date}"/>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">标题</label>
					<div class="col-sm-8">
						<input id="title" name="title" class="form-control" type="text" value="${formMap.title}"/>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">描述</label>
					<div class="col-sm-8">
						<textarea rows="2" id="description" type="text"
							class="form-control">${formMap.description}</textarea>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">影讯图片</label>
					<div class="col-sm-8">
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
	<script src="${ctx}/js/cinemaInfo/edit.js<%=ts%>"></script>
</body>
</html>