<template>
	<view class="page stra-publish releaselist">
		<view class="header-nor line-bottom">
			<image class="back" src="/static/img_new/common/back_black.png" @click="goBack()"></image>
			<!-- <text class="title-txt">发布美食攻略</text> -->
			<view class="rightbox" v-on:click.stop="sendBtn" :loading="loading" :disabled="loading"><text class="icon">发布</text></view>
			<view class="media-item-line" style="position: absolute;"></view>
		</view><!-- 头部结束 -->
		<view class="addimgbox">
			<view class="addimg">
				<view>
					<video-component ref='photoUtil' photoTitle="动态图片" photoTip="最多可提供9张动态图片" maxPhotoCount="9" mustSelect="YES" :attachments="thumbnailPath"></video-component>
				</view>
			</view>
		</view><!-- 上传图片结束 -->
		
		<view class="line20"></view>
		<view class="textbox">
			<view class="topic-title line-bottom"><input class="input" placeholder="请输入攻略标题" placeholder-style="color:#999999" v-model="guideData.guideTitle"/></view>
			<view class="topic-title line-bottom"><input class="input" placeholder="请输入攻略简介" placeholder-style="color:#999999" v-model="guideData.guideIntroduction"/></view>
			<textarea class="textarea" placeholder="详细分享你的真实体验、实用攻略和一些小Tips，并带上明确的推荐理由，更容易被推荐哦！" placeholder-style="color:#999999;"  v-model="guideData.guideDetail" maxlength="120" @input="guideDetailInput"></textarea>
			<view class="tip">{{guideDetailLength>0?guideDetailLength:guideData.guideDetail?guideData.guideDetail.length:0}}/120字</view> 
		</view>
		<view class="line20"></view>
		<view class="address line-bottom">
			<view class="add"><image class="icon" src="/static/img_new/gonglue/dingwei3.png"></image><text class="txt">{{destination}}</text><image class="icon" src="/static/img_new/common/right_arrow2.png" v-on:click.stop="clickMore"></image></view>
			<view class="labelbox" v-if="shopsList != null && shopsList.length > 0">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation>
					<text class="label" v-for="(item,index) in shopsList" :key="index"  v-on:click.stop="clickShop(item)">{{item.shopName}}</text>
				</scroll-view>
			</view>
		</view>
		<view class="agreement">
			<radio-group class="block" @change="RadioChange">
			<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
			勾选表示已阅读并同意<text class="blue">《ye南昌平台用户规则》</text>
			</radio-group>
		</view>
	</view>
</template>

<script>
	import videoComponent from "@/pages/strategy/video-component.vue";
		var day2 = new Date();
		day2.setTime(day2.getTime());
		export default{
			components: {
				videoComponent
			},
			data(){
				return{
					loading: false,
					thumbnailPath:[],//图片集合
					nowData:day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate(),
					radio:'C',
					shopsList:[], //附近的店铺
					//hotTopicList:[], //火热参与的攻略
					guideData:{}, //攻略基本信息
					guideDetailLength:0,//标题长度
					destination:'添加地点', //目的地
					
				}
			},
			onLoad(e) {
				this.guideData.userType = 3;
				if(e.guideType){
					this.guideData.guideType = e.guideType;
				}
				//this.queryHotTopicList(); //最火热的攻略 前10条数据
				this.queryShopsList(); //浏览量最大的10条店铺数据
				uni.$on('common_destination',(datas)=>{
					this.destination = datas.destination;
					this.guideData.shopIds=datas.shopId;
				});
				
			},
			onUnload(){
				uni.$off('common_destination');
			},
			methods:{
				//浏览量最大的10条店铺数据
				queryShopsList:function(){
					const url = '/memberapi/api/shops/shopsList.do';
					let data = {
						pageNo:1,
						pageSize: 10
					};
					var that = this;
					this.request.get(url, data).then(res => {
						let newData = res.list;
						that.shopsList = newData; //追加新数据
					})
				},
				//最火热的攻略 前10条数据
				queryHotTopicList:function(){
					const url = '/memberapi/api/topic/hotTopicList.do';
					let data = {
						pageNo:1,
						pageSize: 10
					};
					var that = this;
					this.request.get(url, data).then(res => {
						let newData = res.list;
						newData.forEach(item => {
							if(item.thumbnailPath){
								item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
							}
							
						});
						that.hotTopicList = newData; //追加新数据
					})
				},
				//选择目的地
				clickShop:function(item){
					this.destination = item.shopName;
					this.guideData.shopId = item.shopId;
				},
				//攻略详情
				// topicView:function(item){
				// 	if(this.guideData.guideDetail.indexOf("#"+item.guideTitle+"#") == -1){
				// 		this.guideData.guideDetail = this.guideData.guideDetail+"#"+item.guideTitle+"#";
				// 	}
				// },
				//攻略详情
				guideDetailInput(e) {
					this.guideDetailLength = e.detail.cursor;
				},
				//点击目的地more
				clickMore:function(){
					uni.navigateTo({
						url:'../publish/chooseDestination'
					});
				},
				// 返回
				goBack:function(){
					uni.navigateBack({
					})
				},
				//发送
				sendBtn:function(){
					if(this.request.alreadyLogin()){
						if(!this.guideData.guideTitle){
							this.request.toastTips("攻略内容不能为空");
							return false;
						}	
						this.uploadImages();
					}
				},
				// 图片上传
				uploadImages:function(){
					this.$refs.photoUtil.uploadAttachments("guideInfo").then(res=>{
						if(res){
							this.$set(this.guideData, 'thumbnailPath', res);
							this.updateVideo();
							//this.saveGuide();
						}else
						{
							this.updateVideo();
							//this.saveGuide();
						}
					}).catch((res=>{
						this.loading = false;
					}))
				},
				updateVideo:function(){
					this.$refs.photoUtil.uploadAttachmentsVideo("guideInfo").then(res=>{
						if(res){
							this.$set(this.guideData, 'videoPath', res);
							this.saveGuide();
						}else{
							this.saveGuide();
						}
					}).catch((res=>{
						this.loading = false;
					}))	
				},
				saveGuide:function(){
					var _that = this;
					_that.loading = true;
					const data = this.guideData;
					let url = "/memberapi/api/guide/add.do";
					this.request.post(url,data).then(res => {
						if (res.returncode === 0) {
							_that.request.toastTips("新增成功");
							setTimeout(function() {
								// uni.switchTab({
								// 	url:"/pages/user/user"
								// });
								uni.navigateBack({
								});
							}, 1000);
						}else{
							_that.request.toastTips("新增失败");
							_that.loading = false;
						}
					}).catch(res=>{
						
					});
				},
			}
		}
</script>

<style lang="scss">
	/*其他scss */
	@import "@/common/css/icon.css";
	@import "@/common/css/other_new.scss";
	.stra-publish{
		.header-nor{
			margin-top: var(--status-bar-height) ; 
		}
		
		.addimgbox {
			@extend %flex;
			padding: 30rpx;
			padding-top: 190rpx;
		}
		.addimg{
			width:160rpx;
			height:160rpx;
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
