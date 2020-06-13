<template>
	<view class="layout letime">
		<!-- <view class="status-bar"></view>
		<view class="sub-header">
			<image class="back" @click="back" src="../../static/img/common/back.png"></image>
			<view class="searchbox">
				<input class="input" type="" maxlength="" placeholder="健身工作室"></input>
			</view>
			<text class="label">休闲</text>
		</view> -->
		<screenComponent platformTypeId="4" @screenLike="screenLike" ref="myScreen"></screenComponent>
		<view class="contain">
			<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback" top="130">
				<view class="ht-card card" @tap="goDetail(item)" v-for="(item,index) in letimeList" :key="index">
					<view class="card-bd">
						<view class="ct-list">
							<image class="img" :src="item.thumbnailPath?item.thumbnailPath:'/static/img/common/banner.png'"></image>
							<view class="righttxt">
								<view class="name">{{item.shopName}}</view>
								<view class="score">
									<uni-rate :value="item.score" disabled="true" size="14" style="display: inline-flex; margin-right: -20rpx;"></uni-rate>
									<text class="number">{{item.score}}分</text>
									<text class="number">¥{{item.discountPrice}}/人</text>
								</view>
								<view class="locale font24"><text>世贸广场</text> | <text>量贩KTV</text></view>
								<view class="comment3">服务极好</view>
								<view class="coupon coupon2">
									<view class=""><label class="mark red">订</label><text class="yd">90元起</text><text class="label">时尚包3小时90元</text></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import screenComponent from '@/components/screen-component/screen-component.vue'
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			uniRate,
			screenComponent
		},
		data() {
			return {
				mescroll: '',
				keyword: '',
				searchData: {},
				platformTypeId: 4,
				letimeList: [],
				longtitude: '',
				latitude: ''
			}
		},
		onShow() {
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					this.longtitude = res.longitude;
					this.latitude = res.latitude;
					//console.log('当前位置的经度：' + res.longitude);
					//console.log('当前位置的纬度：' + res.latitude);
				}
			});
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			goDetail: function(item) {
				uni.navigateTo({
					url: 'letimedetails?shopId='+item.shopId+'&coordinate='+item.coordinate,
				})
			},
			mounted() {
				this.$refs.myScreen.getTypeLabel();
			},
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				this.letimeList = [];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {

				let coordinate = '';
				if (this.longtitude && this.latitude) {
					coordinate = this.longtitude + "," + this.latitude;
				}
				//获取项目信息列表
				const url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					keyword: this.keyword,
					coordinate: coordinate,
					platformTypeId: this.platformTypeId,
				};
				let sendDate = Object.assign({}, this.searchData, data);
				var that = this;
				this.request.get(url, sendDate, mescroll).then(res => {
					let currListData = res.list;

					currListData.forEach(item => {
						if (item.thumbnailPath) {
							let thumbnailPath = JSON.parse(item.thumbnailPath);
							item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath_220;
						}
						let distance = that.util.distance(that.latitude, that.longtitude, item.coordinateLat, item.coordinateLng);
						that.$set(item, 'distance', parseFloat(parseInt(distance.toString().split(".")[0]) / 1000).toFixed(2));
					});
					that.letimeList = that.letimeList.concat(currListData); //追加新数据

				})
			},
			screenLike(searchData) {
				this.searchData = searchData;
				//console.log("this.searchData: " + JSON.stringify(this.searchData));
				this.downCallBack(this.mescroll);
			},
			onNavigationBarSearchInputChanged(input) {
				//console.log(input);
				this.keyword = input.text;
				this.downCallBack(this.mescroll);
			}
		}
	}
</script>

<style>
</style>
