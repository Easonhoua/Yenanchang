<template>
	<view class="content teambuydetail">
		<view class="topdetail">
			<view class="topimg">
				<image class="img" v-if="arderPackagesData.thumbnailPath" :src="arderPackagesData.thumbnailPath"></image>
			</view>
			<view class="name">{{arderPackagesData.packagesName}}<text class="subtitle">仅售{{arderPackagesData.packagesPrice}}元，价值{{arderPackagesData.marketPrice}}元{{arderPackagesData.packagesName}}</text></view>
			<view class="tagbar">
				<!-- <text class="tip">90天消费107</text> -->
				<text class="tag">随时退</text>
				<!-- <text class="tag">过期自动退</text>
				<text class="tag">免预约</text> -->
			</view>
		</view>
		<view class="buydetail">
			<view class="title">团购详情</view>
			<view class="inner">
				<view class="buydetail-cell" v-for="(item,index) in arderPackagesData.itemList" :key="index">
					<view class="label">{{item.productName}}</view>
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="lefttxt">{{item.quantity}}</text>
							<text class="rightttxt">{{item.productPrice}}元</text>
						</view>
					</view>
				</view>
				<view class="buydetail-cell">
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="lefttxt">总价</text>
							<text class="rightttxt">{{arderPackagesData.marketPrice}}元</text>
						</view>
					</view>
				</view>
				<view class="buydetail-cell">
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="lefttxt bloc">实际价</text>
							<text class="rightttxt price">{{arderPackagesData.packagesPrice}}元</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="buydetail rule">
			<view class="title">购买须知</view>
			<view class="inner">
				<rich-text :nodes="arderPackagesData.details"></rich-text>
				<!-- <text class="txt">不限张数 随时退</text>
				<text class="txt">有效期 : 2019.5.21至2020</text>
				<text class="txt">使用时间 : 11:00-22:00</text>
				<text class="txt">适用范围 : 除酒水、饮料外全部通用</text>
				<text class="txt">无需预约，消费高峰期可能需要等位</text> -->
			</view>
		</view>
		<!--评论-->
		<goodCommentList-component ref='goodCommentList' goodCommentTitle="评论" :shopId="arderPackagesData.shopId"></goodCommentList-component>
		<view style="height: 120rpx"></view>
		<view class="bottombar">
			<view>
				<label class="price">￥{{arderPackagesData.packagesPrice}}</label>
				<label class="price2">￥{{arderPackagesData.marketPrice}}</label>
			</view>
			<view class="btnbox">
				<view class="btn" @tap="addOrder" :loading="loading" :disabled="loading">立即抢购</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import goodCommentListComponent from "@/components/goodCommentList-component/goodCommentList-component.vue"
	export default {
		components: {
			goodCommentListComponent
		},
		data() {
			return {
				loading: false,
				arderPackagesData: {}
			}
		},
		onLoad(e) {
			if (e.packagesId) {
				this.arderPackagesData.packagesId = e.packagesId;
				this.queryDetail(e.packagesId);
			}
		},
		methods: {
			queryDetail: function(packagesId) {
				let url = '/memberapi/api/arderPackages/read.do';
				let data = {
					packagesId: packagesId,
				};
				var that = this;
				this.request.get(url, data).then(res => {
					that.arderPackagesData = res.data;
					if (that.arderPackagesData && that.arderPackagesData.thumbnailPath) {
						that.arderPackagesData.thumbnailPath = that.util.formatImagePath(that.arderPackagesData.thumbnailPath);
					}
					if(that.arderPackagesData.details){
						that.arderPackagesData.details = that.arderPackagesData.details.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"').replace(/\width: (\d*)px/g,'').replace(/\height: (\d*)px/g,'');
					}
				})
			},
			addOrder:function(){
				this.loading = true;
				if(this.request.alreadyLogin()){
					uni.navigateTo({
						url:'submitOrder?packagesId='+this.arderPackagesData.packagesId+'&singleBuyNum='+this.arderPackagesData.singleBuyNum+'&stockNum='+this.arderPackagesData.stockNum+'&totalSell='+this.arderPackagesData.totalSell
					})
				}
			}
		},
	}
</script>

<style>
	.bottombar {
		width: 100%;
		line-height: 56rpx;
		background: #fff;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		padding: 24rpx 30rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	
	.bottombar .price {
		font-size: 32rpx;
		color: #FF891D;
		flex: 1;
	}
	
	.bottombar .price2 {
		margin-left: 10rpx;
		font-size: 24rpx;
		color: #989898;
		flex: 1;
		text-decoration:line-through
	}
	
	.bottombar .btnbox {
		display: flex;
		display: -webkit-flex;
	}
	.bottombar .btnbox .btn {
		width: 136rpx;
		height: 56rpx;
		line-height: 56rpx;
		background:linear-gradient(90deg,rgba(255,185,58,1) 0%,rgba(255,135,28,1) 100%);
		font-size: 24rpx;
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
	}
	
</style>
