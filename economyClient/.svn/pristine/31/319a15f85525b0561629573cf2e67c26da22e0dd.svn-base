<template>
	<web-view  class="window-width-view window-height-view" progress='false' :src="webUrl"></web-view>

</template>
<script>
	export default {
		data() {
			return {
				webUrl: "",
				webTitle: "查看详情"
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "/pages/town/subjectMap?subjectId=2"
			})
		},
		onLoad(options) {
			this.webUrl = decodeURIComponent(options.webUrl);
			
		},
		methods:{
			
		}
	};
</script>
