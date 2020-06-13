<template>
	<view class="scenicdetails activity">
		<view class="header">
			<image class="discoverTlw-back" src="../../static/img/common/white-back.png" @tap="goBack()"></image>
		</view>
		<view class="topimg">
			<view class="view-name">
				<text class="name">{{scenicSpotData.scenicName?scenicSpotData.scenicName:'--'}}</text>
				<text class="astrict">{{scenicSpotData.productStatusName?scenicSpotData.productStatusName:'--'}}</text>
			</view>
			<view class="pagination">{{currImageIndex}}/{{imageLength}}张</view>
			<uni-swiper-dot :info="scenicSpotData.imagePath" :current="current" mode="nav"  :dots-styles="dotsStyles">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in scenicSpotData.imagePath" :key="index">
						<view class="swiper-item">
							<image style="width: 750rpx;height: 360rpx;" :src="item" mode="aspectFill"/>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="scenicinfor">
			<view class="infor">景点信息</view>
			<view class="location">
				<image class="icon" src="../../static/img/common/wz_dw.png"></image>
				<view class="locationtxt">位于南昌 <text class="blue">{{scenicData.shopName?scenicData.shopName:'--'}}</text> {{scenicSpotData.scenicName?scenicSpotData.scenicName:'--'}}</view>
			</view>
			<view class="introduce">
				<view class=""><image class="icon" src="../../static/img/common/wz_js.png"></image>简介</view>
				<view class="txt">{{scenicSpotData.introduction?scenicSpotData.introduction:'暂无介绍'}}</view>
			</view>
		</view>
		<!--评论-->
		<goodCommentList-component ref='goodCommentList' goodCommentTitle="精彩点评" :shopId="scenicData.shopId" style="margin-top: -20rpx;"></goodCommentList-component>
		<view class="other-items" style="margin-top: 20rpx;">
			<view class="title">景区内其他项目</view>
			 <scroll-view class="scroll-h" scroll-x="true">
				<view class="other-items-bd">
					<view v-if="scenicSpotList.length>0" class="item" v-for="(item,index) in scenicSpotList" :key="index">
						<view class="imgbox"><image :src="item.thumbnailPath"></image></view>
						<text class="txt">{{item.scenicName?item.scenicName:'--'}}</text>
					</view>
					<view v-else class="item">暂无其他在售项目</view>
				</view>
			</scroll-view>
		</view>
		<view class="other-items">
			<view class="title title-noarrow">所属景区</view>
			<view class="ht-card card">
				<view class="card-bd">
					<view class="ct-list" @click="toDetail(scenicData.shopId)">
						<image class="img" :src="scenicData.thumbnailPath"></image>
						<view class="righttxt">
							<view class="name">{{scenicData.shopName?scenicData.shopName:'--'}}</view>
							<view class="score">
								<uni-rate :value="scenicData.score" disabled="true" size="14" style="display: inline-flex;"></uni-rate>
								<text class="number yd">{{scenicData.score}}分</text>
								<text class="number">{{scenicData.commentNum}}条评论</text>
							</view>
							<!-- <view class="locale font24" style="margin-left: -10rpx;">
								<text>{{scenicData.keyword?scenicData.keyword:'暂无景区关键字'}}</text>
							</view> -->
							<view class="coupon coupon2" style="margin-top: -12rpx;">
								<view class=""><text class="yd">{{scenicData.scenicFreeFlag == 1 ? '免费' : '¥ '+scenicData.discountPrice+' 起'}}</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import goodCommentListComponent from "@/components/goodCommentList-component/goodCommentList-component.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	export default {
		components: {
			uniSwiperDot,
			goodCommentListComponent,
			uniRate,
		},
		data() {
			return {
				spotId:'',
				shopId:'',
				scenicSpotData:{},
				scenicData:{},
				scenicSpotList:[],
				imageLength:0,
				currImageIndex:0,
				current: 0,
				mode: 'nav',
				dotsStyles: {
					backgroundColor: '',//rgba(0, 0, 0, .3)
					border: '0.5px rgba(255,255,255,255) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255,255,255,255)',
					selectedBorder: '1px rgba(255,255,255,255) solid',
				}
			}
		},
		onLoad(option) {
			if(option.spotId && option.shopId){
				this.spotId = option.spotId;
				this.shopId = option.shopId;
				this.querySpotDetail();
				this.queryExtraSpot();
				this.queryScenicDetail();
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
				this.currImageIndex = this.current + 1;
			},
			goBack:function(){
				uni.navigateBack();
			},
			querySpotDetail:function(){
				const url = '/memberapi/api/scenicSpot/read.do';
				let data = {
					spotId: this.spotId,
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						that.scenicSpotData = res.data;
						if (res.data.imagePath) {
							that.scenicSpotData.imagePath = this.util.formatImagePaths(res.data.imagePath);
							//景点图片存在给顶部图片张数更新值
							this.imageLength = that.scenicSpotData.imagePath.length;
							this.currImageIndex = 1;
						}
						
					}
				})
			},
			queryScenicDetail:function(){
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: this.shopId,
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						if (res.data.thumbnailPath) {
							res.data.thumbnailPath = this.util.formatImagePath(res.data.thumbnailPath);
						}
						that.scenicData = res.data;
					}
				})
			},
			queryExtraSpot :function(){
				let url = '/memberapi/api/scenicSpot/list.do';
				let data = {
					shopId: this.shopId,
					spotId: this.spotId,
					productStatus:2,
					pageNo:1,
					pageSize:100,
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						let currListData = res.list;
						currListData.forEach(item => {
							if(item.thumbnailPath){
								item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
							}
						});
						that.scenicSpotList = that.scenicSpotList.concat(currListData); //追加新数据
					}
				})
			},
			toDetail(shopId){
				uni.navigateTo({
					url:"scenicDetail?shopId="+shopId
				})
			},
			getOtherScenicSpot:function(){
				uni.navigateTo({
					url:''
				})
			}
		}
	}
</script>

<style>
	.scenery-more{
		text-align: center;
		padding:20rpx;
		font-size:32rpx;
		color:rgba(74, 74, 74, 1);
		position: relative;
	}
	.scenery-more:after{
		content: " ";
		position: absolute;
		left: 0;
		bottom:0;
		right: 0;
		height: 1px;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		color: rgba(0, 0, 0, 0.1);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		z-index: 2;
	}
	.swiper-box{
		height:360rpx;
	}
	.uni-swiper__dots-nav{
		background: rgba(0, 0, 0, 0);
	}
	.scenic-spot-show{
		display: inline-block;
		width: 218rpx;
		height: 154rpx;
		border-radius: 15rpx;
	}
	.discover-line-limit{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
		max-width: 218rpx;
	}
	.discoverTlw-back{
		width:36rpx;
		height:36rpx;
		margin:30rpx 0 0 32rpx;
	}
</style>
