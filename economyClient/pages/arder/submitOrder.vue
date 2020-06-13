<template>
	<view class="submitOrder fillorder payment">
		<view class="order-cellbox">
			<view class="order-cell-top">
				<view class="order-cell-imgbox"><image :src="arderData.thumbnailPath"></image></view>
				<view class="order-cell-bd">
					<view class="name">{{arderData.packagesName}}</view>
					<view class="tip"></view>
					<view class="labelbox">
						<text class="label" v-if="arderData.singleBuyNum == 0 ">不限张数</text>
						<text class="label" v-else>单次限制使用{{arderData.singleBuyNum}}张</text>
						<text class="label" v-if="arderData.refundType == 1 ">随时退</text>
						<text class="label" v-else>{{arderData.refundTime}}</text>
						<text class="label">过期自动退</text>
					</view>
					<text class="price">￥{{arderData.packagesPrice}}</text>
				</view>
			</view>
			<view class="order-cell">
				<view class="order-cell-bd">
					数量
				</view>
				<view class="order-cell-right">
					<view class="number"><text class="reduce" @click="reduce">-</text><input class="input" v-model="num" /><text class="add" @click="add">+</text></view>
				</view>
			</view>
			<view class="order-cell">
				<view class="order-cell-bd">
					小计
				</view>
				<view class="order-cell-right orange">
					¥{{orderTotalAmount}}
				</view>
			</view>
		</view>
		<view class="order-cellbox">
			<view class="order-cell">
				<view class="order-cell-bd">
					实付金额
				</view>
				<view class="order-cell-right orange">
					¥{{orderTotalAmount}}
				</view>
			</view>
		</view>
		<view class="order-cellbox" style="border:none;">
			<view class="order-cell">
				<view class="order-cell-bd">
					手机号
				</view>
				<view class="order-cell-right" style="text-align: right;">
					<input v-model="contactPhone"/>
				</view>
			</view>
		</view>
		<view class="bottombar">
			<view class="btn" @tap="buyCash">确认支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arderData:{},
				packagesId:'',
				num:1,
				contactPhone:'',
				orderTotalAmount:0,
				singleBuyNum:0, //套餐最大购买数量
				stockNum:0, //库存数
				totalSell:0, //已售数量
			}
		},
		onLoad(e) {
			if(e.packagesId){
				this.packagesId = e.packagesId;
				this.initData(e.packagesId);
			}
			if(e.singleBuyNum){
				this.singleBuyNum = e.singleBuyNum;
			}
			if(e.stockNum){
				this.stockNum= e.stockNum;
			}
			if(e.totalSell){
				this.totalSell = e.totalSell;
			}
			
			let user = uni.getStorageSync("user");
			this.contactPhone = user.mobilePhone;//.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");
			var _this=this;
			uni.$on("payCallback",function(params){
				_this.util.gotoOrderDetail(3,_this.orderId,"2")
			}); 
		},
		onUnload() {
			uni.$off("payCallback");
		},
		methods: {
			initData:function(packagesId){
				//获取商家订座配置
				const url = '/memberapi/api/arderPackages/read.do';
				var sendData = {
					packagesId:packagesId
				}
				var that = this;
				this.request.get(url, sendData).then(res => {
					that.arderData = res.data;
					if(that.arderData.thumbnailPath){
						let thumbnailPath = JSON.parse(that.arderData.thumbnailPath);
						if(thumbnailPath.filePath_220){
							that.arderData.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath_220;
						}else{
							that.arderData.thumbnailPath = that.request.getBaseImagePath() + thumbnailPath.filePath;
						}
					}
					that.orderTotalAmount = that.arderData.packagesPrice * that.num;
					that.orderTotalAmount = that.orderTotalAmount.toFixed(2);
				});
			},
			reduce:function(){
				this.num--;
				if(this.num < 1){
					this.num =1;
				}
				this.orderTotalAmount = this.arderData.packagesPrice * this.num;
				this.orderTotalAmount = this.orderTotalAmount.toFixed(2);
			},
			add:function(){
				if(this.num >= this.singleBuyNum){
					this.request.toastTips("单词最多只能购买"+this.singleBuyNum+"张");
					return false;
				}
				if(this.num >= (this.stockNum-this.totalSell)){
					this.request.toastTips("单词最多只能购买数量已经大于库存量");
					return false;
				}
				this.num++;
				this.orderTotalAmount = this.arderData.packagesPrice * this.num;
				this.orderTotalAmount = this.orderTotalAmount.toFixed(2);
				this.stockNum --;
			},
			buyCash:function(){//提交订单
				const url = '/memberapi/api/arderPackages/createOrder.do';
				var sendData = {
					packagesId:this.packagesId,
					packagesNum:this.num,
					contactPhone:this.contactPhone,
				}
				this.request.get(url, sendData).then(res => {
					//提交订单
					uni.navigateTo({
						url:"/pages/payment/payment?orderId="+res.data.orderId+"&payTotalAmount="+res.data.payTotalAmount
					});
				});
			},
		}
	}
	
</script>

<style>
</style>
