<template>
	<view class="shop-list">
		<view class="conten">
			<view class="item" v-for="(item,index) in shopLeftList" :key="index" @click="shopItemClick(item)">
				<image class="image" :src="item.thumbnailPath" mode="widthFix"></image>
				<view class="display-row">
					<view class="title">{{item.shopName}}</view>
				</view>
				<!-- 个人中心收藏的店铺列表 -->
				<view v-if="isUserFavorite">
					<view class="display-row">
						<view class="ranking">{{item.platformLabelsName}}</view>
						<uni-rate class="star" :value="item.score" disabled="true" size="14" ></uni-rate>
					</view>
				</view>
				<!-- 除个人中心收藏的店铺列表外 -->
				<view v-else>
					<view class="display-row">
						<view class="ranking">{{item.platformLabelsName}}</view>
						<view class="distance">距我{{item.distance}}km</view>
					</view>
					<view class="subtitle">
						<uni-rate class="star" :value="item.score" disabled="true" size="14" ></uni-rate>
						<text>{{item.pageview}}人来过</text>
					</view>
				</view>
			</view>
		</view>

		<view class="conten">
			<view class="item" v-for="(item,index) in shopRightList" :key="index" @click="shopItemClick(item)">
				<image class="image" :src="item.thumbnailPath" mode="widthFix"></image>
				<view class="title">{{item.shopName}}</view>
				<!-- 个人中心收藏的店铺列表 -->
				<view v-if="isUserFavorite">
					<view class="display-row">
						<view class="ranking">{{item.platformLabelsName}}</view>
						<uni-rate class="star" :value="item.score" disabled="true" size="14"></uni-rate>
					</view>
				</view>
				<!-- 除个人中心收藏的店铺列表外 -->
				<view v-else>
					<view class="display-row">
						<view class="ranking">{{item.platformLabelsName}}</view>
						<text class="distance">距我{{item.distance}}km</text>
					</view>
					<view class="subtitle">
						<uni-rate class="star" :value="item.score" disabled="true" size="14"></uni-rate>
						<text>{{item.pageview}}人来过</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	export default {
		name: "shop-flow-cell",
		props: {
			// 店铺列表
			shopList: {
				type: Array,
				default () {
					return []
				}
			},
			isUserFavorite:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		components: {
			uniRate
		},
		data() {
			return {
				theShopList:[],
				shopRightList:[],
				shopLeftList:[],
				logo:""
			};
		},
		created() {
			
			// this.setCellData(this.shopList);
		},
		watch: {
			// shopList(newShopList,oldShopList){
			// 	this.formattingList(newShopList);
			// }
		},
		methods: {
			
			setCellData:function(shopList){
				this.formattingList(shopList);
			},
			formattingList:function(shopList,pageNo){
				if(pageNo == 0||pageNo == 1){
					this.shopLeftList = [];
					this.shopRightList = [];
				}
				for (var i = 0; i < shopList.length; i++) {
					var item = shopList[i];
					if (item.thumbnailPath) {
						item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
					} else {
						item.thumbnailPath = this.util.formatImagePath(item.logo);
					}
					if (i % 2) {
						this.shopRightList.push(item);
					} else {
						this.shopLeftList.push(item);
					}
				}
			},
			shopItemClick:function(item){
				this.util.gotoShopDetail(item); 
			}
		}
	}
</script>

<style lang="scss">
	
	.shop-list {
		overflow: hidden;
		width: 750rpx;
		padding: 30rpx;
		padding-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.conten {
			width: 335rpx;
			display: flex;
			flex-direction: column;
			.item {
				width: 100%;
				padding-bottom: 20rpx;
				break-inside: avoid;
				box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);
				margin-bottom: 24rpx;
				.image {
					width: 100%;
					background-color: #F5F5F5;
					border-radius: 5px 5px 0px 0px;
				}
				.title {
					margin-left: 20rpx;
					margin-top: 12rpx;
					margin-bottom: 6rpx;
					font-size: 28rpx;
					width: 320rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow:ellipsis;
					font-weight: bold;
				}
				.subtitle{
					margin-top: 0rpx;
					width: 320rpx;
					height: 40rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 24rpx;
					color: rgba($color: #989898, $alpha: 0.7);
				}
				.ranking{
					margin-left: 20rpx;
					background-color: #FFFFFF;
					border: 1rpx solid rgba($color: #FFC159, $alpha: 0.5);
					border-radius:2px;
					font-size: 22rpx;
					line-height: 36rpx;
					color: #FFC159;
					padding: 0rpx 18rpx;
					margin-top: 6rpx;
					margin-right: 24rpx;
					margin-bottom: 10rpx;
					text-align: center;
				}
				.distance{
					font-size: 26rpx;
					// line-height: 48rpx;
					color: rgba($color: #989898, $alpha: 0.6);
				}
				.star{
					/* #ifdef H5 */
						margin-left: 20rpx;
					/* #endif */
					
					margin-right: 10rpx;
					margin-top: 3rpx;
				}
				
				.address{
					width: 100%;
					margin-top: 6rpx;
					font-size: 24rpx;
					line-height: 32rpx;
					color: rgba($color: #989898, $alpha: 0.6);
				}
			}
		}
	}
</style>
