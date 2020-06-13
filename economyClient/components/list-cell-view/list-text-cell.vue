<template>
	<view >
		<!-- 传数组 -->
		<view v-if="leftTexts" :class="cellClass" v-for="(item,index) in leftTexts" :key="index" :style="otherStyle" @click="cellClick(urls[index])">
			<view class="cell-left-text" :style="showRightArrow?'color: #000000;':'color:#BFBFBF;' ">{{leftTexts[index]}}</view>
			<!-- !rightTexts[index])|| -->
			<view class="cell-right-text" :style="showRightArrow?'color: #BFBFBF;':'color: #000000;' ">{{(rightTexts[index]=="undefined")?"未填写":rightTexts[index]}}</view>
			<image v-if="showRightArrow" class="right-arrow-img"  style="margin-left: -10rpx;"></image>
		</view>
		<!-- 单独传字符串 -->
		<view v-if="leftText" :class="cellClass" :style="otherStyle" @click="cellClick1(leftText)">
			<view class="cell-left-text" :style="showRightArrow?'color: #000000;':'color:#BFBFBF;' ">{{leftText}}</view>
			<view class="cell-right-text" :style="showRightArrow?'color: #BFBFBF;':'color: #000000;' ">{{(rightText=='undefined') ? '未填写' : rightText }}</view>
			<image v-if="showRightArrow" class="right-arrow-img"  style="margin-left: -10rpx;"></image>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		name:"list-text-cell",
		props:{
			// 左边文字
			leftText:{
				type:String,
				default : ""
			},
			// 右边文字
			rightText:{
				type:String,
				default : ""
			},
			// 左边文字数组
			leftTexts:{
				type:Array,
				default(){
					return[]
				}
			},
			// 右边数组
			rightTexts:{
				type:Array,
				default(){
					return[]
				}
			},
			// 跳转的链接数组
			urls:{
				type:Array,
				default(){
					return[]
				}
			},
			// 是否显示下划线
			showBottomLine:{
				type:String,
				default : "YES"
			},
			// 是否显示右边箭头
			showRightArrow:{
				type:Boolean,
				default(){
					return false
				}
			},
			// 背景色
			backgroundColor:{
				type:String,
				default : "#FFFFFF"
			}
		},
		data() {
			return {
				cellClass:"list-cell",
				otherStyle:""
				// theRightText:""
			};
		},
		created() {
			this.setupCellClass();
		},
		// watch: {
		// 	rightText(newRightText,oldRightText){
		// 		//console.log("newRightTextnewRightText == ",newRightText);
		// 		this.theRightText = newRightText;
		// 	}
		// },
		methods:{
			setupCellClass:function(){
				this.otherStyle = "background-color:"+this.backgroundColor;
				if(this.showBottomLine === "YES"){
					this.cellClass = "list-cell-border";
				}else
				{
				}
			},
			
			cellClick:function(url){
				if(url){
					uni.navigateTo({
						url:url
					})
				}else{
					
				}
			},
			cellClick1:function(leftText){
				this.$emit("cellClick",leftText);
			}
		}
	}
</script>

<style>
	
.list-cell{
	width: 100vw;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 28rpx;
	line-height: 50rpx;
	min-height: 100rpx;
	background-color: #FFFFFF;
	word-break: break-all;
	
}
.list-cell-border{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100vw;
	font-size: 28rpx;
	line-height: 50rpx;
	min-height: 100rpx;
	border-bottom: 2rpx solid #F5F5F5;
	background-color: #FFFFFF;
	word-break: break-all;
}
.cell-left-text{
	margin-left: 20rpx;
	width: 230rpx;
	color: #BFBFBF;
}
.cell-right-text{
	/* margin-left: 10rpx; */
	margin-left: auto;
	margin-right: 20rpx;
	
	color: #000000;
	line-height: 40rpx;
	padding: 20rpx 0rpx;
}
</style>
