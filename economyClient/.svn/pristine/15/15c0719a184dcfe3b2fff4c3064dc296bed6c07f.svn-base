<template>
	<view class="page placelist">
		<view class="search-form">
			<view class="inner">
				<image class="search-icon" src="../../static/img_new/common/search.png"></image>
				<input class="input" placeholder="搜索" placeholder-style="color:#B8B4A9" v-model="keyword" @confirm="searchShop"
				 @blur="searchShop" />
			</view>
		</view>
		<!--附件店铺-->
		<near-shop-list ref="nearShopList" :coordinate="coordinate" :subjectId="subjectId" :platformTypeId="platformTypeId"></near-shop-list>
	</view>
</template>

<script>
	import nearShopList from '@/pages/culture/nearShop.vue';
	export default {
		components: {
			nearShopList
		},
		data() {
			return {
				tabIndex: 0,
				keyword: '',
				coordinate: '',
				subjectId: '',
				platformTypeId: ""
			}
		},
		onLoad(e) {
			if (e.coordinate) {
				this.coordinate = e.coordinate;
			}
			if (e.subjectId) {
				this.subjectId = e.subjectId;
			}
			if (e.platformTypeId) {
				this.platformTypeId = e.platformTypeId;
			}
		},
		methods: {
			//tab鼠鼠福福过大年
			searchShop: function(event) {
				this.$refs.nearShopList.mescroll.num = 1;
				this.$refs.nearShopList.keyword = event.detail.value;
				this.$refs.nearShopList.downCallBack(this.$refs.nearShopList.mescroll);
			},
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "../../common/css/other.scss";
</style>
