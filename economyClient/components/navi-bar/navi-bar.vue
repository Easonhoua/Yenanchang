<template>
	<view class="navi-bar">
		<view class="status-bar"></view>
		<view class="navi-bar navi-bar1">
			<image class="navi-bar-back" src="/static/img/common/icon_back.png" @click="back"></image>
			<view v-if="title" class="navi-bar-title">{{title}}</view>
			<view class="right-buttons">
				<image v-if="showFavoriteButton==true" class="right-buttons-item" :src="theIsFavorite?'/static/img/common/icon_favorite_yes.png' : '/static/img/common/icon_favorite_no.png' "
				 @click="favoriteWithData"></image>
				<image v-if="showShareButton" class="right-buttons-item" src="/static/img/common/icon_share.png" @click="shareButtonClick"></image>
			</view>
		</view>

		<!-- 分享弹出窗 -->
		<view v-if="showShareView" class="back-view" @click="cancelShare">
			<view class="bottom-view">
				<view class="text-detail" style="margin-top: 30rpx;">分享到</view>
				<view class="share-view">
					<view class="share-item" v-for="(item,index) in shareList" :key="index" @click="shareItemClick(item)">
						<image class="share-item-image" :src="item.image"></image>
						<view class="text-detail">{{item.title}}</view>
					</view>
				</view>
				<view class="cancel-button text-edit" @click="cancelShare">取消分享</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			// 头部标题，默认不显示标题，如果要显示标题，需要传入
			title:{
				type: String,
				default: ""
			},
			// 是否显示收藏按钮，默认显示
			showFavoriteButton: {
				type: Boolean,
				default () {
					return true
				}
			},
			// 是否显示分享按钮，默认显示
			showShareButton: {
				type: Boolean,
				default () {
					return true
				}
			},
			// 是否已经收藏，默认没有收藏
			isFavorite: {
				type: Boolean,
				default () {
					return false
				}
			},
			// 收藏的关联ID，收藏店铺的话传店铺ID,有收藏功能的话必填
			relationId: {
				type: [Number, String],
				default: 0
			},
			// 收藏类型(1:店铺、2:评价、3:攻略、4:资讯、5:精彩、11:线路)，有收藏功能的话必填
			favoriteType: {
				type: String,
				default: "1"
			},
			// 分享的内容
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
		},

		data() {
			return {
				theIsFavorite: false,
				showShareView: false,
				shareList: []
			};
		},
		watch: {
			isFavorite(newIsFavorite, oldIsFavorite) {
				this.theIsFavorite = newIsFavorite;
			}
		},
		created() {
			//console.log("this.showShareButton === ", this.showShareButton);
			this.theIsFavorite = this.isFavorite;
		},
		methods: {
			back: function() {
				uni.navigateBack({})
			},
			favoriteWithData: function() {

				if (this.request.alreadyLogin()) {
					if (this.theIsFavorite) {
						var url = "/memberapi/api/userFavorite/cancel.do";
						var data = {
							relationId: this.relationId,
							favoriteType: this.favoriteType
						}
						this.request.post(url, data).then(res => {
							//console.log("resres =", res);
							this.theIsFavorite = false;
						})
					} else {
						var url = "/memberapi/api/userFavorite/add.do";
						var data = {
							relationId: this.relationId,
							favoriteType: this.favoriteType
						}
						this.request.post(url, data).then(res => {
							//console.log("resres =", res);
							this.theIsFavorite = true;
						})
					}
				}
			},
			setupShareItem: function(provider, title, scene) {
				var item = {
					provider: provider,
					scene: scene,
					title: title,
					image: "/static/img/share/" + scene + ".png"
				}
				return item;
			},
			shareButtonClick: function() {
				// this.compressImage();
				var self = this;
				uni.getProvider({
					service: "share",
					success: function(res) {
						//H5测试，真机调试或者打包时需要注释掉
						// res.provider = ["weixin", "qq", "sinaweibo"];
						//console.log("resres == ", res);
						self.showShareView = true;
						self.shareList = [];
						if (res.provider.length == 0) {
							res.provider = ["weixin", "qq"];
						}
						for (var i = 0; i < res.provider.length; i++) {
							var item = res.provider[i];
							if (item == 'weixin') {
								self.shareList.push(self.setupShareItem("weixin", "微信", "WXSceneSession"));
								self.shareList.push(self.setupShareItem("weixin", "朋友圈", "WXSenceTimeline"));
							}
							if (item == 'sinaweibo') {
								self.shareList.push(self.setupShareItem("weibo", "微博", "weibo"));
							}
							if (item == 'qq') {
								self.shareList.push(self.setupShareItem("qq", "qq", "qq"));
								// 不能直接分享到QQ空间，可以分享到QQ，然后在QQ的界面里选择QQ空间。
								// self.shareList.push(self.setupShareItem("zone","qq空间"));
							}
						}

					}
				})
			},
			cancelShare: function() {
				this.showShareView = false;
			},
			shareItemClick: function(item) {
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				var route = page.route;
				this.shareData.url = this.request.getBaseUrl() + "/wxapp/" + route + "?shopId=" + this.relationId;
				// if (uni.getSystemInfoSync().platform == "android" && item.scene == 'qq') {
				// 	this.shareData.imageUrl = "/static/img/common/icon_logo.png";
				// }
				uni.share({
					provider: item.provider,
					scene: item.scene, //provider 为 weixin 时必选
					type: item.scene == 'qq' ? 1 : 0,//0为图文，微信和微博时才支持，qq不支持
					href: this.shareData.url,
					title: this.shareData.title,
					summary: this.shareData.summary,
					imageUrl: this.shareData.imageUrl,//图片大于20kb时不显示,推荐使用小于20Kb的图片
					success: function(res) {
						//console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						//console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// 压缩图片的大小（不支持网络图片）
			compressImage: function() {
				// #ifdef APP-PLUS
				plus.zip.compressImage({
						src: "https://ye.ncnews.com.cn/storage/shop/10594/info/logo_500.jpg",
						// dst: "_doc/a.jpg",
						quality: 20
					},
					function(event) {
						//console.log("eventeventevent = ",event);
						alert("Compress success!");
					},
					function(error) {
						//console.log("errorerrorerrorerror = ",error);
						alert("Compress error!");
						
					});
				// #endif
			}

		}

	}
</script>

<style>
	.navi-bar {
		width: 100vw;
		/* #ifdef APP-PLUS */
		height: var(--status-bar-height);
		/* #endif */
		/* #ifdef H5 */
		/* height: 88rpx; */
		/* #endif */
		z-index: 7;
		position: fixed;
	}

	.status-bar {
		position: fixed;
		height: var(--status-bar-height);
		width: 100vw;
		z-index: 8;
	}

	.navi-bar1 {
		width: 100vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: var(--status-bar-height);
		/* height: var(--window-top); */
		height: 88rpx;
		z-index: 9;
		padding-right: 30rpx;
		margin-bottom: 300rpx;
	}

	.navi-bar-back {
		width: 75rpx;
		height: 60rpx;
		padding: 15rpx;
		padding-left: 30rpx;
	}
	.navi-bar-title{
		width: 360rpx;
		height: 88rpx;
		margin-left: 100rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 32rpx;
		color: #000000;
	}

	.right-buttons {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* padding-right: 15rpx; */
		justify-content: space-between;
		z-index: 10;
	}

	.right-buttons-item {
		width: 68rpx;
		height: 80rpx;
		padding: 20rpx 15rpx 20rpx 15rpx;
		z-index: 11;
		margin-right: 10rpx;
	}

	.back-view {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
		z-index: 9999;
	}

	.bottom-view {
		position: fixed;
		margin-top: auto;
		width: 750rpx;
		bottom: 0rpx;
		z-index: 10000;
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
