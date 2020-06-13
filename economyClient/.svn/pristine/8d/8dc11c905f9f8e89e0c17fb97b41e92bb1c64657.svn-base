<!--话题首页-->
<template>
	<view class="layout column">
		<!--话题-->
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback" top="78">
			<view class="col-tabcon">
				<view class="sub-banner">
					<image class="img" src="/static/img/index/topic_banner.png" mode="aspectFill"></image>
				</view>
				<view class="hotdiscuss" v-if="topicList != null && topicList.length > 0">
					<view class="title" style="margin-left: -30rpx;margin-top: -45rpx;margin-bottom: 5rpx;" @tap="toList">火热参与</view>
					<view class="hotdiscuss-bd" >
						<view class="item box-shadow" v-for="(item,index) in topicList" :key="index" v-on:click.stop="topicView(item)">
							<view class="imgbox" ><image class="img"  mode="aspectFill" :src="item.thumbnailPath"></image></view>
							<view class="txt" style="padding: 0rpx 12rpx;">{{item.topicTitle}}</view>
							<view class="number" style="padding-bottom: 20rpx;">{{item.attendNum}}参与</view>
						</view>
					</view>
				</view>
				<text class="title">为你推荐</text>
				<view class="list-cell" v-for="(item,index) in topicDynamicList" :key="index"  @tap="topicDynamicview(item,index)">
					<view class="inner">
						<view class="user">
							<!-- <text class="gz">+关注</text> -->
							<image class="img" :src="util.formatImagePath(item.photo)" mode="aspectFill">
								<view class="right-txt">
									<!-- <label class="label">{{item.gradeName}}</label> -->
									<view class="line-h"><text class="name">{{item.nick}}</text></view>
									<text class="time">{{item.publishTime}}</text>
								</view>
						</view>
						<view class="txt">
							<text style="color: #31A2F8;" v-on:click.stop="topicView(item)">#{{item.topicTitle}}#</text> {{item.dynamicRemark}}
						</view>
						<view v-if="item.dynamicImg && item.dynamicImg.length >1" class="imgbox">
							<view  v-for="(itemImage,indexImage) in item.dynamicImg" :key="indexImage">
								<!-- <image class="img" v-if="itemImage.filePath_220" :src="request.getBaseImagePath()+itemImage.filePath_220"></image>
								<image class="img" v-else :src="request.getBaseImagePath()+itemImage.filePath"></image> -->
								<!--  style="margin-right: 20rpx;"-->
								<image class="img" :src="itemImage" mode="aspectFill"></image>
							</view>
						</view>
						
						<view v-if="item.dynamicImg && item.dynamicImg.length == 1" class="imgboxbig">
							<image class="img" :src="item.dynamicImg[0]" mode="widthFix"></image>
						</view>
						<!--点赞、评论、分享-->
						<topic-navi @refreshTopic="refreshTopic" :clickIndex="index" :topicDynamic="item"></topic-navi>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import topicNavi from "@/pages/topic/topic-navi.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			topicNavi
		},
		props:{
			//查询关键字
			keyword:{
				type:String,
				default:""
			},
		},
		data() {
			return {
				mescroll: '',
				topicDynamicList: [], //最新话题动态
				topicList:[], //火热参与的话题
			}
		},
		methods: {
			//最火热的话题 前3条数据
			queryHotTopicList:function(){
				const url = '/memberapi/api/topic/hotTopicList.do';
				let data = {
					pageNo:1,
					pageSize: 3,
					topicTitle:this.keyword,
				};
				var that = this;
				this.request.get(url, data).then(res => {
					let newData = res.list;
					newData.forEach(item => {
						if(item.thumbnailPath){
							item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
						}
						
					});
					this.topicList = newData; //追加新数据
				})
			},
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				this.topicDynamicList = [];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				this.queryHotTopicList();
				
				//获取最新的话题信息
				const url = '/memberapi/api/topicDynamic/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					dynamicRemark:this.keyword,
				};
				var that = this;
				this.request.get(url, data, mescroll).then(res => {
					let newData = res.list;
					newData.forEach(item => {
						if(item.dynamicImg){
							item.dynamicImg = this.util.formatImagePaths(item.dynamicImg);
						}
						if (item.publishTime) {
							item.publishTime = this.util.formatMinutesDay(item.publishTime.replace(/-/ig, "/"));
						}
					});
					if (res.list.length === 0 || this.mescroll.num === 1) this.topicDynamicList = [];
					this.topicDynamicList = this.topicDynamicList.concat(newData); //追加新数据
				})
			},
			//话题列表
			toList: function() {
				uni.navigateTo({
					url:"/pages/topic/topicHall"
				})
			},
			topicDynamicview:function(item,index){
				uni.navigateTo({
					url: "/pages/topic/topicdynamicView?dynamicId=" + item.dynamicId+"&clickIndex="+index
				})
			},
			refreshTopic: function(obj){
				this.topicDynamicList[obj.clickIndex].canGoodInfo = obj.canGoodInfo;
				this.topicDynamicList[obj.clickIndex].attendNum = obj.attendNum;
			},
			//动态评论修改当前评论数
			updateTopicDynamicList:function(clickIndex){
				this.topicDynamicList[clickIndex].commentNum = this.topicDynamicList[clickIndex].commentNum+1;
			},
			//话题详情
			topicView:function(item){
				uni.navigateTo({
					url:'/pages/topic/topicview?topicId='+item.topicId
				})
			}
		}

	}
</script>

<style>
	.hotdiscuss{
		padding:30rpx;
		
	}
	.hotdiscuss .title{
		font-size:32rpx;
		font-weight:650;
		position: relative;
		height:88rpx;
		line-height:88rpx;
		margin-bottom:15rpx;
		display: flex;
	}
	.hotdiscuss .title:after{
		width:26rpx;
		height:26rpx;
		content: " ";
		background: url(../../static/img/common/right-choose-arrow.png) no-repeat;
		background-size:26rpx 26rpx ;
		position: absolute;
		right:0;
		top:50%;
		margin-top:-10rpx;
	}
	.hotdiscuss .hotdiscuss-bd{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.hotdiscuss .hotdiscuss-bd .item{
		/* flex: 1; */
		width: 218rpx;
		text-align: center;
	}
	.hotdiscuss .hotdiscuss-bd .item .imgbox{
		width:100%;
		margin-bottom:10rpx;
	}
	.hotdiscuss .hotdiscuss-bd .item .imgbox .img{
		/* width:218rpx; */
		height:230rpx;
		display: inline-block;
	}
	.hotdiscuss .hotdiscuss-bd .item .txt{
		font-size:28rpx;
		line-height: 36rpx;
		/* height:70rpx; */
		height: 74rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		/* margin-top: 6rpx; */
		margin-bottom:6rpx;
	}
	.hotdiscuss .hotdiscuss-bd .item .number{
		font-size:24rpx;
		color:#BABABA;
	}
</style>
