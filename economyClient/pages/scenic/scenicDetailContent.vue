<template>
	<view class="page scenicDetails">
		<view class="tab">
			<view class="item" :class="tabIndex==0 ? 'active' : ''" @click="ontabtap(0)">购票须知</view>
			<view class="item" :class="tabIndex==1 ? 'active' : ''" @click="ontabtap(1)">游玩攻略</view>
		</view>
		<view class="tab-con" v-if="tabIndex==1">
			<view class="introduction">
				<view class="title">景区攻略</view>
				<rich-text :nodes="shopsData.scenicStrategy"></rich-text>
			</view>
		</view>
		<view class="tab-con" v-else>
			<view class="timebox">
				<view class="open">
					<view class="title">开放时间</view>
					
					<view class="open-con">
						<view class="date">{{shopsData.shopSeasonName}}</view>
						<view class="time" v-if="shopsData.itemList"  v-for="(item,index) in shopsData.itemList" :key="index">
							<view class="week">
								<text class="txt">{{item.shopDayName}}</text>
								<text v-if="item.shopHours1 && item.shopHours2">{{item.shopHours1?item.shopHours1:''}}-{{item.shopHours2?item.shopHours2:''}} <block v-if="item.shopHours3 && item.shopHours4">{{item.shopHours3?item.shopHours3:''}}-{{item.shopHours4?item.shopHours4:''}}</block>
								</text>
							</view>
						</view>
					</view>
					<!-- <view class="supplement">补充说明： 1月24日(除夕）  营业时间为8:0-12:00</view> -->
					<view class="tip"><text class="red"> *</text>以上信息仅供参考，具体以景区当日实际公示信息为准</view>
				</view>
			</view>
			<!-- 开放时间结束 -->
			<view class="introduction">
				<view class="title">景点简介</view>
				<rich-text :nodes="shopsData.details"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				shopsData:{},//店铺信息
			}
		},
		onLoad(option){
			if(option.shopId){
				this.shopsData.shopId = option.shopId;
				this.queryShopDetail(option.shopId); //店铺详情
			}
		},
		methods: {
			ontabtap(index) {
				this.tabIndex = index;
			},
			queryShopDetail:function(shopId){
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId,
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						that.bannerList = [];
						that.shopsData = res.data;
						that.isFavorite = that.shopsData.canFavorite == 2;
						if (that.shopsData.imagePath) {
							that.shopsData.imagePath = that.util.formatImagePaths(that.shopsData.imagePath);
							that.bannerList = that.bannerList.concat(that.shopsData.imagePath);
						}
						if(that.shopsData.logo){
							that.shopsData.logo = that.util.formatImagePath(that.shopsData.logo);
							that.bannerList.push(that.shopsData.logo);
						}
						if (that.shopsData.thumbnailPath) {
							that.shopsData.thumbnailPath = that.util.formatImagePath(that.shopsData.thumbnailPath);
							that.bannerList.push(that.shopsData.thumbnailPath);
						}
						
						if(that.shopsData.details){
							that.shopsData.details = that.shopsData.details.replace(/\<img/g,
								'<img style="width:100%;height:auto;display:block"');
						}
						if(that.shopsData.scenicStrategy){
							that.shopsData.scenicStrategy = that.shopsData.scenicStrategy.replace(/\<img/g,
								'<img style="width:100%;height:auto;display:block"');
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "@/common/css/other_new.scss";
</style>