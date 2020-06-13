<template>
	<view class="content-white payment address">
		<view class="input-group">
			<view class="input-cell">
				<view class="input-cell-bd">
					<view class="namebox"><text class="name">张文章</text><text class="phone">182****0002</text><text class="tag orange">默认</text><text class="tag blue">家</text></view>
					<view class="addressbox"><text>江西省南昌市二拖区拉尔街道七坊64号</text><image class="editicon" src="../../static/img/common/icon_edit.png"></image></view>
				</view>
			</view>
			<view class="input-cell">
				<view class="input-cell-bd">
					<view class="namebox"><text class="name">张文章</text><text class="phone">182****0002</text><text class="tag blue">家</text></view>
					<view class="addressbox"><text>江西省南昌市二拖区拉尔街道七坊64号</text><image class="editicon" src="../../static/img/common/icon_edit.png"></image></view>
				</view>
			</view>
			<view class="bottombar"  :loading="loading" :disabled="loading">
				<view class="btn" @click="saveData">+ 新建收货地址</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.address {
		font-size:32rpx;
	}
	.address .input-cell-bd{
		width:100%;
	}
	.address .input-cell-bd .namebox{
		font-weight:650;
		margin-bottom:15rpx;
	}
	.address .input-cell-bd .namebox .name{
		margin-right:80rpx;
	}
	.address .input-cell-bd .namebox .tag{
		padding:0rpx 16rpx;
		color:#fff;
		font-size:28rpx;
		border-radius: 8rpx;
		display: inline-block;
		margin:0 8rpx;
	}
	.address .input-cell-bd .namebox .tag.orange{
		background: #FDBE48;
	}
	.address .input-cell-bd .namebox .tag.blue{
		background: #31A2F8;
	}
	.address .input-cell-bd .addressbox{
		font-size:28rpx;
		color:#4A4A4A;
	}
	.address .input-cell-bd .addressbox{
		display: flex;
		justify-content: space-between;
	}
	.address .input-cell-bd .addressbox .editicon{
		width:40rpx;
		height:40rpx;
	}
</style>
