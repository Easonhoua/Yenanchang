
<template>
	<view class="content">
		<scroll-navi-bar class="top-scroll" colorStyle="blue" :itemList="['全部','待付款','待使用','待评价','已完成','待退款','已退款','已关闭']" @naviItemClick="naviItemClick"></scroll-navi-bar>
		<mescroll-body  @down="downCallBack" @up="upCallback" @init="initMescroll" top="78">
			<view class="order-cell box-shadow" v-for="(item,index) in orderList" :key="index" @click="gotoOrderDetail(item)">
				<view class="display-row">
					<view class="type">{{item.orderTypeName}}订单</view>
					<view class="status">{{item.orderStatusName}}</view>
				</view>
				<view class="line"></view>
				<view class="display-row">
					<image class="image" :src="item.thumbnailPath" mode=""></image>
					<view class="display-column">
						<view class="name">{{item.shopName}}</view>
						<view class="text-edit" style="font-weight: 300;margin: 10rpx 0rpx;">价格：{{item.payTotalAmount}}元</view>
						<view class="text-edit" style="font-weight: 300;">下单时间：{{item.orderDate}}</view>
					</view>
					
				</view>
				<view class="display-row" style="margin-left: auto;">
					<view class="display-row" style="margin-left: auto;">
						<!--会员只有未支付的订单才能取消，支付之后不是取消，而是申请退款-->
						<view v-if="item.orderStatus == 1" class="button" v-on:click.stop="cancelButtonClick(item)">取消订单</view>
						<!--付款成功后可查看二维码-->
						<view v-if="item.orderStatus >=2 && item.orderStatus != 200 && item.orderStatus != 201 && item.orderStatus != 202 && item.orderType != 5" class="button" v-on:click.stop="viewOrdercode(item)">查看券码</view>
						<!--已支付的订单，酒店未入驻，待收货都可以申请退款操作-->
						<view v-if="item.orderStatus==2 || item.orderStatus == 20" class="button" v-on:click.stop="applyRefund(item)">申请退款</view>
						<view v-if="setupButtonName(item.orderStatus,item.orderStatusName)" class="button" v-on:click.stop="dealOrder(item)">{{setupButtonName(item.orderStatus,item.orderStatusName)}}</view>
						
						<!-- <view v-if="item.orderStatus == 1 || item.orderStatus == 2 || item.orderStatus == 20 || item.orderStatus==80" class="button" v-on:click.stop="cancelButtonClick(item)">取消订单</view> -->
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import scrollNaviBar from "@/components/navi-bar/scroll-navi-bar.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			scrollNaviBar
		},
		data() {
			return {
				mescroll: '',
				orderStatus: "",
				orderList: [],
				buttonName: ""
			}
		},
		onLoad() {
			var self = this;
			uni.$on("updateOrderData",function(data){
				self.downCallBack(self.mescroll);
			})
		},
		methods: {
			naviItemClick: function(item) {
				// '全部','待付款','待使用','待评价','已完成','待退款''已退款','已关闭'
				var statusArray = ["", "1", "2,20,81", "203","204", "200", "201", "202", "", "", "", ""];
				this.orderStatus = statusArray[item.index];
				this.downCallBack(this.mescroll);
			},
			initMescroll: function(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack: function(mescroll) {
				mescroll.resetUpScroll();
			},
			upCallback: function(mescroll) {
				let url = '/memberapi/api/orders/myOrderList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					orderStatus: this.orderStatus
				};
				this.request.post(url, data, mescroll).then(res => {
					if (mescroll.num == 1) this.orderList = [];
					let list = res.list;
					this.util.formatShopList(list);
					this.orderList = this.orderList.concat(list);
				})
			},
			setupButtonName: function(orderStatus, orderStatusName) {
				var buttonName = orderStatusName;
				if (orderStatus == 1) { //待付款
					buttonName = "去付款";
				} else if (orderStatus == 200) { //'退款/售后'
					buttonName = "查看进度";
				} else if (orderStatus == 202){
					buttonName = "已关闭";
				} else if (orderStatus == 203) { //'待评价'
					buttonName = "去评价";
				}else if (orderStatus == 204){
					buttonName = "查看详情"
				}
				
				if(!buttonName){
					buttonName = "查看订单"
				}
				
				//1:待付款 2:已支付 10:店铺确认 11:待取消 12:已取消  20:待确认 21:待入住 22:待离店 23:已离店  40:已使用  42:已过期
				//80:待发货、81:待收货 200:待退款 201:已退款 202:已关闭  203:待评价  204:已评价   205:已完成)
				// var statusArray = ["1", "2", "203", "205", "200", "201", "202", "", "", "", ""];
				// var index = statusArray.indexOf(orderStatus);
				// if(index){
				// 	buttonName = statusArray[index];
				// }
				
				return buttonName;
			},
			cancelButtonClick: function(item) {
				// 1:待付款 2:已支付  20:待确认 80:待发货 下可以取消订单
				if(item.orderStatus == 1 || item.orderStatus == 2 || item.orderStatus == 20 || item.orderStatus==80){
					var self = this;
					uni.showModal({
						title: "温馨提示",
						content: "您确定要取消该订单吗？",
						confirmText: "确定取消",
						cancelText: "不取消",
						complete(res) {
							if (res.confirm) {
								self.cancelOrder(item);
							}
						}
					})
				}
			},
			// 取消订单
			cancelOrder: function(item) {
				this.request.post("/memberapi/api/orders/closeOrder.do", {
					orderId: item.orderId
				}).then(res => {
					this.request.toastTips("取消订单成功");
					this.downCallBack(this.mescroll);
				})
			},
			// 评论订单
			commentOrder:function(item){
				uni.setStorageSync("orderDataItem",item);
				uni.navigateTo({
					url:"/pages/user/userIndex/addComment"
				})
			},
			gotoOrderDetail:function(item){
				this.util.gotoOrderDetail(item.orderType,item.orderId);
			},
			// 根据不同状态处理订单
			dealOrder: function(item) {
			
				if (item.orderStatus == 1 && item.orderEndDate >= this.util.formatDate(new Date())) { //待付款、且订单支付时间小于等于当前时间->去付款
					uni.navigateTo({
						url: "/pages/payment/payment?orderId=" + item.orderId + "&payTotalAmount=" + item.payTotalAmount
					})
				} else if (item.orderStatus == 2) { //待使用
					this.util.gotoOrderDetail(item.orderType,item.orderId);
				} else if (item.orderStatus == 200) { //'退款/售后' ->查看进度
					uni.navigateTo({
						url:'/pages/order/refundProcess?orderId='+item.orderId
					})
					
					// if(item.orderType == 1){
					// 	uni.navigateTo({
					// 		url:'/pages/food/applyRefund?orderId='+item.orderId
					// 	})
					// }else if(item.orderType == 5){
					// 	uni.navigateTo({
					// 		url:'/pages/purchase/purchaseApplyRefund?orderId='+item.orderId
					// 	})
					// }else{
					// 	uni.navigateTo({
					// 		url:'/pages/order/refundProcess?orderId='+item.orderId
					// 	})
					// }
				} else if (item.orderStatus == 203) { //'待评价' ->去评价
					this.commentOrder(item);
				}
				else{
					this.util.gotoOrderDetail(item.orderType,item.orderId);
				}
			},
			//申请退款
			applyRefund:function(item){
				if(item.orderType == 1){//包厢订单、美食订单
					uni.navigateTo({
						url:'/pages/food/applyRefund?orderId='+item.orderId
					})
				}
				if(item.orderType == 2){//酒店
					uni.navigateTo({
						url:"/pages/hotel/hotelApplyRefund?orderId="+item.orderId
					})
				}
				if(item.orderType == 3){//套餐
					uni.navigateTo({
						url:'/pages/arder/applyRefund?orderId='+item.orderId
					})
				}
				if(item.orderType == 4){//景区申请退款
					uni.navigateTo({
						url:'/pages/scenic/scenicApplyRefund?orderId='+item.orderId
					})
				}if(item.orderType == 5){//购物
					 uni.navigateTo({
						url:'/pages/purchase/purchaseApplyRefund?orderId='+item.orderId
					 })
				}if(item.orderType == 6){//代金券
					uni.navigateTo({
						url:'/pages/food/cashApplyRefund?orderId='+item.orderId
					})
				}if(item.orderType == 7){//活动
					uni.navigateTo({
						url:'/pages/activity/applyRefund?orderId='+item.orderId
					})
				}
			},
			//查看券码
			viewOrdercode:function(item){
				let url = '/pages/order/orderDetails?orderId='+item.orderId;
				if(item.orderType ==3 || item.orderType ==6){
					url = '/pages/order/moreOrderDetails?orderId='+item.orderId;
				}else if(item.orderType ==1 ){
					url = '/pages/order/delicaciesOrderDetails?orderId='+item.orderId;
				}
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>


<style lang="scss">
	.top-scroll{
		background-color: #FFFFFF;
	}
	.order-cell{
		margin: 24rpx 20rpx 0rpx 20rpx;
		width: 710rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		// border-radius: 12rpx;
		.type{
			font-size: 32rpx;
		}
		.name{
			font-size: 32rpx;
			font-weight: bold;
		}
		.status{
			font-size: 28rpx;
			// color: gray;
			margin-left: auto;
			background: linear-gradient(to right, #2798F2, #506EFD);
			-webkit-background-clip: text;
			color: transparent;
		}
		.line{
			width: 100%;
			height: 2rpx;
			margin: 20rpx 0;
			background-color: #F5F5F5;
		}
		.image{
			width: 150rpx;
			height: 150rpx;
			background-color: #F5F5F5;
			margin-right: 20rpx;
			// border-radius: 12rpx;
		}
		.button{
			margin-top: 30rpx;
			margin-left: 30rpx;
			padding: 8rpx 22rpx;
			padding-bottom: 6rpx;
			border-radius: 100rpx;
			border: 1rpx solid #E5E5E5;
			color: #333333;
			font-size: 28rpx;
		}
	}
</style>
