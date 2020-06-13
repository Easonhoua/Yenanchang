<template>
	<view class="content">
		<text class="text-deal" style="padding: 40rpx 40rpx 20rpx 30rpx;">验证当前绑定的手机号 {{phone}}</text>
		<view class="input-view">
			<view class="left-text">验证码</view>
			<input v-model="code" placeholder="请输入验证码" placeholder-style="color:#dbdbdb" />
			<view v-if="isSendCode" class="text-edit right-style">{{timeDown}}秒</view>
			<view v-else class="left-text right-style" @click="getVerifyCode()">获取验证码</view>
		</view>


		<!-- <view class="circle-corner-button" style="margin-top: 100rpx;" @click="sureButtonClick">获取短信验证码</view> -->
	</view>

</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				code: "",
				isSendCode:false,
				timeDown:120
			}
		},
		onLoad() {
			this.phone = uni.getStorageSync("phone");
		},
		onNavigationBarButtonTap() {
			this.checkMobiePhone();
		},
		methods: {
			getVerifyCode: function() {
				
				let data = {
					"mobilePhone": this.phone,
					"shortType": "checkMobile"
				}
				this.request.get("/memberapi/api/members/sendCode.do", data).then(res => {
					this.isSendCode=true;
					var time = 120;
					let a = setInterval(() => {
						this.timeDown = time;
						if (time <= 0) {
							this.isSendCode=false;
							clearInterval(a);
						}
						time--;
					}, 1000);
				})
			},
			checkMobiePhone:function(){
				if(!this.isSendCode){
					this.request.toastTips("请先获取验证码!");
					return;
				}
				if(!this.checker.checkCode(this.code)) return;
				var data = {
					mobilePhone:this.phone,
					code:this.code,
					shortType:"checkMobile"
				}
				this.request.post("/memberapi/api/members/updateMobilePhone.do",data).then(res=>{
					uni.navigateTo({
						url: "/pages/user/setting/updatePhoneSecond"
					})
				})
				
			}
		}
	}
</script>

<style>
	.input-view {
		width: 750rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		padding: 30rpx;
	}
	
	.left-text {
		width: 160rpx;
		font-size: 32rpx;
		color: #000000;
	}
</style>
