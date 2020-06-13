<script>
	export default {
		globalData: {
			guide: [],//启动页
			main: [],//首页
			map:[],
			plateform: [],//游洪城
			literature: [],//赏文创
			delicacies: [],//品佳肴
			purchase: [],//购潮货
			science: [],//习科普
			sports: [],//健体魄
			superMarket:[],//购潮货-超市
			purchaseRecommend:[],//购潮货-商家推荐
			publish:[],//发布
			longtitude: '115.857963', //经纬度
			latitude: '28.683016',
			ad: {}//开机广告
		},
		onLaunch: function() {
			let _this = this;
			var url = "/memberapi/api/bannerPicture/list.do";
			var data = {}
			 _this.request.get(url, data, null, false).then(res => {
					_this.images = [];
					//console.log(111)
					for (let item of res.list) {
						item.photo = _this.util.formatImagePath(item.photo);
						if (item.bannerType == "1") {//启动页
							_this.globalData.guide.push(item.photo);
						} else if (item.bannerType == "2") {//首页
							_this.globalData.main.push(item);
						} else if (item.bannerType == "3") {//游洪城
							_this.globalData.plateform.push(item);
						} else if (item.bannerType == "4") {//赏文创
							_this.globalData.literature.push(item);
						} else if (item.bannerType == "5") {//品佳肴
							_this.globalData.delicacies.push(item);
						} else if (item.bannerType == "6") {//购潮货
							_this.globalData.purchase.push(item);
						} else if (item.bannerType == "7") {//习科普
							_this.globalData.science.push(item);
						} else if (item.bannerType == "8") {//健体魄
							_this.globalData.sports.push(item);
						} else if (item.bannerType == "9") {//开机广告
							this.globalData.ad.photo = item;
							uni.setStorage({
								key:'globalDataAd',
								data:item
							})
						} else if (item.bannerType == "10") {//地图
							_this.globalData.map.push(item);
						} else if (item.bannerType == "11") {//购潮货-超市
							_this.globalData.superMarket.push(item);
						}else if (item.bannerType == "12") {//购潮货-商家推荐
							_this.globalData.purchaseRecommend.push(item);
						}else if(item.bannerType == "13"){//发布
							_this.globalData.publish.push(item);
						}
					}
				});
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						_this.globalData.longtitude = res.longitude;
						_this.globalData.latitude = res.latitude;
					},
					fail(res) {
						console.log("res = ",res);
					}
				});
				uni.onTabBarMidButtonTap(function() {
					uni.navigateTo({
						url: "/pages/publish/releaseList",
						animationType: 'slide-in-bottom'
					})
				});
		},
		onShow: function() {
			
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	@import "common/css/app.css";
	@import "common/css/app_new.css";
	@import "common/css/main.css";
	/*每个页面公共scss */
	@import "common/css/common.scss";
	/*局部通用模块scss */
	@import "common/css/mould.scss";
	/* 富文本图片显示问题修改 */
	uni-rich-text img {
		max-width: 100% !important;
	}
	/* #endif */
</style>
