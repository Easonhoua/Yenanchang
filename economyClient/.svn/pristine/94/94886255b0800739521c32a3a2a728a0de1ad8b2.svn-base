<template>
	<view class="layout movie">
		<!-- <navi-bar class="navi-bar" :isFavorite="isFavorite" :shareData = "shareData" :relationId="shopId+''"></navi-bar> -->
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback">
		<view class="top-slider">
			<!-- 滑动图片 -->
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in shopsData.imagePath" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="top-slider-place" style="padding: 30rpx;">
				<text class="name">{{shopsData.shopName}}</text>
				<view class="time" v-if="shopsData.shopHours1"><label class="label">营业时间：{{shopsData.shopHours1}} {{shopsData.shopHours2}} {{shopsData.shopHours3}}</label></view>
				<text class="address">{{shopsData.address}}  距你{{shopsData.distance}}km</text>
				<image @click="toAddress(shopsData)" class="location navigation"  src="/static/img/sports/location.png"></image>
			</view>
		</view>
		
		<view class="card-bd column" style="padding: 0rpx;">
			<text class="title">详细介绍</text>
			<view class="label" style="margin-left: 30rpx;padding-bottom: 0rpx;">
				<rich-text :nodes="shopsData.details?shopsData.details:'暂无详细介绍'" ></rich-text>
			</view>
		</view>
		
		<!-- 限时优惠 -->
		<!-- <view class="literature-discount">
			<view class="literature-discount-content">
				<view class="font-16 font-line-height font-weight-600 ">限时优惠</view>
				<view class="font-10 font-line-height">新品特惠</view>
				<view class="font-14 font-line-height">
					<view class="literature-discount-left">
						<text class="color-orange">￥80</text>
						<text class="font-10" style="margin-left: 18rpx;">¥120</text>
					</view>
					<view class="literature-discount-right">
						<image class="literature-discount-right-button" src="../../static/img/literature/90d99924cb165ff119b02abcef8753e.png"></image>
					</view>
				</view>
			</view>
		</view> -->
		
		
		<!--评论-->
		<goodCommentList-component ref='goodCommentList' goodCommentTitle="评论" :shopId="shopId"></goodCommentList-component>
		
		<!--附近的酒店列表-->
		<view class="near-title">附近商家</view>
		<list-shop-cell :shopList="nearShopList"></list-shop-cell>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import naviBar from "@/components/navi-bar/navi-bar.vue"
	import listShopCell from "@/components/list-cell-view/list-shop-cell.vue"
	import goodCommentListComponent from "@/components/goodCommentList-component/goodCommentList-component.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			naviBar,
			listShopCell,
			goodCommentListComponent
		},
		data() {
			return {
				shopId:0,
				shopsData: {},
				cardCur: 2,
				dotStyle: false,
				isFavorite: false,
				longtitude: '',
				latitude: '',
				shareData:{},
				nearShopList: []//附近的商家
			}
		},
		onLoad(e) {
			if (e.shopId) {
				this.shopId = e.shopId;
			}
			var that = this;
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					that.longtitude = res.longitude;
					that.latitude = res.latitude;
				}
			});
		},
		
		// 右上角收藏和分享按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 1) {
				this.util.favoriteWithData(this.isFavorite, "1", this.shopId).then(res => {
					this.isFavorite = res;
				})
			} else if (e.index == 0) {
				this.util.shareWithData(this.shareData);
			}
		},
		onPageScroll(e) {
			// 为了解决滚动到最顶端时，是否收藏按钮颜色失效的问题
			if (e.scrollTop < 10) {
				this.util.setFavorite(this.isFavorite);
			}
		},
		methods: {
			initMescroll:function(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack:function(mescroll){
				this.readDetail(mescroll);
			},
			upCallback:function(mescroll){
				this.queryNearHotel(mescroll);
			},
			readDetail: function(mescroll) {
				//获取商家信息
				const url = '/memberapi/api/shops/readShopsAndExtends.do';
				let coordinate = '';
				if (this.longtitude && this.latitude) {
					coordinate = this.longtitude + "," + this.latitude;
				}
				let sendDate = {
					coordinate: coordinate,
					shopId: this.shopId
				};
				var that = this;
				this.request.get(url, sendDate).then(res => {
					this.shopsData = res.data;
					this.shopsData.imagePath = this.util.formatImagePaths(res.data.imagePath);
					this.shopsData.thumbnailPath = this.util.formatImagePath(res.data.thumbnailPath);
					if(this.shopsData.details){
						this.shopsData.details =this.shopsData.details.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"').replace(/\width: (\d*)px/g,'').replace(/\height: (\d*)px/g,'');
					}
					let distance = this.util.distance(this.latitude, this.longtitude, this.shopsData.coordinateLng, this.shopsData.coordinateLat);
					this.$set(this.shopsData, 'distance', parseFloat(parseInt(distance.toString().split(".")[0]) / 1000).toFixed(2));
					that.shopsData.shopHours1 =that.shopsData.shopHours1?that.shopsData.shopHours1:"";
					that.shopsData.shopHours2 =that.shopsData.shopHours2?that.shopsData.shopHours2:"";
					that.shopsData.shopHours3 =that.shopsData.shopHours3?that.shopsData.shopHours3:"";
					// 是否已收藏
					this.isFavorite = res.data.canFavorite == 2;
					this.util.setFavorite(this.isFavorite);
					// 分享的内容
					this.shareData.shopId = this.shopId;
					this.shareData.title = this.shopsData.shopName;
					this.shareData.summary = this.shopsData.address;
					this.shareData.imageUrl = this.shopsData.thumbnailPath;
					mescroll.resetUpScroll();
				});
			},
			queryNearHotel: function(mescroll) {
				let url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					platformTypeId: this.shopsData.platformTypeId,
					coordinate: this.shopsData.coordinate,
					distance: "5000",
					sortFlag: "distance-asc"
				};
			
				this.request.get(url, data, mescroll).then(res => {
					if (mescroll.num == 1) this.nearShopList = [];
					this.nearShopList = this.nearShopList.concat(res.list);
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
		}
	}
</script>

<style>
	@import url("../../common/css/list_two.css");
	
	.navi-bar{
		background-color: #F5F5F5;
	}
	/* 限时优惠 */
	.literature-discount {
		width: 720rpx;
		height: 165rpx;
		margin-left: 15rpx;
		background-color: #FFFFFF;
		display: flex;
	}
	.screen-swiper{
		height: 500rpx;
	}
	.literature-discount-content {
		margin: 20rpx 30rpx 20rpx 30rpx;
	}
	.color-orange {
		color: #FF871C;
	}
	.literature-discount-right {
		margin-left: 293px;
		margin-top: -20px;
	}
	.literature-discount-right-button {
		width: 93rpx;
		height: 49rpx;
	}
	.near-title{
		font-size: 32rpx;
		font-weight: bold;
		width: 100vw;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		margin-top: -20rpx;
		padding-bottom: 20rpx;
	}
</style>
