<template>
	<view class="content payment">
		<!-- 滑动图片 -->
		<view class="topbox bottom-line">
			<view class="">支付剩余时间{{remaining}}</view>
			<view><text class="fh">￥</text><text class="number">45</text></view>
		</view>
		<view class="paymentbox">
			<radio-group class="block" @change="RadioChange">
				<view class="payment-cell bottom-line">
					<view class="icon">
						<image src="../../static/img/common/pay_zfb.png"></image>
					</view>
					<view class="payment-cell-bd">支付宝支付</view>
					<view class="payment-cell-radio">
						<view class="cu-form-group margin-top">
							<radio class="orange" :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
						</view>
					</view>
				</view>
				<view class="payment-cell bottom-line">
					<view class="icon">
						<image src="../../static/img/common/pay_wx.png"></image>
					</view>
					<view class="payment-cell-bd">微信支付</view>
					<view class="payment-cell-radio">
						<view class="cu-form-group margin-top">
							<radio class="orange" :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
						</view>
					</view>
				</view>
				<view class="payment-cell bottom-line">
					<view class="icon">
						<image src="../../static/img/common/pay_yl.png"></image>
					</view>
					<view class="payment-cell-bd">银行卡支付</view>
					<view class="payment-cell-radio">
						<view class="cu-form-group margin-top">
							<radio class="orange" :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
						</view>
					</view>
				</view>
				<view class="payment-cell bottom-line">
					<view class="icon"></view>
					<view class="payment-cell-bd otherpay">切换其它银行卡支付</view>
					<view class="payment-cell-radio">
						<image class="arrow-right" src="../../static/img/common/right-choose-arrow.png"></image>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="bottombar">
			<view class="btn">确认支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: '',
				remaining: '', //显示剩余时间
				remainingd: '' //数据返回时间秒
			}
		},
		onLoad() {
			uni.showLoading(); //数据加载中
			this.getmsglist(); //第一次加载数据
		},
		methods: {
			RadioChange:function(e){
				this.radio = e.detail.value;
			},
			getmsglist: function() {
				//获取列表信息
				var _self = this;
				_self.remainingd = 30*60; // data.data.timestamp;
				_self.jishiqi(); //执行一次倒计时，因为进入页面有等待
				
				setInterval(function() {
					_self.jishiqi();
				}, 1000)
				
				uni.hideLoading(); //关闭加载
			},
			//倒计时计时器
			jishiqi: function() {
				var dj = this.remainingd;
				if (dj <= 0) {
					this.remaining = "已过期";
				} else {
					var ddf = this.djs(dj); //格式化过后的时间
					this.remaining = ddf;
					//当前时间减去时间
					dj = dj - 1;
					this.remainingd = dj;
				}

			},
			//得到的秒换算成时分秒
			djs: function(ms) {
				//var h = parseInt(ms / (60 * 60));
				var m = parseInt((ms % (60 * 60)) / 60);
				var s = (ms % (60 * 60)) % 60;
				if(s < 10){
					s ='0'+s;
				}
				return m + ":" + s;
			},
		}
	}
</script>

<style>
	@import "../../common/css/icon.css";

	.margin-top {
		margin-top: 0;
	}

	.cu-form-group {
		padding: 0;
		min-height: 0;
	}
	
	radio .wx-radio-input,
	radio .uni-radio-input{
		margin: 0;
		width: 24px;
		height: 24px;
	}
	
	
	radio.radio[checked]::after,
	radio.radio .uni-radio-input-checked::after {
		content: "";
		background-color: transparent;
		display: block;
		position: absolute;
		width: 8px;
		height: 8px;
		z-index: 999;
		top: 0upx;
		left: 0upx;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 200upx;
		/* #ifndef MP */
		border: 7px solid #ffffff !important;
		/* #endif */
	
		/* #ifdef MP */
		border: 8px solid #ffffff !important;
		/* #endif */
	}
</style>
