<template>
	<view class="page play strategy strategysearch">
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback">
			<!-- 头部banner -->
			<view class="top-banner">
				<image class="img" src="/static/img_new/play/y_subbanner1@3x.png"></image>
			</view>
			<view class="searchbox">
				<view class="inner">
					<image class="icon" src="/static/img_new/common/search2.png"></image>
					<input class="input" v-model="keyword" @confirm="search()" placeholder="搜索" placeholder-style="color:#b1b1b1;" />
				</view>
			</view>
			<view class="tab">
				<!-- <view class="item">
					<picker @change="pickerChange" :value="index" range-key="label" :range="areaDataList">
						<view class="picker">
							{{index>-1?areaDataList[index].label:''}}
						</view>
					</picker>
					<image class="arrow-down" src="/static/img_new/common/arrow_down@3x.png"></image>
				</view> -->
				<template v-if="isHome">
					<view class="item" :class="searchIndex == 0?'active':''" @click="chooseSortOrder(0)">推荐</view>
					<view class="item" :class="searchIndex == 3?'active':''" @click="chooseSortOrder(3)">美食</view>
					<view class="item" :class="searchIndex == 1?'active':''" @click="chooseSortOrder(1)">旅行</view>
					<view class="item" :class="searchIndex == 4?'active':''" @click="chooseSortOrder(4)">潮购</view>
				</template>
				<template v-else>
					<view class="item" :class="searchIndex == 1?'active':''" @click="chooseSortOrder(1)">最热</view>
					<view class="item" :class="searchIndex == 2?'active':''" @click="chooseSortOrder(2)">最新</view>
				</template>
			</view>

			<view class="tab-con">
				<view class="column">
					<view class=" masonry">
						<view class="item" v-for="(item,index) in strategyList" :key="index" @click="toStrategyDetail(item.guideId)">
							<view class="item_content content-lar">
								<view class="imgbox">
									<view class="address" v-if="item.shopNames">
										<image class="icon" src="/static/img_new/common/dingwei2.png"></image>{{item.shopNames}}
									</view>
									<image class="img" v-if="item.thumbnailPath && item.thumbnailPath.length > 0 " :src="item.thumbnailPath[0]"
									 mode="widthFix"></image>
								</view>
								<view class="txt">
									<view class="item-title font28 txt-cut">
										<image class="icon" src="/static/img_new/play/y_huati@3x.png"></image>
										<text class="fontcolor-blue">{{item.guideTitle}}</text>
									</view>
									<view class="title-con txt-cut-two">{{item.guideIntroduction}}</view>
									<view class="bottom-bar">
										<view class="userbox font24">
											<view class="userimg">
												<image class="img" :src="item.photo"></image>
											</view>
											<text class="name txt-cut">{{item.userName}}</text>
										</view>
										<view class="font24">
											<image class="icon-dz" src="/static/img_new/common/dianzan@3x.png"></image><text>{{item.likeNum}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</mescroll-body>
		<view class="publishbtn" @click="toPublishStrategy()" v-if="guideType!=''">
			<image class="img" :src="util.getUserHeaderImage()" mode="aspectFit"></image>
			<text>发布攻略</text>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import areaData from '../../components/mpvue-citypicker/city-data/area.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				mescroll: '',
				guideType: '',
				userType: '',
				strategyList: [],
				searchIndex: 0,
				sortFlag: 'likeNum-desc',
				district: '',
				keyword: '',
				shopId: '',
				isHome: false
			}
		},
		onLoad(e) {
			var pages = getCurrentPages(); // 当前页面
			var beforePage = pages[pages.length - 2]; // 前一个页面
			if(beforePage.route == "pages/newPage/newcultrue/newcultrue"){
				this.isHome = true
				this.guideType = 0
				this.searchIndex = 0
			}else{
				this.isHome = false
				this.searchIndex = 1
			}
		
			if (e.guideType) {
				this.guideType = e.guideType;
			}
			if (e.userType) {
				this.userType = e.userType;
			}
			if(e.keyword){
				this.keyword=e.keyword;
			}
			if (e.shopId) {
				this.shopId = e.shopId;
			}
			const app = getApp();
		},
		methods: {
			
			chooseSortOrder(index) {
				this.searchIndex = index;
				
				if (this.searchIndex == 1) {
					this.sortFlag = 'pageview-desc';
				} else {
					this.sortFlag = 'createTime-desc';
				}
				this.downCallBack(this.mescroll);
			},
			search() {
				this.downCallBack(this.mescroll);
			},
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				this.strategyList = [];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				//获取项目信息列表
				const url = '/memberapi/api/guide/list.do';
				let guidetype = this.guideType == 0?'':this.guideType
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					guideType: guidetype,
					userType: this.userType,
					sortFlag: this.sortFlag,
					keyword: this.keyword,
					shopId: this.shopId
				};
				var that = this;
				this.request.get(url, data, mescroll).then(res => {
					var currListData = res.list;
					currListData.forEach(item => {
						if (item.thumbnailPath) {
							item.thumbnailPath = this.util.formatImagePaths(item.thumbnailPath);
						}
						item.photo = this.util.formatUserImage(item.photo);
						if (item.guideDetail) {
							item.guideDetail = item.guideDetail.replace(/<\/?.+?>/g, "");
							item.guideDetail = item.guideDetail.replace(/&nbsp;/ig, '');
						}
					});

					this.strategyList = this.strategyList.concat(currListData); //追加新数据
				})
			},
			toStrategyDetail(guideId) {
				uni.navigateTo({
					url: "/pages/strategy/strategyDetail?guideId=" + guideId
				})
			},
			toPublishStrategy() {
				uni.navigateTo({
					url: "/pages/strategy/strategyPublish?guideType=" + this.guideType
				})
			},
			// 返回
			goBack: function() {
				uni.navigateBack({})
			},
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "../../common/css/other_new.scss";
</style>
