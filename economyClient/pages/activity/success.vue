<template>
	<view class="page signup">
		<view class="formgroup">
			<view class="cs-inner">
				<image class="icon" src="/static/img_new/topic/h_cg@3x.png"></image>
				<view class="txt">恭喜您，报名成功！</view>
			</view>
			<view class="btnbar">
				<view class="btn-submit"  @click="toActivityDetail">进入活动</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activityId: 0,
			}
		},
		onLoad(e) {
			if (e.activityId) {
				this.activityId = e.activityId;
			}
		},
		methods:{
			toActivityDetail:function(){
				uni.navigateTo({
					url:'/pages/activity/activityDetail?activityId='+this.activityId 
				}) 	
			}
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "@/common/css/other_new.scss";
</style>
