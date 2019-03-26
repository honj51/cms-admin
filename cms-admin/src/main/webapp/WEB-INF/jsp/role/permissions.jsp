<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%@include file="/common/common.jspf"%>
</head>
<style type="text/css">
#mytable {
	width: 100%;
	padding: 0;
	margin: 0;
	border-collapse: collapse;
	border: 1px solid #dddddd;
	border-width: 0px;
	border-style: hidden;
}

caption {
	padding: 0 0 5px 0;
	width: 660px;
	font: italic 13px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	text-align: right;
}

th {
	font: bold 13px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #4f6b72;
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	border-top: 1px solid #C1DAD7;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-align: left;
	height: 35px;
	line-height: 35px;
	border-collapse: collapse;
}

th.nobg {
	border-top: 0;
	border-left: 0;
	border-right: 1px solid #C1DAD7;
	system: none;
}

#mytable{
	width: 100%; 
	height: 100%;
}

#mytable td {
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	system: #fff;
	font-size: 11px;
	padding: 6px 6px 6px 12px;
	color: #4f6b72;
}

td.alt {
	system: #F5FAFA;
	color: #797268;
}

th.spec {
	border-left: 1px solid #C1DAD7;
	border-top: 0;
	system: #fff;
	font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
}

th.specalt {
	system: #f5fafa;
	font: bold 13px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #797268;
}
input[type=checkbox],input[type=radio] {
	margin-left: 15px;
	vertical-align: middle;
	margin-top: 0px;
	margin-right: 2px;
    line-height: normal;
}
#secondary{
	display: inline-block;
	width: 40%;
	border-right: 1px solid#C1DAD7;
	height: 35px;
	line-height: 35px;
}
#fastener{
	float: right; 
	width: 60%;
	height: 35px;
	line-height: 35px;
	display: inline-block;
}
.leftWidth {width: 32% !important;}
.centerWidth {width: 40% !important;}
.rightWidth {width: 32% !important;}
/*---------for IE 5.x bug*/
html>body td {
	font-size: 13px;
}
</style>
<script type="text/javascript">
	function smenu(obj, id) {
		$("input[_key='menu_1_" + id + "']").each(function() {
			$(this).prop("checked", obj.checked);
		});
		$("input[_key='menu_1_1_" + id + "']").each(function() {
			$(this).prop("checked", obj.checked);
		});
	};
	function menu_1(obj, id, pid) {
		$("input[_key_2='menu_1_1_" + id + "']").each(function() {
			$(this).prop("checked", obj.checked);
		});
		if (obj.checked == true) {
			$("input[_key='menu_" + pid + "']").each(function() {
				$(this).prop("checked", obj.checked);
			});
		}
	};
	function menu_1_1(obj, id, pid) {
		if (obj.checked == true) {
			$("input[_key_1='menu_1_1_" + id + "']").each(function() {
				$(this).prop("checked", obj.checked);
			});
			$("input[_key='menu_" + pid + "']").each(function() {
				$(this).prop("checked", obj.checked);
			});
		}
	}
	function closeWin() {
		parent.layer.confirm('是否关闭窗口？', {
			icon : 3
		}, function(index) {
			//关闭confirm
			parent.layer.close(index);
			//关闭子页面
			var pindex = parent.layer.getFrameIndex(window.name);
			parent.layer.close(pindex);
		});
	}
	function sub() {
		ly.ajax({
			async : false, //请勿改成异步，下面有些程序依赖此请数据
			type : "POST",
			data : $("#from").serializeJson(),
			url : rootPath + '/role/addRoleRes.shtml',
			dataType : 'json',
			success : function(json) {
				if (json == "success") {
					parent.layer.confirm('分配成功！是否关闭窗口？', {
						icon : 3
					}, function(index) {
						//关闭confirm
						parent.layer.close(index);
						//关闭子页面
						var pindex = parent.layer.getFrameIndex(window.name);
						parent.layer.close(pindex);
					});
				} else {
					layer.alert("分配失败！！", {
						icon : 3,
						offset : '-100px'
					});
				}
				;
			}
		});
	}
</script>
<body>
	<div class="choice_condition_menu" id="fixtop">
		<a href="javascript:void(0);" class="btn btn-sm btn-primary" onclick="sub()">保存</a>
	</div>
	<form method="post" id="from" name="form">
		<input id='roleId' name="roleId" type="hidden" value="${param.id}">
		<table id="mytable" cellspacing="0" style="border-bottom: 1px;border-right: 1px;"
		 summary="The technical specifications of the Apple PowerMac G5 series">
			<tr>
				<th scope="row" abbr="L2 Cache" class="specalt">&nbsp;&nbsp;一级菜单</th>
				<th scope="row" abbr="L2 Cache" class="specalt">
					<span id="secondary">&nbsp;&nbsp;二级菜单</span>
					<span id="fastener">&nbsp;&nbsp;按扭</span>
				</th>
			</tr>
			<c:forEach items="${permissions}" var="k">
				<tr>
					<th scope="row" abbr="L2 Cache" class="specalt leftWidth">
						<input type="checkbox" name="resId" id="menu" _key="menu_${k.id}"
							onclick="smenu(this,'${k.id}')" value="${k.id}"> ${k.name}
					</th>
					<th scope="row" abbr="L2 Cache" class="specalt">
						<table id="mytable" cellspacing="0" summary="The technical specifications of the Apple PowerMac G5 series">
							<c:forEach items="${k.children}" var="kc">
								<tr>
									<th scope="row" abbr="L2 Cache" class="specalt centerWidth">
										<input type="checkbox" name="resId" id="menu" _key="menu_1_${k.id}"
											_key_1="menu_1_1_${kc.id}"
											onclick="menu_1(this,'${kc.id}','${k.id}')" value="${kc.id}">${kc.name}
									</th>
									<th>
										<c:if test="${not empty kc.children}">
											<table id="mytable" cellspacing="0"
												summary="The technical specifications of the Apple PowerMac G5 series">
												<c:forEach items="${kc.children}" var="kcc">
													<tr>
														<th scope="row" abbr="L2 Cache" class="specalt rightWidth">
															<input type="checkbox" name="resId" id="menu" value="${kcc.id}"
															_key="menu_1_1_${k.id}" _key_2="menu_1_1_${kc.id}"
															onclick="menu_1_1(this,'${kc.id}','${k.id}')"> ${kcc.name}
														</th>
													</tr>
												</c:forEach>
											</table>
										</c:if>
									</th>
								</tr>
							</c:forEach>
						</table>
					</th>
				</tr>
			</c:forEach>
		</table>
		<br>
	</form>
	<script type="text/javascript">
		//按钮悬浮
		$(function() {
			$("#fixtop").fixtop({
				marginTop : 0
			});
		});
		
		$.ajax({
			type : "POST",
			data : {
				"roleId" : "${param.id}"
			},
			url : rootPath + '/role/findRes.shtml',
			dataType : 'json',
			success : function(json) {
				for (index in json) {
					$("input[name='resId']:checkbox[value='"+ json[index].id + "']").prop('checked','true');
				}
			}
		});
	</script>
</body>
</html>