<template>
	<view style="width:100%;">
		<scroll-view :scroll-x="true" :show-scrollbar="true">
			<view class="tab">
				<block v-for="(item,index) in itemList" :key="index"  :style="(index == (itemList.length-1))?'padding-right: 40rpx;' : '' ">
					<view :class="clickItem.index == index ? 'item active' : 'item' " @tap="topItemTap(index,item)">
					<image  v-if="clickItem.index == index"  class="icon" src="/static/img_new/scenic/dw2.png"></image>
					{{item.labelName?item.labelName:item}}</view>
				</block>
			</view>
			<!-- <view class="tab">
				<view class="item active"><image class="icon" src="/static/img_new/scenic/dw2.png"></image>点评</view>
				<view class="item">攻略</view>
				<view class="item">推荐</view>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		
		props:{
			
			itemList:{
				type:Array,
				default () {
					return[]
				}
			}
		},
		
		data() {
			return {
				clickItem:{
					index:0
				},
				selectIndex:0
			};
		},

		// watch:{
		// 	itemList(newItemList,oldItemList){
		// 		this.clickItem.index = 0;
		// 		this.clickItem.content = newItemList[0];
		// 		//console.log("this.newItemList = ",this.newItemList);
		// 	}
		// },
		
		methods:{
			moveToItem: function(index,item){
				this.clickItem.index = index;
				this.clickItem.content = item;
			},
			topItemTap: function(index,item) {
				this.clickItem.index = index;
				this.clickItem.content = item;
				this.$emit("naviItemClick",this.clickItem);
			},
		}
		
	}
</script>
<style lang="scss">
	/*其他scss */
	// @import "@/common/css/other_new.scss";
	@import "../../common/css/other_new.scss";
	.top-scroll {
		width: 100vw;
		// display: flex;
		// flex-direction: row;
		// white-space: nowrap;
		// align-items: center;
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
		z-index: 99;
		// position: -webkit-sticky;
		position: sticky;
		top: 0;
		/* #ifdef H5 */
		top: 0rpx;
		/* #endif */
		// margin-top: 70rpx;
	}
	.scenic .tab{
	    // top: 44rpx;
		padding:0;
	}
	.item{
		padding-top:0rpx;
		height:50rpx;
	}
	
</style>