<template>
	<view class="content-white">
		<view class="logo-view">
			<image class="logo-icon shadow-border" src="/static/img/common/icon_logo.png"></image>
		</view>
		<view class="cell-height-50 border-bottom-gray-line display-row">
			<view class="left-style text-detail">当前版本</view>
			<view class="right-style text-edit">当前版本：{{current}}</view>
		</view>
		<view class="cell-height-50 border-bottom-gray-line display-row">
			<view class="left-style text-detail">最新版本</view>
			<view class="right-style text-edit">最新版本：{{latest}}</view>
		</view>
	
	<view class="minorContent bottom_aera">
	  <view v-if="startProgress && !currentIsLatest" class="smallTitle">
	    <text >下载进度:{{ downloadProgress }}%</text>
	    <progress :percent="downloadProgress" stroke-width="4" />
	  </view>
	  <!-- <button v-if="!startProgress && !currentIsLatest" type="primary" @click="handleUpdate()">立即更新</button> -->
	  <!-- <button v-if="currentIsLatest" :loading="buttonLoading" type="primary" @click="getLatest()">检查更新</button> -->
	</view>
	
		<view class="company-info">
			<text class="text-detail">江西省南昌日报社\nCopyright © 2000-2019 All rights reserved</text>
		</view>
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: '1.0.0', // 当前版本信息
				latest: '1.0.0', // 最新版本信息
				packgeSize: null, // 更新包大小
				packgePath: 'http://gzb.gzy360.com/account/html/app/gzb.apk', // 更新包的文件地址
				downloadTask: null, // 下载任务
				downloadProgress: 0, // 下载进度
				buttonLoading: false, // 加载 - 标记
				installed: false, // 是否执行了安装 - 标记
				startProgress: false, // 下载进行 - 标记
				currentIsLatest: true ,// 当前版本就是最新版本 - 标记
				updateButtonTitle:"立即更新"
				
		
			}
		},
		// 如果用户下载后没有完成安装，却回到app，则执行这里
		onShow() {
			if (this.installed === true && this.packgePath) {
				this.installed = false
				this.haveDownloaded()
			}
			// this.getLatest();
		},
		onLoad() {
			this.getAppVersion();
		},
		// 用户关闭页面时检查是否存在下载任务
		onUnload() {
		    if (this.downloadTask) {
		      this.closeTask()
		      this.showToast('更新被取消')
		    }
		},
		methods: {
		
			getAppVersion:function(){
				this.request.get("/shopapi/api/platform/getShopVersion.do",{}).then(res=>{
					//console.log("resres = ",res);
					this.latest = res.data.configValue;
					// #ifdef APP-PLUS
						plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
							//console.log("wgtinfowgtinfo = ",JSON.stringify(wgtinfo));
							this.current = wgtinfo.version;//app本地应用版本号
						})
					// #endif
					//console.log("this.current ===",this.current);
				})
			},
		
			getUpdateButtonTitle:function(){
				// #ifdef APP-PLUS
					this.updateButtonTitle = plus.os.name === 'iOS' ? "前往AppStore更新" : "立即更新"
				// #endif
			},
			// 关闭下载任务
			closeTask:function(){
			  this.downloadTask.abort()
			  this.downloadTask = null
			  this.startProgress = false
			},
			installPackge:function(){
			  // 安装更新
			  // #ifdef APP-PLUS
					plus.runtime.install(this.packgePath, { force: true })
					this.installed = true
					// 保存更新记录到stroage，方便下次启动app时删除安装包
					uni.setStorage({
					  key: 'updated',
					  data: {
					    completed: true,
					    packgePath: this.packgePath
					  },
					  success: (res) => {
						////console.log('成功保存更新记录')
					  }
					})                  
					// 判断是否为热更新（判断文件名中是否含有.wgt）
					if (this.packgePath.match(RegExp(/.wgt/))) {
					  this.installed = false
					  uni.showModal({
					    title: '提示',
					    content: '应用将重启以完成更新',
					    showCancel: false,
					    complete: () => {
					      plus.runtime.restart()
					    }
					  })
					}
			  // #endif
			 
			},
			// 已经下载了更新包但是没有安装
			haveDownloaded:function(){
			  uni.showModal({
			      title: '更新尚未完成',
			      content: '您已下载更新包，但是还没有完成安装，请问是否要继续安装更新包呢？',
			      success: (res) => {
			          if (res.confirm) {
			            // 安装
			            this.installPackge()
			          } else if (res.cancel) {
						this.request.toastTips("更新被取消");
			          }
			      }
			  })
			},
			// 取得最新版本及其所有信息
			getLatest:function(){
				// #ifdef APP-PLUS
					plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
						////console.log(JSON.stringify(wgtinfo));
						this.current = wgtinfo.version//应用版本号
					})
					this.buttonLoading = true
					this.latest = "1.0.0"
					// this.request.get('admin/api/applicationInfo/getVersion.do').then(res=>{
					// 	if (res.returncode === 0) {
					// 		const response = res.data
					// 		this.latest = response.version
					// 		this.buttonLoading = false
					// 		this.checkLatest()
					// 	}
					// })
				// #endif
				
			},
			// 检查版本
			checkLatest:function(){
			  	this.currentIsLatest= this.latest==this.current
				if (this.currentIsLatest) { // 当前版本与新版本不符（$current在main.js里）
				   this.request.toastTips("当前是最新版了");
				}
			}, 
			// 开始下载任务
			createTask:function(){
			  //判断是否已经存在任务
				if (!this.currentIsLatest) {
					this.downloadProgress = 0
					this.startProgress = true
					// 创建下载任务对象
					this.downloadTask = uni.downloadFile({
						url: this.packgePath,
						success: (res) => {
							if (res.statusCode === 200) {
								// 保存下载的安装包
								uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: (res) => {
								this.packgePath = res.savedFilePath
								// 进行安装
								this.installPackge()
								// 任务完成，关闭下载任务
								this.closeTask()
							}
						})
			        }
			      }
			    })
			    // 进度条更新
			    this.downloadTask.onProgressUpdate((res) => {
			      this.downloadProgress = res.progress
			    })        
			  }
			},
			handleUpdate:function(){
				// #ifdef APP-PLUS
					// 判断系统类型
					if (plus.os.name === "Android") {
						// 安卓：创建下载任务
						this.createTask()
					} else {
						if (this.latest.iosLink && this.latest.iosLink !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
							// 苹果(A)：进行ren更新（如果iosLink是wgt更新包的下载地址）判断文件名中是否含有.wgt
							if (this.latest.iosLink.match(RegExp(/.wgt/))) {
								this.createTask(this.latest.iosLink)
							} else {
								// 苹果(B)：打开商店链接（如果iosLink是苹果商店的地址）
								// plus.runtime.openURL(this.latest.iosLink)
								// https://itunes.apple.com/cn/app/id%@?mt=8
								//不同App记得要更改id
								plus.runtime.openURL("https://itunes.apple.com/cn/app/1329918420?mt=8");
							}
						} else {
						  this.request.tips("未找到ios商店地址")
						}    
					}	
				// #endif
			    
			}
			
		}
	}
</script>

<style>
	.minorContent {
		width:650rpx;
		padding:0 50rpx;
	}
	.bottom_aera {
		margin: 75px auto 0;
	}
	.logo-view{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 400rpx;
	}
	.logo-icon{
		width: 140rpx;
		height: 140rpx;
		border-radius: 140rpx;
	}
	.company-info{
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		position: fixed; 
		bottom: 30rpx;
		
	}
	
</style>
