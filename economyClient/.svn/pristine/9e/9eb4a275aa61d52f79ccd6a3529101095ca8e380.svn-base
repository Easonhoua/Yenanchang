<template>
	<view>
		<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback" top="78">
			<view class="tab-con">
				<view class="module">
					<view class="list play">
						<view class="item" v-for="(item,index) in shopList" :key="index" @click="toShopDetail(item)">
							<view class="imgbox">
								<image class="img" :src="item.thumbnailPath"></image>
							</view>
							<view class="txt">
								<view class="item-title font32 txt-cut">{{item.shopName?item.shopName:'店铺名称'}}</view>
								<view class="bottom-bar">
									<view class="assist-color font24 txt-cut"><image class="dingwei" src="../../static/img_new/common/location_black@3x.png"></image>{{item.address}}</view>
									<view class="assist-color font24"><image class="icon-dz" src="../../static/img_new/common/dz_icon_nor@3x.png"></image><text>{{item.likeNum}}</text></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		props:{
			//查询关键字
			keyword:{
				type:String,
				default:""
			},
		},
		data() {
			return {
				mescroll:'',
				shopList: [], //店铺
			}
		},
		methods:{
			initMescroll:function(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack:function(mescroll){
				mescroll.resetUpScroll();
			},
			upCallback:function(mescroll){
				this.queryShopList(mescroll);
			},
			queryShopList: function(mescroll) {
				let url = '/memberapi/api/shops/shopsAndExtendsList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					keyword:this.keyword,
					essenceType:1,
				};
				let that=this;
				this.request.get(url, data, mescroll).then(res => {
					let shopList = res.list;
					that.util.formatShopList(shopList)
					
					if (mescroll.num == 1) that.shopList = [];
					that.shopList = that.shopList.concat(shopList);
				});
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
	@import "../../common/css/other.scss"; 
</style>
