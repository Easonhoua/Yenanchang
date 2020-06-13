<!--评论列表-->
<template>
	<view>
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback">
			<view class="top-slider-con">
				<view class="card-bd column">
					<text class="title">全部评论</text>
					<block class="list-item" v-for="(item,index) in goodCommentList" :key="index">
						<view class="list-cell">
							<view class="inner">
								<view class="user">
									<view class="gz"><text class="time">{{item.commentTime}}</text></view>
									<image class="img" v-if="item.photo" :src="item.photo"></image>
									<view class="right-txt">
										<view class="line-h"><text class="name">{{item.commentator}}</text><label class="label">{{item.gradeName}}</label></view>
										<view class="score">
											<uni-rate :value="item.scoreLevel" disabled="true" size="13"></uni-rate>
										</view>
									</view>	
								</view>
								<view class="txt">
									{{item.commentText}}
								</view>
								<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="true" style="width: 650rpx;">
									<view class="imgbox">
										<block v-if="item.photoPath" class="list-item" v-for="(photoItem,photoIndex) in item.photoPath" :key="photoIndex">
											<view class="item" @click="readImage(item.photoPath,photoIndex)">
												<!-- <image class="img" v-if="photoItem.filePath_220" :src="request.getBaseImagePath() + photoItem.filePath_220"></image>
												<image class="img" v-else :src="request.getBaseImagePath() + photoItem.filePath"></image> -->
												<image class="img" :src="photoItem" mode="aspectFill"></image>
											</view>
										</block>
									</view>
								</scroll-view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	var utils = require('@/common/js/util.js');
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			uniRate,
		},
		onLoad(e) {
			if(e.shopId){
				this.shopId = e.shopId;
			}
			if(e.productId){
				this.productId = e.productId;
			}
			if(e.productType){
				this.productType = e.productType;
			}	
		},
		data() {
			return {
				mescroll: '',
				goodCommentTitle:'',
				shopId:'',
				productId:'',
				productType:'',
				goodCommentList: {}, //list列表
			}
		},
		methods: {
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				this.goodCommentList = [];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				//根据店铺获取所有评论信息
				let url = '/memberapi/api/goodComment/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					shopId: this.shopId, //店铺
					productId:this.productId,
					productType:this.productType,
				};
				var that = this;
				this.request.get(url, data, mescroll).then(res => {
					const newData = res.list;
					newData.forEach(item => {
						if (item.commentTime) {
							item.commentTime = utils.formatMinutesDay(item.commentTime.replace(/-/ig, "/"));
						}
						console.log(item.anonymousStatus)
						if(item.anonymousStatus=="1"){
							item.commentator="匿名";
						}
						item.photo=utils.formatImagePath(item.photo);
						if (item.photoPath) {
							item.photoPath = utils.formatImagePaths(item.photoPath);
						}
					});
					if (res.list.length === 0 || this.mescroll.num === 1) this.goodCommentList = [];
					this.goodCommentList = this.goodCommentList.concat(newData); //追加新数据
				})
			},
		}
	}
</script>

<style>
	 
</style>
