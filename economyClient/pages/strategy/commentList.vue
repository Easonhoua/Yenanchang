<!--评论列表-->
<template>
	<view class="page play strategy">
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback">
			<view class="comment">
				<view class="comment-con">
					<view class="title"><text class="grey">评论({{commentTotal}})</text></view>
					<view class="comment-con-list" v-for="(item,index) in commentList" :key="index">
						<image class="img" :src="item.photo?item.photo:'/static/img_new/common/head.png'"></image>
						<view class="righttxt">
							<view class="username">
								<view class="name">{{item.userName}}</view>
								<view class="time">{{item.commentTime}}</view>
								<view class="zan" @click="commentClickGood(item)">
									<image class="icon" src="/static/img_new/gonglue/zan2.png"></image>{{item.goodCount}}
								</view>
							</view>
							<view class="txt">
								<view class="">{{item.commentRemark}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var utils = require('@/common/js/util.js');
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				mescroll: '',
				commentTotal: 0,
				relationId: '',
				commentType: '',
				commentList: {}, //list列表
			}
		},
		onLoad(e) {
			if (e.relationId) {
				this.relationId = e.relationId;
			}
			if (e.commentType) {
				this.commentType = e.commentType;
			}
		},
		methods: {
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				this.commentList = [];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				let url = '/memberapi/api/comment/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					relationId: this.relationId, //
					commentType: this.commentType
				};
				var that = this;
				this.request.get(url, data, mescroll).then(res => {
					that.commentTotal = res.totalRows;
					var	currList = res.list;

					currList.forEach(item => {
						if (item.photo) {
							item.photo = this.util.formatImagePath(item.photo);
						}
					});
					that.commentList = that.commentList.concat(currList);
				});
			},
			commentClickGood(item){
				if(this.request.alreadyLogin()){
					var url = "/memberapi/api/goodInfo/add.do";
					if(item.canGoodInfo == 2){
						url = "/memberapi/api/goodInfo/cancel.do";
					}
					let data = {
						goodType:10,
						relationId:item.commentId
					};
					
					var that = this;
					this.request.post(url,data).then(res=>{
						if(res.returncode == 0){
							
							if(item.canGoodInfo == 2){
								item.canGoodInfo  = 1;
								item.goodCount = item.goodCount -1;
								item.goodCount = item.goodCount <0?0:item.goodCount;
							}else{
								item.canGoodInfo  = 2;
								item.goodCount = item.goodCount +1;
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "../../common/css/other_new.scss";
</style>
