<template>
	<view>
		<view v-if="strategyList.length" class="column">
			<view class="column-title" v-show="isShowMore"><text class="txt">{{falltitle}}</text><text class="right-more" @click="gotoMoreStrategy()">更多>></text></view>
			<view class="masonry">
				<view class="item" v-for="(item,index) in strategyList" :key="index" @click="gotoStategyDetail(item)">
					<view class="item_content content-lar">
						<view class="imgbox">
							<view class="address" v-if="item.shopNames ">
								<image class="icon" src="/static/img_new/common/dingwei2.png"></image>{{item.shopNames}}
							</view>
							<image class="img"  v-if="item.thumbnailPath && item.thumbnailPath.length > 0 " :src="item.thumbnailPath[0]" mode="widthFix"></image>
						</view>
						<view class="txt">
							<view class="item-title font28 txt-cut">
								<image class="icon" src="/static/img_new/play/y_huati@3x.png"></image>
								<text class="fontcolor-blue">{{item.guideTitle}}</text>
							</view>
							<view class="title-con txt-cut-two">{{item.guideIntroduction}}</view>
							<view class="bottom-bar">
								<view class="userbox font24">
									<view class="userimg">
										<image class="img" :src="item.photo" mode="aspectFill"></image>
									</view>
									<text class="name txt-cut">{{item.userName}}</text>
								</view>
								<view class="font24">
									<image class="icon-dz" src="/static/img_new/common/dianzan@3x.png"></image><text>{{item.likeNum}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="no-data-view" style="height: 200rpx;line-height: 200rpx;">暂无数据</view>
	</view>

</template>

<script>
	export default {
		props: {
			typeId: {
				type:[String,Number],
				default:''
			},
			isShowMore:{
				type:Boolean,
				default:true
			},
			userType:{
				type:[String,Number],
				default:'3'
			}
		},
		
		data() {
			return {
				strategyList:[],
				falltitle: '攻略推荐'
			}
		},
	
	
	
	created	() {
		if(this.typeId == 6){
			this.falltitle = '一起运动'
		}else if(this.typeId == 4){
			this.falltitle = '用户精选'
		}
		this.queryStrategyList(this.typeId)
	},
	watch:{
		typeId(newTypeId,oldTypeId){
			this.queryStrategyList(newTypeId);
		}
	},
	methods: {
		queryStrategyList(typeid) {
			const url = '/memberapi/api/guide/list.do';
			let that=this;
			let data = {
				pageNo: 1,
				pageSize: 10,
				guideType: typeid, //游洪城1
				userType: that.userType
			};
			this.request.get(url, data,false).then(res => {
				// console.log(res)
				res.list.forEach(item => {
					if (item.thumbnailPath) {
						//item.thumbnailPath = this.util.formatImagePath(item.thumbnailPath);
						item.thumbnailPath = this.util.formatImagePaths(item.thumbnailPath);
					}
					// 直接格式化，没有photo的话会使用默认的占位图
					item.photo = this.util.formatUserImage(item.photo);
					if (item.guideDetail) {
						item.guideDetail = item.guideDetail.replace(/<\/?.+?>/g, "");
					}
				});
				this.strategyList = res.list;
			})
		},
		
		
		// 更多攻略
		gotoMoreStrategy: function() {
			uni.navigateTo({
				url:"/pages/strategy/strategySearch?guideType="+ this.typeId +"&userType="+this.userType
			})
		},
		
		// 攻略详情
		gotoStategyDetail: function(item) {
			uni.navigateTo({
				url:"/pages/strategy/strategyDetail?guideId="+item.guideId+'&guideType='+ this.typeId
			})
		}
	},
	
}
	
</script>

<style lang="scss">
	/*其他scss */
	@import "../../../common/css/other_new.scss";
	
	.masonry {
		padding: 0 30rpx !important;
	}
</style>
