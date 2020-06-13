<template>
	<view class="layout">
		<view class="navi-bar">
			<view class="status-bar"></view>
			<view class="navi-bar navi-bar1">
				<image class="navi-bar-back" src="/static/img/common/icon_back.png"></image>
				<view @click="selectAddress">{{areaAddress}}</view>
				<view class="right-buttons">
					<image class="right-buttons-item" src="/static/img/common/icon_share.png"></image>
				</view>
			</view>
		</view>
		<mpvue-city-picker themeColor="#FE350F" ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault"
		 @onCancel="selectAddressCancel" @onConfirm="selectAddressConfirm"></mpvue-city-picker>
		<view style="margin-top: 96rpx;"></view>
		<view class="ranklist">
			<view class="item">
				<text class="txt">火锅</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png" mode="aspectFill"></image>
			</view>
			<view class="item">
				<text class="txt">韩国料理</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png" mode="aspectFill"></image>
			</view>
			<view class="item">
				<text class="txt">湘菜</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png"></image>
			</view>
			<view class="item">
				<text class="txt">地方菜</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png"></image>
			</view>
		</view>
		<view class="ranklist">
			<view class="item">
				<text class="txt">火锅</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="ranklist">
			<view class="item">
				<text class="txt">火锅</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png" mode="aspectFill"></image>
			</view>
			<view class="item">
				<text class="txt">韩国料理</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="ranklist">
			<view class="item">
				<text class="txt">火锅</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png" mode="aspectFill"></image>
			</view>
			<view class="item">
				<text class="txt">韩国料理</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png" mode="aspectFill"></image>
			</view>
			<view class="item">
				<text class="txt">韩国料理</text>
				<view class="masking"></view>
				<image class="img" src="../../static/img/details/f_pic1.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		components: {
			mpvueCityPicker
		},
	    data() {
	        return {
				areaAddress:'全城',
				areaCode:'', //区域编号
				pickerValueDefault: [0,0,1],
	            array: [{
	                mode: 'aspectFill',
	                text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
	            }],
	            src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg'
	        }
	    },
	    methods: {
	        imageError: function(e) {
	            console.error('image发生error事件，携带值为' + e.detail.errMsg)
	        },
			//省市区选择
			selectAddress:function(){
				// #ifdef APP-PLUS
					plus.key.hideSoftKeybord();
				// #endif
				this.$refs.mpvueCityPicker.show();
			},
			//省市区选择点击取消
			selectAddressCancel:function(e) {
				this.$refs.mpvueCityPicker.hide();
			},
			//省市区选择点击确定
			selectAddressConfirm:function(e) {
				//console.log("clickAreaAddress == ",e.label.split("-")[2]+"--e.areaCode:"+e.areaCode);
				this.areaAddress =e.label.split("-")[2];
				this.areaCode =e.areaCode;
			},
	    }
	}
</script>

<style>
	.navi-bar {
		width: 100vw;
		/* #ifdef APP-PLUS */
		height: var(--status-bar-height);
		/* #endif */
		/* #ifdef H5 */
		height: 88rpx;
		/* #endif */
		z-index: 7;
		position: fixed;
	}
	
	.status-bar {
		position: fixed;
		height: var(--status-bar-height);
		width: 100vw;
		z-index: 8;
	}
	
	.navi-bar1 {
		width: 100vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: var(--status-bar-height);
		/* height: var(--window-top); */
		height: 88rpx;
		z-index: 9;
		padding-right: 30rpx;
		margin-bottom: 300rpx;
	}
	
	.navi-bar-back {
		width: 75rpx;
		height: 60rpx;
		padding: 15rpx;
		padding-left: 30rpx;
	}
	
	.right-buttons {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* padding-right: 15rpx; */
		justify-content: space-between;
		z-index: 10;
	}
	
	.right-buttons-item {
		width: 68rpx;
		height: 80rpx;
		padding: 20rpx 15rpx 20rpx 15rpx;
		z-index: 11;
		margin-right: 10rpx;
	}
	
	.back-view {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
		z-index: 9999;
	}
	
	.bottom-view {
		position: fixed;
		margin-top: auto;
		width: 750rpx;
		bottom: 0rpx;
		z-index: 10000;
		background-color: #FFFFFF;
		text-align: center;
	}
	
	.share-view {
		width: 750rpx;
		padding: 60rpx 0rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
	.share-item {
		width: 150rpx;
		height: 150rpx;
	}
	
	.share-item-image {
		width: 100rpx;
		height: 100rpx;
		padding: 10rpx;
	}
	
	.cancel-button {
		border-top: 2rpx solid #F5F5F5;
		width: 750rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		/* padding-top: 12rpx; */
		/* padding-bottom: 20rpx; */
		bottom: 20rpx;
	}
	
	.ranklist{
		width:100%;
		display: flex;
		justify-content:space-around;
		padding:8rpx;
	}
	.ranklist .item{
		height:150rpx;
		flex: 1;
		margin:0 8rpx;
		border-radius: 15rpx;
		overflow: hidden;
		position: relative;
	}
	.ranklist .item .masking{
		width:100%;
		height:150rpx;
		background: rgba(0,0,0,.4);
		z-index: 1;
		position: absolute;
		left:0;
		top:0;
	}
	.ranklist .item .txt{
		width:100%;
		position: absolute;
		text-align: center;
		top:80rpx;
		font-size:32rpx;
		color:#fff;
		z-index: 4;
	}
	.ranklist .item .img{
		width:100%;
		height:100%;
		border-radius: 15rpx;
	}
</style>
