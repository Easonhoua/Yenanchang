<template>
	<view class="page culture">
		<!-- 搜索 -->
			<view v-if="searchFlag" class="search-form">
				<view class="inner">
					<image class="search-icon" src="../../static/img_new/common/search.png"></image>
					<input class="input" placeholder="搜索" :disabled="true" placeholder-style="color:#B8B4A9" @click="toSearch" />
				</view>
			</view>
			<!--  -->
			<mescroll-body @init="initMescroll" @down="downCallBack" @up="upCallback" :topbar="false" :up='upOption' @scroll="mescrolPageScroll">
				<!-- 轮播 -->
				<view class="index-slidebox">
					<swiper v-if="bannerList.length" :autoplay="true" class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'"
					 :indicator-dots="true" :circular="true" interval="5000" duration="500" style="height:492rpx;">
						<swiper-item v-for="(item,index) in bannerList" :key="index" @click="bannerClick(item)">
							<image :src="item.photo" mode="aspectFill" v-if="item.bannerClassification=='1'"></image>
							<video style="width: 100%;height: 100%;" :src="item.bannerCover" autoplay loop muted :show-play-btn="false"
							 :controls="false" objectFit="cover" v-if="item.bannerClassification=='2'"></video>
						</swiper-item>
					</swiper>
				</view>
				<!-- 引导 -->
				<view class="subtitle">引导</view>
				<view class="cul-iconbox" v-if="untitledList.length">
					<view class="item" @click="gotoTrade">
						<image class="item-icon" src="../../static/img_new/main/zongheti.png"></image>
						<view class="txt">综合体</view>
					</view>
					<view class="item" @click="gotoFeature">
						<image class="item-icon" src="../../static/img_new/main/tesejie.png"></image>
						<view class="txt">特色街</view>
					</view>
					<view class="item" v-for="(item,index) in untitledList" :key="index" @click="gotoPlace(item)">
						<image class="item-icon" :src="item.untitledLogo"></image>
						<view class="txt">{{item.untitledName}}</view>
					</view>
				</view>
				<!-- 文化地图 -->
				<image class="play_map box-shadow" src="/static/img_new/main/paly_map.png"  @click="cultureMapClick"></image>
				
				<!-- 吃在南昌 -->
				<view class="cul_tab">
					<!-- <scroll-view scroll-x class="bg-white nav" scroll-with-animation>
						
						<view class="tab">
							<view class="item" :class="tabIndex==9 ? 'active' : ''" @click="ontabtap(9)">鼠鼠福福过大年</view> 
							<view class="item" :class="tabIndex==1 ? 'active' : ''" @click="ontabtap(1)">吃在南昌</view>
							<view class="item" :class="tabIndex==7 ? 'active' : ''" @click="ontabtap(7)">逛在南昌</view>
							<view class="item" :class="tabIndex==2 ? 'active' : ''" @click="ontabtap(2)">住在南昌</view>
							<view class="item" :class="tabIndex==8 ? 'active' : ''" @click="ontabtap(8)">购在南昌</view>
							<view class="item" :class="tabIndex==4 ? 'active' : ''" @click="ontabtap(4)">聚在南昌</view>
						</view>
					</scroll-view> -->
					
					<scroll-navi-bar colorStyle="newred" style="margin-top: 10rpx;" :itemList="['吃在南昌','逛在南昌','住在南昌','购在南昌','聚在南昌']" @naviItemClick="ontabtap"></scroll-navi-bar>
					
					<view class="tab-con" style="margin-top: -10rpx;">
						<!-- <view class="stack-wrapper">
						  <stack ref="stack" :pages="shopsList" :stackinit="stackinit"></stack>
					</view> -->
						<swiper class="swiperPanel" indicator-dots circular indicator-color="#FFFFFF" indicator-active-color="#43917A"
						 :interval="3000" :duration="1000">
							<swiper-item class="swiperItem" v-for="(item,index) in shopsList" :key="index" v-on:click.stop="toShopDetail(item)">
								<view class="children">
									<image class="pic" :src="item.thumbnailPath"></image>
									<!-- <view class="img-address">
									<view class="name">{{item.shopName}}</view>
									<view class="address">
										<image class="icon" src="../../static/img_new/common/location@3x.png" @click="gotoMapLocation(item)"></image>{{item.address}}
									</view>
								</view> -->
								</view>
							</swiper-item>
						</swiper>

					</view>
				</view>
				
				<!-- 城事-->
				<view class="module" style="margin-bottom: -20rpx;margin-top: -12rpx;">
					<view class="title">城事<text class="more" @click="gotoAtivityList">更多</text></view>
				</view>	
				
				<scroll-view class="activity-scrollview" scroll-x >	
					<view class="item box-shadow" v-for="(item,index) in activitys" :key="index" @click="toActivityDetail(item.activityId)">
						<image class="image" :src="item.imagePath[0]" mode="aspectFill"></image>
						<view class="name">{{item.activityTitle}}</view>
					</view>
				</scroll-view>
				
				<!-- 附近 -->
				<view class="module" style="margin-top: -22rpx;">
					<view class="title">附近<text class="more" @click="moreShopList">更多</text></view>
					<view class="main nearby" v-if="nearShopList.length" v-on:click.stop="toShopDetail(nearShopList[0])">
						<view class="left-imgbox" v-if="nearShopList.length>1">
							<!-- <text class="title txt-cut">{{nearShopList[0].shopName}}</text> -->
							<view>
								<image class="img" :src="nearShopList[0].thumbnailPath"></image>
							</view>
						</view>
						<view class="right-imgbox">
							<view class="imgbox" style="margin-bottom:10rpx;" v-if="nearShopList.length>2" v-on:click.stop="toShopDetail(nearShopList[1])">
								<!-- <text class="title txt-cut">{{nearShopList[1].shopName}}</text> -->
								<image class="img" :src="nearShopList[1].thumbnailPath"></image>
							</view>
							<view class="imgbox" v-if="nearShopList.length>2" v-on:click.stop="toShopDetail(nearShopList[2])">
								<!-- <text class="title txt-cut">{{nearShopList[2].shopName}}</text> -->
								<image class="img" :src="nearShopList[2].thumbnailPath"></image>
							</view>
						</view>
					</view>
				</view>
				<!-- 推荐 -->
				<view class="subtitle" style="margin-top: -20rpx;margin-bottom: -20rpx;">推荐</view>
				<!-- 滚动标签 -->
				<scroll-navi-bar  class="top-scroll1" colorStyle="newred" :itemList="topList" @naviItemClick="naviItemClick"></scroll-navi-bar>
				<!-- 店铺列表 -->
				<shop-flow-cell ref="shopCell"></shop-flow-cell>
			
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
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
					use: true, // 是否启用上拉加载; 默认true
					onScroll: true
					// auto:false
				},
				slideNote: {
					x: 0,
					y: 0
				},
				itemStyle: [],
				stackinit: {
					visible: 3
				},
				bannerList: [], //banner
				untitledList: [], //引导集合
				activitys: [],//城事
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				tabIndex: 1,
				shopCardCur: 0,
				shopsList: [], //店铺列表
				longtitude: '115.857963', //经纬度
				latitude: '28.683016',
				address: '南昌',
				nearShopList: [], //附近的店铺22
				searchFlag: false,
				topList: [],
				topClickItem: {}
			};
		},
		
		onLoad() {
			// this.getLocation();//获取地理位置
			// this.queryBanner(); //banner
			// this.queryUntitledList(); //引导
			// this.queryNearHotel(); //附近
			// this.ontabtap(this.tabIndex); //页签
		},
		// onPageScroll(e) {
		// 	// console.log("e.scrollTop = ",e.scrollTop);
		// 	this.searchFlag = e.scrollTop>10;
		// },
		
		methods: {
			initMescroll: function(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack: function(mescroll) {
				this.queryPlartm(mescroll);
				this.getLocation();//获取地理位置
				this.queryBanner(); //banner
				this.queryUntitledList(); //引导
				this.ontabtap({index:'0'}); //页签this.tabIndex
				this.getActivityList();//城事
				this.queryNearHotel(); //附近
				mescroll.resetUpScroll();
				
			},
			upCallback: function(mescroll) {
				this.queryShopList(mescroll);
			},
			//使用mescrol上下拉刷新控件的页面滚动事件
			mescrolPageScroll:function(e){
				this.searchFlag = e.scrollTop>10;
			},
			//banner
			queryBanner: function() {
				var url = "/memberapi/api/bannerPicture/list.do";
				var data = {
					"bannerType": "10" //文化南昌
				}
				this.request.get(url, data).then(res => {
					for (let item of res.list) {
						item.photo = this.util.formatImagePath(item.photo);
						item.bannerCover = this.util.formatImagePath(item.bannerCover);
					}
					this.bannerList = res.list;
					// console.log("queryBanner完成");
					// this.queryUntitledList(); //引导
				})
			},
			//点击banner
			bannerClick: function(item) {
				this.util.bannerClick(item);
			},
			queryUntitledList: function() {
				var url = "/memberapi/api/untitled/list.do";
				var data = {};
				this.request.get(url, data).then(res => {
					for (let item of res.list) {
						// if(item.untitledId == 10){
						// 	// item.untitledLogo = "/static/img_new/main/tushuguan.png"
						// }else{
						// 	// item.untitledLogo = this.util.formatImagePath(item.untitledLogo);
						// }
						item.untitledLogo = this.util.formatImagePath(item.untitledLogo);
					}
					this.untitledList = res.list;
					// console.log("queryUntitledList完成");
					// this.getActivityList();//城事
					
				})
			},
			//综合体
			gotoTrade: function() {
				uni.navigateTo({
					url: '/pages/discover/discover?tradeType=2'
				});
			},
			gotoFeature: function() {
				uni.navigateTo({
					url: '/pages/discover/discover?tradeType=1'
				});
			},
			//特色街
			gotoPlayMap: function() {
				uni.navigateTo({
					url: '/pages/playMap/playMap1'
				});
			},
			// 进入文化地图
			cultureMapClick:function(){
				uni.navigateTo({
					url:"/pages/town/subjectMap?subjectId=2"
				})
			},
			//引导
			gotoPlace(item) {
				uni.navigateTo({
					url: '/pages/culture/placeList?placeName=' + item.untitledName + "&platformLabels=" + item.platformLabels +
						"&platformTypeId=" + item.platformTypeId

				});
			},
			//tab鼠鼠福福过大年
			ontabtap(item) {
				var indexs = ['1','7','2','8','4'];
				this.tabIndex = indexs[item.index];
				console.log("this.tabIndex == ",this.tabIndex);
				if(this.tabIndex!=8){
					let data = {
						platformTypeId: this.tabIndex,
						pageNo: 1,
						pageSize: 5,
						essenceType: 1,
						sortFlag: 'score-desc'
					};
					let url = '/memberapi/api/shops/shopsAndExtendsList.do';
					var that = this;
					this.request.get(url, data,"N").then(res => {
						this.shopsList = res.list;
						if (this.shopsList && this.shopsList.length > 0) {
							this.shopsList.forEach((item, index) => {
								if (item.thumbnailPath) {
									item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
								} else {
									item.thumbnailPath = this.util.formatImagePath(item.logo);
								}
								this.itemStyle.push(this.getStyle(index))
							})
						}
						// console.log("ontabtap完成");
					});
				}else{
					let coordinate = this.longtitude + "," + this.latitude;
					let data = {
						pageNo: 1,
						pageSize: 5,
						coordinate:coordinate,
						tradeType:2
					};
					let url = '/memberapi/api/platform/queryTradeList.do';
					var that = this;
					this.request.get(url, data,"N").then(res => {
						let shopList=res.list;
						this.util.formatShopList(shopList);
						this.shopsList = shopList;
					});
				}
			},
			//获取经纬度
			getLocation: function() {
				var _self = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						_self.longtitude = res.longitude;
						_self.latitude = res.latitude;
						if (res.address) {
							res.address.district = res.address.district.replace("区", "");
							res.address.district = res.address.district.replace("新区", "");
							_self.address = res.address.district;
							_self.queryShopList(_self.mescroll);
						}
					},
					fail(res) {
						console.log("res = ",res);
					}
				});
			},
			// 秀美洪城模块分类
			queryPlartm: function(mescroll) {
				this.topList = [{
						subjectId: '1',
						labelName: "秀美洪城",
						platformTypeId: "",
						labelId: ""
					},
					{
						subjectId: '3',
						labelName: "发现美食",
						platformTypeId: "",
						labelId: ""
					},
					{
						subjectId: '',
						labelName: "精选住宿",
						platformTypeId: "2",
						labelId: ""
					}, {
						subjectId: '',
						labelName: "游玩佳地",
						platformTypeId: "7",
						labelId: "26"
					}
				];
				if(!this.topClickItem.content) this.topClickItem.content = this.topList[0];
			},
			// 查询店铺列表
			queryShopList: function(mescroll) {
				let coordinate = this.longtitude + "," + this.latitude;
				let url = '/memberapi/api/shops/queryRecommendShopList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					coordinate:coordinate
				};

				if (this.topClickItem.content.subjectId) {
					data.subjectId = this.topClickItem.content.subjectId;
				}
				if (this.topClickItem.content.labelId) {
					data.labelId = this.topClickItem.content.labelId;
				}
				if (this.topClickItem.content.platformTypeId) { //精选推荐不用传platformTypeId
					data.platformTypeId = this.topClickItem.content.platformTypeId;
				}
				var that = this;
				this.request.get(url, data,mescroll).then(res => {
					that.$refs.shopCell.formattingList(res.list, mescroll.num);
				})
				// console.log("queryShopList完成");
			},
			//城事
			getActivityList: function() {
				let url = '/memberapi/api/activity/list.do';
				let data = {
					pageNo: 1,
					pageSize: 10,
					activityType:2
				};
				this.request.get(url, data).then(res => {
		
					for (let item of res.list) {
						item.imagePath = this.util.formatImagePaths(item.imagePath);
					}
					this.activitys = res.list;
					// this.queryNearHotel();
					// console.log("getActivityList完成");
				});
			},
			// 更多城事
			gotoAtivityList:function(){
				uni.setStorageSync("addData",2);
				uni.navigateTo({
					url:"/pages/column/column"
				})
			},
			//进入城事详情
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
			//附近
			queryNearHotel: function() {
				let coordinate = this.longtitude + "," + this.latitude;
				let url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: 1,
					pageSize: 3,
					essenceType: 1,
					coordinate: coordinate,
					distance: "5000",
					sortFlag: "distance-asc"
				};
				this.request.get(url, data,"N").then(res => {
					this.nearShopList = res.list;
					this.util.formatShopList(nearShopList);
					// console.log("queryNearHotel完成");
				})
			},
			//更多附近11
			moreShopList: function() {
				let coordinate = this.longtitude + "," + this.latitude;
				uni.navigateTo({
					url: '/pages/culture/nearPlaceList?coordinate=' + coordinate
				});
			},
			// 秀美洪城、发现美食、精选住宿、游玩佳地的点击事件
			naviItemClick: function(item) {
				this.topClickItem = item;
				this.mescroll.num = 1;
				this.mescroll.size = 10;
				this.upCallback(this.mescroll);
			},
			//鼠鼠过大年图片滑动
			getStyle(e) {
				if (e > this.shopsList.length / 2) {
					var right = this.shopsList.length - e
					return {
						transform: 'scale(' + (1 - right / 10) + ') translate(-' + (right * 9) + '%,0px)',
						zIndex: 9999 - right,
						opacity: 0.8 / right
					}
				} else {
					return {
						transform: 'scale(' + (1 - e / 10) + ') translate(' + (e * 9) + '%,0px)',
						zIndex: 9999 - e,
						opacity: 0.8 / e
					}
				}
			},
			startMove(e) {
				this.slideNote.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
				this.slideNote.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
			},
			endMove(e) {
				var newList = JSON.parse(JSON.stringify(this.itemStyle))
				if ((e.changedTouches[0].pageX - this.slideNote.x) < 0) {
					// 向左滑动
					var last = [newList.pop()]
					newList = last.concat(newList)
				} else {
					// 向右滑动
					newList.push(newList[0])
					newList.splice(0, 1)
				}
				this.itemStyle = newList
			},
			//店铺明细
			toShopDetail: function(item) {
				if(item.tradeId){
					uni.navigateTo({
						url:'/pages/discover/discoverAbout?tradeId='+item.tradeId+'&tradeType='+item.tradeType+'&coordinate='+item.coordinate
					})
				}else{
					this.util.gotoShopDetail(item);
				}
				
			},
			toSearch: function() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/css/other.scss";
	.top-scroll1 {
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		z-index: 9999;
		position: -webkit-sticky;
		position: sticky;
		top: 140rpx;
		background-color: #FFFFFF;
	}

	
	.play_map{
		margin-top: 20rpx;
		margin-left: 30rpx;
		border-radius: 10rpx;
		width: 690rpx;
		height: 180rpx;
	}
	
	// 城事
	.activity-scrollview {

		width: 720rpx;
		height: 320rpx;
		margin-left: 30rpx;
		white-space: nowrap;
		background-color: transparent;
		// display: none;
		.item {
			width: 250rpx;
			height: 300rpx;
			padding-bottom: 20rpx;
			margin-right: 20rpx;
			margin-left: 5rpx;
			display: inline-block;
			// border-radius: 10rpx;
			.image {
				width: 100%;
				height: 210rpx;
				background-color: #F5F5F5;
			}
			
			.name {
				width: 100%;
				height: 40rpx;
				font-size: 30rpx;
				font-weight: bold;
				text-align: center;
				padding: 10rpx 16rpx 0rpx 12rpx;
				
			}
		}
	}
	
	uni-swiper {
		display: block;
		height: 492rpx;
	}

	.card-swiper uni-swiper-item {
		padding: 20px 0px 20px 0;
	}

	.stack-wrapper {
		margin: 0 auto;
		position: relative;
		z-index: 1000;
		// width: 320px;
		height: 496rpx;
		padding: 28rpx;
		list-style: none;
		pointer-events: none;
	}

	.controls {
		position: relative;
		width: 200px;
		text-align: center;
		display: flex;
		/*Flex布局*/
		display: -webkit-flex;
		/* Safari */
		justify-content: space-around;
		margin: 0 auto;
		margin-top: 50px
	}

	.controls .text-hidden {
		position: absolute;
		overflow: hidden;
		width: 0;
		height: 0;
		color: transparent;
		display: block;
	}

	.sliderButton {
		text-align: center;
	}

	.sliderButton button {
		display: inline-block;
		background: #fff;
		// border-radius: 3px;
		/*width: 100px;*/
		height: 30px;
		border: 1px solid #333;
		line-height: 30px;
		margin-left: 10px;
		padding: 0 10px;
		margin-top: 10px;
	}


	.swiperPanel {
		margin: 20rpx 0;
		height: 344rpx;
		width: 100%;
		overflow: hidden;
		position: relative;

		.swiperItem {
			height: 100%;
			width: 100%;

			.children {
				height: 100%;
				width: 690rpx;
				margin: 2rpx auto;

				.pic {
					height: 100%;
					width: 100%;
					border-radius: 10rpx;
					// box-shadow: 0 0 10px #333;
				}

				.img-address {
					width: 690rpx;
					position: absolute;
					z-index: 10;
					padding: 15rpx 20rpx;
					bottom: 20rpx;
					box-sizing: border-box;
					text-align: left;

					.name {
						font-size: $font36;
						color: #fff;
						margin-bottom: 8rpx;
					}

					.address {
						font-size: $font20;
						color: #fff;

						.icon {
							width: 16rpx;
							height: 20rpx;
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}

	
</style>
