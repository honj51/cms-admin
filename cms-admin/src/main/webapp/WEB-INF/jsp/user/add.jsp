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
						name="name" id="name">
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">用户名<font
					color="#ff0000">*</font></label>
				<div class="col-sm-9">
					<input type="text" class="form-control checkacc"
						placeholder="请输入用户名" name="accountName" id="accountName">
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">电话</label>
				<div class="col-sm-9">
					<input type="text" class="form-control checkacc"
						placeholder="请输入电话" name="phone" id="phone">
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">密码</label>
				<div class="col-sm-9" style="color: red;">默认密码为:123456789</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">部门<font
					color="#ff0000">*</font></label>
				<div class="col-sm-9">
					<select id="dept" class="js-example-basic-single">
						<option value="">请选择部门</option>
						<c:forEach var="deptFormMap" items="${deptFormMaps}">
							<option value="${deptFormMap.id}">${deptFormMap.name}</option>
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
					</select>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">是否禁用<font
					color="#ff0000">*</font></label>
				<div class="col-sm-9">
					<select class="selectpicker" name="locked" id="locked">
						<option value="1">是</option>
						<option value="0" selected="selected">否</option>
					</select>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">备注</label>
				<div class="col-sm-9">
					<textarea type="text" class="form-control" placeholder="请输入备注"
						name="remarks" id="remarks"></textarea>
				</div>
			</div>
		</div>
	</form>
	<script type="text/javascript">
		var rootPath = "${ctx}";
	</script>
	<script type="text/javascript" src="${ctx}/js/user/add.js<%=ts%>"></script>
</body>
</html>