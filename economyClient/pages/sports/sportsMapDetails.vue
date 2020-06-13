<template>
	<view class="page play strategy">
		<!-- 头部banner -->
		<view class="top-banner">
			<image v-if="banner" class="img" :src="banner.photo" mode="aspectFill"></image>
			<image v-else class="img" src="/static/img_new/play/y_subbanner1@3x.png" mode="aspectFill"></image>
		</view>

		<!-- 周边推荐 -->
		<view class="column">
			<view class="column-title">
				<text class="txt">附近推荐</text>
				<text class="right-more" @click="toNearbyShopList()">更多>></text>
			</view>
			<scroll-view class="near-scroll" scroll-x="true">
				<view class="item" v-for="(item, index) in nearbyShopList" :key="index" @tap="toShopDetail(item)">
					<image class="image" :src="item.thumbnailPath" mode="aspectFill"></image>
					<view class="name text-over-hide">{{ item.shopName }}</view>
					<view class="distance">距您{{ item.distance ? item.distance : '0' }}km</view>
				</view>
			</scroll-view>
		</view>
		<!-- 健身攻略 -->
		<view  v-if="routeList.length > 0" class="column">
			<view class="column-title" @click="toStrategyList(1)">
				<text class="txt">健身攻略</text>
				<text class="right-more">更多>></text>
			</view>
		
			<view class="route">
				<view class="item" v-for="(item, index) in routeList" :key="index" @click="toStrategyDetail(item.guideId)">
					<image class="image" :src="item.thumbnailPath" mode="aspectFill"></image>
					<view class="title-view">
						<text class="text text-two-line-hide">{{ item.guideTitle }}</text>
					</view>
				</view>
			</view>
			<view v-if="fourRouteItem.guideTitle" class="route-large" @click="toStrategyDetail(fourRouteItem.guideId)">
				<image class="image" :src="fourRouteItem.thumbnailPath" mode="aspectFill"></image>
				<view class="title1 text-over-hide">{{ fourRouteItem.guideTitle }}</view>
			</view>
		</view>
		<!-- 相关推荐 -->
		<view class="column">
			<view class="column-title">
				<text class="txt">商家推荐</text>
				<text class="right-more" @click="toShopList()">更多>></text>
			</view>
			<recommend-shop-cell :shopList="recommendList"></recommend-shop-cell>
		</view>
		<!-- 攻略推荐 -->
		<waterFallsFlow :typeId="6"></waterFallsFlow>
		<!-- 相关推荐结束 -->
		<view class="publishbtn" @click="toPublishStrategy()">
			<image class="img" :src="util.getUserHeaderImage()" mode="aspectFit"></image>
			<text>发布攻略</text>
		</view>
	</view>
</template>

<script>
import waterFallsFlow from '../newPage/module/waterfallsFlow.vue';
import recommendShopCell from '@/components/list-cell-view/recommend-shop-cell.vue';
export default {
	components: {
		waterFallsFlow,
		recommendShopCell
	},
	data() {
		return {
			routeList: [],
			fourRouteItem: {},
			recommendList: [],
			subjectId: 6,
			nearbyShopList: [],
			latitude: 28.683095,
			longitude: 115.913536,
			bannerList: [],
			banner: { photo: '' },
			mescroll: ''
		};
	},
	onShow() {
		const app = getApp();
		if (app.globalData.sports) {
			this.bannerList = app.globalData.sports;
			this.banner = this.bannerList[0];
		}
	},
	onLoad() {
		var that = this;
		uni.getLocation({
			type: 'gcj02',
			success: function(res) {
				that.longitude = res.longitude;
				that.latitude = res.latitude;
			}
		});
		this.queryNearbyShopList();
		this.queryRecommendList();
		this.queryOfficialStrategy();
	},
	methods: {
		queryNearbyShopList() {
			const url = '/memberapi/api/shops/queryShopList.do';
			let data = {
				pageNo: 1,
				pageSize: 5,
				subjectId: this.subjectId
			};

			if (this.longitude && this.latitude) {
				data.coordinate = this.longitude + ',' + this.latitude;
				//data.distance = "5000";; //距离
			}

			var that = this;
			this.request.get(url, data).then(res => {
				let nearbyShopList = res.list;
				that.util.formatShopList(nearbyShopList);
				that.nearbyShopList=nearbyShopList;
			});
		},
		queryRecommendList() {
			const url = '/memberapi/api/shops/queryRecommendShopList.do';
			let data = {
				pageNo: 1,
				pageSize: 10,
				subjectId: this.subjectId,
				essenceType: 1
			};

			var that = this;
			this.request.get(url, data).then(res => {
				let recommendList = res.list;
				that.util.formatShopList(recommendList);
				that.recommendList=recommendList;
				
			});
		},
		queryOfficialStrategy() {
			const url = '/memberapi/api/guide/list.do';
			let data = {
				pageNo: 1,
				pageSize: 4,
				guideType: this.subjectId,
				userType: 1
			};

			var that = this;
			this.request.get(url, data).then(res => {
				this.routeList = [];
				for (var i = 0; i < res.list.length; i++) {
					var item = res.list[i];
					item.thumbnailPath = this.util.formatImagePaths(item.thumbnailPath)[0];
					if(i<3){
						this.routeList.push(item);
					}
					if(i==3){
						this.fourRouteItem = item;
					}
					console.log("item.thumbnailPath == ",item.thumbnailPath);
				}
			});
		},

		toNearbyShopList() {
			let coordinate = this.longitude + ',' + this.latitude;
			uni.navigateTo({
				url: '/pages/culture/nearPlaceList?coordinate=' + coordinate + '&subjectId=' + this.subjectId
			});
		},
		toShopDetail(item) {
			this.util.gotoShopDetail(item);
		},
		toShopList() {
			uni.navigateTo({
				url: '/pages/sports/sportsList'
			});
		},
		toStrategyDetail(guideId) {
			uni.navigateTo({
				url: '/pages/strategy/strategyDetail?guideId=' + guideId
			});
		},
		toStrategyList(userType) {
			uni.navigateTo({
				url: '/pages/strategy/strategySearch?guideType=' + this.subjectId + '&userType=' + userType
			});
		},
		toPublishStrategy() {
			uni.navigateTo({
				url: '/pages/strategy/strategyPublish?guideType=' + this.subjectId
			});
		},
		goBack: function() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss">
/*其他scss */

@import '../../common/css/other_new.scss';

.near-scroll {
	background-color: #ffffff;
	color: #000000;
	width: 100%;
	height: 360rpx;
	overflow: hidden;
	white-space: nowrap;
	padding-top: 30rpx;
	padding-right: 20rpx;
	.item {
		width: 300rpx;
		display: inline-block;
		margin-left: 20rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);
		.image {
			width: 300rpx;
			height: 210rpx;
			background-color: #f5f5f5;
			border-radius: 5px 5px 0px 0px;
		}
		.name {
			font-size: 28rpx;
			font-weight: bold;
			padding: 10rpx 0rpx 0rpx 0rpx;
			overflow: hidden;
			margin-left: 20rpx;
			width: 260rpx;
		}
		.distance {
			font-size: 24rpx;
			color: #4a4a4a;
			margin-bottom: 10rpx;
			margin-left: 20rpx;
		}
	}
}
.address {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-right: 8rpx;
	width: 220rpx;
	color: #b1b1b1;
}
.name {
	color: #b1b1b1;
	margin-right: 10rpx;
	width: 116rpx;
}
.txt-distance {
	color: #b1b1b1;
	margin-left: 6rpx;
}
.route {
	display: flex;
	flex-direction: row;
	// justify-content: space-between;
	padding: 25rpx 0rpx;
	.item {
		width: 222rpx;
		margin-left: 20rpx;
		box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);
		.image {
			width: 100%;
			height: 150rpx;
			border-radius: 5px 5px 0px 0px;
			background-color: #f5f5f5;
		}
		.title-view {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			padding: 0rpx 12rpx 12rpx 12rpx;
			font-size: 26rpx;
			height: 90rpx;
			line-height: 34rpx;
			.text {
				color: #333333;
				text-align: center;
			}
		}
	}
}
.route-large {
	margin: 0rpx 20rpx;
	width: 706rpx;
	font-size: 30rpx;
	box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);
	.image {
		width: 100%;
		height: 250rpx;
		border-radius: 5px 5px 0px 0px;
		background-color: #f5f5f5;
	}
	.title1 {
		font-weight: 400;
		text-align: left;
		width: 680rpx;
		font-size: 32rpx;
		height: 70rpx;
		margin-top: 10rpx;
		color: #333333;
		margin-left: 20rpx;
	}
}
</style>
