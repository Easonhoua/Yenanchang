<template>
	<view class="submitOrder teambuy-detail teambuydetail fillorder payment">
		<view class="order-cellbox">
			<view class="order-cell-top">
				<view class="order-cell-imgbox"><image :src="orderItemData.thumbnailsUrl"></image></view>
				<view class="order-cell-bd">
					<view class="name">{{orderData.shopName}}</view>
					<view class="tip">{{orderItemData.productName}}</view>
					<view class="tip">
						<text>单价：</text><text class="txt">￥{{orderItemData.realTotalPrice}}</text>
						<text>购买数量：</text><text class="txt">{{orderNum}}</text>
					</view>
				</view>
			</view>
		<!-- 	<view class="order-cell">
				<view class="order-cell-bd">
					退款数量
				</view>
				<view class="order-cell-right">
					<view class="number"><text class="reduce" @click="reduce">-</text><input class="input" v-model="orderRefundNum"/><text class="add" @click="add">+</text></view>
				</view>
			</view> -->
			<view class="order-cell">
				<view class="order-cell-bd">
					退款金额<text>(实付金额)</text>
				</view>
				<view class="order-cell-right orange">¥{{orderTotalAmount}}</view>
			</view>
			
		</view>
		<view class="order-cellbox">
			<view class="re-cause">
				<view class="label">申请原因<text class="red"> *</text></view>
				<view class="pickerbox" @tap="selectReason" >{{applicant}}</view>
			</view>
			<view class="re-cause">
				<textarea class="textarea" v-model="reason" placeholder="请填写问题描述，以便我们更好的帮您解决问题" placeholder-style="color:rgba(230, 231, 233, 1);"></textarea>
			</view>
			<photo-component ref='photoUtil' photoTitle="上传图片" photoTip="提供4张上传图片" maxPhotoCount="4" mustSelect="NO"></photo-component>
		</view>
		<view class="bottombar" :loading="loading" :disabled="loading">
			<view class="btn"  @tap="submitRefund">申请退款</view>
		</view>
		
		<!--评价弹出框-->
		<uni-popup ref="popup" type="bottom">
		<view class="refundreason">
			<view class="title" style="padding-top: 0rpx;">退款原因</view>
				<view class="refundreason-bd" style="padding: 20rpx 0rpx;">
					<radio-group class="block" @change="RadioChange">
						<view class="txtlist"  v-for="(item,index) in radionList" :key="index">
							<text class="txt">{{item.name}}</text>
							<radio class="orange" :class="radio==item.id?'checked':''"  :checked="radio==item.id?true:false" :value="item.id"></radio>
						</view>
					</radio-group>
				</view>
		</view>
		<view class="uni-popup-grou-button">
			<view class="uni-popup-cancel-button" @click="cancelBtn('popup')">取消</view>
			<view class="uni-popup-confirm-button" @click="confirmBtn('popup')">确定</view>
		</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import photoComponent from "@/components/photo-component/photo-component.vue";
	export default {
		components: {
			uniPopup,
			photoComponent
		},
		data() {
			return {
				orderNum:4, //订单明细总和
				orderRefundNum:4,//默认退款数量
				orderTotalAmount:"360.00",
				returnFlag:2,
				loading: false,
				orderData:{}, //订单信息
				orderItemData:{}, //商品信息
				radio:'',
				radionList:[ //退款理由
					{"id":"A","name":"计划有变"},
					{"id":"B","name":"其他"}
				],
				
				applicant:'请选择退款原因',//申请内容
				reason:'',//退款原因
				imagePath:[], //上传图片集合
			}
		},
		onLoad(e) {
			if(e.orderId){
				this.orderData.orderId = e.orderId;
				if(this.request.alreadyLogin()){
					var orderItemId = e.orderItemId?e.orderItemId:'';
					this.queryOrderData(e.orderId,orderItemId);
				}
			}
		},
		methods:{
			//查询订单详情信息
			queryOrderData:function(orderId,orderItemId){
				let url = '/memberapi/api/orders/readByItem.do';
				let data = {
					orderId: orderId,
					orderItemId:orderItemId
				};
				var that = this;
				that.request.post(url, data).then(res => {
					if(res.returncode == 0){
						that.orderData = res.data;
						if(res.data && res.data.itemList){
							that.orderItemData = res.data.itemList[0];
							that.orderNum = that.orderItemData.buyNum;
							that.orderRefundNum = that.orderItemData.buyNum;
							that.orderTotalAmount = that.orderItemData.realTotalPrice * that.orderNum
							that.orderItemData.thumbnailsUrl = this.util.formatImagePath(that.orderItemData.thumbnailsUrl);
							
						}
					}
				})
			},
			//数量-
			reduce:function(){
				this.orderRefundNum;
				if(this.orderRefundNum < 1){
					this.orderRefundNum =1;
				}
				this.orderTotalAmount = this.orderItemData.realTotalPrice * this.orderRefundNum;
				this.orderTotalAmount = this.orderTotalAmount.toFixed(2);
			},
			//退款原因选择
			selectReason:function(){
				this.$refs['popup'].open();
			},
			//取消
			cancelBtn(type) {
				this.$refs[type].close();
			},
			//提交
			confirmBtn(type) {
				this.$refs[type].close();
			},
			RadioChange: function(e) {
				this.radio = e.detail.value;
				this.radionList.forEach(item => {
					if(this.radio == item.id){
						this.applicant = item.name;
					}
				});
			},
			//提交退款
			submitRefund:function(){
				
				if(this.request.alreadyLogin()){
					if(!this.radio){
						this.request.toastTips("请选择申请原因");
						return false;
					}	
					this.uploadImages();
				}
			},
			uploadImages:function(){
				this.$refs.photoUtil.uploadAttachments("hotelOrderRefund").then(res=>{
					if(res){
						this.imagePath = res;
					}
					this.refundOrder();
				}).catch(res=>{
					this.loading = false;
				})
			},
			refundOrder:function(){
				let url = '/memberapi/api/hotelRoomRule/waitRefundOrder.do';
				let data={
					orderId : this.orderData.orderId,
					orderItemId : this.orderItemData.orderItemId,
					applicant : this.applicant,
					reason : this.reason,
					imagePath : this.imagePath,
					returnNum : this.orderRefundNum,
					returnFlag:this.returnFlag
				}
				var that = this;
				that.request.post(url, data).then(res => {
					if(res.returncode == 0){
						that.request.toastTips("申请成功");
						 setTimeout(function() {
						 	uni.redirectTo({
								url:"/pages/hotel/hotelOrder?orderId="+that.orderData.orderId
						 	});
						 }, 1000);
					}else{
						that.request.toastTips("申请失败");
						that.loading = false;
					}
				}) 
			}
		}
	}
</script>

<style>
	@import "../../common/css/icon.css";
	.red {
		color: rgb(241, 81, 69);
	}
	.submitOrder .order-cell-top:before {
	    content: " ";
	    position: absolute;
	    left: 0;
	    top: 0;
	    right: 0;
	    height: 1px;
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
	.submitOrder .order-cell-top:after {
	    content: " ";
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    height: 1px;
	    border-bottom:1rpx solid rgba(0, 0, 0, 0.1);
	    color: rgba(0, 0, 0, 0.1);
	    -webkit-transform-origin: 0 0;
	    -ms-transform-origin: 0 0;
	    transform-origin: 0 0;
	    -webkit-transform: scaleY(0.5);
	    -ms-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    z-index: 2;
	}
	
	.uni-popup-grou-button {
		margin-top: 10px;
		display: flex;
	}
	.uni-popup-cancel-button {
		width: 100%;
		text-align: left;
		font-size: 32rpx;
		color: #3b4144;
	}
	.uni-popup-confirm-button{
		width: 100%;
		text-align: right;
		font-size: 32rpx;
		color: #f37b1d;
	}
	radio .wx-radio-input,
	radio .uni-radio-input {
		margin: 0;
		width: 40rpx;
		height: 40rpx;
	}
	
	
	radio.radio[checked]::after,
	radio.radio .uni-radio-input-checked::after {
		content: "";
		background-color: transparent;
		display: block;
		position: absolute;
		width: 8px;
		height: 8px;
		z-index: 999;
		top: 0upx;
		left: 0upx;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 200upx;
		/* #ifndef MP */
		border: 7px solid #ffffff !important;
		/* #endif */
	
		/* #ifdef MP */
		border: 8px solid #ffffff !important;
		/* #endif */
	}
</style>
