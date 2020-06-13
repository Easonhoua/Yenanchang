<template>
	<view class="page commentpage">
		<view class="header">
			<text class="cancel">取消</text>
			<text class="txt">滕王阁</text>
			<view class="btn">发表</view>
		</view>
		<view class="score line-bottom">
			<text class="txt">评分</text>
			<view class="iconbox">
				<image class="icon" src="../../../static/img_new/scenic/pl.png"></image>
				<image class="icon" src="../../../static/img_new/scenic/pl_nor.png"></image>
				<image class="icon" src="../../../static/img_new/scenic/pl_nor.png"></image>
				<image class="icon" src="../../../static/img_new/scenic/pl_nor.png"></image>
				<image class="icon" src="../../../static/img_new/scenic/pl_nor.png"></image>
			</view>
			<text class="tiptxt">点击来评分</text>
		</view>
		<view class="txtbox line-bottom">
			<textarea class="textarea" placeholder="这里值得去吗？有什么亮点？大家都期待你的点评~" placeholder-style="color:#b3b3b3"></textarea>
			<view class="tip">还差<text class="orange">15</text>字，即可发表点评</view>
		</view>
		<view class="addimg">
			<image class="img" src="../../../static/img_new/scenic/add.png"></image>
			<text class="txt">上传照片</text>
		</view>
		<view class="agreement">
			<radio-group class="block" @change="RadioChange">
			<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
			我理解并接受<text class="blue">用户协议</text>及<text class="blue">图片使用规则</text>
			</radio-group>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	/*其他scss */
	@import "../../../common/css/other_new.scss";
</style>
