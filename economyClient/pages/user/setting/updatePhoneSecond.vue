<template>
	<view class="content">
		<text class="text-deal" style="padding: 40rpx 40rpx 20rpx 30rpx;">更换后，下次可以用新手机号登录</text>
		<view class="input-view">
			<view class="left-text">+86</view>
			<input v-model="phone" placeholder="请输入新手机号" placeholder-style="color:#dbdbdb" />
		</view>
	
		<view class="input-view">
			<view class="left-text">验证码</view>
			<input v-model="code" placeholder="请输入验证码" placeholder-style="color:#dbdbdb" />
			<view v-if="isSendCode" class="text-edit right-style">{{timeDown}}秒</view>
			<view v-else class="left-text right-style" @click="getVerifyCode()">获取验证码</view>
		</view>
	
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				code:"",
				isSendCode:false,
				timeDown:120
			}
		},
		onNavigationBarButtonTap() {
			this.updateMobiePhone();
		},
		methods: {
			getVerifyCode: function() {
				if(!this.checker.checkPhone(this.phone)) return;
				let data = {
					"mobilePhone": this.phone,
					"shortType": "resetMobile"
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
			updateMobiePhone:function(){
				if(!this.checker.checkPhone(this.phone)) return;
				if(!this.checker.checkCode(this.code)) return;
				var data = {
					mobilePhone:this.phone,
					code:this.code,
					shortType:"resetMobile"
				}
				this.request.post("/memberapi/api/members/updateMobilePhone.do",data).then(res=>{
					this.request.toastTips("手机号修改成功");
					setTimeout(function() {
						uni.switchTab({
							url:"/pages/user/userIndex/user"
						})
					}, 1500);
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
		background-color: #FFFFFF;
		padding: 30rpx;
	}
	
	.left-text {
		width: 160rpx;
		font-size: 32rpx;
		color: #000000;
	}
</style>
