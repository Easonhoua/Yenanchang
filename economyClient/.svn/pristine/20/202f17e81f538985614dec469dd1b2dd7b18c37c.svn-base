<template>
	<view class="page cityaffairs">
		<view class="tab">
			<view class="item" :class="activityType==0 ? 'active' : ''" @click="ontabtap(0)">全部</view>
			<view class="item" :class="activityType==2 ? 'active' : ''" @click="ontabtap(2)">户外</view>
			<view class="item" :class="activityType==1 ? 'active' : ''" @click="ontabtap(1)">健身</view>
			<view class="item" :class="activityType==3 ? 'active' : ''" @click="ontabtap(3)">公益</view>
		</view>
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback">
			<view class="tab-con">
				<column-swiper :info="infoSwiperList" @toDetail="toDetail" ></column-swiper>
				<view class="listbox">
					<view class="list line-bottom" v-for="(item,index) in activityList" :key="index" @tap="toDetail(item.activityId,index)">
						<view class="imgbox">
							<image class="img" :src="item.imagePath[0]"></image>
						</view>
						<view class="righttxt">
							<view class="name">{{item.activityTitle}}</view>
							<view class="time">时间：{{item.activityTime}}</view>
							<view class="status">状态：<text class="blue">{{item.endDateStr}}</text></view>
							<view class="statistics"><text>浏览量 {{item.pageView}} </text> <text>报名数{{item.maxNum}}</text></view>
							<view class="link orange"   v-if="item.statusStr ==1">马上报名</view>
							<view class="link" v-else>查看详情</view>
						</view>
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
				activityType:0 //类型
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
				//活动信息
				let url = '/memberapi/api/activity/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
				};
				if(this.activityType !=0){
					data.activityType = this.activityType;
				}
				var that = this;
				this.request.get(url,data,mescroll).then(res=>{
					const newData = res.list;
					let ii=0;
					newData.forEach(item => {
						if(item.endDate &&  item.endDate >= that.util.formatDate(new Date())){
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
								"id":item.activityId,
								"content":item.activityTitle,
								"status":item.statusStr,
								"url":this.util.formatImagePaths(item.imagePath)[0],
							}];
							this.infoSwiperList = this.infoSwiperList.concat(infoSwiper);
							ii++;
						}						
						item.imagePath = this.util.formatImagePaths(item.imagePath);
					}
					if(res.list.length === 0 || this.mescroll.num === 1)  this.activityList = [];
					this.activityList = this.activityList.concat(newData); //追加新数据
				})
			},
			toDetail:function(activityId,index){
				if(index){
					this.activityList[index].pageView++;
				}
				uni.navigateTo({
					url:"../activity/activityDetail?activityId="+activityId
				})
			},
			ontabtap(index) {
				this.activityType=index;
				this.downCallBack(this.mescroll);
			}
		}
	}
</script>

<style lang="scss">
	/*其他scss */

	@import "@/common/css/other_new.scss";
</style>
