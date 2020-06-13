<template>
	<view class="layout topic-content">
		<!--抬头-->
		<view class="status-bar"></view>
		<view class="sub-header">
			<label class="cancel" @click="cancelBtn">取消</label>
			<label class="send" @click="sendBtn" :loading="loading" :disabled="loading">发送</label>
		</view>
		<view class="input-group">
			<view class="input-cell input-cell-column">
				<view class="label">话题描述<text class="red"> *</text></view>
				<view class="input-cell-bd">
					<textarea class="textarea textarea-h" placeholder-style="color:#CECDD2" placeholder="话题描述情况"  v-model="topicDynamicData.dynamicRemark" />
				</view>
			</view>
			<photo-component ref='photoUtil' photoTitle="动态图片" photoTip="最多可提供3张动态图片" maxPhotoCount="3" mustSelect="NO" :attachments="dynamicImg"></photo-component>
		</view>
	</view>
</template>

<script>
	import photoComponent from "@/components/photo-component/photo-component.vue";
	export default {
		components: {
			photoComponent
		},
		data() {
			return {
				loading: false,
				dynamicImg:[],
				topicDynamicData:{
					dynamicRemark:'',
					topicId:0,
					dynamicImg:'',
				}, //房型集合
			}
		},
		onLoad(e) {
			this.topicDynamicData.topicId = e.topicId;
		},
		methods: {
			//取消
			cancelBtn:function(){
				if(this.topicDynamicData.dynamicRemark){
					var that = this;
					uni.showModal({
					    title: '提示',
					    content: '是否确认离开',
					    success: function (res) {
					        if (res.confirm) {
								this.uploadImages();
					        } else if (res.cancel) {
					            uni.navigateBack();
					        }
					    }
					});
				}else{
					uni.navigateBack();
				}
			},
			//发送
			sendBtn:function(){
				if(this.request.alreadyLogin()){
					if(!this.topicDynamicData.dynamicRemark){
						this.request.toastTips("话题动态内容不能为空");
						return false;
					}	
					this.uploadImages();
				}
			},
			// 图片上传
			uploadImages:function(){
				this.$refs.photoUtil.uploadAttachments("hotelRoom").then(res=>{
					if(res){
						this.$set(this.topicDynamicData, 'dynamicImg', res);
						this.saveTopicDynamic();
					}else
					{
						this.saveTopicDynamic();
					}
				}).catch((res=>{
					this.loading = false;
				}))
			},
			
			saveTopicDynamic:function(){
				var _that = this;
				_that.loading = true;
				const data = this.topicDynamicData;
				let url = "/memberapi/api/topicDynamic/add.do";
				this.request.post(url,data).then(res => {
					if (res.returncode === 0) {
						_that.request.toastTips("新增成功");
						setTimeout(function() {
							uni.redirectTo({
								url:"topicview?topicId="+_that.topicDynamicData.topicId
							});
						}, 1000);
					}else{
						_that.request.toastTips("新增失败");
						_that.loading = false;
					}
				}).catch(res=>{
					
				});
			}
		},
	}
	 
</script>

<style>
	.red {
		color: rgb(241, 81, 69);
	}
</style>
