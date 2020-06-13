<template>
	<view class="content">
		<view class="type-view">
			<radio-group @change="radioChange">
				<label class="item" v-for="(item, index) in informTypes" :key="item.value">
					<view>
						<radio :value="String(index)" :checked="index === current"/>
					</view>
					<view style="margin-left: 20rpx;">{{item}}</view>
				</label>
			</radio-group>
		</view>
		<view class="suggest-view">
			<view class="display-row">
				<view class="text-bold">举报描述</view>
				<view class="text-bold right-style">{{feedbackContentLength>0?feedbackContentLength:0}}/200</view>
			</view>
			<textarea class="suggest-area" @input="feedbackContentInput" v-model="informData.tipOffRemark" placeholder="请填写问题描述，以便我们更好的帮您解决问题"
			 placeholder-style="color: #CECDD2;" />
			</view>
		<photo-component  photoTip="上传含有具体内容的截图照片等补充证明材料可以提高举报成功率;单张图片大小不超过5M" maxPhotoCount="6" :showTitle="false" :attachments="informData.imagePath" ref = "photoUtil" style="background-color: #FFFFFF;"></photo-component>
		
		<button class="circle-corner-button" type="primary" style="margin-top: 100rpx;margin-bottom: 100rpx;" @click="submitButtonClick">提交</button>
		
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
				informTypes:["标题夸张","低俗色情","内容抄袭","涉嫌违法犯罪","令人反感不适的照片","其他问题，我要吐槽"],
				feedbackContentLength:0, 
				informData:{
					relationId:'',
					tipOffSource:"1",
					tipOffType:"1",
					tipOffRemark:"",
					imagePath:[]
				},
				current:0
			}
		},
		onLoad(e) {
			if (e.relationId) {
				this.informData.relationId = e.relationId;
			}
		},
		methods: {
			feedbackContentInput:function(event) {
				this.feedbackContentLength = event.detail.cursor;
			},
			radioChange:function(event){
				// 举报类型 (1:低俗色情、2:标题夸张、3:令人反感的封面、4:内容质量差、5:广告软文、6:播放问题、7:抄袭、8:其他问题我要吐槽、9:侵权侵犯名誉冒用他人账号等等)
				this.current = parseInt(event.detail.value);
				var tipOffTypes = ["2","1","7","4","3","8"];
				this.informData.tipOffType = tipOffTypes[this.current];
			},
			submitButtonClick:function(){
				this.$refs.photoUtil.uploadAttachments("inform").then(res=>{
					if(res){
						this.informData.imagePath = res;
					}
					this.submitSuggest();
				})
			},
			submitSuggest:function(){
				var url = '/memberapi/api/tipOff/add.do';
				this.request.post(url,this.informData).then(res=>{
					this.request.toastTipsTime("感谢您的投诉举建议，我们将在48内对您投诉举报的内容进行审核并且处理!",4000);
					setTimeout(function() {
						uni.navigateBack({});
					}, 2000);
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.type-view{
		padding: 30rpx;
		padding-bottom: 0rpx;
		width: 750rpx;
		.item{
			width: 100%;
			padding-bottom: 20rpx;
			font-size: 30rpx;
			display: flex;
			flex-direction: row;
			.radio1{
				color: #0081FF;
			}
		}
	}
	
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
