<!-- tabble列表-->
<template>
	<view>
		<view class="shop-list">
			<view class="item box-shadow" v-for="(item,index) in shopList" :key="index" @click="toDetails(item)">
				<image class="image" :src="item.thumbnailPath" mode="aspectFill"></image>
				<view class="title">{{item.shopName}}</view>
				<view class="display-row" style="margin-left: 20rpx;">
					<uni-rate :value="item.score" disabled="true" size="15" style="margin-right: 10rpx;"></uni-rate>
					<view v-if="platformSubjectId==4 || platformSubjectId==5 || platformSubjectId==6" class="score">评论:{{item.commentNum}}条</view>
					<view v-else-if ="platformSubjectId==2 || platformSubjectId==3" class="score" >人均:¥{{item.standardPrice}}/人</view>
					<view v-else class="score" >{{item.score}}分22</view>
				</view>
				<view v-if="item.startShopHours && item.endShopHours" class="time" :style="{background: boxBackGround}">{{item.startShopHours}}-{{item.endShopHours}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	export default {
		props:{
			// 主题编号 #CAE8FF蓝色底
			boxBackGround:{
				type:String,
				default:"#FFF1E5" //淡黄色
			}
		},
		components: {
			uniRate,
		},
		data() {
			return {
				platformSubjectId:'1', //主题编号
				shopList:[], //list列表
				longtitude: '', //经纬度
				latitude: '',
			}
		},
		methods:{
			getLocation:function(){
				var _self = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						_self.longtitude = res.longitude;
						_self.latitude = res.latitude;
					}
				});
			},
			putShopList:function(shopList,mescroll){
				this.formattingList(shopList,mescroll);
			},
			queryList:function(mescroll,platformLabels,nearby,keyword,platformSubjectId){
				this.getLocation(); //获取经纬度
				//获取店铺信息列表
				let url = '/memberapi/api/shops/shopsAndExtendsList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					keyword:keyword
				};
				if(platformSubjectId){
					data.subjectId = platformSubjectId;
				}
				if(nearby ==1){
					url = '/memberapi/api/shops/queryShopList.do';
					data.labelId=platformLabels;  //标签
					if (this.longtitude && this.latitude) {
						data.coordinate = this.longtitude + "," + this.latitude;
						//data.distance = "5000";; //距离
					}
				}else{
					data.platformLabels=platformLabels;  //标签
					data.sortFlag ='score-desc';
				}
				if(platformLabels && platformLabels.indexOf(",") != -1){
					data.essenceType = 1;
				}
				var that = this;
				this.request.get(url,data,mescroll).then(res=>{
					this.formattingList(res.list,mescroll);
				})
			},
			formattingList:function(list,mescroll){
				this.util.formatShopList(list);
				if(mescroll&&mescroll.num == 1||list.length === 0) this.shopList = [];
				this.shopList = this.shopList.concat(list); //追加新数据
			},
			toDetails: function(item) {
				//根据shopData.platformTypeId的值不同跳转到不同的页面
				this.util.gotoShopDetail(item); 
			}
		}
	}
	
</script>

<style lang="scss">
	
	.shop-list
	{
		overflow: hidden;
		width: 750rpx;
		padding: 0rpx 0rpx 30rpx 30rpx;
		.item{
			float: left;
			box-sizing: border-box;
			width: 330rpx;
			height: 470rpx;
			margin-right: 30rpx;
			margin-top: 10rpx;
			margin-bottom: 20rpx;
			padding-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			.image{
				width: 100%;
				min-height: 270rpx;
				background-color: #F5F5F5;
			}
			.title{
				margin: 16rpx 20rpx 12rpx 20rpx;
				margin-bottom: 10rpx;
				font-size: 28rpx;
				font-weight: bold;
			}
			.score{
				margin-top: -4rpx;
				font-size: 22rpx;
				color: rgba($color: #989898, $alpha: 0.8);
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
	
</style>
