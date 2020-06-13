<template>
	<web-view @message="messageCallback" class="window-width-view window-height-view" progress='false' :src="webUrl"></web-view>

</template>
<script>
	export default {
		data() {
			return {
				webUrl: "",
				webTitle: "查看详情"
			}
		},
		onLoad(options) {
			this.webUrl = decodeURIComponent(options.webUrl);
			this.webTitle = options.webTitle;
			uni.setNavigationBarTitle({
				title: this.webTitle
			})
		},
		methods:{
			messageCallback(event){
			
				var data=event.detail.data[0];
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				})
				//console.log(data)
				uni.$emit("payCallback",data);
			}
		}
	};
</script>
