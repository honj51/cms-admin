//time无参数则默认持续1.5秒，若time参数为0则不自动关闭，其他情况持续time毫秒
function dialogWarning(message,time){
	var dialog = BootstrapDialog.show({
		title: "提示",
		type: BootstrapDialog.TYPE_WARNING,
		message: message
	});
	if("0" != time) {
		if("undefined" == typeof(time)) {
			setTimeout(function() {
				dialog.close();
			},1500);
		} else {
			setTimeout(function() {
				dialog.close();
			},time);
		}
	}
}

function dialogSuccess(message,time){
	var dialog = BootstrapDialog.show({
		title: "成功",
		type: BootstrapDialog.TYPE_SUCCESS,
		message: message
	});
	if("0" != time) {
		if("undefined" == typeof(time)) {
			setTimeout(function() {
				dialog.close();
			},1500);
		} else {
			setTimeout(function() {
				dialog.close();
			},time);
		}
	}
}

function dialogDanger(message,time){
	var dialog = BootstrapDialog.show({
		title: "失败",
		type: BootstrapDialog.TYPE_DANGER,
		message: message
	});
	if("0" != time) {
		if("undefined" == typeof(time)) {
			setTimeout(function() {
				dialog.close();
			},1500);
		} else {
			setTimeout(function() {
				dialog.close();
			},time);
		}
	}
}

function dialogConfirm(map) {
	var title = "温馨提示";
	var message = null;
	var excute = null;
	var parameter = null;
	var okButton = "确定";
	var cancelButton = "取消";
	
	if("title" in map) {
		title = map["title"];
	}
	
	if("message" in map) {
		message = map["message"];
	}
	
	if("excute" in map) {
		excute = map["excute"];
	}
	if("parameter" in map) {
		parameter = map["parameter"];
	}
	if("okButton" in map) {
		okButton = map["okButton"];
	}
	if("cancelButton" in map) {
		cancelButton = map["cancelButton"];
	}
	
	BootstrapDialog.show({
		title: title,
		message: message,
		buttons:[{
			label: okButton,
			cssClass: "btn-primary",
			action: function(dialog) {
				excute(parameter);
				dialog.close();
			}
		},
		{
			label: cancelButton,
			cssClass: "btn-confirm",
			action: function(dialog) {
				dialog.close();
			}
		}]
	})
}