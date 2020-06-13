<template>
	<view class="content">
		<mescroll-body @down="dowmCallBack" @up="upCallback">
			<view class="top-cell border-top-gray-line" v-for="(item,index) in topicList" :key="index" @tap="toView(item.topicId)">
				<image class="cell-image" :src="item.thumbnailPath" mode="aspectFill"></image>
				<view class="cell-right" >
					<view class="text-detail" style="font-size: 32rpx;">{{item.topicTitle}}</view>
					<view class="text-edit">{{item.attendNum}} 人参与</view>
					<view class="text-edit">发布时间:{{item.publishTime}}</view>
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
				topicList:[]
			}
		},
		methods: {
			dowmCallBack: function(mescroll) {
				this.topicList = [];
				mescroll.resetUpScroll();
			},
			upCallback: function(mescroll) {
				//获取店铺信息列表
				let url = '/memberapi/api/topic/myList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size
					
				};
				this.request.post(url, data, mescroll).then(res => {
					for (let item of res.list) {
						item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
						this.topicList.push(item);
					}
				})
			},
			//详情
			toView:function(topicId){
				uni.navigateTo({
					url:"/pages/topic/topicview?topicId="+topicId
				})
			}
			
		}
	}
</script>

<style>
	.top-cell{
		padding: 30rpx;
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		/* align-items: center; */
	}
	.cell-image{
		width: 160rpx;
		min-width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
		background-color: #EEEEEE;
		margin-right: 30rpx;
	}
	.cell-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
