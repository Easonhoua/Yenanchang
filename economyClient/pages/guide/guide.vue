<template>
	
	<view class="layout column">
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback" top="80">
			<column-swiper :info="infoSwiperList" @toDetail="toDetail"></column-swiper>

			<view class="col-tabcon">
				<view class="consult-list" v-for="(item,index) in guideList" :key="index" @tap="toDetail(item.guideId,index)">
					<view class="consult-list-dis">
						<view class="consult-list-left">
							<view class="list-describe text-two-line-hide">{{item.guideTitle}}</view>
							<view class="list-shop">{{item.guideTypeName}}</view>
							<view class="consult-base">
								<image class="list-user-img" :src="item.photo" mode="aspectFill"></image>
								<text class="list-date">{{item.userName}}</text>
								<text class="list-date">浏览 {{item.pageview}}</text>
								<text class="list-date">赞 {{item.likeNum}}</text>
							</view>
						</view>
						<image class="consult-list-right" :src="item.thumbnailPath" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 添加按钮 -->
				<!-- <view class="add-btn" @tap="addGuide">
					<text>+</text>
				</view> -->
			</view>
		</mescroll-body>
	</view>
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
				infoSwiperList: [],
				mescroll: '',
				guideList: [],
			}
		},
		methods: {
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				this.guideList = [];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				//获取菜品信息列表
				let url = '/memberapi/api/guide/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
				};
				var that = this;
				this.request.get(url, data, mescroll).then(res => {
					const newData = res.list;
					let ii = 0;
					that.infoSwiperList= []
					newData.forEach(item => {
						item.photo = this.util.formatImagePath(item.photo);
						if (item.thumbnailPath) {
							item.thumbnailPath = this.util.formatImagePaths(item.thumbnailPath)[0];
							//抬头图
							if (this.mescroll.num === 1 && that.infoSwiperList.length <= 4) {
								var infoSwiper = [{
									"id": item.guideId,
									"content": item.guideTitle,
									"url": item.thumbnailPath
								}];
								
								that.infoSwiperList = that.infoSwiperList.concat(infoSwiper);
							}
						}
						ii++;
					});
					if (res.list.length === 0 || this.mescroll.num === 1) this.guideList = [];
					this.guideList = this.guideList.concat(newData); //追加新数据
				})
			},
			toDetail: function(guideId, index) {
				if(index){
					this.guideList[index].pageview++;
				}
				uni.navigateTo({
					url: '/pages/strategy/strategyDetail?guideId='+guideId
				});
			},
			addGuide: function() {

			},
			//详情修改点赞数 列表跟着一起修改
			updateLikeNumList:function(clickIndex,likeNum){
				this.guideList[clickIndex].likeNum =likeNum;
			}			
		}
	}
</script>

<style>
	.grey-distance {
		width: 100%;
		height: 20rpx;
		background-color: #F2F2F2;
	}

	.strategy-content {
		font-size: 32rpx;
		color: #333333;
	}

	.strategy-top {
		margin-left: 90rpx;
	}

	.consult-list {
		width: 750rpx;
		/* height: 230rpx; */
		min-height: 230rpx;
		border-bottom: 2rpx solid #F2F2F2;
	}

	.consult-list-dis {
		margin: 30rpx 30rpx 30rpx 33rpx;
		background-color: #007AFF;
	}

	.list-describe {
		font-size: 32rpx;
		color: #000000;
		line-height: 46rpx;
		font-weight: bold;
		/* background-color: #1CBBB4; */
		/* white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden; */
	}

	.consult-base {
		margin-top: 10rpx;
	}

	.consult-list-left {
		width: 480rpx;
		height: 200rpx;
		float: left;
		position: absolute;
	}

	.consult-list-right {
		width: 197rpx;
		height: 193rpx;
		border-radius: 15rpx;
		float: right;
	}

	.list-user-img {
		width: 46rpx;
		height: 46rpx;
		margin-right: 20rpx;
		display: inline-block;
		vertical-align: middle;
		background-color: #F5F5F5;
		border-radius: 100rpx;
	}

	.list-date {
		font-size: 24rpx;
		color: ##6B6B6B;
		margin-right: 40rpx;
		vertical-align: middle;
	}

	.list-shop {
		font-size: 28rpx;
		color: #B1B1B1;
		margin-top: 10rpx;
	}

	.curr-goods {
		margin: 20rpx 6rpx 0 6rpx;
		display: inline-block;
	}

	.curr-goods image {
		width: 218rpx;
		height: 158rpx;
	}

	.add-btn {
		float: right;
		width: 100rpx;
		height: 100rpx;
		/* 控制div的位置,固定在屏幕左下角 */
		position: fixed;
		right: 30rpx;
		bottom: 160rpx;
		/* 控制div内容位置 */
		display: flex;
		align-items: center;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
		border-radius: 50%;
		background-color: #007AFF;
		color: #FFFFFF;
		font-size: 50rpx;
	}
</style>
