<template>
	<view class="submitOrder teambuy-detail teambuydetail fillorder payment">
		<view class="order-cellbox">
			<view class="order-cell-top">
				<view class="order-cell-imgbox"><image :src="util.formatImagePath(orderData.logo)"></image></view>
				<view class="order-cell-bd">
					<view class="name">{{shopsData.shopName}}</view>
					<!-- <view class="tip">{{activityData.activityTheme}}</view> -->
					<view class="time">有效期至：{{orderData.expiryDate}}</view>
					<view class="tip">
						<text class="txt" v-if="orderData.orderTotalAmount != 0">￥{{orderData.orderTotalAmount}}</text>
						<text class="txt" v-else>免费</text>
						<text>购买菜品数：</text><text class="txt">{{orderData.orderNum}}</text>
						<text>退款：</text><text class="txt">{{orderData.orderNum}}</text>
					</view>
				</view>
			</view>
			 
			<view class="order-cell">
				<view class="order-cell-bd">
					退款金额<text>(实付金额)</text>
				</view>
				<view class="order-cell-right orange">
					¥{{orderData.orderTotalAmount}}
				</view>
			</view>
			<view class="order-cell">
				<view class="order-cell-bd">
					退回账户(原路返回)
				</view>
				<view class="order-cell-right orange">
				
				</view>
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
			<photo-component ref='photoUtil' photoTitle="上传图片" photoTip="提供4张上传图片" maxPhotoCount="4" mustSelect="NO" :attachments="imagePath"></photo-component>
		</view>
		<view class="bottombar" :loading="loading" :disabled="loading">
			<view class="btn" @tap="submitRefund">申请退款</view>
		</view>
		
		<!--评价弹出框-->
		<uni-popup ref="popup" type="bottom">
		<view class="refundreason">
			<view class="title"><!-- <view class="close"></view> -->退款原因</view>
				<view class="refundreason-bd">
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
			<view class="uni-popup-confirm-button" :loading="loading" :disabled="loading" @click="confirmBtn('popup')">确定</view>
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
				loading: false,
				orderData:{}, //订单信息
				shopsData:{}, //店铺信息
				
				radio:'',
				radionList:[ //退款理由
					{"id":"A","name":"计划有变"},
					{"id":"B","name":"误购"},
					{"id":"D","name":"其他"}
				],
				applicant:'',//申请内容
				reason:'',//退款原因
				imagePath:[], //上传图片集合
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
			//退款原因选择
			selectReason:function(){
				this.$refs['popup'].open();
			},
			//评论取消
			cancelBtn(type) {
				this.$refs[type].close();
			},
			//评论提交
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
				this.$refs.photoUtil.uploadAttachments("orderItems").then(res=>{
					if(res){
						this.imagePath = res;
						this.refundOrder();
					}else
					{
						this.refundOrder();
					}
				}).catch((res=>{
					this.loading = false;
				}))
			},
			refundOrder:function(){
				let url = '/memberapi/api/delicacy/orders/refundOrder.do';
				let data ={
					orderId : this.orderData.orderId,
					applicant : this.applicant,
					reason : this.reason,
					imagePath : this.imagePath
				}
				var that = this;
				that.request.post(url, data).then(res => {
					if(res.returncode == 0){
						that.request.toastTips("申请成功");
						 setTimeout(function() {
						 	uni.navigateBack({	});
						 }, 1000);
					}else{
						that.request.toastTips("申请失败");
						that.loading = false;
					}
				}) 
			}
		},
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
		font-size: 14px;
		color: #3b4144;
	}
	.uni-popup-confirm-button{
		width: 100%;
		text-align: right;
		font-size: 14px;
		color: #f37b1d;
	}
	radio .wx-radio-input,
	radio .uni-radio-input {
		margin: 0;
		width: 24px;
		height: 24px;
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
