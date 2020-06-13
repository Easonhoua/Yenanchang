<template>
	<view class="hotdiscuss">
		<view class="title">火热参与</view>
		<view class="hotdiscuss-bd">
			<view class="item">
				<view class="imgbox"><image class="img" src="../../static/img/common/icon_logo.png"></image></view>
				<view class="txt">#沙雕的舍友说爱 你#</view>
				<view class="number">1204参与</view>
			</view>
			<view class="item">
				<view class="imgbox"><image class="img" src="../../static/img/common/icon_logo.png"></image></view>
				<view class="txt">#沙雕的舍友说爱 你#</view>
				<view class="number">1204参与</view>
			</view>
			<view class="item">
				<view class="imgbox"><image class="img" src="../../static/img/common/icon_logo.png"></image></view>
				<view class="txt">#沙雕的舍友说爱 你沙雕的舍友说爱 你沙雕的舍友说爱 你#</view>
				<view class="number">1204参与</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.hotdiscuss{
		padding:30rpx;
	}
	.hotdiscuss .title{
		font-size:32rpx;
		font-weight:650;
		position: relative;
		height:88rpx;
		line-height:88rpx;
		margin-bottom:15rpx;
	}
	.hotdiscuss .title:after{
		width:36rpx;
		height:36rpx;
		content: " ";
		background: url(../../static/img/common/right-choose-arrow.png) no-repeat;
		background-size:36rpx 36rpx ;
		position: absolute;
		right:0;
		top:50%;
		margin-top:-20rpx;
	}
	.hotdiscuss .hotdiscuss-bd{
		display: flex;
		justify-content: space-between;
	}
	.hotdiscuss .hotdiscuss-bd .item{
		flex: 1;
		text-align: center;
	}
	.hotdiscuss .hotdiscuss-bd .item .imgbox{
		width:100%;
		height:218rpx;
		margin-bottom:16rpx;
	}
	.hotdiscuss .hotdiscuss-bd .item .imgbox .img{
		width:218rpx;
		height:218rpx;
		display: inline-block;
	}
	.hotdiscuss .hotdiscuss-bd .item .txt{
		font-size:28rpx;
		height:75rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom:6rpx;
	}
	.hotdiscuss .hotdiscuss-bd .item .number{
		font-size:24rpx;
		color:#BABABA;
	}
	
</style>
