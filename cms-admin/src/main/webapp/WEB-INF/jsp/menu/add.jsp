<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/common/common.jspf"%>
 <script type="text/javascript" src="${ctx}/js/menu/add.js<%=ts%>"></script>
</head>
<body>
	<div class="l_err" style="width: 100%; margin-top: 2px;"></div>
	<form id="districtAddForm" name="districtAddForm" class="form-horizontal" method="post"
		action="${ctx}/menu/addEntity.shtml">
	
		<div id="fixtop" class="choice_condition_menu">
			<button type="submit" class="btn btn-primary btn-sm" >保存</button>
    	</div>
		<div class="panel-body">
		<div class="l_err" style="width: 100%; margin-top: 2px;"></div>
	 	<c:if test="${type == 'parentMenu'}">
	 	  <div class="form-group">
            <label class="col-xs-3 control-label">上级菜单名称</label>
            <div class="col-xs-8">
            <input type="text" class="form-control" value="${parentDistrictFormMap.name}" readonly="readonly"> 
            <input type="hidden" value="${parentDistrictFormMap.id}" name="resFormMap.parentId" id="parent_id">               
            </div>  
        </div>
	 	</c:if>
          <div class="form-group">
             <label class="col-xs-3 control-label">菜单编码<font color="red">*</font></label>
             <div class="col-xs-8">
             <input type="text" class="form-control" maxlength="100" name="resFormMap.id"  onblur='checkImpl(this);'>                
             </div>  
         </div>
		 <div class="form-group">
             <label class="col-xs-3 control-label">菜单名称<font color="red">*</font></label>
             <div class="col-xs-8">
             <input type="text" class="form-control" maxlength="100" name="resFormMap.name"  onblur='checkImpl(this);'>                
             </div>  
         </div>
          <div class="form-group">
					<label class="col-xs-3 control-label">资源路径</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" style="width:200px"
							name="resFormMap.resUrl" id="resUrlName" placeholder="请输入访问路径">
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 control-label">reskey</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" style="width:200px"
							name="resFormMap.resKey" id="reskey" placeholder="请输入访问路径">
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 control-label">level</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" style="width:200px"
							name="resFormMap.level" id="level" placeholder="请输入">
					</div>
				</div>
				<c:if test="${type != 'parentMenu'}">
				<div class="form-group">
					<label class="col-xs-3 control-label">图标</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" style="width:200px"
							 name="resFormMap.icon" id="icon"  placeholder="请输入图标信息">
					</div>
			    </div>
			    </c:if>
				<div class="form-group">
					<label class="col-xs-3 control-label">描述</label>
					<div class="col-xs-9">
						<input type="text" class="form-control checkacc" style="width:200px"
							 name="resFormMap.description" id="description"  placeholder="请输入描述内容">
					</div>
			    </div>
		</div>
	</form>
</body>
</html>