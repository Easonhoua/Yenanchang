<template>
	<view class="page culture" style="background-color: #FFFFFF;">
		<mescroll-body @init="initMescroll" @down="downCallBack" @up="upCallback" :topbar="false" :up='upOption' @scroll="mescrolPageScroll">
		<!-- 轮播 -->
		<view  class="sub-banner1" style="padding: 25rpx">
			<swiper v-if="bannerList.length" :autoplay="true" class="screen-swiper1" :class="dotStyle?'square-dot':'round-dot'"
			 :indicator-dots="true" :circular="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in bannerList" :key="index" @click="bannerClick(item)">
					<image :src="item.photo" class="bannerimg" mode="aspectFill" v-if="item.bannerClassification=='1'"></image>
					<video style="width: 100%;height: 100%;" :src="item.bannerCover" autoplay loop muted :show-play-btn="false"
					 :controls="false" objectFit="cover" v-if="item.bannerClassification=='2'"></video>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 引导icon -->
		<view class="cul-iconbox" v-if="untitledList.length">
			<view class="item" @click="gotoTrade">
				<image class="item-icon" src="../../../static/img_new/newculture/synthesis.png"></image>
				<view class="txt">综合体</view>
			</view>
			<view class="item" @click="gotoFeature">
				<image class="item-icon" src="../../../static/img_new/newculture/Characteristicstreet.png"></image>
				<view class="txt">特色街</view>
			</view>
			<view class="item" v-for="(item,index) in untitledList" :key="index" @click="gotoPlace(item)">
				<image class="item-icon" :src="item.untitledLogo"></image>
				<view class="txt">{{item.untitledName}}</view>
			</view>
		</view>
		
		<!-- 广告图 -->
		<view class="centerad">
			<view class='topview' @click="goGubjectMap()">
				<image src="../../../static/img_new/newculture/CultureMap.png" class="adtopimg"></image>
			</view>
			<!-- <view class="bottomview">
				<image src="../../../static/img_new/newculture/Limitedseckill.png" class="adbottomimg"></image>
				<image src='../../../static/img_new/newculture/Popularitygroup.png' class="adbottomimg"></image>
			</view> -->
		</view>
		
		<!-- 城事 -->
		<view class="cityStory">
			<view class="findtop">
				<text class="findtitle">城事</text>
				<view class='more' @click="gotoAtivityList">更多></view>
			</view>
			<scroll-view  scroll-x="true">
				<view class="oul">
					<view class="li" v-for="(item,index) in chengshiList" :key="index" @click="toActivityDetail(item.activityId)">
						<image class="topimg" :src="item.imagePath[0]"></image>
						<text class="bottomtxt">{{ item.activityTitle }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 发现 -->
		<view class="find">
			<view class="findtop">
				<text class="findtitle">发现</text>
				<view class='more' @click="findmore">更多></view>
			</view>
			<scroll-view  scroll-x='true' scroll-with-animation>
				<view class="findoul" >
					<view class="findli" v-for="(item,index) in findlist" :key="index" @click="gotoStrategy(item.guideId)">
						<image class="findtopimg"  v-if="item.thumbnailPath && item.thumbnailPath.length > 0 " :src="item.thumbnailPath[0]"></image>
						<view class="findbottomcontent">
							<text class="contenttitle">{{ item.guideTitle }}</text>
							<view class="tips">
								<view class="tipsitem" v-if="item.guideLabel1">{{ item.guideLabel1 }}</view>
								<view class="tipsitem" v-if="item.guideLabel2">{{ item.guideLabel2 }}</view>
								<view class="tipsitem" v-if="item.guideLabel3">{{ item.guideLabel3 }}</view>
							</view>
							<view class="contentbottom">
								<!-- <image class="img" :src="item.photo"></image> -->
								<text class="bottomleft">{{ item.guideIntroduction }}</text>
								<view class="bottomright">{{ item.likeNum }}人感兴趣</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 推荐 -->
		
		<view class="findtop">
			<text class="tuijiantext">推荐</text>
		</view>
		
		<!-- <view class="subtitle" style="margin-top: -20rpx;margin-bottom: -20rpx;">推荐</view> -->
		<!-- 滚动标签 -->
		<scroll-navi-bar  class="top-scroll" :itemList="topList" @naviItemClick="naviItemClick"></scroll-navi-bar>
		<!-- 店铺列表 -->
		<shop-flow-cell ref="shopCell"></shop-flow-cell>
		
	</mescroll-body>
	</view>
</template>

<script>
	import scrollNaviBar from "@/components/navi-bar/scroll-navi-bar.vue"
	import shopFlowCell from "@/components/list-cell-view/shop-flow-cell.vue"
	export default {
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
				topList: [],
				tradeList:[],
				chengshiList:[],//城事
				bannerList: [], //banner
				untitledList: [], //引导集合
				dotStyle: false,
				topClickItem: {},
				tabIndex: 1,
				searchFlag: false,
				longtitude: '115.857963', //经纬度
				latitude: '28.683016',
				address: '南昌',
				findlist:[]
			}
		},
		onLoad() {
		
		},
		
		methods: {
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			
			downCallBack(mescroll) {
				this.queryPlartm(mescroll);
				this.getLocation();//获取地理位置	
				this.queryBannerList(); //banner
				this.queryUntitledList(); //引导
				this.getActivityList();//城事
				this.querfindlist();//发现
				mescroll.resetUpScroll();
			},
			
			upCallback(mescroll) {
				this.queryShopList(mescroll);
			},
			
			//使用mescrol上下拉刷新控件的页面滚动事件
			mescrolPageScroll(e){
				this.searchFlag = e.scrollTop>10;
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
							let addr=res.address.district;
							addr = addr.replace("区", "").replace("新区", "");
							_self.queryShopList(_self.mescroll);
							
							//动态设置地理位置（未测）
							// #ifdef APP-PLUS
							var currentWebview = _self.$scope.$getAppWebview();
							console.log("===>"+currentWebview)
							var tn = currentWebview.getStyle().titleNView;   
							tn.buttons[2].text = addr;     //[0] 按钮的下标
							currentWebview.setStyle({  
								titleNView: tn  
							});
						// #endif
						}
					},
					fail(res) {
						console.log("res = ",res);
					}
				});
			},
			
			// 秀美洪城、发现美食、精选住宿、游玩佳地的点击事件
			naviItemClick(item) {
				this.topClickItem = item;
				this.mescroll.num = 1;
				this.mescroll.size = 10;
				this.upCallback(this.mescroll);
			},
			
			
			//查询发现列表
			querfindlist(){
				let url = '/memberapi/api/guide/list.do';
				let data = {
					pageNo: 1,
					pageSize: 10,
				};
				this.request.get(url, data).then(res => {
					res.list.forEach(item => {
						if (item.thumbnailPath) {
							item.thumbnailPath = this.util.formatImagePaths(item.thumbnailPath);
						}
						if (item.photo) {
							item.photo = this.util.formatImagePath(item.photo);
						}
						if (item.guideDetail) {
							item.guideDetail = item.guideDetail.replace(/<\/?.+?>/g, "");
						}
					});
					this.findlist = res.list;
					console.log(res.list)
					// for (let item of res.list) {
					// 	item.imagePath = this.util.formatImagePaths(item.imagePath);
					// }
					// this.findlist = res.list;
					
				});
			},
			
			
			// 查询店铺列表
			queryShopList(mescroll) {
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
				this.request.get(url, data,mescroll).then(res => {
					this.$refs.shopCell.formattingList(res.list, mescroll.num);
				})
			},
			
			
			//引导
			gotoPlace(item) {
				uni.navigateTo({
					url: '/pages/culture/placeList?placeName=' + item.untitledName + "&platformLabels=" + item.platformLabels +
						"&platformTypeId=" + item.platformTypeId
			
				});
			},
			
			// 更多攻略
			findmore() {
				uni.navigateTo({
					url:"/pages/strategy/strategySearch?userType=1" 
				})
			},
			
			//特色街
			gotoFeature() {
				uni.navigateTo({
					url: '/pages/discover/discover?tradeType=1'
				});
			},
			
			//综合体
			gotoTrade() {
				uni.navigateTo({
					url: '/pages/discover/discover?tradeType=2'
				});
			},
			
			//引导列表
			queryUntitledList() {
				var url = "/memberapi/api/untitled/list.do";
				var data = {};
				this.request.get(url, data).then(res => {
					for (let item of res.list) {
						item.untitledLogo = this.util.formatImagePath(item.untitledLogo);
					}
					this.untitledList = res.list;
				})
			},
			
			
			//点击banner
			bannerClick: function(item) {
				this.util.bannerClick(item);
			},
			
			//banner
			// 获取banner列表
			queryBannerList:function(){
				const app = getApp();
				if(app.globalData.main){
					this.bannerList=app.globalData.main;
				}
			},
			
			
			// 更多城事
			gotoAtivityList(){
				uni.setStorageSync("addData",2);
				uni.navigateTo({
					url:"/pages/column/column"
				})
			},
			
			//进入城事详情
			toActivityDetail(activityId) {
				let statusStr = 0;
				this.chengshiList.forEach(item => {
					if (item.activityId == activityId)
						statusStr = item.statusStr;
				});
				uni.navigateTo({
					url: "/pages/activity/activityDetail?activityId=" + activityId + "&statusStr=" + statusStr
				})
			},
			gotoStrategy(guideId){
				uni.navigateTo({
					url: '/pages/strategy/strategyDetail?guideId='+guideId
				});
			},
			//南昌文化地图
			goGubjectMap(){
				uni.navigateTo({
					url: '/pages/town/subjectMap?subjectId=2'
				});
			},
			
			//城事
			getActivityList() {
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
					this.chengshiList = res.list;
					
				});
			},
			
			queryPlartm(mescroll) {
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
						labelId: "26,219,220"
					}
				];
				if(!this.topClickItem.content) this.topClickItem.content = this.topList[0];
			},
		},
		
		
		onNavigationBarSearchInputClicked(){
			console.log('333')
			uni.navigateTo({
				url: "/pages/search/search"
			})
		},
		
		//头部按钮事件
		onNavigationBarButtonTap(e){
			if(e.index == 0){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			}
		},
	}
</script>

<style>
	.cul-iconbox{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		/* padding: 0 10; */
	}
	.sub-banner1{
		width: 750rpx;
		height: 400rpx;
		background: #fff;
		border-top: 2px solid #f9f9f9;
		box-sizing: border-box;
	}
	.item{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 20rpx 16rpx;
	}
	.item-icon{
		width: 104rpx;
		height: 104rpx;
		/* box-shadow:0px 2px 6px 0px rgba(242,130,17,1); */
	}
	.txt{
		font-size:24rpx;
		color: #000000;
	}
	.centerad{
		width: 100%;
		padding: 0 32rpx;
		box-sizing: border-box;
		margin-top: 60rpx;
	}	
	.topview{
		width: 686rpx;
		height: 180rpx;
		margin-bottom: 16rpx;
	}
	.adtopimg{
		width: 686rpx;
		height: 180rpx;
	}
	.bottomview{
		display: flex;
		justify-content: space-between;
	}
	.adbottomimg{
		width: 336rpx;
		height: 192rpx;
	}
	.cityStory{
		width: 100%;
		/* height: ; */
		padding: 0 32rpx;
		margin-top: 30rpx;
		margin-bottom: 48rpx;
	}
	.oul{
		/* width: 300%; */
		height: 280rpx;
		display: flex; 
		flex-direction: row;
	}
	.li{
		display: inline-block;
		width: 252rpx;
		height: 274rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 6rpx 16rpx 0px rgba(209,204,202,0.5);
		border-radius:12rpx;
		margin-right: 24rpx;
	}
	.topimg{
		width: 252rpx;
		height: 202rpx;
		background:rgba(216,216,216,1);
		border-radius:12rpx 12rpx 0px 0px;
	}
	.bottomtxt{
		font-size: 28rpx;
		font-weight: 900;
		color: #000000;
		padding-left: 10rpx;
		line-height: 20rpx;
	}
	.find{
		width: 100%;
		height: 560rpx;
		padding:0 32rpx;
	}
	.findtop{
		width: 100%;
		height: 80rpx;
/* 		padding: 0 32rpx; */
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
	.tuijiantext{
		width: 100%;
		height: 80rpx;
		font-size: 36rpx;
		font-weight: 900;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-indent: 40rpx;
	}
	.findtitle{
		display: block;
		font-size: 36rpx;
		color: #000000;
		font-weight: 900;
		margin-bottom: 16rpx;
	}
	.more{
		font-size:16px;
		color:rgba(113,113,113,1);
		line-height:22px;
	}
	.findoul{
		/* width: 300%; */
		height: 440rpx;
		display: flex;
		flex-direction: row;
	}
	.findli{
		display: inline-block;
		width: 504rpx;
		height: 420rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 6rpx 16rpx 0px rgba(226,226,225,1);
		border-radius:12rpx;
		margin-right: 24rpx;
		
	}
	.findtopimg{
		width: 504rpx;
		height: 254rpx;
		background:rgba(216,216,216,1);
		border-radius:12rpx 12rpx 0px 0px;	
	}
	.findbottomcontent{
		width: 504rpx;
		height: 166rpx;
		padding: 8rpx 16rpx 16rpx 16rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.contenttitle{
		width: 460rpx;
		font-size:30rpx;
		font-weight:600;
		color:rgba(0,0,0,1);
		line-height:42rpx;
		margin-bottom: 8rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.tips{
		/* display: flex; */
		width: 100%;
		overflow-x: scroll;
		height: 40rpx;
		margin-bottom: 12rpx;
	}
	.tipsitem{
		display: inline-block;
		padding: 2rpx 8rpx;
		color: #F3703A;
		border-radius:2rpx;
		border:2rpx solid rgba(243,112,58,1);
		margin-right: 12rpx;
		font-size: 24rpx;
	}
	.contentbottom{
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.bottomleft{
		width: 300rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size: 20rpx;
		color: #676767;
	}
	.bottomright{
		font-size: 20rpx;
		color: #FD4C2A;
	}
	.tuijain{
		width: 100%;
		height: 680rpx;
		padding: 22rpx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.tuijaimitem{
		width:332rpx;
		height:512rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 6rpx 16rpx 0px rgba(209,204,202,0.5);
		border-radius:12rpx;
	}
	.tuijianimg{
		width: 332rpx;
		height: 288rpx;
		background:rgba(216,216,216,1);
		border-radius:12rpx 12rpx 0px 0px;	
	}
	.bottomcontent{
		padding: 0 16rpx;
	}
	.tuijiantitle{
		font-size: 28rpx;
		color: #000000;
		font-weight: 900;
	}
	.centercontent{
		position: relative;
		height: 50rpx;
		display: flex;
		align-items: center;
	}
	.content1{
		font-size: 26rpx;
		color: #FF9125;
	}
	.content2{
		font-size: 20rpx;
		color: #717171;
		position: absolute;
		left: 88rpx;
	}
	.content3{
		font-size: 10rpx;
		color: #000000;
		position: absolute;
		right: 0;
	}
	.addressinfo{
		color: #959595;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
	}
	.address{
		width: 168rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		font-size: 24rpx;
	}
	.distance{
		font-size: 20rpx;
	}
	.price{
		color: #FD4C2A;
		font-size: 28rpx;
		font-weight: 500;
	}
	.bannerimg{
		width:100%;
		height: 320rpx;
		border-radius: 16rpx;
	}
	.screen-swiper1{
		min-height: 320rpx;
	}
	.img{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #007AFF;
	}
</style>
