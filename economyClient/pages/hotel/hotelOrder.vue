<template>
	<view class="content">
		<mescroll-body @down="downCallBack" :up="{'use':false}">
			<view class="top-back-view">{{orderData.orderStatusName}}</view>
			<view class="order-view">
				<view class="price">订单总额
					<text style="font-size: 24rpx;margin-left: 50rpx;color: #FF871C;font-weight: 300;">￥</text>
					<text style="font-size: 30rpx;color: #FF871C;">{{orderData.orderTotalAmount}}元</text>
				</view>
				<view class="user">
					<view class="title">预计到店时间</view>
					<view class="text-edit">酒店将尽量为您保留房间</view>
					<view class="text-detail" style="margin-left: 400rpx;margin-top: -80rpx;">{{orderData.hotelIncomeDate}} {{orderData.expectedArrivalTime}}</view>
					<view class="line" style="margin-top: 50rpx;"></view>
					<view class="detail">住客姓名：<text class="text-detail">{{orderData.hotelOccupant}}</text></view>
					<view class="detail">联系电话：<text class="text-detail">{{orderData.contactPhone}}</text></view>
					<view class="detail">房间信息：<text class="text-detail">{{roomData.productName}} {{roomData.buyNum}}间</text></view>
					<view class="detail">入住日期：<text class="text-detail">{{orderData.hotelIncomeDate}}至{{orderData.hotelOutDate}}</text></view>
				</view>
				<view class="hotel">
					<view class="title" @click="gotoHotelDetail">{{hotelData.shopName}} <text style="font-size: 28rpx;color:#BFBFBF;font-weight: 400;margin-left: auto;">酒店详情</text> <image class="right-arrow-img" style="margin-right: 0rpx;"></image></view>
					<view class="display-row" @click="openAddressMap">
						<view class="detail">{{hotelData.address}} </view>
						<image class="addres-icon" src="/static/img/playMap/all_tip_icon.png"></image>
					</view>
					
				</view>
				<view class="order">
					<text class="title">订单信息</text>
					<view class="line"></view>
					<view class="detail">订单编号：<text class="text-detail">{{orderData.orderId}}</text></view>
					<view class="detail">下单时间：<text class="text-detail">{{orderData.orderDate}}</text></view>
					<view class="detail">订单状态：<text class="text-detail">{{orderData.orderStatusName}}</text></view>
					<view v-if="orderData.paymentTypeName" class="detail">支付方式：<text class="text-detail">{{orderData.paymentTypeName}}</text></view>
					<view v-if="orderData.payDate" class="detail">支付时间：<text class="text-detail">{{orderData.payDate}}</text></view>
					
					<!-- {{orderData.orderStatusName}} -->
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				orderId : "",
				orderData:{},
				hotelData:{},
				roomData:{}
			}
		},
		onLoad(e) {
			this.orderId = e.orderId;
		},
		methods: {
			downCallBack:function(mescroll){
				this.request.post("/memberapi/api/orders/readByItem.do",{orderId:this.orderId},mescroll).then(res=>{
					this.orderData = res.data;
					this.roomData = res.data.itemList[0];
					this.readShopInfo(this.orderData.shopId);
				})
			},
			readShopInfo:function(shopid,mescroll){
				this.request.get("/memberapi/api/shops/readShopsAndExtends.do",{shopId:shopid},mescroll).then(res=>{
					this.hotelData = res.data;
				})
			},
			gotoHotelDetail:function(){
				this.util.gotoShopDetail(this.hotelData);
			},
			openAddressMap:function(){
				this.util.openShopLocation(this.hotelData);
			}
		}
	}
</script>

<style lang="scss">
	.top-back-view {
		padding-top: 50rpx;
		padding-left: 30rpx;
		width: 100vw;
		height: 220rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		background: rgba(253, 190, 72, 1);
	}

	.order-view {
		padding: 20rpx 30rpx;
		margin-top: -100rpx;

		.price {
			width: 100%;
			padding: 40rpx 0rpx 40rpx 40rpx;
			background-color: #FFFFFF;
			border-radius: 12rpx;
			font-size: 36rpx;
			font-weight: bold;
		}

		.user,
		.hotel,
		.order {
			padding: 30rpx;
			width: 100%;
			border-radius: 12rpx;
			margin-top: 20rpx;
			background-color: #FFFFFF;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				padding-bottom: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
			}
			.detail{
				font-size: 28rpx;
				margin-bottom: 20rpx;
				color: #989898;
			}
			.line {
				width: 100%;
				height: 2rpx;
				background-color: #F5F5F5;
				margin-bottom: 20rpx;
			}
			.addres-icon{
				margin-left: auto;
				width: 60rpx;
				height: 100rpx;
				padding: 20rpx 0rpx;
				padding-left: 20rpx;
			}
		}
	}
</style>
