<template>
		<!-- <view class="layout column"> -->
		<!-- <view class="content activity"> -->
	<view class="layout column activity">
		<!--  top="88rpx" :topbar="true" -->
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback" top="80">
			<column-swiper :info="infoSwiperList" @toDetail="toDetail(arguments)" ></column-swiper>
			<!-- 列表开始 -->
			<view class="listbox">
				<view class="list" v-for="(item,index) in activityList" :key="index" @tap="toDetail(item.activityId,index,item.activityChildType)">
					<view class="list-img"><image :src="item.imagePath[0]"></image></view>
					<view class="list-bd">
						<view class="title">{{item.activityTitle}}</view>
						<view class="txt">时间：{{item.activityTime}} </view>
						<view class="txt"><text>状态： </text><text class="blue">{{item.endDateStr}}</text></view>
						<view class="read"><text>浏览量 {{item.pageView}}</text><text>报名数 {{item.maxNum}}</text></view>
						<view class="link orange"   v-if="item.statusStr ==1">马上报名</view>
						<view class="link" v-else>查看详情</view>
					</view>
				</view>
			</view>	
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import columnSwiper from '@/pages/column/column-swiper.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			columnSwiper
		},
		data() {
			return {
				infoSwiperList: [],
				mescroll : '',
				activityList:[],
				date:0,
			}
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.activityList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取菜品信息列表
				let url = '/memberapi/api/activity/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					activityType:2
				};
				var that = this;
				this.request.get(url,data,mescroll).then(res=>{
					console.log(res)
					const newData = res.list;
					let ii=0;
					newData.forEach(item => {
						if(item.endDate &&  item.endDate >= that.util.formatDate(new Date())){
							//item.endDate = item.endDate.replace(/-/ig, "/");
							item.endDateStr = '报名进行中';
							item.statusStr=1;
						}else{
							item.endDateStr = '报名已结束';
							item.statusStr=2;
						}
					});
					this.infoSwiperList = [];
					for (let item of newData) {
						//抬头图
						if(item.imagePath && this.mescroll.num === 1 && ii<=2){
							var infoSwiper =[{
								"activityChildType":item.activityChildType,
								"id":item.activityId,
								"content":item.activityTitle,
								"status":item.statusStr,
								"url":this.util.formatImagePaths(item.imagePath)[0],
							}];
							this.infoSwiperList = this.infoSwiperList.concat(infoSwiper);
							ii++;
						}						
						item.imagePath = this.util.formatImagePaths(item.imagePath);
						//console.log("item.imagePath = ", item.imagePath);
					}
					if(res.list.length === 0 || this.mescroll.num === 1)  this.activityList = [];
					this.activityList = this.activityList.concat(newData); //追加新数据
				})
			},
			toDetail:function(activityId,index,activityChildType,e){
				if(activityId[1] == 1){
					uni.navigateTo({
						url: "/pages/newPage/activity/activity?activityId="+ activityId[0]
					})
					return;
				}
				if(activityChildType == 1){
					uni.navigateTo({
						url: "/pages/newPage/activity/activity?activityId="+ activityId
					})
					return;
				}
				if(index){
					this.activityList[index].pageView++;
				}
				uni.navigateTo({
					url:"../activity/activityDetail?activityId="+activityId
				})
			},
			
		}
	}
</script>

<style>
	
</style>