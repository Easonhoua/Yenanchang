<template>
	<view class="layout htvideo">
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback" top="80">
			<view class="ht-tab-con">
				<view class="subitem"  v-for="(item,index) in videoList" :key="index" @tap="toDetail(item.videoId)">
					<image class="img" :src="item.videoPath" />
					<text class="title Text-hid2">{{item.videoTitle}}</text>
					<view class="bt-bar">
						<view class="user">
							<image class="tx" :src="item.photo" />
							<text class="txt">{{item.userName}}</text>
						</view>
						<view class="dz" @tap="addGoodInfo(item.videoId,index)">
							<image class="dz-img" :src="request.getBaseImagePath()+'/static/img/index/dz.png'" />
							<text class="txt">{{item.goodNum}}</text>
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
				videoList:[], 
			}
		},
		methods:{
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.videoList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取菜品信息列表
				let url = '/memberapi/api/video/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
				};
				var that = this;
				this.request.get(url,data,mescroll).then(res=>{
					const newData = res.list;
					newData.forEach(item => {
						if(item.videoPath){
							let videoPath = JSON.parse(item.videoPath);
							if(videoPath.filePath_220){
								item.videoPath = that.request.getBaseImagePath() + videoPath.filePath_220;
							}else{
								item.videoPath = that.request.getBaseImagePath() + videoPath.filePath;
							}
						}
						if(item.photo){
							let photo = JSON.parse(item.photo);
							if(photo.filePath_220){
								item.photo = that.request.getBaseImagePath() + photo.filePath_220;
							}else{
								item.photo = that.request.getBaseImagePath() + photo.filePath;
							}
						}
					});
					if(res.list.length === 0 || this.mescroll.num === 1)  this.videoList = [];
					this.videoList = this.videoList.concat(newData); //追加新数据
				})
			},
			toDetail:function(videoId){
				uni.navigateTo({
					url:'videoDetail?videoId='+videoId
				})
			},
			//点赞
			addGoodInfo:function(videoId,index){
				if(this.request.alreadyLogin()){
					let url = '/memberapi/api/goodInfo/add.do';
					let data = {
						relationId: videoId,
						goodType:8,  
					};
					if(this.videoList[index].canGoodInfo ==1){ //添加点赞
						url = '/memberapi/api/goodInfo/add.do';
					}else{ //取消点赞
						url = '/memberapi/api/goodInfo/cancel.do';
					}
					var that = this;
					this.request.post(url, data).then(res => {
						if (res.returncode === 0 && that.videoList[index].canGoodInfo ==1) {
							that.request.toastTips("点赞成功");
							that.videoList[index].canGoodInfo = 2;
							that.videoList[index].goodNum =that.videoList[index].goodNum +1;
						}else{
							that.request.toastTips("取消点赞");
							that.videoList[index].canGoodInfo = 1;
							that.videoList[index].goodNum =that.videoList[index].goodNum  - 1;
						}
					})
				}
			},
		}
	}
</script>

<style>
</style>
