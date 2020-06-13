<!--周边列表-->
<template>
	<view>
		<view class="card-bd column">
			<text class="title">{{peripheryTitle}}</text>
			<block class="list-item" v-for="(item,index) in shopsList" :key="index" >
				<view class="ct-list" @tap="toDetails(item)">
					<image class="img" :src="item.thumbnailPath"></image>
					<view class="righttxt">
						<view class="name">{{item.shopName}}</view>
						<view class="score">
							<uni-rate :value="item.score" disabled="true" size="13"></uni-rate>
							<text class="number">{{item.commentNum}}条</text>
							<text class="number">¥{{item.discountPrice}}/人</text>
						</view>
						<view class="locale font24">{{item.address}}</view>
						<!-- <view class="coupon coupon2">
							<view class=""><label class="mark red">券</label><text class="label">90代100元</text></view>
						</view> -->
					</view>
				</view>
			</block>
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
			// 标题
			peripheryTitle:{ 
				type:String,
				default:"周边"
			},
			// 经纬度
			coordinate:{ 
				type:String,
				default:"115.898706,28.695362"
			},
			distance:{ //距离（米）
				type:String,
				default:"500"
			},
		},
		data() {
			return {
				shopsList: {}, //list列表
			}
		},
		created() {
			this.queryPeripheryShopsList();
		},
		methods: {
			queryPeripheryShopsList:function() {
				// 根据坐标查询附近的店铺信息
				let url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: 1,
					pageSize: 10,
					platformTypeId:1,  //美食
					coordinate: this.coordinate, //经纬度
					distance: this.distance, //距离
				};
				var that = this;
				this.request.get(url, data).then(res => {
					const newData = res.list;
					this.util.formatShopList(newData);
					this.shopsList = [];
					this.shopsList = this.shopsList.concat(newData); //追加新数据
				})
			},
			toDetails: function(item) {
				//根据shopData.platformTypeId的值不同跳转到不同的页面
				let url = "/pages/delicacies/delicacyDetail?shopId="+item.shopId+'&coordinate='+item.coordinate;
				uni.navigateTo({
					url:url
				});
				
			}
		}
	}
</script>

<style>
	 
</style>
