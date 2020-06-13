<template>
	<!-- 精选推荐 -->
	<view class="shop-view3">
		<!-- <view class="column-title" @click="gotoMoreShop(1)"><text class="txt">精选推荐</text><text class="right-more">更多>></text></view> -->
		
		<view class="item3" v-for="(item,index) in theShopList" :key="index" @click="toShopDetail(item)">
			<image class="image3" :src="item.thumbnailPath" mode="aspectFill"></image>
			<view class="right3">
				<view class="name3 text-over-hide">{{item.shopName}}</view>
				<view class="score3">{{item.score}}分<text class="num3">{{item.commentNum}}条点评      ￥{{item.standardPrice}}/人</text></view>
				<text class="address3 text-two-line-hide">{{item.platformLabelsName}} | {{item.address}} | 距您{{item.distance?item.distance:'0'}}km</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "recommend-shop-cell",
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
			}
		
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
				this.formattingList(shopList);
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

<style lang="scss">
	// 为了避免有些手机上的样式冲突所有样式都加上3
	.shop-view3{
		width: 100vw;
		height: 100%;
		background-color: #FFFFFF;
		padding: 20rpx;
		padding-bottom: 0rpx;
		.item3{
			display: flex;
			flex-direction: row;
			margin-bottom: 30rpx;
			.image3{
				width:190rpx;
				height:220rpx;
				margin-right: 25rpx;
				border-radius: 5px 5px 0px 0px;
				box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.07);
			}
			.right3{
				width: 490rpx;
				height:220rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name3{
					font-size: 32rpx;
					font-weight: 400;
				}
				.score3{
					font-size: 30rpx;
				}
				.num3{
					margin-left: 14rpx;
					font-size: 24rpx;
					color:#b1b1b1;
				}
				.address3{
					font-size: 28rpx;
					font-weight: 300;
					color:#ffa500;
					line-height: 37rpx;
				}
			}
		}
	}
	
	
</style>
