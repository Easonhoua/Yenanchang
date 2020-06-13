<template>
	<view class="layout">
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback">
			<view>
				
				<view class="consultDetail-top">
					<view class="consultDetail-top-content">
						<view class="consultDetail-title wonder-mulit-limit">{{wonderfulData.title}}</view>
						<view class="consultDetail-base">
							<text class="consult-news font-12 consult-detail">{{wonderfulData.authorName}}</text>
							<text class="consult-date font-10">{{wonderfulData.createTime}}</text>
						</view>
					</view>
				</view>
				<!-- 第一部分结束 -->
				<view class="detail-content">
					<rich-text :nodes="wonderfulData.htmlContent"></rich-text>
					<!-- <view>
						南昌，简称 “洪”或“昌”，古称豫章、洪都，是江西省省会、环鄱阳湖城市群核心城市，江西省的政治、经济、文化、科教和交通中心，国务院批复确定的长江中游地区重要的中心城市 [1]  。截至2018年，全市下辖6个区、3个县，总面积7402平方千米，建成区面积317.3平方千米，常住人口554.55万人，城镇人口411.64万人，城镇化率74.2%。
						<p style=' text-indent: 2em; white-space: pre-wrap;' >南昌地处中国华东地区、江西省中部偏北，赣江、抚河下游，鄱阳湖西南岸，自古就有“粤户闽庭，吴头楚尾”、“襟三江而带五湖”之称，“控蛮荆而引瓯越”之地，是中国唯一一个毗邻长江三角洲、珠江三角洲和海峡西岸经济区的省会中心城市，也是中国华东地区重要的中心城市之一、长江中游城市群中心城市之一。</p>
						<p style=' text-indent: 2em; white-space: pre-wrap;' >南昌是国家历史文化名城，因“昌大南疆、南方昌盛”而得名，初唐四杰王勃在《滕王阁序》中称其为“物华天宝、人杰地灵”之地；南唐时期南昌府称为“南都”；1927年南昌八一起义，在此诞生了中国共产党第一支独立领导的人民军队，是著名的革命英雄城市，被誉为军旗升起的地方； [4]  新中国成立后，南昌制造了新中国第一架飞机、第一批海防导弹、第一辆摩托车、拖拉机，是中国重要的制造中心、新中国航空工业的发源地。</p>
					</view> -->
				</view>
				<!-- 详情结束 -->
				<view class="divid-line"></view>
				
				<commentComponent ref="myComment"  :relationId="wonderfulId" :commentType="5" :commentNum="wonderfulData.commentNum"></commentComponent>
				
				<!--点赞、评论、分享-->
				<comment-navi :relationId="wonderfulId" :goodType="5" :likeNum="wonderfulData.likeNum" :commentNum="wonderfulData.commentNum" :canFavorite="wonderfulData.canFavorite" :canGoodInfo="wonderfulData.canGoodInfo"  @refresComment="refresComment"></comment-navi>
			</view>
		</mescroll-body>	
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import commentComponent from '@/components/commentList-component/commentList-component.vue';
	import commentNavi from "@/components/commentList-component/comment-navi.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			commentComponent,
			commentNavi
		},
		data() {
			return {
				mescroll : '',
				clickIndex:0, //点击列表进来的index
				wonderfulData:{},
				wonderfulId:0,
			}
		},
		onLoad(e){
			if(e.wonderfulId){
				this.wonderfulId = e.wonderfulId;
			}
			if(e.clickIndex){
				this.clickIndex = event.clickIndex;
			}
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.$refs.myComment.commentList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				this.queryInfoDetail(this.wonderfulId);
				this.$refs.myComment.queryCommentData(mescroll,this.wonderfulId ,5);
			},
			queryInfoDetail:function(wonderfulId){
				let url = '/memberapi/api/wonderful/read.do';
				let data = {
					wonderfulId: this.wonderfulId, //精彩记录编号
				};
				var that = this;
				this.request.get(url, data).then(res => {
					if(res.returncode == 0){
						if(res.data.createTime){
							res.data.createTime = res.data.createTime.toString().substring(0,10);
						}
						that.wonderfulData = res.data;
						that.wonderfulData.htmlContent = that.wonderfulData.htmlContent.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"').replace(/\width: (\d*)px/g,'').replace(/\height: (\d*)px/g,'');
					}
				});
			},
			refresComment: function(obj){
				this.wonderfulData.commentNum = obj.commentNum;
				this.wonderfulData.likeNum = obj.likeNum;
				if(obj.canGoodInfo){
					this.wonderfulData.canGoodInfo =obj.canGoodInfo;
				}
				if(obj.canFavorite){
					this.wonderfulData.canFavorite =obj.canFavorite;
				}
				this.downCallBack(this.mescroll);
			},
		}
	}
</script>

<style>
	@import url("../../common/css/app_new.css");
	@import url("../../common/css/app.css");
	
	.consultDetail-top{
		width: 750rpx;
		border-top: 4rpx solid #F2F2F2;
		border-bottom: 4rpx solid #F2F2F2;
	}
	.consultDetail-top-content{
		margin: 30rpx 30rpx 30rpx 30rpx;
	}
	.consultDetail-title{
		width: 693rpx;
		/* height: 100rpx;
		line-height: 150%; */
		font-size: 36rpx;
		color: #4A4A4A;
	}
	.consultDetail-base{
		margin-top: 30rpx;
	}
	.detail-content{
		margin: 30rpx 30rpx 40rpx 30rpx;
		font-size: 32rpx;
		color: #4A4A4A;
		line-height: 50rpx;
	}
	.wonder-mulit-limit{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		max-width: 693rpx;
	}
</style>
