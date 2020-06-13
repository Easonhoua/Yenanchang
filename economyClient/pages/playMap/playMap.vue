<template>
	<view class="content-white">
		 <!-- :style="mapHeightStyle" -->
		<map class="map" :latitude="centerLatitude" :longitude="centerLongitude" :markers="markers" show-location scale="12"
		  @markertap="markerTap" @callouttap="calloutTap"></map>

		<swiper v-if="markers.length" class="list-swiper" next-margin="80rpx" previous-margin="80rpx" :current="swiperCurrent" @change="swiperChange">
			<swiper-item v-for="(item,index) in markers" :key="index">
				<view class="list-item-view" @click="swiperListItemClick(item)">
					<view class="list-item-leftView">
						<view class="list-item-name map-line-limit">{{item.tradeName?item.tradeName:'--'}}</view>
						<view class="list-item-address map-line-limit">{{item.tradeTheme?item.tradeTheme:'--'}}</view>
						
					</view>
					<view class="list-item-rightView">
						<!-- :src="imagePrefix + item.imagePath" -->
						<image class="list-item-image " :src="item.thumbnailPath" mode="aspectFill"></image>
						<!-- <view class="list-item-toView"></view> -->
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<view v-else class="list-swiper">
			<view class="display-column" style="justify-content: center;align-items: center;">
				<image style="width: 130rpx;height: 130rpx;margin-top: 30rpx;" src="http://www.mescroll.com/img/mescroll-empty.png?v=1"></image>
				<text style="color: #007AFF;">暂无此分类数据</text>
			</view>
		</view>
		
		<!-- 底部分类 -->
		<scroll-view class="menu scroll-h" scroll-x="true" show-scrollbar="true">
			<view class="menu-item" v-for="(item,index) in menuList" :key="index" @click="menuItemClick(index,item.typeId)">
				<view :class="index === menuSelectIndex?'menu-select-btn':'menu-normal-btn' ">{{item.typeName}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				centerLatitude: 28.683095, //显示选中的marker坐标的经度
				centerLongitude: 115.913536, //显示选中的marker坐标的维度
				allList: [],
				hotelList: [],
				freeList: [],
				studyList:[],
				sportList:[],
				scenicList: [],
				shopList:[],
				foodList:[],
				showList:[],
				cultureList:[],
				allRelationArea:[],
				allArea:[],
				hotelArea:[],
				freeArea:[],
				studyArea:[],
				sportArea:[],
				scenicArea:[],
				shopArea:[],
				foodArea:[],
				showArea:[],
				cultureArea:[],
				swiperCurrent: 0,
				menuSelectIndex: 0, //默认为全部
				markers: [],
				menuList: [{"typeId":0,"typeName":"全部"}],
				imagePrefix: "",
				// mapHeightStyle: "" ,//地图的高度样式，要动态计算，不能写死
				isFirstRequest:true,
			}
		},

		onLoad() {
			this.setupData();
			this.getAllTypeData();
		},

		methods: {
			//获取全部商圈信息
			getAllTypeData:function(){
				const url = '/memberapi/api/platform/queryTradeList.do';
				let data = {};
				var that = this;
				this.request.get(url,data).then(res=>{
					var self = this;
					res.list.forEach(item => {
						if(item.thumbnailPath){
							item.thumbnailPath = self.util.formatImagePath(item.thumbnailPath);
						}
						if(item.mainTypeId == 1){
							self.foodArea.push(item);
						}else if (item.mainTypeId == 2) {
							self.hotelArea.push(item);
						}else if(item.mainTypeId == 3){
							self.showArea.push(item);
						}else if(item.mainTypeId == 4){
							self.freeArea.push(item);
						}else if(item.mainTypeId == 5){
							self.studyArea.push(item);
						}else if(item.mainTypeId == 6){
							self.sportArea.push(item);
						}else if(item.mainTypeId == 7){
							self.scenicArea.push(item);
						}else if(item.mainTypeId == 8){
							self.shopArea.push(item);
						}else{
							self.cultureArea.push(item);
						}
					});
					self.getAllMapData();
				})
			},
			setupData: function() {
				const url = '/memberapi/api/platform/queryTradeMainType.do';
				let data = {};
				var that = this;
				this.request.get(url,data).then(res=>{
					if(res.returncode == 0){
						this.menuList = this.menuList.concat(res.list);
					}else{
						uni.showToast({
							icon:'',
							title:"获取商圈主分类出错",
						})
					}
				})
				// try {
				//     const res = uni.getSystemInfoSync();
				// 	var windowHeight = res.windowHeight;
				// 	var scale = res.windowWidth / 375.0;
				// 	var mapH = parseInt(windowHeight - 160 * scale); //160为底部swiperh和menu的高度之和320rpx 也就是160px 
				// 	// if(res.statusBarHeight >= 44 && res.platform === "ios")//IOS 刘海屏机型
				// 	// {
				// 	// 	mapH = parseInt(windowHeight  - 160 * scale);
				// 	// }
				// 	this.mapHeightStyle = "height:" + mapH + "px" + ";";
				// 	//console.log("this.mapHeightStyle = ",this.mapHeightStyle);
				// } catch (e) {
				//     // error
				// }	
			},
			
			getAllMapData:function(){
				this.foodList = this.createMarker(1,this.foodArea);
				this.hotelList = this.createMarker(2, this.hotelArea);
				this.showList = this.createMarker(3,this.showArea);
				this.freeList = this.createMarker(4, this.freeArea);
				this.studyList = this.createMarker(5, this.studyArea);
				this.sportList = this.createMarker(6, this.sportArea);
				this.scenicList = this.createMarker(7, this.scenicArea);
				this.shopList = this.createMarker(8,this.shopArea);	
				this.cultureList = this.createMarker(9,this.cultureArea);
				this.allList = this.foodList.concat(this.hotelList).concat(this.showList).concat(this.freeList).concat(this.studyList).concat(this.sportList).concat(this.scenicList).concat(this.shopList).concat(this.cultureList);
				this.markers = this.allList;
			},
			//生成标注点 type->标注点类型
			createMarker: function(type, list) {
				if(list.length ==0) return[];
				let selectIconPathArray = ['0',
					/* '/static/img/playMap/all_tip_icon.png', */
					'/static/img/playMap/foods_tip_icon.png',
					'/static/img/playMap/hotel_tip_icon.png',
					'/static/img/playMap/show_tip_icon.png',
					'/static/img/playMap/free_tip_icon.png',
					'/static/img/playMap/study_tip_icon.png',
					'/static/img/playMap/sport_tip_icon.png',
					'/static/img/playMap/scenic_tip_icon.png',
					'/static/img/playMap/shop_tip_icon.png',
					'/static/img/playMap/culture_tip_icon.png',
				];
				let markerList = [];
				let calloutBgColors = [/* "rgba(254,74,45,1)", */"rgba(252,161,16,1)","rgba(20,199,241,1)","rgba(228,90,90,1)","rgba(57,132,253,1)","rgba(11,177,141,1)","rgba(255,130,62,1)", "rgba(62,190,64,1)","rgba(255,92,147,1)","rgba(103,147,43,1)"];
				for (let i = 0; i < list.length; i++) {
					let marker = list[i];
					marker.id = i + type * 2000;
					marker.type = type;
					marker.longitude = parseFloat(marker.coordinateLng); //113.445031;//
					marker.latitude = parseFloat(marker.coordinateLat); //29.456141;//
					/* //console.log("marker.longitude ==",marker.longitude);
					//console.log("marker.latitude ==",marker.latitude);
					this.centerLongitude = marker.longitude;
					this.centerLatitude = marker.latitude; */
					if (i == 0) {
						this.centerLatitude = marker.latitude;
						this.centerLongitude = marker.longitude;
						this.swiperCurrent = i;
					}
					marker.title = marker.tradeName;
					/* marker.normalIconPath = normalIconPathArray[type], */
					marker.selectIconPath = selectIconPathArray[type];
					marker.iconPath = marker.selectIconPath;
					marker.width = 35;
					marker.height = 60;
					marker.callout = {
						content: marker.title,
						color: '#FFFFFF',
						fontSize: 12,
						borderRadius: 6,
						bgColor: calloutBgColors[type - 1],
						padding: 8,
						// display : 'ALWAYS'
						display: (i == 0 && type === 1) ? 'ALWAYS' : 'BYCLICK', //'BYCLICK':点击显示; 'ALWAYS':常显
					};
					//排除掉没有填写经纬度的数据
					if (marker.longitude > 0 && marker.latitude > 0) {
						markerList.push(marker);
					}
				}
				return markerList;
			},

			// 标注点的点击事件
			markerTap: function(e) {
				//console.log('makermaker === ', e);
				// 遍历一遍markerList
				for (let i = 0; i < this.markers.length; i++) {
					let marker = this.markers[i];
					if (marker.id === e.detail.markerId) {
						this.swiperCurrent = i;
					}
					// marker.iconPath = (marker.id === e.detail.markerId) ? marker.selectIconPath : marker.normalIconPath;
				}
			},

			//标注点上面的气泡点击事件 
			calloutTap: function(e) {
				//console.log('calloutTap === ', e);
			},
			//swiper滑动事件
			swiperChange: function(e) {
				//遍历将所有的marker图标显示为未选中状态下的图标
				// for (let marker of this.markers) {
				// 	marker.iconPath = marker.normalIconPath;
				// }
				let index = e.detail.current;
				this.swiperCurrent = index;//注意一定要修改swiperCurrent否则底部按钮点击是设置swiperCurrent无效
				//将当前的marker的图标显示未选中状态下的图标
				let currentMarker = this.markers[index];
				// currentMarker.iconPath = currentMarker.selectIconPath;
				if(currentMarker){
					this.centerLatitude = currentMarker.latitude;
					this.centerLongitude = currentMarker.longitude;
				}
			},
			//列表Item的点击事件
			swiperListItemClick: function(item) {
				uni.navigateTo({
					url: '/pages/discover/discoverAbout?tradeId='+item.tradeId+'&coordinate='+item.coordinate
				})
			},
			//底部menuItem的点击事件
			menuItemClick: function(index,typeId) {
				this.menuSelectIndex = index;
				var selectMarkers = [this.allList,this.foodList,this.hotelList,this.showList,this.freeList,this.studyList,this.sportList,this.scenicList,this.shopList,this.cultureList];
				this.markers = selectMarkers[typeId];
				//遍历将所有的marker图标显示为未选中状态下的图标
				// for (let marker of this.markers) {
				// 	marker.iconPath = marker.normalIconPath;
				// }
				// currentMarker.iconPath = currentMarker.selectIconPath;
				
				if(this.markers.length){
					var currentMarker = this.markers[0]; //取第1个元素
					this.centerLatitude = currentMarker.latitude;
					this.centerLongitude = currentMarker.longitude;
				}
				this.swiperCurrent = 0;
			}
		}
	}
</script>

<style>
	/* 地图 */
	.map {
		
		width: 750rpx;
		/* 地图高度要动态计算不能写死 -320rpx为底部swiper和按钮的总高度 */
		height: calc(-320rpx + 100vh);
	}
	/* 左右滑动的list-swiper */
	.list-swiper {
		position: absolute;
		bottom: 100rpx;
		width: 750rpx;
		height: 220rpx;
		background-color: #FFFFFF;
	}
	.list-item-view {
		display: flex;
		flex-direction: row;
		width: 570rpx;
		margin: 20rpx 10rpx;
		height: 180rpx;
		border: 1rpx solid #EEEEEE;
		box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.08);
		background-color: #42917A;
	}
	.list-item-leftView {
		width: 560rpx;
		height: 140rpx;
		margin: 20rpx 0rpx 20rpx 20rpx;
		line-height: 10rpx;
	}
	.list-item-rightView {
		width: 150rpx;
		height: 140rpx;
		margin: 20rpx;
	}
	.list-item-name {
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		-webkit-line-clamp: 1;
		text-overflow: clip;
		overflow: hidden;
		height: 80rpx;
		font-size: 32rpx;
		font-weight: 500;
		line-height: 40rpx;
		color: lightgrey;
	}
	.list-item-score {
		font-size: 26rpx;
		color: lightgrey;
	}
	.list-item-address {
		height: 52rpx;
		margin-top: 10rpx;
		font-size: 26rpx;
		line-height: 27rpx;
		color: lightgrey;
	}
	.list-item-image {
		/* width: 150rpx; */
		/* height: 140rpx; */
		width: 140rpx;
		height: 140rpx;
	}
	.list-item-toView {
		width: 40rpx;
		height: 40rpx;
		background: #39B54A;
		margin: 0rpx 0rpx 0rpx 100rpx;
	}
	/* 底部菜单 */
	.menu {
		flex-wrap: nowrap;
		white-space: nowrap;
		position: absolute;
		bottom: 0rpx;
		height: 100rpx;
		background-color: white;
		border-top: 1rpx solid #EEEEEE;
	}
	.menu-item {
		margin-left: 20rpx;
		margin-right: 20rpx;
		height: 96rpx;
		line-height: 96rpx;
		font-size: 30rpx;
		color: #000000;
		display: inline-block;
		flex-wrap: nowrap;
		text-align: center;
		justify-content: center;
		align-content: center;
	}
	.menu-normal-btn {
		width: 80rpx;
		height: 94rpx;
		color: #000000;
	}
	.menu-select-btn {
		width: 80rpx;
		height: 86rpx;
		color: #0081FF;
		border-radius: 8rpx;
		border-bottom: 6rpx solid #0081FF;
	}
	.map-line-limit{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		max-width: 368rpx;
	}
</style>
