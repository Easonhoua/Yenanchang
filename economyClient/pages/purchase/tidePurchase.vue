<template>
	<view class="page tidepurchase">
		<view class="searchpage">
			<view class="header" style="z-index: 1000;height: 141rpx;max-height: 141rpx;">
				<view class="back" @click="goBack()"><image class="icon" src="/static/img_new/scenic/h_fh.png"></image></view>
				<view class="searchbox">
					<image class="icon" src="/static/img_new/common/search.png"></image>
					<input class="input" placeholder="" placeholder-style="color:#888888" @click="toSearch" />
				</view>
				<!-- <view class="iconbox">
					<image class="icon" src="/static/img_new/scenic/h_gd.png"></image>
				</view> -->
			</view>
		</view>
		<!-- 头部结束 -->
		<view class="tab" style="z-index: 1001;">
			<view class="item" @click="jumpTarget(0)">好物推荐</view>
			<view class="item" @click="jumpTarget(1)">商圈</view>
			<view class="item" @click="jumpTarget(2)">好店推荐</view>
			<view class="item" @click="jumpTarget(3)">超市</view>
			<view class="item" @click="jumpTarget(4)">用户精选</view>
		</view>
		<view class="tab-con" id="goodTab">
			<view class="panel">
				<view class="title">
					<text class="txt">附近好店</text>
					<text class="more" @click="toNearbyShopList()">更多 >></text>
				</view>
				<view class="panel-con">
					<view class="item" v-for="(item, index) in nearbyShopList" :key="index" @tap="toShopDetail(item)">
						<view class="imgbox"><image class="img" :src="item.thumbnailPath" mode="aspectFill"></image></view>
						<view class="txt">
							<view class="title">{{ item.shopName }}</view>
							<view class="distance" style="margin-top: -12rpx;">距您{{ item.distance ? item.distance : '0' }}km</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 附近好点结束 -->
			<!-- 健身攻略 -->
			<view  v-if="routeList.length > 0" class="column">
				<view class="column-title" @click="toStrategyList(1)">
					<text class="txt">上街推荐</text>
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
			
			<!-- 上街推荐结束 -->
			<view class="panel" id="tradeTab">
				<view class="title">
					<text class="txt">商圈</text>
					<text class="more" @click="toTradeList()">更多>></text>
				</view>
				<view class="panel-con business">
					<view class="item" v-for="(item, index) in tradeList" :key="index" @tap="toTradeDetail(item)">
						<view class="imgbox"><image class="img" :src="item.thumbnailPath"></image></view>
						<view class="txt">{{ item.tradeName }}</view>
					</view>
				</view>
			</view>
			<!-- 商圈结束 -->
			<view class="panel" id="goodShopTab">
				<view class="title">
					<text class="txt">好店推荐</text>
					<text class="more" @click="toRecommendShop()">更多>></text>
				</view>
				<view class="panel-con">
					<view class="item" v-for="(item, index) in recommendList" :key="index" @click="toShopDetail(item)">
						<view class="imgbox"><image class="img" :src="item.thumbnailPath" mode="aspectFill"></image></view>
						<view class="txt">
							<view class="title">{{ item.shopName }}</view>
							<view class="distance" style="margin-top: -12rpx;">距您{{ item.distance ? item.distance : '0' }}km</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 好店推荐结束 -->
			<view class="panel" id="supermarketTab">
				<view class="title">
					<text class="txt">超市</text>
					<text class="more" @click="toSupermarketList()">更多>></text>
				</view>
				<view class="panel-con">
					<view class="item" v-for="(item, index) in supermarketList" :key="index" @click="toShopDetail(item)">
						<view class="imgbox"><image class="img" :src="item.thumbnailPath" mode="aspectFill"></image></view>
						<view class="txt">
							<view class="title">{{ item.shopName }}</view>
							<view class="distance" style="margin-top: -12rpx;">距您{{ item.distance ? item.distance : '0' }}km</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 好店推荐结束 -->
			<view class="panel play strategy" id="userTab"><waterFallsFlow :typeId="4"></waterFallsFlow></view>
		</view>
		<!-- 相关推荐结束 -->
		<view class="publishbtn" @click="toPublishStrategy()">
			<image class="img" :src="util.getUserHeaderImage()" mode="aspectFit"></image>
			<text>发布攻略</text>
		</view>
	</view>
</template>

<script>
import waterFallsFlow from '../newPage/module/waterfallsFlow.vue';
export default {
	components: {
		waterFallsFlow
	},
	data() {
		return {
			routeList: [],
			fourRouteItem: {},
			recommendList: [],
			subjectId: 4, //购物
			nearbyShopList: [],
			latitude: 28.683095,
			longitude: 115.913536,
			bannerList: [],
			banner: { photo: '' },
			mescroll: '',
			tradeType: '',
			tradeList: [],
			supermarketList: [],
			typeId: 8, //购物商圈
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		};
	},
	onShow() {
		const app = getApp();
		if (app.globalData.delicacies) {
			this.bannerList = app.globalData.delicacies;
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
		this.queryTradeList();
		this.querySupermarketList();
	},
	methods: {
		querySupermarketList() {
			const url = '/memberapi/api/shops/queryShopList.do';
			let data = {
				pageNo: 1,
				pageSize: 3,
				platformTypeId: 8,
				labelId: 48,
				subjectId: this.subjectId
			};

			if (this.longitude && this.latitude) {
				data.coordinate = this.longitude + ',' + this.latitude;
				// //data.distance = "5000";; //距离
			}

			var that = this;
			this.request.get(url, data).then(res => {
				let supermarketList = res.list;
				that.util.formatShopList(supermarketList);
				that.supermarketList = supermarketList;
			});
		},
		queryNearbyShopList() {
			const url = '/memberapi/api/shops/queryShopList.do';
			let data = {
				pageNo: 1,
				pageSize: 3,
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
				that.nearbyShopList = nearbyShopList;
			});
		},
		queryRecommendList() {
			const url = '/memberapi/api/shops/queryRecommendShopList.do';
			let data = {
				pageNo: 1,
				pageSize: 3,
				subjectId: this.subjectId,
				essenceType: 1
			};

			var that = this;
			this.request.get(url, data).then(res => {
				let recommendList = res.list;
				that.util.formatShopList(recommendList);
				that.recommendList = recommendList;
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

		queryTradeList() {
			//获取项目信息列表
			let url = '/memberapi/api/platform/queryTradesByTypeId.do';
			let data = {
				pageNo: 1,
				pageSize: 4,
				typeId: this.typeId,
				tradeType: this.tradeType
			};
			//添加坐标
			if (this.longtitude && this.latitude) {
				data.coordinate = this.longtitude + ',' + this.latitude;
				// //data.distance = "5000";; //距离
			}

			var that = this;
			this.request.get(url, data).then(res => {
				let currListData = res.list;
				currListData.forEach((item, index) => {
					if (item.thumbnailPath) {
						item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
					}
					// let distance = that.util.distance(that.longtitude,that.latitude,item.coordinateLng,item.coordinateLat);
					var distance = item.distance;
					if (isNaN(distance)) {
						that.$set(item, 'distance', '0');
					} else {
						that.$set(item, 'distance', parseFloat(parseInt(distance.toString().split('.')[0]) / 1000).toFixed(2));
					}
				});
				this.tradeList = currListData;
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
		toShopList() {},
		toStrategyList(userType) {
			
			uni.navigateTo({
				url: '/pages/strategy/strategySearch?guideType=' + this.subjectId + '&userType=' + userType
			});
		},
		toStrategyDetail(guideId) {
			uni.navigateTo({
				url: '/pages/strategy/strategyDetail?guideId=' + guideId
			});
		},

		toPublishStrategy() {
			uni.navigateTo({
				url: '/pages/strategy/strategyPublish?guideType=' + this.subjectId
			});
		},
		toTradeDetail(item) {
			uni.navigateTo({
				url: '/pages/discover/discoverAbout?tradeId=' + item.tradeId + '&coordinate=' + item.coordinate
			});
		},
		toTradeList() {
			uni.navigateTo({
				url: '/pages/discover/discover'
			});
		},
		toSupermarketList() {
			uni.navigateTo({
				url: '/pages/purchase/supermarketList'
			});
		},
		toRecommendShop() {
			uni.navigateTo({
				url: '/pages/purchase/shopRecommendList'
			});
		},
		//标签
		jumpTarget: function(index) {
			var views = ['goodTab', 'tradeTab', 'goodShopTab', 'supermarketTab', 'userTab'];
			uni.createSelectorQuery()
				.select('.searchpage')
				.boundingClientRect(data => {
					uni.createSelectorQuery()
						.select('#' + views[index])
						.boundingClientRect(res => {
							uni.pageScrollTo({
								duration: 0,
								scrollTop: res.top - data.top - 100
							});
						})
						.exec();
				})
				.exec();
		},
		// 进入搜索界面
		toSearch: function() {
			uni.navigateTo({
				url: '/pages/search/search'
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
.tidepurchase .tab-con .panel .panel-con .masonry .item {
	width: 100%;
	height: auto;
}
.tidepurchase .tab-con .panel .panel-con .masonry .item .imgbox {
	width: 100%;
	height: auto;
	margin-bottom: 0;
}
.tidepurchase .tab-con .panel .panel-con .masonry .item .imgbox .img {
	width: 100%;
	height: auto;
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
