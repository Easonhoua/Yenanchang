<template>
	<view class="page searchpage">
		<view class="header">
			<view class="back">
				<image class="icon" src="/static/img_new/common/back_black.png" v-on:click.stop="goBack"></image>
			</view>
			<view class="searchbox searchbox2">
				<view class="category">
					<text class="txt" @click="showHideView">{{searchInfo[chooseIdx].name}}</text>
					<image class="arrow" src="/static/img_new/common/arrow_down@3x.png"></image>
					<view v-show="showView" class="sub-category">
						<block v-for="(item,index) in searchInfo" :key="index">
							<view @click="chooseInfo(item.id)" class="item">{{item.name}}</view>
						</block>
					</view>
				</view>
				<input class="input" placeholder="请输入您要搜索的内容" focus="true" placeholder-style="color:#888888" confirm-type="search"
				 v-model="keyword" @confirm="searchShop" />
			</view>
			<view class="btn-search" @click="searchShop">搜索</view>
		</view>
		<view class="search-con">
			<view class="title">推荐搜索</view>
			<view class="labelbox" v-if="popularList">
				<text class="label" v-for="(item,index) in popularList" :key="index" @click="gotoPopularName(item)">{{item.popularName}}</text>
			</view>
		</view>

		<view class="search-con">
			<view class="title">搜索历史</view>
			<view class="labelbox" v-if="historyQueryList">
				<text class="label" v-for="(item,index) in historyQueryList" :key="index" @click="gotoPopularName(item)">{{item.popularName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popularList: [], //热门list
				historyQueryList: [], //历史查询记录
				keyword: '',
				showView: false,
				chooseIdx: 0,
				searchInfo: [{
					"name": "店铺",
					"id": 0
				}, {
					"name": "攻略",
					"id": 1
				},{
					"name": "资讯",
					"id": 2
				}]
			};
		},
		onLoad(e) {
			if(e.chooseIdx){
				this.chooseIdx = e.chooseIdx
			}
			this.queryPopularList(); //banner
			if (uni.getStorageSync("historyQueryList")) {
				this.historyQueryList = JSON.parse(uni.getStorageSync("historyQueryList"));
			}
		},
		methods: {
			goBack: function() {
				uni.navigateBack();
			},
			queryPopularList: function() {
				var url = "/memberapi/api/popular/list.do";
				var data = {}
				this.request.get(url, data).then(res => {
					this.popularList = res.list;
				})
			},
			//
			gotoPopularName: function(item) {
				this.keyword = item.popularName;
				if (this.chooseIdx == 0) {
					uni.navigateTo({
						url: '/pages/search/searchList?keyword=' + this.keyword
					})
				} else if(this.chooseIdx == 1) {
					uni.navigateTo({
						url: '/pages/strategy/strategySearch?keyword=' + this.keyword
					})
				}else{
					uni.navigateTo({
						url: '/pages/newPage/CityAffairs/CityAffairssearch?keyword=' + this.keyword
					})
				}
			},
			searchShop: function(event) {
				let that= this;
				if (uni.getStorageSync("historyQueryList")) {
					this.historyQueryList = JSON.parse(uni.getStorageSync("historyQueryList"));
				}
				if (this.keyword) {
					var messageData = [{
						popularName: this.keyword
					}];
					if (this.historyQueryList) {
						this.historyQueryList = this.historyQueryList.filter((item) =>{
							return item.popularName != that.keyword;
						});
					}
					this.historyQueryList = messageData.concat(this.historyQueryList);
					this.historyQueryList = this.historyQueryList.slice(0, 10);
					uni.setStorageSync("historyQueryList", JSON.stringify(this.historyQueryList));
				}
				if (this.chooseIdx == 0) {
					uni.navigateTo({
						url: '/pages/search/searchList?keyword=' + this.keyword
					})
				} else if(this.chooseIdx == 1) {
					uni.navigateTo({
						url: '/pages/strategy/strategySearch?keyword=' + this.keyword
					})
				}else{
					uni.navigateTo({
						url: '/pages/newPage/CityAffairs/CityAffairssearch?keyword=' + this.keyword
					})
				}
			},
			deleteHistory: function() { //清空记录
				uni.setStorageSync("historyQueryList", "");
				this.historyQueryList = [];
			},
			cancel: function() {
				uni.navigateBack();
			},
			showHideView: function() {
				this.showView = this.showView == false ? true : false;
			},
			
			chooseInfo: function(index) {
				this.chooseIdx = index;
				this.showView = this.showView == false ? true : false;
			}
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "@/common/css/other_new.scss";
</style>
