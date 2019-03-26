var parentName;
var parentId;
var parentNode;
$(function() {
	parentName = $("#parentclass").val();
	$("#parentclass").click(function(){
		showMenu();
	});
	$("button").click(function(){
		$("form").submit(function(){
			var oldParentId = $("#parentId").val();
			if(oldParentId == parentId){
				layer.msg('迁移前后节点相同，不能正常迁移！', {icon : 0,time:1000});
			}
			$.ajax({
				  async : false,
				  cache:false,
				  type: 'POST',
				  data:$('form').serialize(),
				  dataType : "json",
				  url:rootPath + '/basedata/multiorg/editEntity.shtml?parentId='+parentId,//请求的action路径
				  error: function () {//请求失败处理函数
				   		parent.layer.msg('请求失败！', {icon : 2,time:1000});
				  },
				  success:function(){ //请求成功后处理函数。
					  parent.layer.msg('迁移成功！', {icon : 1,time:1000});
					  var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
					  parent.refreshOrgWithIframe();
					  parent.layer.close(index);
				  }
			});
		});
	});
});
// 一下代码-设置下拉菜单+ztree
var setting = {
	view : {
		// dblClickExpand: false,
		expandSpeed : 300
	// 设置树展开的动画速度，IE6下面没效果，
	},
	data : {
		simpleData : { // 简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的
			enable : true,
			idKey : "id", // id和pid，这里不用多说了吧，树的目录级别
			pIdKey : "parent_id",
			rootPId : 0
		// 根节点
		}
	},
	callback : {
		/** 回调函数的设置，随便写了两个* */
		onClick : onClick
	}
}; 

	function onClick(e, treeId, treeNode) {
		isClickTree = true;
		parentNode = treeNode;// 为编辑removeNode方法设置变量
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		parentId = treeNode.id;
		var node = zTree.getNodeByTId(treeId);
		nodes = zTree.getSelectedNodes(),
		v = "";
		nodes.sort(function compare(a,b){return a.id-b.id;});
		for (var i=0, l=nodes.length; i<l; i++) {
			v += nodes[i].name + ",";
		}
		if (v.length > 0 ) v = v.substring(0, v.length-1);
		$("#parentclass").attr("value", v);
		$("#menuContent").hide();
		return false;
	}

	function showMenu() {
		var cityObj = $("#parentclass");
		var cityOffset = $("#parentclass").offset();
		$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
		$("body").bind("mousedown", onBodyDown);
	}
	function hideMenu() {
		$("#menuContent").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDown);
	}
	function onBodyDown(event) {
		if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
			hideMenu();
		}
	}
	$(document).ready(function(){
		var result;
		$.ajax({
			async : false,
			cache:false,
			type: 'POST',
			dataType : "json",
			url:rootPath + "/basedata/multiorg/ztreeGetPar.shtml",//请求的action路径
			error: function () {//请求失败处理函数
				parent.layer.msg('请求失败！', {icon : 2,time:1000});
			},
			success:function(data){ //请求成功后处理函数。
				result = data;
			    $.fn.zTree.init($("#treeDemo"),setting, result);  
			}
		});
		
	});
