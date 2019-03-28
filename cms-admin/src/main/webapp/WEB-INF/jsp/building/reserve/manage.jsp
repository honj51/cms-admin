<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body style="overflow-x: hidden">
	<div class="choice_condition_menu fixtop">
		<button id="save" type="button" class="btn btn-primary btn-sm">保存</button>
	</div>

	<div class="row table_content" id="accordion">
		<div class="col-md-6">
			<form role="form" class="form-horizontal">
				<div class="form-group">
					<label class="col-sm-3 control-label">预约结果</label>
					<div class="col-sm-8">
						<select id="manageResult" class="selectpicker" data-width="200px">
								<option value="1">可看房</option>
								<option value="2">不可看房</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">处理时间</label>
					<div class="col-sm-8">
						<input id="manageTime" class="form-control"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">处理人</label>
					<div class="col-sm-8">
						<input id="manageUserName" type="text" class="form-control"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">处理人电话</label>
					<div class="col-sm-8">
						<input id="manageUserPhone" type="text" class="form-control"/>
					</div>
				</div>
				
			</form>
		</div>
	</div>

	<script>
		var id = "${id}";
		var rootPath = "${ctx}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/building/reserve/manage.js<%=ts%>"></script>
</body>
</html>