<template>
	<view class="content">
		<list-text-cell :showRightArrow='true'  :leftTexts="leftTexts" :rightTexts="rightTexts" :urls="urls" style="margin-top: 30rpx;"></list-text-cell>
	</view>
</template>

<script>
	import listTextCell from "@/components/list-cell-view/list-text-cell.vue"
	export default {
		components:{
			listTextCell
		},
		data() {
			return {
				leftTexts:[],
				rightTexts:[],
				urls:[]
			}
		},
		onLoad() {
			this.setupData();
		},
		methods: {
			setupData:function(){
				this.leftTexts = ["修改手机号","修改密码"];
				// this.rightTexts = ["查看个人资料","设置账号安全","查看隐私协议"];
				this.urls = [
					"/pages/user/setting/updatePhone",
					"/pages/user/setting/updatePassword"
				];
				
			},
		}
	}
</script>

<style>

</style>
