<template>
	<view>
		<view class="teambuy-top" v-if="arderPackagesList && arderPackagesList.length>0"></view>
		<view class="teambuy" v-if="arderPackagesList && arderPackagesList.length>0">
			<view class="title">
				<text class="txt">团购</text>
				<view class="title-bd"><text class="label">随时退</text><text class="label">过期自动退</text></view>
			</view>
			<view class="teambuy-cell" v-for="(item,index) in arderPackagesList" :key="index" @click="toDetail(item.packagesId)">
				<view class="imgbox">
					<image :src="item.thumbnailPath"></image>
				</view>
				<view class="teambuy-cell-bd">
					<text class="name">{{item.packagesName}}</text>
					<view class="pricebox">
						<view class="left">
							<text class="price">￥{{item.packagesPrice}}</text>
							<text class="noprice">￥{{item.marketPrice}}</text>
						</view>
						<view class="right">
							<view class="btn">购买</view>
						</view>
					</view>
				</view>
			</view>
		</view> 
	</view>
	 
</template>

<script>
	export default {
		props: {
			shopId: {
				type:[String,Number],
				default:''
			},
			
		},
		data() {
			return {
				arderPackagesList:[]
			}
		},
		created() {
			this.queryArderPackagesList()
		},
		methods: {
			queryArderPackagesList() {
				let that = this;
				let url = '/memberapi/api/arderPackages/queryArderPackagesList.do';
				let data = {
					shopId: that.shopId, //标签
				};
				that.request.get(url, data).then(res => {
					that.arderPackagesList = res.list;
					console.log(res.list)
					that.arderPackagesList.forEach(item => {
						if (item.thumbnailPath) {
							let thumbnailPath = JSON.parse(item.thumbnailPath);
							if (thumbnailPath.filePath_220) {
								item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath_220;
							} else {
								item.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath;
							}
						}
					});
				})
			},
			
			//套餐详情
			toDetail:function(packagesId){
				uni.navigateTo({
					url:'arderDetail?packagesId='+packagesId
				})
			}
		}
	}
</script>

<style>

</style>
