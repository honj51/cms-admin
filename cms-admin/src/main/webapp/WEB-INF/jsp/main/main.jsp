   <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/common/common.jspf"%>
<link href="${ctx}/css/layout.css" rel="stylesheet">
    <!DOCTYPE html>  
    <html lang="en">  
      <head>  
        <meta charset="utf-8">  
        <meta http-equiv="X-UA-Compatible" content="IE=edge">  
        <meta name="viewport" content="width=device-width, initial-scale=1">  
        <meta name="description" content="">  
        <meta name="author" content="">  
        <title>百度</title>  
        <!-- Latest compiled and minified JavaScript -->  
        <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>  
        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">  
        <!-- ECharts单文件引入 -->  
        <script src="http://echarts.baidu.com/build/echarts-plain.js"></script>  
        <script language=javascript>  
        $( document ).ready(function() {  
            //var t;  
            //$("#t").html(test());  
            test();  
            pathMeetRate();
            tonRate();
            shipperRate();
            shipperKeepRate();
            pathRate();
        });  
        function test(){   
        var option = {  
        title : {  
            text: '煤矿占有率',  
            x:'center'  
        },  
        tooltip : {  
            trigger: 'item',  
            formatter: "{a} <br/>{b} : {c} ({d}%)"  
        },  

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        calculable : true, 
        series : [  
            {  
                name:'访问来源',  
                type:'pie',  
                radius : '40%',  
                center: ['30%', '40%'],  
                data:[  
                    {value:coalMine, name:'业务开拓 '},  
                    {value:allCoalMine-coalMine, name:'未开拓'},  
                   
                  
                ],
                roseType: 'angle',
                
            }  
        ]  
    };  
        var myChart = echarts.init(document.getElementById('chart'));  
        myChart.setOption(option);  
       }     
        
        
        function pathMeetRate(){   
            var option = {  
            title : {  
                text: '吨位占有率',  
                x:'center'  
            },  
            tooltip : {  
                trigger: 'item',  
                formatter: "{a} <br/>{b} : {c} ({d}%)"  
            },  
            calculable : true,  
            series : [  
                {  
                    name:'访问来源',  
                    type:'pie',  
                    radius : '40%',  
                    center: ['30%', '40%'],  
                    data:[  
                        {value:335, name:'直接访问'},  
                        {value:310, name:'邮件营销'} 
                       
                    ]  
                }  
            ]  
        };  
            var myChart = echarts.init(document.getElementById('pathMeetRate'));  
            myChart.setOption(option);  
           } 
        
        
        
        function tonRate(){   
            var option = {  
            title : {  
                text: '货主占有率',  
                x:'center'  
            },  
            tooltip : {  
                trigger: 'item',  
                formatter: "{a} <br/>{b} : {c} ({d}%)"  
            },  
            calculable : true,  
            series : [  
                {  
                    name:'访问来源',  
                    type:'pie',  
                    radius : '40%',  
                    center: ['30%', '40%'],  
                    data:[  
                        {value:shipper, name:'亲密货主'},  
                        {value:allShipper-shipper, name:'潜水货主'} 
                       
                    ]  
                }  
            ]  
        };  
            var myChart = echarts.init(document.getElementById('tonRate'));  
            myChart.setOption(option);  
           } 
        
        
        function shipperRate(){   
            var option = {  
            title : {  
                text: '货主留存率',  
                x:'center'  
            },  
            tooltip : {  
                trigger: 'item',  
                formatter: "{a} <br/>{b} : {c} ({d}%)"  
            },  
            calculable : true,  
            series : [  
                {  
                    name:'访问来源',  
                    type:'pie',  
                    radius : '40%',  
                    center: ['30%', '40%'],  
                    data:[  
                        {value:335, name:'直接访问'},  
                        {value:310, name:'邮件营销'}  
                       
                    ]  
                }  
            ]  
        };  
            var myChart = echarts.init(document.getElementById('shipperRate'));  
            myChart.setOption(option);  
           } 
        
        
        function shipperKeepRate(){   
            var option = {  
            title : {  
                text: '线路占有率',  
                x:'center'  
            },  
            tooltip : {  
                trigger: 'item',  
                formatter: "{a} <br/>{b} : {c} ({d}%)"  
            },  
            calculable : true,  
            series : [  
                {  
                    name:'访问来源',  
                    type:'pie',  
                    radius : '40%',  
                    center: ['30%', '40%'],  
                    data:[  
                        {value:335, name:'本月发货路线'},  
                        {value:allRote-335, name:'未发路线'}  
                       
                    ]  
                }  
            ]  
        };  
            var myChart = echarts.init(document.getElementById('shipperKeepRate'));  
            myChart.setOption(option);  
           } 
        
        
        function pathRate(){   
            var option = {  
            title : {  
                text: '线路满足率',  
                x:'center'  
            },  
            tooltip : {  
                trigger: 'item',  
                formatter: "{a} <br/>{b} : {c} ({d}%)"  
            },  
            calculable : true,  
            series : [  
                {  
                    name:'访问来源',  
                    type:'pie',  
                    radius : '40%',  
                    center: ['30%', '40%'],  
                    data:[  
                        {value:335, name:'直接访问'},  
                        {value:310, name:'邮件营销'}  
                       
                    ]  
                }  
            ]  
        };  
            var myChart = echarts.init(document.getElementById('pathRate'));  
            myChart.setOption(option);  
           } 
        
        </script>  
      </head>  
      <body>  
    	<div class="container-fluid">
		<div class="col-md-12">
			<div class="agency">
					</div>
			<div class="content">
				<div class="col-md-12">
					<div class="tab-pane in active" id="tab-home-info">
						<div class="statistics_header" style="margin-top: -20px">
							<h2>数据中心</h2>
						</div>
						  <div style="display:inline-block; background: #fff; width:100%; height:auto;">
							<div class="col-md-12">
								<div class="col-md-4">
									 <div align="center" id="chart" style="height:400px"></div>  
								</div>

								<div class="col-md-4">
									 <div align="center" id="pathMeetRate" style="height:400px"></div>  
								</div>

								<div class="col-md-4">
									  <div align="center" id="tonRate" style="height:400px"></div>  
								</div>
							</div>
							<div class="col-md-12">
								<div class="col-md-4">
									  <div align="center" id="shipperRate" style="height:400px"></div>  
								</div>
								<div class="col-md-4">
								   <div align="center" id="shipperKeepRate" style="height:400px"></div>  
								</div>

								<div class="col-md-4">
									 <div align="center" id="pathRate" style="height:400px"></div>  
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>    
	<script type="text/javascript">
	   var coalMine = "${coalMine.total}"
	   var allCoalMine = "${allCoalMine.total}";
	   var allShipper = "${allShipper.total}";
	   var shipper = "${shipper.total}";
	   var allRote = "${AllRoute.total}";
	</script>
      </body>  
    </html>  