<template>
	<view class="page culture town index" >
		<view class="headerNew">
			<view class="location">
				<!-- <image class="icon" src="../../static/img_new/common/location-blue@3x.png"></image> -->
				<view class="city">{{address}}</view>
				<view class="date">
					
					<!-- <text class="datetime">{{nowDate.getDate()}}</text>
					<text>{{nowDate.toDateString().split(" ")[1]}}.{{nowDate.getFullYear()}}</text> -->
					<text>{{dateString}}</text>
				</view>
			</view>
			<view v-if="!searchFlag" class="weatherNew">{{weatherData.temperature}}℃<text style="font-size: 24rpx;">{{weatherData.weather}}</text>
			</view>
			<view v-else class="weatherNew" @click="toSearch">
				<image class="weather-icon" style="	width:50rpx;height:50rpx;" src="../../static/img_new/common/search.png">
				</image>
			</view>
		</view><!-- 头部结束 -->
		<mescroll-body @down="downCallBack" @up="upCallback" @init="initMescroll" :up="upOption"  :topbar="true">
			<!-- 轮播图 -->
			<view class="index-slidebox">
				<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500" style="height:100%;">
					<swiper-item v-for="(item,index) in bannerList" :key="index" @click="bannerItemClick(item)">
						<image :src="item.photo" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 南昌地图 -->
			<view class="module" style="padding-bottom: 0rpx;margin-top: -10rpx;">
				<view class="title">南昌地图
					<!-- <text class="more">more</text> -->
				</view>
				<view class="main nearby map"  v-for="(item,index) in subjectList" :key="index">
					<view class="left-imgbox" @click="gotoPlayMap(item.subjectId,item.subjectName)">
						<!-- <text class="title txt-cut">{{item.subjectName}}地图</text> -->
						<view>
							<image class="img" :src="item.thumbnailPath" mode="aspectFill"></image>
						</view>
					</view>
					<view class="right-imgbox">
						<view class="imgbox bt20" v-for="(shop,i) in item.shopsList" :key="i" @click="gotoShopDetail(shop)">
							<view class="addressbox">
							</view>
							<image class="img" :src="shop.thumbnailPath" mode="aspectFill"></image>
						</view>
					</view>
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
				mescroll: '',
				upOption: {
					onScroll: true
				},
				address: '南昌',
				nowDate: new Date(),
				dateString:"",
				weatherData: {
					temperature: 10,
					weather: '晴'
				},
				bannerList:[],
				subjectList: [],
				searchFlag: false
				
			};
		},
		onLoad() {
		
			this.dateString = this.nowDate.getFullYear()+"年"+(this.nowDate.getMonth()+1)+"月"+this.nowDate.getDate()+"日";
			this.util.date
			this.getLocation();
		},
		methods: {
			
			// 不推荐使用此pageScroll方法，或者系统自带的onPageScroll方法，因为上下滑动的时候进行js处理会影响性能
			// pageScroll:function(e) {
			// 	if (e.scrollTop > 10) {
			// 		this.searchFlag = true;
			// 	} else {
			// 		this.searchFlag = false;
			// 	}
			// },
			initMescroll: function(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack:function(mescroll){
				this.queryBannerList();
				this.queryWeatherData();
				mescroll.resetUpScroll();
			},
			upCallback:function(mescroll){
				this.querySubject(mescroll);
			},
			querySubject: function(mescroll) {
				let url = '/memberapi/api/platform/querySubject.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size
				};
				this.request.get(url, data,mescroll).then(res => {
					var list = res.list;
					list.forEach(item => {
						if (item.thumbnailPath) {
							item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
						}
						item.shopsList.forEach(shop => {
							if (shop.thumbnailPath) {
								shop.thumbnailPath = this.util.formatImagePath(shop.thumbnailPath);
							} else {
								shop.thumbnailPath = this.util.formatImagePath(shop.logo);
							}
						});
					});
					this.subjectList = list;
				})
			},
			
			// 获取地理位置
			getLocation:function(){
				var self = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						if(res.address){
							self.address=res.address.district;
						}
					}
				});
			},
			// 获取banner列表
			queryBannerList:function(){
				const app = getApp();
				if(app.globalData.map){
					this.bannerList=app.globalData.map;
				}
			},
			// 获取天气信息
			queryWeatherData: function() {
				//高德天气接口
				var url = 'https://restapi.amap.com/v3/weather/weatherInfo';
				var data = {
					city: "360100",
					key: "6ee25e3f24ef6a38dc71762e8011cd4b" //ye南昌-web服务天气key
				}
				uni.request({
					url: url,
					data: data,
					success: (res) => {
						if (res.data.lives[0]) {
							this.weatherData = res.data.lives[0];
							if (this.weatherData.temperature == 'undefined') this.weatherData.temperature = 10;
							if (this.weatherData.weather == 'undefined') this.weatherData.weather = 晴;
						}
					}
				})
			},
			// 轮播图点击事件
			bannerItemClick:function(item){
				// this.util.bannerClick(item);
				this.util.bannerClick(item);
			},
			//主题地图
			gotoPlayMap: function(subjectId,subjectName) {
				if(subjectId == 1){
					uni.navigateTo({
						url:"/pages/newPage/play/mapDetails"
					})
				}else  if(subjectId == 2){
					// uni.navigateTo({
					// 	url: "/pages/town/subjectMap?subjectId="+subjectId
					// })
					uni.navigateTo({
						url: "/pages/webView/mapWebView?webUrl=https://ye.ncnews.com.cn/html/map.html"
					})
				}else if(subjectId == 3){
					uni.navigateTo({
						url:"/pages/delicacies/delicacyMapDetails"
					})
				}else if(subjectId == 4){
					uni.navigateTo({
						url:"/pages/purchase/tidePurchase"
					})
				}else if(subjectId == 5){
					uni.navigateTo({
						url: "/pages/town/subjectMap?subjectId="+subjectId+"&showNear=1&showEssence=1&title="+subjectName
					})
				}else if(subjectId == 6){
					uni.navigateTo({
						url:"/pages/sports/sportsMapDetails"
					})
				}else{
					uni.navigateTo({
						url: "/pages/town/subjectMap?subjectId="+subjectId+"&title="+subjectName
					})
				}
				
			},
			// 进入店铺详情
			gotoShopDetail:function(shop) {
				this.util.gotoShopDetail(shop);
			},
			// 进入搜索界面
			toSearch: function() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "../../common/css/other.scss";
	
	// .uni-swiper-slide-frame image {
	// 	height: 650rpx;
	// }

	// .card-swiper uni-swiper-item {
	// 	padding: 20px 0px 20px 0;
	// }
	.index-slidebox{
		width: 100vw;
		height: 400rpx;
		margin-top: 88rpx;
	}
</style>
