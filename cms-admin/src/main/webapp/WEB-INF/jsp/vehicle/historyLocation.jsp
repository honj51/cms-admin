<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body style="overflow-x: hidden">
	<div class="choice_condition_menu fixtop">
		<button id="location" type="button" class="btn btn-primary btn-sm">获取定位</button>
	</div>

	<div class="row table_content" id="accordion">
		<div class="col-md-6">
			<form role="form" class="form-horizontal">

				<div class="form-group">
					<label class="col-sm-3 control-label">车牌号</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" value="${vehicleNo}"
							disabled="disabled" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">起始日期</label>
					<div class="col-sm-8">
						<input id="startDate" type="text" class="form-control"
							placeholder="请输入起始日期" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">截止日期</label>
					<div class="col-sm-8">
						<input id="endDate" type="text" class="form-control"
							placeholder="请输入截止日期" />
					</div>
			</form>
		</div>

	</div>
	<script>
		var driverId = "${driverId}";
		var vehicleId = "${vehicleId}";
		var vehicleNo = "${vehicleNo}";
		var deliveryId = "${deliveryId}";
	</script>
	<script src="${ctx}/js/vehicle/historyLocation.js<%=ts%>"></script>
</body>
</html>