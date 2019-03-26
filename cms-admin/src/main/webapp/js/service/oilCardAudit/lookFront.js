var pageii = null;
var grid = null;
$(window).resize(function() {
	$(window).unbind("onresize");
	$("#jqGrid").setGridHeight(window.document.body.clientHeight - 260);
	$("#jqGrid").setGridWidth(window.document.body.clientWidth - 10);
	$(window).bind("onresize", this);
});


$(document).ready(function() {
	$(".find").fancybox({
		wrapCSS    : 'fancybox-custom',
		closeClick : false,

		openEffect : 'none',

		helpers : {
			title : {
				type : 'inside'
			},
			overlay : {
				css : {
					'background' : 'rgba(238,238,238,0.85)'
				}
			}
		}
	});
	$("#img").click(function() {
		//$.fancybox.open(frontUrl);
		$.fancybox.open({
			href : frontUrl,
			type : 'iframe',
			helpers : {
				thumbs : {
					width: 75,
					height: 50
				}
			}
		});
		
		
	});
});
