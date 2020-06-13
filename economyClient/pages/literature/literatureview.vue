<template>
	<view class="content" style="width: 750rpx;">
		<view class="literature-top" style="background-color: #FFFFFF;">
			<view class="literature-top-content">
				<view class="literature-top-left">
					<image class="literature-top-img" :src='programData.thumbnailPath'></image>
				</view>
				<view class="literature-top-right">
					<view class="font-22 font-line-height font-weight-600 ">{{programData.programName}}</view>
					<view class="font-14 font-line-height yd" style="height: 50rpx;">{{programData.isFree== 1?'免费':'¥'+programData.price}}</view>
					<view class="font-10 font-line-height" style="display: flex;justify-content: space-between; text-align: right;margin-top: 10rpx;">
						<view style="text-align: left;">{{programData.shopName}}</view>
						<view>
							<image class="literature-top-right-img" src="/static/img/literature/dh.png"  @tap="gotoMapLocation(programData.coordinateLng,programData.coordinateLat,programData.shopName,programData.address)"></image>
						</view>
					</view>
					<view class="font-10 font-line-height" v-if="programData.openingTimeType == 1">演出时间 {{programData.openingTimeStart}}</view>
					<view class="font-10 font-line-height" v-else>
						<view>演出开始时间 {{programData.openingTimeStart?programData.openingTimeStart:'待定'}}</view>
						<view>演出结束时间 {{programData.openingTimeEnd?programData.openingTimeEnd:'待定'}}</view>
					</view>
					<!-- <view class="font-10 font-line-height" style="text-align: center;color: #31A2F8;">19:00-20:30</view>
					<view class="font-10 font-line-height color-blue" style="color: #4A4A4A;">现场取票</view> -->
				</view>
			</view>
		</view>

		<view class="detail-content">
			<view class="title">演出详情</view>
			<view class="label">
				<rich-text :nodes="programData.details" style="margin-right: 20rpx;"></rich-text>
			</view>
		</view>

		<view class="literature-evaluate" style="margin-bottom: 50rpx;">
			<goodCommentList-component ref='goodCommentList' goodCommentTitle="评论" :shopId="programData.shopId"></goodCommentList-component>
		</view>

		<!-- <view class="bottom-btn-buttom">
			<button class="bottom-btns">购票</button>
		</view> -->
	</view>
</template>

<script>
	import goodCommentListComponent from "@/components/goodCommentList-component/goodCommentList-component.vue"
	export default {
		components: {
			goodCommentListComponent
		},
		data() {
			return {
				programId:'',
				programData:{},
				isFavotite:false,
			}
		},
		onLoad(option){
			if(option.programId){
				this.programId = option.programId;
				this.queryProgramDetail(this.programId);
			}
		},
		methods:{
			queryProgramDetail:function(programId){
				let url = '/memberapi/api/program/readUnion.do';
				let data = {
					programId:programId,
				};
				var that = this;
				this.request.get(url,data).then(res=>{
					if(res.data.thumbnailPath){
						res.data.thumbnailPath = this.util.formatImagePath(res.data.thumbnailPath);
					}
					that.programData = res.data;
					that.programData.details = that.programData.details.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"').replace(/\width: (\d*)px/g,'').replace(/\height: (\d*)px/g,'');
				})
			},
			//地址
			gotoMapLocation:function(coordinateLng,coordinateLat,shopName,address){
				uni.openLocation({
					longitude: Number(coordinateLng),
					latitude: Number(coordinateLat),
					name: shopName,
					address: address
				})
			},
		}
	}
</script>

<style>
	.literature-top {
		max-width: 100%;
		/* height: 322rpx;
		background: linear-gradient(#3378D0,#244E96,#05416F); */
	}

	.literature-top-content {
		display: flex;
		width: 720rpx;
		height: 388rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		margin-left: 15rpx;
	}

	.literature-top-left {
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.literature-top-img {
		width: 223rpx;
		height: 328rpx;
	}

	.literature-top-right {
		margin: 30rpx 44rpx 30rpx 20rpx;
		color: #000000;
	}

	.literature-top-right-img {
		float:right;
		margin-right: 40rpx;
		min-width: 50rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.color-blue {
		width: 95rpx;
		background-color: #CAE8FF;
		border-radius: 4rpx;
		text-align: center;
	}

	.literature-sign {
		display: flex;
		height: 108rpx;
		margin-top: 66rpx;
		line-height: 108rpx;
	}

	.literature-sign .item {
		margin-left: 45rpx;
		font-size: 32rpx;
	}

	.literature-sign .item.active {
		margin-left: 45rpx;
		font-size: 32rpx;
		color: #31A2F8;
	}

	.literature-sign .item.active .line {
		width: 48rpx;
		height: 6rpx;
		line-height: 1;
		display: block;
		background: #31A2F8;
		border-radius: 2rpx;
		position: relative;
		margin: auto;
		top: -15px;
	}

	.literature-discount {
		width: 720rpx;
		height: 165rpx;
		margin-left: 15rpx;
		background-color: #FFFFFF;
		display: flex;
	}

	.literature-discount-content {
		margin: 20rpx 30rpx 20rpx 30rpx;
	}

	.color-orange {
		color: #FF871C;
	}

	.literature-discount-right {
		margin-left: 293px;
		margin-top: -20px;
	}

	.literature-discount-right-button {
		width: 93rpx;
		height: 49rpx;
	}

	.literature-details {
		width: 720rpx;
		line-height: 150%;
		margin-left: 15rpx;
		margin-top: 30rpx;
		background-color: #FFFFFF;
	}

	.literature-notice {
		width: 720rpx;
		height: 225rpx;
		margin-left: 15rpx;
		margin-top: 30rpx;
		background-color: #FFFFFF;
		display: flex;
	}

	.literature-notice-content {
		margin-left: 24rpx;
		margin-top: 15rpx;
	}

	.padding-top-15 {
		padding-top: 30rpx;
	}

	.padding-top-10 {
		padding-top: 20rpx;
	}

	.literature-evaluate {
		width: 720rpx;
		/* height: 479rpx; */
		margin-left: 15rpx;
		margin-top: 30rpx;
		background-color: #FFFFFF;
	}

	.literature-evaluate-content {
		margin-left: 33rpx;
		margin-top: 23rpx;
	}

	.literature-evaluate .inner {
		padding: 30rpx 15rpx;
	}

	.literature-evaluate .user {
		position: relative;
		display: flex;
	}

	.literature-evaluate .user .img {
		width: 68rpx;
		height: 68rpx;
		border-radius: 100% 100%;
		float: left;
		margin-right: 10rpx;
	}

	.literature-evaluate .user .gz {
		width: 200rpx;
		right: 0;
		text-align: center;
		position: absolute;
	}

	.literature-evaluate .user .gz .time {
		font-size: 24rpx;
		color: #929292;
	}

	.literature-evaluate .user .button {
		width: 93rpx;
		height: 33rpx;
		background-color: #31A2F8;
		border-radius: 60rpx;
		font-size: 20rpx;
		text-align: center;
		color: #FFFFFF;
		margin-left: 58rpx;
		margin-top: 3px;
	}

	.literature-evaluate .line-h {
		line-height: 1;
	}

	.literature-evaluate .user .left-txt .name {
		font-size: 28rpx;
		color: #000000;
		display: inline-block;
		padding-top: 5rpx;
		margin-right: 15rpx;
	}

	.literature-evaluate .user .left-txt .label {
		width: 57rpx;
		height: 20rpx;
		line-height: 20rpx;
		background: #E6C036;
		border-radius: 15rpx;
		font-size: 18rpx;
		color: #FFFFFF;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
	}

	.literature-evaluate .user .left-txt .time {
		font-size: 24rpx;
		color: #929292;
	}

	.literature-evaluate .user .left-txt .score .score-img {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
		margin-top: 6rpx;
	}

	.literature-evaluate .txt {
		margin-top: 20rpx;
	}

	.literature-evaluate .imgbox {
		padding: 20rpx 0;
		display: flex;
	}

	.literature-evaluate .imgboxbig {
		padding: 20rpx 0;
		display: flex;
	}

	.literature-evaluate .imgbox .img {
		width: 210rpx;
		height: 212rpx;
		margin-right: 30rpx;
	}

	.literature-evaluate .imgboxbig .img {
		width: 100%;
		height: 268rpx;
		display: flex;
	}

	.literature-evaluate .imgbox .img:last-child {
		margin-right: 0;
	}

	.bottom-btn-buttom {
		margin-top: 30rpx;
		min-height: 50rpx;
	}

	.bottom-btn-buttom .bottom-btns {
		margin: 0 30rpx 19rpx 30rpx;
		width: 690rpx;
		height: 98rpx;
		line-height: 98rpx;
		font-size: 36rpx;
		text-align: center;
		border-radius: 15rpx;
		color: #f8f8f8;
		background-color: #31A2F8;
	}

	.bottom-btn-buttom .bottom-btns:hover {
		background-color: rgba(43, 89, 191, 1);
	}

	.bottom-btn-buttom .bottom-btns:active {
		background-color: rgba(43, 89, 191, 1);
	}
	
	.detail-content{
		width: 100%;
		line-height: 150%;
		margin-top: 14rpx;
		padding: 0rpx 30rpx 0rpx 10rpx;
		background-color: #FFFFFF;
		font-size: 34rpx;
		color: #4A4A4A;
		line-height: 50rpx;
	}
	.detail-content .title{
		color: #4A4A4A; 
		font: 32rpx; 
		margin-left: 16rpx; 
		font-weight: 600;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}
	.detail-content .label{
		font-size:28rpx; 
		color:#000000; 
		text-align:left;
		margin-left:16rpx;
	}
</style>
