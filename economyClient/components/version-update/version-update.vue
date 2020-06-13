<template>
	<!-- #ifdef 0 -->
	<view v-if="mustUpdate" class="float-layer" @click="maskClick">
		<view class="update-bd">
			<image class="img" src="/static/img/common/update.png"></image>
			<view class="update-bd-txt">
				<text class="title">更新内容：</text>
				<view class="update-bd-txt-bd">
					<rich-text class="listtxt" v-if="description" :nodes="description"></rich-text>
					<rich-text v-else class="listtxt" nodes="1.修复问题，优化界面\n2.优化性能，提高用户体验"></rich-text>
				</view>
			</view>
			<!-- v-on:click.stop="updateButtonClick" -->
			<view class="btnbar" v-on:click.stop="updateButtonClick">
				<view class="btn update-bd-btn">立即更新</view>
			</view>
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		data() {
			return {
				mustUpdate: false,
				localVersion: "1.0.0",
				serviceVersion: "",
				description: "1.修复问题，优化界面\n2.优化性能，提高用户体验"

			};
		},
		created() {
			// this.checkAppVersion();
		},
		methods: {
			// 检查版本更新，需要调取服务器接口
			checkAppVersion: function() {
				//console.log("版本检查版本检查");
				this.mustUpdate = false;
				// this.serviceVersion = uni.getStorageSync("serviceVersion");
				this.request.get("/memberapi/api/platform/getMemberVersion.do", {}, "N").then(res => {
					//console.log("resres = ", res);
					if (uni.getSystemInfoSync().platform == "android") {
						this.serviceVersion = res.data.andorid.configValue;
						this.description = res.data.andorid.description;
					}
					if (uni.getSystemInfoSync().platform == "ios") {
						this.serviceVersion = res.data.ios.configValue;
						this.description = res.data.ios.description;
					}
					if(!this.description){
						this.description = "1.修复问题，优化界面\n2.优化性能，提高用户体验";
					}
					uni.setStorageSync("serviceVersion",this.serviceVersion);
					this.compareVersion();
				}).catch(e=>{
					this.compareVersion();
				})
				
			},
			compareVersion:function(){
				// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
					this.localVersion = wgtinfo.version; //app本地应用版本号
					// uni.setStorageSync("localVersion",this.localVersion);
					// 测试时可以先注释掉，正式打包时需要把注释去掉
					this.serviceVersion = "1.0.1";
					//console.log("this.serviceVersion = ",this.serviceVersion);
					//console.log("this.localVersion = ",this.localVersion);
					if (this.serviceVersion > this.localVersion) {
						this.mustUpdate = true;
						uni.showModal({ //提醒用户更新  
							title: "版本更新啦",
							showCancel:false,
							confirmText:"立即更新",
							content: this.description,
							success: (e) => {
								if (e.confirm) {
									this.updateButtonClick();
								}
							},
							complete() {
								if (e.confirm) {
									this.updateButtonClick();
								}
							}
						})
					} else {
						this.mustUpdate = false;
					}
				})
				// #endif
			},
			
			// 点击更新按钮，Ios跳到AppStore,Android可以从服务器拉取
			updateButtonClick: function() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "android") {
					var url = this.request.getBaseUrl() + "/app/yenanchang.apk";
					plus.runtime.openURL(url);
				}
				if (uni.getSystemInfoSync().platform == "ios") {
					plus.runtime.openURL("https://apps.apple.com/cn/app/id1491888217");
				}
				// #endif
			},
			maskClick: function() {
				//console.log("uni.getSystemInfoSync().platform ==== ", uni.getSystemInfoSync().platform);
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "android") {
					var url = this.request.getBaseUrl() + "/app/yenanchang.apk";
					plus.runtime.openURL(url);
				}
				if (uni.getSystemInfoSync().platform == "ios") {
					plus.runtime.openURL("https://apps.apple.com/cn/app/id1491888217");
				}
				// #endif
			}
		}
	}
</script>

<style>
	/* -----弹层样式------ */
	.float-layer {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, .6);
		z-index: 99999999;
	}

	.float-layer .btn {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 50rpx;
		text-align: center;
		color: #fff;
		background: linear-gradient(116deg, rgba(75, 164, 245, 1) 0%, rgba(21, 107, 230, 1) 100%);
		margin-top: 50rpx;
		font-size: 32rpx;
	}

	.float-layer .btnbar {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		margin-top: 50rpx;
	}

	.update-bd {
		width: 650rpx;
		border-radius: 0 0 10rpx 10rpx;
		background: #fff;
	}

	.update-bd .img {
		width: 650rpx;
		height: 262.13rpx;
	}

	.update-bd .update-bd-txt {
		width: 650rpx;
		padding: 15rpx 60rpx;
	}

	.update-bd .update-bd-txt .title {
		font-size: 32rpx;
		color: #000000;
		margin-bottom: 20rpx;
		display: block;
		text-align: left;
		font-weight: 700;
	}

	.update-bd .update-bd-txt-bd .listtxt {
		padding: 5rpx;
		color: #808080;
		display: block;
		font-size: 28rpx;
	}

	.update-bd .update-bd-btn {
		width: 246rpx;
		height: 68rpx;
		line-height: 68rpx;
		background: linear-gradient(116deg, #5BC9FB 0%, #0179FD 100%);
		color: #fff;
		box-shadow: 0rpx 2rpx 6rpx #2498FC;
		padding-bottom: 40rpx;
		margin-top: 0;

	}

	.update-bd .btnbar {
		padding-bottom: 40rpx;
	}
</style>
