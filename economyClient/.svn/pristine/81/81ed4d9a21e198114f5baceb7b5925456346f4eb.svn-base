<template>
	<view class="page shoppingcart fillorder" style="margin-bottom:110rpx">
		<view class="card" >
			<view class="card-bd">
				<view class="card-bd-title uni-cell-b">
					<view class="prodetail"><text>{{orderData.shopName}}</text></view>
				</view>
				<view class="card-bd-con" v-for="(order,index) in orderData.itemList" :key="index">
					<view class="prodetail">
						<view class="imgbox"><image class="img" :src="order.thumbnailsUrl"></image></view>
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
		<view class="card" @click="toRefund">
			<view class="card-bd" style="padding:30rpx;">
			<view style="float: left;"><image class="icon" src="/static/img/common/refund.png"></image></view>
			<view class="card-item">
				<view class="order-address-bd" style="font-size: 36rpx;">我要退款(无需退货)</view>
				<view class="order-address-bd" style="color: #989898;">没收到货，或与卖家协商同意不用退货只退款</view>
			</view>
			<view style="float: right;"><image class="icon-right" src="/static/img/common/arrow_right.png"></image></view>
			</view>
		</view>
		<view class="card arrow" @click="toReturn">
			<view class="card-bd" style="padding:30rpx;">
			<view style="float: left;"><image class="icon" src="/static/img/common/return_goods.png"></image></view>
			<view class="card-item">
				<view class="order-address-bd" style="font-size: 36rpx;">我要退货退款</view>
				<view class="order-address-bd" style="color: #989898;">已收到货，需要退还收到的货物</view>
			</view>
			<view style="float: right;"><image class="icon-right" src="/static/img/common/arrow_right.png"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				orderId:'',
				orderData:{},
				orderItemId:''
			}
		},
		onLoad(e) {
			if(e.orderId){
				this.orderId = e.orderId;
				this.orderItemId = e.orderItemId;
				this.readDetail();
			}
		},
		methods: {
			readDetail(){
				//获取项目信息列表
				const url = '/memberapi/api/orders/readByItem.do';
				let data = {
					orderId:this.orderId,
					orderItemId:this.orderItemId
				};
				var that = this;
				this.request.post(url,data).then(res=>{
					that.orderData = res.data;
					if(that.orderData.itemList){
						that.orderData.itemList.forEach(item => {
							item.thumbnailsUrl = this.util.formatImagePath(item.thumbnailsUrl);
						});
					}
				})
			},
			toRefund(){
				uni.navigateTo({
					url:"/pages/purchase/purchaseApplyRefund?orderId="+this.orderId+"&orderItemId="+this.orderItemId
				})
			},
			toReturn(){
				uni.navigateTo({
					url:"/pages/purchase/purchaseApplyRefund?orderId="+this.orderId+"&orderItemId="+this.orderItemId+"&returnFlag=1"
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
	.order-cell .label{
		width:180rpx;
	}
	.icon{
		width: 72rpx;
		height: 72rpx;
		margin-top: 12rpx;
		margin-right: 10rpx;
	}
	
	.icon-right{
		width: 20rpx;
		height: 40rpx;
		margin-top: 54rpx;
		margin-right: 0rpx;
	}
	.btnbar{
		text-align: right;
		margin-top:10rpx;
		padding-bottom:30rpx;
	}
	.btnbar .btn{
		padding:6rpx 30rpx;
		border-radius: 25rpx;
		border:1rpx solid #4A4A4A;
		color:#4A4A4A;
		font-size:24rpx;
		margin-left:30rpx;
	}
	.shoppingcart .card{
		padding: 2px 0px;
	}
	
	.card-item{
		float: left;margin:10rpx 0rpx; width: 82%;
	}
</style>
