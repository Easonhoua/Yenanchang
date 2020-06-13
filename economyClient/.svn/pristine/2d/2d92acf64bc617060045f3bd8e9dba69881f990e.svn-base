<template>
	<view class="page shoppingcart fillorder" style="margin-bottom:110rpx">
		<view class="card">
			<view v-if="selectAddress != null" class="card-bd" style="padding:30rpx">
				<view class="order-address">
					<view class="iconbox"></view>
					<view class="order-address-bd" >{{selectAddress.shipTo}} {{selectAddress.phone}}</view>	
				</view>	
				<view class="order-address" @click="toShoppingAddress">
					<view class="iconbox"><image class="icon" src="../../static/img/mall/qrdd_icon_dz@2x.png"></image></view>
					<view class="order-address-bd arrow-right">{{selectAddress.areaAddress}}{{selectAddress.address}}</view>	
				</view>	
			</view>
			<view v-else class="card-bd" style="padding:30rpx"  @click="toShoppingAddress">
				<view class="order-address arrow-right">
					添加收货地址
				</view>	
			</view>
		</view>
		<view class="card">
			<view class="card-bd">
				<view class="card-bd-title uni-cell-b">
					<view class="prodetail"><text>{{orderData.shopName}}</text></view>
				</view>
				<view class="card-bd-con">
					<view class="prodetail">
						<view class="imgbox"><image class="img" :src="orderData.imagePath"></image></view>
						<view class="righttxt">
							<view class="name">{{orderData.productName}}</view>
							<view class="nature"><text class="nature-inner">{{orderData.modelName}}</text></view>
							<view class="amountbar">
								<view class="price">￥{{orderData.price}}</view>
								<view class="order-cell-right" style="text-align: right;">
									<view class="number">
										<text class="reduce" :class="productNum > 1?'active':''" @tap="reduce()">-</text><!-- 数量可以减少时class增加active -->
										<input class="input" v-model="productNum" />
										<text class="add" @tap="add()">+</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="order-cell">
					<view class="label">配送方式</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">普通配送<text class="righttxt">快递 免邮</text></view>
				</view>
				<view class="order-cell">
					<view class="label">订单备注</view>
					<view class="order-cell-bd"><textarea v-model="orderRemark" class="textarea" placeholder="选填，请先和商家协商一致" placeholder-style="color:rgba(152, 152, 152, 1);"></textarea></view>
				</view>
				<view class="subtotal ">
					<view style="text-align:right;"><text class="zs">共一件</text> 小计：<text class="orange">¥{{totalAmount}}</text></view>
				</view>
			</view>
			
			
		</view>
		<view class="settle-accounts">
			<view class="total price-ft36">￥{{totalAmount}}</view>
			<view class="btnbar">
				<text class="btn" @click="createOrder()">结算({{productNum}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				modelId:'',
				orderData:{},
				productNum:1,
				orderRemark:'',
				totalAmount:0,
				selectAddress:{},
				shoppingCartsList:[]
				}
		},
		onLoad(e) {
			if(e.modelId){
				this.modelId = e.modelId;
				this.readDetail();
			}
			if(e.productNum){
				this.productNum = e.productNum;
			}
			this.loadAddress();
			var _this=this;
		    uni.$on("payCallback",function(params){
				_this.util.gotoOrderDetail(5,_this.orderId,"2")
		    });
		},onUnload() {
		   uni.$off("payCallback");
		 },
		created(){
			let that = this;
			uni.$on('checkedAddress', (data) => {
			  that.selectAddress = data;
			})
		},
		/* 在页面销毁前移除监听事件 */
		beforeDestroy(){
		    uni.$off('checkedAddress');
		},
		methods: {
			readDetail(){
				//获取项目信息列表
				const url = '/memberapi/api/products/readModel.do';
				let data = {
					modelId:this.modelId
				};
				var that = this;
				this.request.get(url,data).then(res=>{
					that.orderData = res.data;
					if(res.data.imagePath){
						that.orderData.imagePath = this.util.formatImagePath(that.orderData.imagePath);
					}
					
					that.totalAmount = that.productNum * that.orderData.price;
				})
			},
			reduce:function(){
				this.productNum--;
				if(this.productNum < 1){
					this.productNum =1;
				}
				this.totalAmount = this.productNum * this.orderData.price;
			},
			add:function(){
				this.productNum++;
				if(this.productNum > 99){
					this.productNum = 99;
				}
				this.totalAmount = this.productNum * this.orderData.price;
			},
			toShoppingAddress(){
				uni.navigateTo({
					url:'shoppingAddressList?selectFlag=true'
				})
			},
			loadAddress(){
				//获取项目信息列表
				const url = '/memberapi/api/shippingAddresses/queryDefaultList.do';
				let data = {
				};
				var that = this;
				this.request.post(url,data).then(res=>{
					if(res.list){
						that.selectAddress = res.list[0];
					}
				})
			},
			createOrder(){
				
				if(!this.selectAddress){
					this.request.toastTips("请添加收货人信息");
					return false;
				}
				
				//获取项目信息列表
				const url = '/memberapi/api/products/createdOrder.do';
				
				var shoppingCart={
					shopId:this.orderData.shopId,
					productId:this.orderData.productId,
					skuId:this.orderData.modelId,
					quantity:this.productNum
				}
				this.shoppingCartsList =[];
				this.shoppingCartsList.push(shoppingCart);
				let data = {
					orderRemark:this.orderRemark,
					addressId:this.selectAddress.addressId,
					shoppingCartsList:this.shoppingCartsList
				};
				var that = this;
				this.request.json(url,JSON.stringify(data)).then(res=>{
					
					var data = res.data;
					//提交订单
					uni.navigateTo({
						url:"/pages/payment/payment?orderId="+res.data.orderId+"&payTotalAmount="+res.data.payTotalAmount
					});
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
</style>
