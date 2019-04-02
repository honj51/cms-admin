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
					<label class="col-sm-3 control-label">处理结果</label>
					<div class="col-sm-8">
						<select id="type" class="selectpicker" data-width="200px">
							<option value="">请选择</option>
								<option value="2">处理成功</option>
								<option value="3">处理失败</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">处理原因</label>
					<div class="col-sm-8">
						<input id="remarks" name="remarks" class="form-control"
							value="${formMap.remarks}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">报修类型</label>
					<div class="col-sm-8">
						<input id="address" name="type_name" class="form-control"
							value="${formMap.type_name}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">报修内容</label>
					<div class="col-sm-8">
						<input id="address" name="content" class="form-control"
							value="${formMap.content}" />
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-3 control-label">业主名称</label>
					<div class="col-sm-8">
						<input id="address" name="user_name" class="form-control"
							value="${formMap.user_name}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">业主电话</label>
					<div class="col-sm-8">
						<input id="phone" name="user_phone" class="form-control"
							value="${formMap.user_phone}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">业主地址</label>
					<div class="col-sm-8">
						<input id="phone" name="user_address" class="form-control"
							value="${formMap.user_address}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">图一</label>
					<div class="col-sm-8">
						<img src='${formMap.url_one}' width='500'>
					</div>
				</div>


				<div class="form-group">
					<label class="col-sm-3 control-label">图二</label>
					<div class="col-sm-8">
						<img src='${formMap.url_two}' width='500'>
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
	<script src="${ctx}/js/property/guarantee/audit.js<%=ts%>"></script>
</body>
</html>