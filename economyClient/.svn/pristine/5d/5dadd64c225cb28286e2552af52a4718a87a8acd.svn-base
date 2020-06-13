<template>
	<view class="layout yhcdetails">
		<!--  -->
		<navi-bar :isFavorite="false" :relationId="shopsData.shopId" backgroundColor="#69779A"></navi-bar>
		
		<!--店铺店基本信息-->
		<view class="details-top-yhc gray">
			<view class="clearfix inner">
				<image class="top-img" :src="shopsData.thumbnailPath">
					<view class="top-slider-place">
						<view class="name">{{shopsData.shopName}}</view>
						<view class="score">
							<uni-rate :value="shopsData.scoreLevel" disabled="true" size="13" style="margin-top: 18rpx;"></uni-rate>
							<text class="number">{{shopsData.score}}分（{{shopsData.commentNum}}+人评）</text>
							<text class="number">¥{{shopsData.discountPrice}}/人</text>
						</view>
						<image @tap="goToVr" class="vr-detail" src="/static/img/common/vr.png"></image>
						<text class="time" v-if="shopsData.shopHours1">营业时间：{{shopsData.shopHours1}} {{shopsData.shopHours2}} {{shopsData.shopHours3}}</text>
						<text class="address">{{shopsData.address}}</text>
						<image class="location" src="../../static/img/sports/location.png" @tap="gotoMapLocation(shopsData)"></image>
					</view>
			</view>
		</view>
		
		<view class="details-con">
			<!-- <view class="movie-tab">
				<view class="item active"><text class="txt">优惠</text><text class="line"></text></view>
				<view class="item">演出详情</view>
				<view class="item">购票须知</view>
			</view> -->
			<view class="movie-con">
				<!--优惠券-->
				<!-- <view class="card-bd discount">
					<text class="name">100 元优惠券</text>
					<text class="tip">周一至周日11:00-22:30 不限张数</text>
					<text class="price">￥90</text>
					<button class="btn dis-btn2">抢购</button>
				</view> -->
				<!--优惠套餐-->
				<view class="card-bd column">
					<text class="title">优惠套餐</text>
					<block class="list-item" v-for="(item,index) in arderList" :key="index">
						<view class="ct-list">
							<image class="img" :src="item.thumbnailPath"></image>
							<view class="righttxt">
								<view class="name">{{item.packagesName}}</view>
								<!-- <view class="font24">唱歌</view> -->
								<view class="font20">{{item.introduction}}</view>
								<view class="price">￥{{item.packagesPrice}}</view>
								<button class="btn dis-btn2">抢购</button>
							</view>
						</view>
					</block>
				</view>
				
				<!--包厢图片 暂时不做-->
				<!-- <view class="card-bd column">
					<text class="title">包厢</text>
					<view class="bx-list">
						<view class="imgbox">
							<image class="big-img" src="../../static/img/details/d_pic_max.png">
								<view class="title">豪华包厢</view>
						</view>
						<scroll-view id="tab-bar" class="scroll-h " :scroll-x="true" :show-scrollbar="true">
							<view class="imgboxs">
								<view class="item">
									<image class="min-img" src="../../static/img/details/d_pic_min2.png"></image><text class="font-12">大厅</text>
								</view>
								<view class="item">
									<image class="min-img" src="../../static/img/details/d_pic_min2.png"></image><text class="font-12">大厅</text>
								</view>
								<view class="item">
									<image class="min-img" src="../../static/img/details/d_pic_min2.png"></image><text class="font-12">大厅</text>
								</view>
								<view class="item">
									<image class="min-img" src="../../static/img/details/d_pic_min2.png"></image><text class="font-12">大厅</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view> -->
				<!--评价-->
				<goodCommentList-component ref='goodCommentList' goodCommentTitle="评论" :shopId="shopsData.shopId"></goodCommentList-component>
				<!--周边-->
				<peripheryList-component ref='goodCommentList' peripheryTitle="附近吃喝玩乐" :coordinate="shopsData.coordinate" distance="500"></peripheryList-component> 
				 
			</view>
		</view>
	</view>
</template>
<script>
	import goodCommentListComponent from "@/components/goodCommentList-component/goodCommentList-component.vue"
	import peripheryListComponent from "@/components/peripheryList-component/peripheryList-component.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	import naviBar from "@/components/navi-bar/navi-bar.vue"
	export default {
		components: {
			uniRate,
			naviBar,
			goodCommentListComponent,
			peripheryListComponent
		},
		data() {
			return {
				shopsData: {},
				arderList: [], //套餐list
			}
		},
		onLoad(e) {
			if (e.shopId) {
				e.shopId = Number(e.shopId);
				this.shopsData.shopId = e.shopId;
				this.shopsData.coordinate = e.coordinate;
				this.queryDetail(e.shopId);
			}
		},
		methods: {
			queryDetail: function(shopId) {
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId, //标签
				};
				var that = this;
				this.request.get(url, data).then(res => {
					that.shopsData = res.data;
					if(that.shopsData.thumbnailPath){
						var upload =  JSON.parse(that.shopsData.thumbnailPath);
						that.shopsData.thumbnailPath = that.request.getBaseImagePath() + upload.filePath_220;
					}
					
					that.shopsData.shopHours1 =that.shopsData.shopHours1?that.shopsData.shopHours1:"";
					that.shopsData.shopHours2 =that.shopsData.shopHours2?that.shopsData.shopHours2:"";
					that.shopsData.shopHours3 =that.shopsData.shopHours3?that.shopsData.shopHours3:"";
				})
				this.queryArderList(shopId);
			},
			queryArderList: function(shopId) {
				let data = {
					pageNo: 1,
					pageSize: 100,
					shopId: shopId,
				};
				let url = '/memberapi/api/arderPackages/list.do';
				var that = this;
				this.request.get(url, data).then(res => {
					const newData = res.list;
					newData.forEach(item => {
						if (item.thumbnailPath) {
							let thumbnailPath = JSON.parse(item.thumbnailPath);
							item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath_220;
						}
					});
					this.arderList = [];
					this.arderList = this.arderList.concat(newData); //追加新数据
				})
			},
			gotoMapLocation: function(shopsData) {
				this.util.openLocation(shopsData.coordinateLng,shopsData.coordinateLat,shopsData.shopName,shopsData.address);
			},
			goToVr() {
				uni.navigateTo({
					url: '../webView/webView?webUrl=https://vr.chinavryan.com/vr/7ac27e8ce057ec1a' + '&webTitle='
				});
			},
			//添加收藏
			saveUserFavorite: function() {
				//TODO 添加收藏需要登陆
				let data = {
					shopId: shopId,
				};
				let url = '/memberapi/api/userFavorite/add.do';
				var that = this;
				this.request.post(url, data).then(res => {
					that.request.toastTips("添加收藏成功");
				})
			},
			//返回
			back:function(){
				uni.navigateBack();
			},
			//分享
			shareButtonClick() {
				//TODO 分享的相关的路径及显示的logo图
				this.updateShareNum(); //添加分享记录
				var urlBase = this.$api.getBaseUrl();
				var userName = this.$api.getUser().mobilePhone;
				var userId = this.$api.getUser().userId;
			
				var url = ""; // urlBase+'account/html/invitation.html?userName='+userName+'&invitationUserId='+userId;
			
				var title = userName + '给您推荐公装管理好工具';
				var summary = '轻松开启施工企业/团队协同办公新模式！';
				// var imgurl = "http://jk-gzb.oss-cn-shenzhen.aliyuncs.com/test/user/33b9da96376c4eaebac379a66a0060ab.jpg";
				var imgUrl = '/static/img/login/share.png';
				//console.info("url:"+imgUrl);
				////console.log("imgurl=====11111111",imgUrl);
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: url,
					title: title,
					summary: summary,
					imageUrl: imgUrl,
					success: function(res) {
						////console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						////console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			//添加分享记录
			updateShareNum() {
				//let url = "admin/api/shareRecord/updateShareNum.do";
				//this.Request.post(url).then(res => {
				//console.info('11111111111111111');
				//})
			},
		}
	}
</script>

<style>

</style>
