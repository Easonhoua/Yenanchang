<template>
	<view class="content-white">
		<mescroll-body @down="dowmCallBack" @up="upCallback" @init="initMescroll" top="0">
			<!-- //收藏的店铺list列表 -->
			<shop-flow-cell ref="shopCell" :shopList="shopsList" :isUserFavorite="true"></shop-flow-cell>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import shopFlowCell from "@/components/list-cell-view/shop-flow-cell.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			shopFlowCell
		},
		data() {
			return {
				mescroll:'',
				shopsList:[],
				platformTypeId:1
			}
		},
		methods: {
			initMescroll:function(mescroll){
				this.mescroll = mescroll;
			},
			dowmCallBack: function(mescroll) {
				//console.log("this.request.loginState() = ",this.request.loginState());
				if (!this.request.loginState()) {
					mescroll.endDownScroll();
					mescroll.endUpScroll(false);
					return;
				}
				this.request.getUserInfo(mescroll).then(res => {
					this.userData = res;
					mescroll.resetUpScroll();
				})
			},
			upCallback:function(mescroll){
				if (!this.request.loginState()) {
					mescroll.endDownScroll();
					mescroll.endUpScroll(false);
					return;
				}
				let url = '/memberapi/api/userFavorite/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					favoriteType:"1"//店铺收藏1 线路收藏11
				};
				this.request.post(url, data, mescroll).then(res => {
					this.$refs.shopCell.formattingList(res.list,mescroll.num);
				})
			}
			
			
		}
	}
</script>

<style>
	.top-scroll{
		background-color: #FFFFFF;
	}
</style>
