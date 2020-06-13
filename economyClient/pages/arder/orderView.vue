<template>
	<view class="submitOrder teambuy-detail teambuydetail">
		<view class="order-cellbox">
			<view class="order-cell-top">
				<view class="order-cell-imgbox"><image :src="arderData.imagePath"></image></view>
				<view class="order-cell-bd">
					<view class="name">{{arderData.packagesName}}</view>
					<view class="tip">周一至周末可用</view>
					<text class="">￥{{arderData.packagesPrice}}</text>
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
					<view>团购券</view>
					<view class="time">有效期至：{{orderData.itemList[0].expiryDate}}</view>
					<view class="btn" v-if="orderData.orderStatus ==1 " @tap="gotoPayment(orderData)">去付款</view>
					<view class="btn" v-if="orderData.orderStatus == 2 && orderData.orderStatus == 13" @tap="applyRefund">申请退款</view>
				</view>
				<view v-if="orderData.orderStatus !=1" class="teambuy-ticket-inner teambuy-ticket-inner-line" v-for="(item,index) in orderData.itemList" :key="index" @tap="toDetail(item.orderItemId)">
					<view class="passwordlist" style="height: 50rpx;"><text class="righttxt">{{orderData.orderStatusName}}</text></view>
				</view>
			</view>
		</view>
		<view class="buydetail">
			<view class="title">套餐详情</view>
			<view class="inner">
				<view class="buydetail-cell" v-for="(item,index) in arderData.itemList" :key="index">
					<view class="label">{{item.productName}}</view>
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="lefttxt">{{item.quantity}}张</text>
							<text class="rightttxt">{{item.productPrice}}元</text>
						</view>
					</view>
				</view>
				<view class="buydetail-cell">
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="lefttxt">总价</text>
							<text class="rightttxt">{{arderData.marketPrice}}元</text>
						</view>
					</view>
				</view>
				<view class="buydetail-cell">
					<view class="buydetail-cell-bd">
						<view class="inner-cell">
							<text class="lefttxt bloc">团购价</text>
							<text class="rightttxt price">{{arderData.packagesPrice}}元</text>
						</view>
					</view>
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
				<view v-if="(orderData.orderStatus != 200) && (orderData.orderStatus != 201) && (orderData.orderStatus != 202)" class="teambuy-ticket-inner">
					<view class="passwordlist"><text class="label">支付方式：</text>{{orderData.paymentTypeName}}</view>
				</view>
				<view v-if="(orderData.orderStatus != 200) && (orderData.orderStatus != 201) && (orderData.orderStatus != 202)" class="teambuy-ticket-inner">
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
							<text class="rightttxt" style="font-weight:650;">{{arderData.marketPrice * orderData.orderNum}}元</text>
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
				arderData:{}, //套餐信息
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
							that.queryArderData(res.data.itemList[0].productId); //查询套餐信息
						}
					}
				})
			},
			//查询套餐信息
			queryArderData:function(packagesId){
				let url = '/memberapi/api/arderPackages/read.do';
				let data = {
					packagesId: packagesId, 
				};
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						that.arderData = res.data;
						//头图的获取
						if(that.arderData &&that.arderData.imagePath){
							let imagePath = JSON.parse(that.arderData.imagePath)[0];
							if(imagePath.filePath_220){
								that.arderData.imagePath = that.request.getBaseImagePath() + imagePath.filePath_220;
							}else{
								that.arderData.imagePath = that.request.getBaseImagePath() + imagePath.filePath;
							}
						}
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
			//退款详情
			applyRefund:function(){
				uni.navigateTo({
					url:'applyRefund?orderId='+this.orderData.orderId
				})
			},
			gotoPayment(orderData){
				uni.navigateTo({
					url: "/pages/payment/payment?orderId=" + orderData.orderId + "&payTotalAmount=" + orderData.payTotalAmount
				})
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
</style>
