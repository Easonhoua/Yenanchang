<template>
	<view class="fooddetails">
		<scroll-view class="outter" scroll-x="true">
			<view class="oul">
				<view class="li" v-for="(item,index) in 4" :key="index" @click="toActivityDetail(item.activityId)">
					<image class="topimg" src=""></image>
					<text class="bottomtxt">颜值甘露</text>
				</view>
			</view>
		</scroll-view>
		
		<view class="pro-detail">
			<view class="name">{{food.foodName}}</view>
			<view class="number">半年销售量  0</view>
			<view class="price-bar">
				<text class="price" style="margin-right: 10rpx;">￥{{food.discountPrice}}</text>
				<text class="noprice" style="text-decoration: line-through;">￥{{food.originalCost}}</text>
			</view>
		</view>
		<!-- 滑动图片 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500"  @click="readImage(0)">
			<swiper-item v-for="(item,index) in food.imagePath" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		
		<view class="introduction">
			<view class="title">商品简介</view>
			<rich-text class="text" :nodes="food.foodDetail"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				foodId:'',
				food:{},
				dotStyle: true
			}
		},
		onLoad(e) {
			if(e.foodId){
				this.foodId = e.foodId;
				this.initData();
			}
			
		},
		methods: {
			initData:function(){
				//获取商家订座配置
				const url = '/memberapi/api/delicacyFood/read.do';
				var sendData = {
					foodId:this.foodId
				}
				this.request.get(url, sendData).then(res => {
					this.food = res.data;
					if(this.food.imagePath){
						var imagePath = this.food.imagePath;
						this.food.imagePath = this.util.formatImagePaths(imagePath);
						this.food.originalImagePath = this.util.formatImagePaths(imagePath,true);
					}
				});
			},
			readImage: function(index) {
				uni.previewImage({
					urls: this.food.originalImagePath,
					current: index,
					indicator:'number',
					loop:true
				})
			},
		}
	}
</script>

<style>
	.outter{
		padding: 28rpx 20rpx;
	}
		
	.oul{
		height: 240rpx;
		display: flex; 
		flex-direction: row;
	}
	.li{
		display: inline-block;
		background:rgba(255,255,255,1);
		margin-right: 24rpx;
	}
	.topimg{
		width: 228rpx;
		height: 172rpx;
		background:rgba(216,216,216,1);
		border-radius:4rpx;
	}
	.bottomtxt{
		font-size: 28rpx;
		font-weight: 900;
		color: #000000;
		padding-left: 10rpx;
		line-height: 20rpx;
	}
	
</style>
