<template>
	<view class="page hot-topic">
		<view class="header-nor line-bottom">
			<image class="back" src="/static/img_new/common/back_black.png" @click="goBack()"></image>
			<text class="title-txt">{{topicData.topicTypeName}}话题</text>
			<view class="media-item-line" style="position: absolute;"></view>
		</view><!-- 头部结束 -->
		<view class="page-con">
			<view class="topic-con-top">
				<image class="img" :src="topicData.thumbnailPath"></image>
				<view class="righttxt">
					<view class="title">
						<text class="topic-title">#{{topicData.topicTitle}}#</text>
						<image class="tag" src="/static/img_new/topic/s_h@3x.png"></image>
					</view>
					<text class="num">{{topicData.attendNum}}人参与</text>
					<text class="num">发布者：{{topicData.userName}}</text>
				</view>
			</view><!-- 头部话题结束 -->
			<mescroll-body @down="downCallBack" @init="initMescroll" @up="upCallback" top="340" style="background-color: #F5F5F5;">
				<view class="userbar-nor" v-for="(item,index) in topicDynamicList" :key="index">
					<view class="userbar">
						<view class="left">
							<image class="userlogo" :src="util.formatImagePath(item.photo)"></image>
							<text class="right-txt">
								<text class="name">{{item.nick}}</text>
								<text class="time">{{item.publishTime}}</text>
							</text>
						</view>
						<view class="userbox__right" style="display: none;">
							<view class="right-btn" @click="addFollow(item)">+ 关注</view>
						</view>
					</view>
					<view class="topic-bd">
						<view class="topic-bd-txt">
							<view class="title"><text class="blue bloc">#{{item.topicTitle}}#</text>{{item.dynamicTitle}}</view>
							<view class="con-txt">{{item.dynamicRemark}}</view>
						</view>
						<view v-show="item.dynamicImg && item.dynamicImg.length >1" class="imgbox">
							<image v-for="(imgItem, imgIndex) in item.dynamicImg" :key="imgIndex" class="img imgGrid" :src="imgItem"></image>
						</view>
						<view class="dingwei" v-show="item.shopName">
							<image class="icon" src="/static/img_new/topic/position.png"></image><text>{{item.shopName}}</text>
						</view>
					</view>
					<view class="topic-bt-bar line-top">
						<view class="left-icon" @tap="addTopicDynamicComment(item, index)">
							<image class="icon" src="/static/img_new/topic/add_comment.png"></image>
							<text class="txt">写评论</text>
						</view>
						<view class="right-icon" @click="toDynamicComment(item)">
							<view class="item">
								<image class="icon" src="/static/img_new/topic/fb_pl2.png"></image>
								<text class="txt">{{item.commentNum}}</text>
							</view>
							<view class="item" @click="addLike(item, index)">
								<image class="icon" :src="getLikeImg(item)"></image>
								<text class="txt">{{item.attendNum}}</text>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>

		</view>
		<view class="play" v-show="showPublishBtn">
			<view class="publishbtn" @click="toPublish()">
				<text>发布话题</text>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view>
				<textarea class="textarea textarea-h" placeholder="写评论" :focus="true" v-model="dynamicRemark"></textarea>
			</view>
			<view class="uni-popup-grou-button">
				<view class="uni-popup-cancel-button" @click="cancelBtn('popup')">取消</view>
				<view class="uni-popup-confirm-button" :loading="loading" :disabled="loading" @click="confirmBtn('popup')">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			uniPopup
		},
		data() {
			return {
				index: 0,
				loading: false,
				dynamicRemark: '', //评论内容
				topicDynamicList: [],
				topicData: {},
				mescroll: '',
				userData: {},
				topicDynamicId: '',
				showPublishBtn: false
			}
		},
		onLoad(e) {
			console.log(e)
			if (e.topicId) {
				this.topicData.topicId = e.topicId;
				this.queryDetail(e.topicId);
			}
			if (e.topicType && e.topicType !== 'undefined') {
				this.showPublishBtn = true;
			}
			this.userData = uni.getStorageSync("user");
			console.log(this.userData);
		},
		methods: {
			goBack: function() {
				uni.navigateBack({})
			},
			queryDetail: function(topicId) {
				let url = '/memberapi/api/topic/read.do';
				let data = {
					topicId: topicId,
				};
				this.request.get(url, data).then(res => {
					if (res.returncode == 0) {
						this.topicData = res.data;
						if (this.topicData.thumbnailPath) {
							this.topicData.thumbnailPath = this.util.formatImagePath(this.topicData.thumbnailPath);
						}
					}
				})
			},
			initMescroll(mescroll) {
				this.mescroll = mescroll;
			},
			downCallBack(mescroll) {
				this.topicDynamicList = [];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				//获取最新的话题信息
				const url = '/memberapi/api/topicDynamic/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					topicId: this.topicData.topicId,
				};
				var that = this;
				this.request.get(url, data, mescroll).then(res => {
					let newData = res.list;
					newData.forEach(item => {
						if (item.dynamicImg) {
							item.dynamicImg = this.util.formatImagePaths(item.dynamicImg);
						}

						if (item.publishTime) {
							item.publishTime = this.util.formatMinutesDay(item.publishTime.replace(/-/ig, "/"));
						}
					});
					if (res.list.length === 0 || this.mescroll.num === 1) this.topicDynamicList = [];
					this.topicDynamicList = this.topicDynamicList.concat(newData); //追加新数据
					console.log(this.topicDynamicList);
				})
			},
			//动态评价添加
			addTopicDynamicComment: function(item, index) {
				this.topicDynamicId = item.dynamicId;
				this.index = index;
				this.$refs['popup'].open();
			},
			//评论取消
			cancelBtn(type) {
				this.$refs[type].close();
			},
			//评论提交
			confirmBtn(type) {
				let url = '/memberapi/api/topicDynamicComment/add.do';
				let data = {
					dynamicId: this.topicDynamicId,
					dynamicRemark: this.dynamicRemark,
				};
				var that = this;
				this.request.post(url, data).then(res => {
					if (res.returncode === 0) {
						that.request.toastTips("新增成功");
						that.$refs[type].close();
						that.topicDynamicList[that.index].commentNum++;
						that.dynamicRemark = ''
					} else {
						that.request.toastTips("新增失败");
					}
				})
			},
			// 跳转至动态评论页面
			toDynamicComment: function(item) {
				uni.navigateTo({
					url: '../topic/topicdynamicView?dynamicId=' + item.dynamicId
				})
			},
			// 添加关注
			addFollow: function(item) {
				let url = '/memberapi/api/followUser/add.do';
				let data = {
					followUserId: item.publisherId, // 被关注人ID
					userId: this.userData.memberId, // 关注人ID
				}
			},
			// 点赞
			addLike: function(item, index) {
				let url = '/memberapi/api/goodInfo/add.do';
				let data = {
					relationId: item.dynamicId,
					goodType: 6, //动态点赞6
				};
				if (item.canGoodInfo == 1) { //添加点赞
					url = '/memberapi/api/goodInfo/add.do';
				} else { //取消点赞
					url = '/memberapi/api/goodInfo/cancel.do';
				}
				var that = this;
				this.request.post(url, data).then(res => {
					if (res.returncode === 0 && item.canGoodInfo == 1) {
						that.request.toastTips("点赞成功");
						that.topicDynamicList[index].attendNum++;
						that.topicDynamicList[index].canGoodInfo = 2;
					} else {
						that.request.toastTips("取消点赞");
						that.topicDynamicList[index].attendNum--;
						that.topicDynamicList[index].canGoodInfo = 1;
					}
				})
			},
			getLikeImg: function(item) {
				return item.canGoodInfo === 1 ? '/static/img_new/topic/h_tl_sc_nor.png' : '/static/img_new/topic/h_tl_sc_pre.png';
			},
			toPublish: function() {
				uni.navigateTo({
					url: 'publish?typeName=' + this.topicData.topicTypeName + "&topicType=" + this.topicData.topicType
				})
			}
		}
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "../../common/css/other_new.scss";

	.line-bottom{
		padding-top: var(--status-bar-height);
		height: 140rpx;
	}
	.page-con{
		padding-top: 140rpx;
	}	
	
	.topic-title {
		display: inline-block;
		white-space: nowrap;
		max-width: 500rpx !important;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.imgGrid {
		width: 100%;
		height: 100%;
	}

	.uni-popup-grou-button {
		margin-top: 10px;
		display: flex;
	}

	.uni-popup-cancel-button {
		width: 100%;
		text-align: left;
		font-size: 14px;
		color: #3b4144;
	}

	.uni-popup-confirm-button {
		width: 100%;
		text-align: right;
		font-size: 14px;
		color: #007AFF;
	}
</style>
