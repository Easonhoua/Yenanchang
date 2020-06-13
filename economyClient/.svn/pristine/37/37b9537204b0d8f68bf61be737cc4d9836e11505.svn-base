<template>
	<view class="layout">
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback">
			<!-- <view> -->
				<view class="consultDetail-top">
					<view class="consultDetail-top-content">
						<view class="consultDetail-title wonder-mulit-limit">{{informationData.title}}</view>
						<view class="consultDetail-base">
							<text class="consult-date font-10">{{informationData.createTime}}</text>
							<text> | </text>
							<text class="consult-news font-12 consult-detail">阅读 {{informationData.pageview}}</text>
						</view>
					</view>
				</view>
				<!-- 第一部分结束 -->
				<view class="detail-content">
					<view v-if="informationData.videoPath" class="videobox">
						<video :src="informationData.videoPath" class="videowidth"></video>
					</view>
					<view v-else>
						<view class="banner" style="top: 0;margin-top: 0;">
							<!-- <swiper class="swiper" indicator-dots circular indicator-color="#FFFFFF"
							 indicator-active-color="#267EFF" :interval="3000" :duration="1000">
								<swiper-item v-for="(item,index) in 1" :key="index"> -->
							<image class="image" :src="informationData.thumbnailPath" style="width: 100%;height: 343rpx;"></image>
								<!-- </swiper-item>
							</swiper> -->
						</view>
					</view>
					<rich-text :nodes="informationData.htmlContent"></rich-text>
				</view>
				
				<!-- <view class="likes">
					<view class="likesbtn">
						<image class="loveimg" src="../../../static/img_new/topic/h_tl_sc_pre.png"></image>
						<text class="likenum">23人喜欢</text>
					</view>
					<view class="likesPerson">
						<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
						<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
						<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
						<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
						<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
						<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
					</view>
				</view> -->
				<!-- 详情结束 -->
				<view class="divid-line"></view>
				 
				<commentComponent ref="myComment" :relationId="informationId" :commentType="4" :commentNum="informationData.commentNum"></commentComponent>
				
				<!--点赞、评论、分享-->
				<comment-navi ref='commentNavi' :relationId="informationId" :goodType="4" :likeNum="informationData.likeNum" :commentNum="informationData.commentNum" :canFavorite="informationData.canFavorite" :canGoodInfo="informationData.canGoodInfo"  @refresComment="refresComment"></comment-navi>
			<!-- </view> -->
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import commentComponent from '@/components/commentList-component/commentList-component.vue';
	import commentNavi from "@/components/commentList-component/comment-navi.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			commentComponent,
			commentNavi
		},
		data() {
			return {
				mescroll : '',
				clickIndex:0, //点击列表进来的index
				informationId:0,
				informationData:{},
			}
		},
		onLoad(e){
			if(e.informationId){
				this.informationId = e.informationId;
			}
			if(e.clickIndex){
				this.clickIndex = event.clickIndex;
			}
			this.queryInfoDetail(this.informationId);
			// this.$refs.myComment.queryCommentData(mescroll,this.informationId ,4);
			// this.$refs.myComment.commentList=[];
		},
		onReady() {
			// this.$refs.myComment.queryCommentData(mescroll,this.informationId ,4);
		},
		onShow() {
			// this.$refs.myComment.queryCommentData(mescroll,this.informationId ,4);
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.$refs.myComment.commentList=[];
				this.mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				this.queryInfoDetail(this.informationId);
				this.$refs.myComment.queryCommentData(mescroll,this.informationId ,4);
			},
			queryInfoDetail:function(informationId){
				let url = '/memberapi/api/information/read.do';
				let that = this;
				let data = {
					informationId: that.informationId, //资讯编号
				};
				
				that.request.get(url, data).then(res => {
					console.log(res)
					if(res.returncode == 0){
						if(res.data.createTime){
							res.data.createTime = res.data.createTime.toString().substring(0,10);
						}
						if(res.data.thumbnailPath){
							res.data.thumbnailPath = that.util.formatImagePath(res.data.thumbnailPath)
						}
						if(res.data.videoPath){
							res.data.videoPath = that.util.formatImagePath(res.data.videoPath)
						}
						that.informationData = res.data;

						that.informationData.htmlContent = that.informationData.htmlContent.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"');
						that.informationData.htmlContent = that.informationData.htmlContent.replace(/\width: (\d*)px/g,'');
						that.informationData.htmlContent = that.informationData.htmlContent.replace(/\height: (\d*)px/g,'');
					}
				});
			},
			refresComment: function(obj){
				this.informationData.commentNum = obj.commentNum;
				this.informationData.likeNum = obj.likeNum;
				if(obj.canGoodInfo){
					this.informationData.canGoodInfo =obj.canGoodInfo;
				}
				if(obj.canFavorite){
					this.informationData.canFavorite =obj.canFavorite;
				}
				this.downCallBack(this.mescroll);
			},
		},
		onNavigationBarButtonTap(e){
			this.$refs.commentNavi.shareButtonClick()
		}
	}
</script>

<style lang="scss">
	.layout{
		padding-bottom: 200rpx;
	}
		
	.consultDetail-top{
		width: 750rpx;
	}
	.consultDetail-top-content{
		margin: 30rpx 30rpx 30rpx 30rpx;
	}
	.consultDetail-title{
		width: 693rpx;
		font-size: 40rpx;
		color: #333333;
		font-weight: 900;
	}
	.consultDetail-base{
		color: #999999;
		margin-top: 30rpx;
		font-size: 28rpx;
	}
	.consult-date{
		margin-right: 20rpx;
	}
	.consult-news{
		margin-left: 20rpx;
		color: #999999;
	}
	.detail-content{
		margin: 30rpx 30rpx 40rpx 30rpx;
		font-size: 32rpx;
		color: #4A4A4A;
		line-height: 50rpx;
	}
	.detail-content img{
		width: 690rpx;
		height: 240rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	.wonder-mulit-limit{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		max-width: 693rpx;
	}
	.divid-line{
		height: 22rpx;
	}
	
	.likes{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 80rpx;
		padding-bottom: 50rpx;
		border-bottom: 1rpx solid #eeeeee;
		.likesbtn{
			width: 234rpx;
			height: 80rpx;
			border-radius: 40rpx;
			background: #eeeeee;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 48rpx;
			.loveimg{
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
			.likenum{
				color: #F24724;
				font-size: 32rpx;
			}
		}
		
	}
	.likesPerson{
		// width: 100%;
		display: flex;
	
		.personitemimg{
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			margin-left: -10rpx;
		}
	}
	// .videobox{
	// 	width: 100%;
	// 	height: 320rpx;
	// 	// position: relative;
	// }
	.videowidth{
		// position: relative;
		// top: 0rpx;
		// left: 0rpx;
		width: 100%;
	}
</style>
