<template>
	<view class="content-white">
		<view class="top-shadow-line"></view>
		<view class="shadow-view">
			<view class="input-view">
				<image class="input-image" src="/static/img/user/icon_phone.png" ></image>
				<input class="login-input" v-model="phone" placeholder="请输入手机号" />
				<view class="text-detail">+86</view>
			</view>
			
			<view class="input-view">
				<image class="input-image" src="/static/img/user/icon_verifycode.png" ></image>
				<input class="login-input" v-model="verifyCode" style="width: 420rpx;" placeholder="请输入验证码" />
				<view v-if="!isSendCode" class="verify-code" @click="verifyCodeButtonClick">获取验证码</view>
				<view v-else class="text-detail right-style" style="text-align: right;">{{timeDown}}</view>
			</view>
			
			<view class="input-view">
				<image class="input-image" src="/static/img/user/icon_password.png" ></image>
				<input class="login-input" v-model="password" :password="!showPassword" placeholder="设置登录密码"/>
				<image class="password-eye" :src="showPassword?'/static/img/user/pw_show.png' : '/static/img/user/pw_hide.png' "  @click="showOrHidePassword"></image>
			
			</view>
		</view>
		
		<view class="circle-corner-button" style="margin-top: 100rpx;" @click="resetButonClick">找回密码</view>
		
	</view>
</template>

<script>
	
	import md5 from "@/common/js/md5.js"
	
	export default {
		data() {
			return {
				phone:"",
				password:"",
				verifyCode:"",
				timeDown:"120s",
				isSendCode:false,
				showPassword:false
			}
		},
		onLoad() {
			this.phone = uni.getStorageSync("phone");
		},
		methods:{
			verifyCodeButtonClick:function(){
				if(!this.checker.checkPhone(this.phone)) return;
				let data = {
					"mobilePhone":this.phone,
					"shortType":"resetpwd"
				}
				this.request.get("/memberapi/api/members/sendCode.do",data).then(res=>{
					this.isSendCode=true;
					var time = 120;
					let a = setInterval(() => {
						this.timeDown = time + "s";
						if (time <= 0) {
							this.isSendCode = false;
							clearInterval(a);
						}
						time--;
					}, 1000);
				})
			},
			showOrHidePassword:function(){
				this.showPassword = !this.showPassword;
			},
			resetButonClick:function(){
				if(!this.checker.checkPhone(this.phone)) return;
				if(!this.isSendCode){
					this.request.toastTips("请先获取验证码");
					return;
				}
				if(!this.checker.checkCode(this.verifyCode)) return;
				if(!this.checker.checkPassword(this.password)) return;
				let data = {
					"mobilePhone":this.phone,
					"code":this.verifyCode,
					"password":md5.hexMD5(this.password)
				}
				this.request.get("/memberapi/api/members/resetPassWord.do",data).then(res=>{
					this.request.toastTips("重置密码成功，请重新登录");
					uni.navigateBack({});
				})
				
			}
			
		}
	}
</script>

<style>
	.shadow-view{
		margin:30rpx;
		margin-top: 60rpx;
		width: 690rpx;
		padding: 30rpx;
		padding-bottom: 70rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx 5rpx rgba(0, 0, 0, 0.1);
	}
	
	.input-view{
		width: 100%;
		height: 110rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 2rpx solid #F5F5F5;
	}
	
	.input-image{
		width: 40rpx;
		min-width: 40rpx;
		height: 40rpx;
	}
	.login-input{
		width: 500rpx;
		margin-left: 20rpx;
		font-size: 30rpx;
		/* border-radius: ; */
	}
	.password-eye
	{
		width: 50rpx;
		height: 50rpx;
	}
	.verify-code{
		text-align: right;
		font-size: 26rpx;
		color: #007AFF;
		/* margin-left: auto; */
		margin-right: 20rpx;
	}
	.deal-view{
		width: 100vw;
		height: 100rpx;
		font-size: 28rpx;
		color: gray;
	}
	.deal-cheak{
		width: 30rpx;
		height: 30rpx;
		padding: 0rpx 20rpx 0rpx 40rpx;
	}
	.deal-text{
		color: #007AFF;
	}
</style>
