<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<style type="text/css">
.file-drop-zone {
	height: auto;
}

.kv-preview-data {
	max-width: 100%;
}

.file-caption-main {
	display: none;
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
					<label class="col-sm-3 control-label">车牌号<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<input id="carNo" type="text" class="form-control"
							value="${vehicleFormMap.no}" disabled='true' />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆类型<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<%-- <select id="typeCode" class="selectpicker">
								<c:forEach items="${vehicleTypeFormMaps}" var="vehicleTypeFormMap">
								<option value="${vehicleTypeFormMap.code}"
									<c:if test="${vehicleFormMap.type_code == vehicleTypeFormMap.code}">
									selected = "selected"
									</c:if>>${vehicleTypeFormMap.name}</option>
								</c:forEach>
						</select> --%>
						<select id="typeCode" class="js-example-basic-single"
							data-width="100%">
							<option value="">请选择车辆类型</option>
							<c:forEach items="${vehicleTypeFormMaps}"
								var="vehicleTypeFormMap">
								<option value="${vehicleTypeFormMap.code}"
									<c:if test="${vehicleFormMap.type_code == vehicleTypeFormMap.code}">
									selected = "selected"
									</c:if>>${vehicleTypeFormMap.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆道路运输证编号</label>
					<div class="col-sm-8">
						<input id="vehicleRoadtransportNumber" type="text"
							class="form-control"
							value="${vehicleFormMap.road_transport_code}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆准载(牵引)重量(吨)</label>
					<div class="col-sm-8">
						<input id="vehicleAllowTonnage" type="text" class="form-control"
							value="${vehicleFormMap.allow_tonnage}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">保险公司</label>

					<div class="col-sm-8">
						<input id="insuranceCompany" type="text" class="form-control"
							value="${vehicleFormMap.insurance_company}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">保险到期日期</label>
					<div class="col-sm-8">
						<input id="insuranceExpirationDate" type="text"
							class="form-control"
							value="${vehicleFormMap.insurance_expiration_date}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆品牌型号</label>
					<div class="col-sm-8">
						<input id="brand" type="text" class="form-control"
							value="${vehicleFormMap.brand}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证注册日期</label>
					<div class="col-sm-8">
						<input id="vehicleLicenseRegistDate" type="text"
							class="form-control"
							value="${vehicleFormMap.vehicle_license_regist_date}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证发证日期</label>
					<div class="col-sm-8">
						<input id="vehicleLicenseIssueDate" type="text"
							class="form-control"
							value="${vehicleFormMap.vehicle_license_issue_date}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">发动机编号</label>
					<div class="col-sm-8">
						<input id="engineNo" type="text" class="form-control"
							value="${vehicleFormMap.engine_no}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证识别代号</label>
					<div class="col-sm-8">
						<input id="vin" type="text" class="form-control"
							value="${vehicleFormMap.vin}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证使用性质</label>
					<div class="col-sm-8">
						<input id="vehicleUseCharacter" type="text" class="form-control"
							value="${vehicleFormMap.vehicle_use_character}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证档案编号</label>
					<div class="col-sm-8">
						<input id="fileNo" type="text" class="form-control"
							value="${vehicleFormMap.file_no}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">核定载人数</label>
					<div class="col-sm-8">
						<input id=approvedPassengersCapacity type="text"
							class="form-control"
							value="${vehicleFormMap.approved_passengers_capacity}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车头照</label>
					<div class="col-sm-8">
						<input id="carFrontPhoto" name="carFrontPhoto" type="file"
							class="file-loading" accept="image/*" />
					</div>
				</div>
			</form>
		</div>


		<div class="col-md-6">
			<form role="form" class="form-horizontal">

				<div class="form-group">
					<label class="col-sm-3 control-label">GPS设备S/N<font
						color="#ff0000"></font></label>
					<div class="col-sm-8">
						<input id="yySn" type="text" class="form-control"
							value="${vehicleFormMap.yy_sn}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证所有人</label>
					<div class="col-sm-8">
						<input id="ownerName" type="text" class="form-control"
							value="${vehicleFormMap.owner_name}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证所有人住址</label>
					<div class="col-sm-8">
						<input id="address" type="text" class="form-control"
							value="${vehicleFormMap.address}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">外廓尺寸</label>
					<div class="col-sm-8">
						<input id="overallDimension" type="text" class="form-control"
							value="${vehicleFormMap.overall_dimension}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">总质量(kg)</label>
					<div class="col-sm-8">
						<input id="grossMass" type="text" class="form-control"
							value="${vehicleFormMap.gross_mass}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">整备质量(kg)</label>
					<div class="col-sm-8">
						<input id="unladenMass" type="text" class="form-control"
							value="${vehicleFormMap.unladen_mass}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证备注</label>
					<div class="col-sm-8">
						<input id="vehicleLicenseComment" type="text" class="form-control"
							value="${vehicleFormMap.vehicle_license_comment}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证检验记录</label>
					<div class="col-sm-8">
						<input id="inspectionRecord" type="text" class="form-control"
							value="${vehicleFormMap.inspection_record}" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">行驶证</label>
					<div class="col-sm-8">
						<input id="vehicleLicense" name="vehicleLicense" type="file"
							class="file-loading" accept="image/*" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">道路运输证</label>
					<div class="col-sm-8">
						<input id="roadTransportPermit" name="roadTransportPermit"
							type="file" class="file-loading" accept="image/*" />
					</div>
				</div>
			</form>
		</div>
	</div>

	<script>
		var id = "${vehicleFormMap.id}";
		var displayType = "${displayType}";
		var vehicleLicenseUrl = "${vehicleFormMap.vehicleLicenseUrl}"
		var roadTransportPermitUrl = "${vehicleFormMap.roadTransportPermitUrl}";
		var carFrontPhotoUrl = "${vehicleFormMap.carFrontPhotoUrl}";
		var originalRoadTransportCode = "${vehicleFormMap.road_transport_code}";
	</script>

	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/vehicle/edit.js<%=ts%>"></script>
</body>
</html>