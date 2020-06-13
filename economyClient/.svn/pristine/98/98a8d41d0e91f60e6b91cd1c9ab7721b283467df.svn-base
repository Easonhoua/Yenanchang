<template>
	<view class="refundProcess">
		<view class="re-top">
			<view class="status">
				<image class="icon" src="/static/img/common/handle_refund.png"></image>
				<text>退款处理中</text>
			</view>
			<view class="re-cell">
				<text class="label">退款金额</text>
				<text class="re-cell-bd block">¥{{orderRefundNumAmount}}</text>
			</view>
			<view class="re-cell">
				<text class="label">退回账户</text>
				<text class="re-cell-bd block">{{orderData.paymentType}}</text>
			</view>
		</view>
		<view class="progressbar">
			<view class="title">退款进度</view>
			<view class="progressbar">
				<view class="inner">
					<view class="item completed">
						<view class="point"></view>
						<view class="txt">
							<view class="state">已提交</view>
						</view>
					</view>
					<view class="item item2 completed">
						<view class="point" :class="orderData.orderStatus==200?'current-point':''"></view>
						<view class="re-line"></view>
						<view class="txt">
							<view class="state">处理中</view>
						</view>
					</view>
					<view class="item item2" :class="orderData.orderStatus>200?'completed':''">
						<view class="point" :class="orderData.orderStatus>200?'current-point':''"></view>
						<view class="re-line"></view>
						<view class="txt">
							<view class="state">退款成功</view>
						</view>
					</view>				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderData:{}, //订单信息
				orderRefundNumAmount:0.00, //退款金额
			}
		},
		onLoad(e) {
			if(e.orderId){
				this.orderData.orderId = e.orderId;
				if(this.request.alreadyLogin()){
					this.queryOrderData(e.orderId);
				}
			}
		},
		methods:{
			//查询订单详情信息
			queryOrderData:function(orderId){
				let url = '/memberapi/api/orders/readByItem.do';
				let data = {
					orderId: orderId, //
				};
				var that = this;
				that.request.post(url, data).then(res => {
					if(res.returncode == 0){
						that.orderData = res.data;
						if(res.data && res.data.itemList){
							//console.log("----------------->>>>>>>>>>>>>>",res.data);
							res.data.itemList.forEach(item => {
								/* if(item.useStatus >200){ //200:待退款
									that.orderRefundNumAmount = that.orderRefundNumAmount+item.realTotalPrice;
								} */
								that.orderRefundNumAmount = that.orderRefundNumAmount+item.realTotalPrice;
							});
						}
					}
				})
			},
		},
	}
</script>

<style>
</style>
