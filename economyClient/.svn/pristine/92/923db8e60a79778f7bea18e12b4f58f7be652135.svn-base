<template>
	<view class="page fillorder">
		<view class="topdetail">
			<!-- 滑动图片 -->
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in detailImagePath" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="price-bar">
				<text class="price">￥{{productsData.minSalePrice}}</text>
				<text class="noprice">￥{{productsData.marketPrice}}</text>
			</view>
			<view class="name">
				{{productsData.productName}}
			</view>
			<view class="brand">
				<text class="label">品牌</text>
				<text class="brand-name">{{productsData.brandName}}</text>
			</view>
		</view>
		<view class="detail-cell">
			<text class="label">保障</text>
			<view class="detail-cell-bd"><text class="txt">假一赔一</text><text class="txt" style="padding-left: 10rpx;">极速退款</text></view>
		</view>
		<view class="detail-cell uni-cell-b detail-cell-nomargin" @click="showModel">
			<text class="label">选择</text>
			<view class="detail-cell-bd arrow-right"><text class="txt" style="margin-right: 20rpx;" v-for="(item,index) in productModelList" :key="index">{{item.modelName}}</text></view>
		</view>
		<view class="detail-cell">
			<text class="label">数量</text>
			<view class="detail-cell-bd">
				<view class="order-cell-right" style="text-align: right;">
					<view class="number">
						<text class="reduce" :class="productNum > 1?'active':''" @tap="reduce()">-</text><!-- 数量可以减少时class增加active -->
						<input class="input" v-model="productNum" />
						<text class="add" @tap="add()">+</text>
					</view>
				</view>
			</view>
		</view>
		<view class="tabbox detail-tab">
			<view class="tab" style="background-color: #FFFFFF;">
				<view class="item" :class="detailIndex == 1?'active':''" @click="detailClick(1)"><text>图文详情</text><text class="bt-line"></text></view>
				<view class="item" :class="detailIndex == 2?'active':''" @click="detailClick(2)"><text>商品参数</text><text class="bt-line"></text></view>
				<!-- <view class="item" :class="detailIndex == 3?'active':''" @click="detailClick(3)"><text>评论</text><text class="bt-line"></text></view> -->
			</view>
		</view>
		<view class="tab-con" v-if="detailIndex ==1" style="background-color: #FFFFFF;">
			<rich-text style="padding: 10rpx 40rpx; color: #7C7C7C;line-height:1.5;" :nodes="productsData.shortDescription"></rich-text>
			<view class="tab-con-img">
				<image :src="item" mode="aspectFit" v-for="(item,index) in detailImagePath" :key="index"></image>
			</view>
		</view>
		<view class="tab-con" v-else-if="detailIndex == 2" style="background-color: #FFFFFF;">
			<view class="tab-con-img" >
				<view class="parameter" style="padding-top:0;">
					<view class="title">规格参数</view>
					<view class="parameter-bd">
						<view class="trlist" v-for="(item,index) in productsAttrList" :key="index">
							<view class="name">{{item.attributeName}}</view>
							<view class="nature">{{item.attributeValue}}</view>
						</view>
					</view>
				</view>
				<!-- <view class="parameter" style="padding-top:0;">
					<view class="title">包装售后</view>
					<view class="parameter-bd" style="border:none;">
						<view class="parameter-item">
							<view class="title"><text class="txt">包装清单</text></view>
							<view class="parameter-item">
								包装内容包装内容
							</view>
						</view>
						<view class="parameter-item">
							<view class="title"><text class="txt">售后服务</text></view>
							<view class="parameter-item">
								服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明
							</view>
						</view>
						<view class="parameter-item">
							<view class="title"><text class="txt">价格说明</text></view>
							<view class="parameter-item">
								服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<view class="tab-con" v-else>
			评论
			<view class="tab-con-img">
				<image src="/static/img/mall/spxq_twxq@2x.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="cu-bar">
			<view class="left">
				<view class="shop" @tap="toShop()" style="width: 50%;">
					<view class="shopicon" style="margin-right: 24rpx;"></view>
					<text>店铺</text>
				</view>
				<view class="shopcart" style="width: 50%;" @tap="toCart()">
					<view class="shopcarticon" style="margin-right: 26rpx;"></view>
					<text>购物车</text>
				</view>
				<!-- <view class="collect">
					<view class="collecticon"></view>
					<text>收藏</text>
				</view> -->
			</view>
			<view class="right">
				<view class="btn addcart" @click="addCart">加入购物车</view>
				<view class="btn buy" @click="buy">立即购买</view>
			</view>
		</view>
		<!-- 选择颜色 -->
		<uni-popup ref="popup" type="bottom">
		<view class="floatlayer">
			<view class="inner">
				<view class="close" @tap="closePopup()"><!-- <image class="icon" src="../../static/img/common/icon_delete.png"></image> --></view>
				<view class="pro uni-cell-b">
					<view class="imgbox">
						<image class="img" :src="selectModelData.imagePath"></image>
					</view>
					<view class="pro-bd">
						<view class="price price-bar">
							<text class="price">￥{{selectModelData.price}}</text>
							<text class="noprice">￥{{productsData.marketPrice}}</text>
						</view>
						<view class="number">库存{{selectModelData.stockNum}}件</view>
						<view class="choices">已选：{{selectModelData.modelName}}</view>
					</view>
				</view>
				<view class="classify">
					<view class="title">规格</view>
					<view class="classify-bd">
						<view class="classifylist" v-for="(item,index) in productModelList" :key="index" @click="clickModel(item,index)">
							<view class="classifylist-bd" :class="selectModelIndex == index ? 'active' : ''">
								<image class="icon" :src="item.imagePath"></image>{{item.modelName}}
							</view>
						</view>
					</view>
					<view class="classify-bd fillorder classify-bd-flex">
						<view class="title">数量</view>
						<view class="number">
							<text class="reduce" :class="productNum > 1?'active':''" @tap="reduce()">-</text><!-- 数量可以减少时class增加active -->
							<input class="input" v-model="productNum" />
							<text class="add" @tap="add()">+</text>
						</view>
					</view>
					<view class="f-btnbar" v-if="operateType > 0">
						<view class="btn" @click="submitOrder(operateType)">确定</view>
					</view>
					<view class="f-btnbar" v-else>
						<view class="btn btn-join" @click="submitOrder(1)">加入购物车</view>
						<view class="btn" @click="submitOrder(2)">立即购买</view>
					</view>
				</view>
			</view>
		</view>
		</uni-popup>
	</view>
</template>

<script>
	import swiperBanner from "@/components/swiper-banner/swiper-banner.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			swiperBanner,
			uniPopup
		},
		data() {
			return {
				productsData:{},
				productId:'',
				shopId:'',
				modeIndex: 3,
				current: 0,
				productNum:1,
				mode: 'nav',
				productModelList:[],
				productsAttrList:[],
				detailIndex:1,
				detailImagePath:[],
				selectModelFlag:false,
				selectModelIndex:0,
				selectModelData:{},
				operateType:0,
				dotStyle: true
			}
		},
		onLoad(e) {
			if(e.productId){
				this.productId = e.productId;
				this.readDetail();
			}
		},
		methods: {
			readDetail: function() {
				//获取商家信息
				const url = '/memberapi/api/products/read.do';
				let sendDate = {
					productId: this.productId
				};
				this.request.get(url, sendDate).then(res => {
					this.productsData = res.data;
					this.shopId = res.data.shopId;
					if (res.data.imagePaths) {
						this.detailImagePath = this.util.formatImagePaths(res.data.imagePaths);
						this.productsData.imagePaths = JSON.parse(res.data.imagePaths);
					}
					if(res.data.productModelList){
						this.productModelList = res.data.productModelList
						this.productModelList.forEach(item => {
							item.imagePath = this.util.formatImagePath(item.imagePath);
						});
						this.selectModelData = this.productModelList[0];
					}
					if(res.data.productsAttrList){
						this.productsAttrList = res.data.productsAttrList
					}
					//console.log("this.detailImagePath: " + JSON.stringify(this.detailImagePath));
				});
			},
			submitOrder(type){
				let that = this;
				if(type){
					this.operateType = type;
				}
				if(this.request.alreadyLogin()){
					if(this.operateType ==1){//添加购物车
						//获取商家信息
						const url = '/memberapi/api/shoppingCarts/add.do';
						let sendDate = {
							productId: this.productId,
							shopId:this.shopId,
							skuId:this.selectModelData.modelId,
							quantity:this.productNum
						};
						this.request.post(url, sendDate).then(res => {
							that.request.toastTips("添加成功");
							that.$refs.popup.close();
						});
						
					}else if(this.operateType ==2){//立即购买
						uni.navigateTo({
							url:'productOrder?modelId='+this.selectModelData.modelId+"&productNum="+this.productNum
						})
					}
				}
			},
			toShop(){
				uni.navigateTo({
					url:'/pages/purchase/purchaseDetail?shopId='+this.shopId
				})
			},
			toCart(){
				if(this.request.alreadyLogin()){
					uni.navigateTo({
						url:'/pages/purchase/shoppCart?shopId='+this.shopId
					})
				}
			},
			reduce:function(){
				this.productNum--;
				if(this.productNum < 1){
					this.productNum =1;
				}
			},
			add:function(){
				this.productNum++;
				if(this.productNum > 99){
					this.productNum = 99;
				}
			},
			addCart(){
				this.operateType = 1;
				this.$refs.popup.open();
			},
			buy(){
				this.operateType = 2;
				this.$refs.popup.open();
			},
			showModel(){
				this.operateType = 0;
				this.$refs.popup.open();
			},
			closePopup(){
				this.$refs.popup.close();
			},
			clickModel(item,index){
				this.selectModelIndex = index;
				this.selectModelData = item;
			},
			detailClick(index){
				this.detailIndex = index;
			}
		}
	}
</script>

<style>
	@import "../../common/css/mall.css";
	
	.tower-swiper {
		height: 560upx;
		position: relative;
		max-width: 750upx;
		overflow: hidden;
	}
	.swiper-box{
	    height: 528rpx;
	}
	.fillorder .number .reduce{
		color:rgba(230, 231, 233, 1);
		border:1rpx solid rgba(230, 231, 233, 1);
	}
	.fillorder .number .reduce.active{
		color:rgba(255, 154, 65, 1);
		border:1rpx solid rgba(255, 154, 65, 1);
	}
	.fillorder .number .add{
		background: rgba(255, 154, 65, 1);
		color:#fff;
		border:1rpx solid rgba(255, 154, 65, 1);
	}
	.tab-con{
		padding:20rpx 0 0 0;
	}
	.cuIcon-service,.cuIcon-service2,.cuIcon-service3{
		position: relative;
	}
	.cuIcon-service:before {
		width:36rpx;
		height:36rpx;
		/* background-image: url('~@/static/img/common/arrow_right.png'); */
	    background:url(~@/static/img/mall/dp.png) no-repeat;
		display: inline-block;
		content: " ";
		background-size:36rpx 36rpx ;
	}
	.cuIcon-service2:before {
		background:url(~@/static/img/mall/gwc.png) no-repeat;
		display: inline-block;
	}
	.cuIcon-service3:before {
		background:url(~@/static/img/mall/sc.png) no-repeat;
		display: inline-block;
	}
	
	.screen-swiper {
	    min-height: 600rpx;
	}
</style>
