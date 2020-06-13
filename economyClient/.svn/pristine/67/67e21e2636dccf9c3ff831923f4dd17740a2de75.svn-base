<template>
	<view class="refundProcess match">
		<view class="re-top">
			<view class="status" style="height:196rpx;margin-bottom:48rpx;">
				<image class="icon" src="/static/img/common/handle_refund.png"></image>
				<text>报名成功</text>
			</view>
			<view class="amountbox">
				<view class="re-cell inner">
					<text class="label">总金额</text>
					<text class="price">￥{{orderData.orderTotalAmount}}</text>
				</view>
			</view>
			<view class="timebox">
				<view class="inner" style="padding-bottom:20rpx">
					<view class="re-cell time">
						<view class="list">
							<text>活动时间</text><text>{{activityData.startDate}}</text>
						</view>
						<view class="tip">请您按时到达，行程有变请及时取消</view>
					</view>
					<view class="infor-cell">
						<text class="label">预约编码：</text>
						<view class="infor-cell-bd">{{reserveData.reserveNum}}</view>
					</view>
					<view class="infor-cell">
						<text class="label">参与人：</text>
						<view class="infor-cell-bd">{{reserveData.userName}}</view>
					</view>
					<view class="infor-cell">
						<text class="label">联系电话：</text>
						<view class="infor-cell-bd">{{reserveData.mobilePhone}}</view>
					</view>
					<view class="infor-cell">
						<text class="label">性别：</text>
						<view class="infor-cell-bd">{{reserveData.sexFlagName}}</view>
					</view>
					<view class="infor-cell">
						<text class="label">身份证号：</text>
						<view class="infor-cell-bd">{{reserveData.identityCard}}</view>
					</view>
				</view>
			</view>
			<view class="timebox" v-if="shopData">
					<view class="address-list">
						<view class="list name">
							<image class="icon" src="/static/img/common/phone.png" @tap="toPhone(shopData)"></image>
							<text>{{shopData.shopName}}  {{shopData.shopsPhone}}</text>
						</view>
						<view class="list address2">
							<image class="icon" src="/static/img/common/location.png" @tap="toAddress(shopData)"></image>
							<text class="address">{{shopData.address}}</text>
						</view>
					</view>
			</view>
			<view class="timebox">
				<view class="inner" style="padding-bottom:20rpx">
					<view class="re-cell time">
						<view class="list">
							<text>订单信息</text>
						</view>
					</view>
					<view class="infor-cell">
						<text class="label">订单编号：</text>
						<view class="infor-cell-bd">{{orderData.orderId}}</view>
					</view>
					<view class="infor-cell">
						<text class="label">下单时间：</text>
						<view class="infor-cell-bd">{{orderData.orderDate}}</view>
					</view>
					<view class="infor-cell">
						<text class="label">支付方式：</text>
						<view class="infor-cell-bd">{{orderData.paymentTypeName}}</view>
					</view>
					<view class="infor-cell">
						<text class="label">支付时间：</text>
						<view class="infor-cell-bd">{{orderData.payDate}}</view>
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
				shopData:{}, //店铺
				activityData:{}, //活动
				reserveData:{}, //预约
				orderData:{}, //订单
			}
		},
		onLoad(e) {
			if(e.activityId){
				this.activityData.activityId = e.activityId;
				this.queryActivityData(e.activityId);
			}
			if(e.reserveId){
				this.reserveData.reserveId = e.reserveId;
				this.queryReserveData(e.reserveId);
			}
			if(e.orderId){
				this.orderData.orderId = e.orderId;
				this.queryOrderData(e.orderId);
			}
		},
		methods: {
			queryActivityData:function(activityId){
				let url = '/memberapi/api/activity/read.do';
				let data = {
					activityId: activityId, 
				};
				var that = this;
				this.request.get(url, data).then(res => {
					that.activityData = res.data;
					if(that.activityData && that.activityData.shopId){
						that.queryShopData(that.activityData.shopId);
					}
				})
			},
			queryShopData:function(shopId){
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId, 
				};
				var that = this;
				this.request.get(url, data).then(res => {
					that.shopData = res.data;
				})
			}, 
			queryReserveData:function(reserveId){
				let url = '/memberapi/api/activityReserve/read.do';
				let data = {
					reserveId: reserveId,  
				};
				var that = this;
				this.request.post(url, data).then(res => {
					that.reserveData = res.data;
					if(that.reserveData && that.reserveData.mobilePhone){
						that.reserveData.mobilePhone = that.reserveData.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");
						that.reserveData.identityCard = that.reserveData.identityCard.replace(/(\d{4})\d{10}(\d{4})/,"$1****$2");
					}
				})
			},
			queryOrderData:function(orderId){
				let url = '/memberapi/api/orders/read.do';
				let data = {
					orderId: orderId,  
				};
				var that = this;
				this.request.post(url, data).then(res => {
					that.orderData = res.data;
				})
			},
			//地址
			toAddress: function(item) {
				uni.openLocation({
					longitude: Number(item.coordinateLng),
					latitude: Number(item.coordinateLat),
					name: item.shopName,
					address: item.address
				})
			},
			toPhone : function(item) {
				uni.makePhoneCall({
					phoneNumber: item.contactsPhone,
					success: () => {
						//console.log("成功拨打电话");
					}
				})
			},
		},
	}
</script>

<style>
	.re-top{
		background: none;
	}
</style>
