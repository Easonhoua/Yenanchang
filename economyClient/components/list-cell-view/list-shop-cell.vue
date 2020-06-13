<template>
	<view class="content">
		<view class="shop-view" v-for="(item,index) in theShopList" :key="index" @click="toShopDetail(item)">
			<view class="shop-cell">
				<!-- <image-cache class="shop-cell-image" :src="item.logo" imageStyle="border-radius: 8rpx;"></image-cache> -->
				<image class="shop-cell-image" :src="item.thumbnailPath" mode="aspectFill"></image>
				<view class="shop-cell-right">
					<view class="shop-cell-title">{{item.shopName?item.shopName:'店铺名称'}}</view>
					<view class="display-row" style="margin-top: 6rpx;">
						<uni-rate :value="item.score" disabled="true" size="14" style="margin-right: 20rpx;"></uni-rate>
						<view class="shop-cell-subTitle">{{item.score}}分  ￥{{item.standardPrice}}/人</view>
					</view>
					<view class="display-row">
						<!-- <view v-if="item.showEssence" class="shop-cell-ranking">精选推荐</view> -->
						<view v-if="item.platformLabelsName" class="shop-cell-ranking">{{item.platformLabelsName}}</view>
						<view class="shop-cell-address">{{item.pageview}}人来过</view>
					</view>
					<view class="shop-cell-address">{{item.address}}</view>
					<view v-if="showCoupon" class="display-row">
						<view class="shop-coupon-red">劵</view>
						<view class="text-detail">90元代100元</view>
					</view>
					<view v-if="showIntegrate" class="display-row">
						<view class="shop-coupon-blue">团</view>
						<view class="text-detail">18.1元金秋团购套餐</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	export default {
		name: "list-shop-cell",
		props: {
			// 店铺列表
			shopList: {
				type: Array,
				default () {
					return []
				}
			},
			// 是否在外部自定义cell的点击事件,默认为false，即使用cell内部this.util.gotoShopDetail方法
			useCellClick:{
				type:Boolean,
				default:false
			},
			// 是否显示优惠券
			showCoupon:{
				type:Boolean,
				default:false
			},
			// 是否显示团购信息
			showIntegrate:{
				type:Boolean,
				default:false
			}
		},
		components: {
			uniRate
		},
		data() {
			return {
				theShopList:[],
				logo:""
			};
		},
		created() {
			
			this.setCellData(this.shopList);
		},
		watch: {
			shopList(newShopList,oldShopList){
				this.formattingList(newShopList);
			}
		},
		methods: {
			
			setCellData:function(shopList){
				//console.log("this.showCoupon = ",this.showCoupon);
				this.util.formatShopList(shopList);
			},
			formattingList:function(shopList){
				this.util.formatShopList(shopList);
				this.theShopList = shopList;
			},
			toShopDetail:function(item){
				if(this.useCellClick){
					this.$emit("shopListItemClick",item);
				}else{
					this.util.gotoShopDetail(item); 
				}
			}
		}
	}
</script>

<style>
	.shop-view{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.shop-cell{
		
		margin: 15rpx auto 10rpx auto;
		background-color: #FFFFFF;
		width: 710rpx;
		padding: 25rpx 20rpx;
		display: flex;
		flex-direction: row;
		box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.07);
	}
	.shop-cell-image{
		width: 190rpx;
		min-width: 190rpx;
		height: 190rpx;
		border-radius: 8rpx;
		background-color: #EEEEEE;
	}
	.shop-cell-right{
		width: 490rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		line-height: 40rpx;
	}
	.shop-cell-title{
		font-size: 32rpx;
		font-weight: bold;
	}
	.shop-cell-subTitle{
		font-size: 24rpx;
	}
	.shop-cell-address{
		font-size: 24rpx;
		line-height: 32rpx;
		color: #989898;
	}
	.shop-cell-ranking{
		background-color: #FFFFFF;
		border: 2rpx solid #FFC159;
		border-radius:2px;
		font-size: 22rpx;
		color: #FFC159;
		line-height: 40rpx;
		padding: 0rpx 16rpx;
		margin-top: 6rpx;
		margin-bottom: 10rpx;
		margin-right: 20rpx;
		text-align: center;
	}
	
	.shop-coupon-red{
		width: 30rpx;
		height: 30rpx;
		background-color: #FF871C;
		border-radius: 4rpx;
		font-size: 18rpx;
		color: #FFFFFF;
		text-align: center;
		margin-right: 16rpx;
		line-height: 30rpx;
	}
	.shop-coupon-blue{
		width: 30rpx;
		height: 30rpx;
		background-color: #31A2F8;
		border-radius: 4rpx;
		font-size: 18rpx;
		color: #FFFFFF;
		text-align: center;
		margin-right: 16rpx;
		line-height: 30rpx;
	}
	
</style>
