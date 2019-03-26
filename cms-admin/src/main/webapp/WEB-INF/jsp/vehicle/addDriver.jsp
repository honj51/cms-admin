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
					<label class="col-sm-3 control-label">司机姓名<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<input class="form-control" id="name" type="text"
							placeholder="请输入司机姓名" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">司机电话<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<input id="phone" type="text" class="form-control"
							placeholder="请输入司机电话" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">车牌号<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<input id="carNo" type="text" class="form-control"
							value="${vehicleFormMap.no}"  readonly/>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">身份证号</label>
					<div class="col-sm-8">
						<input id="idCardNo" type="text" class="form-control"
							placeholder="请输入身份证号" />
					</div>
				</div>
			</form>
		</div>

		<div class="col-md-6">
			<form role="form" class="form-horizontal">
				
				<div class="form-group">
					<label class="col-sm-3 control-label">保险公司</label>
						
					<div class="col-sm-8">
						<input id="insuranceCompany" type="text" class="form-control"
							value="${vehicleFormMap.insurance_company }" readonly/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">保险到期日期</label>
					<div class="col-sm-8">
						<input id="insuranceExpirationDate" type="text" class="form-control"
							value="${vehicleFormMap.insurance_expiration_date }" readonly/>
					</div>
				</div>								
			</form>
		</div>
	</div>
	<style>
		.js-example-basic-single{width:220px;}
	</style>
	<script type="text/javascript">
		var displayType = "${displayType}";
		var vehicleId = "${vehicleFormMap.id}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/vehicle/addDriver.js"></script>
	<script src="${ctx}/common/identityCodeValid.js<%=ts%>"></script>
</body>
</html>