<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/common/common.jspf"%>
<link href="${ctx}/css/layout.css" rel="stylesheet">
<style>
.agency1 .agency2 {
	height: 50px !important;
}
.f1, .f2, .f3, .f4 {
    padding: 28px 0 0 5px;
}
.agency1 small, .agency2 small, .agency3 small, .agency4 small, .agency5 small {
   padding: 10px 0;
    margin-bottom: 18px;
}
h1 {
    padding: 28px 0 0px 0;
}
.agency1 small a, .agency2 small a, .agency3 small a, .agency4 small a, .agency5 small a {
   text-decoration: none;
}
.agency1 {
    background: #61afe0;
}
.agency2 {
    background: #6fb6e2;
}
.pull-right {
    float: left !important;
    padding-left: 10%;
}
.fa{
   float: left;
}
</style>
<body style="">
	<div class="container-fluid">
		<div class="col-md-12">
			<div class="content">
				<div class="col-md-12">
					<!-- <div class="agency">
						<ul class="nav nav-pills nav-justified">
						    <li class="agency1"><i class="fa fa-3x fa-file-text-o f3"></i>
								<h1 class="pull-right">
									合同<small><a id="pendingContract">数量0</a></small>
								</h1>
							</li>	
							<li class="agency2"><i class="fa fa-3x fa-shopping-cart f2"></i>
								<h1 class="pull-right">
									货源<small><a id="pendingGoodsAudit">数量 0</a></small>
								</h1>
							</li>
						    <li class="agency2"><i class="fa fa-3x fa-calendar-check-o f3"></i>
								<h1 class="pull-right">
									派车单<small><a id="pendingDispatchingDoc">数量0</a></small>
								</h1>
							</li>					
											
							<li class="agency1"><i class="fa fa-3x fa-truck f1"></i>
								<h1 class="pull-right">
									运单<small><a id="pendingDeliveryAudit">数量0</a></small>
								</h1>
							</li>
											
							<li class="agency2"><i class="fa fa-3x fa-calendar-check-o f3"></i>
								<h1 class="pull-right">
									结算单<small><a id="pendingSettlement">数量0</a></small>
								</h1>
							</li>	
											
							<li class="agency1"><i class="fa fa-3x fa-dollar f3"></i>
								<h1 class="pull-right">
									支付单<small><a id="pendingPayment">数量0</a></small>
								</h1>
							</li>	
											
							<li class="agency2"><i class="fa fa-3x fa-table f3"></i>
								<h1 class="pull-right">
									发票<small><a id="pendingInvoice">数量0</a></small>
								</h1>
							</li>				
						</ul>
					</div> -->
					<!-- <div class="tab-pane in active" id="tab-home-info" style="padding-bottom: 150px !important;">
						<div class="statistics_header" style="margin-top: -20px">
							<h2>数据中心</h2>
						</div>
						<div style="display: inline-block; background: #fff; width: 100%; height: auto;">
							<div class="col-md-12">
							    <div class="col-md-4">
										<div class="echarts_header">
											合同数量 <select id="contactQuantitySelector"
												class="selectpicker" data-width="50px">
												<option value="3">年</option>
												<option value="2">月</option>
												<option value="1" selected="selected">日</option>
											</select>
										</div>
										<div id="contractQuantityEchartsId" style="height: 30%;"></div>
								</div>
								<div class="col-md-4">
									<div class="echarts_header">
										货源数量 <select id="goodsQuantitySelector" class="selectpicker"
											data-width="50px">
											<option value="3">年</option>
											<option value="2">月</option>
											<option value="1" selected="selected">日</option>
										</select>
									</div>
									<div id="goodsQuantityEchartsId" style="height: 30%;"></div>
								</div>
								<div class="col-md-4">
									<div class="echarts_header">
										运单数量 <select id="deliveryQuantitySelector"
											class="selectpicker" data-width="50px">
											<option value="3">年</option>
											<option value="2">月</option>
											<option value="1" selected="selected">日</option>
										</select>
									</div>
									<div id="deliveryQuantityEchartsId" style="height: 30%;"></div>
								</div>
								<div class="col-md-4">
									<div class="echarts_header">
										派车单数量<select id="GoodsAmountSelector" class="selectpicker"
											data-width="50px">
											<option value="3">年</option>
											<option value="2">月</option>
											<option value="1" selected="selected">日</option>
										</select>
									</div>
									<div id="GoodsAmountEchartsId" style="height: 30%;"></div>
								</div>	
							</div>
							<div class="col-md-12">
								<div class="col-md-4">
									<div class="echarts_header">
										结算单数量 <select id="DeliveryAmountSelector" class="selectpicker"
											data-width="50px">
											<option value="3">年</option>
											<option value="2">月</option>
											<option value="1" selected="selected">日</option>
										</select>
									</div>
									<div id="DeliveryAmountEchartsId" style="height: 30%;"></div>
								</div>
								<div class="col-md-4">
									<div class="echarts_header">
										支付单数量 <select id="paymentQuantitySelector"
											class="selectpicker" data-width="50px">
											<option value="3">年</option>
											<option value="2">月</option>
											<option value="1" selected="selected">日</option>
										</select>
									</div>
									<div id="paymentQuantityEchartsId" style="height: 30%;"></div>
								</div>	
								<div class="col-md-4">
									<div class="echarts_header">
										发票数量 <select id="invoiceAmountSelector" class="selectpicker"
											data-width="50px">
											<option value="3">年</option>
											<option value="2">月</option>
											<option value="1" selected="selected">日</option>
										</select>
									</div>
									<div id="invoiceAmountEchartsId" style="height: 30%;"></div>
								</div>
							</div>
						</div>
					</div>
				</div> -->
			</div>
		</div>
	</div>
	<script>
		var rootPath = "${ctx}";
	</script>
</body>
<script type="text/javascript" src="${ctx}/js/main/list.js<%=ts%>"></script>