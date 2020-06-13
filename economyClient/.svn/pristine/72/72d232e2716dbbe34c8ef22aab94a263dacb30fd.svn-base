<!--评论列表-->
<template>
	<view>
		<view v-if="totalRows <= 0 " style="text-align: center;font-size: 28rpx;">
			
		</view>
		<view v-else class="list" v-for="(item,index) in goodCommentList" :key="index">
			<view class="user">
				<image class="userlogo" :src="item.photo?item.photo:'/static/img_new/common/head.png'"></image>
				<view class="righttxt">
					<view class="name"><text>{{item.commentator}}</text><!-- <view class="tag">点评家</view> --></view>
					<view class="score">
						{{item.scoreLevel}}分 {{item.gradeName}}
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
		<view class="comment-more line-top" v-if="totalRows >= 1" @tap="getAllList">
			查看全部{{totalRows}}条点评
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
					pageSize: 1,
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
						
						if(item.photoPath){
							item.photoPath = this.util.formatImagePaths(item.photoPath);
						}
						if(item.anonymousStatus=="1"){
							item.commentator="匿名";
						}
						if(item.photo){
							item.photo = this.util.formatImagePath(item.photo,true);
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
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/css/other_new.scss";
	.list{
		.user{
			@extend %flex;
			margin-bottom: 35rpx;
			.userlogo{
				width:72rpx;
				height:72rpx;
				border-radius: 100%;
				margin-right:25rpx;
			}
			.righttxt{
				position: relative;
				.tag{
					padding:2rpx 5rpx;
					background: #62c2fd;
					color:#fff;
					position:absolute;
					right:-100rpx;
					font-size:16rpx;
					top:0;
					/* #ifdef APP-PLUS */
					top: 10rpx;
					right:-60rpx;
					/* #endif */
				}
				.name{
					margin-bottom:5rpx;
				}
				.score{
					font-size:20rpx;
					.icon{
						width:34rpx;
						height:34rpx;
						margin-right:5rpx;
						vertical-align: middle;
						margin-top:-8rpx;
					}
				}
			}
		}
		.txt{
			margin-bottom: 35rpx;
		}
		.scroll-h{
			height:218rpx;
		}
		.imgbox{
			@extend %flex-justify-content;
			.img{
				width:218rpx;
				height:218rpx;
				margin-right: 10px;
				border-radius: 10rpx;
			}
		}
	}
	.comment-more{
		color:$blue;
		padding:30rpx 0 0 0;
		text-align: center;
		margin-top:25rpx;
	}
</style>
