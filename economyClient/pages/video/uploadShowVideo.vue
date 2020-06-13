<template>
	<view style="background-color: #000000;">
		<view class="video-view" style="top: -88rpx;">
			<video id="myVideo" :src="videoSrc" loop="true" controls show-play-btn=false autoplay @error="videoErrorCallback"></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc: ""
			}
		},
		onLoad(option) {
			if(option.videoSrc){
				this.videoSrc = option.videoSrc;
			}
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			}
		}
	}
</script>

<style>
	
	video {
		margin-top: 170rpx;
		width: 750rpx;
		/* height: 1164rpx; */
		height: 85vh;
	}
	.video-view {
		width: 100vw;
		height: 100vh;
		position: absolute;
		background-color: #000000;
	
	}
	.navi-bar {
		width: 100%;
		display: flex;
		height: 88rpx;
		box-sizing: border-box;
		position: fixed;
		top: var(--status-bar-height);
		z-index: 4;
		align-items: center;
		background-color: #000000;
	}
	.navi-bar-back {
		width: 60rpx;
		height: 60rpx;
		padding: 15rpx;
	}
	.navi-bar-title {
		width: 630rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
	.video-play {
		position: absolute;
		bottom: 20rpx;
		top: 0rpx;
		left: 0rpx;
		right: 0rpx;
	}
</style>
