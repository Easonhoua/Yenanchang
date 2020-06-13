<template>
	<view class="page culture town">
		<view v-if="searchFlag" class="search-form">
			<view class="inner">
				<image class="search-icon" src="../../static/img_new/common/search.png"></image>
				<input class="input" placeholder="搜索" placeholder-style="color:#B8B4A9" @click="toSearch"/>
			</view>
		</view>
		<view class="index-slidebox" style="height:650rpx;">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" style="height:650rpx;">
				<swiper-item v-for="(item,index) in subjectList" :key="index" @click="gotoPlayMap(item.subjectId)">
					<image :src="item.thumbnailPath" mode="aspectFill" style="height:650rpx;"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图结束 -->
		<view class="module">
			<view class="title">南昌地图<!-- <text class="more">more</text> --></view>
				<view class="main nearby map" v-for="(item,index) in subjectList" :key="index"  >
					<view class="left-imgbox" @click="gotoPlayMap(item.subjectId)">
						<text class="title txt-cut">{{item.subjectName}}地图</text>
						<view>
							<image class="img" :src="item.thumbnailPath" mode="aspectFill"></image>
						</view>
					</view>
					<view class="right-imgbox">
						<view class="imgbox bt20" v-for="(shop,i) in item.shopsList" :key="i" @click="toDetail(shop)">
							<view class="addressbox">
								<view class="item-title font28 txt-cut">{{shop.shopName}}</view>
								<view class="bottom-bar">
									<view class="font24 address txt-cut">
										<image class="location-icon" src="../../static/img_new/common/location@3x.png"></image>
										<text>{{shop.address}}</text>
									</view>
								</view>
							</view>
							<image class="img" :src="shop.thumbnailPath"></image>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '../../static/img_new/main/map_banner@3x.png',
				}, {
					id: 1,
					type: 'image',
					url: '../../static/img_new/main/map_banner@3x.png',
				}, {
					id: 2,
					type: 'image',
					url: '../../static/img_new/main/map_banner@3x.png'
				}, {
					id: 3,
					type: 'image',
					url: '../../static/img_new/main/map_banner@3x.png'
				}, {
					id: 4,
					type: 'image',
					url: '../../static/img_new/main/map_banner@3x.png'
				}, {
					id: 5,
					type: 'image',
					url: '../../static/img_new/main/map_banner@3x.png'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				subjectList:[],
				searchFlag:false
			};
		},
		onLoad() {
			this.TowerSwiper('swiperList');
			this.querySubject();
		},
		onPageScroll(e){
			if(e.scrollTop > 10){
				this.searchFlag = true;
			}else{
				this.searchFlag = false;
			}
		},
		methods: {
			//查询订单详情信息
			querySubject:function(){
				let url = '/memberapi/api/platform/querySubject.do';
				var that = this;
				that.request.get(url, null).then(res => {
					if(res.returncode == 0){
						var list = res.list;
						list.forEach(item => {
							if(item.thumbnailPath){
								item.thumbnailPath = that.util.formatImagePath(item.thumbnailPath);
							}
							item.shopsList.forEach(shop =>{
								if(shop.thumbnailPath){
									shop.thumbnailPath = that.util.formatImagePath(shop.thumbnailPath);
								}else{
									shop.thumbnailPath = that.util.formatImagePath(shop.logo);
								}
							});
						});
						that.subjectList = list;
					}
				})
			},
			//主题地图
			gotoPlayMap: function(subjectId) {
				uni.navigateTo({
					url: "/pages/town/subjectMap?subjectId="+subjectId
				})
			},
			toDetail(shop){
				this.util.gotoShopDetail(shop);
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
	
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
	
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
	
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			toSearch:function(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			}
		}
	}
	
</script>

<style lang="scss">
	.uni-swiper-slide-frame image{
		height:650rpx;
	}
	.card-swiper uni-swiper-item {
	    padding: 20px 0px 20px 0;
	}
	/*其他scss */
	@import "../../common/css/other.scss"; 
	
	.top-scroll {
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		z-index: 2;
		position: -webkit-sticky;
		position: sticky;
		top: calc(var(--status-bar-height) + 88rpx);
		background-color: #F5F5F5;
		
	}
	
</style>
