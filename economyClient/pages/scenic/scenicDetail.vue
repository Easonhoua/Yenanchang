<template>
	<view class="page scenic">
		<swiper-banner :swiperList="shopsData.banners"></swiper-banner>
		<view class="scenic-infor">
			<view class="inner">
				<view class="name">
					<text class="txt">{{shopsData.shopName}}</text>
					<view class="comment">
						<view class="total">{{shopsData.score}}<text class="min">/5分</text></view>
						<view class="number">{{shopsData.commentNum}}条点评<image class="icon" src="/static/img_new/common/right_arrow2.png"></image>
						</view>
					</view>
				</view>
				<view class="addressbox line-bottom">
					<view class="left">
						<view class="address">
							<image class="icon" src="/static/img_new/scenic/s_dw1.png"></image>{{shopsData.address}}
						</view>
						<view class="traffic txt-cut">{{shopsData.transportLine}}</view>
						<!-- <view class="traffic">{{shopsData.transportLine}}</view> -->
					</view>
					<view class="right" @click="gotoMapLocation">
						<view>导航</view>
						<image class="icon" src="/static/img_new/scenic/dh.png"></image>
					</view>
				</view>
				<view class="businesshours line-bottom">
					<view class="time">
						<image class="icon" src="/static/img_new/scenic/s_sj.png"></image>
						<view class="txt">
							<text class="left txt-cut">
								<text v-for="(item,index) in shopsData.itemList" :key="index">
									{{item.shopDayName}} {{item.shopHours1?item.shopHours1:''}} {{item.shopHours2?"-"+item.shopHours2:''}}
									{{item.shopHours3?item.shopHours3:''}}{{item.shopHours4?"-"+item.shopHours4:''}}
								</text>
							</text>
							<text class="right" v-on:click.stop="goShopDetailContent">简介攻略 >></text>
						</view>
					</view>
					<view class="time tip">
						<text class="left txt-cut">游玩约需{{shopsData.scenicPlayTime}}小时</text>
						<view class="right"><image v-if="shopsData.vrLink" style="width: 60rpx;height: 60rpx;" src="/static/img/common/vr.png" @click="goToVr(shopsData.vrLink)"></image></view>
					</view>
				</view>
				<view class="ticketpurchase" v-if="scenicTicketList.length > 0">
					<view class="title">
						<image class="icon" src="/static/img_new/scenic/s_mp.png"></image>
						<text class="txt">购买门票</text>
					</view>
					<view class="ticket" v-for="(item,index) in scenicTicketList" :key="index">
						<view class="name">{{item.ticketName}}</view>
						<view class="reserve">{{item.bookDateTypeName}}</view>
						<view class="refund">官方|{{item.refundTypeName}}</view>
						<view class="refund" v-if="item.refundType ==2">游玩截止前{{item.refundEndDay}}天，未消费可申请退款，收取{{item.serviceCharge}}%手续费</view>
						<view class="price">￥{{item.discountPrice}}起</view>
						<view class="btn" v-on:click.stop="bookTicket(item.shopId,item.ticketId)">立即预定</view>
					</view>
				</view>
			</view>
			<scroll-navi-bar-map class="top-scroll2" :itemList="['点评','攻略','推荐']" @naviItemClick="jumpTarget"></scroll-navi-bar-map>
			<view class="tab-con-box tab-con" id="commentView">

				<view class="commentlist">
					<view class="title">
						<view class="txt">热门点评</view>
						<view class="number"><text class="blue" style="margin-right:15rpx">{{shopsData.score}}分</text><text>{{shopsData.commentNum}}条点评</text></view>
					</view>
					<goodCommentList ref='goodCommentList' goodCommentTitle="评论" :shopId="shopId"></goodCommentList>
				</view>
			</view>
			<view class="tab-con" id="guideView" v-if="guideList.length > 0 ">
				<view class="commentlist popular-strategy">
					<view class="title title-flex">
						<view class="txt">热门攻略<text class="tip">.PK抢占景区封面</text></view>
						<text class="more" v-on:click.stop="toGuideList()">更多>></text>
					</view>
					<view class="slidebox" >
						<view class="imgbox-big" v-on:click.stop="toGuideDetail(guideList[0].guideId)">
							<view class="hot">
								<image class="icon" src="/static/img_new/scenic/huo.png"></image>当前最热
							</view>
							<image class="img" :src="guideList[0].thumbnailPath[0]"></image>
						</view>
						<view class="imgbox" >
							<image v-for="(item, index) in guideList.filter((item,index)=>{return index>0})" :key="index" class="img" :src="item.thumbnailPath[0]" v-on:click.stop="toGuideDetail(item.guideId)"></image>
						</view>
						<!-- <view class="tip" v-on:click.stop="toGuideList()">
									<image class="icon" src="/static/img_new/scenic/left_icon.png"></image>点击查看更多
								</view> -->
					</view>
				</view>
			</view>
			<view class="tab-con" id="shopView">
				<list-delicacy-shop-cell :shopList="scenicShopList" :coordinate="coordinate" shopTitle="商家推荐"></list-delicacy-shop-cell>
			</view>

			<view class="tab-con" style="padding:0;" v-if="nearShopList.length > 0">
				<view class="commentlist periphery">
					<view class="title">
						<view class="txt">周边推荐</view>
					</view>
					<view class="list">
						<view class="item" v-for="(item,index) in nearShopList" :key="index"  @click="toShopDetail(item)">
							<view class="imgbox">
								<image class="img" :src="item.thumbnailPath"></image>
							</view>
							<view class="bottomtxt">
								<view class="name">{{item.shopName}}</view>
								<view class="score"><text>{{item.score}}分</text><text>{{item.standardPrice>0?item.standardPrice:'免费'}}</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import scrollNaviBarMap from "@/components/navi-bar/scroll-navi-bar-map.vue";
	import listDelicacyShopCell from "@/components/list-cell-view/list-delicacy-shop-cell.vue";
	import goodCommentList from "@/components/goodCommentList-component/goodCommentList.vue"
	export default {
		components: { 
			scrollNaviBarMap,
			listDelicacyShopCell,
			goodCommentList
		},
		data() {
			return {
				coordinate:'',
				shopId: '',
				isFavorite: false, //是否可以分享
				shopsData: {}, //店铺信息
				scenicTicketList: [], //门票集合
				platformTypeId: 7, //类型
				guideList: [], //最热攻略集合
				scenicShopList: [], //景区推荐铺
				nearShopList: [], //附近的店铺
			}
		},
		onLoad(option) {
			if (option.shopId) {
				this.coordinate = option.coordinate;
				this.shopId = option.shopId;
				this.shopsData.shopId = option.shopId;
				this.shopsData.coordinate = option.coordinate;
				this.queryScenicDetail(option.shopId); //店铺详情
				this.queryScenicTicket(); //门票集合
				this.queryGuideList(); //最热攻略
				this.queryScenicShopList(); // 景区推荐
				this.queryNearShop(); //附近店铺
			}
		},
		// 导航栏右上角点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.util.shareWithData(this.shopsData.shareData);
			} else if (e.index == 1) {
				this.util.favoriteWithData(this.isFavorite, "1", this.shopId).then(res => {
					this.isFavorite = res;
				})
			}
		},
		onPageScroll(e) {
			// 为了解决滚动到最顶端时，是否收藏按钮颜色失效的问题
			if (e.scrollTop < 10) {
				this.util.setFavorite(this.isFavorite);
			}
		},
		methods: {
			queryScenicDetail: function(shopId) {
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId,
				};
				var that = this;
				that.request.get(url, data).then(res => {
					that.shopsData = this.util.formatShopData(res.data);
					// 是否已经收藏
					that.isFavorite = that.shopsData.canFavorite == 2;
					that.util.setFavorite(that.isFavorite);
				})
			},
			queryScenicTicket: function() {
				let url = '/memberapi/api/ticket/list.do';
				let data = {
					shopId: this.shopsData.shopId,
					platformTypeId: this.platformTypeId,
					pageNo: 1,
				};
				if (this.isNotShowMoreTicket) {
					this.$set(data, 'pageSize', 3);
				} else {
					this.$set(data, 'pageSize', 100);
				}
				var that = this;
				that.request.get(url, data, "N").then(res => {
					if (res.returncode == 0) {
						this.totalRows = res.totalRows;
						that.scenicTicketList = res.list;
						res.list.forEach(item => {
							if (item.thumbnailPath) {
								item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
							}
						});
					}
				})
			},
			//导航
			gotoMapLocation: function(shopsData) {
				this.util.openLocation(this.shopsData.coordinateLng, this.shopsData.coordinateLat, this.shopsData.shopName, this.shopsData
					.address);
			},
			//拨打电话
			toPhone: function(shopsPhone) {
				uni.makePhoneCall({
					phoneNumber: shopsPhone,
					success: () => {
						//console.log("成功拨打电话");
					}
				})
			},
			//订票
			bookTicket: function(shopId, ticketId, bookTime) {
				if (this.request.alreadyLogin()) {
					uni.navigateTo({
						url: "/pages/scenic/fillOrder?shopId=" + shopId + "&ticketId=" + ticketId
					});
				}
			},
			goToVr: function(vrLink) {
				this.util.gotoWebView(vrLink,this.shopsData.shopName);
			},
			// onPageScroll(e) {
			// 	if (e.scrollTop > 50) {
			// 		this.$refs.headbar.headFlag = true;
			// 	} else {
			// 		this.$refs.headbar.headFlag = false;
			// 	}
			// },
			//标签
			jumpTarget: function(item) {
				var views = ['commentView', 'guideView', 'shopView'];
				uni.createSelectorQuery().select(".scenic").boundingClientRect(data => {
					uni.createSelectorQuery().select("#" + views[item.index]).boundingClientRect((res) => {
						uni.pageScrollTo({
							duration: 0,
							scrollTop: res.top - data.top - 88
						})
					}).exec();
				}).exec();
			},
			//攻略集合
			queryGuideList: function() {
				let url = '/memberapi/api/guide/list.do';
				let data = {
					pageNo: 1,
					pageSize: 3,
					shopId: this.shopsData.shopId,
					sortFlag: "pageview-desc"
				};
				this.request.get(url, data, "N").then(res => {
					if (res.returncode == 0) {
						this.guideList = res.list;
						this.guideList.forEach(item => {
							if (item.thumbnailPath) {
								item.thumbnailPath = this.util.formatImagePaths(item.thumbnailPath);
							}
						});

					}
				})
			},
			//景区推荐
			queryScenicShopList: function() {
				let url = '/memberapi/api/shops/queryDelicacyShopList.do';
				let data = {
					pageNo: 1,
					pageSize: 3,
					platformTypeId: 7, //美食店铺
					coordinate: this.shopsData.coordinate,
					distance: "5000",
					sortFlag: "distance-asc"
				};
				this.request.get(url, data, "N").then(res => {
					if (res.returncode == 0) {
						res.list.forEach(item => {
							if (item.thumbnailPath) {
								item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
							}
						});
						this.scenicShopList = res.list;
					}
				})
			},
			//附近
			queryNearShop: function() {
				let url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: 1,
					pageSize: 4,
					platformTypeId: this.shopsData.platformTypeId,
					coordinate: this.shopsData.coordinate,
					sortFlag: "distance-asc"
				};
				let that=this;
				this.request.get(url, data, "N").then(res => {
					if (res.returncode == 0) {
						let list = res.list;
						that.util.formatShopList(list)
						that.nearShopList = list;
					}
				})
			},
			//攻略详情
			toGuideDetail: function(guideId) {
				uni.navigateTo({
					url: "/pages/strategy/strategyDetail?guideId=" + guideId
				})
			},
			//更多攻略
			toGuideList: function() {
				uni.navigateTo({
					url: "/pages/strategy/strategySearch"
				})
			},
			//详情
			goShopDetailContent: function() {
				uni.navigateTo({
					url: "/pages/scenic/scenicDetailContent?shopId=" + this.shopsData.shopId
				})
			},
			//店铺明细
			toShopDetail:function(item){
				this.util.gotoShopDetail(item); 
			}
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	// @import "@/common/css/other_new.scss";
	@import "../../common/css/other_new.scss";
	
	.top-scroll2 {
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		z-index: 20;
		position: -webkit-sticky;
		position: sticky;
		top: calc(var(--status-bar-height) + 68rpx);
		background-color: #FFFFFF;

	}

	.businesshours {
		.time {
			display: flex;

			.txt {
				display: flex;
				flex: 1;

				.left {
					width: 380rpx;
					flex: 1;
				}

				.right {
					font-size: 22rpx;
				}
			}
		}
	}

	page {
		background-color: #eff3f6;
	}

	.page {
		position: relative;
		box-sizing: border-box;
	}

	.scenic {
		.scenic-infor {
			// margin-bottom:-43rpx;
			width: 100%;
			background: none;
			padding: 0;
			position: absolute;
			// top: 560rpx;
			top: 500rpx;
			box-sizing: border-box;

			.inner {
				margin-left: 24rpx;
				margin-right: 24rpx;
				width: auto;
				position: initial;
				margin-bottom: 20rpx;
				box-sizing: border-box;
			}

			.tab {
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: initial;
				top: 0rpx;
				padding: 30rpx 60rpx;
				background: #fff;
			}

			.tab-con {
				position: static;
				background: #FFFFFF;
			}
		}
	}


	.tab-con-box {
		position: relative;
		// top: -90rpx;
		top: -90rpx;
		background: #FFFFFF;
	}

	.title-flex {
		justify-content: space-between;
		display: flex;
		align-items: center;

		.more {
			font-size: 24rpx;
		}
	}

	.scenic .tab-con .popular-strategy .slidebox .imgbox-big .img[data-v-cbda1f7c] {
		width: 100%;
		height: 452rpx;
		border-radius: 5px;
	}

	.scenic .tab-con .popular-strategy .slidebox .imgbox-big .img {
		width: 100%;
		height: 452rpx;
		border-radius: 5px;
	}
	 
</style>
