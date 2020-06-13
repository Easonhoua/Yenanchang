<template>
	<view class="ranking fooddetails">
		<view class="header" style="z-index: 5;">
			<view class="back">
				<image class="icon" src="../../static/img/common/fanhui@3x.png"></image>
			</view>
			<view class="title"></view>
			<view class="iconbar">
				<image class="icon" src="../../static/img/common/shoucang@3x.png"></image>
				<image class="icon" src="../../static/img/common/zhuanfa@3x.png"></image>
			</view>
		</view>
		<view class="banner" style="z-index: 4;">
			<image class="img" src="../../static/img/index2/top_banner.png"></image>
			<view class="masking"></view><!-- 图层蒙版 -->
			<view class="txt">
				<view class="classification">美食排行榜</view>
				<view class="tip">按过去30天店铺综合流量排序·每天9:00更新</view>
			</view>
		</view>
		
		<view class="filterbox">
			<screenComponent platformTypeId="1" @screenLike="screenLike" ref="myScreen"></screenComponent>
		</view>
	</view>
</template>

<script>
	import screenComponent from '@/components/screen-component/screen-component.vue';
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	var _self;
	export default {
		components: {
			uniRate,
			screenComponent
		},
		data() {
			return {
					mescroll : '',
					keyword:'',
					platformTypeId:1,
					searchData:{},
					dellicaciesList:[],
					longtitude:'',
					latitude:'',
				}
		},
		onLoad() {
		},
		mounted() {
			this.$refs.myScreen.getTypeLabel();
		},
		onShow() {
			_self = this;
			uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
					_self.longtitude = res.longitude;
					_self.latitude = res.latitude;
			    }
			});
		},
		methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.dellicaciesList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取项目信息列表
				const url = '/memberapi/api/shops/queryDelicacyShopList.do';
				let coordinate='';
				if(this.longtitude && this.latitude){
					coordinate = this.longtitude+","+this.latitude;
				}
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					keyword: this.keyword,
					coordinate:coordinate,
					platformTypeId:this.platformTypeId,
				};
				let sendDate =Object.assign({}, this.searchData, data);
				var that = this;
				this.request.get(url,sendDate,mescroll).then(res=>{
					let currListData = res.list;
					that.util.formatShopList(currListData);
					that.dellicaciesList = that.dellicaciesList.concat(currListData); //追加新数据
				})
			},
			screenLike(searchData){
				this.searchData= searchData;
				//console.log("this.searchData: " + JSON.stringify(this.searchData));
				this.downCallBack(this.mescroll);
			},
			back() {
				uni.navigateBack();
			},
			 
		}
	}
</script>

<style>
	.top_kbox[data-v-593abe9e] {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    -ms-flex-pack: justify;
	    justify-content: space-between;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    background-color: #FFFFFF;
	    padding: 8px 10%;
	    position: fixed;
	    top: 100rpx;
	    width: 100%;
	    z-index: 99;
	}
</style>
