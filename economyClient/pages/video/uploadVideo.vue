<template>
	<view class="uploadvideo">
		<view class="video-categories">
			<text class="label">选择发布视频类型</text>
			<view class="video-categories-bd">
				 <radio-group class="block">
				 	<label class="radio">
				 		<radio class="radio blue" value="1" @tap="selectVideoType(1)" :checked="videoData.videoType==1"/><text>美食</text></radio>
				 	</label>
					<label class="radio">
						<radio class="radio blue" value="2" @tap="selectVideoType(2)" :checked="videoData.videoType==2"/><text>搞笑</text></radio>
					</label>
				 </radio-group>
			</view>
		</view>
		<view class="videobox">
			<text class="label">视频上传</text>
			<text class="right-style font-13"  style="margin-left: 230rpx;">{{videoLength>0?videoLength:0}}/100</text>
			<view class="video">
				 <view class="title">
					<textarea @blur="bindTextAreaBlur" v-model="videoData.videoTitle" maxlength="100" placeholder="快来写标题吧"  placeholder-style="color:#BABABA"/>
				 </view>
				 <view class="video-thumbnail">
					 <!-- 视频显示 -->
					 <view v-if="videoData.videoPath" class="display-column" style="width: 100%;height: 100%;">
					 	<view class="display-row " style="height: 50rpx;width: 100%;background-color: #000000;">
					 		<image class="video-paly" style="width: 36rpx;height: 36rpx;" src="../../static/img/common/icon_play_video.svg" @click="readAttachment"></image>
					 		<image class="video-delete" style="width: 36rpx;height: 36rpx;" src="../../static/img/common/icon_delete1.svg" @click="deleteAttachment"></image>
					 	</view>
					 	<video id="myVideo" class="pictures-item-image " :src="videoData.videoPath" autoplay controls=false show-play-btn=false  enable-progress-gesture=false show-fullscreen-btn=false show-center-play-btn muted initial-time=2 objectFit="fill" @error="videoErrorCallback" ></video>
					 </view>
					<!-- <video :src="videoData.videoPath" show-center-play-btn="false" class="video-thumbnail" @tap="showVideo"></video> -->
					<image v-else src="../../static/img/common/icon_select_photo.png" @tap="selectAttachmentSource"></image>
				 </view>
			</view>
		</view>
		<button class="circle-corner-button" type="primary" :loading="loading" :disabled="loading" style="bottom: -600rpx;" @click="uploadAttachments">发布</button>
	</view>
</template>

<script>
	import permision from "@/common/js/permission.js"
	export default{
		data(){
			return{
				videoData:{
					videoType:1,
					videoTitle:'',
					videoPath:'',
				},
				videoLength:0,
				loading:false,
				theAttachments:[]
			}
		},
		methods:{
			selectVideoType: function(videoType) {
				this.$set(this.videoData, 'videoType', videoType);
			},
			bindTextAreaBlur:function(event) {
				this.videoLength = event.detail.cursor;
			},
			selectAttachmentSource()
			{
				var self = this;
				uni.showActionSheet({
					itemList:["拍摄","从手机相册选择"],
					success: (res) => {
						if(res.tapIndex<=1)
						{
							// #ifdef APP-PLUS
							self.requestAttachmentPermission(res.tapIndex);
							// #endif
							
							// #ifdef H5
							self.selectVideo();
							// #endif
						}
					}
				
				})
			},
			selectVideo(sourceType)
			{
				var source = sourceType ? ["album"]:["camera"];
				uni.chooseVideo({
					count:1,
					sourceType:source,
					maxDuration : 30,
					success: (res) => {
						let item = {
							"videoPath" : res.tempFilePath,
						}
						if(res.duration>30)
						{
							uni.showToast({
								duration:3000,
								title:"请选择时长为30秒内的视频",
								icon:"none"
							})
							return;
						}
						if(res.size>50*1000*1000)//不要*1024
						{
							uni.showToast({
								duration:3000,
								title:"请选择大小为50M内的视频",
								icon:"none"
							})
							return;
						}
						this.videoData.videoPath = item.videoPath;
						this.theAttachments.push(item.videoPath);
					},fail: (res) => {
				
					}
				})
			},
			async requestAttachmentPermission(permissionType){
				// #ifdef APP-PLUS
					var result = 0;
					var isIOS = (plus.os.name === "iOS");
					////console.log("权限获取权限获取权限获取222222");
					if(isIOS){
						var permisionID = (permissionType===0) ? "camera" : "photoLibrary";//摄像头 ： 相机
						result = await permision.judgeIosPermission(permisionID);
					}else{
						var permisionID = (permissionType===0) ? "android.permission.CAMERA" : "android.permission.WRITE_EXTERNAL_STORAGE";//摄像头 ： 相机
						result = await permision.requestAndroidPermission(permisionID);
					}
					// IOS 0 用户尚未做出选择 1此应用程序没有被授权访问 2用户已经明确否认拒绝 3用户已经授权
					// 安卓1、已获取授权 0 未获取授权 -1被永久拒绝授权
					if(result === 1 || result === 0 ||result ===3){
						if(permissionType === 1){//从相册选取不需要获取麦克风权限
							this.selectVideo(permissionType);
							return;
						}
						// #ifdef 1
						//摄像头拍摄需要获取麦克风权限
						var microphonePermissionId = isIOS ? "record" : "android.permission.RECORD_AUDIO";
						if(isIOS){
							var microphoneResult = await permision.judgeIosPermission(microphonePermissionId);
							//permissionStatus == 1684369017 || permissionStatus == 1970168948
							//1970168948 权限用户未拒绝  1684369017 用户已拒绝
							if(microphoneResult === 1684369017){//IOS麦克风权限未开启
								this.Request.toastTips("请先开启麦克风权限");
								this.settingPermission();
							}else{
								this.selectVideo(permissionType);
							}
						}else{
							var microphoneResult = await permision.requestAndroidPermission(microphonePermissionId);
							////console.log("麦克风权限microphonePermissionId = ",microphonePermissionId);
							if(microphoneResult === 1 || microphoneResult === 0 ||microphoneResult ===3){
								this.selectVideo(permissionType);
							}else{
								this.Request.toastTips("请先开启麦克风权限");
								this.settingPermission();
							}
						}
						// #endif
					}else{//没有或得权限
						if(permissionType){//相册
							this.Request.toastTips("请先开启相册权限");
						}else{
							this.Request.toastTips("请先开启摄像头权限");
						}
						this.settingPermission();
					}
				// #endif
			},
			settingPermission:function(){
				setTimeout(function() {
					permision.gotoAppPermissionSetting();
				}, 1000);
			},
			readAttachment:function(){
				////console.log("点击播放");
				uni.navigateTo({
					url:"uploadShowVideo?videoSrc="+this.videoData.videoPath,
					animationType:"slide-in-bottom",
					animationDuration: 500
				})
			},
			deleteAttachment:function(){
				this.videoData.videoPath = "";
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			addVideoInfo:function(videoResultPath){
				let data = {
					videoType: this.videoData.videoType,
					videoTitle: this.videoData.videoTitle,
					videoPath: videoResultPath,
				};
				//console.log("------",data.videoPath);
				let url = "/memberapi/api/video/add.do";
				this.request.post(url,data).then(res => {
					if (res.returncode === 0) {
						this.loading = false;
						uni.$emit("refreshVideo");
						uni.navigateBack();
					}else{
						this.loading = false;
						this.request.toastTips("发布视频失败");
					}
				});
			},
			//上传视频到服务器
			uploadAttachments()
			{
				var attachmentList = this.theAttachments;
				var api = this.request;
				var self = this;//必须加上
				if(this.videoLength == 0){
					uni.showToast({
						title:"请填写视频上传标题",
						icon:"none"
					})
					return;
				}
				if(attachmentList.length === 0){
					uni.showToast({
						title:"请上传需要发布的视频",
						icon:"none"
					})
					return;
				}
				//console.log("attachmentList ====",attachmentList);
				this.loading = true;
				return new Promise(function(resolve,reject){
					api.uploadFiles(attachmentList,"video").then(res=>{
						if(res){
							self.addVideoInfo(JSON.stringify(res[0]));
						}
					}).catch(res=>{
						//console.log("上传附件失败========== ",res);
						uni.showToast({
							title:"上传视频失败，请稍后重试",
							icon:"none"
						})
						reject(res);
					})
				
				})
			},
		}
	}
</script>
	
<style>
	.pictures-item-image
	{
		width: 100%;
		height: 100%;
	}
	.video-paly{
		margin-left: 20rpx;
		z-index: 100;
	}
	
	.video-delete{
		margin-left: auto;
		margin-right: 12rpx;
		z-index: 101;
	}
	uni-radio.radio[checked]::after, uni-radio.radio .uni-radio-input-checked::after {
	    content: "";
	    background-color: transparent;
	    display: block;
	    position: absolute;
	    width: 10px;
	    height: 10px;
	    top: 2px;
	    z-index: 999;
	    left: 0px;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	    border-radius: 96px;
	    border: 2px solid #ffffff !important;
	}
</style>
