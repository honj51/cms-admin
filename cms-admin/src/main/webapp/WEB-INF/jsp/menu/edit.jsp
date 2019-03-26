<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/common/common.jspf"%>
 <script type="text/javascript" src="${ctx}/js/menu/edit.js<%=ts%>"></script>
</head>
<body>
	<div class="l_err" style="width: 100%; margin-top: 2px;"></div>
	<form>
	
		<div id="fixtop" class="choice_condition_menu">
			<button id = "save" type="button" class="btn btn-primary btn-sm" >保存</button>
    	</div>
		<div class="panel-body">
		<div class="l_err" style="width: 100%; margin-top: 2px;"></div>
	 	 <%--  <div class="form-group">
            <label class="col-sm-3 control-label">上级菜单名称</label>
            <div class="col-sm-8">
            <input type="text" class="form-control" value="${resFormMap.parent_name}" readonly="readonly"> 
            <input type="hidden" value="${resFormMap.parent_id}" name="resFormMap.parentId" id="parent_id">               
            </div>  
        </div> --%>
        <c:if test="${type == 'parentMenu'}">
        <div class="form-group" id="menu">
						<label class="col-xs-3 control-label">上级菜单</label>
						<div class="col-xs-9">
							<select id="parentarea" class="js-example-basic-single"
								data-width="100%">
								<option value="">请选择上级菜单</option>
								<c:forEach items="${menuFormMaps}" var="menu">
									<option value="${menu.id}"
									 <c:if test="${resFormMap.parentId == menu.id}">
								  selected = "selected"
								</c:if>>${menu.name}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</c:if>	
         <%-- <div class="form-group">
             <label class="col-sm-3 control-label">菜单编码<font color="red">*</font></label>
             <div class="col-sm-8">
             <input type="text" id="disnum" class="form-control" maxlength="100" name="resFormMap.id"  value="${resFormMap.id}">                
             </div>  
         </div>  --%>
		 <div class="form-group">
             <label class="col-xs-3 control-label">菜单名称<font color="red">*</font></label>
             <div class="col-xs-9">
             <input type="text" id="areaname" class="form-control" maxlength="100" name="resFormMap.name"   value="${resFormMap.name}" data-width="100%">                
             </div>  
         </div>
          <div class="form-group">
					<label class="col-xs-3 control-label">资源路径</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" data-width="100%"
							name="resFormMap.resUrl" id="resUrlName" value="${resFormMap.resUrl}">
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 control-label">reskey<font color="red">*</font></label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" data-width="100%"
							name="resFormMap.resKey" id="reskey" value="${resFormMap.resKey}">
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 control-label">level</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" data-width="100%"
							name="resFormMap.level" id="level" value="${resFormMap.level}">
					</div>
				</div>
				 <c:if test="${type != 'parentMenu'}">
				<div class="form-group">
					<label class="col-xs-3 control-label">图标</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" data-width="100%"
							 name="resFormMap.icon" id="icon"  value="${resFormMap.icon}">
					</div>
			    </div>
			    </c:if>
				<div class="form-group">
					<label class="col-xs-3 control-label">描述</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" data-width="100%"
							 name="resFormMap.description" id="description" value="${resFormMap.description}">
					</div>
			    </div>
		</div>
	</form>
	<script type="text/javascript">
	 var id = "${resFormMap.id}";
	</script>
</body>
</html>