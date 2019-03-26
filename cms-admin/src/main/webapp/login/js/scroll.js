/**
 * jQuery jslides 1.1.0
 *
 * http://www.cactussoft.cn
 *
 * Copyright (c) 2009 - 2013 Jerry
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
 
 

 var slide=function(obj){
	var numpic =$(obj).find('li').size()-1;
		var nownow = 0;
		var inout = 0;
		var TT = 0;
		var SPEED = 5000;
		$(obj).find('li').eq(0).siblings('li').css({'display':'none'});
		var ulstart = '<ul class="point">',
			ulcontent = '',
			ulend = '</ul>';
		ADDLI();
		var point =$(obj).next().find("li");
		var pointwidth = $('.point').width();
		//$('.point').css('margin-left',(470-pointwidth))
		
		$(obj).next().find("li").eq(0).addClass('current')
			
		function ADDLI(){
			//var lilicount = numpic + 1;
			for(var i = 0; i <= numpic; i++){
				ulcontent += '<li>' + '<a href="javascript:">' + (i+1) + '</a>' + '</li>';
			}
			
			$(obj).after(ulstart + ulcontent + ulend);	
		}
		point.on('click',DOTCHANGE)
		function DOTCHANGE(){
			var changenow = $(this).index();	
		    $(obj).find('li').eq(nownow).css('z-index','900');
			$(obj).find('li').eq(changenow).css({'z-index':'800'}).show();
			point.eq(changenow).addClass('current').siblings('li').removeClass('current');
			$(obj).find('li').eq(nownow).fadeOut(400,function(){$(obj).find('li').eq(changenow).fadeIn(500);});
			nownow = changenow;
		}
		point.mouseenter(function(){
			inout = 1;
		})
		point.mouseleave(function(){
			inout = 0;
		})
		
		function GOGO(){
			var NN = nownow+1;
			if( inout == 1 ){
				} else {
				if(nownow < numpic){
				$(obj).find('li').eq(nownow).css('z-index','900');
				$(obj).find('li').eq(NN).css({'z-index':'800'}).show();
				point.eq(NN).addClass('current').siblings('li').removeClass('current');
				$(obj).find('li').eq(nownow).fadeOut(400,function(){$('obj li').eq(NN).fadeIn(500);});
				nownow += 1;
			}else{
				NN = 0;
				$(obj).find('li').eq(nownow).css('z-index','900');
				$(obj).find('li').eq(NN).stop(true,true).css({'z-index':'800'}).show();
				$(obj).find('li').eq(nownow).fadeOut(400,function(){$(obj).find('li').eq(0).fadeIn(500);});
				point.eq(NN).addClass('current').siblings('li').removeClass('current');
				nownow=0;
				}
			}
			
			TT = setTimeout(GOGO, SPEED);
		}
		TT = setTimeout(GOGO, SPEED); 
 }
