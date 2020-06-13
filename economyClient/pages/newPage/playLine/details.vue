<template>
	<view class="page line-details">
		<!-- 公用的头部组件 -->
		<!-- <navi-bar class="navi-bar" title="线路详情" :isFavorite="isFavorite" favoriteType="11" :relationId="routeId" :shareData="shareData"></navi-bar> -->
		<mescroll-body @down="downCallBack" @init="initMescroll" :up="upOption">
			<view class="topbanner2"><image class="img" :src="util.formatImagePath(routeData.thumbnailPath)" mode="aspectFill"></image></view>
			<view class="logobox" >
				<view class="inner">
					<image class="logo" src="/static/img/common/logo_big.png"></image>
					<!-- <view class="date">1天</view> -->
				</view>
				
			</view>
			<view class="name" style="width: 750rpx;text-align: center;margin-top: 90rpx;font-weight: bold;font-size: 30rpx;">{{ routeData.creatorName }} </view>
			<view class="article" style="margin-top: 20rpx;">
				<jyf-parser :html="'<style>.img{width:100% !important;} img{width: 100%}</style>'+routeData.routeDetail" @linkpress="golook"></jyf-parser>
			</view>
			<view class="periphery">
				<scroll-view class="near-scroll" scroll-x="true">
					<view class="item" v-for="(item, index) in shopList" :key="index" @click="gotoShopDetail(item)">
						<image class="img" :src="item.thumbnailPath" mode="aspectFill"></image>
						<view class="title">{{ item.shopName }}</view>
					</view>
				</scroll-view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import naviBar from '@/components/navi-bar/navi-bar.vue';
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		naviBar,
		jyfParser
	},
	data() {
		return {
			mescroll: '',
			upOption: {
				use: false //不使用上拉加载更多
			},
			routeId: '',
			routeData: {},
			shopList: [],
			isFavorite: false,
			shareData: {
				url: '分享的链接',
				title: '分享的标题',
				summary: '分享的描述',
				imageUrl: '分享的图片（链接或本地图片）'
			}
		};
	},
	onLoad(option) {
		this.routeId = option.routeId;
		// this.readRouteDetail(this.mescroll);
	},
	// 导航栏右上角点击事件
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			this.util.shareWithData(this.shareData);
		} else if (e.index == 1) {
			this.util.favoriteWithData(this.isFavorite, '11', this.routeId).then(res => {
				this.isFavorite = res;
			});
		}
	},
	onPageScroll(e) {
		// 为了解决滚动到最顶端时，是否收藏按钮颜色失效的问题
		if (e.scrollTop < 10) {
			this.util.setFavorite(this.isFavorite);
		}
	},
	methods: {
		golook(e){
			let url = "";
			var baseurl = this.util.GetRequest(e.href)
			console.log(baseurl)
			if (baseurl.platformTypeId == 1) {
				url = "/pages/delicacies/delicacyDetail?shopId=" + baseurl.shopId 
			} else if (baseurl.platformTypeId == 2) {
				url = "/pages/hotel/hotelDetail?shopId=" + baseurl.shopId 
			} else if (baseurl.platformTypeId == 3) {
				url = "/pages/literature/literaturePlaceDetail?shopId=" + baseurl.shopId 
			} else if (baseurl.platformTypeId == 4) {
				url = "/pages/arder/arderShopDetail?shopId=" + baseurl.shopId 
			} else if (baseurl.platformTypeId == 5) {
				url = "/pages/science/scienceDetail?shopId=" + baseurl.shopId 
			} else if (baseurl.platformTypeId == 6) {
				url = "/pages/sports/sportsDetail?shopId=" + baseurl.shopId 
			} else if (baseurl.platformTypeId == 7) {
				url = "/pages/scenic/scenicDetail?shopId=" + baseurl.shopId 
			} else if (baseurl.platformTypeId == 8) {
				url = "/pages/purchase/purchaseList?shopId=" + baseurl.shopId 
			} else if (baseurl.platformTypeId == 9) {
				url = "/pages/literature/literaturePlaceDetail?shopId=" + baseurl.shopId 
			}
			uni.navigateTo({
				url: url
			});
		},	
		initMescroll: function(mescroll) {
			this.mescroll = mescroll;
		},
		downCallBack: function(mescroll) {
			this.readRouteDetail(mescroll);
		},
		// 读取线路详情数据
		readRouteDetail: function(mescroll) {
			let url = '/memberapi/api/route/read.do';
			let data = {
				routeId: this.routeId
			};
			this.request.get(url, data, mescroll).then(res => {
				this.routeData = res.data;
				this.routeData.routeDetail = this.util.formatRichText(this.routeData.routeDetail);
				// 是否已经收藏
				this.isFavorite = this.routeData.canFavorite == 2;
				this.util.setFavorite(this.isFavorite);
				this.shopList = this.util.formatShopList(res.data.shopsList);
				// 分享的数据
				this.shareData.url = this.util.getPageRuteWithDataString('routeId=' + this.routeId);
				this.shareData.title = this.routeData.routeTitle;
				this.shareData.summary = this.routeData.routeDetail;
				this.shareData.imageUrl = this.util.formatImagePath(this.routeData.thumbnailPath);
			});
		},
		// 返回
		goBack: function() {
			uni.navigateBack({});
		},
		// 进入店铺详情页
		gotoShopDetail: function(item) {
			this.util.gotoShopDetail(item);
		}
	}
};
</script>

<style lang="scss">
/*其他scss */
@import '../../../common/css/other_new.scss';

.navi-bar {
	background-color: #ffffff;
}
.near-scroll {
	overflow: hidden;
	white-space: nowrap;

	.item {
		display: inline-block;
		margin-right: 20rpx;
	}
}
</style>
