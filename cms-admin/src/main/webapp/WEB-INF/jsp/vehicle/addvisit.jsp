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
					<label class="col-sm-3 control-label">拜访时间<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<input class="form-control" id="visitTime" type="text" placeholder="请选择拜访时间"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">拜访对象<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<select id="driver" class="js-example-basic-single"  style="width: 200px">
							<c:forEach items="${driverFormMaps }" var="driverFormMap">
								<option value="${driverFormMap.id }">${driverFormMap.name } ${driverFormMap.phone }</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">拜访内容<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<textarea type="textarea" class="form-control"
							name="content" id="content" placeholder="请输入拜访内容"></textarea>
					</div>
				</div>
			</form>
		</div>

		<div class="col-md-6">
			<form role="form" class="form-horizontal">
				<div class="form-group">
					<label class="col-sm-3 control-label">拜访类型<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<select id="type" class="selectpicker"  >
							<option value="">请选择拜访类型</option>
							<option value="1">见面拜访</option>
							<option value="2">电话拜访</option>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">拜访结果<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8" id="visitResult">
						<select id="result" class="selectpicker" >
						    <option value="">请选择拜访结果</option>
							<option value="1">可派车</option>
							<option value="2">不可派车</option>
							<option value="3">无效司机</option>
						</select>
					</div>
				</div>
				<div id = "returnTimeCell" class="form-group">
					<label class="col-sm-3 control-label">回车时间<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<input class="form-control" id="returnTime" type="text" placeholder="请输入回车时间"/>
					</div>
				</div>
			</form>
		</div>
	</div>

	<script>
		var vehicleId = "${vehicleId}";
	</script>
	<script src="${ctx}/js/vehicle/addvisit.js<%=ts%>"></script>
</body>
</html>