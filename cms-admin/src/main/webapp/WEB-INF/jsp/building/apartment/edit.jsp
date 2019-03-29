<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@include file="/common/common.jspf"%>
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
	<div class="choice_condition_menu fixtop">
		<button id="save" type="button" class="btn btn-primary btn-sm">保存</button>
	</div>

	<div class="row table_content" id="accordion">
		<div class="col-md-6">
			<form role="form" class="form-horizontal">
				<div class="form-group">
					<label class="col-sm-3 control-label">类型</label>
					<div class="col-sm-8">
						<select id="type" class="selectpicker" data-width="200px">
							<option value="">请选择</option>
							<c:forEach items="${typeFormMaps}" var="typeFormMap">
								<option value="${typeFormMap.id}"
									<c:if test="${typeFormMap.id==formMap.type_id}">
							selected="selected"
						</c:if>>${typeFormMap.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">装修类型</label>
					<div class="col-sm-8">
						<select id="renovation" class="selectpicker" data-width="200px">
							<option value="">请选择</option>
							<option value="1"
								<c:if test="${1==formMap.renovation }">
							selected = "selected"
							</c:if>>毛坯房</option>
							<option value="2"
								<c:if test="${2==formMap.renovation }">
							selected = "selected"
							</c:if>>简装房</option>
							<option value="3"
								<c:if test="${3==formMap.renovation }">
							selected = "selected"
							</c:if>>精装房</option>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">楼盘位置</label>
					<div class="col-sm-8">
						<input id="address" name="address" class="form-control"
							value="${formMap.address}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">售楼电话</label>
					<div class="col-sm-8">
						<input id="phone" name="phone" class="form-control"
							value="${formMap.phone}" />
					</div>
				</div>


				<div class="form-group">
					<label class="col-sm-3 control-label">全景图压缩包</label>
					<div class="col-sm-8">
						<input id="zipFile" name="zipFile" type="file"
							class="file-loading" accept="application/x-zip-compressed" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">缩略图</label>
					<div class="col-sm-8">
						<input id="url" name="url" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>


				<div class="form-group">
					<label class="col-sm-3 control-label">轮播二</label>
					<div class="col-sm-8">
						<input id="urlTwo" name="urlTwo" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>


			</form>
		</div>

		<div class="col-md-6">
			<form role="form" class="form-horizontal">
				<div class="form-group">
					<label class="col-sm-3 control-label">楼层</label>
					<div class="col-sm-8">
						<select id="floor" class="selectpicker" data-width="200px">
							<option value="">请选择</option>
							<option value="1"
								<c:if test="${1==formMap.floor }">
							selected = "selected"
							</c:if>>低层</option>
							<option value="2"
								<c:if test="${2==formMap.floor }">
							selected = "selected"
							</c:if>>中层</option>
							<option value="3"
								<c:if test="${3==formMap.floor }">
							selected = "selected"
							</c:if>>高层</option>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">名称</label>
					<div class="col-sm-8">
						<input id="name" name="name" class="form-control"
							value="${formMap.name}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">房价</label>
					<div class="col-sm-8">
						<input id="price" name="price" class="form-control"
							value="${formMap.price}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">开盘时间</label>
					<div class="col-sm-8">
						<input id="openingTime" class="form-control"
							value="${formMap.opening_time}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">交房时间</label>
					<div class="col-sm-8">
						<input id="handTime" class="form-control"
							value="${formMap.hand_time}" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">轮播一</label>
					<div class="col-sm-8">
						<input id="urlOne" name="urlOne" type="file" class="file-loading"
							accept="image/*" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">轮播三</label>
					<div class="col-sm-8">
						<input id="urlThree" name="urlThree" type="file"
							class="file-loading" accept="image/*" />
					</div>
				</div>

			</form>
		</div>

	</div>

	<script>
		var rootPath = "${ctx}";
		var id = "${formMap.id}";
		var url = "${formMap.url}";
		var urlOne = "${formMap.url_one}";
		var urlTwo = "${formMap.url_two}";
		var urlThree = "${formMap.url_three}";
	</script>
	<script src="${ctx}/common/common.js"></script>
	<script src="${ctx}/js/building/apartment/edit.js<%=ts%>"></script>
</body>
</html>