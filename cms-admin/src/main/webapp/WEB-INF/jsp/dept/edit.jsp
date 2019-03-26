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
					<label class="control-label">名称<font color="#ff0000">*</font></label>
				</div>
				<div class="col-sm-9">
					<input type="text" class="form-control" placeholder="请输入部门名称"
						name="name" id="name" value="${deptFormMap.name}">
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">是否禁用</label>
				<div class="col-sm-9">
					<select class="selectpicker" name="locked" id="locked">
						<option value="1"
							<c:if test="${1==deptFormMap.is_locked}">
							selected = "selected"
							</c:if>>是</option>
						<option value="0"
							<c:if test="${0==deptFormMap.is_locked}">
							selected = "selected"
							</c:if>>否</option>
					</select>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">备注</label>
				<div class="col-sm-9">
					<textarea type="text" class="form-control" placeholder="请输入备注"
						name="remarks" id="remarks">${deptFormMap.remarks}</textarea>
				</div>
			</div>
		</div>
	</form>
	<script type="text/javascript">
		var rootPath = "${ctx}";
		var id = "${deptFormMap.id}";
	</script>
	<script type="text/javascript" src="${ctx}/js/dept/edit.js<%=ts%>"></script>
</body>
</html>