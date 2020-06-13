<template>
	<view class="content" >
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback" >
			<view class="swiper-banner-imgbox">
				<swiper-banner :swiperList="hotelData.banners"></swiper-banner>
			</view>
			<view class="info-view">
				<view class="display-row">
					<view class="shop-name">{{hotelData.shopName}}</view>
					<image v-if="hotelData.vrLink" class="shop-location-image" style="width: 60rpx;height: 60rpx;" src="/static/img/common/vr.png" @click="goToVr(hotelData.vrLink)"></image>
				</view>

				<view class="display-row" style="margin-top: 20rpx;">
					<uni-rate ref="shopRate" :value="hotelData.score" disabled="true" size="20"></uni-rate>
					<view class="text-edit" style="margin: 0rpx 30rpx;">{{hotelData.score}}分</view>
					<view class="text-detail">{{hotelData.commentNum}}条评论</view>
					<image class="shop-location-image" src="/static/img/common/phone.png" @click="callPhone"></image>
				</view>

				<view class="address">
					<view class="shop-address">{{hotelData.address}}</view>
					<image class="shop-location-image" src="/static/img/sports/location.png" @click="gotoMapLocation"></image>
				</view>
				<view v-if="hotelData.shopHours1" class="time">营业时间 ：{{hotelData.shopHours1}} {{hotelData.shopHours2}} {{hotelData.shopHours3}}</view>
			</view>
			
			<view class="top-slider-con" v-if="hotelData.transportLine">
				<view class="activity">
					<view class="introduction">
						<view class="label">交通方式</view>
						<view class="introduction-bd">{{hotelData.transportLine}}</view>
					</view>
				</view>
			</view>
			
			<view class="top-slider-con" v-if="hotelData.hotelFeatures">
				<view class="activity">
					<view class="introduction">
						<view class="label">酒店特色</view>
						<rich-text class="introduction-bd" :nodes="hotelData.hotelFeatures"></rich-text>
					</view>
				</view>
			</view>
			
			<view class="top-slider-con" v-if="hotelData.hotelLeisureFacilityName">
				<view class="activity">
					<view class="introduction">
						<view class="label">休闲设施</view>
						<rich-text class="introduction-bd" :nodes="hotelData.hotelLeisureFacilityName"></rich-text>
					</view>
				</view>
			</view>
			<view class="top-slider-con" v-if="hotelData.details">
				<view class="activity">
					<view class="introduction">
						<view class="label">商家详情</view>
						<view class="introduction-bd">
							<rich-text class="introduction-bd" :nodes="hotelData.details"></rich-text>
						</view>
					</view>
				</view>
			</view>

			<!--酒店房型信息-->
			<view v-if="roomTypeList.length" class="details-con" style="margin-top: 20rpx;background-color: #FFFFFF;">
				<view class="movie-con">
					<view class="card-bd column" style="padding-bottom: 40rpx;">
						<view class="date-view" @click="selectDate">
							<text class="date-text">{{util.formatMinutesDay(reserveDate.inDate)}} <text class="date-text1">{{util.getDateWeekend(reserveDate.inDate)}}入住</text></text>
							<text class="date-day">{{reserveDate.days}}晚</text>
							<text class="date-text">{{util.formatMinutesDay(reserveDate.outDate)}} <text class="date-text1">{{util.getDateWeekend(reserveDate.outDate)}}离店</text></text>
							<image class="right-arrow-img" style="margin-left: auto;margin-right: 0rpx;"></image>
						</view>
						
						<block class="list-item" v-for="(item,index) in roomTypeList" :key="index">
							<view class="ct-list"  @click="readRoomDetail(item)">
								<image class="img" style="background: #F5F5F5;" :src="item.thumbnailPath"></image>	
								<view class="righttxt">
									<view class="name">{{item.roomName}}</view>
									<view class="font24">{{item.roomSize}}㎡ {{item.roomTypeName}} {{item.windowName}} {{item.internetName}}</view>
									<view class="price"><text class="font-12">￥</text>{{item.platformPrice}}<text class="font-12">起</text></view>
									<button class="btn dis-btn2" v-on:click.stop="reserveButtonClick(item)">预定</button>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			<!-- 评论列表 -->
			<goodCommentList-component v-if="hotelData.commentNum" ref='goodCommentList' goodCommentTitle="评论" :shopId="hotelData.shopId"></goodCommentList-component>
			<!--附近的酒店列表-->
			<view class="near-title">附近住宿</view>
			<list-shop-cell :shopList="nearShopList"></list-shop-cell>
			<!-- 入住日期选择 -->
			<date-picker :show="showDatePicker" type="range" :value="dateValue" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="dateOnSelected" @cancel="dateOnSelected"></date-picker>
			
		</mescroll-body>
	</view>
</template>

<script>
	// mescroll-body 组件需要引入mescroll-mixins.js才能上拉加载更多
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import goodCommentListComponent from "@/components/goodCommentList-component/goodCommentList-component.vue"
	import datePicker from "@/components/date-picker/date-picker.vue"
	import listShopCell from "@/components/list-cell-view/list-shop-cell.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	import swiperBanner from "@/components/swiper-banner/swiper-banner.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			uniRate,
			datePicker,
			listShopCell,
			goodCommentListComponent,
			swiperBanner
		},
		data() {
			return {
				top:128,
				mescroll:'',
				hotelData: {},
				roomTypeList: [], //房型list
				isFavorite: false,
				nearShopList: [],//附近的酒店
				showDatePicker:false,
				dateValue: ['2019-12-10','2019-12-11'],
				reserveDate:{
					inDate:'',//入住时间
					outDate:'',//离店时间
					days:""//入住天数
				}
				
			}
		},
		onLoad(e) {
			if (e.shopId) {
				e.shopId = Number(e.shopId);
				this.hotelData.shopId = e.shopId;
				this.hotelData.coordinate = e.coordinate;
			}
			// 从搜索页进来的话才从缓存中拉取日期
			if (e.fatherPage=='hotelSearch' && uni.getStorageSync("reserveDate")) {
				this.reserveDate = uni.getStorageSync("reserveDate");
			} 
			
			if(!this.reserveDate.inDate){
				var inDate = new Date();
				this.reserveDate.inDate = this.util.formatDate(inDate);
				this.reserveDate.outDate = this.util.getDateWithCount(1);
				this.reserveDate.days = '1';
			}
			this.dateValue = [this.reserveDate.inDate,this.reserveDate.outDate];
		},
		// 导航栏右上角点击事件
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				this.util.shareWithData(this.hotelData.shareData);
			}else if(e.index == 1){
				this.util.favoriteWithData(this.isFavorite,"1",this.hotelData.shopId).then(res=>{
					this.isFavorite = res;
				})
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
				this.queryDetail(mescroll,this.hotelData.shopId);
			},
			upCallback:function(mescroll){
				this.queryNearHotel(mescroll);
			},
			queryDetail: function(mescroll,shopId) {
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId, //标签
				};
				
				this.request.get(url, data).then(res => {
					this.hotelData = this.util.formatShopData(res.data);
					this.isFavorite = this.hotelData.canFavorite == 2;
					this.util.setFavorite(this.isFavorite);
					this.queryRoomTypeList(shopId);
					mescroll.resetUpScroll();
				})
			},
			queryRoomTypeList: function(shopId) {
				let data = {
					shopId: shopId
				};
				let url = '/memberapi/api/hotelRoomRule/listByShop.do';
				var that = this;
				this.request.get(url, data).then(res => {
					const newData = res.list;
					newData.forEach(item => {
						item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
						item.imagePath = this.util.formatImagePaths(item.imagePath);
					});
					this.roomTypeList = [];
					this.roomTypeList = this.roomTypeList.concat(newData); //追加新数据
				})
				
			},
			queryNearHotel: function(mescroll) { 
				let url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					platformTypeId: this.hotelData.platformTypeId,
					coordinate: this.hotelData.coordinate,
					distance: "5000",
					sortFlag: "distance-asc"
				};

				this.request.get(url, data, mescroll).then(res => {
					if (mescroll.num == 1) this.nearShopList = [];
					this.nearShopList = this.nearShopList.concat(res.list);
				})
			},
			selectDate:function(){
				this.showDatePicker = true;
			},
			dateOnSelected:function(e) {//选择
				this.showDatePicker = false;
				if(e) {
					this.reserveDate.inDate = e.value[0];
					this.reserveDate.outDate = e.value[1];
					this.reserveDate.days = this.util.getDaysByDateString(this.reserveDate.inDate,this.reserveDate.outDate)-1;
				}
			},
			reserveButtonClick: function(roomData) {
				if (this.request.alreadyLogin()) {
					uni.setStorageSync("reserveDate",this.reserveDate);
					uni.setStorageSync("hotelData", this.hotelData);
					uni.setStorageSync("hotelRoomData", roomData);
					uni.navigateTo({
						url: "/pages/hotel/signUp"
					})
				}

			},
			callPhone:function(){
				if(!this.hotelData.contactsPhone) return;
				uni.makePhoneCall({
					phoneNumber:this.hotelData.contactsPhone
				})
			},
			gotoMapLocation: function(hotelData) {
				this.util.openLocation(this.hotelData.coordinateLng, this.hotelData.coordinateLat, this.hotelData.shopName, this.hotelData.address);
			},
			goToVr: function(vrLink) {
				this.util.gotoWebView(vrLink,this.hotelData.shopName);
			},
			readRoomDetail:function(item){
				uni.setStorageSync("hotelRoomData", item);
				uni.setStorageSync("reserveDate",this.reserveDate);
				uni.navigateTo({
					url: "/pages/hotel/roomDetail",
					animationType:"slide-in-bottom"
				})
			}
			
		}
	}
</script>

<style lang="scss">
	
	.navi-bar{
		background-color: #F5F5F5;
	}
	.date-view{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 30rpx;
		width: 100%;
	}
	.date-text{
		font-size: 32rpx;
		font-weight: bold;
	}
	.date-text1{
		font-size: 24rpx;
		color: #989898;
		font-weight: 400;
	}
	.date-day{
		font: 28rpx;
		color: gray;
		padding: 5rpx 25rpx;
		margin: 0rpx 30rpx;
		border:2rpx solid #F5F5F5;
		border-radius: 100rpx;
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
		padding-right: 30rpx;
	}

	.shop-location-image {
		margin-left: auto;
		min-width: 50rpx;
		width: 50rpx;
		height: 50rpx;
		padding: 3rpx;
	}

	.time {
		color: #4A4A4A;
		font-size: 32rpx;
	}
	
	.near-title{
		font-size: 32rpx;
		font-weight: bold;
		width: 100vw;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
</style>
