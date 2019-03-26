 $(document).ready(function() {
	 $("body").css("background-image","url('" + indexBackground + "')");
	 $(".left-img").attr("src","" + indexLogo + "");
	 
	 init();
	 $("#loginLog").click('click',function(){
			 loginLog();
	 })
		 
	 $(document).on("keydown", "#pass", function(e) {
		 if (e.keyCode == 13) {
			   loginLog();
		  }
	 })
		 
	$("#getVerifyCode").click('click', function(e) {
		getVerifyCode(this);
	})
 });
 
 function verifyCodeCountDown(obj) {
		if (countdown == 0) {
			obj.removeAttribute("disabled");
			obj.value = "获取验证码";
			countdown = 180;
			return;
		}
		
		obj.setAttribute("disabled", true);
		obj.value = "重新发送(" + countdown + ")";
		countdown--;
		
		setTimeout(function() {
			verifyCodeCountDown(obj)
		}, 1000);
}
	
function init() {
		$("#getVerifyCode").removeAttr("disabled");
}
	

function getVerifyCode(obj) {
		var loginUserName = $.trim($("#loginUserName").val());
		if ("" == loginUserName) {
			layer.alert("请输入登陆用户名!",{icon: 4});
			return;
		}
		verifyCodeCountDown(obj);
		$.ajax({
			type : "get",
			async : true,
			dataType : "json",
			url : rootPath + '/verifyCode/getData.shtml',
			data : {
				phone : phone
			},
			success : function(result) {
			},
			error : function(errorMsg) {
				layer.alert("获取验证码失败，请再次获取！",{icon: 4});
			}
		});
}
	
	
function loginLog() {
		var userName = $("#loginUserName").val().trim();
		if ("" == userName) {
			layer.alert("请输入登陆用户名!",{icon: 4});
			return;
		}
		
		var password = $("#pass").val();
		if ("" == password) {
			layer.alert("请输入密码!",{icon: 4});
			return;
		}

		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + "/login.shtml",
			data : {
				userName : userName,
				password : password
			},
			success : function(res) {
				if("success" == res.result){
					window.location.href = rootPath + '/index.shtml';
				} else {
					layer.alert(res.result,{icon: 4});
					
				}
			},
			error : function(response) {
			}
		});
}