<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript">
$(document).ready(function() {
	$(".selectpicker2").selectpicker({});
});


var txtRoleSelect = '${txtRoleSelect}';
if(txtRoleSelect==null||txtRoleSelect==''){
	var id = '${role[0].id} ';
	$('#txtGroupsSelect').val(id);
}


</script>

<div class="form-group">
	<input id="txtGroupsSelect" type="hidden" value="${txtRoleSelect}" name="txtGroupsSelect" />
	
	<label for="host" class="col-sm-3 control-label">角色</label>
	<div class="col-sm-9">
		<select id="groupsForSelect"  class= "selectpicker2" onchange=" $('#txtGroupsSelect').val(this.value);">
		
			<c:forEach items="${role}" var="key">
				<option value="${key.id}">${key.name}</option>
			</c:forEach>
			
			<c:forEach items="${userRole}" var="key2">
				<option value="${key2.id}" selected>${key2.name}</option>
			</c:forEach>
			
		</select>	
	</div>
</div>