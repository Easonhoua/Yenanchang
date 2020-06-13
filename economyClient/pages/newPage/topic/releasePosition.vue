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
			<view class="search-con">
				<image class="icon" src="/static/img_new/topic/s_dw@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">江西/南昌</text>
					<text class="address">西湖区仿古路68号</text>
				</view>
			</view>
			<view class="search-con">
				<image class="icon" src="/static/img_new/topic/s_jd@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">滕王阁</text>
					<text class="address">青海省海东地区乐都县兴华街4号</text>
				</view>
			</view>
			<view class="search-con">
				<image class="icon" src="/static/img_new/topic/s_zs@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">七天酒店</text>
					<text class="address">四川省泸州市叙永县阳光胡同930号</text>
				</view>
			</view>
			<view class="search-con">
				<image class="icon" src="/static/img_new/topic/s_ms@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">上井餐厅</text>
					<text class="address">辽宁省锦州市凌海市郭守敬大道573号</text>
				</view>
			</view>
			<!-- 添加话题样式 -->
			<view class="search-con">
				<image class="icon" src="/static/img_new/topic/s_ad@3x.png"></image>
				<view class="search-con-txt line-bottom">
					<text class="title">江西/南昌</text>
					<text class="address">西湖区仿古路68号</text>
				</view>
			</view>
			<!-- 添加话题样式结束 -->
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
