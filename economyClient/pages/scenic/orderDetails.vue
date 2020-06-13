<template>
	<view class="content orderdetails">
		<!-- 滑动图片 -->
			<view class="codebox">
				<view class="inner">
					<view class="name">滕王阁</view>
					<view class="code">
						<image :src="img"></image>
					</view>
					<view class="title">订单编号：191211165515679</view>
					<view class="dashed"></view>
					<view class="codebox-txt">
						<view class="codebox-cell">
							<text class="label">时间</text>
							<view class="codebox-cell-bd">11/04 11:30</view>
						</view>
						<view class="codebox-cell">
							<text class="label">价格</text>
							<view class="codebox-cell-bd">￥45</view>
						</view>
						<view class="codebox-cell">
							<text class="label">景区</text>
							<view class="codebox-cell-bd">滕王阁景区</view>
						</view>
						<view class="btn">保存到相册</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import wxqrcode from "@/common/js/wxqrcode.js" // 二维码生成器  
	export default {
		data() {
			return {
				img:'',
			}
		},
		onLoad() {
			this.img = wxqrcode.createQrCodeImg('191211165515679', {
			     size: parseInt(300)//二维码大小  
			})
		}
	}
</script>

<style>
</style>