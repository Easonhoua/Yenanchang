<template>
	<view>
		<view :class="cellClass" :style="otherStyle"  @click="chooseImage">
			<view class="cell-left-text" :style="(useMode==='read') ? 'color: #BFBFBF;' : 'color: #000000;' ">{{titleText}}<text v-if="mustSelect =='YES'" class="red">*</text></view>
			
			<!-- <image v-if="useMode==='read' || isSelectImage " class="cell-right-image" :src="image" mode="aspectFill" v-on:click.stop="readImage(image)"></image> -->
			<image v-if="selectImage" class="cell-right-image" :src="selectImage" mode="aspectFill" v-on:click.stop="readImage(selectImage)"></image>
			<view v-else class="cell-right-text">{{tipText}}</view>
			<image class="right-arrow-img"></image>
		</view>
		<view class="progress-view" v-if="showProgress">
			<progress :percent="percent"  stroke-width="6" activeColor="#007AFF" show-info/>
		</view>
	</view>
</template>

<script>
	export default {
		name: "list-image-cell",
		props: {
			// 左边文字
			titleText: {
				type: String,
				default: "图片"
			},
			tipText: {
				type: String,
				default: "请选择图片"
			},
			// 图片路径，如果已经上传过注意传入的是接口返回的json字符串，格式如下{"fileName":"11111.png","filePath":"/storage/shop/77/info/logo.png","fileSize":255}
			image: {
				type: String,
				default: ""
			},
			// 使用方式：默认是查看图片read，选取图片为choose
			useMode: {
				type: String,
				default: "read"
			},
			// 是否是必填项 默认是非必填NO 必填的话输入YES
			mustSelect: {
				type: String,
				default: "NO"
			},
			// 是否选完图片之后直接上传 默认是不直接上传 直接上传的话输入YES
			autoUpload:{
				type: String,
				default: "NO"
			},
			// 保存在服务器图片的路径，比如shopLogo存放的店铺logo,autoUpload为YES的话初始化组件的时候要传入
			imageFolder:{
				type:String,
				default:"uploadImage"
			},
			// 是否显示灰色细线
			showBottomLine: {
				type: String,
				default: "YES"
			},
			// cell的背景颜色
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			}
		},
		// 监听image的变化
		watch: {
			image(newImage, oldImage) {
				this.formattingImage(newImage);
			}
		},

		data() {
			return {
				cellClass: "list-cell",
				otherStyle: "",
				isSelectImage: false,
				selectImage: "",
				percent:0,
				showProgress:false
			};
		},
		created() {
			//console.log("this.image === ", this.image);
			this.setupCellClass();
		},
		methods: {
			setupCellClass: function() {
				this.otherStyle = "background-color:" + this.backgroundColor;
				this.formattingImage(this.image);
				if (this.showBottomLine === "YES") {
					this.cellClass = "list-cell-border";
				}
			},
			// 格式化image
			formattingImage: function(image) {
				if (image) {
					this.selectImage = this.request.getBaseImagePath() + JSON.parse(image).filePath;
				}
				//console.log("this.selectImage = ", this.selectImage);
			},
			chooseImage: function() {
				if(this.useMode == "read"){
					return;
				}
				var self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						//console.log('所选图片 = ', res);
						if (res.tempFiles[0].size > 5 * 1000 * 1000) {
							uni.showToast({
								duration: 3000,
								title: "所选的图片的大小已经超过5M,请重新选择",
								icon: "none"
							})
							return;
						}
						self.selectImage = res.tempFilePaths[0];
						self.isSelectImage = true;
						if(self.autoUpload=="YES"){//直接上传图片
							self.uploadImage(self.imageFolder);
						}
					}
				})
			},
			// 查看图片大图
			readImage: function(image) {
				uni.previewImage({
					urls: [image]
				})
			},
			// 获取选择的图片
			getImage: function() {
				return this.selectImage;
			},
			// 上传图片
			uploadImage: function(imageFolder) {
				var attachmentList = this.theAttachments;
				var api = this.request;
				var self = this; //必须加上
				return new Promise(function(resolve, reject) {
					if (self.mustSelect === 'YES' && !self.selectImage) {
						uni.showToast({
							title: "请先上传" + self.titleText,
							icon: "none"
						})
						reject("请先上传" + self.titleText);
						return;
					}
					// 如果图片已经存在，则不用上传直接resolve服务器返回的json字符串
					if (self.selectImage && !self.isSelectImage) {
						resolve(self.image);
						return;
					}

					if (self.isSelectImage && self.selectImage) { //选择了图片，并且图片存在才上传
						//console.log("self.selectImage ====", self.selectImage);
						self.showProgress = true;
						api.uploadFile(self.selectImage, imageFolder,self.uploadPrograme).then(res => {
							if (res) {
								if(self.autoUpload=="YES"){
									self.uploadFinish(JSON.stringify(res.list[0]));
								}
								resolve(JSON.stringify(res.list[0])); //单个传json对象
							}
						}).catch(res => {
							//console.log("上传图片失败resresresres = ", res);
							uni.showToast({
								title: "上传" + self.titleText + "失败，请稍后重试",
								icon: "none"
							})
							reject(res);
						})
					} else {
						resolve(0);
					}
				})
			},
			// 上传完成，选完图片后直接上传图片成功后的回调事件，需要在引用组件的界面使用
			uploadFinish:function(imageJson){
				this.showProgress = false;
				this.$emit("uploadFinish",imageJson);
			},
			
			uploadPrograme: function(uploadTask) {
				uploadTask.onProgressUpdate((res) => {
					this.percent=res.progress;
					if(this.percent>=100){
						this.showProgress = false;
					}
				});
			}
		}
	}
</script>

<style>
	.list-cell {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 28rpx;
		width: 100vw;
		line-height: 50rpx;
		min-height: 100rpx;
		background-color: #FFFFFF;
		word-break: break-all;
	}

	.list-cell-border {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100vw;
		font-size: 28rpx;
		line-height: 50rpx;
		min-height: 100rpx;
		border-bottom: 2rpx solid #F5F5F5;
		background-color: #FFFFFF;
		word-break: break-all;
		background-color: #007AFF;
	}

	.cell-left-text {
		margin-left: 20rpx;
		width: 300rpx;
		color: #000000;
	}
	.cell-right-text{
		margin-left: auto;
		color: #BFBFBF;
	}
	.cell-right-image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 80rpx;
		margin-left: auto;
	}
	.progress-view{
		background-color: #F5F5F5;;
	}
</style>
