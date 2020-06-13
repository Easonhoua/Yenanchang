<template>
	<view class="content">
		<view class="top-view">
			<image class="logo-icon" src="/static/img/common/icon_logo.png" mode=""></image>
			<view class="text-edit">{{appVersion}}版本</view>
		</view>
		<list-text-cell :showRightArrow="hasNewVersion" leftText="检查更新" :rightText="hasNewVersion?'立即更新' : '已是最新版本' " @cellClick="updateAppVersion"></list-text-cell>
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
				appVersion: '1.0.0', // app的版本
				serviceVersion : "1.0.0" ,//服务器版本
				hasNewVersion:false
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
				this.getAppVersion();
			// #endif
		},
		methods: {
			getAppVersion:function(){
				this.request.get("/memberapi/api/platform/getMemberVersion.do",{}).then(res=>{
					//console.log("resres = ",res);
					if (uni.getSystemInfoSync().platform == "android") {
						this.serviceVersion = res.data.andorid.configValue;
						
					}
					if (uni.getSystemInfoSync().platform == "ios") {
						this.serviceVersion = res.data.ios.configValue;
					}
					
					// #ifdef APP-PLUS
						plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
							//console.log("wgtinfowgtinfo = ",JSON.stringify(wgtinfo));
							this.appVersion = wgtinfo.version;//app本地应用版本号
							//console.log("this.serviceVersion = ",this.serviceVersion);
							//console.log("this.appVersion = ",this.appVersion);
							this.hasNewVersion = this.serviceVersion > this.appVersion;
						})
					// #endif
					//console.log("this.current ===",this.current);
				})
			},
			updateAppVersion:function(){
				// #ifdef APP-PLUS
					if (this.hasNewVersion){
						if (uni.getSystemInfoSync().platform == "android") {
							var url = this.request.getBaseUrl()+"/app/yenc.apk";
							plus.runtime.openURL(url);
						}
						if (uni.getSystemInfoSync().platform == "ios") {
							//app上线后需要更换id1488590360
							plus.runtime.openURL("https://apps.apple.com/cn/app/id1491888217");
						}
					}
				// #endif
			}
		}
	}
</script>

<style>
	.top-view{
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		margin: 30rpx 0rpx;
		width: 100%;
		height: 360rpx;
		text-align: center;
	}
	.logo-icon{
		margin-top: 80rpx;
		margin-bottom: 30rpx;
		width: 150rpx;
		height: 150rpx;
		margin-left: auto;
		margin-right: auto;
		
	}
</style>
