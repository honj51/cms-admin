$(document).ready(function() {

	$("#startDate").datetimepicker({
		format : "YYYY-MM-DD"
	});

	$("#endDate").datetimepicker({
		format : "YYYY-MM-DD"
	});

	search();
	
	$("#search").click("click", function() {
		search();
	});

});

function search(){
	
	$.ajax({
		async : true,
		cache : false,
		type: 'POST',
		dataType : "json",
		url : rootPath + '/statistics/pieChart/coalMine.shtml',
		data : {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		error: function () {
			parent.layer.msg('煤矿占有率请求失败！',{icon: 2,time: 1000});
		},
		success:function(data){
			var coalMineQuantity = data.coalMineQuantity;
			var freshCoalMineQuantity = data.freshCoalMineQuantity;
			coalMineRate(coalMineQuantity, freshCoalMineQuantity);
		}
	});
	
	$.ajax({
		async : true,
		cache : false,
		type: 'POST',
		dataType : "json",
		url : rootPath + '/statistics/pieChart/tonnage.shtml',
		data : {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		error: function () {
			parent.layer.msg('吨位请求失败！',{icon: 2,time: 1000});
		},
		success:function(data){
			var deliveredTonnage = data.deliveredTonnage;
			var undeliveredTonnage = data.undeliveredTonnage;
			tonnageRate(deliveredTonnage, undeliveredTonnage);
		}
	});
	
	$.ajax({
		async : true,
		cache : false,
		type: 'POST',
		dataType : "json",
		url : rootPath + '/statistics/pieChart/shipper.shtml',
		data : {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		error: function () {
			parent.layer.msg('请求失败！',{icon: 2,time: 1000});
		},
		success:function(data){
			var deliveredShipperQuantity = data.deliveredShipperQuantity;
			var noDeliveredShipperQuantity = data.noDeliveredShipperQuantity;
			shipperRate(deliveredShipperQuantity, noDeliveredShipperQuantity);
		}
	});
	
	$.ajax({
		async : true,
		cache : false,
		type: 'POST',
		dataType : "json",
		url : rootPath + '/statistics/pieChart/remainedShipper.shtml',
		data : {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		error: function () {
			parent.layer.msg('请求失败！',{icon: 2,time: 1000});
		},
		success:function(data){
			var remainedShipperQuantity = data.remainedShipperQuantity;
			var lostShipperQuantity = data.lostShipperQuantity;
			shipperRemainedRate(remainedShipperQuantity, lostShipperQuantity);
		}
	});
	
	
	$.ajax({
		async : true,
		cache : false,
		type: 'POST',
		dataType : "json",
		url : rootPath + '/statistics/pieChart/route.shtml',
		data : {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		error: function () {
			parent.layer.msg('请求失败！',{icon: 2,time: 1000});
		},
		success:function(data){
			var deliveredRouteQuantity = data.deliveredRouteQuantity;
			var noDeliveredRouteQuantity = data.noDeliveredRouteQuantity;
			routeRate(deliveredRouteQuantity, noDeliveredRouteQuantity);
		}
	});
	
	$.ajax({
		async : true,
		cache : false,
		type: 'POST',
		dataType : "json",
		url : rootPath + '/statistics/pieChart/routeSatisfy.shtml',
		data : {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		},
		error: function () {
			parent.layer.msg('请求失败！',{icon: 2,time: 1000});
		},
		success:function(data){
			var deliveredVihecleQuantity = data.deliveredVihecleQuantity;
			var undeliveredVihecleQuantity = data.undeliveredVihecleQuantity;
			routeSatisfyRate(deliveredVihecleQuantity, undeliveredVihecleQuantity);
		}
	});
	
}

function coalMineRate(coalMineQuantity, freshCoalMineQuantity) {
	var option = {
		title : {
			text : '煤矿占有率',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		calculable : true,
		series : [ {
			name : '煤矿占有率',
			type : 'pie',
			radius : '50%',
			center : [ '50%', '40%' ],
			data : [ {
				value : coalMineQuantity,
				name : '已开拓 '
			}, {
				value : freshCoalMineQuantity,
				name : '未开拓'
			},

			]
		} ]
	};
	var myChart = echarts.init(document.getElementById('coalMineRate'));
	myChart.setOption(option);
}

function tonnageRate(deliveredTonnage, undeliveredTonnage) {
	var option = {
		title : {
			text : '吨位占有率',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		calculable : true,
		series : [ {
			name : '吨位占有率',
			type : 'pie',
			radius : '50%',
			center : [ '50%', '40%' ],
			data : [ {
				value : deliveredTonnage,
				name : '已承运'
			}, {
				value : undeliveredTonnage,
				name : '未承运'
			}

			]
		} ]
	};
	var myChart = echarts.init(document.getElementById('tonageRate'));
	myChart.setOption(option);
}

function shipperRate(deliveredShipperQuantity, noDeliveredShipperQuantity) {
	var option = {
		title : {
			text : '货主占有率',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		calculable : true,
		series : [ {
			name : '货主占有率',
			type : 'pie',
			radius : '50%',
			center : [ '50%', '40%' ],
			data : [ {
				value : deliveredShipperQuantity,
				name : '亲密货主'
			}, {
				value : noDeliveredShipperQuantity,
				name : '潜水货主'
			}

			]
		} ]
	};
	var myChart = echarts.init(document.getElementById('shipperRate'));
	myChart.setOption(option);
}

function shipperRemainedRate(remainedShipperQuantity, lostShipperQuantity) {
	var option = {
		title : {
			text : '货主留存率',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		calculable : true,
		series : [ {
			name : '货主留存率',
			type : 'pie',
			radius : '50%',
			center : [ '50%', '40%' ],
			data : [ {
				value : remainedShipperQuantity,
				name : '留存货主'
			}, {
				value : lostShipperQuantity,
				name : '流失货主'
			}
			]
		} ]
	};
	var myChart = echarts.init(document.getElementById('shipperRemainedRate'));
	myChart.setOption(option);
}

function routeRate(deliveredRouteQuantity, noDeliveredRouteQuantity) {
	var option = {
		title : {
			text : '线路占有率',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		calculable : true,
		series : [ {
			name : '线路占有率',
			type : 'pie',
			radius : '50%',
			center : [ '50%', '40%' ],
			data : [ {
				value : deliveredRouteQuantity,
				name : '已发路线'
			}, {
				value : noDeliveredRouteQuantity,
				name : '未发路线'
			}

			]
		} ]
	};
	var myChart = echarts.init(document.getElementById('routeRate'));
	myChart.setOption(option);
}

function routeSatisfyRate(deliveredVihecleQuantity, undeliveredVihecleQuantity) {
	var option = {
		title : {
			text : '线路满足率',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		calculable : true,
		series : [ {
			name : '线路满足率',
			type : 'pie',
			radius : '50%',
			center : [ '50%', '40%' ],
			data : [ {
				value : deliveredVihecleQuantity,
				name : '已装车'
			}, {
				value : undeliveredVihecleQuantity,
				name : '未装车'
			}

			]
		} ]
	};
	var myChart = echarts.init(document.getElementById('pathRate'));
	myChart.setOption(option);
}