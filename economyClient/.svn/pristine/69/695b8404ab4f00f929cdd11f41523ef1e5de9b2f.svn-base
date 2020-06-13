<template>
	<view class="page signup">
		<view class="formgroup">
			<view class="cell line-bottom">
				<text class="label">姓名</text>
				<view class="cell-bd">
					<input class="input" placeholder="请输入您的姓名" />
				</view>
			</view>
			<view class="cell line-bottom">
				<text class="label">手机号</text>
				<view class="cell-bd">
					<input class="input" placeholder="请输入您的手机号码"/>
				</view>
			</view>
			<view class="cell line-bottom">
				<view class="cell-bd">
					<input class="verify" placeholder="请输入验证码"/>
				</view>
				<view class="btn-verify">获取验证码</view>
			</view>
			<view class="agreement">
				<radio-group class="block" @change="RadioChange">
				<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
				勾选表示已阅读并同意<text class="blue">xxxxxxxxx活动规则说明书</text>
				</radio-group>
			</view>
			<view class="btnbar">
				<view class="btn-submit">立即报名</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	/*其他scss */
	@import "../../../common/css/other_new.scss";
	.agreement{
		padding-top:15rpx;
		padding-left:0;
	}
</style>
