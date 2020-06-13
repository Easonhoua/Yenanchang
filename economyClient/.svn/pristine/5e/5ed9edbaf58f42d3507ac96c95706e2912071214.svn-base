<template>
	<view class="page stra-publish releaselist">
		<view class="header-nor line-bottom">
			<image class="back" src="/static/img_new/common/back_black.png" @click="goBack()"></image>
			<text class="title-txt">{{title}}</text>
			<view class="rightbox" @click="submit()"><text class="icon">发布</text></view>
			<view class="media-item-line" style="position: absolute;"></view>
		</view><!-- 头部结束 -->
		<view class="addimgbox">
			<!-- <view class="addimg">
				<image class="del" src="../../static/img_new/topic/del.png"></image>
				<image class="img" src=""></image>
			</view>
			<view class="addimg">
				<image class="img" src="/static/img_new/topic/ad_img.png"></image>
			</view> -->
			<view class="addimg">
				<view>
					<img-component ref='photoUtil' photoTitle="动态图片" photoTip="最多可提供9张动态图片" maxPhotoCount="9" mustSelect="YES" :attachments="thumbnailPath"></img-component>
				</view>
			</view>
		</view><!-- 上传图片结束 -->
		<view class="line20"></view>
		<view class="textbox">
			<view class="topic-title line-bottom"><input class="input" placeholder="请输入话题标题" placeholder-style="color:#999999" /></view>
			<textarea class="textarea" placeholder="请输入话题内容" placeholder-style="color:#999999;"></textarea>
		</view>
		<view class="line20"></view>
		<view class="address line-bottom">
			<view class="add">
				<image class="icon" src="../../static/img_new/gonglue/dingwei3.png"></image>
				<text class="txt">添加位置</text>
				<image class="icon" src="../../static/img_new/common/right_arrow2.png" @click="addPosition()"></image>
			</view>
			<view class="labelbox">
				<scroll-view class="near-scroll" scroll-x="true">
				<text class="label">南昌.江西</text><text class="label">滕王阁</text><text class="label">秋水广场</text><text class="label">滕王阁游艇</text>
				</scroll-view>
			</view>
		</view>
		<view class="address line-bottom">
			<view class="add">
				<image class="icon" src="../../static/img_new/gonglue/huati.png"></image>
				<text class="txt">添加话题</text>
				<image class="icon" src="../../static/img_new/common/right_arrow2.png" @click="addTopic()"></image>
			</view>
			<view class="labelbox">
				<scroll-view class="near-scroll" scroll-x="true">
				<view class="label"><image class="hot" src="/static/img_new/topic/hot.png"></image>#去年三月你在哪里</view>
				<view class="label">#去年三月你在哪里</view>
				<view class="label">#去年三月你在哪里</view>
			</scroll-view>
			</view>
		</view>
<!-- 		<view class="agreement">
			<radio-group class="block" @change="RadioChange">
			<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
			勾选表示已阅读并同意<text class="blue">《ye南昌平台用户规则》</text>
			</radio-group>
		</view> -->
	</view>
</template>

<script>
	import imgComponent from "@/pages/publish/img-component.vue";
	
	export default{
		components: {
			imgComponent
		},
		data(){
			return{
				loading: false,
				title: '发布美食话题',
				thumbnailPath: [],
				destination: ''
			}
		},
		onLoad(e) {
			uni.$on('common_destination',(datas)=>{
				this.destination = datas.destination;
				this.topicData.shopId=datas.shopId;
			});
		},
		methods:{
			// 返回
			goBack:function(){
				uni.navigateBack({
				})
			},
			submit: function() {
				let url = "/memberapi/api/topicDynamic/add.do";
				let data = {
					"dictionaryCode": "TopicType" //文化南昌
				}
				this.request.post(url, data).then(res => {
					if (res && res.list) {
						this.typeList = res.list;
					}
				})
			},
			removePic: function() {
			},
			addTopic: function() {
				uni.navigateTo({
					url: 'releaseTopic'
				})
			},
			addPosition: function() {
				uni.navigateTo({
					url: 'releasePosition'
				})
			}
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "../../common/css/icon.css";
	@import "../../common/css/other_new.scss";
	.stra-publish{
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
			background-color: #FFFFFF;
		}
		
		.top_view {
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			background-color: #FFFFFF;
			top: 0;
			z-index: 999;
		}
		.addimgbox{
			@extend %flex;
			padding:30rpx;
			margin-top:120rpx;
		}
		.addimg{
			// width:160rpx;
			// height:160rpx;
			margin-top:20rpx;
			position: relative;
			margin-right:20rpx;
			padding:0;
			margin-bottom:0;
			background: #f3f5f7;
			.img{
				width:160rpx;
				height:160rpx;
			}
			.del{
				width:32rpx;
				height:32rpx;
				position: absolute;
				right:0rpx;
				top:0;
				z-index: 1;
			}
		}
	}
	.line20{
		height:20rpx;
		background: #F5F5F5;
	}
	.topic-title{
		padding:30rpx 0;
		margin-bottom:30rpx;
		.input{
			font-size:40rpx;
		}
	}
	.hot{
		width: 20rpx;
		height:22rpx;
		margin-right:5rpx;
	}
	.near-scroll{
		white-space:nowrap;
	}
</style>
