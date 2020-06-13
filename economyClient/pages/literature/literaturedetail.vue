<template>
	<view class="layout movie">
		<view class="top-slider">
			<view class="imgbox">
				<swiper class="imgbox-card-swiper" :class="dotStyle?'square-dot':'round-dot'" 
				 duration="500" @change="cardSwiper" indicator-color="#8799a3"
				 indicator-active-color="#0081ff">
					<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item">
							<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="arrow"></view>
			</view>
			<view class="top-slider-place">
				<text class="name">泰坦尼克号</text>
				<view class="time"><label class="label">35分钟</label>|<label class="label">爱情</label>|<label class="label">杰克，露丝</label></view>
				<text class="address">洪都北大道489号洪都北大道489号</text>
				<image  @tap="goToVr" class="vr-detail" src="/static/img/common/vr.png"></image>
				<image class="location" src="../../static/img/sports/location.png" @click="gotoMapLocation"></image>
			</view>
		</view>
		
		<view class="literature-sign">
			<view class="item active">今日10月27日<text class="line"></text></view>
			<view class="item">明日10月28日</view>
		</view>
		
		<view class="literature-bottom">
			<view class="literature-bottom-one">
				<view class="font-18">17:20</view>
				<view class="font-12" style="color: #AEAEAE;">19:25散场</view>
			</view>
			<view class="literature-bottom-two">
				<view class="font-14">国语巨幕2D</view>
				<view class="font-12" style="color: #AEAEAE;text-align: center;">5号厅</view>
			</view>
			<view class="literature-bottom-three">￥49.9</view>
			<view class="literature-bottom-four">购票</view>
		</view>
		<view class="literature-bottom">
			<view class="literature-bottom-one">
				<view class="font-18">17:20</view>
				<view class="font-12" style="color: #AEAEAE;">19:25散场</view>
			</view>
			<view class="literature-bottom-two">
				<view class="font-14">国语巨幕2D</view>
				<view class="font-12" style="color: #AEAEAE;text-align: center;">5号厅</view>
			</view>
			<view class="literature-bottom-three">￥49.9</view>
			<view class="literature-bottom-four">购票</view>
		</view>
		<view class="literature-bottom">
			<view class="literature-bottom-one">
				<view class="font-18">17:20</view>
				<view class="font-12" style="color: #AEAEAE;">19:25散场</view>
			</view>
			<view class="literature-bottom-two">
				<view class="font-14">国语巨幕2D</view>
				<view class="font-12" style="color: #AEAEAE;text-align: center;">5号厅</view>
			</view>
			<view class="literature-bottom-three">￥49.9</view>
			<view class="literature-bottom-four">购票</view>
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
					url: '/static/img/literature/1.png'
				}, {
					id: 1,
					type: 'image',
					url: '/static/img/literature/2.png',
				}, {
					id: 2,
					type: 'image',
					url: '/static/img/literature/3.png'
				}, {
					id: 3,
					type: 'image',
					url: '/static/img/literature/4.png'
				}, {
					id: 4,
					type: 'image',
					url: '/static/img/literature/5.png'
				}, {
					id: 5,
					type: 'image',
					url: '/static/img/literature/1.png'
				}, {
					id: 6,
					type: 'image',
					url: '/static/img/literature/2.png'
				}],
				dotStyle: false,
			}
		},
		methods: {
			// cardSwiper
			cardSwiper(e) {
				console.info(e.detail.current+"---"+this.cardCur);
				this.cardCur = e.detail.current
			}, 
			gotoMapLocation:function(){
				this.util.navigateToLocation(115.867611,28.692882,"万达影城");
			},
			goToVr(){
				uni.navigateTo({
					url:'../webView/webView?webUrl=https://vr.chinavryan.com/vr/28348e033e4da577'+'&webTitle='
				});
			}
		}
	}
</script>

<style>
	@import url("../../common/css/list_two.css");
</style>
