<template>
	<view class="room-view">
		<image class="close" src="/static/img/common/close_touming1.png" @click="back"></image>
		<swiper class="banner" :indicator-dots="true" indicator-active-color="#FF871C" indicator-color="#FFFFFF">
			<swiper-item v-for="(item,index) in roomDetialData.imagePath" :key="index" @click="readImage(index)">
				<image class="image" :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="details">
			<!-- <view class="title"></view> -->
			<rich-text :nodes="roomDetialData.details"></rich-text>
			<view class="title">{{roomDetialData.roomName}}</view>
			<scroll-view class="labels" scroll-x="true">
				<view class="label">房型:{{roomDetialData.roomTypeName+'  '+roomDetialData.roomSize}}㎡</view>
				<view class="label">面积:{{roomDetialData.roomSize}}㎡</view>
				<view class="label">楼层:{{roomDetialData.floorNum}}层</view>
				<view class="label">窗户:{{roomDetialData.windowName}}</view>
				<view class="label">床型:{{roomDetialData.bedTypeName+'  '+roomDetialData.bedSize}}m</view>
				<view class="label">早餐:{{roomDetialData.breakfastNumName}}</view>
				<view class="label">网络:{{roomDetialData.internetName}}</view>
			</scroll-view>
		</view>
		<view class="reserve">
			<view class="price">￥{{roomDetialData.platformPrice}}</view>
			<view class="button" @click="reserveButtonClick">预定</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				roomDetialData:{}
			}
		},
		onLoad(option) {
			this.roomDetialData = uni.getStorageSync("hotelRoomData");
			this.roomDetialData.details = this.util.formatRichText(this.roomDetialData.details);
			uni.setNavigationBarTitle({
				title:this.roomDetialData.roomName?this.roomDetialData.roomName:'房间详情'
			})
		
		},
		methods: {
			back:function(){
				uni.navigateBack({});
			},
			// 预定房间
			reserveButtonClick: function() {
				if (this.request.alreadyLogin()) {
					// uni.setStorageSync("reserveDate",this.reserveDate);
					// uni.setStorageSync("hotelData", this.hotelData);
					// uni.setStorageSync("hotelRoomData", roomData);
					uni.navigateTo({
						url: "/pages/hotel/signUp"
					})
				}
			
			},
		}
	}
</script>

<style lang="scss">
	.room-view{
		width: 100vw;
		background-color: #FFFFFF;
		.close{
			position: absolute;
			top:var(--status-bar-height);
			right: 0rpx;
			z-index: 1;
			width: 120rpx;
			height: 120rpx;
			padding: 30rpx;
		}
		.banner{
			width: 100vw;
			height: 450rpx;
			.image{
				width: 100%;
				height: 100%;
			}
		}
		.details{
			width: 100vw;
			padding: 30rpx;
			background-color: #FFFFFF;
			// margin-top: 240rpx;
			.title{
				width: 100%;
				font-size: 36rpx;
				font-weight: bold;
				color: #000000;
				margin-top: 30rpx;
				margin-bottom: 10rpx;
				
			}
			.labels{
				display: flex;
				white-space: normal;
				flex-direction: row;
				width: 100%;
				.label{
					display: inline-block;
					width: 50%;
					height: 60rpx;
					line-height: 60rpx;
					color: #000000;
				}
			}
		}
		.reserve{
			width: 100vw;
			height: 120rpx;
			position: absolute;
			bottom: 0rpx;
			border-top: 2rpx solid #F5F5F5;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10rpx 30rpx;
			background-color: #FFFFFF;
			.price{
				color: #FF871C;
				width: 340rpx;
				font-size: 36rpx;
				height: 80rpx;
				line-height: 80rpx;
			}
			.button{
				width: 300rpx;
				height: 80rpx;
				line-height: 80rpx;
				margin-left: auto;
				color: #FFFFFF;
				border-radius: 10rpx;
				font-size: 36rpx;
				font-weight: bold;
				text-align: center;
				background:linear-gradient(90deg,#FFBC3C 0%,#FF871C 100%);
			}
		}
		
	}
	
</style>
