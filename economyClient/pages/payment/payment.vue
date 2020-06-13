<template>
	<view class="content payment">
		<!-- 滑动图片 -->
		<view class="topbox bottom-line">
			<view class="">支付剩余时间{{remaining}}</view>
			<view><text class="fh">￥</text><text class="number">{{payTotalAmount}}</text></view>
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
							<radio class="orange" :class="payType=='1'?'checked':''" :checked="payType=='1'?true:false" value="1"></radio>
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
							<radio class="orange" :class="payType=='2'?'checked':''" :checked="payType=='2'?true:false" value="2"></radio>
						</view>
					</view>
				</view>
				<view class="payment-cell bottom-line">
					<view class="icon">
						<image src="../../static/img/common/pay_yl.jpeg"></image>
					</view>
					<view class="payment-cell-bd">银联云闪付</view>
					<view class="payment-cell-radio">
						<view class="cu-form-group margin-top">
							<radio class="orange" :class="payType=='3'?'checked':''" :checked="payType=='3'?true:false" value="3"></radio>
						</view>
					</view>
				</view>
				<!-- <view class="payment-cell bottom-line">
					<view class="icon"></view>
					<view class="payment-cell-bd otherpay">切换其它银行卡支付</view>
					<view class="payment-cell-radio">
						<image class="arrow-right" src="../../static/img/common/right-choose-arrow.png"></image>
					</view>
				</view> -->
			</radio-group>
		</view>
		<view class="bottombar">
			<view class="btn" :loading="loading" :disabled="loading" @tap="submitOrder">确认支付</view>
		</view>
	</view>
</template>

<script>
	const pay = uni.requireNativePlugin('Lckj-Chinaums-Pay');
	const lcPayUtil = uni.requireNativePlugin('Lckj-unionpay');
	export default {
		data() {
			return {
				loading: false,
				orderId: 0, //订单编号
				payType: '1',
				remaining: '30:00', //显示剩余时间
				remainingd: '30:00', //数据返回时间秒
				payTotalAmount: 0,
				orderType:0, //订单类型
			}
		},
		onLoad(e) {
			if (e.orderId) {
				this.orderId = e.orderId;
			}
			if (e.payTotalAmount) {
				this.payTotalAmount = e.payTotalAmount;
			}
			this.getmsglist(); //第一次加载数据
			//
		},
		methods: {
			queryPay:function(orderId){
				var _this = this;
				let data = {
					orderId: this.orderId, //订单编号
				}
				let url = "/memberapi/api/pay/queryPayInfo.do";
				this.request.post(url, data).then(res => {
					uni.$emit("payCallback",res);
					// uni.navigateBack();
					// 支付成功跳转到订单列表界面
					uni.redirectTo({
						url:"/pages/user/userIndex/order"
					})
				});
			},
			//支付订单
			submitOrder: function() {
				var dj = this.remainingd;
				if (dj <= 0) {
					this.remaining = "00:00";
				} else {
					let data = {
						orderId: this.orderId, //订单编号
						payType: this.payType //支付类型(1:支付宝、2:微信、3:银联云闪付)
					}
					let url = "/memberapi/api/pay/getPayInfo.do";
					var _this = this;
					this.request.post(url, data).then(res => {
						if (res.returncode === 0) {
							//跳转到订单详情页面
							var data = res.data;
							data = JSON.parse(data)
							if(this.payType==1){//支付宝支付
								if (uni.getSystemInfoSync().platform == "android") {
									pay.aliPay({
										payData:data.appPayRequest
									},result=>{
										if(result.resultCode=="0000"){
											_this.queryPay(_this.orderId);
										}
										
									})
								}
								if (uni.getSystemInfoSync().platform == "ios") {
									lcPayUtil.aliPay({
										payData:data.appPayRequest
									},result=>{
										console.log("支付宝支付结果 === %@",result);
										if(result.resultCode=="0000"){
											_this.request.toastTips("支付成功");
											_this.queryPay(_this.orderId);
										}else{
											var resultInfo = JSON.parse(result.resultInfo);
											uni.showModal({
												content: resultInfo.resultMsg
											})
										}
									});
								}
								
							}else if(this.payType==2){//微信支付
								if (uni.getSystemInfoSync().platform == "android") {
									pay.wxPay({
										payData:data.appPayRequest
									},result=>{
										console.log("result",result)
										if(result.resultCode=="0000"){
											_this.queryPay(_this.orderId);
										}
									})
								}
								
								if (uni.getSystemInfoSync().platform == "ios") {
									lcPayUtil.wxPay({
										payData:data.appPayRequest
									},result=>{
										console.log("微信支付结果%@",result);
										if(result.resultCode=="0000"){
											_this.request.toastTips("支付成功");
											_this.queryPay(_this.orderId);
										}else{
											var resultInfo = JSON.parse(result.resultInfo);
											uni.showModal({
												content: resultInfo.resultMsg
											})
										}
									});
								}
								
							}else if(this.payType==3){//云闪付
					
								if (uni.getSystemInfoSync().platform == "android") {
									pay.yunPay({
										payData:data.appPayRequest
									},result=>{
										console.log("云闪付结果%@",result);
										if(result.resultCode=="0000"){
											_this.queryPay(_this.orderId);
										}
										
									})
								}
					
								if (uni.getSystemInfoSync().platform == "ios") {
									console.log("云闪付 = ",data.appPayRequest);
									lcPayUtil.yunPay({
										payData:data.appPayRequest
									},result=>{
										console.log("云闪付的结果resultInfo%@",resultInfo);
										if(result.resultCode=="0000"){
											_this.request.toastTips("支付成功");
											_this.queryPay(_this.orderId);
										}else{
											var resultInfo = JSON.parse(result.resultInfo);
											uni.showModal({
												content: resultInfo.resultMsg
											})
										}
									});
								}
							}
							
						} else {
							_this.loading = false;
							_this.request.toastTips("新增失败");
						}
					});
					
					
				}
			},
			//选取支付类型
			RadioChange: function(e) {
				this.payType = e.detail.value;
			},
			//时间倒计时
			//获取列表信息
			getmsglist: function() {
				var _self = this;
				//根据订单编号获取当前离订单过期时间的时长
				let data = {
					orderId: this.orderId,
				};
				let url = "/memberapi/api/orders/read.do";
				_self.request.post(url, data).then(res => {
					if (res.returncode === 0 && res.data) {
						var data = res.data;
						_self.orderType = data.orderType;
						//console.log(data)
						var stime = new Date(data.orderEndDate.replace(/-/g,"/")).getTime();
						var etime = new Date().getTime();
						
						//console.log(stime);
						//console.log(etime);
						if (etime > stime) {
							_self.remainingd = 0;
						} else {
							var usedTime = stime - etime; //两个时间戳相差的毫秒数
							_self.remainingd = Math.floor(usedTime/1000);
							//console.log(usedTime);
							//console.log(_self.remainingd);
						}
						_self.jishiqi(); //执行一次倒计时，因为进入页面有等待

						setInterval(function() {
							_self.jishiqi();
						}, 1000)

						uni.hideLoading(); //关闭加载
					}
				});
			},
			//倒计时计时器
			jishiqi: function() {
				var dj = this.remainingd;
				if (dj <= 0) {
					this.remaining = "00:00";
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
				if (m < 10) {
					m = '0' + m;
				}
				var s = (ms % (60 * 60)) % 60;
				if (s < 10) {
					s = '0' + s;
				}
				return m + ":" + s;
			},
			back:function() {
				let that = this;
				if(that.orderType == 4){
					uni.redirectTo({
						url:'../scenic/scenicOrderView?orderId='+that.orderId
					})
				}else{
					uni.navigateBack({});
				}
			}
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.back();
			return true;
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
	radio .uni-radio-input {
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
