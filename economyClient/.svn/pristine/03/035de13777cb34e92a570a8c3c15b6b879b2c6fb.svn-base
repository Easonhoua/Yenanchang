<template>
	<view class="content activity">
		<uni-swiper-dot :info="info" :current="current" mode="nav"  :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		
		<!-- 列表开始 -->
		<view class="listbox">
			<view class="list">
				<view class="list-img"><image src="/static/img/discover/zxcs.png"></image></view>
				<view class="list-bd">
					<view class="title">南昌国际自行车赛</view>
					<view class="txt">时间：2019.11.24 7:00 </view>
					<view class="txt"><text>状态： </text><text class="blue">状态： </text></view>
					<view class="read"><text>浏览 496</text><text>赞 1</text></view>
					<view class="link">查看详情</view>
				</view>
			</view>
			<view class="list">
				<view class="list-img"><image src="/static/img/discover/xxny.png"></image></view>
				<view class="list-bd">
					<view class="title">南昌“休闲农业，秀美南昌“休闲农业，秀美...</view>
					<view class="txt">时间：2019.11.24 7:00 </view>
					<view class="txt"><text>状态： </text><text class="blue">状态： </text></view>
					<view class="read"><text>浏览 496</text><text>赞 1</text></view>
					<view class="link orange">马上报名</view>
				</view>
			</view>
		</view>		
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	export default {
		components: {
			uniSwiperDot
		},
		data() {
			return {
				info: [{
						colorClass: 'uni-bg-red',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
						content: '2019年南昌国际马拉松比赛，将2019年南昌国际马拉松比赛'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 C'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 D'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 E'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 F'
					}
				],
				modeIndex: 3,
				current: 0,
				mode: 'nav',
				dotsStyles: {backgroundColor: '',//rgba(0, 0, 0, .3)
						border: '0.5px rgba(255,255,255,255) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(255,255,255,255)',
						selectedBorder: '1px rgba(255,255,255,255) solid'}
			}
		},
		onLoad() {},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}

	.swiper-box {
		height: 400upx;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
	}
	.uni-bg-blue {
		background: #007aff;
	}

	 
</style>