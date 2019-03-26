<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html lang="en">
<head>
<link href="${indexHeadTitle}" type="image/x-icon" rel=icon>
<%@include file="/common/commonCSS.jspf"%>
<META name=Keywords content=供应商>
<META name=Description content=供应商>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Google Chrome Frame也可以让IE用上Chrome的引擎: -->
<meta http-equiv="X-UA-Compatible" content="IE=8; IE=9; IE=10">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link href="${indexHeadTitle}" type="image/x-icon" rel="shortcut icon">
<meta name="renderer" content="webkit">
<title>登录－南北工贸集团后台管理云平台</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type="text/javascript"
	src="${ctx}/js/vendor/jquery-1.11.3.min.js"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="${ctx}/js/vendor/layer.js"></script>
<script src="${ctx}/login/js/scroll.js" type="text/javascript"
	charset="UTF-8"></script>
<script src="${ctx}/login/js/keyboard.js" type="text/javascript"
	charset="UTF-8"></script>
<script src="${ctx}/login/js/login.js<%=ts%>" type="text/javascript"
	charset="UTF-8"></script>
<link rel="stylesheet" href="${ctx}/css/common/initialize.css">
<style>
body {
	background-size: cover;
	width: 100%;
	height: 100%;
	background-attachment: fixed;
	background-position: center center;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-moz-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
	-webkit-box-pack: center;
	-moz-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	margin: 0;
	height: 100%;
	width: 100%;
}

html {
	height: 100%;
}

.bagimg {
	width: 100%;
	height: 100%;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	justify-content: center;
	justify-content: center;
	align-items: center;
}

.left {
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-moz-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
	-webkit-box-pack: center;
	-moz-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	flex-direction: column;
	width: 400px;
	height: 500px;
	background-color: rgba(255, 255, 255, 0.6);
}

.right {
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-moz-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
	-webkit-box-pack: center;
	-moz-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	flex-direction: column;
	width: 400px;
	height: 500px;
	background-color: #fff;
}

.left-img {
	width: 116px;
	height: 116px;
	margin-top: -80px;
}

.left span {
	margin-top: 28px;
	color: #666666;
	font-size: 18px;
}

.right-title {
	margin-top: -15px;
	font-size: 30px;
	color: #26AE78;
}

.accounts {
	width: 300px;
	margin-top: 70px;
	text-align: center;
	background-color: rgb(255, 255, 255);
}

.ciphers {
	width: 300px;
	margin-top: 25px;
	text-align: center;
}

.enters {
	width: 300px;
	border-radius: 5px;
	margin-top: 40px;
	height: 40px;
	line-height: 40px;
	padding: 0px 12px;
	background-color: #26AE78;
}

.form-control {
	padding: 6px 12px;
	border-bottom: 1px solid #ccc !important;
	border-top: 0px;
	border-left: 0px;
	border-right: 0px;
}

.ticked {
	margin-top: 80px;
}
</style>
</head>
<body>
		<div class="container-fluid bagimg">
			<div class="left">
				<img
					src=""
					class="left-img"><span>南北工贸集团</span>
			</div>
			<div class="right">
				<sapn class="right-title">后台管理云平台</sapn>
				<input class="form-control accounts" placeholder="请输入登录账户"
					id="loginUserName" name="username" /> <input
					class="form-control ciphers" placeholder="请输入登录密码" type="password"
					name="password" id="pass"/>
				<button type="button" class="btn btn-success enters" id="loginLog">登录</button>
			</div>
		</div>

	<script type="text/javascript">
		if ("${error}" != "") {
			layer.alert("${error}", {
				icon : 4
			});
		};
		function checkUserForm() {
			//do samething
			return true;
		}
		var rootPath = "${ctx}";
		var indexBackground = "${indexBackground}";
		var indexLogo = "${indexLogo}";
	</script>
</body>
</html>