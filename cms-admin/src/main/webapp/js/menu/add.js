

$(function() {
	$("#fixtop").fixtop();
	$("form").validate({
		submitHandler : function(form) {
			ly.ajaxSubmit(form, {
				type : "post",
				dataType : "json",
				success : function(data) {
					if (data == "success") {
						parent.layer.msg('保存成功！',{icon: 1,time:1000});
							var index = parent.layer.getFrameIndex(window.name);
							parent.layer.close(index);
							$("#districtAddForm")[0].reset();
							
					}else if(data == "nameRepeat"){
						parent.layer.msg('菜单已存在！',{icon: 0,time:2000});
					} else {
						
					}
				}
			});
		},
		errorPlacement : function(error, element) {
		},
		success : function(label) {
		}
	});
	

	
	
	
	
});

//表单数据校验
function checkImpl(thisElement) {
	var rslt = checkValueByName(thisElement.name, thisElement.value.trim());
	if (rslt == 'ok') {
		$(thisElement).val(thisElement.value.trim());
		$(thisElement).attr('placeholder', '');
		$(thisElement).attr('class', 'form-control');// 绿色
		return;
	} else {
		$(thisElement).val('');
		$(thisElement).attr('class', 'form-control alert-danger');// 红色
		$(thisElement).attr('placeholder', rslt);
	}

}


function checkValueByName(name, value) {
	if (isNull(value)) {
		return "请填写信息";
	} else {
		return 'ok';
	}
}
function isNull(str) {
	if (str == "")
		return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}
