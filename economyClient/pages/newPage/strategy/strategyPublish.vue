<template>
	<view class="page stra-publish">
		<view class="header">
			<view class="back"><image class="icon" src="../../../static/img_new/common/back_black.png" @click="goBack()"></image></view>
			<view class="publishbtn">发布</view>
		</view>
		<view class="addimg">
			<image class="img" src="../../../static/img_new/common/addimg2.png"></image>
		</view>
		<view class="textbox line-bottom">
			<textarea class="textarea" placeholder="详细分享你的真实体验、实用攻略和一些小Tips，并带上明确的推荐理由，更容易被推荐哦！" placeholder-style="color:#cccccc;"></textarea>
			<view class="tip">写60字，有机会评写为<text class="blue">优质旅拍</text><image class="icon" src="../../../static/img_new/gonglue/help.png"></image></view>
		</view>
		<view class="timebox">
			<text class="time">拍摄日期 2020-03-1</text>
			<text class="time"><image class="icon" src="../../../static/img_new/gonglue/select_icon.png"></image>添加水印</text>
		</view>
		<view class="line20"></view>
		<view class="address line-bottom">
			<view class="add"><image class="icon" src="../../../static/img_new/gonglue/dingwei3.png"></image><text class="txt">添加地点</text><image class="icon" src="../../../static/img_new/common/right_arrow2.png"></image></view>
			<view class="labelbox">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation>
				<text class="label">南昌.江西</text><text class="label">滕王阁</text><text class="label">秋水广场</text><text class="label">滕王阁游艇</text>
				</scroll-view>
			</view>
		</view>
		<view class="address line-bottom">
			<view class="add"><image class="icon" src="../../../static/img_new/gonglue/huati.png"></image><text class="txt">添加话题</text><image class="icon" src="../../../static/img_new/common/right_arrow2.png"></image></view>
			<view class="labelbox">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation >
				<view class="label"><text class="icon">奖</text>#去年三月你在哪里</view>
				<view class="label"><text class="icon">奖</text>#去年三月你在哪里</view>
				<view class="label"><text class="icon">奖</text>#去年三月你在哪里</view>
			</scroll-view>
			</view>
		</view>
		<view class="agreement">
			<radio-group class="block" @change="RadioChange">
			<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
			勾选表示已阅读并同意<text class="blue">《ye南昌平台用户规则》</text>
			</radio-group>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			// 返回
			goBack:function(){
				uni.navigateBack({
				})
			},
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "../../../common/css/icon.css";
	@import "../../../common/css/other_new.scss";
</style>
