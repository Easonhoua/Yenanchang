<template>
	<view class="content">
		<view class="top-bgview"></view>
		<mescroll-body @down="dowmCallBack" :up="upOption" :down="downOption">
		<view class="top-view">
			<view class="top-title">我的</view>
			<view class="display-row">
				<!-- /static/img/index/user.png -->
				<!-- :src="userData.photo? util.formatImagePath(userData.photo) : '/static/img/common/default_header.png' " -->
				<image class="user-image" :src="userData.photo"  mode="aspectFill" @click="readUserImage"></image>
				<view class="display-column">
					<view class="user-name" @click="gotoUserInfo">{{userData.nick}} <text v-if="userData.gradeName" class="user-garde">{{userData.gradeName}}</text> </view>
					<view class="user-edit" @click="gotoUserInfo">编辑个人资料</view>
				</view>
				<image class="setting-image" src="/static/img/user/user_setting_white.png" @click="gotoSetting"></image>
			</view>
		</view>
		
		
		<view class="list-view">
			<view class="list-item display-row" v-for="(item,index) in userIndexs" :key="index" @click="listCellClick(item)">
				<image class="list-icon" :src="item.icon"></image>
				<view class="list-text display-row">
					<view>{{item.text}}</view>
					<image class="right-arrow-img" style="margin-left: auto;"></image>
				</view>
				
			</view>
		</view>
		</mescroll-body>
		
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				userIndexs:[],
				loginStatus:false,
				downOption:{
					auto:true
				},
				upOption: {
					use: false
				},
				userData:{
					photo:"/static/img/common/banner.png",
					nick:"立即登录"
				},
			}
		},
		onShow() {
			this.userData = uni.getStorageSync("user");
			if(!this.userData){
				this.request.removeStorage();
				this.userData = {
					photo:"",
					nick:"立即登录"
				}
			} 
		},
		onLoad() {	
			this.getUserIndexs();
			uni.setStorageSync("addData",0); //话题页签置为0
		},
		watch: {
			userData(newUserData,oldUserData){
				this.userData = newUserData;
				this.userData.photo = this.util.formatImagePath(this.userData.photo);
			}
		},
		methods: {
			getUserIndexs:function(){
				this.userIndexs = [
					// {
					// 	"url":"/pages/purchase/shoppingAddressList",
					// 	"icon":"/static/img/user/user_address.png",
					// 	"text":"收货地址"
					// },
					{
						"url":"/pages/user/userIndex/order",
						"icon":"/static/img/user/user_order.png",
						"text":"我的订单"
					},
					{
						"url":"/pages/user/userIndex/favorite",
						"icon":"/static/img/user/user-favorite.png",
						"text":"我的收藏"
					},
					{
						"url":"/pages/user/userIndex/coupon",
						"icon":"/static/img/user/user_coupon.png",
						"text":"我的卡券"
					},
					{
						"url":"/pages/user/userIndex/topic",
						"icon":"/static/img/user/user_topic.png",
						"text":"我的话题"
					},
					{
						"url":"/pages/user/userIndex/comment",
						"icon":"/static/img/user/user_comment.png",
						"text":"我的评论"
					},
					{
						"url":"/pages/user/userIndex/activity",
						"icon":"/static/img/user/user_report.png",
						"text":"我的活动"
					},
					{
						"url":"/pages/user/userIndex/suggest",
						"icon":"/static/img/user/user_advise.png",
						"text":"意见反馈"
					},
					{
						"url":"/pages/user/userIndex/about",
						"icon":"/static/img/user/user_about.png",
						"text":"关于我们"
					}
				]
			},
			dowmCallBack:function(mescroll){
				//console.log("this.request.loginState() = ",this.request.loginState());
				if(!this.request.loginState()){
					mescroll.endSuccess();
					return;
				}  
				this.request.getUserInfo(mescroll).then(res=>{
					this.userData = res;
				})
			},
			readUserImage:function(){
				if(this.request.alreadyLogin()){
					//console.log("this.userData.photo == ",this.userData.photo);
					//一定要加上不然在第三方登录点击头像是会卡
					if(this.userData.photo && this.userData.photo != '/static/img/common/banner.png'){
						uni.previewImage({
							urls:[this.userData.photo]
						})
					}else{
						uni.navigateTo({
							url:"/pages/user/userIndex/userInfo"
						})
					}
				}
			},
			gotoUserInfo:function(){
				if(this.request.alreadyLogin()){
					uni.navigateTo({
						url:"/pages/user/userIndex/userInfo"
					})
				}
			},
			gotoSetting:function(){
				if(this.request.alreadyLogin()){
					uni.navigateTo({
						url:"/pages/user/setting/setting"
					})
				}
			},
			listCellClick:function(item){
				
				if(this.request.alreadyLogin()){
					uni.navigateTo({
						url:item.url
					})
				}
			}
		}
	}
</script>

<style>
	.top-bgview{
		width: 750rpx;
		height: 320rpx;
		background-color: #43917A;
		/* z-index: -2; */
		/* background-color: rgba(97,184,253,1); */
		/* position: fixed; */
		position: absolute;
	}
	.top-view{
		width: 100vw;
		/* height: 386rpx; */
		height: 340rpx;
		display: flex;
		flex-direction: column;
		background-color: #43917A;
		/* background: linear-gradient(to bottom, #43917A 50%,#43917A 100%);    */
		/* background:linear-gradient(180deg,#43917A 0%,#43917A 100%); */
		/* background:linear-gradient(180deg,rgba(70,145,123,0.5) 30%,rgba(70,145,123,1) 100%); */
	}
	.top-bg{
		position: absolute;
		width: 100%;
		/* height: 386rpx; */
		/* height: 310rpx; */
		z-index: 0;
	}
	.top-title{
		width: 600rpx;
		margin: 36rpx;
		margin-top: 60rpx;
		font-weight: bold;
		font-size: 40rpx;
		z-index: 1;
		color: #FFFFFF;
	}
	.top-login
	{
		margin-left: 36rpx;
		width:240rpx;
		height:68rpx;
		
		border-radius:8rpx;
		z-index: 2;
		text-align: center;
		line-height: 68rpx;
		font-size: 32rpx;
		background:linear-gradient(180deg,rgba(97,184,253,1) 0%,rgba(49,162,248,1) 100%);
		-webkit-background-clip: text;
		color: transparent;
		background:#FFFFFF;
	}
	.user-image{
		width: 110rpx;
		height: 110rpx;
		border-radius: 110rpx;
		border: 3rpx solid #FFFFFF;
		margin: 0rpx 30rpx;
	}
	.user-name{
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		max-width: 480rpx;
	}
	.user-garde{
		font-size: 24rpx;
		margin-left: 20rpx;
		padding: 0rpx 20rpx 2rpx 20rpx;
		border-radius: 40rpx;
		background-color: #FFCF4D;
		color: #FFFFFF;
	}
	.user-edit{
		background-color: #FFFFFF;
		/* color: #31A2F8; */
		color: #43917A;
		font-size: 24rpx;
		margin-top: 20rpx;
		width: 180rpx;
		padding: 5rpx 16rpx;
		border-radius: 6rpx;
		text-align: center;
	}
	.setting-image{
		width: 100rpx;
		height: 75rpx;
		padding: 25rpx;
		padding-top: 0rpx;
		margin-left: auto;
		margin-bottom: auto;
	}
	.list-view{
		width: 100vw;
		margin: 30rpx 0rpx;
		background-color: #FFFFFF;
	}
	.list-item{
		width: 100%;
		height: 106rpx;
		font-size: 32rpx;
		color: #09041E;
	}
	.list-icon{
		width: 44rpx;
		min-width: 44rpx;
		height: 44rpx;
		margin: 0rpx 24rpx 0rpx 36rpx;
	}
	.list-text
	{
		width: 100%;
		height: 106rpx;
		border-bottom: 2rpx solid #F5F5F5;
		line-height: 108rpx;
		font-size: 32rpx;
	}
	
	.setting-view
	{
		width: 100vw;
		height: 106rpx;
		background-color: #FFFFFF;
	}
	
</style>
