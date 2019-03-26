 var file ='';
$(function(){
	$(".imgs").click(function(){
		$("#correctSide").click();
	});
	$(".img").click(function(){
		$("#correct").click();
	});
	
	$("#idCardFront").click(function() {
		$.fancybox.open({
			href : front,
			type : 'iframe',
			showNavArrows : true
		});
	});
	
	$("#idCardBack").click(function() {
		$.fancybox.open({
			href : back,
			type : 'iframe',
			showNavArrows : true
		});
	});
	
	$("#vehicleLicense").click(function() {
		$.fancybox.open({
			href : vehicleLicense,
			type : 'iframe',
			showNavArrows : true
		});
	});
});


function getPath(obj,fileQuery,transImg) {
		   var imgSrc = '', imgArr = [], strSrc = '' ;
		   if(window.navigator.userAgent.indexOf("MSIE")>=1){ // IE浏览器判断
		    if(obj.select){
		     obj.select();
		     var path=document.selection.createRange().text;
		     obj.removeAttribute("src");
		     imgSrc = fileQuery.value ;
		     imgArr = imgSrc.split('.') ;
		     strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
		     if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
		      obj.setAttribute("src",transImg);
		      obj.style.filter=
		       "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path+"', sizingMethod='scale');"; // IE通过滤镜的方式实现图片显示
		     }else{
		      //try{
		      throw new Error('File type Error! please image file upload..'); 
		      //}catch(e){
		      // alert('name: ' + e.name + 'message: ' + e.message) ;
		      //}
		     }
		    }else{
		     // alert(fileQuery.value) ;
		     imgSrc = fileQuery.value ;
		     imgArr = imgSrc.split('.') ;
		     strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
		     if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
		      obj.src = fileQuery.value ;
		     }else{
		      //try{
		      throw new Error('File type Error! please image file upload..') ;
		      //}catch(e){
		      // alert('name: ' + e.name + 'message: ' + e.message) ;
		      //}
		     }
		    }
		 
		   } else{
		    var file =fileQuery.files[0];
		    var reader = new FileReader();
		    reader.onload = function(e){
		     imgSrc = fileQuery.value ;
		     imgArr = imgSrc.split('.') ;
		     strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
		     if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
		    	 obj.setAttribute("src", e.target.result) ;
		     }else{
		      //try{
		      throw new Error('File type Error! please image file upload..') ;
		      //}catch(e){
		      // alert('name: ' + e.name + 'message: ' + e.message) ;
		      //}
		     }
		 
		     // alert(e.target.result); 
		    }
		    reader.readAsDataURL(file);
		   }
		   return fileQuery.value ;
		  }
	
	 function show(){
		   //以下即为完整客户端路径
		  var file_img=document.getElementById("imgs");
		  var  iptfileupload = document.getElementById('correctSide') ; 
		   file =  getPath(file_img,iptfileupload,file_img) ;
		   
	}
	 
	 function shows(){
		   //以下即为完整客户端路径
		  var file_img=document.getElementById("img");
		  var iptfileupload = document.getElementById('correct') ; 
		   file =  getPath(file_img,iptfileupload,file_img) ;
	}