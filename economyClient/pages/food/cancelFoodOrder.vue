<template>
	<view class="content payment">
		<view class="paymentbox">
			<radio-group class="block" @change="radioChange">
				<view class="payment-cell bottom-line" v-for="(item,index) in cancelReasonList" :key="index" >
					<view class="payment-cell-bd">{{item.itemName}}</view>
					<view class="payment-cell-radio">
						<view class="cu-form-group margin-top">
							<radio class="orange" :class="item.itemValue==selectIndex?'checked':''" :checked="item.itemValue==selectIndex?true:false" :value="item.itemValue"></radio>
						</view>
					</view>
					<view v-if="item.itemValue == 9 && item.itemValue==selectIndex ">
						<input  type="text" maxlength="25" v-model="reasonText" placeholder="小夜愿用心倾听您的心声" placeholder-style="color: #C1C1C1;"
						 style="width: 500rpx;"></input>
					</view>
					
				</view>
			</radio-group>
		</view>
		<view class="bottombar">
			<view class="btn" :loading="loading" :disabled="loading" @tap="canceOrder">确认取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				orderId: '', //订单编号
				cancelReasonList:[],
				selectIndex:1,
				reasonText:''
			}
		},
		onLoad(e) {
			if (e.orderId) {
				this.orderId = e.orderId;
			}
			
			this.request.getDictionaryItemList('CancelReason').then(res => {
				this.cancelReasonList = res.list;
			});
		},
		methods: {
			//支付订单
			canceOrder:function(){
				//获取商家订座配置
				const url = '/memberapi/api/orders/closeOrder.do';
				var sendData = {
					orderId: this.orderId,
					closeReason:this.reasonText,
					cancelReason:this.selectIndex
				}
				this.request.post(url, sendData).then(res => {
					this.request.toastTips("取消成功");
					uni.navigateBack({});
				});
			},
			//选取支付类型
			radioChange: function(e) {
				this.selectIndex = e.detail.value;
			},
			
		}
	}
</script>

<style>
	@import "../../common/css/icon.css";
	
	.payment .paymentbox .payment-cell{
		display: flex;
		display: -webkit-flex;
		padding:30rpx;
	}

	.margin-top {
		margin-top: 0;
	}

	.cu-form-group {
		padding: 0;
		min-height: 0;
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
