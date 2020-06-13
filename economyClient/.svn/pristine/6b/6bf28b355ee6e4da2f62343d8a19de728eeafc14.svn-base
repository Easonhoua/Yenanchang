<template>
	<view class="layout htvideo">
		<view class="ht-tab movie-tab">
			<view class="item"  @tap="tocolumns"><text>话题</text></view>
			<view class="item"  @tap="tostrategy"><text>攻略</text></view>
			<view class="item active"><text>视频</text><text class="line" style="top: -6rpx;"></text></view>
			<view class="item"><text>活动</text></view>
		</view>
		<view class="ht-tab-con">
			<view class="subitem">
				<image class="img" :src="this.request.getBaseImagePath()+'/static/img/column/v_pic1.png'" />
				<text class="title Text-hid2">可能是南昌VIEW最好的
					酒店吧</text>
				<view class="bt-bar">
					<view class="user">
						<image class="tx" :src="this.request.getBaseImagePath()+'/static/img/index/user.png'" />
						<text class="txt">TD美食家</text>
					</view>
					<view class="dz">
						<image class="dz-img" :src="this.request.getBaseImagePath()+'/static/img/index/dz.png'" />
						<text class="txt">141</text>
					</view>
				</view>
			</view>
			<view class="subitem">
				<image class="img" :src="this.request.getBaseImagePath()+'/static/img/column/v_pic2.png'" />
				<text class="title Text-hid2">可能是南昌VIEW最好的
					酒店吧</text>
				<view class="bt-bar">
					<view class="user">
						<image class="tx" :src="this.request.getBaseImagePath()+'/static/img/index/user.png'" />
						<text class="txt">TD美食家</text>
					</view>
					<view class="dz">
						<image class="dz-img" :src="this.request.getBaseImagePath()+'/static/img/index/dz.png'" />
						<text class="txt">141</text>
					</view>
				</view>
			</view>
			<view class="subitem">
				<image class="img" :src="this.request.getBaseImagePath()+'/static/img/column/v_pic3.png'" />
				<text class="title Text-hid2">可能是南昌VIEW最好的
					酒店吧</text>
				<view class="bt-bar">
					<view class="user">
						<image class="tx" :src="this.request.getBaseImagePath()+'/static/img/index/user.png'" />
						<text class="txt">TD美食家</text>
					</view>
					<view class="dz">
						<image class="dz-img" :src="this.request.getBaseImagePath()+'/static/img/index/dz.png'" />
						<text class="txt">141</text>
					</view>
				</view>
			</view>
			<view class="subitem">
				<image class="img" :src="this.request.getBaseImagePath()+'/static/img/column/v_pic4.png'" />
				<text class="title Text-hid2">可能是南昌VIEW最好的
					酒店吧</text>
				<view class="bt-bar">
					<view class="user">
						<image class="tx" :src="this.request.getBaseImagePath()+'/static/img/index/user.png'" />
						<text class="txt">TD美食家</text>
					</view>
					<view class="dz">
						<image class="dz-img" :src="this.request.getBaseImagePath()+'/static/img/index/dz.png'" />
						<text class="txt">141</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				strategyList:[
					{describe:'天冷就去吃火锅之火锅吃到吐-中山路和新建',userPath:'../../static/img/index/user.png',imgPath:'../../static/img/consult/hotSpot.png',shop:'月满江等8家店',userName:'都花瓣纷纷',look:'浏览 486',zan:'赞 199'},
					{describe:'天冷就去吃火锅之火锅吃到吐-中山路和新建',userPath:'../../static/img/index/user.png',imgPath:'../../static/img/consult/hotSpot.png',shop:'月满江等8家店',userName:'都花瓣纷纷',look:'浏览 486',zan:'赞 199'},
					{describe:'天冷就去吃火锅之火锅吃到吐-中山路和新建',userPath:'../../static/img/index/user.png',imgPath:'../../static/img/consult/hotSpot.png',shop:'月满江等8家店',userName:'都花瓣纷纷',look:'浏览 486',zan:'赞 199'}
				]
			}
		},
		methods:{
			tocolumns(){
				uni.switchTab({
					url:'../column/topic'
				})
			},
			tostrategy(){
				uni.navigateTo({
					url:"../column/strategy"
				})
			}, 
		}
	}
</script>

<style>
</style>
