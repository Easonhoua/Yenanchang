<template>
	<view class="page">
		<view class="tabbox" v-if="categorieList.length > 0">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft" style="padding-right:30rpx;padding-left:30rpx;z-index: 999;">
			<view class="tab">
				<view class="item" :class="item.categoryId == selectCategoryId?'active':''" v-for="(item,index) in categorieList" :key="index" @tap="selectCategory(item.categoryId)"><text>{{item.categoryName}}</text><text class="bt-line"></text></view>
			</view>
			</scroll-view>
			<!-- <view class="classify" @tap="toClassify()">分类</view> -->
		</view>
		<product-screen-component @screenLike="screenLike" ref="myScreen"></product-screen-component>
		<view class="tab-con">
			<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback" top="190">
				<view class="item" v-for="(item,index) in productList" :key="index" @tap="toDetail(item.productId)">
					<view class="inner">
						<view class="imgbox"><image class="img" :src="item.imagePaths"></image></view>
						<view class="name">{{item.productName}}</view>
						<view class="price"><text>￥{{item.minSalePrice}}</text><text class="noprice">￥{{item.marketPrice}}</text></view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import productScreenComponent from '@/components/screen-component/product-screen-component.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			productScreenComponent
		},
		data() {
			return {
				mescroll : '',
				keyword:'',
				selectCategoryId:'',
				productList:[],
				categorieList:[],
				searchData:{}
			}
		},
		onLoad() {
			this.getCategorieList();
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.productList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取项目信息列表
				const url = '/memberapi/api/products/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					keyword: this.keyword,
					categoryId:this.selectCategoryId,
				};
				let sendDate =Object.assign({}, this.searchData, data);
				var that = this;
				this.request.get(url,sendDate,mescroll).then(res=>{
					let currListData = res.list;
					currListData.forEach(item => {
						if(item.imagePaths){
							item.imagePaths = this.util.formatImagePaths(item.imagePaths)[0];
						}
					});
					this.productList = this.productList.concat(currListData); //追加新数据
				})
			},
			onNavigationBarSearchInputChanged (input) {
				//console.log(input);
				this.keyword = input.text;
				this.downCallBack(this.mescroll);
			},
			getCategorieList: function() {
				//查询优惠菜品
				const url = '/memberapi/api/productCategories/categorieList.do';
				let sendDate = {
				};
				this.request.get(url, sendDate).then(res => {
					let currListData = res.list;
					this.categorieList = currListData;
				});
			},
			selectCategory:function(categoryId){
				this.selectCategoryId = categoryId;
				this.downCallBack(this.mescroll);
			},
			toClassify:function(){
				uni.navigateTo({
					url:'classify'
				})
			},
			toDetail(productId){
				uni.navigateTo({
					url:'detail?productId='+productId
				})
			},
			screenLike(searchData){
				this.searchData= searchData;
				this.downCallBack(this.mescroll);
			}
		}
	}
</script>

<style>
	@import "../../common/css/mall.css";
	.scroll-view_H{
		width:560rpx;
	}
	.nav{
	    width: 100%;
	    background: #fff;
	    padding:0;
	    position:relative;
	    top: 0;
	    left: 0;
	    z-index: 2;
	}
	.tabbox{
		border-bottom: none;
		position: relative;
	}
	.tabbox:after{
		    content: " ";
		    position: absolute;
		    left: 0;
		    bottom: 0;
		    right: 0;
		    height: 1px;
		    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		    color: rgba(0, 0, 0, 0.1);
		    -webkit-transform-origin: 0 0;
		    -ms-transform-origin: 0 0;
		    transform-origin: 0 0;
		    -webkit-transform: scaleY(0.5);
		    -ms-transform: scaleY(0.5);
		    transform: scaleY(0.5);
		    z-index:9999;
	}
</style>
