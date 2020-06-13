<template>
	<view>
	</view>
</template>
<script>
	var wv; //计划创建的webview
	export default {
		data() {
			return {
				webUrl:"",
				webTitle:"查看详情"
			}
		},
		onLoad(options) {
			this.webUrl = decodeURIComponent(options.webUrl);
			this.webTitle = options.webTitle;
			// #ifdef APP-PLUS
			//console.log(this.webUrl)
			wv = plus.webview.create(this.webUrl, "custom-webview", {
				'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				top: "-50"  ,//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				titleNView:{titleText:this.webTitle}
			});
			//console.log(wv)
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			
			// #endif
		}
	};
</script>
