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
					<label class="col-sm-3 control-label">车辆所属人<font
						color="#ff0000"></font></label>
					<div class="col-sm-8">
						<input id="ownerName" type="text" class="form-control"
							placeholder="请输入所属人" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车牌号<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<input id="carNo" type="text" class="form-control"
							placeholder="请输入车牌号" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆类型<font
						color="#ff0000">*</font></label>
					<div class="col-sm-8">
						<select id="typeCode" class="js-example-basic-single"
							data-width="100%">
							<option value="">请选择车辆类型</option>
							<c:forEach items="${vehicleTypeFormMaps}"
								var="vehicleTypeFormMap">
								<option value="${vehicleTypeFormMap.code}">${vehicleTypeFormMap.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆道路运输证编号</label>
					<div class="col-sm-8">
						<input id="vehicleRoadtransportNumber" type="text"
							class="form-control" placeholder="请输入车辆道路运输证编号" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆准载(牵引)重量(吨)</label>
					<div class="col-sm-8">
						<input id="vehicleAllowTonnage" type="text" class="form-control"
							placeholder="请输入车辆准载重量" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆总质量(kg)</label>
					<div class="col-sm-8">
						<input id="grossMass" type="text" class="form-control"
							placeholder="请输入车辆总质量" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆整备质量(kg)</label>
					<div class="col-sm-8">
						<input id="unladenMass" type="text" class="form-control"
							placeholder="请输入车辆整备质量" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆识别代号</label>
					<div class="col-sm-8">
						<input id="vin" type="text" class="form-control"
							placeholder="请输入车辆识别代号" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证档案编号</label>
					<div class="col-sm-8">
						<input id="fileNo" type="text" class="form-control"
							placeholder="请输入车辆行驶证档案编号" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">核定载人数</label>
					<div class="col-sm-8">
						<input id="approvedPassengersCapacity" type="text"
							class="form-control" placeholder="请输入核定载人数" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">外廓尺寸</label>
					<div class="col-sm-8">
						<input id="overallDimension" type="text" class="form-control"
							placeholder="请输入车辆外廓尺寸" />
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
							placeholder="请输入设备S/N" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">保险公司</label>
					<div class="col-sm-8">
						<input id="insuranceCompany" type="text" class="form-control"
							placeholder="请输入保险公司" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">保险到期日期</label>
					<div class="col-sm-8">
						<input id="insuranceExpirationDate" type="text"
							class="form-control" placeholder="请输入保险到期日期" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆品牌型号</label>
					<div class="col-sm-8">
						<input id="brand" type="text" class="form-control"
							placeholder="请输入车辆行驶证品牌型号" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证注册日期</label>
					<div class="col-sm-8">
						<input id="vehicleLicenseRegistDate" type="text"
							class="form-control" placeholder="请输入车辆行驶证注册日期" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证发证日期</label>
					<div class="col-sm-8">
						<input id="vehicleLicenseIssueDate" type="text"
							class="form-control" placeholder="请输入车辆行驶证发证日期" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">发动机编号</label>
					<div class="col-sm-8">
						<input id="engineNo" type="text" class="form-control"
							placeholder="请输入发动机号码" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证所有人住址</label>
					<div class="col-sm-8">
						<input id="address" type="text" class="form-control"
							placeholder="请输入住址" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆使用性质</label>
					<div class="col-sm-8">
						<input id="vehicleUseCharacter" type="text" class="form-control"
							placeholder="请输入车辆使用性质" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证备注</label>
					<div class="col-sm-8">
						<input id="vehicleLicenseComment" type="text" class="form-control"
							placeholder="请输入车辆行驶证备注" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">车辆行驶证检验记录</label>
					<div class="col-sm-8">
						<input id="inspectionRecord" type="text" class="form-control"
							placeholder="请输入车辆行驶证检验记录" />
					</div>
				</div>
			</form>
		</div>

	</div>
	<style>
.js-example-basic-single {
	width: 220px;
}
</style>
	<script type="text/javascript">
		var displayType = "${displayType}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/vehicle/add.js<%=ts%>"></script>
	<script src="${ctx}/common/identityCodeValid.js"></script>
</body>
</html>