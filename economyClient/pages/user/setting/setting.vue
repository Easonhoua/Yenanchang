<template>
	<view class="content" style="height: 100vh;">
	
		<list-text-cell :showRightArrow='true' :leftTexts="leftTexts" :rightTexts="rightTexts" :urls="urls" style="margin-top: 30rpx;"></list-text-cell>
		<view class="circle-corner-button" style="margin-top: 100rpx;" @click="logout">退出登录</view>
	</view>
</template>

<script>
	import listTextCell from "@/components/list-cell-view/list-text-cell.vue"
	export default {
		components:{
			listTextCell
		},
		
		data() {
			return {
				indexList:[],
				leftTexts:[],
				rightTexts:[],
				urls:[]
			}
		},
		onLoad() {
			this.setupData();
		},
		methods: {
			setupData:function(){
				this.leftTexts = ["个人资料","收货地址","账号安全","隐私政策","用户协议"];
				this.rightTexts = ["查看个人资料","查看收货地址","设置账号安全","查看隐私政策","查看用户协议"];
				this.urls = [
					
					"/pages/user/userIndex/userInfo",
					"/pages/purchase/shoppingAddressList",
					"/pages/user/setting/accountSafe",
					"/pages/webView/webView?webUrl="+this.request.getBaseUrl() + '/html/privacyUser.html' + '&webTitle=隐私政策',
					"/pages/webView/webView?webUrl="+this.request.getBaseUrl() + '/html/yhtk.html' + '&webTitle=用户协议'
				];
				
			},
			logout:function(){
				this.request.post("/memberapi/api/members/logout.do").then(res=>{
					this.request.toastTips("退出登录成功");
					this.request.removeStorage();
					uni.navigateTo({
						url:"/pages/user/login/login?fatherPage=setting",
						animationType:"slide-in-bottom",
						animationDuration: 200
					})
				}).catch(res=>{
					this.request.removeStorage();
					uni.navigateTo({
						url:"/pages/user/login/login?fatherPage=setting",
						animationType:"slide-in-bottom",
						animationDuration: 200
					})
				})
			}
			
		}
	}
</script>

<style>
	
</style>
