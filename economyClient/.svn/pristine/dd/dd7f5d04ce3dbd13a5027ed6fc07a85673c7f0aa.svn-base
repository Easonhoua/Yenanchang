<template>
	<view class="content-white">
		<view class="top-shadow-line"></view>
		<view class="input-view" style="margin-top: 100rpx;">
			<view class="left-text">旧密码</view>
			<input v-model="oldPassword" placeholder="请输入原始密码" :password="!showOldPassword" placeholder-style="color:#989898"/>
			<image class="password-eye" :src="showOldPassword ?  '/static/img/user/pw_show.png' : '/static/img/user/pw_hide.png' " @click="showOrHidePassword(1)"></image>
		</view>
		
		<view class="input-view">
			<view class="left-text">新密码</view>
			<input v-model="newPassword" placeholder="请输入新的密码" :password="!showNewPassword" placeholder-style="color:#989898"/>
			<image class="password-eye" :src="showNewPassword ?  '/static/img/user/pw_show.png' : '/static/img/user/pw_hide.png' " @click="showOrHidePassword(2)"></image>
		</view>
		
		<view class="input-view">
			<view class="left-text">确认密码</view>
			<input v-model="surePassword" placeholder="再次输入新密码" :password="!showSurePassword" placeholder-style="color:#989898"/>
			<image class="password-eye" :src="showSurePassword ?  '/static/img/user/pw_show.png' : '/static/img/user/pw_hide.png' " @click="showOrHidePassword(3)"></image>
		</view>
		<view class="display-row">
			<view class="tip-view">温馨提示：密码长度6-32位</view>
			<view class="text-password"  @click="forgetPasswordButtonClick">忘记旧密码？</view>
		</view>
		
		<view class="circle-corner-button" style="margin-top: 100rpx;" @click="sureButtonClick">确认修改</view>
	</view>
	
</template>

<script>
	
	import md5 from "@/common/js/md5.js"
	
	export default {
		data() {
			return {
				oldPassword : "",
				newPassword : "",
				surePassword : "",
				showOldPassword:false,
				showNewPassword:false,
				showSurePassword:false
			}
		},
		onLoad() {
			
		},
		methods: {
			showOrHidePassword:function(flog){
				if(flog == 1){
					this.showOldPassword = !this.showOldPassword;
				}else if (flog == 2){
					this.showNewPassword = !this.showNewPassword;
				}else{
					this.showSurePassword = !this.showSurePassword;    
				}
				
			},
			forgetPasswordButtonClick:function(){
				uni.navigateTo({
					url:"/pages/user/login/resetPassword"
				})
			},
			sureButtonClick:function(){
				if(this.oldPassword.length <=0)
				{
					this.request.toastTips("请输入原密码");
					return;
				}
				if(!this.checker.checkPassword(this.newPassword))return;
				if(!(this.newPassword == this.surePassword))
				{
					this.request.toastTips("两次输入的新的密码不一致，请重新输入");
					return;
				}
				
				let url = "/memberapi/api/members/modifyPassword.do"
				let data = {
					"oldPassword" : md5.hexMD5(this.oldPassword),
					"password" : md5.hexMD5(this.newPassword) 
				}
				this.request.post(url,data).then(res=>{
					this.request.showModal("密码修改成功").then(() => {
						uni.navigateBack();
					});
				})
				
			}
		}
	}
</script>

<style>
	
	.input-view{
		margin-left: 100rpx;
		width: 550rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #979797;
		/* padding: 0rpx 100rpx; */
	}
	
	.left-text {
		width: 160rpx;
		font-size: 28rpx;
		color: #000000;
	}
	.tip-view{
		margin-left: 100rpx;
		color:#989898;
		margin-top: 20rpx;
		font-size: 24rpx;
	}
	.password-eye {
		width: 50rpx;
		height: 50rpx;
		margin-left: auto;
	}
	.text-password{
		margin-left: auto;
		margin-right: 100rpx;
		font-size: 24rpx;
		margin-top: 20rpx;
		background: linear-gradient(to right, #57ADFE, #267EFF);
		-webkit-background-clip: text;
		color: transparent;
	}
</style>
