2<template>
	<view class="submitOrder teambuy-detail teambuydetail">
		<view class="order-cellbox">
			<view class="order-cell-top">
				<view class="order-cell-imgbox"><image :src="util.formatImagePath(orderData.logo)"></image></view>
				<view class="order-cell-bd">
					<view class="name">{{cashData.cashName}}</view>
					<view class="tip">{{cashData.cashDateTypeName}}</view>
					<text class="">￥{{cashData.discountAmount}}</text>
				</view>
			</view>
		</view>
		<view class="order-cellbox">
			<view class="teambuy-ticket">
				<view class="teambuy-ticket-inner">
					<view class="fontweg">{{shopsData.shopName}}
					<image class="icon navigation" src="/static/img/common/location.png" @tap="toAddress(shopsData)"></image>
					<image class="icon phone" src="/static/img/common/phone.png"  @tap="toPhone(shopsData.shopsPhone)"></image>
					</view>
					<view class="addresstxt">{{shopsData.address}}</view>
				</view>
			</view>
		</view>
		<view class="order-cellbox" v-if="orderData.itemList && orderData.itemList.length > 0">
			<view class="teambuy-ticket">
				<view class="teambuy-ticket-inner teambuy-ticket-inner-line">
					<view>代金券</view>
					<view class="time">有效期至：{{orderData.itemList[0].expiryDate}}</view>
					<view class="btn" v-if="orderData.orderStatus ==1 " @tap="gotoPayment(orderData)">去付款</view>
					<view class="btn" v-if="orderData.orderStatus == 2 && orderData.orderStatus == 13" @tap="applyRefund">申请退款</view>
				</view>
				<view v-if="orderData.orderStatus != 1 && orderData.orderStatus != 202 " class="teambuy-ticket-inner teambuy-ticket-inner-line" v-for="(item,index) in orderData.itemList" :key="index" @tap="toDetail(item.orderItemId)">
					<view class="passwordlist" ><text class="righttxt">{{item.useStatusName}}</text><text class="label">订单号：</text>{{item.orderItemNo}}</view>
				</view>
			</view>
		</view>
		 
		<view class="order-cellbox">
			<view class="teambuy-ticket">
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">订单编号：</text>{{orderData.orderId}}</view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">下单时间：</text>{{orderData.orderDate}}</view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">支付方式：</text>{{orderData.paymentTypeName}}</view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">支付时间：</text>{{orderData.payDate}}</view>
				</view>
				<view class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">购买数量：</text>{{orderData.orderNum}}</view>
				</view>
			</view>
		</view>
		<view class="buydetail">
			<view class="inner">
				<view class="buydetail-cell">
					<view class="label" style="color:rgba(152, 152, 152, 1)">商品总额</view>
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="rightttxt" style="font-weight:650;">{{orderData.orderTotalAmount}}元</text>
						</view>
					</view>
				</view>
				<view class="buydetail-cell">
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="lefttxt bloc">合计:</text>
							<text class="rightttxt price">{{orderData.orderTotalAmount}}元</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="card-bd column">
			<!--周边-->
			<peripheryList-component ref='peripheryList' peripheryTitle="附近" :coordinate="shopsData.coordinate" distance="1.1"></peripheryList-component>
		</view>
	</view>
</template>

<script>
	import peripheryListComponent from "@/components/peripheryList-component/peripheryList-component.vue"
	export default {
		components: {
			peripheryListComponent,
		},
		data() {
			return {
				orderData:{}, //订单信息
				cashData:{}, //代金券信息
				shopsData:{}, //店铺信息
			}
		},
		onLoad(e) {
			if(e.orderId){
				this.orderData.orderId = e.orderId;
				if(this.request.alreadyLogin()){
					this.queryOrderData(e.orderId);
				}
			}
		},
		methods: {
			//查询订单详情信息
			queryOrderData:function(orderId){
				let url = '/memberapi/api/orders/readByItem.do';
				let data = {
					orderId: orderId, //
				};
				var that = this;
				that.request.post(url, data).then(res => {
					if(res.returncode == 0){
						that.orderData = res.data;
						that.queryShopsData(that.orderData.shopId); //查询店铺信息
						 
						if(res.data && res.data.itemList){
							that.queryCashData(res.data.itemList[0].productId);  
						}
					}
				})
			},
			queryCashData:function(cashId){
				let url = '/memberapi/api/cash/read.do';
				let data = {
					cashId: cashId, 
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						that.cashData = res.data;
					}
				})	
			},
			//查询店铺信息
			queryShopsData:function(shopId){
				let url = '/memberapi/api/shops/readShopsAndExtends.do';
				let data = {
					shopId: shopId, 
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						that.shopsData = res.data;
					}
				})	
			},
			//地址
			toAddress: function(shopsData) {
				uni.openLocation({
					longitude: Number(shopsData.coordinateLng),
					latitude: Number(shopsData.coordinateLat),
					name: shopsData.activityTitle,
					address: shopsData.address
				})
			},
			//打电话
			toPhone: function(shopsPhone) {
				uni.makePhoneCall({
					phoneNumber: shopsPhone,
					success: () => {
						//console.log("成功拨打电话");
					}
				})
			},
			gotoPayment(orderData){
				uni.navigateTo({
					url: "/pages/payment/payment?orderId=" + orderData.orderId + "&payTotalAmount=" + orderData.payTotalAmount
				})
			},
			//退款详情
			applyRefund:function(){
				uni.navigateTo({
					url:'cashApplyRefund?orderId='+this.orderData.orderId
				})
			},
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
</style>
