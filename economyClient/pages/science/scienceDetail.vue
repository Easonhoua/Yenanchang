<template>
	<view class="content">
		<!-- <navi-bar class="navi-bar" :isFavorite="isFavorite" :relationId="shopId" :shareData="shareData"></navi-bar> -->
		<!-- :top="util.getVarNaviBarHeight()" -->
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback">
			<view>
				<!-- <swiper class="list-swiper" next-margin="125rpx" previous-margin="125rpx" :current="0">
					<swiper-item v-for="(item,index) in images" :key="index" @click="readImage(index)">
						<view class="swiper-item1">
							<image-cache class="swiper-item-image" :src="item" imageStyle="border-radius: 16rpx;"></image-cache>
						</view>
					</swiper-item>
				</swiper> -->
				<view class="swiper-banner-imgbox">
					<swiper-banner :swiperList="shopsData.banners"></swiper-banner>
				</view>
				
				<view class="info-view">
					<view class="display-row">
						<view class="shop-name">{{shopsData.shopName}}</view>
						<image class="shop-location-image" src="/static/img/common/phone.png" @click="toPhone(shopsData.shopsPhone)"></image>
					</view>
				
					<view class="display-row" style="margin-top: 20rpx;">
						<uni-rate ref="shopRate" :value="shopsData.score" disabled="true" size="20"></uni-rate>
						<view class="text-edit" style="margin: 0rpx 30rpx;">{{shopsData.score}}分</view>
						<view class="text-detail">{{shopsData.commentNum}}条评论</view>
					</view>
				
					<view class="address">
						<view class="shop-address">{{shopsData.address}}</view>
						<image class="shop-location-image" src="/static/img/sports/location.png" @click="gotoMapLocation"></image>
					</view>
					<view v-if="shopsData.shopHours1" class="time">营业时间 ：{{shopsData.shopHours1}} {{shopsData.shopHours2}} {{shopsData.shopHours3}}</view>
					<!-- <view v-else class="time">营业时间未填写，可拨打电话确认</view> -->
				</view>
				
				<view class="top-slider-con">
					<view class="activity">
						<view class="introduction">
							<view class="label">交通方式</view>
							<view class="introduction-bd" v-if="shopsData.transportLine">{{shopsData.transportLine}}</view>
							<view class="introduction-bd" style="text-align: center;" v-else>暂无交通方式</view>
						</view>
					</view>
				</view>
				
				<view class="top-slider-con">
					<view class="activity">
						<view class="introduction">
							<view class="label">商家详情</view>
							<view class="introduction-bd"  v-if="shopsData.details">
								<rich-text :nodes="shopsData.details"></rich-text>
							</view>
							<view class="introduction-bd" style="text-align: center;" v-else>暂无商家详情</view>
						</view>
					</view>
				</view>
				
				<goodCommentList-component v-if="shopsData.commentNum" ref='goodCommentList'
				 goodCommentTitle="评论" :shopId="shopId"></goodCommentList-component>
				<!--附近的酒店列表-->
				<view class="near-title">附近好店</view>
				<list-shop-cell :shopList="nearShopList"></list-shop-cell>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	// mescroll-body 组件需要引入mescroll-mixins.js才能上拉加载更多
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import goodCommentListComponent from "@/components/goodCommentList-component/goodCommentList-component.vue"
	import listShopCell from "@/components/list-cell-view/list-shop-cell.vue"
	import naviBar from "@/components/navi-bar/navi-bar.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	import swiperBanner from "@/components/swiper-banner/swiper-banner.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			naviBar,
			uniRate,
			listShopCell,
			goodCommentListComponent,
			swiperBanner
		},
		data() {
			return {
				shopId:0,
				top:128,
				mescroll:'',
				images: [],
				shopsData: {},
				isFavorite: false,
				shareData: {},
				nearShopList: [], //附近的店铺
			}
		},
		onLoad(e) {
			if (e.shopId) {
				this.shopId = e.shopId;
				e.shopId = Number(e.shopId);
				this.shopsData.shopId = e.shopId;
				//console.log("this.shopsData.shopId = ", this.shopsData.shopId);
				this.shopsData.coordinate = e.coordinate;
			}
			try {
			    const res = uni.getSystemInfoSync();
				var scale = res.windowWidth / 375.0;
				var stausH = parseInt(uni.getSystemInfoSync().statusBarHeight * scale);
				this.top = stausH+88;
				//console.log("this.topthis.top = ",this.top);
			} catch (e) {
			    // error
			}	
		},
		// 右上角收藏和分享按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 1) {
				this.util.favoriteWithData(this.isFavorite, "1", this.shopId).then(res => {
					this.isFavorite = res;
				})
			} else if (e.index == 0) {
				this.util.shareWithData(this.shopsData.shareData);
			}
		},
		onPageScroll(e) {
			// 为了解决滚动到最顶端时，是否收藏按钮颜色失效的问题
			if(e.scrollTop<10){
				this.util.setFavorite(this.isFavorite);
			}
		},
		methods: {
			initMescroll:function(mescroll) {
				this.mescroll = mescroll;
				
			},
			downCallBack:function(mescroll){
				// mescroll.resetUpScroll();
				this.queryDetail(mescroll,this.shopsData.shopId);
			},
			upCallback:function(mescroll){
				this.queryNearHotel(mescroll);
			},
			queryDetail: function(mescroll,shopId) {
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId, //标签
				};
				var that =this;
				this.request.get(url, data,mescroll).then(res => {
					
					this.shopsData = this.util.formatShopData(res.data);
					// 动态设置导航栏标题的话一定要放在this.util.setFavorite这个方法之前，否则进入页面详情是否收藏会不显示
					uni.setNavigationBarTitle({
						title:this.shopsData.shopName
					})
					this.isFavorite = this.shopsData.canFavorite == 2;
					this.util.setFavorite(this.isFavorite);
					mescroll.resetUpScroll();
				})
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
			// readImage: function(index) {

			// 	uni.previewImage({
			// 		urls: this.images,
			// 		current: index
			// 	})
			// },
			gotoMapLocation: function(shopsData) {
				this.util.openLocation(this.shopsData.coordinateLng, this.shopsData.coordinateLat, this.shopsData.shopName, this.shopsData
					.address);
			},
			toPhone: function(shopsPhone) {
				uni.makePhoneCall({
					phoneNumber: shopsPhone,
					success: () => {
						//console.log("成功拨打电话");
					}
				})
			},
			goToVr: function() {
				uni.navigateTo({
					url: '../webView/webView?webUrl=https://vr.chinavryan.com//tour/40954afc6f3a33a6' + '&webTitle='
				});
			}
		}
	}
</script>

<style>
	
	.navi-bar {
		background-color: #FFFFFF;
	}
	.info-view {
		padding: 30rpx;
		width: 750rpx;		
		background-color: #FFFFFF;
	}

	.shop-name {
		font-size: 48rpx;
		font-weight: bold;
	}

	.address {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-top: 2rpx solid #F9F9F9;
		border-bottom: 2rpx solid #F9F9F9;
		padding: 30rpx 0;
		margin: 20rpx 0;
	}

	.shop-address {
		font-size: 32rpx;
		padding-right: 20rpx;
	}

	.shop-location-image {
		margin-left: auto;
		min-width: 50rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.time {
		color: #4A4A4A;
		font-size: 32rpx;
	}
	
	.near-title{
		font-size: 40rpx;
		font-weight: bold;
		width: 100vw;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		padding-bottom: 20rpx;
	}
</style>
