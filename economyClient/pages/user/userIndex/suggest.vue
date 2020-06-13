<template>
	<view class="content">
		<view class="suggest-view">
			<view class="display-row">
				<view class="text-bold">问题/意见描述</view>
				<view class="text-bold right-style">{{feedbackContentLength>0?feedbackContentLength:0}}/200</view>
			</view>
			<textarea class="suggest-area" @input="feedbackContentInput" v-model="suggestData.feedbackContent" placeholder="请填写问题描述，以便我们更好的帮您解决问题" placeholder-style="color: #CECDD2;"/>
			
		</view>
		<photo-component  photoTip="上传问题截图 最多6张 (选填）" maxPhotoCount="6" :showTitle="false" :attachments="suggestData.imagePath" ref = "photoUtil" style="background-color: #FFFFFF;"></photo-component>
		
		<view class="phone-view">
			<view class="text-bold">联系方式(选填)</view>
			<textarea class="suggest-area" v-model="suggestData.contactsModel" placeholder="填写您的手机号或邮箱，便于我们与您联系" placeholder-style="color: #CECDD2;" style="height: 100rpx;"/>
		</view>
		
		<button class="circle-corner-button" type="primary" style="margin-top: 100rpx;" @click="submitButtonClick">提交</button>
		
	</view>
</template>

<script>
	
	import photoComponent from "@/components/photo-component/photo-component.vue"
	
	export default {
		
		components:{
			photoComponent
		},
		
		data() {
			return {
				feedbackContentLength:0, 
				suggestData:{
					// imagePath:""
				}
			}
		},
		onLoad() {
			// this.suggestData.contactsModel = uni.getStorageSync("user").mobilePhone;
		},
		onNavigationBarButtonTap() {
			var self = this;
			uni.showActionSheet({
				itemList:["投诉举报"],
				complete(res) {
					if(res.tapIndex == 0){
						self.util.tipOff();
					}
				}
			})
		},
		methods: {
			feedbackContentInput(e) {
				this.feedbackContentLength = e.detail.cursor;
			},
			submitButtonClick:function(){
				this.$refs.photoUtil.uploadAttachments("advise").then(res=>{
					if(res){
						this.suggestData.imagePath = res;
					}
					this.submitSuggest();
				})
			},
			submitSuggest:function(){
				var url = '/memberapi/api/feedbackInfo/add.do';
				this.request.post(url,this.suggestData).then(res=>{
					this.request.toastTips("感谢您的反馈，我们会尽快回复您!")
					uni.navigateBack({
					
					})
				})
			}
		}
	}
</script>

<style>
	.suggest-view{
		margin-top: 30rpx;
		padding: 30rpx;
		padding-bottom: 0rpx;
		width: 100vw;
		background-color: #FFFFFF;
	}
	.suggest-area{
		margin: 40rpx 0rpx 0rpx 0rpx;
		padding: 30rpx;
		height: 200rpx;
		width: 100%;
		background-color: #F9F9F9;
		font: 30rpx;
		
	}
	.phone-view{
		margin-top: 30rpx;
		padding: 30rpx;
		width: 100vw;
		background-color: #FFFFFF;
	}

</style>
