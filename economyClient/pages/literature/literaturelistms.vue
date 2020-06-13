<template>
	<view class="layout letime">
		<screenComponent platformTypeId="3" @screenLike="screenLike" ref="myScreen"></screenComponent>
		<view class="contain">
			<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback" top="130">
				<view class="ht-card card" v-for="(item,index) in programList" :key="index">
					<view class="card-bd">
						<view class="ct-list" @tap="toProgramDetail(item.programId)">
							<image class="img" :src="item.thumbnailPath?item.thumbnailPath:'/static/img/literature/dfe08ee7584e83a1be7bb2a5fc631ff.png'"></image>
							<view class="righttxt">
								<view class="name line-limit-length">{{item.programName?item.programName:'暂无节目名称'}}</view>
								<view class="locale font24" v-if="item.openingTimeType == 1"><text>{{item.openingTimeStart?item.openingTimeStart:'待定'}}</text></view>
								<view class="locale font24" v-else><text>{{item.openingTimeStart?item.openingTimeStart:'待定'}}</text><text>-</text><text>{{item.openingTimeEnd?item.openingTimeEnd:'待定'}}</text></view>
								<view class="locale font24 line-limit-length"><text>{{item.address}}</text></view>
								<view class="coupon coupon2">
									<view class="list-buttom"><text class="yd">{{item.isFree == 1 ? '免费' : '¥'+item.price}}</text><!-- <label class="mark blue" style="margin-left: 290rpx;">售票中</label> --></view>
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
	import screenComponent from '@/components/screen-component/screen-component.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			screenComponent
		},
		data() {
			return{
				shopId:'',
				programList:[],
				searchData:{}
			}
		},
		onload(option){
			if(option.shopId){
				this.shopId = option.shopId;
			}
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.programList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取项目信息列表
				const url = '/memberapi/api/program/list.do';
				const data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					shopId: this.shopId,
				};
				let sendDate =Object.assign({}, this.searchData, data);
				var that = this;
				this.request.get(url,sendDate,mescroll).then(res=>{
					const currListData = res.list;
					currListData.forEach(item => {
						if(item.thumbnailPath){
							let thumbnailPath = JSON.parse(item.thumbnailPath);
							item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath_220;
						}
					});
					this.programList = this.programList.concat(currListData); //追加新数据
				})
			},
			screenLike(searchData){
				this.searchData= searchData;
				//console.log("this.searchData: " + JSON.stringify(this.searchData));
				this.downCallBack(this.mescroll);
			},
			toProgramDetail:function(programId){
				uni.navigateTo({
					url:'literatureview?programId='+programId
				})
			}
		}
	}
</script>

<style>
	.list-buttom{
		margin-top: -18rpx;
	}
</style>
