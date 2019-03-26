var pageii = null;
var flag = false;
//
/**ztree的参数配置，setting主要是设置一些tree的属性，是本地数据源，还是远程，动画效果，是否含有复选框等等**/
var setting = {
	view : {
		//dblClickExpand: false,  
		expandSpeed : 300
	//设置树展开的动画速度，IE6下面没效果，  
	},
	data : {
		simpleData : { //简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的                           
			enable : true,
			idKey : "id", //id和pid，这里不用多说了吧，树的目录级别  
			pIdKey : "parent_id",
			rootPId : 0
		//根节点  
		}
	},
	callback : {
		/**回调函数的设置，随便写了两个**/
		beforeClick : beforeClick,
		onCheck : onCheck,
	}
};
var zTree;
var treeNodes;
$(function() {
	refreshOrg();
});
var node_id = "";
function beforeClick(treeId, treeNode) {
	$("#jqGrid").jqGrid(
			'setGridParam',
			{
				url : rootPath + '/basedata/multiorg/findByTree.shtml?treeId='
						+ treeNode.id
			}).trigger('reloadGrid');
	node_id = treeNode.id;
	onclicktree(treeNode.id);
}
function onCheck(e, treeId, treeNode) {

}

$(document).ready(function() {//初始化ztree对象     
	$("#add").click(function() {
		addMultiOrg();
	});
	$("#edit").click(function() {
		editMultiOrg();
	});
	$("#del").click(function() {
		delMultiOrg();
	});

	$("#refreshbutton").click("click", function() {
		document.getElementById("searchForm").reset();
		 $("#detailDiv").find("input[type=text],input[type=hidden]").each(function() {
			  $(this).val('');});
		refreshOrg();
	});

	$("#search").click(function() {
		onSearch();
	});
});

function onclicktree(treeId) {
	var url = rootPath + '/basedata/multiorg/findByTree.shtml?treeId=' + treeId
			+ "&date=" + (new Date()).getTime();
	var restMap = CommnUtil.ajax(url, {}, "json");
	if (restMap != null && restMap != '') {
		$("#orgid").val(restMap.id);
		$("#orgcode").val(restMap.code);
		$("#orgname").val(restMap.name);
		$("#parent_name").val(restMap.parent_name);
		$("#principal").val(restMap.resp_man);
		$("#phone").val(restMap.tel);
		$("#region").val(restMap.region);
		$("#address").val(restMap.regaddress);
		$("#tax_number").val(restMap.tax_indentify_num);
	}
};
function delMultiOrg() {
	var orgid = $("#orgid").val();
	if (orgid == null || orgid == "") {
		layer.msg('请选择需要删除的节点！', {
			icon : 0,
			time : 1000
		});
		return;
	} else {
		parent.layer.confirm('是否删除？', function(index) {
			var url = rootPath + '/basedata/multiorg/deleteEntity.shtml?id='
					+ orgid;
			var s = CommnUtil.ajax(url, {}, "json");
			if (s == "success") {
				parent.layer.msg('删除成功！', {
					icon : 1,
					time : 1000
				});
				$("#detailDiv").find("input[type=text],input[type=hidden]").each(function() {
					$(this).val('');
				});
				removeTree(orgid);
				parent.layer.closeAll();
			} else {
				parent.layer.msg('删除失败！', {
					icon : 2,
					time : 1000
				});
			}
		});
	}
}

function addMultiOrg() {
	pageii = parent.openLayer({
		title : "新增",
		type : 2,
		area : [ "60%", "80%" ],
		content : rootPath + '/basedata/multiorg/addUI.shtml'
	});
}
function editMultiOrg() {
	var orgid = $("#orgid").val();
	if (orgid == null || orgid == "") {
		layer.msg('请选择需要删除的节点！', {icon : 0,time : 1000});
		return;
	}else {
		pageii = parent.openLayer({title : "迁移",type : 2,area : [ "60%", "60%" ],
				content : rootPath + '/basedata/multiorg/editUI.shtml?id='+ orgid});
	}
}
function refreshOrg() {
	$.ajax({
		async : false,
		cache : false,
		type : 'POST',
		dataType : "json",
		url : rootPath + "/basedata/multiorg/ztreeGetPar.shtml",//请求的action路径
		error : function() {//请求失败处理函数
			parent.layer.msg('请求失败！', {
				icon : 2,
				time : 1000
			});
		},
		success : function(data) { //请求成功后处理函数。
			$.fn.zTree.init($("#multiOrgTree"), setting, data);
		}
	});
}
function updateZtreeNode(nodeNameBefore, nodeNameAfter, parentNode) {
	if (parentNode == null || parentNode == undefined) {
		var treeObj = $.fn.zTree.getZTreeObj("multiOrgTree");
		var nodes = treeObj.getNodeByParam('name', nodeNameBefore);
		nodes.name = nodeNameAfter;
		treeObj.updateNode(nodes);
		treeObj.moveNode(null, nodes, "inner", true);
		return;
	}
	if (parentNode == 1) {
		var treeObj = $.fn.zTree.getZTreeObj("multiOrgTree");
		var nodes = treeObj.getNodeByParam('name', nodeNameBefore);
		nodes.name = nodeNameAfter;
		treeObj.updateNode(nodes);
		return;
	}
	var treeObj = $.fn.zTree.getZTreeObj("multiOrgTree");
	var nodes = treeObj.getNodeByParam('name', nodeNameBefore);
	nodes.name = nodeNameAfter;
	treeObj.updateNode(nodes);
	treeObj.moveNode(parentNode, nodes, "inner", true);
}
function removeTree(id) {
	var treeObj = $.fn.zTree.getZTreeObj("multiOrgTree");
	var nodes = treeObj.getNodeByParam('id', id);
	treeObj.removeNode(nodes);
}
function addTree(parentName, name, code, id) {
	var treeObj = $.fn.zTree.getZTreeObj("multiOrgTree");
	var nodes = treeObj.getNodeByParam('name', parentName);
	var newNode = {
		name : name,
		code : code,
		id : id
	};
	if (parentName == null || parentName == "") {
		nodes = null;
	}
	newNode = treeObj.addNodes(nodes, newNode);
}

//效验表单
function check() {
	var nameElement = $("#orgname");
	if(nameElement.val() == null || nameElement.val().trim() == ''){
		$(nameElement).val('');
		$(nameElement).attr('class', 'form-control alert-danger');//红色
		$(nameElement).attr('placeholder', "请填写此字段");
		return false;
	}else{
		var rslt = checkValueByName(nameElement.val().trim());
		if (rslt == 'ok') {
			$(nameElement).val(nameElement.val().trim());
			$(nameElement).attr('placeholder', '');
			$(nameElement).attr('class', 'form-control');//绿色
		} else {
			$(nameElement).val('');
			$(nameElement).attr('class', 'form-control alert-danger');//红色
			$(nameElement).attr('placeholder', rslt);
			return false;
		}
	}
	var codeElement = $("#orgcode");
	if(codeElement.val().trim() == null || codeElement.val().trim() == ''){
		$(codeElement).val('');
		$(codeElement).attr('class', 'form-control alert-danger');//红色
		$(codeElement).attr('placeholder', "请填写此字段");
		return false;
	}else{
		var rslt = checkValueByCode(codeElement.val().trim());
		if (rslt == 'ok') {
			$(codeElement).val(codeElement.val().trim());
			$(codeElement).attr('placeholder', '');
			$(codeElement).attr('class', 'form-control');//绿色
		} else {
			$(codeElement).val('');
			$(codeElement).attr('class', 'form-control alert-danger');//红色
			$(codeElement).attr('placeholder', rslt);
			return false;
		}
	}
	var principalElement = $("#principal");
	if(principalElement.val().trim() == null || principalElement.val().trim() == ''){
		$(principalElement).val('');
		$(principalElement).attr('class', 'form-control alert-danger');//红色
		$(principalElement).attr('placeholder', "请填写此字段");
		return false;
	}
	var phoneElement = $("#phone");
	if(phoneElement.val().trim() == null || phoneElement.val().trim() == ''){
		$(phoneElement).val('');
		$(phoneElement).attr('class', 'form-control alert-danger');//红色
		$(phoneElement).attr('placeholder', "请填写此字段");
		return false;
	}
	var addressElement = $("#address");
	if(addressElement.val().trim() == null || addressElement.val().trim() == ''){
		$(addressElement).val('');
		$(addressElement).attr('class', 'form-control alert-danger');//红色
		$(addressElement).attr('placeholder', "请填写此字段");
		return false;
	}
	return true;
}
function checkValueByName(value) {
	var orgid = $("#orgid").val();
	var result = null;
	if (value == "") {
		result = "医院名称不能为空";
	} else {
		$.ajax({
			async : false,
			cache : false,
			type : 'POST',
			data : {
				val : value,
				type : "name",
				"op":"update",
				"orgid":orgid
			},
			dataType : "json",
			url : rootPath + '/basedata/multiorg/checkInput.shtml',//请求的action路径
			error : function() {//请求失败处理函数
				parent.layer.msg('请求失败！', {
					icon : 2,
					time : 1000
				});
			},
			success : function(data) { //请求成功后处理函数。
				if (data == "exist") {
					result = "医院名称已经存在";
				} else {
					result = "ok";
				}
			}
		});
	}
	return result;
}
function checkValueByCode(value) {
	var orgid = $("#orgid").val();
	var result = null;
	if (value == "") {
		result = "医院编码不能为空";
	} else {
		$.ajax({
			async : false,
			cache : false,
			type : 'POST',
			data : {
				val : value,
				type : "code",
				"op":"update",
				"orgid":orgid
			},
			dataType : "json",
			url : rootPath + '/basedata/multiorg/checkInput.shtml',//请求的action路径
			error : function() {//请求失败处理函数
				parent.layer.msg('请求失败！', {
					icon : 2,
					time : 1000
				});
			},
			success : function(data) { //请求成功后处理函数。
				if (data == "exist") {
					result = "医院编码已经存在";
				} else {
					result = "ok";
				}
			}
		});
	}
	return result;
}
function checkClassByName(value) {
	var orgid = $("#orgid").val();
	var result = null;
	if (value == "") {
		result = "分类名称不能为空";
	} else {
		$.ajax({
			async : false,
			cache : false,
			type : 'POST',
			data : {
				val : value,
				type : "name",
				"op":"update",
				"orgid":orgid
			},
			dataType : "json",
			url : rootPath + '/basedata/invcl/checkInput.shtml',//请求的action路径
			error : function() {//请求失败处理函数
				parent.layer.msg('请求失败！', {
					icon : 2,
					time : 1000
				});

			},
			success : function(data) { //请求成功后处理函数。
				if (data == "exist") {
					result = "分类名称已经存在";
				} else {
					result = "ok";
				}
			}
		});
	}
	return result;
}

function updateDetailInfo() {
	var orgid = $("#orgid").val();
	if(orgid == null || orgid == ''){
		layer.msg('请选择需要更新的组织节点！', {icon : 0,time : 1000});
		return false;
	}else{
		if(check()){
			var orgcode = $("#orgcode").val();
			var orgname = $("#orgname").val();
			var principal = $("#principal").val();
			var phone = $("#phone").val();
			var region = $("#region").val();
			var address = $("#address").val();
			var tax_number = $("#tax_number").val();
			$.ajax({
				async : false,
				cache : false,
				type : 'POST',
				data : {
					"orgcode" : orgcode,
					"orgname" : orgname,
					"principal":principal,
					"phone":phone,
					"region":region,
					"address":address,
					"tax_number":tax_number,
					"orgid":orgid
				},
				dataType : "json",
				url : rootPath + '/basedata/multiorg/updateDetailInfo.shtml?orgid='+ orgid,// 请求的action路径
				error : function() {// 请求失败处理函数
					layer.msg('请求失败！', {
						icon : 2,
						time : 1000
					});
				},
				success : function(data) { // 请求成功后处理函数。
					if (data.rtnstate == "success") {
						refreshOrg();
						layer.msg('更新成功！', {
							icon : 1,
							time : 1000
						});
					} else {
						layer.msg('更新失败！', {
							icon : 2,
							time : 1000
						});
					}
				}
			});
		}
	}
}
function onSearch(treeId) {
	var multiorgname = $("#multiorgname").val();
	var url = rootPath + '/basedata/multiorg/findByName.shtml?multiorgname=' + multiorgname
			+ "&date=" + (new Date()).getTime();
	$.ajax({
		type : "POST",
		data : {
			"multiorgname" : multiorgname
		},
		url : url,
		dataType : 'json',
		success : function(data) {
			var restMap = eval(data);
			if (restMap.id != null && restMap.id != '') {
				$("#orgid").val(restMap.id);
				$("#orgcode").val(restMap.code);
				$("#orgname").val(restMap.name);
				$("#parent_name").val(restMap.parent_name);
				$("#principal").val(restMap.resp_man);
				$("#phone").val(restMap.contacts);
				$("#region").val(restMap.region);
				$("#address").val(restMap.regaddress);
				$("#tax_number").val(restMap.tax_indentify_num);
			} else {
			}
		},
		error : function() {
			layer.msg('查询出错！', {
				icon : 0,
				time : 2000
			});
		}
	});
};

