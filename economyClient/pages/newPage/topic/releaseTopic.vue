<template>
	<view class="releaselist">
		 <!-- #ifdef APP-PLUS -->  
		        <view class="status_bar">  
		            <view class="top_view"></view> 
		        </view>  
		        <!-- #endif --> 
		<view class="header-search">
			<image class="back" src="/static/img_new/common/back_black.png"></image>
			<view class="searchbox">
				<image class="icon" src="/static/img_new/common/search.png"></image>
				<input class="input" placeholder="搜索目的地/景点/酒店/餐厅等" placeholder-style="color:#999999" />
			</view>
		</view>
		<view class="search-con-box">
			<view class="search-con search-con-tp">
				<image class="icon" src="/static/img_new/topic/s_h@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">汉堡抢新品福利券</text>
					<text class="address">643454人参与</text>
				</view>
			</view>
			<view class="search-con search-con-tp">
				<image class="icon" src="/static/img_new/topic/s_n@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">汉堡抢新品福利券  </text>
					<text class="address">643454人参与</text>
				</view>
			</view>
			<view class="search-con search-con-tp">
				<image class="icon" src="/static/img_new/topic/s_up@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">汉堡抢新品福利券  </text>
					<text class="address">643454人参与</text>
				</view>
			</view>
			<view class="search-con search-con-tp">
				<image class="icon" src="/static/img_new/topic/s_up@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">汉堡抢新品福利券  </text>
					<text class="address">643454人参与</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style lang="scss">
	.status_bar {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    background-color: #FFFFFF;  
	}  
	.top_view {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    position: fixed;  
	    background-color: #FFFFFF;  
	    top: 0;  
	    z-index: 999;  
	} 
	/*其他scss */
	@import "../../../common/css/other_new.scss";
</style>
