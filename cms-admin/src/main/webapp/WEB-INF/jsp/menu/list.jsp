<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body>
	<div class="col-xs-12 content">
		<div class="col-xs-3">
			<ul id="resTree" class="ztree"></ul>
		</div>
		<div class="col-xs-9">
			<div class="choice_condition_menu">
				<a type="button" id="refreshbutton" class="btn btn-primary btn-sm">刷新</a>
				<a type="button" id="open" class="btn btn-primary btn-sm">展开</a> <a
					type="button" id="close" class="btn btn-primary btn-sm">关闭</a> <a
					type="button" id="addRes" class="btn btn-primary btn-sm">增加</a> <a
					type="button" id="editRes" class="btn btn-primary btn-sm">修改</a> <a
					type="button" id="delRes" class="btn btn-primary btn-sm">删除</a> <a
					type="button" id="save" class="btn btn-primary btn-sm">保存</a>
				<a type="button" id="searchRes" class="btn btn-primary btn-sm">查看权限</a>
			</div>
			<div id="detailDiv">
				<div class="panel-body">

					<div class="form-group">
						<label class="col-xs-3 control-label">序号</label>
						<div class="col-xs-9">
							<input type="text" style="width: 200px"
								class="form-control checkacc" name="disnum" id="disnum"
								placeholder="请输入序号" readonly> <input type="hidden"
								id="orgid" name="orgid">
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-3 control-label">菜单名称</label>
						<div class="col-xs-9">
							<input type="text" class="form-control checkacc"
								style="width: 200px" name="areaname" id="areaname"
								placeholder="请输入菜单名称">
						</div>
					</div>
					<div class="form-group" id="menu">
						<label class="col-xs-3 control-label">上级菜单</label>
						<div class="col-xs-9">
							<select id="parentarea" class="js-example-basic-single"
								data-width="200px">
								<option value="">请选择上级菜单</option>
								<c:forEach items="${menuFormMaps}" var="menu">
									<option value="${menu.id}">${menu.name}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					<div class="form-group" id="resUrl">
						<label class="col-xs-3 control-label">资源路径</label>
						<div class="col-xs-9">
							<input type="text" class="form-control checkacc"
								style="width: 200px" name="resUrl" id="resUrlName"
								placeholder="请输入访问路径">
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-3 control-label">level</label>
						<div class="col-xs-9">
							<input type="text" class="form-control checkacc"
								style="width: 200px" name="level" id="level" placeholder="请输入"
								>
						</div>
					</div>

					<div class="form-group">
						<label class="col-xs-3 control-label">描述</label>
						<div class="col-xs-9">
							<input type="text" class="form-control checkacc"
								style="width: 200px" name="description" id="description"
								placeholder="请输入描述内容">
						</div>
					</div>

				</div>
			</div>
		</div>
		<div class="col-xs-9">
		    <table id="jqGrid"></table>
			<div id="jqGridPager"></div>
		</div>
	</div>
	<script type="text/javascript" src="${ctx}/js/menu/list.js<%=ts%>"></script>
</body>
</html>