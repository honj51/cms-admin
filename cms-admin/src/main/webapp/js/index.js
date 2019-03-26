 $(document).ready(function() {
	 $(".logo").css("background-image","url('" + dashboardLogo + "')");
 });

var rad = 0;

function openLayer(json) {
	var pageii = layer.open(json);
	return pageii;
}

function refresh() {
	$(".tab-pane.active").find("iframe")[0].contentWindow.grid.jqGrid()
			.trigger("reloadGrid");
}

function refreshSupQualOther() {
	$(".tab-pane.active").find("iframe")[0].contentWindow.gridother.jqGrid()
			.trigger("reloadGrid");
}

function refreshLyGrid() {
	$(".tab-pane.active").find("iframe")[0].contentWindow.grid.loadData();
}
/**
 * 嵌套Ifame时使用
 */
function refreshWithIframe() {
	$(".tab-pane.active").find("iframe")[0].contentWindow.frames[0].grid
			.jqGrid().trigger("reloadGrid");
}
/**
 * 修改多组织多集团层级机构是，刷新树
 */
function refreshOrgWithIframe() {
	$(".tab-pane.active").find("iframe")[0].contentWindow.refreshOrg();
}

$(document).ready(function() {
	$("#save").click("click", function() {
		editPassword();
	});
});
// 推送信息
function showMessage(id) {
	initMsgCount();
	layer.open({
		type : 2,
		shade : [ 0 ],
		area : [ '340px', '215px' ],
		offset : 'rb', // 右下角弹出
		time : 0, // N秒后自动关闭
		shift : 2,
		content : [ rootPath + '/msg/showMessage.shtml?id=' + id, 'no' ]
	});
}
/** 初始化未读消息条数 */
function initMsgCount() {
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/msg/findCount.shtml',
		success : function(dataStr) {
			$("#msgCount").text(dataStr);
		}
	});
}
function initMsg() {
	initMsgCount();
	$("#msgTips").click("click", function() {
		parent.addTabs({
			id : "message",
			title : "消息管理",
			url : rootPath + "/msg/list.shtml",
			level : 21100,
			close : true
		});
	});
}

function addTree(parentName, name, code, id) {
	$(".tab-pane.active").find("iframe")[0].contentWindow.addTree(parentName,
			name, code, id);
}
function updateZtreeNode(nodeNameBefore, nodeNameAfter, parentNode) {
	$(".tab-pane.active").find("iframe")[0].contentWindow.updateZtreeNode(
			nodeNameBefore, nodeNameAfter, parentNode);
}

// 显示遮罩层
function ajaxLoading() {
	$("<div class=\"datagrid-mask\"></div>").css({
		display : "block",
		width : "100%",
		height : $(window).height()
	}).prependTo("body");
	$("<div class=\"datagrid-mask-msg\"></div>").html("正在处理中，请稍候...").appendTo(
			$(".datagrid-mask")).css({
		padding : "15px 0 0 40px",
		display : "block",
		left : ($(document.body).outerWidth(true) - 190) / 2,
		top : ($(window).height() - 45) / 2,
		height : "50px"
	});
}
// 隐藏遮罩层
function ajaxLoadEnd() {
	$(".datagrid-mask").remove();
	$(".datagrid-mask-msg").remove();
}

function editPassword() {
	var oldPassword = $("#oldPassword").val();
	if ("" == oldPassword) {
		layer.alert("请输入密码!", {
			icon : 4
		});
		return;
	}
	var editPassword = $("#editPassword").val();
	if ("" == editPassword) {
		layer.alert("请输入新密码!", {
			icon : 4
		});
		return;
	}
	var newPassword = $("#newPassword").val();
	if ("" == newPassword) {
		layer.alert("请再次输入新密码!", {
			icon : 4
		});
		return;
	}
	$.ajax({
		type : "post",
		dataType : "json",
		url : rootPath + "/doChangePwdByIndexPage.shtml",
		data : {
			oldPassword : oldPassword,
			editPassword : editPassword,
			newPassword : newPassword
		},
		success : function(res) {
			if ("success" == res.result) {
				parent.layer.msg("修改成功", {
					icon : 1,
					time : 1000
				},function() {
					window.location.href = rootPath + '/login.shtml';
				});
			} else {
				layer.alert(res.result, {
					icon : 4
				});

			}
		},
		error : function(response) {
		}
	});
}

function showImage(url){
	$.fancybox.open({
		href : url,
		centerOnScroll : true,
		showNavArrows : true,
		closeBtn: false,
		enableEscapeButton : true,
		overlayShow : false,
		aspectRatio : true,
		padding : 0,
		afterClose : function() {
			rad = 0;
		},
		helpers: {
            title: {
                type: 'outside'
            }, 
            buttons: {
                tpl: '<div id="fancybox-buttons">'+
                		'<ul>' +
                			'<li><a class="leftRotate" title="左转" href="javascript:;"></a></li>'+
                			'<li><a class="rightRotate" title="右转" href="javascript:;"></a></li>'+
                			'<li><a class="btnClose" title="关闭" href="javascript:$.fancybox.close();"></a></li>' +
                		'</ul>'+
                	'</div>'
            }
        },
        afterShow: function (opts, obj) {
        }
	});
}


$('body').on('click','.leftRotate', function() {
	leftRotate();
});

$('body').on('click','.rightRotate', function() {
	rightRotate();
});

function leftRotate() {
    rad = rad - 90;
    if (rad == -360) {
        rad = 0;
    }
    $(".fancybox-wrap").rotate(rad);
}

function rightRotate() {
    rad = rad + 90;
    if (rad == 360) {
        rad = 0;
    }
    $(".fancybox-wrap").rotate(rad);
}