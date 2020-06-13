<template>
	<view class="page">
		<view class="classifybox" style="margin-top: 0rpx;">
			<view class="left" style="z-index: 99999;">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
					<view v-for="(item,index) in platformTradeFloorList" :key="index">
						<view :class="index === floorSelectIndex?'item active':'item'" @tap="changeFloorValue(index,item.floorId)">{{item.floorName}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="right" style="height: 100vh;">
				 <scroll-view class="activity-scrollview" :scroll-x="true" :scroll-left="partitionId">
					 <view class="activity-item" v-for="(item,index) in platformTradePartitionList" :key="index" @tap="changePartiValue(index,item.partitionId)">
						 <text :class="index === partitionSelectIndex?'label active':'label'" >{{item.partitionName}}</text>
					 </view>
				 </scroll-view>
				<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback" top="120">
					<view v-for="(item,index) in shopList" :key="index" style="margin-left: 200rpx;">
						<view class="right-cell" @tap="toShopDetail(item)">
							<view class="inner">
								<view class="logo"><image :src="item.thumbnailPath"></image></view>
								<view class="inner-bd">
									<view class="name shop-limit-length">{{item.shopName?item.shopName:'--'}}</view>
									<view class="mark">暂无描述信息</view>
								</view>
							</view>
						</view>
					</view>
				</mescroll-body>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	    data() {
	        return {
				mescroll : '',
	            scrollTop: 0,
	            old: {
	                scrollTop: 0
	            },
				keyword:'',
				floorId:'',
				partitionId:'',
				tradeId:1,
				defaultTradeFloorData:{
					floorId:0,
					floorName:"全部"
				},
				defaultTradePartitionData:{
					partitionId:0,
					partitionName:"全部"
				},
				platformTradeFloorList:[],
				platformTradePartitionList:[],
				shopList:[],
				floorSelectIndex:0,
				partitionSelectIndex:0,
	        }
	    },
		onLoad(option){
			if(option.tradeId){
				this.tradeId = option.tradeId;
				this.queryFloorInfo(this.partitionId);
				/* this.queryShopInfo(); */
			}
		},
		onNavigationBarSearchInputConfirmed (input) {
		    //console.log(input);
		    this.keyword = input.text;
		    this.queryShopInfo(this.mescroll);
		},
	    methods: {
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.shopList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				this.queryShopInfo(mescroll);
			},
	        upper: function(e) {
	            //console.log("-------------",e);
	        },
	        lower: function(e) {
	            //console.log(e);
	        },
	        scroll: function(e) {
	            //console.log(e);
	            this.old.scrollTop = e.detail.scrollTop;
	        },
	        goTop: function(e) {
	            this.scrollTop = this.old.scrollTop;
	            this.$nextTick(function() {
	                this.scrollTop = 0;
	            });
	        },
			queryFloorInfo:function(partitionId){
				this.platformTradePartitionList = [];
				this.platformTradePartitionList = this.platformTradePartitionList.concat(this.defaultTradePartitionData);
				const url = '/memberapi/api/platform/getFloorsAndPartitionsByTrade.do';
				let data = {
					tradeId:this.tradeId
				};
				var that = this;
				this.request.get(url,data).then(res=>{
					if(res.returncode == 0){
						if(partitionId>0){
							res.data.platformTradePartitionList.forEach((item,index)=> {
								if (item.partitionId == partitionId) {
									that.platformTradeFloorList = [];
									that.platformTradeFloorList = that.platformTradeFloorList.concat(that.defaultTradeFloorData);
									if(res.data.platformTradePartitionList[index].platformTradeFloorList){
										that.platformTradeFloorList = that.platformTradeFloorList.concat(res.data.platformTradePartitionList[index].platformTradeFloorList);
									}
								}
							});
						}else{
							that.platformTradeFloorList = [];
							that.platformTradeFloorList = that.platformTradeFloorList.concat(that.defaultTradeFloorData);
							if(res.data.platformTradeFloorList){
								that.platformTradeFloorList = that.platformTradeFloorList.concat(res.data.platformTradeFloorList);
							}
						}
						that.platformTradePartitionList = that.platformTradePartitionList.concat(res.data.platformTradePartitionList);
						
						that.queryShopInfo(that.mescroll);
					}
				})
			},
			changeFloorValue:function(index,floorId){
				if(floorId>0){
					this.floorId = floorId;
				}else{
					this.floorId = "";
				}
				this.floorSelectIndex = index;
				this.queryFloorInfo(this.partitionId);
			},
			changePartiValue:function(index,partitionId){
				if(partitionId>0){
					this.partitionId = partitionId;
					this.floorId = "";
					this.floorSelectIndex = 0;
				}else{
					this.partitionId = "";
				}
				this.partitionSelectIndex = index;
				this.queryFloorInfo(this.partitionId);
			},
			queryShopInfo:function(mescroll){
				const url = '/memberapi/api/shops/queryShopList.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					keyword:this.keyword,
					platformTradeId:this.tradeId,
					platformFloorId:this.floorId,
					platformPartitionId:this.partitionId
				};
				var that = this;
				this.request.get(url,data,mescroll).then(res=>{
					if(mescroll.num == 1) this.shopList = [];
					let currListData = res.list;
					that.util.formatShopList(currListData);
					that.shopList = that.shopList.concat(currListData); //追加新数据
				})
			},
			toShopDetail:function(item){
				//根据shopData.platformTypeId的值不同跳转到不同的页面
				this.util.gotoShopDetail(item); 
			}
	    }
	}
</script>

<style>
	@import "../../common/css/mall.css";
	.scroll-Y{
		height:100%;
	}
	.scroll-h1 {
		/* width: 500rpx; */
		flex-direction: row;
		white-space: nowrap;
		margin-bottom: 22rpx;
		font-size: 28rpx;
	}
	
	.activity-scrollview {
		color: #000000;
		width: 500rpx;
		overflow: hidden;
		white-space: nowrap;
		/* // padding-right: 20rpx; */
	}
	
	.activity-item {
		/* width: 300rpx; */
	
		text-align: center;
		display: inline-block;
		margin-right: 20rpx;
		

	}
	
	.the-item{
		display: inline-block;
		width: 200rpx;
	}
	.labelbar{
		margin-bottom:30rpx;
		background-color: red;
		display: inline-block;
		/* display: inline-block; */
		/* flex-wrap: nowrap; */
	}
	.nav .search{
	    width: 610rpx;
	}
	.classifybox .left .item.active:after {
	    width: 3px;
	    height: 14px;
	    background: #31A2F8;
		color:#31A2F8;
	    content: " ";
	    position: absolute;
	    left: 0px;
	    top: 19px;
	}
	.classifybox .left .item.active{
	    background: #fff;
	    color: #31A2F8;
	    position: relative;
	}
	.label{
		display: inline-block;
		background:#F4F4F4;
		color:#000000;
		padding:6rpx 32rpx;
		margin-right:18rpx;
		border-radius: 50rpx;
		font-size:32rpx;
	}
	.label.active{
		background: linear-gradient(#78C8F1, #4D8DED);
		color:#fff;
	}
	.right-cell{
		position: relative;
		padding-bottom:30rpx;
	}
	.right-cell:after{
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		color: rgba(0, 0, 0, 0.1);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		z-index: 2;
	}
	.right-cell:last-child:after{
		border-bottom:none;
	}
	.right-cell .logo{
		width:106rpx;
		height:106rpx;
		margin-right:20rpx;
	}
	.right-cell .logo image{
		width:100%;
		height:100%;
	}
	.right-cell .inner-bd .name{
		font-size:32rpx;
		font-weight:650;
		margin-bottom:20rpx;
	}
	.right-cell .inner-bd .mark{
		font-size:28rpx;
		color:#989898;
	}
	
	.shop-limit-length{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		max-width: 340rpx;
	}
</style>
