<template>
	<view class="layout letime">
		<view class="contain" style="background-color: #FFFFFF;">
			<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback">
				<view class="ht-card card" style="margin-left: 30rpx;" v-for="(item,index) in allShopList" :key="index">
					<view class="card-bd">
						<view class="ct-list" @click="toDetail(item)">
							<image class="img" :src="item.thumbnailPath"></image>
							<view class="righttxt">
								<view class="name">{{item.shopName?item.shopName:'--'}}</view>
								<view class="score" style="margin-top: 10rpx;">
									<uni-rate :value="item.score" disabled="true" size="14" style="display: inline-flex; margin-right: -20rpx;"></uni-rate>
									<text class="number yd">{{item.score}}分</text>
								</view>
								<view class="coupon coupon2" style="margin-top: 8rpx;">
									<label class="mark" style=" color: #7C7C7C;width: 260rpx;">距我{{item.distance?item.distance:'0'}}km</label>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>

		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			uniRate,
		},
		data() {
			return {
				mescroll : '',
				keyword:'',
				searchData:{},
				allShopList:[],
				longtitude:'',
				latitude:'',
				platformTypeId:'',
				tradeId:0,
			}
		},
		onLoad(option) {
			if(option.tradeId){
				this.tradeId = option.tradeId;
			}
		},
		onShow() {
			uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
					this.longtitude = res.longitude;
					this.latitude = res.latitude;
			        //console.log('当前位置的经度：' + res.longitude);
			        //console.log('当前位置的纬度：' + res.latitude);
			    },
				fail() {
					
				}
			});
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.allShopList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				let coordinate='';
				if(this.longtitude && this.latitude){
					coordinate = this.longtitude+","+this.latitude;
				}
				//获取项目信息列表
				const url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					keyword: this.keyword,
					coordinate:coordinate,
					essenceType:1,
					// tradeFlag:1,  //添加店铺是否是大牌
					platformTradeId:this.tradeId,
				};
				let sendDate =Object.assign({}, this.searchData, data);
				var that = this;
				this.request.get(url,sendDate,mescroll).then(res=>{
					let currListData = res.list;
					that.util.formatShopList(currListData);
					that.allShopList = that.allShopList.concat(currListData); //追加新数据
				})
			},
			toDetail:function(item){
				//根据shopData.platformTypeId的值不同跳转到不同的页面
				this.util.gotoShopDetail(item);
			},
			onNavigationBarSearchInputConfirmed (input) {
				this.keyword = input.text;
				this.downCallBack(this.mescroll);
			}
	
		}
	}
</script>

<style>
</style>

