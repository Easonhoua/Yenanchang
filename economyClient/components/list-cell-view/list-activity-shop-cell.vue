<template>
	<view class="commentlist recommend">
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback">
		<view class="list" v-for="(item,index) in activitylist" :key="index" @click="toShopDetail(item)">
			<view class="imgbox">
				<image class="img" :src="item.thumbnailPath"></image>
			</view>
			<view class="righttxt">
				<view class="name">{{item.shopName}}</view>
				<view class="distance">距景区{{item.distance}}m</view>
				<view class="score">
					<uni-rate class="star" activeColor="#E8541E" :value="item.score" disabled="true" size="16"></uni-rate>
					<text class="label">{{item.score}}分</text>
					<text class="label">{{item.standardPrice}}元/人</text>
					<!-- <text class="tag">美食林臻选分</text> -->
				</view>
				<view class="category">
					<text class="label">{{item.platformLabelsName}}</text>
				</view>
				<view class="category">
					<text class="label">开放时间：{{item.startShopHours}} - {{ item.endShopHours }}</text>
				</view>
			</view>
		</view>
		</mescroll-body>
	</view>
</template>

<script>
	import scoreRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		props: {
			// 店铺列表
			activityId: {
				type: [String,Number],
				default :''
			},
		},
		data() {
			return {
				mescroll:'',
				activitylist:[],
				tabIndex:0
				// activityid: ''
			};
		},
		
		methods: {
			tabChange (index) {
				this.tabIndex = index
				this.downCallBack(this.mescroll)
			},
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				this.activitylist = [];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				let data = {};
				if (this.tabIndex == 1) {
					data = {
						pageNo: mescroll.num,
						pageSize: mescroll.size,
						platformTypeId: 1,
						activityId: this.activityId
					};
				} else if (this.tabIndex == 2) {
					data = {
						pageNo: mescroll.num,
						pageSize: mescroll.size,
						platformLabels: 228,
						activityId: this.activityId
					};
				} else if (this.tabIndex == 3) {
					data = {
						pageNo: mescroll.num,
						pageSize: mescroll.size,
						platformLabels: 229,
						activityId: this.activityId
					};
				} else {
					data = {
						pageNo: mescroll.num,
						pageSize: mescroll.size,
						activityId: this.activityId
					};
				}
				let url = '/memberapi/api/activity/activityShopList.do';
				this.request.get(url, data).then(res => {
					console.log(res)
					var that = this;
					mescroll.endSuccess(res.list.length);
					res.list.forEach(function(item) {
						if (item.thumbnailPath && item.thumbnailPath != "/static/img/common/banner.png") {
							item.thumbnailPath = that.util.formatImagePath(item.thumbnailPath);
						} else {	
							item.thumbnailPath = that.util.formatImagePath(item.logo);
						}
					})
					that.activitylist = that.activitylist.concat(res.list); //追加新数据
				}).catch((e) => {
					console.log(e)
				})		
			},
			toShopDetail:function(item){
				this.util.gotoShopDetail(item); 
			},
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	.recommend{
		padding: 80rpx 20rpx 0;
		box-sizing: border-box;
	}
	.list{
		position: relative;
		display: flex;
		margin-bottom: 26rpx;
		padding: 20rpx;
		align-items: center;
		border-bottom: 1rpx solid #eeeeee;
	}
	
	.imgbox{
		width: 224rpx;
		height: 222rpx;
		margin-right: 20rpx;
		
	}	
		.img{
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
		.righttxt{
			height: 208rpx;
			// padding-top: 24rpx;
		}
			.name{
				width: 280rpx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				font-size: 15px;
				font-weight: 650;
				margin-bottom: 10px;
			}
			.score{
				display: flex;
				align-items: center;
				margin-bottom: 4rpx;
				font-size: 22rpx;
				color: #666666;
			}	
				.label{
					margin-right: 10rpx;
					display: inline-block;
				}
				.tag{
					background: #f8efed;
					color: #e66563;
					padding: 2rpx 4rpx;
				}
			
			.category{
				color: #666666;
				margin-bottom: 4rpx;
				font-size: 22rpx;
			}	
			.star{
				margin-right: 10rpx;
			}	
			
			.distance{
				font-size: 20rpx;
				color: 	#E8541E;
				position: absolute;
				right: 30rpx;
				top: 30rpx;
			}
				
		
	
	
	@import "@/common/css/other_new.scss";
</style>
