<template>
	<view v-if="activityList && activityList.length > 0" class="top-slider-con">
		<view class="shop-activity-banner" v-for="(item,index) in activityList" :key="index">
			<view class="imgbox">
				<image class="big-img" :src="item.imagePath[0]" mode="aspectFill"></image>
				<view class="masking">{{item.activityTitle}}</view>
			</view>
		</view>
		<!-- <view class="shop-activity-banner">
			<view class="imgbox">
				<image class="big-img" src="/static/img/index2/top_banner.png" mode="aspectFill"></image>
				<view class="masking1"></view>
				<view class="txt">
					<view class="classification">美食排行榜</view>
					<view class="tip">按过去30天店铺综合流量排序·每天9:00更新</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props:{
			// 店铺编号
			shopId:{ 
				type:[Number,String],
				default:''
			},
		},
		data() {
			return {
				activityList:[], //活动jiji'he集合	
			}
		},
		created() {
			this.queryActivityList();
		},
		methods: {
			queryActivityList:function(){
				let url = '/memberapi/api/activity/shopActivityList.do';
				let data = {
					shopId:this.shopId,
				};
				var that = this;
				this.request.get(url, data).then(res => {
					that.activityList = res.list;
					for (let item of that.activityList) {
						item.imagePath = this.util.formatImagePaths(item.imagePath);
						//console.log("item.imagePath = ", item.imagePath);
					}
				})
			} 
		}
	}
</script>

<style>
	.shop-activity-banner .imgbox {
	    position: relative;
	    overflow: hidden;
		padding-bottom: 10rpx;
		background-color: #FFFFFF;
	}
	.shop-activity-banner .big-img {
	    width: 100%;
	    height: 374rpx;
	}
	
	.shop-activity-banner .masking {
		width: 100%;
		height: 33px;
		line-height: 33px;
		background: rgba(0, 0, 0, 0.2);
		position: absolute;
		bottom: 16rpx;
		z-index: 1;
		left: 0;
		padding-left: 7px;
		border-radius: 0px 0px 7px 7px;
		color: #FFFFFF;
		font-size: 28rpx;
	}
	
	.masking1{
		width: 100%;
		height: 374rpx;
		line-height: 374rpx;
		background: rgba(0, 0, 0, 0.2);
		position: absolute;
		bottom: 16rpx;
		z-index: 1;
		left: 0;
	}
	
	.txt{
		width:100%;
		z-index:999;
		text-align: center;
		display: inline-block;
		top:158rpx;
		left:0;
		padding:0 95rpx;
		position: absolute;
		z-index: 3;
	}
	.txt .classification{
		font-size:54rpx;
		font-weight:650;
		color:#FFF9DA;
		margin-bottom:14rpx;
	}
	.txt .tip{
		font-size:28rpx;
		color:#E7E3CE;
	}
</style>
