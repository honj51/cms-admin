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
		<button id="saveUser" type="button" class="btn btn-primary btn-sm">保存</button>
	</div>

	<form id="form" name="form" class="form-horizontal">
		<div class="panel-body">
			<div class="form-group">
			<label class="col-sm-3 control-label">姓名<font color="#ff0000">*</font></label>
			<div class="col-sm-9">
				<input type="text" class="form-control" placeholder="请输入姓名"
					value="${user.userName}" name="userFormMap.userName" id="userName">
			</div>
		    </div>
		    
			<div class="form-group">
			<label class="col-sm-3 control-label">用户名<font color="#ff0000">*</font></label>
			<div class="col-sm-9">
				<input type="text" class="form-control checkacc" placeholder="请输入用户"
					value="${user.accountName}" name="userFormMap.accountName"
					id="accountName" readonly="readonly">
			</div>
		    </div>
			
			<div class="form-group">
			<label class="col-sm-3 control-label">电话<font color="#ff0000">*</font></label>
			<div class="col-sm-9">
				<input type="text" class="form-control checkacc" placeholder="请输入电话"
					name="phone" id="phone" value="${user.phone}" />
			</div>
		    </div>
			
			<div class="form-group">
			<label class="col-sm-3 control-label">角色<font color="#ff0000">*</font></label>
			<div class="col-sm-9">    <!-- data-width="260px" -->
				<select id="role" class="selectpicker" >
					<option value="">请选择角色</option>
					<c:forEach var="role" items="${roles}" varStatus="status">
						<option value="${role.id}"
							<c:if test="${role.id==user.roleId}">
								selected="selected"
							</c:if>>${role.name}</option>
					</c:forEach>
				</select>
			</div>
		</div>
			
			<div class="form-group">
					<label class="col-sm-3 control-label">是否管理员</label>
					<div class="col-sm-9">
						<c:choose>
							<c:when test="${user.is_admin == 1}">
								<label> <input type="radio" id="isAdmin"
									name="isAdmin"  value="1" checked="checked"/> 是
								</label> <label> <input type="radio" id="isAdmin"
									name="isAdmin"  value="0" /> 否
								</label>
							</c:when>
							<c:otherwise>
								<label> <input type="radio" id="isAdmin"
									name="isAdmin"  value="1" /> 是
								</label> <label> <input type="radio" id="isAdmin"
									name="isAdmin"  value="0" checked="checked"/> 否
								</label>
							</c:otherwise>
						</c:choose>
					</div>
				</div>
				
			<div class="form-group">
			<label class="col-sm-3 control-label">是否禁用<font color="#ff0000">*</font></label>
			<div class="col-sm-9">
				<select class="selectpicker" name="userFormMap.locked" id="locked">
					<option value="1"
						<c:if test="${user.is_locked eq 1}"> selected="selected"</c:if>>是</option>
					<option value="0"
						<c:if test="${user.is_locked eq 0}"> selected="selected"</c:if>>否</option>
				</select>
			</div>
		</div>

			<div class="form-group">
				<label class="col-sm-3 control-label">所属公司</label>
				<div class="col-sm-9">
					<select class="selectpicker js-example-basic-single" name="transportationCompany" id="transportationCompany" style="width: 220px">
						<option value="">请选择所属公司</option>
						<c:forEach var="transportationCompanyFormMap" items="${transportationCompanyFormMaps}" varStatus="status">
							<option value="${transportationCompanyFormMap.id}"
							<c:if test="${transportationCompanyFormMap.id ==  user.org_id}"> selected="selected"</c:if>>
							${transportationCompanyFormMap.name}</option>
						</c:forEach>
					</select>
				</div>
			</div>

			<div class="form-group">
			<label class="col-sm-3 control-label">所属部门<font color="#ff0000">*</font></label>
			<div class="col-sm-9">
				<%-- <select id='department' name="department"
					class="selectpicker form-control" data-width="120px">
					<option value="">=请选择=</option>
					<c:forEach var="salesTeamFormMap" items="${salesTeamFormMaps}"
						varStatus="status">
						<option value="${salesTeamFormMap.id}"
							<c:if test="${salesTeamFormMap.id==user.dept_id}">
								selected="selected"
							</c:if>>${salesTeamFormMap.name}</option>
					</c:forEach>
				</select> --%>    <!-- style="width: 400px;" -->
				 <input name="deptName" id="deptName"  
                type="text" class=form-control checkacc  value="${user.dept_name}"  
                onfocus="showMenu()" onclick="showMenu()" />  
                 <input type="hidden" name="deptId" id="deptId" value="${user.dept_id}" />
			</div>
		</div>

			
			<div class="form-group">
			<label class="col-sm-3 control-label">备注</label>
			<div class="col-sm-9">
				<textarea type="text" class="form-control" placeholder="请输入备注"
					name="userFormMap.remarks" id="remarks">${user.remarks}</textarea>
			</div>
			</div>
		<div id="menuContent" class="menuContent"  style="display: none; position: absolute;">  
                     <ul id="deptTree" class="ztree" style="margin-top: 0; width: 160px;background-color:white;"></ul>  
         </div>
    </div>
	</form>
	<script type="text/javascript">
		var id = "${user.id}";
		var dept_id = "${user.dept_id}";
	</script>
	<script type="text/javascript" src="${ctx}/js/system/user/edit.js<%=ts%>"></script>
</body>
</html>