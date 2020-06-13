<!--话题列表-->
<template>
	<view class="layout">
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback">
			<view class="consult-list" v-for="(item,index) in topicList" :key="index" @tap="toView(item.topicId)">
				<view class="consult-list-dis">
					<image class="consult-list-left" :src="item.thumbnailPath" mode="aspectFill"></image>
					<view class="consult-list-right">
						<view class="list-describe font-weight-600 mulit-limit-one">{{item.topicTitle}}</view>
						<view class="consult-base">
							<text class="list-mark">{{item.attendNum}}参与</text>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				mescroll : '',
				topicList:[],
			}
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.topicList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取菜品信息列表
				let url = '/memberapi/api/topic/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
				};
				var that = this;
				this.request.get(url,data,mescroll).then(res=>{
					const newData = res.list;
					newData.forEach(item => {
						if(item.thumbnailPath){
							let thumbnailPath = JSON.parse(item.thumbnailPath);
							if(thumbnailPath.filePath_220){
								item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath_220;
							}else{
								item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath;
							}
						}
					});
					if(res.list.length === 0 || this.mescroll.num === 1)  this.topicList = [];
					this.topicList = this.topicList.concat(newData); //追加新数据
				})
			},
			toView:function(topicId){
				uni.navigateTo({
					url:"topicview?topicId="+topicId
				})
			}
		}
	}
</script>

<style>
	.consult-list{
		width: 750rpx;
		height: 214rpx;
		border-top: 2rpx solid #F2F2F2;
	}
	.consult-list-dis{
		margin: 30rpx 30rpx 30rpx 33rpx;
	}
	.consult-list-left{
		width: 154rpx;
		height: 154rpx;
		float: left;
		position: absolute;
	}
	.consult-list-right{
		width: 517rpx;
		height: 154rpx;
		float: right;
	}
	
	.list-describe{
		font-size: 32rpx;
		color: #000000;
		line-height: 46rpx;
	}
	.consult-base{
		bottom: 0rpx;
	}
	.list-mark{
		font-size: 28rpx;
		color: #848484;
		margin-right: 20rpx;
	}
</style>
