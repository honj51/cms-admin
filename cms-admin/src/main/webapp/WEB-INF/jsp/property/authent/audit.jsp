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
					<label class="col-sm-3 control-label">审核结果</label>
					<div class="col-sm-8">
						<select id="type" class="selectpicker" data-width="200px">
							<option value="">请选择</option>
								<option value="2">审核通过</option>
								<option value="3">审核失败</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">审核原因</label>
					<div class="col-sm-8">
						<input id="remarks" name="remarks" class="form-control"
							value="${formMap.remarks}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">业主名称</label>
					<div class="col-sm-8">
						<input id="address" name="name" class="form-control"
							value="${formMap.name}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">业主电话</label>
					<div class="col-sm-8">
						<input id="phone" name="mobile" class="form-control"
							value="${formMap.mobile}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">业主地址</label>
					<div class="col-sm-8">
						<input id="phone" name="address" class="form-control"
							value="${formMap.address}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">业主身份证号</label>
					<div class="col-sm-8">
						<input id="phone" name="idcord" class="form-control"
							value="${formMap.idcord}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">图一</label>
					<div class="col-sm-8">
						<img src='${formMap.id_url}' width='500'>
					</div>
				</div>


				<div class="form-group">
					<label class="col-sm-3 control-label">图二</label>
					<div class="col-sm-8">
						<img src='${formMap.id_urls}' width='500'>
					</div>
				</div>


			</form>
		</div>
	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${formMap.id}";
		var url = "${formMap.url}";
		var urlOne = "${formMap.url_one}";
		var urlTwo = "${formMap.url_two}";
		var urlThree = "${formMap.url_three}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/property/authent/audit.js<%=ts%>"></script>
</body>
</html>