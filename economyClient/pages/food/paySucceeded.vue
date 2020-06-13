<template>
	<view class="paysucceeded ">
		<view class="iconbox">
			<view class="inner">
				<image class="icon" src="../../static/img/common/cg.png"></image>
				<view class="txt">预订成功</view>
			</view>
			<view class="link">
				<view class="btn" @click="toOrderDetail">查看订单</view>
				<view class="btn back" @click="goHome">返回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:''
			}
		},
		onLoad(e) {
			if(e.orderId){
				this.orderId = e.orderId;
			}
		},
		methods:{
			toOrderDetail(){
				uni.navigateTo({
					url:"/pages/food/foodOrderDetail?orderId="+this.orderId
				})
			},
			toHome(){
				uni.navigateTo({
					url:"/pages/index/index5"
				})
			}
		}
		
	}
</script>

<style>
</style>
