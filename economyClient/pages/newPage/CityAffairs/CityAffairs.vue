<template>
	<view class="layout">
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback" top="80">
			<!-- columnSwiper -->
			<column-swiper :info="infoSwiperList" @toDetail="goConsultDetail"></column-swiper>
			<view class="bigbox">
				<view v-for="(item,index) in consultList" :key="index">
					<!-- 无图片显示样式 -->
					<view v-if="!item.thumbnailPath" class="consult-top" @tap="goConsultDetail(item.informationId)">
						<view class="consult-top-content">
							<view class="consult-title">{{item.title}}</view>
							<view>
								<text class="consult-news font-12">{{item.authorName}}</text>
								<text class="consult-date font-10">{{item.createTime}}</text>
							</view>
						</view>
					</view>
					<!-- 有视频普通资讯样式 -->
						<view v-else-if="item.videoPath && item.informationType == 1" class="consult-list-video" @tap="goConsultDetail(item.informationId)">
							<view class="consult-list-top">
								<view class="list-describe">{{item.title}}</view>
							</view>
							<view class="consult-list-bottom">
								<view class="videosize">
									<image class="videoimg" :src="item.thumbnailPath" ></image>
									<image class="palyBtn" src="../../../static/img_new/CityAffairs/playBtn.png"></image>
								</view>
								<view class="consult-base">
									<text class="list-mark">{{item.authorName}}</text>
									<text class="list-date">{{item.createTime}}</text>
								</view>
							</view>
						</view>
					
					<!-- 有图片精选专题样式 -->
					<view v-else-if="item.thumbnailPath && item.informationType == 2" class="main-show" @tap="goConsultDetail(item.informationId)">
						<view class="consult-main-content">
							<view class="list-describe font-weight-600 wonder-mulit-limit">{{item.title}}</view>
							<image class="consult-main-image" :src="item.thumbnailPath" mode="aspectFill"></image>
							<view>
								<text class="consult-news font-12">{{item.authorName}}</text>
								<text class="consult-date font-10">{{item.createTime}}</text>
							</view>
						</view>
					</view>
					<!-- 有图片普通资讯样式 -->
					<view v-else-if="item.thumbnailPath && item.informationType == 1" class="consult-list" @tap="goConsultDetail(item.informationId)">
						<view class="consult-list-dis">
							<view class="consult-list-left">
								<view class="list-describe">{{item.title}}</view>
								<view class="consult-base">
									<text class="list-mark">{{item.authorName}}</text>
									<text class="list-date">{{item.createTime}}</text>
								</view>
							</view>
							<image class="consult-list-right" :src="item.thumbnailPath" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
	<!-- 列表结束 -->
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import columnSwiper from '@/pages/column/column-swiper.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			columnSwiper,
		},
		data() {
			return {
				tabIndex: 0,
				mescroll:'',
				consultList:[],
				bannerList:[],
				infoSwiperList:[]
			}
		},

		created(e) {
			this.queryBannerList();
		},
		methods: {
			// 获取banner列表
			queryBannerList:function(){
				const app = getApp()
				if(app.globalData.main){
					this.bannerList = app.globalData.main;
				}
			},
			
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.consultList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取项目信息列表
				const url = '/memberapi/api/information/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
				};
				var that = this;
				that.request.get(url,data,mescroll).then(res=>{
					let currListData = res.list;
					let ii=0;
					console.log(currListData)
					currListData.forEach((item,index) => {
						if(item.thumbnailPath){
							item.thumbnailPath = that.util.formatImagePath(item.thumbnailPath);
						}
						if(item.videoPath){
							item.videoPath = that.util.formatImagePath(item.videoPath);
						}
							
						if(item.createTime){
							item.createTime = item.createTime.toString().substring(0,10);
						}
					});
					this.infoSwiperList = [];
					for (let item of currListData) {
						//抬头图
						if(item.thumbnailPath && this.mescroll.num === 1 && ii<=3){
							var infoSwiper =[{
								"id":item.informationId,
								"content":item.title,
								"status":item.statusStr,
								"url":this.util.formatImagePath(item.thumbnailPath),
							}];
							this.infoSwiperList = this.infoSwiperList.concat(infoSwiper);
							ii++;
						}						
						item.imagePath = this.util.formatImagePaths(item.thumbnailPath);
						//console.log("item.imagePath = ", item.imagePath);
					}
					that.consultList = that.consultList.concat(currListData); //追加新数据
				})
			},
			goConsultDetail(informationId){
				uni.navigateTo({
					url:'/pages/newPage/CityAffairs/CityAffairsDetail?informationId='+informationId
				})
			},
			
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.tabIndex = index;
			},
			
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: "/pages/search/search"
			})
		}
	}
</script>

<style>
	/* @import url("../../../common/css/wonderful.css"); */
	page{
		background: #ffffff;
	}
	.layout{
		width: 100%;
		height: 100vh;
	}
	.consult-list{
		height: 264rpx;
	}
	.consult-list-dis{
		width: 100%;
		height: 100%;
		padding: 15px 15px 15px 16px;
		box-sizing: border-box;
		margin: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 6rpx solid #eeeeee;
	}
	.consult-list-left{
		width: 384rpx;
		height: 224rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-right: 36rpx;
	}
	.consult-list-right{
		width: 290rpx;
		height: 224rpx;
		border-radius: 15rpx;
	}
	.consult-title{
		font-size: 64rpx;
		font-weight: 900;
		color: #000000;
	}
	.list-describe{
		font-size: 32rpx;
		font-weight: 900;
		color: #000000;
	}
	.consult-base{
		font-size: 24rpx;
		color: #999999;
	}
		
	.list-mark{
		margin-right: 20rpx;
	}
	.movie-tab{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}
	/*  #ifdef  H5  */
	.movie-tab{
		position: fixed;
		top: 88rpx;
		left: 0;
		z-index: 10;
	}
	/*  #endif  */
	.scroll-h {
		width: 750rpx;
		height: 78rpx;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		background-color: #FFFFFF;
		padding-top: 12rpx;
	}
	
	.scroll-h.fixed {
		position: fixed;
		background: #FFFFFF;
		top: 88rpx;
		margin-top: var(--status-bar-height);
		left: 0;
		right: 0;
		z-index: 100;
	}
	
	.uni-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		margin-right: 132rpx;
	}
	
	.uni-tab-item:first-child {
		margin-left: 56rpx;
	}
	
	.uni-tab-item-title {
		color: #555;
		font-size: 32rpx;
		height: 45rpx;
		line-height: 45rpx;
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	
	.uni-tab-item-title-active {
		color: #F3703A;
	}
	
	.uni-tab-item-title-active .line {
		width: 48rpx;
		height: 6rpx;
		line-height: 1;
		display: block;
		background: #F3703A;
		border-radius: 2rpx;
		position: relative;
		margin: auto;
		top: 0rpx;
	}
	
	.sub-banner1{
		width: 100%;
		height: 426rpx;
	}
	.screen-swiper1{
		min-height: 426rpx;
	}
	.bannerimg{
		width: 100%;
		height: 426rpx;
	}
	
	.consult-list-video{
		width: 100%;
		height: 490rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		border-bottom: 6rpx solid #eeeeee;
	}
	
	.videosize{
		position: relative;
		width: 700rpx;
		height: 320rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.videoimg{
		width: 700rpx;
		height: 320rpx;
		border-radius: 15rpx;
	}
	.palyBtn{
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* z-index: 1; */
		margin: auto;
	}
</style>
