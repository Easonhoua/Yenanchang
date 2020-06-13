<template>
	<view class="content-view">
		<view class="content-photo">
			<scroll-view class="photo-scroll" scroll-x="true">
				<!-- 视频显示 -->
				<view v-if="videoPath" class="photo-item" v-on:click.stop="readAttachmentVideo">
					<image class="photo-delect" style="margin-left: 130rpx;" src="/static/img_new/topic/del.png" v-on:click.stop="deleteAttachmentVideo"></image>
					<video id="myVideo" class="photo-image " :src="videoPath" autoplay controls=false show-play-btn=false  enable-progress-gesture=false show-fullscreen-btn=false show-center-play-btn muted initial-time=2 objectFit="fill" @error="videoErrorCallback" ></video>
				</view>
				<!-- 图片显示 -->
				<view class="photo-item" v-for="(item,index) in theAttachments" :key="index">
					<image v-if="item.filePath" class="photo-image" :src="request.getBaseImagePath() + item.filePath" mode="aspectFill" @click="readAttachment(item,index)"></image>
					<image v-else class="photo-image" :src="item" mode="aspectFill" @click="readAttachment(item,index)"></image>
					<image v-if="useType==='select' " class="photo-delect" src="/static/img_new/topic/del.png" v-on:click.stop="deleteAttachment(item)"></image>
				</view>
				
				<image v-if="useType==='select'" class="photo-item" src="/static/img_new/common/photo@3x.png" mode="aspectFill" @click="chooseAttachment()"></image>
				<block v-if="!videoPath">
					<image v-if="useType==='select'" class="photo-item" src="/static/img_new/common/video@3x.png" mode="aspectFill" @click="selectAttachmentVideo()"></image>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import permision from "@/common/js/permission.js"
	export default {
		// name:"photo-component",
		props:{
			// 是否必填，传NO或者YES
			mustSelect:{
				type:String,
				default:"NO"
			},
			showTitle:{
				type:Boolean,
				default:true
			},
			// 照片标题
			photoTitle:{
				type:String,
				default : "选择图片"
			},
			// 照片提示说明
			photoTip:{
				type:String,
				default : "需拍全，包含完整的牌匾，门槛（建议正对门店2米处拍摄）"
			},
			// 图片上传的最大照片数量
			maxPhotoCount:{
				type:String,
				default:"9"
			},
			//附件使用方式:select选取附件（默认）, read读取附件
			useType:{
				type : String,
				default : "select"
			},
			//附件list
			attachments:{
				type : Array,
				default () {
					return []
				}
			},
			
		
			//下面的属性暂时用不到
			//选择附件类型 1、只选择图片 2、只选择视频 3、两则都选择（默认）
			attachmentType:{
				type : String,
				default : "3"
			},
			bizId:{
				type : String,
				default : ""
			},
			bizType:{
				type : String,
				default : ""
			},
			module:{
				type:String,
				default:"default"
			}
		},
		data() {
			return {
				//备注：以免忘记需要从子视图中动态改变附件列表，vue不推荐直接在子组件中修改父组件传来的prop的值（直接使用会报错，使用可以，修改会报错），所以需要在data中重新定义一个新的theAttachments来接收动态改变的附件列表，可以进行增、删等操作
				videoPath:'',
				theAttachmentsVideo:[],
				theAttachments:[]
			}
		},
		created() 
		{
			//console.log("this.attachments =",this.attachments);
			// this.theAttachments = this.attachments;
			this.showAttachments(this.attachments);
		},
		methods:{
			//选择附件图片
			chooseAttachment()
			{
				if(this.theAttachments.length>= parseInt(this.maxPhotoCount))
				{
					this.request.toastTips("最多只能选"+this.maxPhotoCount+"张图片");
					return;
				}
				uni.chooseImage({
					count: parseInt(this.maxPhotoCount)-this.theAttachments.length,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						//console.log('所选图片 = ',res);
						
						for (var i = 0; i < res.tempFiles.length; i++) {
							if(res.tempFiles[i].size > 5*1000*1000){
								uni.showToast({
									duration:3000,
									title:"所选的第"+(i+1)+"图片的大小已经超过5M,请重新选择",
									icon:"none"
								})
								return;
							}
						}
						for (let filePath of res.tempFilePaths) {
							this.theAttachments.push(filePath);
						}
						if(this.photoTitle === '门店主图'){//直接上传
							this.uploadAttachments("shopMainPhoto").catch(res=>{
								//上传失败删除已选择的图片
								this.theAttachments.splice(0,1);
							})
						}
					}
				})	
			},
			// 删除某个附件
			deleteAttachment:function(item){
				if(this.photoTitle === "门店主图" && item.filePath){
					var data = {
						shopId : uni.getStorageSync("shopInfo").shopId,
						thumbnailPath : ""
					}
					this.request.updateShopInfo(data).then(res=>{
						let index = this.theAttachments.indexOf(item);
						this.theAttachments.splice(index,1);
						this.theAttachments = [];
						uni.$emit("updateShopMainPhoto");
					})
				}else
				{
					let index = this.theAttachments.indexOf(item);
					this.theAttachments.splice(index,1);
				}
				//console.log("this.theAttachments === ",this.theAttachments);
			},
			//获取附件
			getAttachment()
			{
				return this.theAttachments;
			},
			//查看附件
			readAttachment(item,index)
			{
				var photos = [];
				for (let photo of this.theAttachments) {
					if(photo.filePath)
					{
						photos.push(this.request.getBaseImagePath() + photo.filePath);
					}else
					{
						photos.push(photo);
					}
				}
				uni.previewImage({
					urls:photos,
					current:index
				})
			},
			//图片上传附件到服务器
			uploadAttachments(attachmentsFolder)
			{
				var attachmentList = this.theAttachments;
				var api = this.request;
				var self = this;//必须加上
				return new Promise(function(resolve,reject){
					if(attachmentList.length === 0)
					{
						////console.log("没有附件不上传");
						if(self.mustSelect === 'YES'){
							uni.showToast({
								title:"请先上传"+self.photoTitle,
								icon:"none"
							})
							return;
						}
						resolve(0);
						return;
					}
					//console.log("attachmentList ====",attachmentList);
					api.uploadFiles(attachmentList,attachmentsFolder).then(res=>{
						if(res){
							if(self.maxPhotoCount === '1'){
								if(self.photoTitle ==='门店主图'){
									var data = {
										shopId : uni.getStorageSync("shopInfo").shopId,
										thumbnailPath : JSON.stringify(res[0])
									}
									api.updateShopInfo(data);
								}else{
									resolve(JSON.stringify(res[0]));//单个传json对象
								}
							}else{
								resolve(JSON.stringify(res));//多个传json数组
							}
						}
					}).catch(res=>{
						//console.log("上传附件失败resresresres = ",res);
						uni.showToast({
							title:"上传附件失败，请稍后重试",
							icon:"none"
						})
						reject(res);
					})
				
				})
			},
			// 显示附件
			showAttachments:function(attachments){
				this.theAttachments = [];
				// this.theAttachments = attachments;
				//console.log("this.theAttachments===",this.theAttachments);
				if(attachments.length>0 && attachments[0]){
					if(this.maxPhotoCount === "1"){//单张图片上传的时候只能传json字符串，所以获取的时候是一个json字符串，转成的是json对象
						var attachmentItem = JSON.parse(attachments[0]);
						this.theAttachments.push(attachmentItem);
					}else//多张图片传的是json数组，所以获取的时候是一个json数组，转成的是数组
					{
						var attachmentArray = JSON.parse(attachments[0]);
						for(let item of attachmentArray){
							this.theAttachments.push(item);
						}
					}
					
				}
			},
			//从服务器获取附件（此接口ye南昌没有，先保留）
			requestAttachments(bizId)
			{
				////console.log("调用组件返回快捷键");
				const data = {
					bizId: bizId,
					bizType: this.bizType,
					teamId: this.Request.getUser().teamId,//如果移除了team会不会报错？
				};
				this.Request.post("upload/api/fileDepotAttachment/listAll.do",data).then( res => {
					////console.log("附件列表",res);
					var self = this;
					self.theAttachments = [];
					setTimeout(function() {
						for (let item of res.list) {
							let attachment = {};
							attachment.url = item.fullFilename;
							attachment.id = item.attachmentId;
							attachment.fileType = item.fileType;
							attachment.module = this.module;
							self.theAttachments.push(attachment);
						}
					}, 500);
				});
			},
			
			
			//视频选择
			selectAttachmentVideo()
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
					maxDuration : 15,
					success: (res) => {
						let item = {
							"videoPath" : res.tempFilePath,
						}
						if(res.duration>15)
						{
							uni.showToast({
								duration:6000,
								title:"请选择时长为15秒内的视频",
								icon:"none"
							})
							return;
						}
						if(res.size>50*1000*1000)//不要*1024
						{
							uni.showToast({
								duration:6000,
								title:"请选择大小为50M内的视频",
								icon:"none"
							})
							return;
						}
						this.videoPath = item.videoPath;
						this.theAttachmentsVideo.push(item.videoPath);
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
			readAttachmentVideo:function(){
				////console.log("点击播放");
				uni.navigateTo({
					url:"/pages/video/uploadShowVideo?videoSrc="+this.videoPath,
					animationType:"slide-in-bottom",
					animationDuration: 500
				})
			},
			deleteAttachmentVideo:function(){
				this.videoPath = "";
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			}, 
			//上传视频到服务器
			uploadAttachmentsVideo(attachmentsFolder)
			{
				
				var self = this;//必须加上
				var attachmentVideoList = self.theAttachmentsVideo;
				var api = self.request;
				return new Promise(function(resolve,reject){
					if(attachmentVideoList.length === 0){
						// uni.showToast({
						// 	title:"请上传需要发布的视频",
						// 	icon:"none"
						// })
						// return;
						resolve('');
						return;
					}
					self.loading = true;
					api.uploadFiles(attachmentVideoList,attachmentsFolder).then(res=>{
						if(res){
							//self.theAttachmentsVideo.push(JSON.stringify(res[0]));
							resolve(JSON.stringify(res[0]));//单个传json对象
						}
					}).catch(res=>{
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
	
	.content-view{
		display: flex;
		flex-direction: row;
		width: 694rpx;
		padding-bottom: 20rpx;
	}
	/* .content-title2{
		width:230rpx;
		font-size: 28rpx;
		color: #000000;
		margin-left: 30rpx;
		margin-top: 30rpx;
	} */
	.content-photo{
		display: flex;
		flex-direction: column;
		width: 680rpx;
		height: 100%;
		/* margin-top: 30rpx; */
	}
	.red {
	    color: #FF3B2F;
	}
	.photo-tip{
		color: #CECDD2;
		font-size: 28rpx;
		width: 100%;
		padding-left: 30rpx;
		padding-right: 30rpx;
		margin-bottom: 20rpx;
	}
	.photo-scroll{
		width: 100%;
		height: 184rpx;
		white-space: nowrap;
	}
	.photo-item{
		width: 160rpx;
		height: 160rpx;
		margin-right: 30rpx;
		display: inline-block;
		/* border: 2rpx solid #EEEEEE; */
	}
	.photo-image{
		width: 100%;
		height: 100%;
	}
	.photo-delect{
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		padding: 0rpx 10rpx 20rpx 10rpx;
		z-index: 5;
		margin-top: -5rpx;
		margin-left: -40rpx;
	}
</style>
