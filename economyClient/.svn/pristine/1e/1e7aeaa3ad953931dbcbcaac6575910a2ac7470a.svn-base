<template>
	<view class="content-white">

		<image class="login-bg" src="/static/img/user/login-bg.png" mode="aspectFill"></image>
		<image class="login-close" src="/static/img/user/login-close.png" @click="back"></image>
		<view class="phone-view" style="margin-top: 100rpx;">
			<text style="width: 75rpx;">+86</text>
			<view class="phone-line"></view>
			<input class="phone-input" type="number" placeholder-style="color: #989898" v-model="data.mobilePhone" placeholder="请输入手机号码" />
		</view>
		<view v-if="!codeLogin" class="phone-view">
			<text style="width: 85rpx;">密码</text>
			<view class="phone-line"></view>
			<input class="phone-input" v-model="password" :password="!showPassword" placeholder-style="color: #989898" placeholder="请输入密码" />
			<image class="password-eye" :src="showPassword ?  '/static/img/user/pw_show.png' : '/static/img/user/pw_hide.png' "
			 style="margin-left: auto;" @click="showOrHidePassword"></image>
		</view>
		<view v-else-if="isSendCode" class="phone-view">
			<input class="phone-input" type="number" v-model="data.code" placeholder-style="color: #989898" placeholder="请输入验证码" />
			<view v-if="timeDownFlag" class="text-code" style="color: #000000;">{{timeDown}}秒</view>
			<view v-else class="text-code" @click="getVerifyCode">获取验证码</view>
		</view>
		<view v-if="codeLogin" class="text-tip">未注册的手机号验证后自动创建ye南昌账户</view>

		<view class="circle-corner-button" style="margin-top: 55rpx;" @click="loginButonClick">{{loginButtonTitle}}</view>

		<view class="display-row" style="margin-top: 40rpx;">
			<view class="login-left" @click="forgetPassword">忘记密码</view>
			<view class="login-right" @click="changeLoginWay">{{codeLogin?'密码登录':'验证码登录'}}</view>
		</view>
		<!-- 第三方登录 -->
		<view class="auth-view">
			<image class="auth-image" style="border:1rpx solid rgba(63,221,40,1);" src="/static/img/user/login-weixin.png" mode="scaleToFill" @click="oauthLogin('weixin')"></image>
			<image class="auth-image" style="margin-left: auto;" src="/static/img/user/login-qq.png" mode="scaleToFill" @click="oauthLogin('qq')"></image>
		</view>
		<view class="bottom-view">
		登录代表同意<text class="deal-text" @click="readPrivacy">《ye南昌隐私政策》</text>以及<text class="deal-text" @click="readUserDeal">《ye南昌用户协议》</text>,并授权使用您的ye南昌账号信息(如昵称、头像)以便您统一管理
		</view>

	</view>
</template>

<script>
	import md5 from "@/common/js/md5.js"
	export default {
		data() {
			return {
				fatherPage:"",//上一级界面
				password:"",//原始密码
				authLogin:false,//第三方登录
				codeLogin: true,//验证码登录
				showPassword: false,
				timeDown: 120,
				timeDownFlag:false,
				isSendCode: false,
				shortType:"login",
				loginButtonTitle: "获取短信验证码",
				data:{
					mobilePhone:"",
					password:"",//md5加密后的密码
					openId:"",
					code:"",
					type:"1"//登录方式:1:手机验证码、2:密码、3:QQ、4:微信、5:微博
				}
				
			}
		},
		onLoad(option) {
			if(option.fatherPage){
				this.fatherPage = option.fatherPage;
			}
			this.data.mobilePhone = uni.getStorageSync("phone");
			this.loginButtonTitle = this.codeLogin ? "获取短信验证码" : "登录";
		},

		methods: {
			back:function(){
				if(this.fatherPage == "setting"){
					uni.switchTab({
						// url:"/pages/user/userIndex/user"
						url:"/pages/user/user"
					})
				}else{
					uni.navigateBack({})
				}
				
			},
			showOrHidePassword: function() {
				this.showPassword = !this.showPassword;
			},
			forgetPassword: function() {
				uni.navigateTo({
					url:"/pages/user/login/resetPassword"
				})
			},
			changeLoginWay: function() {
				this.codeLogin = !this.codeLogin;
				if(this.codeLogin){
					this.isSendCode = false;
				}
				this.data.type = this.codeLogin ? "1" : "2";
				this.loginButtonTitle = this.codeLogin ? "获取短信验证码" : "登录";
			},
			getVerifyCode: function() {
				let data = {
					"mobilePhone": this.data.mobilePhone,
					"shortType": this.shortType
				}
				this.timeDownFlag = true;
				this.request.get("/memberapi/api/members/sendCode.do", data).then(res => {
					this.isSendCode=true;
					this.timeDownFlag = true;
					this.loginButtonTitle = "登录";
					if(this.authLogin){
						this.loginButtonTitle = "绑定手机号并登录";
					}
					var time = 120;
					let a = setInterval(() => {
						this.timeDown = time;
						if (time <= 0) {
							this.timeDownFlag = false;
							clearInterval(a);
						}
						time--;
					}, 1000);
				}).catch(res=>{
					this.isSendCode = true;
					this.timeDownFlag = false;
				})
			},
			readPrivacy: function() {
				let webUrl = this.request.getBaseUrl() + "/html/privacyUser.html";
				this.util.gotoWebView(webUrl,"ye南昌隐私政策");
				
			},
			readUserDeal:function(){
				let webUrl = this.request.getBaseUrl() + "/html/yhtk.html";
				this.util.gotoWebView(webUrl,"ye南昌用户协议");
			},
			// 第三方授权登录
			oauthLogin: function(type) {
				var self = this;
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
				        //console.log(res.provider)
						if(~res.provider.indexOf('weixin')&&type=='weixin'){
							uni.login({
							    provider: 'weixin',
							    success: function (loginRes) {
							         //console.log("loginRes = ",loginRes);
									self.data.type = "4";
									self.data.openId = loginRes.authResult.unionid;
									self.checkLogin();
							    }
							});
						}else if (~res.provider.indexOf('qq')&&type=='qq') {
				            uni.login({
				                provider: 'qq',
				                success: function (loginRes) {
				                    //console.log("loginRes = ",loginRes);
									self.data.type = "3";
									self.data.openId = loginRes.authResult.openid;
									self.checkLogin();
				                }
				            });
				        }
						
				    }
				});
			},
			loginButonClick: function() {
				if (!this.checker.checkPhone(this.data.mobilePhone)) return;
				uni.setStorageSync("phone", this.data.mobilePhone);
				if (this.codeLogin) {//验证码登录
					if(this.isSendCode){//已经发送验证码
						if(this.authLogin){
							this.bindingPhone();
						}else{
							this.checkLogin();
						}
						
					}else{//获取验证码
						this.request.get("/memberapi/api/members/checkUser.do",this.data).then(res=>{
							this.shortType = res.data ? "login" : "register";
							this.getVerifyCode();
						})
					}
				} else {//密码登录
					this.checkLogin();
				}

			},
			bindingPhone:function(){
				if (!this.checker.checkPhone(this.data.mobilePhone)) return;
				this.data.userName = this.data.mobilePhone;
				this.request.get("/memberapi/api/members/bindingPhone.do",this.data).then(res=>{
					this.checkLogin();
				})
			},
			checkLogin:function(){
				if(this.data.type == "1"){
					if(!this.checker.checkCode(this.data.code)) return;	
				}else if(this.data.type == "2"){
					// password
					if(!this.checker.checkPassword(this.password)) return;
					this.data.password = md5.hexMD5(this.password); 
				}
				uni.removeStorageSync("token");
				this.request.get("/memberapi/api/members/checklogin.do", this.data).then(res => {
					uni.setStorageSync("token",res.data.token);
					this.request.setStorage(res);
					this.readUserInfo();
					// 1秒之后跳转到我的界面，并且获取用户数据，否则会读取用户信息报错(token已经带上)
					// var self = this;
					// setTimeout(function() {
					// 	self.readUserInfo();
					// 	// uni.switchTab({
					// 	// 	url:"/pages/user/userIndex/user"
					// 	// })
					// }, 1000);
					
				}).catch(res=>{
					//console.log("登录失败 res = ",res);
					if(res.returncode == 1002){
						if(this.data.type == 3 || this.data.type == 4){//第三方登录
							this.request.toastTipsTime("您还未绑定手机号,请先绑定手机号",2000);
							this.codeLogin = true;
							this.authLogin = true;
							this.loginButtonTitle = "绑定手机号";
						}
					}
				})
			},
			// 读取用户信息
			readUserInfo: function() {
				this.request.getUserInfo().then(res=>{
					if(this.fatherPage == "setting"){
						uni.switchTab({
							url:"/pages/user/user"
						})
					}else{
						uni.navigateBack({})
					}
				})
			}
			
		}
	}
</script>

<style>
	.login-close {
		position: absolute;
		top: 34rpx;
		/* margin-top: 50rpx; */
		padding: 40rpx;
		width: 110rpx;
		height: 110rpx;
		z-index: 66;
		
		/* margin-top: -200rpx; */
	}

	.login-bg {
		width: 750rpx;
		height: 328rpx;
	}

	.phone-view {
		width: 550rpx;
		height: 100rpx;
		margin-left: 100rpx;
		/* margin-top: 96.52rpx; */
		/* border-radius: 12.5rpx;
	border: 1.38rpx solid #4490FD; */
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.phone-icon {
		width: 24.3rpx;
		height: 38.88rpx;
		padding: 35.41rpx;
	}

	.phone-line {
		width: 2rpx;
		height: 34rpx;
		z-index: 100;
		/* margin-left: 20rpx; */
		margin-right: 20rpx;
		background-color: #EEEEEE;

	}

	.phone-input {
		width: 450rpx;
		font-size: 30rpx;
		text-align: left;
	}

	.text-tip {
		font-size: 24rpx;
		color: #989898;
		margin-left: 100rpx;
		margin-top: 12rpx;
	}

	.code-view {
		width: 638.88rpx;
		height: 88.88rpx;
		margin-left: 55.55rpx;
		margin-top: 27.77rpx;
		border-radius: 12.5rpx;
		border: 1.38rpx solid #D8D8D8;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.text-code {
		font-size: 28rpx;
		width: 180rpx;
		color: #0081FF;
		text-align: right;
		background-color: #FFFFFF;
		
	}

	.code-icon {
		width: 24.3rpx;
		height: 38.88rpx;
		padding: 35.41rpx;
	}

	.code-line {
		width: 2rpx;
		height: 47.22rpx;
		z-index: 100;
		background-color: #D8D8D8;
	}

	.code-input {
		width: 308.33rpx;
		margin-left: 20.8rpx;
		font-size: 27.77rpx;
	}

	.login-left {
		margin-left: 100rpx;
		height: 80rpx;
		font-size: 30rpx;
		background: linear-gradient(to right, #57ADFE, #267EFF);
		-webkit-background-clip: text;
		color: transparent;
	}

	.login-right {
		margin-left: auto;
		margin-right: 100rpx;
		height: 80rpx;
		font-size: 30rpx;
		background: linear-gradient(to right, #57ADFE, #267EFF);
		-webkit-background-clip: text;
		color: transparent;

	}

	.password-eye {
		width: 50rpx;
		height: 50rpx;
	}

	.auth-view {
		position: fixed;
		left: 150rpx;
		bottom: 250rpx;
		width: 450rpx;
		display: flex;
		flex-direction: row;
	}

	.auth-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
		border:1rpx solid #0081FF;
	}

	.deal-text {
		font-size: 24rpx;
		background: linear-gradient(to right, #57ADFE, #267EFF);
		-webkit-background-clip: text;
		color: transparent;
	}

	.bottom-view {
		position: fixed;
		bottom: 80rpx;
		left: 30rpx;
		width: 690rpx;
		height: 80rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #989898;
	}
</style>
