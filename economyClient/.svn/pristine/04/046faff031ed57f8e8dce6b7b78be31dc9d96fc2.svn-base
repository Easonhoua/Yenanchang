<template>
	<view class="youhuiview" v-if='cashList.length>0'>
		<view class="youhuitop">
			<text class="youhuitxt">优惠买单</text>
			<view class="youhuiline"></view>
		</view>
		<view class="lilte">
			<image class="quanimg" src="/static/new_img/food/quan.png"></image>
			<text class="titletxt">代金券</text>
		</view>
		<view class="addressbox yuding" v-for="(item,index) in cashList" :key="index">
			<view class="left left-fx left-fx-line">
				<view class="address ticketpurchase">
					<text class="txt">{{item.cashName}}</text>
					<text class="txttip">随时退 免费预约 过期自动退</text>
				</view>
			</view>
			<view class="right">
				<view class="btn-yuding" @click="toCashDetail(item.cashId)">抢购</view>
				<text class="txttip">已售1374</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			cashList:{
				type:[Array],
				default:''
			}
		},
		data() {
			return {
				
			}
		},
		
		methods: {
			toCashDetail(cashId) {
				uni.navigateTo({
					url: "/pages/food/cashCoupon?cashId=" + cashId
				})
			},
		}
	}
</script>

<style>
@import "../../common/css/other_new.scss";
.youhuiview{
	background: #ffffff;
}
.youhuitop{
	width: 100%;	
	padding: 30rpx 25rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.youhuitxt{
	font-size: 36rpx;
	color: #333333;
	font-weight: 900;
	margin-bottom: -12rpx;
}
.youhuiline{
	width:143rpx;
	height:6rpx;
	background-color: #F3703A;
	
}

.yuding{
	display: flex;
	padding: 16px;
}
.left{
	flex: 1;
}
.address{
	font-size: 16px;
	margin-bottom: 5px;
}
.txttip{
	font-size: 13px;
	color: #999999;
	display: block;
}
..right{
	width: 72px;
	text-align: center;
	color: #595959;
}
.btn-yuding{
	text-align: center;
	padding: 2px 5px;
	-webkit-border-radius: 16px;
	border-radius: 16px;
	background-color: #df2725;
	color: #FFFFFF;
}
.txttip{
	font-size: 13px;
	color: #999999;
	display: block;
}
.lilte{
	
}

.quanimg{
	width: 41rpx;
	height: 35rpx;
}
</style>
