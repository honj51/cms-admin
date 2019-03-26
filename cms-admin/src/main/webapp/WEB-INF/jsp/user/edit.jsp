<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="/common/common.jspf"%>
<style type="text/css">
.col-sm-3 {
	width: 15%;
	float: left;
	text-align: right;
}

.col-sm-9 {
	width: 78%;
	float: left;
	text-align: left;
}

label[class^="btn btn-default"] {
	margin-top: -4px;
}
</style>
</head>
<body>
	<div class="choice_condition_menu fixtop">
		<button id="save" type="button" class="btn btn-primary btn-sm">保存</button>
	</div>

	<form id="form" name="form" class="form-horizontal">
		<div class="panel-body">
			<div class="form-group">
				<div class="col-sm-3">
					<label class="control-label">姓名<font color="#ff0000">*</font></label>
				</div>
				<div class="col-sm-9">
					<input type="text" class="form-control" placeholder="请输入姓名"
						name="name" id="name" value="${userFormMap.name}">
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">电话</label>
				<div class="col-sm-9">
					<input type="text" class="form-control checkacc"
						placeholder="请输入电话" name="phone" id="phone"
						value="${userFormMap.phone}">
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">部门<font
					color="#ff0000">*</font></label>
				<div class="col-sm-9">
					<select id="dept" class="js-example-basic-single"
						style="width: 200px;">
						<option value="">请选择部门</option>
						<c:forEach var="deptFormMap" items="${deptFormMaps}">
							<option value="${deptFormMap.id}"
								<c:if test="${deptFormMap.id==userFormMap.dept_id}">
							selected="selected"
						</c:if>>${deptFormMap.name}</option>
						</c:forEach>
					</select>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">角色<font
					color="#ff0000">*</font></label>
				<div class="col-sm-9">
					<select id="role" class="selectpicker">
						<option value="">请选择角色</option>
						<c:forEach var="roleFormMap" items="${roleFormMaps}">
							<option value="${roleFormMap.id}"
								<c:if test="${roleFormMap.id==userFormMap.role_id}">
							selected="selected"
						</c:if>>${roleFormMap.name}</option>
						</c:forEach>
					</select>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">是否禁用<font
					color="#ff0000">*</font></label>
				<div class="col-sm-9">
					<select class="selectpicker" name="locked" id="locked">
						<option value="0"
							<c:if test="${0==userFormMap.is_locked }">
							selected = "selected"
							</c:if>>否</option>
						<option value="1"
							<c:if test="${1==userFormMap.is_locked }">
							selected = "selected"
							</c:if>>是</option>
					</select>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">备注</label>
				<div class="col-sm-9">
					<textarea type="text" class="form-control" placeholder="请输入备注"
						name="remarks" id="remarks">${userFormMap.remarks}</textarea>
				</div>
			</div>
		</div>
	</form>
	<script type="text/javascript">
		var rootPath = "${ctx}";
		var id = "${userFormMap.id}";
	</script>
	<script type="text/javascript" src="${ctx}/js/user/edit.js<%=ts%>"></script>
</body>
</html>