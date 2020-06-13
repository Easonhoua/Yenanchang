<template>
	<view class="content">
		<!-- <navi-bar class="navi-bar" :isFavorite="isFavorite" :relationId="shopId" :shareData="shareData"></navi-bar> -->
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback">
			<view>
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
				</view>

				<view class="top-slider-con" v-if="shopsData.transportLine">
					<view class="activity">
						<view class="introduction">
							<view class="label">交通方式</view>
							<view class="introduction-bd" >{{shopsData.transportLine}}</view>
						</view>
					</view>
				</view>

				<view class="top-slider-con">
					<view class="activity">
						<view class="introduction">
							<view class="label">商家详情</view>
							<view class="introduction-bd" v-if="shopsData.details">
								<rich-text :nodes="shopsData.details"></rich-text>
							</view>
							<view class="introduction-bd" style="text-align: center;" v-else>暂无商家详情</view>
						</view>
					</view>
				</view>

				<view class="top-slider-con" v-if="programList.length>0">
					<view style="width:100%;background-color: #FFFFFF;font-weight: 900;color: #333333;padding: 30rpx;">节目</view>
					<view class="ht-card card" style="border-bottom: 1rpx solid #E6E7E9;" v-for="(item,index) in programList" :key="index">
						<view class="card-bd" @tap="toDetail(item.programId)">
							<view class="ct-list">
								<image class="img" :src="item.thumbnailPath?item.thumbnailPath:'/static/img/literature/dfe08ee7584e83a1be7bb2a5fc631ff.png'"></image>
								<view class="righttxt">
									<view class="name">{{item.programName?item.programName:'暂无节目名称'}}</view>
									<view class="locale font24" v-if="item.openingTimeType == 1"><text style="margin-left: -10rpx;">{{item.openingTimeStart?item.openingTimeStart:'待定'}}</text></view>
									<view class="locale font24" v-else><text style="margin-left: -10rpx;">{{item.openingTimeStart?item.openingTimeStart:'待定'}}</text><text>至</text><text>{{item.openingTimeEnd?item.openingTimeEnd:'待定'}}</text></view>
									<view class="coupon coupon2">
										<view class="list-buttom"><text class="yd">{{item.isFree == 1 ? '免费' : '¥'+item.price}}</text><!-- <label class="mark blue" style="margin-left: 290rpx;">售票中</label> -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="programList.length>3" @tap="toProgramList(shopsData.shopId)">
						<view class="program-more">查看全部演出赛事</view>
						<image class="program-more-arrow" src="../../static/img/common/arrow_right.png"></image>
					</view>
				</view>

				<goodCommentList-component v-if="shopsData.commentNum" ref='goodCommentList' goodCommentTitle="评论" :shopId="shopId"></goodCommentList-component>
				<!--附近列表-->
				<view class="top-slider-con">
					<view class="near-title">附近好店</view>
					<list-shop-cell :shopList="nearShopList"></list-shop-cell>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	// mescroll-body 组件需要引入mescroll-mixins.js才能上拉加载更多
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import goodCommentListComponent from "@/components/goodCommentList-component/goodCommentList-component.vue"
	import listShopCell from "@/components/list-cell-view/list-shop-cell.vue"
	// import naviBar from "@/components/navi-bar/navi-bar.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	import swiperBanner from "@/components/swiper-banner/swiper-banner.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			// naviBar,
			uniRate,
			listShopCell,
			goodCommentListComponent,
			swiperBanner
		},
		data() {
			return {
				shopId: 0,
				top: 128,
				mescroll: '',
				images: [],
				shopsData: {},
				isFavorite: false,
				shareData: {},
				nearShopList: [], //附近的店铺
				programList: [],
			}
		},
		onLoad(e) {
			if (e.shopId) {
				this.shopId = e.shopId;
				e.shopId = Number(e.shopId);
				this.shopsData.shopId = e.shopId;
				//console.log("this.shopsData.shopId = ", this.shopsData.shopId);
				this.shopsData.coordinate = e.coordinate;

				this.queryShopProgram(this.shopId);
			}
			try {
				const res = uni.getSystemInfoSync();
				var scale = res.windowWidth / 375.0;
				var stausH = parseInt(uni.getSystemInfoSync().statusBarHeight * scale);
				this.top = stausH + 88;
				//console.log("this.topthis.top = ", this.top);
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
			initMescroll: function(mescroll) {
				this.mescroll = mescroll;

			},
			downCallBack: function(mescroll) {
				// mescroll.resetUpScroll();
				this.queryDetail(mescroll, this.shopsData.shopId);
			},
			upCallback: function(mescroll) {
				this.queryNearHotel(mescroll);
			},
			queryDetail: function(mescroll, shopId) {
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId, //标签
				};
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
			queryShopProgram: function(shopId) {
				//获取项目信息列表
				let url = '/memberapi/api/program/list.do';
				let data = {
					pageSize: 3,
					shopId: shopId,
				};
				var that = this;
				this.request.get(url, data).then(res => {
					const currListData = res.list;
					currListData.forEach(item => {
						if (item.thumbnailPath) {
							let thumbnailPath = JSON.parse(item.thumbnailPath);
							if (thumbnailPath.filePath_220) {
								item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath_220;
							} else {
								item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath;
							}
						}
					});
					this.programList = this.programList.concat(currListData); //追加新数据
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
			toProgramList: function(shopId) {
				uni.navigateTo({
					url: 'literaturelistms?shopId=' + shopId
				})
			},
			toDetail: function(programId) {
				uni.navigateTo({
					url: 'literatureview?programId=' + programId
				})
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

	.near-title {
		font-size: 40rpx;
		font-weight: bold;
		width: 100vw;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		padding-bottom: 20rpx;
	}
</style>
