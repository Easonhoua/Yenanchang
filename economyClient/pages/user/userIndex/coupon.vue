<template>
	<view class="content">
		<mescroll-body @down="downCallBack" @up="upCallback" @init="initMescroll">
			<view class="coupon-cell" v-for="(item,index) in couponList" :key="index">
				<view class="line"></view>
				<view class="display-column" style="padding: 30rpx;">
					<view class="name">{{item.couponName}}</view>
					<view class="price">满{{item.orderAmount}}减{{item.price}}</view>
					<view class="time">有效期至{{item.endIntegralExchange}}</view>
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
				mescroll:'',
				couponList:[]
			}
		},
		methods: {
			
			initMescroll:function(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack: function(mescroll) {
				mescroll.resetUpScroll();
			},
			upCallback: function(mescroll) {
				let url = '/memberapi/api/coupon/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size
				};
				this.request.post(url, data, mescroll).then(res => {
					if(mescroll.num == 1) this.couponList = [];
					this.couponList = this.couponList.concat(res.list);
				})
			},
		}
	}
</script>

<style lang="scss">
	.coupon-cell{
		margin: 20rpx;
		margin-bottom: 0rpx;
		width: 710rpx;
		display: flex;
		flex-direction: row;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		.line{
			border-radius: 0rpx;
			margin-top: -20rpx;
			width: 20rpx;
			height: 260rpx;
			background-color: #118DF0;
		}
		.name{
			font-size: 32rpx;
		}
		.price{
			padding: 20rpx 0rpx;
			font-size: 40rpx;
			font-weight: bold;
		}
		.time{
			font-size: 28rpx;
			color: #4A4A4A;
		}
	}
</style>
