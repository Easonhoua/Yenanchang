<template>
	<view class="content orderdetails">
		<!-- 滑动图片 -->
		<view class="codebox">
			<view class="inner">
				<view class="name">{{orderData.shopName}}{{orderData.productName}}</view>
				<view class="code">
					<image :src="img"></image>
				</view>
				<view class="title">订单号：{{orderData.orderId}}</view>
				<view class="dashed"></view>
				<view class="codebox-txt">
					<view class="codebox-cell">
						<text class="label">时间</text>
						<view class="codebox-cell-bd">{{orderData.publishTime}}</view>
					</view>
					<view class="codebox-cell">
						<text class="label">价格</text>
						<view class="codebox-cell-bd">￥{{orderData.payTotalAmount}}</view>
					</view>
					<view class="codebox-cell">
						<text class="label">活动</text>
						<view class="codebox-cell-bd">{{orderData.productName}}</view>
					</view>
					<!-- <view class="btn" @tap="saveBtn">保存到相册</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wxqrcode from "@/common/js/wxqrcode.js" // 二维码生成器 
	var utils = require('@/common/js/util.js');
	export default {
		data() {
			return {
				img: '',
				orderData: {},
			}
		},
		onLoad(e) {
			if (e.orderId) {
				this.orderData.orderId = e.orderId;
				this.img = wxqrcode.createQrCodeImg(e.orderId, {
					size: parseInt(300) //二维码大小  
				});
				this.queryDetail(e.orderId);
			}
		},
		methods: {
			queryDetail: function(orderId) {
				let data = {
					orderId: orderId,
				};
				let url = "/memberapi/api/orders/readByItem.do";
				var that = this;
				this.request.post(url, data).then(res => {
					if (res.returncode === 0) {
						that.orderData = res.data;
						if (that.orderData.publishTime) {
							that.orderData.publishTime = utils.formatDateTime(item.publishTime.replace(/-/ig, "/"));
						}
						if(res.data.itemList != null && res.data.itemList.length > 0){
							that.orderData.productName = res.data.itemList[0].productName;
						}
					}
				});
			},
			//保存到相册
			saveBtn:function(){
				
			}
		}
	}
</script>

<style>
</style>
