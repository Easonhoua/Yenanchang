<template>
	<view class="content-white" style="height: 100vh;">
		<view class="status-bar"></view>
		<view class="navi-bar">
			<view class="info">
				<image class="icon" src="/static/img/index2/dw.png"></image>
				<view class="address text-over-hide">{{address}}</view>
			</view>
			<view class="search display-row">
				<image class="icon" src="/static/img/common/icon_search_white.png"></image>
				<input class="input" type="text" v-model="keyword" placeholder="输入商家或者商圈" placeholder-style="color:#FFFFFF" confirm-type="search" @confirm="searchShop" @blur="searchShop"></input>
			</view>
			<!-- <image class="code" @click="scanCode"></image> -->
		</view>
		<!-- 防止下拉刷新时状态栏和导航栏看不清的问题 -->
		<view style="width: 100vw;height: 400rpx;background-color:#43917A;"></view>

		<mescroll-body @down="downCallBack" @up="upCallback" @init="initMescroll" :up="upOption" top="88rpx" :topbar="true">
			<view class="conten-view">
				<view class="header-view">
					<!-- 轮播swiper -->
					<swiper v-if="bannerList.length" class="swiper" indicator-dots circular indicator-color="#FFFFFF"
					 indicator-active-color="#43917A" :interval="3000" :duration="1000">
						<swiper-item class="item" v-for="(item,index) in bannerList" :key="index" @click="bannerClick(item)">
							<image class="image" :src="item.photo" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
					<image v-else class="bg-image" src="/static/img/index2/top_banner.png" mode="aspectFill"></image>
					<!-- 天气-vr -->
					<view class="weather-vr">
						<view class="temperature">{{weatherData.temperature}}℃<text style="font-size: 24rpx;">{{weatherData.weather}}</text></view>
						<image class="vr-image" src="/static/img/index2/vr.png" @click="goToVr"></image>
					</view>
				</view>

				<!-- 六大主题 -->
				<view class="topic-view">
					<view class="item" v-for="(item,index) in topicList" :key="index" @click="topicItemClick(index)">
						<image class="image" :src="'/static/img/index2/home_icon'+(index+1)+'.png' "></image>
						<view class="text">{{item}}</view>
					</view>
				</view>
				<!-- 商圈特色街 -->
				<!-- <view class="list-title" style="margin-top: 120rpx;">魅力南昌</view> -->
				<view class="street-view">
					<image class="top" src="/static/img/index2/cp1.png" @click="gotoPlayMap"></image>
					<view class="display-column">
						<image class="left" src="/static/img/index2/cp2.png" @tap="towonderful"></image>
						<image class="right" src="/static/img/index2/cp3.png" @tap="toconsult"></image>
					</view>
				</view>

				<!-- 精彩活动 上下滑动-->
				<view v-if="activitys !=null && activitys.length > 0" class="display-row" @click="gotoAtivityList">
					<view class="list-title">精彩活动</view>
					<view class="text-edit" style="margin-left: auto;">更多</view>
					<image class="right-arrow-img"></image>
				</view>
				<view class="activty">
					<view class="item" v-for="(item,index) in activitys" :key="index" @tap="toActivityDetail(item.activityId)">
						<image class="image" :src="item.imagePath[0]" mode="aspectFill"></image>
						<!--  -->
						<view class="text">
							<view class="title text-over-hide">{{item.activityTitle}}</view>
							<view class="time">{{item.startDate}}-{{item.endDate}}</view>
						</view>
						
					</view>
				</view>

				<!-- 精彩活动 左右滑动-->
				<!-- <scroll-view class="activity-scrollview" scroll-x="true">	
					<view class="activity-item" v-for="(item,index) in activitys" :key="index" @tap="toActivityDetail(item.activityId)">
						<image class="activity-image" :src="item.imagePath[0]" mode="aspectFill"></image>
						<view class="activity-name">{{item.activityTitle}}</view>
						<view class="activiy-time">{{item.startDate}}-{{item.endDate}}</view>
					</view>
				</scroll-view> -->
				<!-- 精选推荐 -->
				<!-- style="margin-top: 20rpx;padding-bottom: 20rpx;" -->
				<view class="list-title" style="padding-bottom: 10rpx;">精选推荐</view>
				<!-- 滚动标签 -->
				<scroll-navi-bar class="top-scroll" :itemList="topList" @naviItemClick="naviItemClick"></scroll-navi-bar>
				<!-- 店铺列表 -->
				<shop-flow-cell ref="shopCell" :shopList="shopsList"></shop-flow-cell>
				
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import permision from '@/common/js/permission.js';
	import scrollNaviBar from "@/components/navi-bar/scroll-navi-bar.vue"
	import shopFlowCell from "@/components/list-cell-view/shop-flow-cell.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			scrollNaviBar,
			shopFlowCell
		},
		data() {
			return {
				mescroll: '',
				upOption: {
					// page: {
					// 	num: 0,
					// 	size: 23,
					// 	time: null
					// }
				},
				isShowColor: false,
				activitys: [], //精彩活动
				keyword: '',
				longtitude: '', //经纬度
				latitude: '',
				address:'南昌',
				topList: [],
				topClickItem: {
					// content: {}
					// labelId: ""
				},
				bannerList: [],
				shopsList: [], //精选推荐list列表
				topicList: ["游洪城", "赏文创", "品佳肴", "购潮货", "习科普", "健体魄"],
				weatherData: {
					temperature: 10,
					weather: '晴'
				}
			}
		},
		onLoad() {
			this.getLocation();
			uni.setStorageSync("addData",0); //话题页签置为0
			
		},
		onShow() {
		
			var agree = uni.getStorageSync("agreeUserDeal");
			if(!agree){
				const subNVue = uni.getSubNVueById('userDealPrivacy');
				subNVue.show();
			}
			const app = getApp();
			if(app.globalData.main){
				this.bannerList=app.globalData.main;
			}
		},
		methods: {
			getLocation:function(){
				var self = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						self.longtitude = res.longitude;
						self.latitude = res.latitude;
						//console.log(res.address)
						if(res.address){
							res.address.district = res.address.district.replace("区","");
							res.address.district = res.address.district.replace("新区","");
							self.address=res.address.district;
							
						}
					},fail(res) {
						//console.log("res = ",res);
					}
				});
			},
			naviItemClick: function(item) {
				this.topClickItem = item;
				this.mescroll.resetUpScroll();
			},
			searchShop: function(event) {
				//console.log("event == ",event);
				this.keyword = event.detail.value;
				this.mescroll.num = 1;
				this.upCallback(this.mescroll, false);
			},
			initMescroll: function(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack: function(mescroll) {
				this.getActivityList();
				this.queryWeatherData();
				let url = '/memberapi/api/platform/queryEssenceInfo.do';
				this.request.get(url, {}, mescroll).then(res => {
					this.topList = [];
					var labelIds = [];
					for (let item of res.list) {
						labelIds.push(item.labelId);
					}
					var recomendItem = {
						essenceType: 1,
						labelName: "附近",
						labelId: labelIds.join(",")
					}
					this.topList.push(recomendItem);
					this.topList = this.topList.concat(res.list);
					if (!this.topClickItem.content) {
						this.topClickItem.content = this.topList[0];
					}
					mescroll.resetUpScroll();
				});
			},
			upCallback: function(mescroll, showLoading) { //获取店铺信息列表
				//let url = '/memberapi/api/shops/shopsAndExtendsList.do';
				let url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size, //mescroll.size
					essenceType: 1, //精选
					sortFlag: "distance-asc"
				};

				if (this.keyword) {
					data.keyword = this.keyword;
				}
				if (this.topClickItem.content.typeId) {
					data.platformTypeId = this.topClickItem.content.typeId
				}
				if (this.topClickItem.content.labelName == '附近') {
					if (this.longtitude && this.latitude) {
						data.coordinate = this.longtitude + "," + this.latitude;
						//data.distance = "5000";; //距离
					}
				}
				this.request.get(url, data, mescroll, showLoading).then(res => {
					this.$refs.shopCell.formattingList(res.list,mescroll.num);
					// if (mescroll.num == 0||mescroll.num == 1) this.shopsList = [];
					// this.shopsList = res.list;
					// this.shopsList = this.shopsList.concat(res.list);
				})
			},
			
			
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
			getActivityList: function() {
				let url = '/memberapi/api/activity/list.do';
				let data = {
					pageNo: 1,
					pageSize: 4,
					activityType:2
				};
				this.request.get(url, data).then(res => {

					var now = new Date();
					for (let item of res.list) {
						item.startDate = this.util.formatMinutesDay(item.startDate);
						item.endDate = this.util.formatMinutesDay(item.endDate);
						item.imagePath = this.util.formatImagePaths(item.imagePath);
						item.statusStr = item.endDate > this.util.formatMinutesDay(now) ? 1 : 2;
					}
					this.activitys = res.list;
				});
			},
			bannerClick: function(item) {
				this.util.bannerClick(item);
			},
			topicItemClick: function(index) {
				// const subNVue = uni.getSubNVueById('userDealPrivacy');
				// subNVue.show();
				// return;
				var urls = ['/pages/index/plateform',
					'/pages/literature/literature',
					'/pages/delicacies/delicacies',
					'/pages/purchase/purchase',
					"/pages/science/science", 
					"/pages/sports/sports"
				];
				uni.navigateTo({
					url: urls[index]
				})

			},
			// 更多活动列表
			gotoAtivityList:function(){
				uni.setStorageSync("addData",2);
				uni.switchTab({
					url:"../column/column"
				})
			},
			//活动详情
			toActivityDetail: function(activityId) {
				let statusStr = 0;
				this.activitys.forEach(item => {
					if (item.activityId == activityId)
						statusStr = item.statusStr;
				});
				uni.navigateTo({
					url: "/pages/activity/activityDetail?activityId=" + activityId + "&statusStr=" + statusStr
				})
			},
			//南昌名片
			towonderful: function() {
				uni.navigateTo({
					url: '../wonderful/wonderful'
				})
			},
			//资讯
			toconsult: function() {
				uni.navigateTo({
					url: "../consult/consult"
				})
			},
			//特色街
			gotoPlayMap: function() {
				uni.navigateTo({
					url: "../playMap/playMap1"
				})
			},
			//vr
			goToVr: function() {
				uni.navigateTo({
					url: '../webView/webView?webUrl=https://vr.chinavryan.com//tour/35c8ddf4cf676fad' + '&webTitle='
				});
			},
			// 扫一扫
			scanCode: function() {
				this.requestAttachmentPermission();
			},
			async requestAttachmentPermission() {
				// #ifdef APP-PLUS
				var result = 0;
				if (uni.getSystemInfoSync().platform == "ios") {
					var permisionID = "camera"; //摄像头
					result = await permision.judgeIosPermission(permisionID);
				}

				if (uni.getSystemInfoSync().platform == "android") {
					var permisionID = "android.permission.CAMERA"; //摄像头
					result = await permision.requestAndroidPermission(permisionID);
				}
				// IOS 0 用户尚未做出选择 1此应用程序没有被授权访问 2用户已经明确否认拒绝 3用户已经授权
				// 安卓1、已获取授权 0 未获取授权 -1被永久拒绝授权
				if (result === 1 || result === 0 || result === 3) {
					// 只允许通过相机扫码
					var self = this;
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							self.dealScanResult(res.result);
						}
					});
				} else //没有或得权限
				{
					var self = this;
					uni.showModal({
						title: '温馨提示',
						content: '使用扫一扫功能，需要开启摄像头权限,是否开启摄像头权限？',
						success: function(res) {
							if (res.confirm) {
								self.settingPermission();
							} else if (res.cancel) {

							}
						}
					});
				}
				// #endif

			},
			// 处理扫描结果
			dealScanResult: function(result) {

				//console.log("result222 = ", result);
				if (result.indexOf("http") > -1 || result.indexOf("www") > -1) {
					this.util.gotoWebView(result, '扫码详情');
				} else {
					this.request.toastTips("无法获取此二维码的订单号");
				}
			}
		}
	}
</script>

<style lang="scss">
	
	.top-scroll {
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		z-index: 99;
		position: -webkit-sticky;
		position: sticky;
		top: calc(var(--status-bar-height) + 88rpx);
		background-color: #FFFFFF;
	}

	.status-bar {
		height: var(--status-bar-height);
		width: 100%;
		z-index: 3;
		position: fixed;
		// #43917A
		background-color: #43917A;
	}

	.navi-bar {
		width: 100vw;
		display: flex;
		flex-direction: row;
		height: 88rpx;
		position: fixed;
		top: var(--status-bar-height);
		z-index: 4;
		align-items: center;
		color: #FFFFFF;
		background-color: #43917A;

		.info {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			// width: 120rpx;
			max-width: 160rpx;
			height: 64rpx;
			text-align: center;
			
			.icon {
				margin-left: 15rpx;
				width: 30rpx;
				min-width: 30rpx;
				height: 30rpx;
			}

			.address {
				margin-left: 5rpx;
				font-size: 26rpx;
				
				// min-width: 60rpx;
				
			}
		}

		.search {
			margin-left: 25rpx;
			margin-right: 60rpx;
			width: 560rpx;
			height: 60rpx;
			background-color: rgba($color: #FFFFFF, $alpha: 0.5);
			// background-color: #FFFFFF;
			border-radius: 10rpx;

			.icon {
				width: 60rpx;
				height: 60rpx;
				padding: 14rpx;
			}

			.input {
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}

		.code {
			width: 84rpx;
			height: 84rpx;
			background: url(..~@/static/img/index2/code.png) no-repeat center center;
			background-size: 50rpx 50rpx;
			margin-top: -3rpx;
		}
	}

	.conten-view {
		width: 100vw;
		background-color: #FFFFFF;
	}

	.header-view {
		width: 100vw;
		height: 450rpx;
		// background-color: #43917A;
		padding: 20rpx 0;
		padding-top: 0rpx;
	
		/* #ifdef H5 */
		margin-top: 88rpx;
		// margin-top: calc(var(--status-bar-height) + 88rpx);
		/* #endif */

		.swiper {
			width: 100vw;
			height: 370rpx;
			z-index: 0;

			.item {
				width: 100%;
				height: 100%;

				.image {
					// width: 710rpx;
					// margin: 0 20rpx;
					width: 100%;
					height: 100%;
					// border-radius: 14rpx;
					overflow: hidden;
				}
			}
		}

		.bg-image {
			width: 750rpx;
			height: 370rpx;
			// padding: 0 20rpx;
			z-index: 0;
			// border-radius: 14rpx;
		}
	}

	.weather-vr {
		margin-top: -380rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 30rpx 50rpx;
		color: #FFFFFF;
		z-index: 10;

		.temperature {
			font-size: 60rpx;
			width: 300rpx;
			height: 100rpx;
			z-index: 11;
		}

		.weather {
			margin-top: -30rpx;
			font-size: 24rpx;
			z-index: 12;
		}

		.vr-image {
			width: 100rpx;
			height: 55rpx;
			margin-top: -10rpx;
		}
	}

	.topic-view {
		z-index: 0;
		width: 710rpx;
		height: 200rpx;
		margin-left: 20rpx;
		margin-top: -60rpx;
		padding: 0 20rpx;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-radius: 14rpx;
		box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);

		.item {
			width: 100rpx;
			height: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;

			.image {
				width: 86rpx;
				height: 86rpx;
			}

			.text {
				margin-top: 10rpx;
				width: 100%;
				height: 40rpx;
				font-size: 26rpx;
				color: #4A4A4A;
			}
		}
	}

	.street-view {
		width: 100vw;
		background-color: #FFFFFF;
		padding: 20rpx;
		// padding-top: 0rpx;
		margin-top: 140rpx;
		display: flex;
		flex-direction: row;
		.top {
			width: 320rpx;
			height: 320rpx;
			border-radius: 14rpx;
			margin-bottom: 10rpx;
			// box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.08);
		}

		.left {
			width: 370rpx;
			height: 150rpx;
			// padding-right: 10rpx;
			margin-left: 20rpx;
			margin-bottom: 10rpx;
		}

		.right {
			width: 370rpx;
			height: 150rpx;
			margin-left: 20rpx;
			margin-top: 10rpx;
			// padding-left: 10rpx;
		}
	}

	.activty {
		overflow: hidden;
		width: 750rpx;
		padding: 0rpx 0rpx 0rpx 20rpx;
		.item {
			float: left;
			box-sizing: border-box;
			width: 345rpx;
			height: 345rpx;
			margin-right: 20rpx;
			display: flex;
			flex-direction: column;
			margin-bottom: 25rpx;
			box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);
			color: #FFFFFF;
			.image {
				width: 100%;
				height: 100%;
				// height: 230rpx;
				background-color: #F5F5F5;
			}
			.text{
				
				position: absolute;
				margin-top: 220rpx;
				// bottom: 0rpx;
				.title {
					// position: absolute;
					// bottom: 60rpx;
					font-weight: bold;
					font-size: 28rpx;
					font-weight: bold;
					padding: 20rpx 0rpx 0rpx 20rpx;
					overflow: hidden;
				}
				
				.time {
					
					font-size: 24rpx;
					// color: #4A4A4A;
					// bottom: 20rpx;
					padding: 10rpx 0rpx 20rpx 20rpx;
				}
			}
			
		}

	}

	.list-title {
		// width: 100vw;
		background-color: #FFFFFF;
		font-size: 40rpx;
		// margin-top: 20rpx;
		padding: 10rpx 20rpx 30rpx 20rpx;
		// font-weight: 500;
		// color: #000000;
		color: #333333;
		z-index: 20000;
	}

	.activity-scrollview {
		background-color: #FFFFFF;
		color: #000000;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		// padding-right: 20rpx;
	}

	.activity-item {
		width: 300rpx;
		display: inline-block;
		margin: 20rpx;
		margin-right: 0rpx;
		padding-bottom: 20rpx;
		box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);
	}

	.activity-image {
		width: 300rpx;
		height: 210rpx;
		background-color: #F5F5F5;
		// border-radius: 10rpx;
	}

	.activity-name {
		font-size: 28rpx;
		font-weight: bold;
		padding: 10rpx 0rpx 0rpx 20rpx;
		overflow: hidden;
	}

	.activiy-time {
		font-size: 24rpx;
		color: #4A4A4A;
		padding: 0rpx 0rpx 10rpx 20rpx;
	}
</style>
