<template>
	<view class="layout">
		<view class="status-bar" :style="isShowColor?'background-color:#31A2F8;':'background-color:transparent;'"></view>
		<view class="navi-bar" :style="isShowColor?'background-color:#31A2F8;':'background-color:transparent;'">
			<image class="navi-bar-name" src="../../static/img/index/byc.png"></image>
			<view class="search">
				<image class="search-icon" src="../../static/img/index/ss.png"></image>
				<input class="input" type="" maxlength="" placeholder="健身工作室"></input>
			</view>
			<view class="user">
				<image class="img" src="../../static/img/index/dl.png"></image>
				<image class="img" src="../../static/img/index/sm.png"></image>
			</view>
		</view>
		
		<view class="slidebox">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item >
					<image class="slide" mode="aspectFill" src="../../static/img/index/banner.png"></image>
				</swiper-item>
				<swiper-item  >
					<image class="slide" mode="aspectFill" src="../../static/img/index/banner.png"></image>
				</swiper-item>
				<swiper-item >
					<image class="slide" mode="aspectFill" src="../../static/img/index/banner.png"></image>
				</swiper-item>
			</swiper>
			
			<view class="weather">
				<image class="img" src="../../static/img/index/xy.png"></image>
				<text class="number">小雨 18-26℃</text>
				<image class="r-img" @click="goToVr" src="../../static/img/index/vr.png"></image>
			</view>
		</view>
		
		
		
		<!-- 焦点图结束 -->
		<view class="contain">
			<view class="card">
				<view class="card-bd home-icon">
					<navigator url="/pages/index/platform/plateform" hover-class="none" class="item">
						<image class="img" src="/static/img/user/login-bg.png"></image>
						<view>游洪城</view>
					</navigator>
					<navigator hover-class="none" url="/pages/literature/literature"  class="item">
						<image class="img" src="/static/img/user/login-bg.png"></image>
						<view>赏文创</view>
					</navigator>
					<navigator hover-class="none" url="/pages/delicacies/delicacies" class="item">
						<image class="img" src="/static/img/user/login-bg.png"></image>
						<view>品佳肴</view>
					</navigator>
					<navigator hover-class="none" url="/pages/purchase/purchase" class="item">
						<image class="img" src="/static/img/user/login-bg.png"></image>
						<view>购潮货</view>
					</navigator>
					<navigator hover-class="none" url="/pages/science/science" class="item">
						<image class="img" src="/static/img/user/login-bg.png"></image>
						<view>习科普</view>
					</navigator>
					<navigator hover-class="none" url="/pages/sports/sports" class="item">
						<image class="img" src="/static/img/user/login-bg.png"></image>
						<view>健体魄</view>
					</navigator>
				</view>
			</view>
			<!--特色街-->
			<view class="street"  @click="gotoPlayMap"><!-- @tap="toDiscover()" -->
				<image style="width:720rpx;height:136rpx;margin-left: 15rpx;" src="../../static/img/index/tsj.png"></image>
			</view>
			<!--特色街结束-->
			<!-- 功能图标结束 -->
			<view class="news">
				<view class="card">
					<view class="card-bd" @tap="towonderful">
						<image class="img" src="../../static/img/index/jchd.png"></image>
						<view class="txt">
							<text class="title red">南昌名片</text>
							<text class="subtitle">最“劲”的吃喝玩乐购</text>
						</view>
					</view>
				</view>
				<view class="card">
					<view class="card-bd" @tap="toconsult">
						<image class="img" src="../../static/img/index/hdzx.png"></image>
						<view class="txt">
							<text class="title blue">消费资讯</text>
							<text class="subtitle">最全最新资讯信息</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 资讯结束 -->
			<view class="ad">
				<view>
					<image class="img" src="../../static/img/index/gg.png"></image>
				</view>
				<!--
				<view class="ad-slider">
					<image class="img" src="../../static/img/index/zt.png"></image>
				</view>
				-->
			</view>
			<!-- 广告结束 -->

		
			<!--tabBars-->
			<!-- <scroll-view style="margin-bottom: 0rpx;" id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view v-for="(tab,index) in tabBars" :key="tab.id" class="index-tab" :id="tab.id" :data-current="index" @click="ontabtap">
					<view class="item" :class="tabIndex==index ? 'active' : ''">{{tab.name}}</view>
				</view>
			</scroll-view> -->
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="true" style="background: #F2F2F2;">
				<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}<text
						 :class="tabIndex==index ? 'line' : ''"></text></text>
				</view>
			</scroll-view>
			
			<!-- tabBars结束 -->
			<view class="tabcon" style="margin-top: -30rpx;">
				<view class="ht-card card" @click="toscenicDetail">
					<view class="card-bd">
						<view class="ct-list">
							<image class="img" src="/static/img/scenic/2.png"></image>
							<view class="righttxt">
								<view class="name">厚田沙漠生态旅游景区</view>
								<view class="score">
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx3.png"></image>
									<text class="number">4.5分</text>
									<text class="number">人均¥67</text>
								</view>
								<view class="locale font24"><text style="color: #989898">新建区厚田乡南部（丰厚收费站旁）</text> </view>
								<view class="coupon coupon2">
									<view class="display-column">
										<text style="color: #666;" class="yw font-14">南昌厚田沙漠成人门票</text>
										<text class="yw" style="color: #999;">
											<text style="color: #ff6600;">￥25</text>
											<text class="left-style">门市价￥27 已售5194</text>
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="ht-card card" @click="toDetail">
					<view class="card-bd">
						<view class="ct-list">
							<image class="img" src="/static/img/hotel/3.jpg"></image>
							<view class="righttxt">
								<view class="name">锦江之星品尚(南昌高新艾溪湖店)</view>
								<view class="score">
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx3.png"></image>
									<image class="stars" src="../../static/img/index/xx1.png"></image>
									<text class="number">5分</text>
									<text class="number">¥67/人</text>
								</view>
								<view class="locale font24"><text style="color: #989898">青山湖区金圣路2号（近金圣工业科技园）</text> </view>
								<view class="locale font24 "><text class="canary-yellow">南昌市酒店热门榜第八名</text> </view>
							</view>
						</view>
					</view>
				</view>
				<view class="ht-card card">
					<view class="card-bd">
						<view class="ct-list">
							<image class="img" src="/static/img/hotel/1.png"></image>
							<view class="righttxt">
								<view class="name">维珍天使酒店(八一大桥铜锣湾广场店)</view>
								<view class="score">
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx3.png"></image>
									<image class="stars" src="../../static/img/index/xx1.png"></image>
									<text class="number">4.4分</text>
									<text class="number">好</text>
								</view>
								<view class="locale font24"><text style="color: #989898">东湖区丰和北大道丰和时代大厦</text> </view>
								<view class="locale font24 "><text class="canary-yellow">南昌市酒店热门榜第十九名</text> </view>
							</view>
						</view>
					</view>
				</view>
				<view class="ht-card card">
					<view class="card-bd">
						<view class="ct-list">
							<image class="img" src="/static/img/scenic/4.png"></image>
							<view class="righttxt">
								<view class="name">梅岭狮子峰</view>
								<view class="score">
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx2.png"></image>
									<image class="stars" src="../../static/img/index/xx1.png"></image>
									<text class="number">3.9分</text>
									<text class="number">人均¥51</text>
								</view>
								<view class="locale font24"><text style="color: #989898">湾里区梅岭狮子峰</text> </view>
								<view class="coupon coupon2">
									<view class="display-column">
										<text style="color: #666;" class="yw font-14">南昌梅岭狮子峰成人票</text>
										<text class="yw" style="color: #999;">
											<text style="color: #ff6600;">￥42.2</text>
											<text class="left-style">门市价￥45 已售7202</text>
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!--list开始
				<view class="inner" v-for="(tab,index) in tabList" :key="tab.id" :id="tab.id">
					<view class="store-cell">
						<image class="img" :src="tab.tabimg" />
						<view class="righttxt">
							<view class="name">{{tab.tabname}}</view>
							<view class="score" v-if="tab.tabscore">
							
								<block v-for="(score,scoreIndex) in tab.tabscore" :key="scoreIndex">
									<image class="img" :src="score.img" />
								</block>
								<text class="number">{{tab.tabnumber1}}</text>
								<text class="number">{{tab.tabnumber2}}</text>
							</view>
							<view><text class="label">{{tab.tablabel1}}</text> <text class="label">{{tab.tablabel2}}</text></view>
							<view class="comment">{{tab.tabcomment}}</view>
							<view class="label">{{tab.tablabel3}}</view>
							<view class="coupon" v-if="tab.tabcoupon.tablabel4">
								<view class=""><label class="mark red">{{tab.tabcoupon.tablabel4}}</label><text class="label">{{tab.tabcoupon.tablabel5}}</text></view>
								<view class=""><label class="mark yellow">{{tab.tabcoupon.tablabel6}}</label><text class="label">{{tab.tabcoupon.tablabel4}}</text></view>
							</view>
						</view>
					</view>
				</view>
				list结束-->
			</view>
			<!-- tab列表结束 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowColor: false,
				gradientColor: "transparent",
				tabIndex: 0,
				tabBars: [{
					name: '推荐',
					id: 'tuijian'
				}, {
					name: '附近',
					id: 'fujin'
				}, {
					name: '美食',
					id: 'meishi'
				}, {
					name: '旅行',
					id: 'lvxing'
				}, {
					name: '演艺',
					id: 'yanyi'
				}, {
					name: '购物',
					id: 'gouwu'
				}, {
					name: '培训',
					id: 'peixun'
				}, {
					name: '学校',
					id: 'xuexiao'
				}, {
					name: '休闲',
					id: 'xiuxian'
				}],
				tabList: [{
						id: 1,
						tabimg: '/static/img/index/store.png',
						tabname: 'C2酒吧',
						tabscore: [{
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx1.png'
						}],
						tabnumber1: '51条',
						tabnumber2: '183/人',
						tablabel1: '夜店',
						tablabel2: '福州路28号',
						tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
						tablabel3: '休息中 11:00营业',
						tabcoupon: {
							tablabel4: '券',
							tablabel5: '90代100元',
							tablabel6: '团',
							tablabel4: '238元3-4人餐',
						}
					},
					{
						id: 2,
						tabimg: '/static/img/index/store.png',
						tabname: 'C2酒吧',
						//tabscore:[{img:'/static/img/index/xx2.png'},{img:'/static/img/index/xx2.png'},{img:'/static/img/index/xx2.png'},{img:'/static/img/index/xx1.png'}],
						tabnumber1: '52条',
						tabnumber2: '148/人',
						tablabel1: '夜店',
						tablabel2: '福州路28号',
						tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
						tablabel3: '休息中 11:00营业',
						tabcoupon: {
							tablabel4: '券',
							tablabel5: '90代100元',
							tablabel6: '团',
							tablabel4: '238元3-4人餐',
						}
					},
					{
						id: 3,
						tabimg: '/static/img/index/store.png',
						tabname: 'C2酒吧',
						tabscore: [{
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx1.png'
						}],
						tabnumber1: '53条',
						tabnumber2: '158/人',
						tablabel1: '夜店',
						tablabel2: '福州路28号',
						tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
						tablabel3: '休息中 11:00营业',
						tabcoupon: {

						}
					}
				]

			}
		},
		onLoad() {
			this.setupLaunchGuide();
		},
		onPageScroll(e) {
			this.isShowColor = e.scrollTop >= 104 ? true : false;
		},
		methods: {
			
			setupLaunchGuide:function(){
				if (!(uni.getStorageSync("launchGuide") === "hide")) {
					uni.reLaunch({
						url:"../launchGuide/launchGuide"
					})
				}
				
			},
			toconsult() {
				uni.navigateTo({
					url: "../consult/consult"
				})
			},toDiscover:function(){
				uni.switchTab({
					url:'../discover/discover'
				})
			},towonderful:function(){
				uni.navigateTo({
					url:'../wonderful/wonderful'
				})
			},
			toDetail(){
				uni.navigateTo({
					url:"../hotel/hotelDetail"
				})
			},
			toscenicDetail(){
				uni.navigateTo({
					url:"../scenic/scenicDetail"
				})
			},
			goToVr(){
				uni.navigateTo({
					url:'../webView/webView?webUrl=https://vr.chinavryan.com//tour/35c8ddf4cf676fad'+'&webTitle='
				});
			},
			gotoPlayMap:function(){
				uni.navigateTo({
					url:"../playMap/playMap"
				})
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.tabIndex = index;
				this.switchTab(index);
			},
			switchTab(index) {
				if (index == 0) {
					this.tabList = [{
							id: 1,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '51条',
							tabnumber2: '183/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {
								tablabel4: '券',
								tablabel5: '90代100元',
								tablabel6: '团',
								tablabel4: '238元3-4人餐',
							}
						},
						{
							id: 2,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							//tabscore:[{img:'/static/img/index/xx2.png'},{img:'/static/img/index/xx2.png'},{img:'/static/img/index/xx2.png'},{img:'/static/img/index/xx1.png'}],
							tabnumber1: '52条',
							tabnumber2: '148/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {
								tablabel4: '券',
								tablabel5: '90代100元',
								tablabel6: '团',
								tablabel4: '238元3-4人餐',
							}
						},
						{
							id: 3,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '53条',
							tabnumber2: '158/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {

							}
						}
					]
				} else if (index == 1) {
					this.tabList = [{
						id: 1,
						tabimg: '/static/img/index/store.png',
						tabname: 'C2酒吧',
						tabscore: [{
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx2.png'
						}, {
							img: '/static/img/index/xx1.png'
						}],
						tabnumber1: '51条',
						tabnumber2: '183/人',
						tablabel1: '夜店',
						tablabel2: '福州路28号',
						tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
						tablabel3: '休息中 11:00营业',
						tabcoupon: {
							tablabel4: '券',
							tablabel5: '90代100元',
							tablabel6: '团',
							tablabel4: '238元3-4人餐',
						}
					}, ]
				} else if (index == 2) {
					this.tabList = [{
							id: 1,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '51条',
							tabnumber2: '183/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {
								tablabel4: '券',
								tablabel5: '90代100元',
								tablabel6: '团',
								tablabel4: '238元3-4人餐',
							}
						},
						{
							id: 2,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '53条',
							tabnumber2: '158/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {

							}
						}
					]
				} else if (index == 3) {
					this.tabList = [{
							id: 1,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '51条',
							tabnumber2: '183/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {
								tablabel4: '券',
								tablabel5: '90代100元',
								tablabel6: '团',
								tablabel4: '238元3-4人餐',
							}
						},
						{
							id: 2,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '53条',
							tabnumber2: '158/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {

							}
						}
					]
				} else if (index == 4) {
					this.tabList = [{
							id: 1,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '51条',
							tabnumber2: '183/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {
								tablabel4: '券',
								tablabel5: '90代100元',
								tablabel6: '团',
								tablabel4: '238元3-4人餐',
							}
						},
						{
							id: 2,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '53条',
							tabnumber2: '158/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {

							}
						}
					]
				} else if (index == 5) {
					this.tabList = [{
							id: 1,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '51条',
							tabnumber2: '183/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {
								tablabel4: '券',
								tablabel5: '90代100元',
								tablabel6: '团',
								tablabel4: '238元3-4人餐',
							}
						},
						{
							id: 2,
							tabimg: '/static/img/index/store.png',
							tabname: 'C2酒吧',
							tabscore: [{
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx2.png'
							}, {
								img: '/static/img/index/xx1.png'
							}],
							tabnumber1: '53条',
							tabnumber2: '158/人',
							tablabel1: '夜店',
							tablabel2: '福州路28号',
							tabcomment: '附近这家环境很好的其他美食店等你拔草哦附近这家环境很好的其他美食店等你拔草哦',
							tablabel3: '休息中 11:00营业',
							tabcoupon: {

							}
						}
					]
				}
			}
		}
	}
</script>

<style>
	
	/* 状态栏高度 */
	.status-bar {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		top:0;
		z-index: 3;
	} 
	.navi-bar{
		width:100%;
		display: flex;
		height:88rpx;
		box-sizing: border-box;
		position: fixed;
		top:var(--status-bar-height);
		z-index: 4;
		align-items:center;
	}
	.navi-bar-name{
		width:94rpx;
		height:32rpx;
		margin: 0rpx 20rpx;
	}
	.search-icon{
		width:30rpx;
		height:30rpx;
		left:18rpx;
		top:18rpx;
	}
	
	.navi-bar .search{
		width:450rpx;
		position: relative;
	}
	.navi-bar .search .input{
		width:100%;
		height:60rpx;
		background:rgba(0,0,0,0.29);
		border-radius: 8rpx;
		font-size:26rpx;
		padding-left:60rpx;
	}
	.navi-bar .search .search-icon{
		width:30rpx;
		height:30rpx;
		position: absolute;
		left:18rpx;
		top:18rpx;
	}
	.navi-bar .user{
		width:130rpx;
		display: flex;
	}
	.navi-bar .user .img{
		width:46rpx;
		height:44rpx;
		display: inline-block;
		margin-left:20rpx;
	}

	/* tabbar */
	.uni-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		margin-right: 42rpx;
	}
	.uni-tab-item-title {
		color: #555;
		font-size: 32rpx;
		height: 45rpx;
		line-height: 45rpx;
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	.uni-tab-item:first-child {
		margin-left: 35rpx;
	}
	.uni-tab-item-title-active {
		color: #31A2F8;
	}
	.uni-tab-item-title-active .line {
		width: 48rpx;
		height: 6rpx;
		line-height: 1;
		display: block;
		background: #31A2F8;
		border-radius: 2rpx;
		position: relative;
		margin: auto;
		top: 6rpx;
	}
	.scroll-h {
		width: 750rpx;
		height: 68rpx;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		background: #FFFFFF;
	}
	.scroll-h.fixed {
		position: fixed;
		background: #FFFFFF;
		top: 88rpx;
		margin-top: var(--status-bar-height);
		left: 0;
		right: 0;
		z-index: 100;
	}

</style>
