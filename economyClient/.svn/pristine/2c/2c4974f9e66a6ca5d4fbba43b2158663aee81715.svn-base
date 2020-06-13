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
		<view class="card" v-for="(item,index) in shoppingCartsList" :key="index">
			<view class="card-bd">
				<view class="card-bd-title uni-cell-b">
					<view class="prodetail"><text>{{item.shopName}}</text></view>
				</view>
				<view class="card-bd-con" v-for="(product,index) in item.shoppingCartsList" :key="index">
					<view class="prodetail">
						<view class="imgbox"><image class="img" :src="product.imagePath"></image></view>
						<view class="righttxt">
							<view class="name">{{product.productName}}</view>
							<view class="nature"><text class="nature-inner">{{product.modelName}}</text></view>
							<view class="amountbar">
								<view class="price">￥{{product.price}}</view>
								<view class="order-cell-right" style="text-align: right;">
									<view class="number">{{product.quantity}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="subtotal ">
					<view style="text-align:right;"><text class="zs">共{{item.totalQuantity}}件</text> 小计：<text class="orange">¥{{item.totalAmount}}</text></view>
				</view>
			</view>
		</view>
		<view class="card" >
			<view class="card-bd">
				<view class="order-cell">
					<view class="label">配送方式</view>
					<view class="order-cell-bd" style="color:rgba(152, 152, 152, 1);">普通配送<text class="righttxt">快递 免邮</text></view>
				</view>
				<view class="order-cell">
					<view class="label">订单备注</view>
					<view class="order-cell-bd"><textarea class="textarea" placeholder="选填，请先和商家协商一致" placeholder-style="color:rgba(152, 152, 152, 1);"></textarea></view>
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
				shopCartIds:'',
				orderData:{},
				productNum:1,
				totalAmount:0,
				totalQuantity:0,
				selectAddress:{},
				shoppingCartsList:[],
				shoppCartList:[]
				}
		},
		onLoad(e) {
			if(e.shopCartIds){
				this.shopCartIds = e.shopCartIds;
				this.readDetail();
			}
			if(e.productNum){
				this.productNum = e.productNum;
			}
			this.loadAddress();
			
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
				//获取菜品信息列表
				let url = '/memberapi/api/shoppingCarts/list.do';
				let data = {
					pageNo: 1,
					pageSize: 50,
					shopCartIds:this.shopCartIds
				};
				var that = this;
				this.request.post(url,data).then(res=>{
					let currListData = res.list;
					currListData.forEach(item => {
						if(item.shoppingCartsList){
							var quantity = 0;
							var amount = 0;
							item.shoppingCartsList.forEach(product=>{
								let imagePath = JSON.parse(product.imagePath);
								if(imagePath.filePath_220){
									product.imagePath = this.request.getBaseImagePath() + imagePath.filePath_220;
								}else{
									product.imagePath = this.request.getBaseImagePath() + imagePath.filePath;
								}
								that.totalAmount += product.quantity * product.price;
								that.totalQuantity += product.quantity;
								quantity += product.quantity;
								amount += product.quantity * product.price;
								that.shoppCartList.push(product);
							});
							item.totalQuantity = quantity;
							item.totalAmount = amount;
						}
					});
					
					this.shoppingCartsList = this.shoppingCartsList.concat(currListData); //追加新数据
				})
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
				let data = {
					addressId:this.selectAddress.addressId,
					shoppingCartsList:this.shoppCartList
				};
				var that = this;
				this.request.json(url,JSON.stringify(data)).then(res=>{
					var data = res.data;
					
					//获取菜品信息列表
					let url = '/memberapi/api/shoppingCarts/deleteByShopCartIds.do';
					let sendData = {
						shopCartIds: this.shopCartIds
					};
					var that = this;
					this.request.post(url,sendData).then(res=>{
							
					});
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
