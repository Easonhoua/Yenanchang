<template>
	<view>
		<scroll-view class="top-scroll" :scroll-x="true" :show-scrollbar='false'>
			<view v-if="colorStyle=='blue'" class="blue-item" v-for="(item,index) in itemList" :key="index" @click="topItemTap(index,item)" :style="(index == (itemList.length-1))?'padding-right: 40rpx;' : '' ">
				<view :class="clickItem.index==index ? 'item-select' : 'item-normal' ">{{item.labelName?item.labelName:item}}</view>
				<view v-if="clickItem.index == index" class="item-line"></view>
			</view>
			
			<view v-if="colorStyle=='red'" class="red-item" v-for="(item,index) in itemList" :key="index" @click="topItemTap(index,item)" :style="(index == (itemList.length-1))?'padding-right: 40rpx;' : '' ">
				<view :class="clickItem.index==index ? 'item-select' : 'item-normal' ">{{item.labelName?item.labelName:item}}</view>
				<view v-if="clickItem.index == index" class="item-line"></view>
			</view>
			
			<view v-if="colorStyle=='newred'" class="nred-item" v-for="(item,index) in itemList" :key="index" @tap="topItemTap(index,item)" :style="(index == (itemList.length-1))?'padding-right: 40rpx;' : '' ">
				<view v-if="clickItem.index == index" class="nitem-line"></view>
				<view :class="clickItem.index==index ? 'nitem-select' : 'nitem-normal' ">{{item.labelName?item.labelName:item}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			// 颜色样式,目前有两种样式（blue，red）,默认蓝色,红色用于新版界面的美食等等
			colorStyle: {
				type: String,
				default: "newred"
			},

			itemList: {
				type: Array,
				default () {
					return []
				}
			}
		},

		data() {
			return {
				clickItem: {
					index: 0
				}

			};
		},

		// watch:{
		// 	itemList(newItemList,oldItemList){
		// 		this.clickItem.index = 0;
		// 		this.clickItem.content = newItemList[0];
		// 		//console.log("this.newItemList = ",this.newItemList);
		// 	}
		// },

		methods: {
			moveToItem: function(index, item) {
				this.clickItem.index = index;
				this.clickItem.content = item;
			},
			topItemTap: function(index, item) {
				// console.log("indexindexindexindex22 === ",index);
				this.clickItem.index = index;
				this.clickItem.content = item;
				this.$emit("naviItemClick", this.clickItem);
			},
		}

	}
</script>

<style lang="scss">
	
	.top-scroll {
		width: 100vw;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		align-items: center;
		background: #ffffff;
		/* #ifdef APP-PLUS */
		top: var(--window-top);
		/* #endif */
		z-index: 99;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		/* height: 78rpx; */
		margin: 0px;
		/* #ifdef H5 */
		top: 0rpx;
		/* #endif */
	}

	// 蓝色样式
	.blue-item{
		padding: 12rpx 20rpx 12rpx 40rpx;
		display: inline-block;
		flex-wrap: nowrap;
		font-size: 32rpx;
		justify-content: center;
		z-index: 99999;
		.item-normal {
			color: #333333;
		}
		
		.item-select {
			font-size: 32rpx;
			padding-bottom: 2rpx;
			background: linear-gradient(to right, #2798F2, #506EFD);
			-webkit-background-clip: text;
			color: transparent;
		}
		
		.item-line {
			width: 50rpx;
			height: 6rpx;
			margin-left: auto;
			margin-right: auto;
			border-radius: 6rpx;
			background: linear-gradient(to right, #2798F2, #506EFD);
		}
	}
	// 红色样式
	.red-item{
		padding-top: 20rpx;
		display: inline-block;
		flex-wrap: nowrap;
		font-size: 32rpx;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		width: 250rpx;
		text-align: center;
		z-index: 99999;
		.item-normal {
			color: #333333;
		}
		
		.item-select {
			font-size: 32rpx;
			padding-bottom: 6rpx;
			background: linear-gradient(to right, #ef3d40, #f95e86);
			-webkit-background-clip: text;
			color: transparent;
		}
		
		.item-line {
			width: 50rpx;
			height: 6rpx;
			margin-left: auto;
			margin-right: auto;
			border-radius: 6rpx;
			background: linear-gradient(to right, #ef3d40, #f95e86);
		}
		
	}
	
	
	//新红色样式
	.nred-item{
			// padding-top: 20rpx;
			padding: 12rpx 40rpx 12rpx 32rpx;
			display: inline-block;
			flex-wrap: nowrap;
			font-size: 32rpx;
			justify-content: center;
			margin-left: auto;
			margin-right: auto;
			// width: 250rpx;
			text-align: center;
			.nitem-normal {
				color: #333333;
			}
			
			.nitem-select {
				font-size: 32rpx;
				padding-bottom: 6rpx;
				background: #000000;
				-webkit-background-clip: text;
				color: transparent;
			}
			
			.nitem-line {
				height: 12rpx;
				margin-left: auto;
				margin-right: auto;
				margin-bottom: -40rpx;
				border-radius: 6rpx;
				background: rgba(243,112,58,1);
			}
		}
	
</style>
