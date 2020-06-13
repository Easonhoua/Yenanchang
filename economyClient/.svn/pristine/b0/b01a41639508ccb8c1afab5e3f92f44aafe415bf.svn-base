<template>
	<view class="content-white">
		<scroll-navi-bar class="top-scroll" :itemList="['全部','美食','搞笑','其他']" @naviItemClick="naviItemClick"></scroll-navi-bar>
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback" top="78">
			<view class="video-list">
				<view class="item box-shadow" v-for="(item,index) in videoList" :key="index" :style="{marginTop:item.marginTop+'px'}" >
					<image class="image" :style="{height:item.height+ 'px'}" :src="item.videoCover?item.videoCover:'/static/img/video/video_1.png'"  mode="aspectFill" @click="playVideo(item)"></image>
					<view class="title">{{item.videoTitle?item.videoTitle:'--'}}</view>
					<view class="user">
						<image class="header3" :src="item.photo?item.photo:'../../static/img/scenic/12.jpeg'" mode="aspectFill"></image>
						<view class="name">{{item.userName?item.userName:'--'}}</view>
						<image @tap="changeDzStatus(item)" class="prise" :src="item.canGoodInfo==1?'../../static/img/common/icon_zan.png':'../../static/img/index/dz_yes.png'"></image>
						<text class="num">{{item.goodNum}}</text>
					</view>
				</view>
			</view>
		</mescroll-body>
		<view class="add-button" @tap="addVideo">+</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import scrollNaviBar from "@/components/navi-bar/scroll-navi-bar.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			scrollNaviBar
		},
		data() {
			return {
				videoList: [],
				mescroll: '',
				dzSrc: '../../static/img/common/icon_zan.png',
				dzNum: 0,
				currIndex:0,
				videoTypes:["","1","2","9"],
				videoType:'',
			}
		},
		created() {
			var that = this;
			uni.$on("refreshVideo",function(){
				that.searchData();
			});
		},
		onLoad() {
			uni.setStorageSync("addData",0); //话题页签置为0
		},
		onUnload() {
			uni.$off("refreshVideo");
		},
		methods: {
			naviItemClick: function(item) {
				this.currIndex = item.index;
				this.videoType = this.videoTypes[item.index];
				this.downCallBack(this.mescroll);
			},
			searchData(){
				this.mescroll.num = 1;
				this.downCallBack(this.mescroll);
			},
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				//获取视频列表
				const url = '/memberapi/api/video/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					videoType:this.videoType,
				};
				this.request.get(url, data, mescroll).then(res => {
					let currListData = res.list;
					currListData.forEach((item,index) => {
						if (item.goodNum > 10000) {
							item.goodNum = (item.goodNum / 10000).toFixed(2).toString() + "万";
						}
						item.height=150+(50*(index%2));
						if(index!=0){
							item.marginTop=-50*(index%2==0?index/2:0);
						}else{
							item.marginTop=0;
						}
						
						item.photo = this.util.formatImagePath(item.photo);
						item.videoCover = this.util.formatImagePath(item.videoCover);
					});
					if(mescroll.num == 1) {
						this.videoList = [];
					} 
					this.videoList = this.videoList.concat(currListData); //追加新数据
				})
			},
			changeDzStatus: function(obj) {
				if (this.request.alreadyLogin()) {
					let url = '/memberapi/api/goodInfo/add.do'; //添加点赞
					let data = {
						relationId: obj.videoId,
						goodType: 8,
					};
					if (obj.canGoodInfo == 2) {
						url = '/memberapi/api/goodInfo/cancel.do'; //取消点赞
					}
					var that = this;
					this.request.post(url, data).then(res => {
						if (res.returncode === 0 && obj.canGoodInfo == 1) {
							that.request.toastTips("点赞成功");
							obj.canGoodInfo = 2;
							obj.goodNum += 1;
						} else {
							that.request.toastTips("已取消");
							obj.canGoodInfo = 1;
							obj.goodNum -= 1;
						}
					})
				}
			},

			playVideo: function(item) {
				uni.navigateTo({
					url: "/pages/video/palyVideo?videoSrc=" + item.videoPath + "&videoTitle=" + item.videoTitle + "&videoId=" + item.videoId

				})
			},
			addVideo:function(){
				if(this.request.alreadyLogin()){
					uni.navigateTo({
						url:'uploadVideo'
					});
				}
			}
			
		}
	}
</script>

<style lang="scss">
	
	.video-list
	{
		overflow: hidden;
		width: 100vw;
		padding-left: 28rpx;
		justify-content: space-between;
		// padding: 0rpx 0rpx 30rpx 30rpx;
		.item{
			
			float: left;
			box-sizing: border-box;
			width: 336rpx;
			max-height: 580rpx;
			margin-right: 25rpx;
			margin-top: 10rpx;
			margin-bottom: 28rpx;
			padding-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border-radius: 10rpx;
			overflow: hidden;
			.image{
				width: 100%;
				background-color: #F5F5F5;
			}
			.title{
				margin: 16rpx 20rpx 12rpx 20rpx;
				margin-bottom: 10rpx;
				font-size: 28rpx;
				font-weight: bold;
			}
			.user{
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 100%;
				padding: 0rpx 20rpx 10rpx 20rpx;
				.header3{
					width: 50rpx;
					height: 50rpx;
					border-radius: 60rpx;
				}
				.name{
					font-size: 26rpx;
					// color: gray;
					color: rgba($color: #989898, $alpha: 0.8);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
					max-width: 120rpx;
					margin: 0 10rpx;
				}
				.prise{
					width: 30rpx;
					height: 30rpx;
				}
				.num{
					margin-left: 10rpx;
					font-size: 32rpx;
					color: rgba($color: #989898, $alpha: 0.8);
				}
			}
			.time{
				background-color: #FFF1E5;
				color: #4A4A4A;
				font-size: 18rpx;
				padding: 4rpx 10rpx;
				margin-top: 10rpx;
				margin-left: 20rpx;
				margin-right: auto;
			}
		}
		
	}
	.add-button{
		width: 70rpx;
		height: 70rpx; 
		line-height: 62rpx;
		background-color: #42917A;
		border-radius: 50%;
		margin-bottom: 100rpx;
		margin-left: 650rpx;
		z-index: 9;
		font-size: 70rpx;
		color: #FFFFFF;
		text-align: center;
		position: fixed;
		bottom: 50rpx;
		right: 50rpx;
	}
	
</style>
