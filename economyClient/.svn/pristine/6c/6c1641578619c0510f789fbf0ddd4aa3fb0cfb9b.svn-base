<!--店铺图片轮播图-->
<template>
	<view v-if="imagePath  && imagePath.length > 0">
		<swiper class="imgbox-card-swiper" :class="dotStyle?'square-dot':'round-dot'" duration="500" @change="cardSwiper"
		 indicator-color="#8799a3" indicator-active-color="#0081ff" current="2">
			<swiper-item v-for="(item,index) in imagePath" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="request.getBaseImagePath() + item.filePath_220" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="arrow"></view>
	</view>
</template>

<script>
	export default {
		props: {
			//附件list
			imagePath:{
				type : Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				cardCur: 2,
				dotStyle: false,
			}
		},
		methods: {
			// cardSwiper
			cardSwiper(e) {
				console.info(e.detail.current + "---" + this.cardCur);
				this.cardCur = e.detail.current
			}, 
						
		}
	}
</script>

<style>
	
</style>
