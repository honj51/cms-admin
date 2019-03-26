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
					<label class="col-sm-3 control-label">所属新闻标题</font></label>
					<div class="col-sm-8">
						<select id="newsTitle" class="js-example-basic-single" style="width: 200px;">
							<option value="">请选择所属新闻标题</option>
							<c:forEach var="newsTitleFormMap" items="${newsTitleFormMaps}">
								<option value="${newsTitleFormMap.id}"
									<c:if test="${newsTitleFormMap.id==formMap.news_title_id}">
							selected="selected"
						</c:if>>${newsTitleFormMap.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">新闻标题</font></label>
					<div class="col-sm-8">
						<input id="title" type="text" class="form-control"
							value="${formMap.title}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">新闻内容</font></label>
					<div class="col-sm-8">
						<textarea rows="2" id="content" type="text" class="form-control"
							onkeyup="keynam(event,this)">${formMap.content}</textarea>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">新闻列表图片</label>
					<div class="col-sm-8">
						<input id="url" name="url" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">新闻详情图片</label>
					<div class="col-sm-8">
						<input id="detailUrl" name="detailUrl" type="file"
							class="file-loading" accept="image/*" />
					</div>
				</div>

			</form>
		</div>
	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${formMap.id}";
		var url = "${formMap.url}";
		var detailUrl = "${formMap.detail_url}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/website/news/edit.js<%=ts%>"></script>
</body>
</html>