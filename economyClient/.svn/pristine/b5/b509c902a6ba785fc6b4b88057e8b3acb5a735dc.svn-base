<template>
	<view class="page shoppingcart fillorder" style="margin-bottom:110rpx">
		<view class="card">
			<view class="card-bd" style="padding:30rpx;">
			<view style="float: left;"><image class="icon" src="/static/img/common/handle_refund.png"></image></view>
			<view style="float: left;margin:10rpx 20rpx;">
				<view v-if="orderData.orderStatus == 1" class="order-address-bd" style="font-size: 36rpx;">待付款</view>
				<view v-else-if="orderData.orderStatus == 2" class="order-address-bd" style="font-size: 36rpx;">待商家确认</view>
				<view v-else-if="orderData.orderStatus == 10" class="order-address-bd" style="font-size: 36rpx;">已确认</view>
				<view v-else-if="orderData.orderStatus == 11" class="order-address-bd" style="font-size: 36rpx;">取消待确认</view>
				<view v-else-if="orderData.orderStatus == 12" class="order-address-bd" style="font-size: 36rpx;">已取消</view>
				<view v-else-if="orderData.orderStatus == 204" class="order-address-bd" style="font-size: 36rpx;">已完成</view>
				<view v-else-if="orderData.orderStatus == 202" class="order-address-bd" style="font-size: 36rpx;">已关闭</view>
				<view class="order-address-bd" style="color: #989898;">感谢您对夜南昌的信任，欢迎您的再次光临</view>
			</view>
			</view>
		</view>
		<view class="card submitOrder">
			<view class="card-bd" style="padding:30rpx">
				<view class="order-cellbox">
					<view class="order-cell-top">
						<view class="order-cell-imgbox"><image :src="orderData.thumbnailPath"></image></view>
						<view class="order-cell-bd">
							<view class="name">{{orderData.shopName}}</view>
							<view class="tip">{{orderData.bookDate}}  {{orderData.bookTime}}</view>
							<view class="tip tip-wz">
								<view class="wz">
									<text>位置<text class="txt">{{orderData.bookRoomTypeName}}</text></text>
									<text>人数<text class="txt">{{orderData.dinersNum}}</text></text>
								</view>
								<!-- <text class="txt">包厢免费</text> -->
							</view>
							<view class="btnbar">
								<!-- || orderData.orderStatus == 2 只有待付款才能取消订单 -->
								<text v-if="orderData.orderStatus == 1 || orderData.orderStatus == 10 " class="btn" style="background-color: #FFFFFF;color: #989898;border-color: #DBDBDB;" @click="cancelOrder">取消订单</text>
								<text v-else-if="orderData.orderStatus == 203" class="btn" @click="goComment">评价</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="card-bd" style="padding:30rpx;">
			<view style="float: left;"><image class="icon" src="/static/img/mall/qrdd_icon_dz@2x.png"></image></view>
			<view style="float: left;margin:10rpx 20rpx;width: 80%;">
				<view class="order-address-bd">{{orderData.shopName}} {{orderData.sellerPhone}}</view>	
				<view class="order-address-bd">{{orderData.sellerAddress}}</view>
			</view>
			</view>
		</view>
		<view class="card"  v-if="orderData.itemList != null && orderData.itemList.length > 0">
			<view class="card-bd">
				<view class="card-bd-title uni-cell-b">
					<view class="prodetail"><text>菜品信息</text></view>
				</view>
				<view class="card-bd-con" v-for="(order,index) in orderData.itemList" :key="index">
					<view class="prodetail">
						<view class="imgbox"><image class="img" :src="order.imagePath"></image></view>
						<view class="righttxt">
							<view class="name">{{order.productName}}</view>
							<view class="nature"><text class="nature-inner">{{order.modelName}}</text></view>
							<view class="amountbar">
								<view class="price">￥{{order.salePrice}}</view>
								<view class="order-cell-right" style="text-align: right;">
									<view class="number">{{order.buyNum}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="subtotal ">
					<view style="text-align:right;"><text class="zs">共{{orderData.orderNum}}件</text> 小计：<text class="orange">¥{{orderData.orderTotalAmount}}</text></view>
				</view>
			</view>
		</view>
		<view class="card" >
			<view class="card-bd">
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
				<view class="order-cell">
					<view class="label">订单备注：</view>
					<view class="order-cell-bd">{{orderData.orderRemark}}</view>
				</view>
			</view>
		</view>
		
		<view class="card" v-if="orderData.payTotalAmount">
			<view class="card-bd">
				<view class="order-cell">
					<view class="label">商品总额：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">￥{{orderData.orderTotalAmount}}</view>
				</view>
				<view class="order-cell">
					<view class="label">商品优惠：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">￥{{orderData.discountAmount}}</view>
				</view>
				<view class="order-cell">
					<view class="label">合计：</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">￥{{orderData.payTotalAmount}}</view>
				</view>
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
					if(res.data.thumbnailPath){
						this.orderData.thumbnailPath = this.util.formatImagePath(res.data.thumbnailPath);
					}else{
						this.orderData.thumbnailPath = this.util.formatImagePath(res.data.logo);
					}
					
					if(that.orderData.itemList){
						that.orderData.itemList.forEach(item => {
							if(item.imagePath){
								item.imagePath = this.util.formatImagePaths(item.imagePath)[0];
							}
						});
					}
				})
			},
			goComment(){
				uni.setStorageSync("orderDataItem",this.orderData);
				uni.navigateTo({
					url:"/pages/user/userIndex/addComment"
				})
			},
			cancelOrder(){
				//提交订单
				uni.navigateTo({
					url:"/pages/food/cancelFoodOrder?orderId="+this.orderId
				});
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
	.submitOrder .order-cell-top:after{
	    border:none;
	}
	.order-cellbox{
		border-bottom:none;
	}
	.submitOrder .order-cell-top{
	    padding:0;
	}
	.order-cell .label{
		width:180rpx;
	}
	.tip-wz{
		display: flex;
		justify-content: space-between;
	}
	.btnbar{
		text-align: right;
		margin-top:32rpx;
	}
	.btnbar .btn{
		padding:6rpx 30rpx;
		border-radius: 25rpx;
		border:1rpx solid #4A4A4A;
		color:#4A4A4A;
		font-size:24rpx;
		margin-left:30rpx;
	}
	.tip-wz .txt{
		font-size:28rpx;
		font-weight:650;
		margin-left:30rpx;
	}
	.tip-wz .wz{
		flex: 1;
	}
	.icon{
		width: 72rpx;
		height: 72rpx;
		margin-top: 12rpx;
	}
</style>
