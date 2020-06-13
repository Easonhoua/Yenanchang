<template>
	<view class="content-white">
		<mescroll-body @down="downCallBack" @up="upCallback" @init="initMescroll">
			<!-- 要在加上一层view否则滚动到某个地方就会失效 -->
			<view >
				<view class="literature-top" >
					<swiper v-if="bannerList.length" class="swiper" indicator-dots circular indicator-color="#FFFFFF"
					 indicator-active-color="#43917A" :interval="3000" :duration="1000">
						<swiper-item class="item imgbox" v-for="(item,index) in bannerList" :key="index" @click="bannerClick(item)">
							<image class="imgbox-img" style="height: 142px;" :src="item.photo" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
					<view v-else class="imgbox">
						<image class="imgbox-img" src="/static/img/delicacies/banner.png"></image>
					</view>
					
					<view class="top-slider-place" style="padding-top: 10rpx;">
						<image class="top-slider-place-left" style="width: 198rpx;" src="/static/img/delicacies/phb.png" @tap="toDelicaciesList()"></image>
						<image class="top-slider-place-right" style="width: 198rpx;" src="/static/img/delicacies/jrth.png" @tap="toDelicaciesDiscountList()"></image>
						<image class="top-slider-place-right" style="width: 198rpx;" src="/static/img/delicacies/dhpz.png" @tap="toDelicaciesBookList()"></image>
					</view>
				</view>
				<!--tabbars-->
				<platformLabels-component class="top-scroll" ref='labelsUtil' @refreshTableList="refreshTableList" :platformSubjectId="platformSubjectId" essenceType="1"></platformLabels-component>
				<!--list-->
				<tableList-component ref='tableList'></tableList-component>
			</view>
		</mescroll-body>
	</view>
</template>
<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import platformLabelsComponent from "@/components/platformLabels-component/platformLabels-component.vue";
	import tableListComponent from "@/components/tableList-component/tableList-component.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			platformLabelsComponent,
			tableListComponent
		},
		data() {
			return {
				mescroll: "",
				platformSubjectId: "3", //品佳肴				
				keyword:'',
				platformLabels:'0',// 标签编号 有标签时以逗号分隔
				nearby:2 ,//附近
				bannerList: []
			}
		},
		onShow(){
			const app = getApp();
			if(app.globalData.delicacies){
				this.bannerList=app.globalData.delicacies;
			}
		},
		onLoad() {
		},
		onNavigationBarSearchInputConfirmed(e){
			this.keyword = e.text;
			this.mescroll.num = 1;
			this.upCallback(this.mescroll,false);
			uni.hideKeyboard();
		},
		onNavigationBarSearchInputChanged(e){
			if(!e.text){
				this.keyword = "";
				this.mescroll.num = 1;
				this.upCallback(this.mescroll,false);
				uni.hideKeyboard();
			}
		},
		methods: {
			bannerClick: function(item) {
				this.util.bannerClick(item);
			},
			toDelicaciesList: function() {
				uni.navigateTo({
					//url: '/pages/delicacies/delicacieslist'
					url: '/pages/food/ranking?rankingType=1'
				})
			},
			toDelicaciesDiscountList: function() {
				uni.navigateTo({
					url: '/pages/delicacies/delicaciesDiscountlist'
				})
			},
			toDelicaciesBookList: function() {
				uni.navigateTo({
					url: '/pages/delicacies/delicaciesBookList'
				})
			},
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.sportsList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				this.$refs.tableList.queryList(mescroll,this.platformLabels,this.nearby,this.keyword);
			},
			//根据标签更新list表
			refreshTableList: function(data){
				this.platformLabels = data.labelIds;
				this.nearby = data.nearby;
				this.$refs.tableList.platformSubjectId= this.platformSubjectId;
				this.downCallBack(this.mescroll);
			}
		}
	}
</script>
<style lang="scss">
	
	.top-scroll {
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		z-index: 99;
		position: -webkit-sticky;
		position: sticky;
		top: -2rpx;
		background-color: #FFFFFF;
	}
	
</style>
