<!--评论列表-->
<template>
	<view>
		<view class="top-slider-con">
			<view class="card-bd column">
				<text class="title" style="padding-left: 15rpx;">{{goodCommentTitle}}</text>
				<block v-if="goodCommentList.length <1 " >
					<view style="height: 80rpx;line-height: 50rpx;padding-left: 15rpx;">暂无评论</view>
				</block>
				<block class="list-item" v-else v-for="(item,index) in goodCommentList" :key="index">
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
				<view class="list-cell" v-if="totalRows > 1" @tap="getAllList">
					<view class="list-cell-more">
						<text>查看全部精选评论</text>
						<image class="list-cell-more-image" src="../../static/img/common/arrow_right.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	var utils = require('@/common/js/util.js');
	export default {
		components: {
			uniRate,
		},
		props:{
			// 店铺编号
			shopId:{ 
				type:[Number,String],
				default:''
			},
			// 商品编号
			productId:{ 
				type:[Number,String],
				default:''
			},
			// 类型
			productType:{ 
				type:[Number,String],
				default:'',
			},
			goodCommentTitle:{ //标题
				type:String,
				default:"评论"
			},
		},
		data() {
			return {
				totalRows:0,
				goodCommentList: {}, //list列表
			}
		},
		created	() {
			//console.log("this.shopIdthis.shopId = ",this.shopId);
			this.queryGoodCommentList(this.shopId);
		},
		watch: {
			shopId(newshopId,oldShopid){
				this.queryGoodCommentList(newshopId);
			}
		},
		methods: {
			queryGoodCommentList:function(shopId){
				if(!shopId) return;
				//根据店铺获取所有评论信息
				let url = '/memberapi/api/goodComment/list.do';
				let data = {
					pageNo: 1,
					pageSize: 2,
					productId:this.productId,
				};
				if(shopId){
					data.shopId = shopId;
				}
				if(this.productId){
					data.productId = this.productId;
				}
				if(this.productType)
				{
					data.productType = this.productType;
				}
				var that = this;
				this.request.get(url, data).then(res => {
					this.totalRows = res.totalRows;
					const newData = res.list;
					newData.forEach(item => {
						if (item.commentTime) {
							item.commentTime = utils.formatMinutesDay(item.commentTime.replace(/-/ig, "/"));
						}
						if(item.anonymousStatus=="1"){
							item.commentator="匿名";
						}
						item.photo=utils.formatImagePath(item.photo);
						if (item.photoPath) {
							item.photoPath = utils.formatImagePaths(item.photoPath);
						}
					});
					this.goodCommentList = [];
					this.goodCommentList = this.goodCommentList.concat(newData); //追加新数据
				})
			},
			getAllList:function(){
				uni.navigateTo({
					url:'/pages/goodComment/goodCommentAllList-component?shopId='+this.shopId+'&productId='+this.productId+'&productType='+this.productType
				})
			},
			readImage: function(urls,index) {
				uni.previewImage({
					urls: urls,
					current: index,
					indicator: 'number',
					loop: true
				})
			},
		}
	}
</script>

<style>
	.list-cell-more{
		display: flex;
		font-size: 32rpx;
		color: #4A4A4A;
		padding-top: 24rpx;
	}
	.list-cell-more-image{
		margin-left: auto;
		width: 24rpx;
		height: 30rpx;
		margin-right: 20rpx;
	} 
</style>
