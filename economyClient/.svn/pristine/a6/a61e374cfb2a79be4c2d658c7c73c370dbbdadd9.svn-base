<!--评论列表-->
<template>
	<view>
		<view class="review">
			<view class="review-dis" >
				<!-- <view></view> -->
				<view class="review-title">
					<view class="review-about-line"></view>
					<text class="review-about">相关评论</text>
					<view class="review-about-line"></view>
				</view>
				
				<view v-if="commentList && commentList.length > 0">
					<view class="list-item" v-for="(commentData,index) in commentList" :key="index">
						<view>
							<image class="review-photo" :src="util.formatImagePath(commentData.photo)"></image>
							<text class="review-name font-14">{{commentData.nick}}</text>
							<text class="review-dznum font-14">{{commentData.goodCount}}</text>
							<block v-if="commentData.commentId">
								<image class="review-dz" :src="commentData.canGoodInfo==2?'/static/img/index/dz_yes.png' : '/static/img/index/dz.png'"  @tap="addGoodInfo(commentData,index)"></image>
							</block>
						</view>
						<view class="review-content">{{commentData.commentRemark}}</view>
						<!-- 评论回复以后完善
						<view>
							<view class="hot-review">热评</view>
							<text class="review-date">10月27日</text>
							<text class="reply-tip">回复</text>
						</view>
						<view class="reply-content">
							<text class="reply-name">明天会更好：</text>
							<text class="reply-tip">哈哈，凌乱了哈哈，凌乱了哈哈，凌乱了哈哈，凌乱了哈哈，凌乱了</text>
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var utils = require('@/common/js/util.js');
	export default {
		props:{
			// 关联编号
			relationId: {
				type: [Number, String],
				default: 0
			},
			//评价类型
			commentType:{
				type:Number,
				default:0
			},
			//评论数
			commentNum:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
				theIsFavorite:false,
				commentList:[],
				shareData: {
					type: Object,
					default () {
						return {
							title: "ye南昌",
							url: "https://vr.chinavryan.com/tour/35c8ddf4cf676fad",
							imageUrl: "",
							summary: "我在南昌，我正在使用ye南昌App，下载ye南昌App,让你爱上南昌！"
						}
					}
				}
			}
		},
		methods: {
			queryCommentData(mescroll,relationId,commentType){
				let url = '/memberapi/api/comment/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					relationId: relationId, //
					commentType:commentType
				};
				var that = this;
				this.request.get(url, data,mescroll).then(res => {
					const newData = res.list;
					if(res.list.length === 0 || mescroll.num === 1)  that.commentList = [];
					that.commentList = that.commentList.concat(newData); //追加新数据
					console.log(that.commentList)
				});
				
			},
			//点赞
			addGoodInfo:function(item,index){
				if(this.request.alreadyLogin()){
					let url = '/memberapi/api/goodInfo/add.do';
					let data = {
						relationId: item.commentId,
						goodType:10,  
					};
					if(item.canGoodInfo ==1){ //添加点赞
						url = '/memberapi/api/goodInfo/add.do';
					}else{ //取消点赞
						url = '/memberapi/api/goodInfo/cancel.do';
					}
					var that = this;
					this.request.post(url, data).then(res => {
						if (res.returncode === 0 && item.canGoodInfo ==1) {
							that.request.toastTips("点赞成功");
							that.commentList[index].canGoodInfo =2;
							that.commentList[index].goodCount++;
						}else{
							that.request.toastTips("取消点赞");
							that.commentList[index].canGoodInfo =1;
							that.commentList[index].goodCount--;
						}
					})
				}
			},
		}
	}
</script>

<style>
	.list-cell-more{
		display: flex;
		font-size: 32rpx;
		color: #4A4A4A;
		padding-top: 24rpx;
	}
	.list-cell-more-image{
		margin-left: auto;
		width: 24rpx;
		height: 30rpx;
		margin-right: 20rpx;
	} 
	.review{
		width: 750rpx;
		/* border-bottom: 3rpx solid #F2F2F2; */
		/* padding-bottom: 100rpx; */
	}
	.review-dis{
		margin: 40rpx 30rpx 30rpx 30rpx;
		/* background-color: #0000FF; */
	}
	.review-title{
		text-align: center;
	}
	.review-about{
		font-size: 32rpx;
		color: #4A4A4A;
		margin-left: 16rpx;
		margin-right: 16rpx;
		vertical-align: middle;
	}
	.review-about-line{
		height: 3rpx;
		width: 94rpx;
		background-color: #979797;
		display: inline-block;
		vertical-align: middle;
	}
	.review-photo{
		width:66rpx;
		height:66rpx;
		display: inline-block;
		
		margin-top:4rpx;
		vertical-align: middle;
		margin-right: 20rpx;
	}
	.review-dz{
		width:46rpx;
		height:46rpx;
		display: inline-block;
		margin-left:20rpx;
		margin-top:14rpx;
		position: absolute;
		right:32rpx;
		vertical-align: middle;
	}
	.review-name{
		color: #989898;
		vertical-align: middle;
	}
	.review-dznum{
		color: #545454;
		position: absolute;
		right: 90rpx;
		vertical-align: middle;
		margin-top: 20rpx;
	}
	.review-content{
		margin: 10rpx 0 20rpx 86rpx;
		font-size: 28rpx;
		color: #4A4A4A;
	}
	.hot-review{
		width: 65rpx;
		height: 30rpx;
		border-radius: 6rpx;
		background-color: #E96E6E;
		font-size: 20rpx;
		color: #FFFFFF;
		margin-left: 86rpx;
		display: inline-block;
		text-align: center;
	}
	.review-date{
		font-size: 24rpx;
		color: #989898;
		margin-left: 30rpx;
		margin-right: 50rpx;
	}
	.reply-tip{
		font-size: 24rpx;
		color: #000000;
	}
	.reply-content{
		width: 600rpx;
		margin: 30rpx 30rpx 30rpx 86rpx;
		padding: 10rpx 10rpx 20rpx 10rpx;
		background-color: #E8EBF2;
		border-radius: 10rpx;
	}
	.reply-name{
		color: #989898;
		font-size: 24rpx;
		margin-left: 23rpx;
		vertical-align: middle;
	}
	.send-reply-logo{
		width:46rpx;
		height:46rpx;
		display: inline-block;
		margin-left:20rpx;
		margin-top:4rpx;
	}
</style>
