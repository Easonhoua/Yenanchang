<template>
	<view class="layout" style="background-color: #FFFFFF;padding-bottom: 120rpx;">
		<view class="slidebox">
			<swiper  class="swiper"  circular   :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in imgarr" :key="index" @click="readPicture(iindex)">
					<image class="image" :src="item"  mode="aspectFill"></image>
					<view class="pageinfo">
						{{index + 1}}/{{ imglength }}
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="Article">
			<text class="articleTitle">{{ curdetailData.topicTitle }}</text>
			<view class="tipsInfo">
				<view v-if="curdetailData.address" class='address'>{{ curdetailData.address }} <view v-if="curdetailData.areaAddress" class="shu"></view>{{ curdetailData.areaAddress  }}</view>
				<text class="dateTime">{{ curdetailData.publishTime }} 222222222</text>
			</view>	
			<view class="topicLabel">
				#{{ curdetailData.dynamicRemark }}#
			</view>
			<!-- <view class="articlecontent">
				<view class="square left1"></view>
				<view class="transverse left2"></view>
				<text class="contentwords">{{ curdetailData.topicRemark }}</text>
				<view class="square right1"></view>
				<view class="transverse right2"></view>
			</view> -->
		</view>
		
		<!-- #ifdef 0  -->
		<!-- 注释掉写死的假数据 -->
		<view class="likes">
			<view class="likesbtn">
				<image class="loveimg" src="../../../static/img_new/topic/h_tl_sc_pre.png"></image>
				<text class="likenum">{{ curdetailData.attendNum }}人喜欢</text>
			</view>
			<view class="likesPerson">
				<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
				<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
				<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
				<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
				<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
				<image class="personitemimg" src="../../../static/img_new/topic/h_user@3x.png"></image>
			</view>
		</view>
		<view class="asidecontent">
			<image class="leftimg" src=""></image>
			<view class="centercontent">
				<text class="asideTitle"> 手工手做</text>
				<view class="score">
					<RateStar class="rate" :value="4.6" :size="16" activeColor="#E8541E"></RateStar>
					<text >4.6分</text>
				</view>
				<text class="renjunxiaofei">人均消费：30元/人</text>
				<text class="haopinglu">好评率：100</text>
				<view class="location">
					<image class="dingweiimg" src="../../../static/img_new/topic/position@3x.png"></image>
					<text class="addresstxt">300米｜西湖区万达广场</text>
				</view>
			</view>
			<view class="rightphone">
				<image class="phoneimg" src="../../../static/img_new/topic/s_dh@3x.png"></image>
			</view>
		</view>
		
		<view class="pinglun">
			<view class="pingluntxt"><text>评论 </text><text class="plnum"> (2)</text></view>
			<view class="pinglunlist">
				<view class="pinglunitem">
					<view class="itemtop">
						<image class="touxiang" src="../../../static/img_new/topic/h_user@3x.png"></image>
						<view class="nameTime">
							<view class="username">丽丽</view>
							<view class="time">23秒前</view>
						</view>
						<image class='islike' src='../../../static/img_new/topic/h_sc@3x.png'></image>
						<image class='huifu' src='../../../static/img_new/topic/fb_pl1.png'></image>
					</view>
					<view class="contenttxt">
						最近它又更新了一键海淘的功能，支持国外主流购物网站，就算你没有双币信用卡，没有国外账号
					</view>
				</view>
				
				<view class="pinglunitem">
					<view class="itemtop">
						<image class="touxiang" src="../../../static/img_new/topic/h_user@3x.png"></image>
						<view class="nameTime">
							<view class="username">丽丽</view>
							<view class="time">23秒前</view>
						</view>
						<image class='islike' src='../../../static/img_new/topic/h_sc@3x.png'></image>
						<image class='huifu' src='../../../static/img_new/topic/fb_pl1.png'></image>
					</view>
					<view class="contenttxt">
						最近它又更新了一键海淘的功能，支持国外主流购物网站，就算你没有双币信用卡，没有国外账号
					</view>
					
					
					<view class="asidehuifu">
				
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="bottombtn">
			<image class="editimg samesize" src="../../../static/img_new/topic/add_comment.png"></image>
			<input class="inpt" placeholder="写评论" placeholder-style="color: #cccccc;text-indext: 5px;"/>
			<image class="liuyanimg samesize" src="../../../static/img_new/topic/fb_pl2.png"></image>
			<text class="pinglunnum">2</text>
			<image class="loveimg samesize" src="../../../static/img_new/topic/h_tl_sc_pre.png"></image>
			<image class="starimg samesize" src="../../../static/img_new/topic/fb_sc.png"></image>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import RateStar from "@/components/uni-rate/uni-rate";
	export default {
		components: {
			RateStar
		},
		data() {
			return {
				curdetailData:{},
				imglength:'',
				imgarr:[]
			}
		},
		
		onLoad(e) {
			const url = '/memberapi/api/topicDynamic/read.do';
			let data = {
				dynamicId: e.dynamicId,
			};
			var that = this;
			this.request.get(url, data).then(res => {

				var resData = res.data;
				var imgarr = []
				imgarr = this.util.formatImagePaths(resData.dynamicImg);
				this.imglength = imgarr.length
				this.imgarr = imgarr
				this.curdetailData = resData
			})
		},
		methods: {
			readPicture:function(index){
				uni.previewImage({
					urls:this.imgarr,
					current:index
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.pageinfo{
		width: 112rpx;
		height: 62rpx;
		background: #000000;
		color: #ffffff;
		text-align: center;
		line-height: 62rpx;
		border-radius: 31rpx;
		position: absolute;
		right: 60rpx;
		bottom: 38rpx;
	}
	.swiper{
		height: 750rpx;
	}
	.image{
		height: 750rpx;
	}
	
	.Article{
		margin-top: 26rpx;
		width: 100%;
		padding: 0 44rpx;
		box-sizing: border-box;
		
		.articleTitle{
			font-size:48rpx;
			font-weight:600;
			color:rgba(51,51,51,1);
			line-height:66rpx;
			margin-bottom: 26rpx;
		}
		
		.tipsInfo{
			width: 100%;
			display: flex;
			margin-top: 16rpx;
			margin-bottom: 20rpx;
			.address{
				font-size: 28rpx;
				color:rgba(51,51,51,1);
				display: flex;
				align-items: center;
				line-height: 42rpx;
				margin-right: 24rpx;
				.shu{
					display: inline-block;
					width: 4rpx;
					height: 24rpx;
					background: #cccccc;
					margin: 0 10rpx;
				}	
			}
			
			.dateTime{
				font-size: 28rpx;
				color: #9B9B9B;
			}
		}
		.topicLabel{
			font-size:30rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(40,73,129,1);
			line-height:42rpx;
			margin-bottom: 20rpx;
		}
		.articlecontent{
			width: 100%;
			padding: 48rpx 0;
			position: relative;
			
			
			.contentwords{
				font-size:36rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:60rpx;
			}
			
			.square{
				width: 20rpx;
				height: 20rpx;
				border: 1rpx solid #999999;
				transform: rotate(-45deg)
			}
			.transverse{
				width: 144rpx;
				height: 2rpx;
				background: #cccccc;
			}
			
			
			.left1{
				position: absolute;
				left: 0;
				top: 0;
			}
			.left2{
				position: absolute;
				top: 10rpx;
				left: 20rpx;
			}
			
			.right1{
				position: absolute;
				right: 0;
				bottom: 0;
			}
			.right2{
				position: absolute;
				right: 20rpx;
				bottom: 10rpx;
			}
		}
	}
	.likes{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 80rpx;
		padding-bottom: 50rpx;
		border-bottom: 1rpx solid #eeeeee;
		.likesbtn{
			width: 234rpx;
			height: 80rpx;
			border-radius: 40rpx;
			background: #eeeeee;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 48rpx;
			.loveimg{
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
			.likenum{
				color: #F24724;
				font-size: 32rpx;
			}
		}
		
	}
	.likesPerson{
		// width: 100%;
		display: flex;

		.personitemimg{
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			margin-left: -10rpx;
		}
	}
	
	.asidecontent{
		width: 100%;
		padding: 32rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-bottom: 20rpx solid #eeeeee;
		.leftimg{
			width: 190rpx;
			height: 230rpx;
			background: #F1F8FF;
			margin-right: 32rpx;
		}
		.centercontent{
			display: flex;
			flex-direction: column;
			margin-right: 46rpx;
			.asideTitle{
				font-size:34rpx;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:48rpx;
				margin-bottom: 10rpx;
			}
			.score{
				display: flex;
				font-size:26rpx;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:36rpx;
				margin-bottom: 10rpx;
				display: flex;
				align-items: center;
				
			}
			.renjunxiaofei,.haopinglu{
				font-size:24rpx;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:34rpx;
				margin-bottom: 10rpx;
			}
			.location{
				display: flex;
				align-items: center;
				.dingweiimg{
					width: 22rpx;
					height: 26rpx;
					margin-right: 20rpx;
				}
				.addresstxt{
					font-size:28rpx;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:38rpx;
				}
			}
		}
		.rightphone{
			margin-top: 40rpx;
			padding-left: 30rpx;
			height: 46rpx;
			border-left: 1rpx solid #E6E6E6;
			display: flex;
			align-items: center;
			.phoneimg{
				width: 30rpx;
				height: 31rpx;
			}
		}
		
	}
	
	.pinglun{
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
		
		.pingluntxt{
			font-size: 36rpx;
			color: #333333;
			.plnum{
				padding-left: 20rpx;
				color: #999999;
			}
		}
		.pinglunlist{
			width: 100%;
			.pinglunitem{
				margin: 30rpx 0 18rpx 0;
				.itemtop{
					display: flex;
					align-items: center;
					position: relative;
					.touxiang{
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 38rpx;
					}
					
					.nameTime{
						.username{
							font-size: 36rpx;
							color: #333333;
						}
						.time{
							font-size: 24rpx;
							color: #999999;
						}
					}
					
					.islike{
						width: 40rpx;
						height: 35rpx;
						position: absolute;
						right: 100rpx;
						top: 18rpx;
					}
					.huifu{
						width: 36rpx;
						height: 36rpx;
						position: absolute;
						right: 0;
						top: 18rpx;
					}
				}
			}
		}
		.contenttxt{
			
			padding: 20rpx 0 0 120rpx;
			font-size:32rpx;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:60rpx;
		}
	}

	.bottombtn{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #ffffff;
		padding: 0 24rpx 0 34rpx;
		box-sizing: border-box;
		
		
		.editimg{
			margin-right: 10rpx;
		}
		.samesize{
			width: 44rpx;
			height: 44rpx;
		}
		.inpt{
			margin-right: 16rpx;
		}
		.liuyanimg{
			margin-right: 4rpx;
		}
		.pinglunnum,.loveimg{
			margin-right: 80rpx;
		}
		
	}
</style>
