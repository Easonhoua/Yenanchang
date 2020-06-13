<template>
	<view class="content activity">
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback">
			<!-- 列表开始 -->
			<view class="listbox">
				<view class="list" v-for="(item,index) in activityList" :key="index" @tap="toDetail(item.activityId)">
					<view class="list-img"><image :src="item.imagePath"></image></view>
					<view class="list-bd">
						<view class="title">{{item.activityTitle}}</view>
						<view class="txt">时间：{{item.activityTime}} </view>
						<view class="txt"><text>联系人： </text><text class="blue">{{item.contactsName}}</text></view>
						<view class="read"><text>浏览量: {{item.pageView}}</text><text>活动类型 {{item.activityChildTypeName}}</text></view>
						<view class="link orange" v-if="item.statusStr ==1">马上报名</view>
						<view class="link" v-else>查看详情</view>
					</view>
				</view>
			</view>	
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var utils = require('@/common/js/util.js');
	var date = new Date();
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				platformTypeId:0,//类型
				mescroll : '',
				activityList:[],
				date:0,
			}
		},
		onLoad(e) {
			this.platformTypeId = e.platformTypeId;
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
				if(this.platformTypeId){
					url = '/memberapi/api/activity/shopList.do';
				}
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
				};
				var that = this;
				this.request.get(url,data,mescroll).then(res=>{
					const newData = res.list;
					newData.forEach(item => {
						if(item.endDate && new Date(item.endDate) > date){
							item.endDateStr = '报名进行中';
							item.statusStr=1;
						}else{
							item.endDateStr = '报名已结束';
							item.statusStr=2;
						}
						
						if(item.imagePath){
							let imagePath = JSON.parse(item.imagePath)[0];
							if(imagePath.filePath_220){
								item.imagePath = that.request.getBaseImagePath() + imagePath.filePath_220;
							}else{
								item.imagePath = that.request.getBaseImagePath() + imagePath.filePath;
							}
						}
					});
					if(res.list.length === 0 || this.mescroll.num === 1)  this.activityList = [];
					this.activityList = this.activityList.concat(newData); //追加新数据
				})
			},
			//明细
			toDetail:function(activityId){
				let statusStr = 0;
				this.activityList.forEach(item => {
					if(item.activityId == activityId)
					statusStr = item.statusStr;
				});
				uni.navigateTo({
					url:"/pages/activity/activityDetail?activityId="+activityId+"&statusStr="+statusStr
				})
			},
			//搜索框
			onNavigationBarSearchInputChanged (input) {
				this.$refs.tableList.keyword = input.text;
				this.downCallBack(this.mescroll);
			},
		}
	}
</script>

<style>
	 
</style>