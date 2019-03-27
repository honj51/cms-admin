$(document).ready(function() {
	$(".logo").css("background-image", "url('" + dashboardLogo + "')");

	var websocket = null;
	// 判断当前浏览器是否支持WebSocket
	if ('WebSocket' in window) {
		websocket = new WebSocket("ws://localhost:80/cms-admin/websocket/" + accountName);
	} else {
		layer.alert('当前浏览器不支持预定信息推送！', function(index){
			layer.close(index);
		});
		//alert('当前浏览器不支持酒店预定信息推送！')
	}
	
	//连接发生错误的回调方法
    websocket.onerror = function () {
        console.log("WebSocket连接发生错误");
    };
	
	// 连接成功建立的回调方法
	websocket.onopen = function(e) {
		console.log("WebSocket连接成功");
	}

	// 接收到消息的回调方法
	websocket.onmessage = function(event) {
		var msg = event.data;
		if(null != msg && "" != msg && typeof(msg) != 'undefined'){
			if(msg == "new_hotel_reserve"){
				layer.alert('您有新的酒店预定信息需要处理！', function(index){
					layer.close(index);
				});
			}else if(msg == "new_apartment_reserve"){
				layer.alert('您有新的楼盘预约信息需要处理！', function(index){
					layer.close(index);
				});
			}
		}
	}

	// 连接关闭的回调方法
	websocket.onclose = function() {
		console.log("WebSocket连接关闭");
	}

	// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	window.onbeforeunload = function(e) {
		closeWebSocket();
	}

	// 关闭WebSocket连接
	function closeWebSocket() {
		websocket.close();
	}
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


/*$('body').on('click','.leftRotate', function() {
	leftRotate();
});

$('body').on('click','.rightRotate', function() {
	rightRotate();
});*/

/*function leftRotate() {
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
}*/