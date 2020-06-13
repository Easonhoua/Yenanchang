<template>
	<view class="page scenic food">
		<view class="header">
			<image class="icon" src="../../../static/img_new/scenic/h_fh.png"></image>
			<view class="right-icon">
				<image class="icon" src="../../../static/img_new/scenic/h_sc.png"></image>
				<image class="icon" src="../../../static/img_new/scenic/h_fx.png"></image>
				<image class="icon" src="../../../static/img_new/scenic/h_gd.png"></image>
			</view>
		</view>
		<view class="top-banner">
			<view class="tag">"牛油果寿司"</view>
			<image class="img" src="../../../static/img_new/food/f_banner@3x.png"></image>
		</view>
		<view class="scenic-infor">
			<view class="inner">
				<view class="name">
					<text class="txt">森田精致料理(万达广场店)</text><view class="total">4.5<text class="min">分</text></view>
				</view>
				<view class="tip">
					<view class="left">
						<text class="txt">日本料理</text>
						<text class="txt">人均￥107</text>
					</view>
					<text class="comment">229条点评 ></text>
				</view>
				<view class="explain">
					<view class="name">美食林臻选</view>
					前厅后厨完全分隔，环境舒适的烧烤店。
				</view>
				<view class="addressbox line-bottom">
					<view class="left">
						<view class="address">
							<image class="icon" src="../../../static/img_new/food/f_dw@3x.png"></image>
							<text class="txt">怡园路与凤凰中大道交叉口（名门世家西门)</text>
						</view>
					</view>
					<view class="right">
						<view>
							<image class="icon" src="../../../static/img_new/food/f_dh@3x.png"></image>
							<view>导航</view>
						</view>
						<view>
							<image class="icon" src="../../../static/img_new/food/f_lx@3x.png"></image>
							<view>电话</view>
						</view>
					</view>
				</view>
				<view class="addressbox line-bottom">
					<view class="left">
						<view class="address">
							<image class="icon" src="../../../static/img_new/food/f_yy@3x.png"></image>
							<text class="txt">营业时间 周一至周日 17:30-02:00</text>
						</view>
					</view>
				</view>
				<view class="addressbox line-bottom">
					<view class="left">
						<view class="address ticketpurchase">
							<image class="icon" src="../../../static/img_new/food/f_dz@3x.png"></image>
							<text class="txt">提前订座</text>
						</view>
					</view>
					<view class="right">
						<view class="btn">订座</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tab">
			<view class="item active">推荐菜</view>
			<view class="item">评价</view>
			<view class="item">推荐</view>
		</view>
		<view class="tab-con">
			<view class="commentlist">
				<view class="title line-bottom">
					<view class="txt">推荐菜</view>
				</view>
				<view class="">
					<scroll-view class="near-scroll" scroll-x="true">
					<view class="item" v-for="(item,index) in nearList" :key="index" @tap="toActivityDetail(item.activityId)">
						<view class="sort">TOP2</view>
						<image class="img"  mode="aspectFill"></image>
						<view class="title">{{item}}</view>
					</view>
					</scroll-view>
				</view>
				<view class="user-rec">
					<view class="subtitle">网友推荐(29)</view>
					<scroll-view class="near-scroll" scroll-x="true">
					<view class="item" v-for="(item,index) in nearList" :key="index" @tap="toActivityDetail(item.activityId)">
						<view class="name">多肉葡萄</view>
						<view class="number"><image class="icon" src="../../../static/img_new/food/f_zan@3x.png"></image>129人推荐</view>
					</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="tab-con">
			<view class="commentlist">
				<view class="title">
					<view class="txt"><text class="dp-number">229条点评 ></text>总评价<text class="score">4.5</text></view>
					
				</view>
				<view class="list">
					<view class="user">
						<image class="userlogo" src="../../../static/img_new/scenic/user.png"></image>
						<view class="righttxt">
							<view class="name"><text>依然等待</text><view class="tag">点评家</view></view>
							<view class="score">
								<image class="icon" src="../../../static/img_new/scenic/pl.png">4分 满意</image>
							</view>
						</view>
					</view>
					<view class="txt">
						现在不要门票啦、进去玩什么项目再买票这样比较好、旺季的时候人真多啊哪个都要排队、停车现在10块钱一下午、 不即时了，真不错、我喜欢看里面表演。
					</view>
					<view class="imagebox">
						<image class="img" src="../../../static/img_new/scenic/img1.png"></image>
						<image class="img" src="../../../static/img_new/scenic/img1.png"></image>
						<image class="img" src="../../../static/img_new/scenic/img1.png"></image>
					</view>
				</view>
				<view class="comment-more line-top">
					查看全部79条点评
				</view>
			</view>
		</view>
		
		<view class="tab-con">
			<view class="commentlist recommend">
				<view class="title">
					<view class="txt">周边推荐</view>
				</view>
				<view class="list">
					<view class="imgbox">
						<image class="img" src="../../../static/img_new/scenic/img4.png"></image>
					</view>
					<view class="righttxt">
						<view class="name">江户前日本料理</view>
						<view class="score"><text class="label">4.5分</text><text class="label">11条点评分</text><text class="tag">美食林臻选分</text></view>
						<view class="category"><text class="label">寿司</text><text class="label">日本料理</text><text class="label">228元/人</text></view>
						<view class="distance">距景区229m</view>
					</view>
				</view>
				<view class="list">
					<view class="imgbox">
						<image class="img" src="../../../static/img_new/scenic/img4.png"></image>
					</view>
					<view class="righttxt">
						<view class="name">江户前日本料理</view>
						<view class="score"><text class="label">4.5分</text><text class="label">11条点评分</text><text class="tag">美食林臻选分</text></view>
						<view class="category"><text class="label">寿司</text><text class="label">日本料理</text><text class="label">228元/人</text></view>
						<view class="distance">距景区229m</view>
					</view>
				</view>
				<view class="list">
					<view class="imgbox">
						<image class="img" src="../../../static/img_new/scenic/img4.png"></image>
					</view>
					<view class="righttxt">
						<view class="name">江户前日本料理</view>
						<view class="score"><text class="label">4.5分</text><text class="label">11条点评分</text><text class="tag">美食林臻选分</text></view>
						<view class="category"><text class="label">寿司</text><text class="label">日本料理</text><text class="label">228元/人</text></view>
						<view class="distance">距景区229m</view>
					</view>
				</view>
				<view class="comment-more line-top">
					查看附近全部美食79条点评
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nearList:["带子","生蚝","带子","生蚝","带子"]
			}
		},
		methods:{
			// 返回
			goBack:function(){
				uni.navigateBack({
				})
			},
			// 展开全部
			gotoAllDetail:function(){
				uni.navigateTo({
					url:"/pages/newPage/playLine/details2"
				})
			}
		}
		
	}
</script>

<style lang="scss">
	/*其他scss */
	@import "../../../common/css/other_new.scss";
	.near-scroll{
		overflow: hidden;
		white-space: nowrap;
		.item{
			width:250rpx;
			height:167rpx;
			display: inline-block;
			margin-right:20rpx;
			position: relative;
			.img{
				width:250rpx;
				height:167rpx;
				border-radius: 10rpx;
			}
			.title{
				width:100%;
				position: absolute;
				bottom:-16rpx;
				text-align: center;
				color:#fff;
			}
			.sort{
				padding:5rpx 10rpx;
				background: linear-gradient(to right bottom, #ef3d40 , #f95e86);
				color:#fff;
				font-size:20rpx;
				border-radius: 10rpx 0 0 0;
				position: absolute;
				top:0;
				left:0;
				z-index: 3;
			}
		}
		}
</style>
