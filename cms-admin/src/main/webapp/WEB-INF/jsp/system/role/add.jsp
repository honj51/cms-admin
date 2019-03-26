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
		<button id="saveRole" type="button" class="btn btn-primary btn-sm">保存</button>
	</div>

	<form id="form" name="form" class="form-horizontal">
		<div class="panel-body">
			<div class="form-group">
				<label class="col-sm-3 control-label">角色名<font color="#ff0000">*</font></label>
				<div class="col-sm-9">
					<input type="text" class="form-control checkacc"
						placeholder="请输入角色名" name="roleFormMap.name" id="name">
				</div>
			</div>
			
			<div class="form-group">
				<label class="col-sm-3 control-label">描述</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" placeholder="请输入账号描述"
						name="roleFormMap.description" id="description">
				</div>
			</div>
			
		</div>
	</form>
	<script type="text/javascript">
	var rootPath = "${ctx}";
	</script>
	<script type="text/javascript" src="${ctx}/js/system/role/add.js<%=ts%>"></script>
</body>
</html>