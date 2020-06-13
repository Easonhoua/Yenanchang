<template>
	<view class="content orderdetails">
		<!-- 滑动图片 -->
		<view class="codebox">
			<view class="inner">
				<view class="name">{{orderData.shopName}}{{orderData.productName}}</view>
				<view class="code">
					<image :src="img"></image>
				</view>
				
				<view v-if="orderData.itemList">
					<view class="title" v-for="(item,index) in orderData.itemList" :key="index" @tap="showMoreTicket">
						<block v-if="index==0">券码：{{item.orderItemNo}}
							<image v-if="!isShow" class="all-info-arrow" src="/static/img/scenic/downArrow.png"></image>
						</block>
						<block v-else-if="index==orderData.itemList.length">
							<p style=' text-indent: 3em; white-space: pre-wrap;' >
							{{item.orderItemNo}}
							<image v-if="isShow" class="all-info-arrow" src="/static/img/scenic/upArrow.png"></image>
							</p>
						</block>
						<block v-else><p style=' text-indent: 3em; white-space: pre-wrap;' >{{item.orderItemNo}}</p></block>
					</view>
				</view>
				
				<!-- <view class="title" @tap="showMoreTicket">{{orderData.orderId}}
					<image v-if="!isShow" class="all-info-arrow" src="/static/img/scenic/downArrow.png"></image>
				</view>
				<view class="title" v-if="isShow">
				<p style=' text-indent: 3em; white-space: pre-wrap;' >
				{{orderData.orderId}}
				<image v-if="isShow" class="all-info-arrow" src="/static/img/scenic/upArrow.png"></image>
				</p>
				</view> -->
				
				<view class="dashed"></view>
				<view class="codebox-txt">
					<view class="codebox-cell">
						<text class="label">订单号</text>
						<view class="codebox-cell-bd">{{orderData.orderId}}</view>
					</view>
					<view class="codebox-cell">
						<text class="label">价格</text>
						<view class="codebox-cell-bd">￥{{orderData.payTotalAmount}}</view>
					</view>
					<view class="codebox-cell">
						<text class="label">团购</text>
						<view class="codebox-cell-bd">{{orderData.productName}}</view>
					</view>
					<view class="btn" @tap="saveBtn">保存到相册</view>
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
				isShow:false,
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
			showMoreTicket:function(){
				this.isShow = !this.isShow;
			},
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
	.all-info-arrow{
		width: 30rpx;
		height: 30rpx;
		margin-left: 16rpx;
		color: #0000FF;
	}
</style>
