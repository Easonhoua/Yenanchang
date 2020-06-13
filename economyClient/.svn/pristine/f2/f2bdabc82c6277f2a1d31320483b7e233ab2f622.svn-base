<template>
	<view>
		<!-- #ifdef H5 -->
			<web-view class="window-width-view window-height-view" progress='false' :src="webUrl"></web-view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl: "",
				webTitle: "查看详情"
			}
		},
		// onBackPress() {  
		// 	    // #ifdef APP-PLUS
		// 	    const currentWebview = this.$mp.page.$getAppWebview().children(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里，直接使用plus.webview.currentWebview()无效
		// 		currentWebview[0].close();
		// 	    // #endif

		// },
		onLoad(options) {
			// this.webUrl = decodeURIComponent(options.webUrl);
			// // this.webUrl = options.webUrl;
			// this.webTitle = options.webTitle;
			// if(!this.webTitle) this.webTitle = "查看详情";
			// uni.setNavigationBarTitle({
			// 	title: this.webTitle
			// })
			
			this.webUrl = decodeURIComponent(options.webUrl);
			this.webTitle = options.webTitle?options.webTitle:"查看详情";
			uni.setNavigationBarTitle({
				title: this.webTitle
			})
			this.createWebView();
		},
		methods: {
			// 创建APP-PLUS的AppWebview
			createWebView:function(){
				
				// #ifdef APP-PLUS
				// var hasNotch = plus.navigator.hasNotchInScreen();//是否含有刘海屏
				// var titleHeight = "95";
				// if (uni.getSystemInfoSync().platform == "android") {
				// 	titleHeight = "75"
				// }
				var wv = plus.webview.create(this.webUrl, "custom-webview", {
					'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
					top: '0'  ,//放置在titleNView下方，添加自定义的导航栏等等
					titleNView:{titleText:this.webTitle}
				});
				var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
				currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
				
				// #endif
			}
		}
	}
</script>

<style>

</style>
