<template>
	<view class="submitOrder teambuy-detail teambuydetail" v-if="ticketData">
		<view class="order-cellbox">
			<view class="order-cell-top">
				<view class="order-cell-imgbox"><image :src="ticketData.thumbnailPath"></image></view>
				<view class="order-cell-bd">
					<view class="name" style="font-size: 32rpx;color: #4A4A4A;">{{ticketData.ticketName?ticketData.ticketName:'--'}}</view>
					<view class="tip" style="margin-top: 10rpx;margin-bottom: 0rpx;">入园时间：{{ticketData.enterTimeStart?ticketData.enterTimeStart:'待定'}}-{{ticketData.enterTimeEnd?ticketData.enterTimeEnd:'待定'}}</view>
					<text style="font-size: 28rpx;" v-if="ticketData.discountPrice > 0">￥{{ticketData.discountPrice}}</text>
					<text style="font-size: 28rpx;" v-else >免费</text>
				</view>
			</view>
		</view>
		<view class="order-cellbox" v-if="shopsData">
			<view class="teambuy-ticket" style="height: auto;">
				<view class="teambuy-ticket-inner">
					<view style="color: #989898;font-size: 28rpx;height: 60rpx;line-height: 200%;">开放时间：<text style="color: #4A4A4A;">{{shopsData.startShopHours?shopsData.startShopHours:'待定'}}-{{shopsData.endShopHours?shopsData.endShopHours:'待定'}}（仅供参考）</text>
					<image class="icon navigation" src="/static/img/common/location.png" @tap="toAddress(shopsData)"></image>
					<image class="icon phone" src="/static/img/common/phone.png"  @tap="toPhone(shopsData.shopsPhone)"></image>
					</view>
					<view class="addresstxt" style="color: #989898;line-height: 200%;">景区地址：<text style="color: #4A4A4A;">{{shopsData.address?shopsData.address:'--'}}</text></view>
				</view>
			</view>
		</view>
		<view class="order-cellbox">
			<view class="teambuy-ticket" style="padding-top: 30rpx;padding-bottom: 30rpx;">
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">订单编号：</text><text class="order-describe">{{orderData.orderId?orderData.orderId:'--'}}</text></view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">下单时间：</text><text class="order-describe">{{orderData.orderDate?orderData.orderDate:'--'}}</text></view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">订单状态：</text><text class="order-describe">{{orderData.orderStatusName?orderData.orderStatusName:'--'}}</text></view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">支付方式：</text><text class="order-describe">{{orderData.paymentTypeName?orderData.paymentTypeName:'--'}}</text></view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">支付时间：</text><text class="order-describe">{{orderData.payDate?orderData.payDate:'--'}}</text></view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">购买数量：</text><text class="order-describe">{{orderData.itemList[0].buyNum?orderData.itemList[0].buyNum:'--'}}</text></view>
				</view>
			</view>
		</view>
		<view class="buydetail">
			<view class="inner">
				<view class="buydetail-cell">
					<view class="label" style="color:rgba(152, 152, 152, 1)">商品总额</view>
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="rightttxt price">{{orderData.orderTotalAmount}}元</text>
						</view>
					</view>
				</view>
				<view class="buydetail-cell" v-if="orderData.orderStatus==1">
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<!-- <text class="lefttxt bloc">合计:</text>
							<text class="rightttxt price">{{orderData.orderTotalAmount}}元</text> -->
							<button class="go-pay" @tap="toPayment">去付款</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="card-bd column">
			<view style="margin-left: 20rpx;margin-bottom: 10rpx; font-size: 36rpx;font-weight: bold;">为你推荐</view>
			<view class="ht-card card">
				<view class="card-bd">
					<view class="ct-list" @click="toDetail(shopsData.shopId)">
						<image class="img" :src="shopsData.thumbnailPath"></image>
						<view class="righttxt">
							<view class="name">{{shopsData.shopName?shopsData.shopName:'--'}}</view>
							<view class="score">
								<uni-rate :value="shopsData.score" disabled="true" size="14" style="display: inline-flex; margin-right: -20rpx;"></uni-rate>
								<text class="number yd">{{shopsData.score}}分</text>
								<text class="number">{{shopsData.commentNum}}条评论</text>
							</view>
							<view class="locale font24" style="margin-left: -10rpx;">
								<text>{{shopsData.keyword?shopsData.keyword:'暂无景区关键字'}}</text>
							</view>
							<view class="coupon coupon2" style="margin-top: -12rpx;">
								<view class=""><text class="yd">{{shopsData.scenicFreeFlag == 1 ? '免费' : '¥ '+shopsData.discountPrice+' 起'}}</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import peripheryListComponent from "@/components/peripheryList-component/peripheryList-component.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	export default {
		components: {
			peripheryListComponent,
			uniRate
		},
		data() {
			return {
				orderData:{
					orderId:''
				}, //订单信息
				ticketData:{}, //门票信息
				shopsData:{}, //店铺信息
			}
		},
		onLoad(option) {
			if(option.orderId){
				this.orderData.orderId = option.orderId;
				if(this.request.alreadyLogin()){
					this.queryOrderData(option.orderId);
				}
			}
			var _this=this;
			uni.$on("payCallback",function(params){
			    this.queryOrderData(_this.orderData.orderId);
			});
		},
		onUnload() {
			uni.$off("payCallback");
		},
		methods: {
			//查询订单详情信息
			queryOrderData:function(orderId){
				let url = '/memberapi/api/orders/readByItem.do';
				let data = {
					orderId: orderId, //订单编号
				};
				var that = this;
				that.request.post(url, data).then(res => {
					if(res.returncode == 0){
						//console.log(">>>>>>>>>>>>",res.data);
						that.orderData = res.data;
						that.queryShopsData(that.orderData.shopId); //查询店铺信息
						if(res.data && res.data.itemList){
							that.queryTicketData(res.data.itemList[0].productId); //查询门票信息
						}
					}
				})
			},
			//查询活动信息
			queryTicketData:function(ticketId){
				let url = '/memberapi/api/ticket/read.do';
				let data = {
					ticketId: ticketId, 
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						that.ticketData = res.data;
						//获取门票头图
						if(that.ticketData && that.ticketData.thumbnailPath){
							that.ticketData.thumbnailPath = that.util.formatImagePath(that.ticketData.thumbnailPath);
						}
					}
				})	
			},
			//查询景区商家信息
			queryShopsData:function(shopId){
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId, 
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						that.shopsData = res.data;
						if(res.data.thumbnailPath){
							that.shopsData.thumbnailPath = that.util.formatImagePath(that.shopsData.thumbnailPath);
						}
					}
				})	
			},
			//地址
			toAddress: function(shopsData) {
				uni.openLocation({
					longitude: Number(shopsData.coordinateLng),
					latitude: Number(shopsData.coordinateLat),
					name: shopsData.shopName,
					address: shopsData.address
				})
			},
			//打电话
			toPhone: function(shopsPhone) {
				if(shopsPhone){
					uni.makePhoneCall({
						phoneNumber: shopsPhone,
						success: () => {
							//console.log("成功拨打电话");
						}
					})
				}else{
					uni.showToast({
						title:'暂无联系电话'
					})
				}
			},
			//退款详情
			applyRefund:function(){
				uni.navigateTo({
					url:'applyRefund?orderId='+this.orderData.orderId
				})
			},
			toDetail:function(shopId){
				uni.navigateTo({
					url:"scenicDetail?shopId="+shopId
				})
			},
			toPayment:function(){
				let _this = this;
				uni.redirectTo({
					url:"/pages/payment/payment?orderId="+_this.orderData.orderId+'&payTotalAmount='+_this.orderData.orderTotalAmount
				});
			}
		}
	}
</script>

<style>
	.submitOrder .order-cell-top:after {
	    content: " ";
	    position: absolute;
	    left: 0;
	    top: 0;
	    right: 0;
	    height: 1px;
	    border-bottom:none;
		border-top:1rpx solid rgba(0, 0, 0, 0.1);
	    color: rgba(0, 0, 0, 0.1);
	    -webkit-transform-origin: 0 0;
	    -ms-transform-origin: 0 0;
	    transform-origin: 0 0;
	    -webkit-transform: scaleY(0.5);
	    -ms-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    z-index: 2;
	}
	.order-describe{
		color: #4A4A4A;
	}
	.go-pay{
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #FF871C;
		font-size: 30rpx;
		color: #FFFFFF;
		border-color: rgba(255,135,28,1);
	}
	.order-cellbox .teambuy-ticket .teambuy-ticket-inner {
		padding: 10rpx 30rpx;
	}
</style>
