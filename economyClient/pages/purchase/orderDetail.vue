<template>
	<view class="page shoppingcart fillorder" style="margin-bottom:110rpx">
		<view class="card">
			<view class="card-bd" style="padding:30rpx;">
			<view style="float: left;"><image class="icon" src="/static/img/common/handle_refund.png"></image></view>
			<view style="float: left;margin:10rpx 20rpx;">
				<view v-if="orderData.orderStatus == 1" class="order-address-bd" style="font-size: 36rpx;">待付款</view>
				<view v-else-if="orderData.orderStatus == 80|| orderData.orderStatus == 2" class="order-address-bd" style="font-size: 36rpx;">待发货</view>
				<view v-else-if="orderData.orderStatus == 81" class="order-address-bd" style="font-size: 36rpx;">待收货</view>
				<view v-else-if="orderData.orderStatus == 203" class="order-address-bd" style="font-size: 36rpx;">待评价</view>
				<view v-else-if="orderData.orderStatus == 200" class="order-address-bd" style="font-size: 36rpx;">待退款</view>
				<view v-else-if="orderData.orderStatus == 201" class="order-address-bd" style="font-size: 36rpx;">已退款</view>
				<view v-else-if="orderData.orderStatus == 202" class="order-address-bd" style="font-size: 36rpx;">已关闭</view>
				<view v-else-if="orderData.orderStatus == 204" class="order-address-bd" style="font-size: 36rpx;">已完成</view>
				<view class="order-address-bd" style="color: #989898;">感谢您对夜南昌的信任，欢迎您的再次光临</view>
			</view>
			</view>
		</view>
		<view class="card">
			<view class="card-bd" style="padding:30rpx;">
			<view style="float: left;"><image class="icon" src="/static/img/mall/qrdd_icon_dz@2x.png"></image></view>
			<view style="float: left;margin:10rpx 20rpx;">
				<view class="order-address-bd">{{orderData.shipTo}} {{orderData.cellPhone}}</view>	
				<view class="order-address-bd">{{orderData.shipAreaAddress}}{{orderData.shipAddress}}</view>
			</view>
			</view>
		</view>
		<view class="card" >
			<view class="card-bd">
				<view class="card-bd-title uni-cell-b">
					<view class="prodetail"><text>{{orderData.shopName}}</text></view>
				</view>
				<view class="card-bd-con" v-for="(order,index) in orderData.itemList" :key="index">
					<view class="prodetail">
						<view class="imgbox"><image class="img" :src="order.thumbnailsUrl" mode="aspectFill"></image></view>
						<view class="righttxt">
							<view class="name">{{order.productName}}</view>
							<view class="nature"><text class="nature-inner">{{order.modelName}}</text></view>
							<view class="amountbar">
								<view class="price">￥{{order.salePrice}}</view>
								<view class="order-cell-right" style="text-align: right;">
									<view class="number">{{order.orderNum}}</view>
								</view>
							</view>
						</view>
						<view class="btnbar" style="float: right;">
							<text v-if="order.useStatus == 4 " class="btn" >待确认退款</text>
							<text v-if="order.useStatus == 6 " class="btn" >待确认退货</text>
							<text v-if="(orderData.orderStatus == 2 || orderData.orderStatus == 80) && order.useStatus == 1 " class="btn" @click="afterSaleService(order.orderItemId)" >申请退款</text>
							<text v-else-if="orderData.orderStatus !=1 && orderData.orderStatus !=202 && order.useStatus == 1" class="btn" @click="afterSaleService(order.orderItemId)">申请售后</text>
						</view>
					</view>
				</view>
				<view class="subtotal ">
					<view style="text-align:right;"><text class="zs">共{{orderData.orderNum}}件</text> 小计：<text class="orange">¥{{orderData.orderTotalAmount}}</text></view>
				</view>
			</view>
		</view>
		<view class="card" >
			<view class="card-bd"  style="padding: 30rpx 0rpx;">
				<view class="order-cell">
					<view class="label">订单编号：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">{{orderData.orderId}}</view>
				</view>
				<view class="order-cell">
					<view class="label">下单时间：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">{{orderData.orderDate}}</view>
				</view>
				<view class="order-cell" v-if="orderData.paymentTypeName">
					<view class="label">支付方式：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">{{orderData.paymentTypeName}}</view>
				</view>
				<view class="order-cell" v-if="orderData.payDate">
					<view class="label">支付时间：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">{{orderData.payDate}}</view>
				</view>
				<view class="order-cell" v-if="orderData.expressCompanyName">
					<view class="label">配送方式：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">{{orderData.expressCompanyName}}</view>
				</view>
				<view class="order-cell" v-if="orderData.shipOrderNumber">
					<view class="label">运单号码：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">{{orderData.shipOrderNumber}}</view>
				</view>
				<view class="order-cell" v-if="orderData.orderRemark">
					<view class="label">订单备注：</view>
					<view class="order-cell-bd">{{orderData.orderRemark}}</view>
				</view>
			</view>
		</view>
		
		<view class="card" >
			<view class="card-bd" style="padding: 30rpx 0rpx;">
				<view class="order-cell">
					<view class="label">商品总额：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">￥{{orderData.orderTotalAmount}}</view>
				</view>
				<view class="order-cell" >
					<view class="label">运费：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">￥0.00</view>
				</view>
				<view class="order-cell" >
					<view class="label">商品优惠：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">￥{{orderData.discountAmount}}</view>
				</view>
				<view class="order-cell">
					<view class="label">合计：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">￥{{orderData.payTotalAmount}}</view>
				</view>
			</view>
		</view>
		<view class="operation-bar">
			<text class="del btn" style="padding: 0 20rpx;border: 1rpx solid #E5E5E5;color: #333333;background-color: #FFFFFF;" v-if="orderData.orderStatus == 204">删除订单</text>
			<view class="btnbar">
				<text v-if="orderData.orderStatus == 1" class="btn" @click="cancelOrder">取消订单</text>
				<text v-else-if="orderData.orderStatus == 81" class="btn" @click="confirmReceipt">确认收货</text>
				<text v-else-if="orderData.orderStatus == 203" class="btn" @click="goComment">评价</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				orderId:'',
				orderData:{}
			}
		},
		onLoad(e) {
			if(e.orderId){
				this.orderId = e.orderId;
				this.readDetail();
			}
			var self = this;
			uni.$on("updateOrderData",function(){
				self.readDetail();
			});
		},
		onUnload() {
			uni.$off("updateOrderData");
		},
		methods: {
			readDetail(){
				//获取项目信息列表
				const url = '/memberapi/api/orders/readByItem.do';
				let data = {
					orderId:this.orderId
				};
				var that = this;
				this.request.post(url,data).then(res=>{
					that.orderData = res.data;
					if(that.orderData.itemList){
						that.orderData.itemList.forEach(item => {
							if(item.thumbnailsUrl){
								item.thumbnailsUrl = this.util.formatImagePath(item.thumbnailsUrl);
							}
						});
					}
				})
			},
			confirmReceipt(){
				//获取项目信息列表
				const url = '/memberapi/api/products/confirmReceipt.do';
				let data = {
					orderId:this.orderId
				};
				var that = this;
				this.request.post(url,data).then(res=>{
					this.request.toastTips('确认收货成功');
					uni.$emit("updateOrderData",true);
					setTimeout(function () {
						uni.navigateBack();
					}, 2000);
				})
			},
			goComment(){
				uni.setStorageSync("orderDataItem",this.orderData);
				uni.navigateTo({
					url:"/pages/user/userIndex/addComment"
				})
			},
			cancelOrder(){
				this.request.post("/memberapi/api/orders/closeOrder.do", {
					orderId: this.orderId
				}).then(res => {
					this.request.toastTips("取消订单成功");
					uni.$emit("updateOrderData",true);
					setTimeout(function () {
						uni.navigateBack();
					}, 2000);
				})
			},
			afterSaleService(orderItemId){
				uni.navigateTo({
					url:"/pages/purchase/afterSaleService?orderId="+this.orderId+"&orderItemId="+orderItemId
				})
			}
			
		}
	}
</script>

<style>
	@import "../../common/css/mall.css";
	@import "../../common/css/icon.css";
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
	.cu-form-group{
		display: inline-block;
	}
	.cu-form-group{
		height:auto;
		min-height:0;
	}
	.order-cell{
		/* background-color: #0081FF; */
		padding: 10rpx 30rpx 0rpx 30rpx;
	}
	.order-cell .label{
		width:180rpx;
	}
	.icon{
		width: 72rpx;
		height: 72rpx;
		margin-top: 12rpx;
	}
	
	.btnbar{
			flex: 1;
			text-align:right;
		}
		.btnbar .btn{
			width:136rpx;
			height:56rpx;
			line-height:56rpx;
			color: #989898;
			text-align: center;
			display: inline-block;
			margin-left:20rpx;
			border-radius:30rpx;
			font-size:24rpx;
			background-color: #f9f9f9;
		}
</style>
