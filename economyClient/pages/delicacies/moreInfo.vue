<template>
<view class="content" style="height: 2000rpx;">
	<view class="back-view">
		<view class="cu-form-group" v-if="shopsData.startShopHours">
			<view class="title">营业时间</view>
			<view v-for="(item,index) in shopsData.itemList" :key="index">
				 {{item.shopDayName}} {{item.shopHours1?item.shopHours1:''}} {{item.shopHours2?"-"+item.shopHours2:''}} {{item.shopHours3?item.shopHours3:''}}{{item.shopHours4?"-"+item.shopHours4:''}}
			</view>
		</view>
		<view class="cu-form-group" v-if="shopsData.delicacyServiceName">
			<view class="title">餐厅服务</view>
			<view>{{shopsData.delicacyServiceName}}</view>
		</view>
		<view class="cu-form-group" v-if="shopsData.transportLine">
			<view class="title">交通方式</view>
			<view>{{shopsData.transportLine}}</view>
		</view>
		<view class="cu-form-group" v-if="shopsData.businessLicenceNumber">
			<view class="title">营业执照</view>
			<view>{{shopsData.businessLicenceNumber}}</view>
			<view><image style="width: 100%;" :src="shopsData.businessLicenceNumberPhoto"></image></view>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				shopsData: {
					score: 3
				},
				shopId: '',
				longtitude: '',
				latitude: ''
			}
		},
		onLoad(e) {
			var that = this;
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					that.longtitude = res.longitude;
					that.latitude = res.latitude;
				}
			});
			if (e.shopId) {
				this.shopId = e.shopId;
				this.readDetail();
			}
		},
		methods: {
			readDetail: function() {
				//获取商家信息
				const url = '/memberapi/api/shops/readShopsAndExtends.do';
				let coordinate = '';
				if (this.longtitude && this.latitude) {
					coordinate = this.longtitude + "," + this.latitude;
				}
				let sendDate = {
					coordinate: coordinate,
					shopId: this.shopId
				};
				var that = this;
				this.request.get(url, sendDate).then(res => {
					this.shopsData = res.data;
					
					if (this.shopsData.businessLicenceNumberPhoto) {
						this.shopsData.businessLicenceNumberPhoto = this.util.formatImagePath(this.shopsData.businessLicenceNumberPhoto);
					}
					
					that.shopsData.shopHours1 =that.shopsData.shopHours1?that.shopsData.shopHours1:"";
					that.shopsData.shopHours2 =that.shopsData.shopHours2?that.shopsData.shopHours2:"";
					that.shopsData.shopHours3 =that.shopsData.shopHours3?that.shopsData.shopHours3:"";
				});
			}
		}
	}
</script>

<style>
	.cu-form-group{
		display: list-item;
		margin-bottom: 16rpx;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
		width: 100%;
		font-size: 28rpx;
		font-weight: 800;
		margin: 20rpx 0rpx;
	}
	.back-view{
		border-radius: 16rpx;
		margin: 10rpx 10rpx;
		overflow: hidden;
		background: #fff;
	}
</style>
