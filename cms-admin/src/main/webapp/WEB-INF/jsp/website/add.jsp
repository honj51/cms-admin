<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
<script type="text/javascript" src="${ctx}/vendor/ueditor/ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="${ctx}/vendor/ueditor/ueditor.all.js"></script>
<style type="text/css">
.file-drop-zone {
	height: auto;
}

.file-caption-main {
	display: none;
}

.kv-preview-data file-preview-image {
	max-width: 100%;
}
</style>
</head>
<body style="overflow-x: hidden">
	<%-- <div class="choice_condition_menu fixtop">
		<button id="save" type="button" class="btn btn-primary btn-sm">保存</button>
	</div>

	<div class="row table_content" id="accordion">
		<div class="col-md-6">
			<form role="form" class="form-horizontal">
				<div class="form-group">
					<label class="col-sm-3 control-label">广告位置</font></label>
					<div class="col-sm-8">
						<select id="position" class="selectpicker" data-width="100px">
							<<option value="1">首页上方</option>
							<option value="2">首页左下方</option>
							<option value="3">首页右下方</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">广告图片</label>
					<div class="col-sm-8">
						<input id="url" name="url" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>

			</form>
		</div>
	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${id}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/website/advertisement/add.js<%=ts%>"></script> --%>
	 <!-- 加载编辑器的容器 -->
    <script id="ueditor" name="content" type="text/plain">
        这里写你的初始化内容
    </script>
    <!-- 实例化编辑器 -->
    <script type="text/javascript">
        var ue = UE.getEditor('ueditor');
        ue.ready( function( editor ) {
        	ue.setContent('初始化完毕');
        	var html = ue.getHtml();
			console.log(html)        
        });
        
            //console.log(UE.getEditor('ueditor').getAllHtml())
            
    </script>
	
</body>
</html>