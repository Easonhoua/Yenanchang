<template>
	<view class="layout letime">
		<screenComponent platformTypeId="1" @screenLike="screenLike" ref="myScreen"></screenComponent>
		<view class="contain">
			<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback" top="130">
				<view class="ht-card card"  v-for="(item,index) in dellicaciesList" :key="index">
					<view class="card-bd" @click="toDetail(item.shopId)">
						<view class="ct-list">
							<image class="img" :src="item.thumbnailPath"></image>
							<view class="righttxt">
								<view class="name">
									<label>{{item.shopName}}</label>
								</view>
								<view class="score">
									<uni-rate :value="item.score" disabled="true" size="14" style="display: inline-flex; margin-right: -20rpx;"></uni-rate>
									<text class="number">{{item.score}}分</text>
									<text class="number">¥{{item.discountPrice}}/人</text>
								</view>
								<view class="locale font24" style="margin-left: -10rpx;">
									<label class="mark" style="float: right; color: #7C7C7C;">距我{{item.distance?item.distance:'0'}}km</label>
								</view>
								<view class="locale font24 "><text class="canary-yellow">{{item.address}}</text> </view>
								<view class="coupon coupon2" v-if="item.cashName != null">
									<view class=""><label class="mark red">券</label><text class="yw">{{item.cashName}}</text></view>
								</view>
								<!-- <view class="coupon coupon2">
									<view class=""><label class="mark blue">团</label><text class="yw">29.9元</text><text class="label-yw">金秋限定团购套餐</text></view>
								</view> -->
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
	import screenComponent from '@/components/screen-component/screen-component.vue';
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	var _self;
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			uniRate,
			screenComponent
		},
		data() {
			return {
					mescroll : '',
					keyword:'',
					platformTypeId:1,
					searchData:{},
					dellicaciesList:[],
					longtitude:'',
					latitude:'',
				}
		},
		onLoad() {
		},
		mounted() {
			this.$refs.myScreen.getTypeLabel();
		},
		onShow() {
			_self = this;
			uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
					_self.longtitude = res.longitude;
					_self.latitude = res.latitude;
			    }
			});
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.dellicaciesList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取项目信息列表
				const url = '/memberapi/api/shops/queryDelicacyShopList.do';
				let coordinate='';
				if(this.longtitude && this.latitude){
					coordinate = this.longtitude+","+this.latitude;
				}
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					keyword: this.keyword,
					coordinate:coordinate,
					platformTypeId:this.platformTypeId,
				};
				let sendDate =Object.assign({}, this.searchData, data);
				var that = this;
				this.request.get(url,sendDate,mescroll).then(res=>{
					let currListData = res.list;
					that.util.formatShopList(currListData);
					that.dellicaciesList = that.dellicaciesList.concat(currListData); //追加新数据
				})
			},
			screenLike(searchData){
				this.searchData= searchData;
				//console.log("this.searchData: " + JSON.stringify(this.searchData));
				this.downCallBack(this.mescroll);
			},
			onNavigationBarSearchInputChanged (input) {
				//console.log(input);
				this.keyword = input.text;
				this.downCallBack(this.mescroll);
			},
			back() {
				uni.navigateBack();
			},
			toDetail(shopId){
				uni.navigateTo({
					url:"/pages/delicacies/delicacyDetail?shopId="+shopId
				})
			}
		}
	}
</script>

<style>
</style>
