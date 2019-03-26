var statsInfo;

$(document).ready(function() {
	
});

//合同统计初始化具体操作
function initPendingContractEcharts(){
	contractQuantityChart = echarts.init(document.getElementById('contractQuantityEchartsId'));
	
	contractQauntityOption = {
			grid:{
				x:'20%',
				y:10,
				x1:'20%',
				y2:'20'
			},
			tooltip : {
				trigger : 'axis'
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : [ '-' ]
			} ],
			yAxis : [ {
				type : 'value',
				data : [ '-' ],
			} ],
			series : [ {
				name : "合同数量",
				type : "line",
				data : [ '-' ],
				itemStyle : {
					normal : {
						color : '#5ab1ef'
					}
				},
				markLine : {
					data : [ {
						type : 'average',
						name : '平均合同数量'
					} ],
					itemStyle : {
						normal : {
							color : '#5ab1ef'
						}
					}
				}
			} ]
	};
	contractQuantityChart.setOption(contractQauntityOption);
}

function initGoodsQuantityEcharts() {
	goodsQuantityChart = echarts.init(document
			.getElementById('goodsQuantityEchartsId'));

	goodsQuantityOption = {
		grid : {
			x : "20%",
			y : 10,
			x2 : "10%",
			y2 : "10%"
		},
		tooltip : {
			trigger : 'axis'
		},
		calculable : true,
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : [ '-' ]
		} ],
		yAxis : [ {
			type : 'value',
			data : [ '-' ]
		} ],
		series : [ {
			name : "货源数量",
			type : "line",
			data : [ '-' ],
			itemStyle : {
				normal : {
					color : '#5ab1ef'
				}
			},
			markLine : {
				data : [ {
					type : 'average',
					name : '平均货源数量'
				} ],
				itemStyle : {
					normal : {
						color : '#5ab1ef'
					}
				}
			}
		} ]
	};

	goodsQuantityChart.setOption(goodsQuantityOption);
}

function initDeliveryQuantityEcharts() {
	deliveryQuantityChart = echarts.init(document
			.getElementById('deliveryQuantityEchartsId'));

	deliveryQuantityOption = {
		grid : {
			x : "20%",
			y : 10,
			x2 : "10%",
			y2 : "10%"
		},
		tooltip : {
			trigger : 'axis'
		},
		calculable : true,
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : [ '-' ]
		} ],
		yAxis : [ {
			type : 'value',
			data : [ '-' ],
		} ],
		series : [ {
			name : "运单数量",
			type : "line",
			data : [ '-' ],
			itemStyle : {
				normal : {
					color : '#5ab1ef'
				}
			},
			markLine : {
				data : [ {
					type : 'average',
					name : '平均运单数量'
				} ],
				itemStyle : {
					normal : {
						color : '#5ab1ef'
					}
				}
			}
		} ]
	};

	deliveryQuantityChart.setOption(deliveryQuantityOption);
}

//function initDispatchingDocQuantityEcharts() {
//	dispatchingDocQuantityChart = echarts.init(document
//			.getElementById('GoodsAmountEchartsId'));
//
//	dispatchingDocQuantityOption = {
//		grid : {
//			x : "20%",
//			y : 10,
//			x2 : "10%",
//			y2 : "10%"
//		},
//		tooltip : {
//			trigger : 'axis'
//		},
//		calculable : true,
//		xAxis : [ {
//			type : 'category',
//			boundaryGap : false,
//			data : [ '-' ]
//		} ],
//		yAxis : [ {
//			type : 'value',
//			data : [ '-' ],
//		} ],
//		series : [ {
//			name : "派车单数量",
//			type : "line",
//			data : [ '-' ],
//			itemStyle : {
//				normal : {
//					color : '#5ab1ef'
//				}
//			},
//			markLine : {
//				data : [ {
//					type : 'average',
//					name : '平均派车单数量'
//				} ],
//				itemStyle : {
//					normal : {
//						color : '#5ab1ef'
//					}
//				}
//			}
//		} ]
//	};
//
//	dispatchingDocQuantityChart.setOption(dispatchingDocQuantityOption);
//}

function initSettlementQuantityEcharts() {
	settlementQuantityChart = echarts.init(document
			.getElementById('DeliveryAmountEchartsId'));

	settlementQuantityOption = {
		grid : {
			x : "20%",
			y : 10,
			x2 : "10%",
			y2 : "10%"
		},
		tooltip : {
			trigger : 'axis'
		},
		calculable : true,
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : [ '-' ]
		} ],
		yAxis : [ {
			type : 'value',
			data : [ '-' ],
		} ],
		series : [ {
			name : "结算单数量",
			type : "line",
			data : [ '-' ],
			itemStyle : {
				normal : {
					color : '#5ab1ef'
				}
			},
			markLine : {
				data : [ {
					type : 'average',
					name : '平均结算单数量'
				} ],
				itemStyle : {
					normal : {
						color : '#5ab1ef'
					}
				}
			}
		} ]
	};

	settlementQuantityChart.setOption(settlementQuantityOption);
}

function initPaymentQuantityEcharts() {
	paymentQuantityChart = echarts.init(document
			.getElementById('paymentQuantityEchartsId'));

	paymentQuantityOption = {
		grid : {
			x : "20%",
			y : 10,
			x2 : "10%",
			y2 : "10%"
		},
		tooltip : {
			trigger : 'axis'
		},
		calculable : true,
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : [ '-' ]
		} ],
		yAxis : [ {
			type : 'value',
			data : [ '-' ],
		} ],
		series : [ {
			name : "支付单数量",
			type : "line",
			data : [ '-' ],
			itemStyle : {
				normal : {
					color : '#5ab1ef'
				}
			},
			markLine : {
				data : [ {
					type : 'average',
					name : '平均支付单数量'
				} ],
				itemStyle : {
					normal : {
						color : '#5ab1ef'
					}
				}
			}
		} ]
	};

	paymentQuantityChart.setOption(paymentQuantityOption);
}

function initInvoiceQuantityEcharts() {
	invoiceQuantityChart = echarts.init(document
			.getElementById('invoiceAmountEchartsId'));

	invoiceQuantityOption = {
		grid : {
			x : "20%",
			y : 10,
			x2 : "10%",
			y2 : "10%"
		},
		tooltip : {
			trigger : 'axis'
		},
		calculable : true,
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : [ '-' ]
		} ],
		yAxis : [ {
			type : 'value',
			data : [ '-' ],
		} ],
		series : [ {
			name : "发票数量",
			type : "line",
			data : [ '-' ],
			itemStyle : {
				normal : {
					color : '#5ab1ef'
				}
			},
			markLine : {
				data : [ {
					type : 'average',
					name : '平均发票数量'
				} ],
				itemStyle : {
					normal : {
						color : '#5ab1ef'
					}
				}
			}
		} ]
	};

	invoiceQuantityChart.setOption(invoiceQuantityOption);
}

//设置option参数
function loadContractQuantity(response) {
	contractQuantityChart.clear();
	contractQauntityOption.xAxis[0].data = response.xAxis;
	contractQauntityOption.series[0].data = response.yAxis;
	contractQuantityChart.setOption(contractQauntityOption);
}

function loadGoodsQuantity(response) {
	goodsQuantityChart.clear();
	goodsQuantityOption.xAxis[0].data = response.xAxis;
	goodsQuantityOption.series[0].data = response.yAxis;
	goodsQuantityChart.setOption(goodsQuantityOption);
}

//function loadDispatchingDocQuantity(response) {
//	dispatchingDocQuantityChart.clear();
//	dispatchingDocQuantityOption.xAxis[0].data = response.xAxis;
//	dispatchingDocQuantityOption.series[0].data = response.yAxis;
//	dispatchingDocQuantityChart.setOption(dispatchingDocQuantityOption);
//}

function loadDeliveryQuantity(response) {
	deliveryQuantityChart.clear();
	deliveryQuantityOption.xAxis[0].data = response.xAxis;
	deliveryQuantityOption.series[0].data = response.yAxis;
	deliveryQuantityChart.setOption(deliveryQuantityOption);
}

function loadSettlementQuantity(response) {
	settlementQuantityChart.clear();
	settlementQuantityOption.xAxis[0].data = response.xAxis;
	settlementQuantityOption.series[0].data = response.yAxis;
	settlementQuantityChart.setOption(settlementQuantityOption);
}

function loadPaymentQuantity(response) {
	paymentQuantityChart.clear();
	paymentQuantityOption.xAxis[0].data = response.xAxis;
	paymentQuantityOption.series[0].data = response.yAxis;
	paymentQuantityChart.setOption(paymentQuantityOption);
}

function loadInvoiceQuantity(response) {
	invoiceQuantityChart.clear();
	invoiceQuantityOption.xAxis[0].data = response.xAxis;
	invoiceQuantityOption.series[0].data = response.yAxis;
	invoiceQuantityChart.setOption(invoiceQuantityOption);
}

function initStatsInfo() {
	findContractQuatity(1);
	findGoodsQuantity(1);
//	findDispatchingDocQuantity(1);
	findDeliveryQuantity(1);
	findSettlementQuantity(1);
	findPaymentQuantity(1);
	findInvoiceQuantity(1);
//	$.ajax({
//		type : "get",
//		async : true,
//		dataType : "json",
//		url : rootPath + '/main/findStatsInfo.shtml',
//		data : {
//			
//		},
//		success : function(result) {
//			statsInfo = result;
//			loadGoodsQuantity(1);
//			loadDeliveryQuantity(1);
//			loadGoodsAmount(1);
//			loadDeliveryAmount(1);
//		},
//		error : function(errorMsg) {
//			parent.layer.msg("获取数据失败！", {
//				icon : 2,time:1000
//			});
//		}
//	});
}

function findContractQuatity(type){
	$.ajax({
		type:'get',
		async : true,
		url:rootPath + '/main/findContractQuantityForEcharts.shtml',
		dataType:'json',
		data:{
			type:type
		},
	    success:function(response){
	    	loadContractQuantity(response);
	    },
	    error:function(errorMsg){
	    	parent.layer.msg("获取数据失败",{icon:2,time:1000})
	    }
	})
};

function findGoodsQuantity(type){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findGoodsQuantityForEcharts.shtml',
		data : {
			type : type
		},
		success : function(response) {
			loadGoodsQuantity(response);
		},
		error : function(errorMsg) {
			parent.layer.msg("获取数据失败！", {
				icon : 2,time:1000
			});
		}
	});
}

//function findDispatchingDocQuantity(type){
//	$.ajax({
//		type : "get",
//		async : true,
//		dataType : "json",
//		url : rootPath + '/main/findDispatchingDocQuantityForEcharts.shtml',
//		data : {
//			type : type
//		},
//		success : function(response) {
//			loadDispatchingDocQuantity(response);
//		},
//		error : function(errorMsg) {
//			parent.layer.msg("获取数据失败！", {
//				icon : 2,time:1000
//			});
//		}
//	});
//}

function findDeliveryQuantity(type){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findDeliveryQuantityForEcharts.shtml',
		data : {
			type : type
		},
		success : function(response) {
			loadDeliveryQuantity(response);
		},
		error : function(errorMsg) {
			parent.layer.msg("获取数据失败！", {
				icon : 2,time:1000
			});
		}
	});
}

function findSettlementQuantity(type){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findSettlementQuantityForEcharts.shtml',
		data : {
			type : type
		},
		success : function(response) {
			loadSettlementQuantity(response);
		},
		error : function(errorMsg) {
			parent.layer.msg("获取数据失败！", {
				icon : 2,time:1000
			});
		}
	});
}

function findPaymentQuantity(type){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findPaymentQuantityForEcharts.shtml',
		data : {
			type : type
		},
		success : function(response) {
			loadPaymentQuantity(response);
		},
		error : function(errorMsg) {
			parent.layer.msg("获取数据失败！", {
				icon : 2,time:1000
			});
		}
	});
}

function findInvoiceQuantity(type){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findInvoiceQuantityForEcharts.shtml',
		data : {
			type : type
		},
		success : function(response) {
			loadInvoiceQuantity(response);
		},
		error : function(errorMsg) {
			parent.layer.msg("获取数据失败！", {
				icon : 2,time:1000
			});
		}
	});
}

function pendingContract(){
	$.ajax({
		type:'get',
		async : true,
		url:rootPath + '/main/countContract.shtml',
		dataType:'json',
		success:function(response){
			$('#pendingContract').text('数量  ' + response)
		}
	})
}

function pendingGoodsAudit(){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findGoodsQuantity.shtml',
		success : function(response) {
			$("#pendingGoodsAudit").text("数量 " + response);
		}
	});
}

//function pendingDispatchingDoc(){
//	$.ajax({
//		type : "get",
//		async : true,
//		dataType : "json",
//		url : rootPath + '/main/findDispatchingDocQuantity.shtml',
//		success : function(response) {
//			$("#pendingDispatchingDoc").text("数量 " + response);
//		}
//	});
//}

function pendingDeliveryAudit(){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findDeliveryQuantity.shtml',
		success : function(response) {
			$("#pendingDeliveryAudit").text("数量 " + response);
		}
	});
}

function pendingSettlement(){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findSettlementQuantity.shtml',
		success : function(response) {
			$("#pendingSettlement").text("数量 " + response);
		}
	});
}

function pendingPayment(){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findPaymentQuantity.shtml',
		success : function(response) {
			$("#pendingPayment").text("数量 " + response);
		}
	});
}

function pendingInvoice(){
	$.ajax({
		type : "get",
		async : true,
		dataType : "json",
		url : rootPath + '/main/findInvoiceQuantity.shtml',
		success : function(response) {
			$("#pendingInvoice").text("数量 " + response);
		}
	});
}