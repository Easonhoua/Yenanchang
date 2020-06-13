<!--话题首页-->
<template>
	<view class="layout column">
		<view class="interact">
			<view class="item"  v-on:click.stop="addGoodInfo">
				<image class="img" :src="topicDynamic.canGoodInfo ==1?'/static/img/index/dz.png' : '/static/img/index/dz_yes.png' ">{{topicDynamic.attendNum}}
			</view>
			<view class="item"  v-on:click.stop="topicDynamicview">
				<image class="img" src="/static/img/index/pl.png">{{topicDynamic.commentNum}}
			</view>
			<view class="item">
				<image class="img" src="/static/img/index/fx.png" v-on:click.stop="shareButtonClick">
			</view>
		</view>
		<!-- 分享弹出窗 -->
		<view v-if="showShareView" class="back-view" v-on:click.stop="cancelShare">
			<view class="bottom-view">
				<view class="text-detail" style="margin-top: 30rpx;">分享到</view>
				<view class="share-view">
					<view class="share-item" v-for="(item,index) in shareList" :key="index" @click="shareItemClick(item)">
						<image class="share-item-image" :src="item.image"></image>
						<view class="text-detail">{{item.title}}</view>
					</view>
				</view>
				<view class="cancel-button text-edit" v-on:click.stop="cancelShare">取消分享</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			//第几条数据
			clickIndex:{
				type:Number,
				default:0,
			},
			// 话题动态
			topicDynamic: {
				type: Object,
				default :[],
			},
		},
		data() {
			return {
				showShareView:false,
				shareList:[],
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
			//点赞
			addGoodInfo:function(){
				let url = '/memberapi/api/goodInfo/add.do';
				let data = {
					relationId: this.topicDynamic.dynamicId,
					goodType:6, //话题动态
				};
				if(this.topicDynamic.canGoodInfo ==1){ //添加收藏
					url = '/memberapi/api/goodInfo/add.do';
				}else{ //取消收藏
					url = '/memberapi/api/goodInfo/cancel.do';
				}
				var that = this;
				this.request.post(url, data).then(res => {
					let attendNumValue = that.topicDynamic.attendNum;
					let canFavoriteValue = 1;
					if (res.returncode === 0 && that.topicDynamic.canGoodInfo ==1) {
						that.request.toastTips("点赞成功");
						canFavoriteValue = 2;
						attendNumValue++;
					}else{
						that.request.toastTips("取消点赞");
						attendNumValue--;
						canFavoriteValue = 1;
					}
					let item = {
						canGoodInfo:canFavoriteValue,
						attendNum:attendNumValue,
						clickIndex:that.clickIndex,
					}
					that.$emit('refreshTopic', item);
				})
			},
			//分享
			setupShareItem:function(provider,title,scene){
				var item = {
					provider : provider,
					scene : scene,
					title : title,
					image : "/static/img/share/"+scene+".png"
				}
				return item;
			},
			shareButtonClick:function(){
				var self = this;
				uni.getProvider({
					service:"share",
					success:function(res){
						//H5测试，真机调试或者打包时需要注释掉
						res.provider = ["weixin", "qq"];
						self.showShareView = true;
						self.shareList = [];
						for (var i = 0; i < res.provider.length; i++) {
							var item = res.provider[i];
							if(item == 'weixin'){
								self.shareList.push(self.setupShareItem("weixin","微信","WXSceneSession"));
								self.shareList.push(self.setupShareItem("weixin","朋友圈","WXSenceTimeline"));
							}
							if (item == 'qq'){
								self.shareList.push(self.setupShareItem("qq","qq","qq"));
								// 不能直接分享到QQ空间，可以分享到QQ，然后在QQ的界面里选择QQ空间。
								// self.shareList.push(self.setupShareItem("zone","qq空间"));
							}
						}
						
					}
				})
			},
			cancelShare:function(){
				this.showShareView = false;
			},
			shareItemClick:function(item){
				this.shareData.title = this.topicDynamic.topicTitle;
				this.shareData.summary = this.topicDynamic.dynamicRemark;
				this.shareData.imageUrl = "";
				if (this.topicDynamic.dynamicImg) {
					this.topicDynamic.dynamicImg = this.util.formatImagePaths(this.topicDynamic.dynamicImg);
					this.shareData.imageUrl = this.topicDynamic.dynamicImg[0];
				}
				
				 
				this.shareData.url = this.request.getBaseUrl() + "/wxapp/pages/topic/topicdynamicView?dynamicId=" + this.topicDynamic.dynamicId;
				//console.log("this.shareData = ", this.shareData);
				//console.log("this.shareData.url = ", this.shareData.url);
				uni.share({
				    provider: item.provider,
				    scene: item.scene,//provider 为 weixin 时必选
				    type: 0,
					href: this.shareData.url,
					title: this.shareData.title,
					summary: this.shareData.summary,
					imageUrl: this.shareData.imageUrl,
				    success: function (res) {
				        //console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        //console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			//评论
			topicDynamicview:function(){
				uni.navigateTo({
					url: "/pages/topic/topicdynamicView?dynamicId=" +this.topicDynamic.dynamicId
				})
			},
		}
	}
</script>
<style>
	.back-view {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
		z-index: 12;
	}

	.bottom-view {
		position: fixed;
		margin-top: auto;
		width: 750rpx;
		/* #ifdef APP-PLUS */
		bottom: 2rpx;
		/* #endif */
		/* #ifdef H5 */
		bottom: 90rpx;
		/* #endif */
		z-index: 100;
		background-color: #FFFFFF;
		text-align: center;
	}

	.share-view {
		width: 750rpx;
		padding: 60rpx 0rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.share-item {
		width: 150rpx;
		height: 150rpx;
	}

	.share-item-image {
		width: 100rpx;
		height: 100rpx;
		padding: 10rpx;
	}

	.cancel-button {
		border-top: 2rpx solid #F5F5F5;
		width: 750rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		/* padding-top: 12rpx; */
		/* padding-bottom: 20rpx; */
		bottom: 20rpx;
	}
</style>
