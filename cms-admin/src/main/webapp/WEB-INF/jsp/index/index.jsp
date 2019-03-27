<%@page import="com.xasz.cms.util.Common"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html lang="en">
<head>
<link rel="icon" href="${indexHeadTitle}" type="image/x-icon"/>
<title>南北工贸集团后台管理云平台</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<%@include file="/common/common.jspf"%>
<link rel="stylesheet" type="text/css" href="${ctx}/css/sidebar.css">
<link rel="shortcut icon" href="${indexHeadTitle}" type="image/x-icon" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/vendor/layim/css/layui.css" />
<style type="text/css">
body {
	overflow: hidden;
}

.layui-layer.layui-layer-iframe .layui-layer-title {
	background-color:#008bd3;
	color: #f5f5f5;
}

.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
    color: #444;
}
a, a:visited{
	color : #158ad0;
}
/*设置按钮组宽度，用来容纳新按钮*/
#fancybox-buttons ul {
	width: 120px;
}
/*设置左转按钮*/
#fancybox-buttons a.leftRotate {
	border-left: 1px solid #111;
	width: 35px;
	background-image: url(images/fancyBox/leftRotate.png);
	text-indent: 0px;
	font-size: small;
}
/*设置右转按钮*/
#fancybox-buttons a.rightRotate {
	border-right: 1px solid #3e3e3e;
	background-image: url(images/fancyBox/rightRotate.png);
	text-indent: 0px;
	font-size: small;
}
/*设置关闭按钮*/
#fancybox-buttons a.btnClose {
	border-right: 1px solid #3e3e3e;
	background-image: url(images/close.png);
	text-indent: 0px;
	font-size: small;
	background-position: 10px 5px;
}

.fancybox-overlay {
	z-index: 99999998;
}

#fancybox-buttons.top {
	z-index: 99999999;
}
</style>
</head>
<body>
	<nav class="navbar no-margin">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header fixed-brand">

			<div class="logo">

			</div>
		</div>
		<!-- navbar-header-->

		<div class="collapse navbar-collapse headerbg"
			id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="active"><button class="navbar-toggle collapse in"
						data-toggle="collapse" id="menu-toggle-2">
						<span class="fa fa-bars" aria-hidden="true"></span>
					</button></li>
			</ul>
			<ul class="pull-right group-button">
				<li role="presentation"><a href="#"><i class="fa fa-user"></i>
						${userFormMap.account_name} </a></li>
				<li role="presentation"><a href="#" id="password_key"><i
						class="fa fa-lock"></i> 修改密码</a>
					<div class="password" id="password">
						<form role="form" class="form-horizontal"
							action="${ctx}/doChangePwdByIndexPage.shtml"
							target="nothing_iframe">
							<div class="password_body">
								<label class="font_gray">用户名</label> <label class="font_blue">
									${userFormMap.account_name} </label>
							</div>
							<div class="form-group-sm password_body">
								<label class="font_gray">原始密码</label> <input id="oldPassword" type="password">
							</div>
							<div class="form-group-sm password_body">
								<label class="font_gray">修改密码</label> <input id="editPassword" type="password">
							</div>
							<div class="form-group-sm password_body">
								<label class="font_gray">确认密码</label> <input id="newPassword" type="password">
							</div>
							<div class="password_body">
								<button type="button" class="btn btn-sm btn-primary btn-block" id="save">保存</button>
							</div>
						</form>
					</div></li>
				<iframe name="nothing_iframe" style="display: none"> </iframe>
				<!-- <li role="presentation"><a href="javascript:void(0);"
					id="msgTips"><i class="fa fa-bell"></i> 消息提醒 <span
						class="badge spanbg" id="msgCount"></span></a></li> -->
				<li role="presentation"><a href="#"
					onclick="window.location.href='${ctx}/logout.shtml';"><i
						class="fa fa-sign-out"></i> 退出</a></li>
			</ul>
		</div>
		<!-- bs-example-navbar-collapse-1 -->
	</nav>

	<div id="wrapper">

		<!-- nav -->
		<div id="sidebar-wrapper">
			<div class="nav navbar left-nav">
				<ul class="sidebar-nav nav-pills nav-stacked" id="menu">
					<c:forEach var="key" items="${list}" varStatus="s">
						<li><a
							<c:choose>  
									<c:when test="${empty key.children}">
										 path="${ctx}${key.resUrl}" 
	   								</c:when>
	   								<c:otherwise>
	   									 class="dropdown-toggle" data-toggle="dropdown" 
	   								</c:otherwise>  
								</c:choose>
							id="${key.resKey}" level="${key.id}" href="javascript:void(0)">
								<i class="fa ${key.icon}"></i> <span>${key.name}</span> <c:if
									test="${!empty key.children}">
									<b class="caret"></b>
								</c:if>
						</a> <c:if test="${!empty key.children}">
								<ul class="nav-pills nav-stacked submenu">
									<c:forEach var="kc" items="${key.children}">
										<li><a class="item" id="${kc.resKey}" level="${kc.id}"
											path="${ctx}${kc.resUrl}" href="javascript:void(0)"> <span>${kc.name}</span>
										</a></li>
									</c:forEach>
								</ul>
							</c:if></li>
					</c:forEach>
				</ul>
			</div>
		</div>
		<!-- / nav -->

		<!-- Page Content -->
		<div id="page-content-wrapper">
			<div class="nav_menu">
				<ul class="nav nav-tabs" role="tablist" id="tabs">
					<li role="presentation" class="active"><a href="#tab_main"
						role="tab" data-toggle="tab">首页</a></li>
				</ul>
			</div>
			<div class="tab-content">
				<div role="tabpanel" id="tab_main" class="tab-pane active">
					<iframe src="${ctx}/main/list.shtml" width="100%" height="100%"
						frameborder="0" scrolling="auto"></iframe>
				</div>
			</div>

		</div>
		<!-- /#page-content-wrapper -->
	</div>
	<script type="text/javascript">
		var rootPath = "${ctx}";
		var dashboardLogo = "${dashboardLogo}";
		var indexHeadTitle = "${indexHeadTitle}";
		var uid = "${userFormMap.id}";
		var userName = "${userFormMap.name}";
		var accountName = "${userFormMap.account_name}";
	</script>
	<script type='text/javascript' src="${ctx}/vendor/layim/layui.js"></script>
	<script type="text/javascript" src="${ctx}/js/sidebar.js"></script>
	<script type="text/javascript" src="${ctx}/js/index.js"></script>
	<script type="text/javascript" src="${ctx}/js/index/index.js<%=ts%>"></script>
	<script>
		//用于子页面图片预览
		function getPhotoView() {
			return new PhotoView();
		}

		$("#password_key").click(function() {
			$("#password").toggle();
		})
	</script>
</body>
</html>