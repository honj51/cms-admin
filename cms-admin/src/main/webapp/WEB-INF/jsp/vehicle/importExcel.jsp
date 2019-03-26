<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
</head>
<body style="overflow-x: hidden">
	<div class="row table_content" id="accordion">
		<div class="col-md-12">
			<form role="form" class="form-horizontal">
				<div class="form-group">
					<label class="col-sm-3">导入excel文件:</label>
				</div>
			</form>
			<form role="form" class="form-horizontal" >
				<div class="form-group">
					<div class="col-sm-12">
                 	<input id="importExcel" name="importExcel" type="file" class ="file-loading" 
							accept=".xls,.xlsx"/>
					</div>
				</div>
		     </form>
		</div>
	</div>
	<script
		src="${ctx }/vendor/bootstrap-fileinput/js/plugins/canvas-to-blob.min.js"
		type="text/javascript"></script>
	<script
		src="${ctx }/vendor/bootstrap-fileinput/js/plugins/sortable.min.js"
		type="text/javascript"></script>
	<script
		src="${ctx }/vendor/bootstrap-fileinput/js/plugins/purify.min.js"
		type="text/javascript"></script>
	<script src="${ctx }/vendor/bootstrap-fileinput/js/fileinput.min.js"></script>
	<script src="${ctx }/vendor/bootstrap-fileinput/js/locales/zh.js"></script>
	<script src="${ctx }/vendor/bootstrap-fileinput/themes/fa/theme.js"></script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/vehicle/importExcel.js<%=ts%>"></script>
</body>
</html>