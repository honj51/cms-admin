$(function() {
	
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