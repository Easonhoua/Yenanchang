<template>
	<view class="page">
		<swiper class="swiper" :circular="circular" :vertical="true" @change="onSwiperChange">
			<swiper-item v-for="item in videoList" :key="item.id">
				<video class="video" :id="item.id" :ref="item.id" :src="item.src" :controls="true" :loop="true"
				 :show-center-play-btn="false"></video>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				circular: true,
				videoList: [{
						id: "video0",
						src: "",
						img: ""
					},
					{
						id: "video1",
						src: "",
						img: ""
					},
					{
						id: "video2",
						src: "",
						img: ""
					}
				],
				videoDataList: [],
				videoId: '',
			}
		},
		// created(option) {
		// 	// this.videoId = this.$route.query.videoId;
		// 	this.videoId = option.videoId;
		// },
		// onReady() {
		// 	this.init();
		// 	this.getData();
		// },
		onLoad(option){
			//console.log('option === ',option);
			this.videoId = option.videoId;
			this.init();
			this.getData();
		},
		onNavigationBarButtonTap() {
			var self = this;
			uni.showActionSheet({
				itemList:["投诉举报"],
				complete(res) {
					if(res.tapIndex == 0){
						self.util.tipOff();
					}
				}
			})
		},
		methods: {
			init() {
				this.videoIndex = 0;
				this.videoContextList = [];
				for (var i = 0; i < this.videoList.length; i++) {
					this.videoContextList.push(uni.createVideoContext('video' + i, this));
				}
				this.videoDataIndex = 0;
			},
			getData() {
				//获取视频列表
				const url = '/memberapi/api/video/videoList.do';
				let data = {};
				this.request.get(url, data).then(res => {
					let currListData = res.list;
					var that = this;
					currListData.forEach((item, index) => {
						if (item.videoPath) {
							let videoPath = JSON.parse(item.videoPath);
							item.videoPath = that.request.getBaseImagePath() + videoPath.filePath;
						}
						//当前点击播放视频下标赋值
						if (item.videoId == that.videoId) {
							that.videoDataIndex = index;
						}
					});
					that.videoDataList = currListData; //添加新数据
					setTimeout(() => {
						that.updateVideo(true);
					}, 200)
				})
			},
			onSwiperChange(e) {
				let currentIndex = e.detail.current;
				if (currentIndex === this.videoIndex) {
					return;
				}

				let isNext = false;
				if (currentIndex === 0 && this.videoIndex === this.videoList.length - 1) {
					isNext = true;
				} else if (currentIndex === this.videoList.length - 1 && this.videoIndex === 0) {
					isNext = false;
				} else if (currentIndex > this.videoIndex) {
					isNext = true;
				}

				if (isNext) {
					this.videoDataIndex++;
				} else {
					this.videoDataIndex--;
				}

				if (this.videoDataIndex < 0) {
					this.videoDataIndex = this.videoDataList.length - 1;
				} else if (this.videoDataIndex >= this.videoDataList.length) {
					this.videoDataIndex = 0;
				}

				this.circular = (this.videoDataIndex != 0);

				if (this.videoIndex >= 0) {
					this.videoContextList[this.videoIndex].pause();
					this.videoContextList[this.videoIndex].seek(0);
				}

				this.videoIndex = currentIndex;

				setTimeout(() => {
					this.updateVideo(isNext);
				}, 200);
			},
			getNextIndex(isNext) {
				let index = this.videoIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.videoList.length - 1;
				} else if (index >= this.videoList.length) {
					return 0;
				}
				return index;
			},
			getNextDataIndex(isNext) {
				let index = this.videoDataIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.videoDataList.length - 1;
				} else if (index >= this.videoDataList.length) {
					return 0;
				}
				return index;
			},
			updateVideo(isNext) {
				this.$set(this.videoList[this.videoIndex], 'src', this.videoDataList[this.videoDataIndex].videoPath);
				this.$set(this.videoList[this.getNextIndex(isNext)], 'src', this.videoDataList[this.getNextDataIndex(isNext)].videoPath);
				var that = this;
				setTimeout(() => {
					that.videoContextList[that.videoIndex].play();
					that.videoContextList[that.getNextIndex(isNext)].pause();
				}, 200);
				//console.log("v:" + this.videoIndex + " d:" + this.videoDataIndex + "; next v:" + this.getNextIndex(isNext) + " next d:" + this.getNextDataIndex(isNext));
			},
			back: function() {
				uni.navigateBack({});
			},
			moreButtonClick: function() {
				var self = this;
				uni.showActionSheet({
					itemList: ["投诉举报"],
					complete(res) {
						if (res.tapIndex == 0) {
							self.util.tipOff();
						}
					}
				})
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.page {
		flex: 1;
		width: 750rpx;
		min-height: 100%;
		display: flex;
	}

	.swiper {
		flex: 1;
		width: 100%;
		height: 100%;
		background-color: #000000;
	}
	.swiper-item {
		flex: 1;
	}
	.video {
		flex: 1;
		/* #ifndef APP-PLUS */
		width: 100%;
		height: 100%;
		/* #endif */
	}
	video {
		width: 750rpx;
		height: 100vh;
	}
</style>
