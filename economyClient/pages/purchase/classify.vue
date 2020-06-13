<template>
	<view class="page">
		<view class="nav">
			<view class="back"><image class="icon" src="../../static/img/common/back.png"></image></view>
			<view class="search">
				<input placeholder="搜索商品" placeholder-style="color:rgba(163, 163, 164, 1);" />
			</view>
			<view class="righttxt">分类</view>
		</view>
		<view class="classifybox">
			<view class="left">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				                @scroll="scroll">
				<view class="item active">男装</view>
				<view class="item">生鲜</view>
				<view class="item">美妆</view>
				<view class="item">男装</view>
				<view class="item">生鲜</view>
				<view class="item">美妆</view>
				<view class="item">男装</view>
				<view class="item">生鲜</view>
				<view class="item">美妆</view>
				<view class="item">男装</view>
				<view class="item">生鲜</view>
				<view class="item">美妆</view>
				<view class="item">男装</view>
				<view class="item">生鲜</view>
				<view class="item">美妆</view>
				<view class="item">男装</view>
				<view class="item">生鲜</view>
				<view class="item">美妆</view>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				                @scroll="scroll">
				<view class="right-cell">
					<view class="title">羽绒服</view>
					<view class="inner">
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						
					</view>
				</view>
				<view class="right-cell">
					<view class="title">羽绒服</view>
					<view class="inner">
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						
					</view>
				</view>
				<view class="right-cell">
					<view class="title">羽绒服</view>
					<view class="inner">
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						
					</view>
				</view>
				<view class="right-cell">
					<view class="title">羽绒服</view>
					<view class="inner">
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						<view class="subitem">
							<image class="img" src="../../static/img/mall/baokuan_kz@2x.png"></image>
							<text>新品</text>
						</view>
						
					</view>
				</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            scrollTop: 0,
	            old: {
	                scrollTop: 0
	            }
	        }
	    },
	    methods: {
	        upper: function(e) {
	            //console.log(e)
	        },
	        lower: function(e) {
	            //console.log(e)
	        },
	        scroll: function(e) {
	            //console.log(e)
	            this.old.scrollTop = e.detail.scrollTop
	        },
	        goTop: function(e) {
	            this.scrollTop = this.old.scrollTop
	            this.$nextTick(function() {
	                this.scrollTop = 0
	            });
	            uni.showToast({
	                icon:"none",
	                title:"纵向滚动 scrollTop 值已被修改为 0"
	            })
	        }
	    }
	}
</script>

<style>
	@import "../../common/css/mall.css";
	.scroll-Y{
		height:100%;
	}
</style>
