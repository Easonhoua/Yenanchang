<template>
	<view class="submitOrder teambuy-detail teambuydetail fillorder payment">
		<view class="order-cellbox">
			<view class="order-cell-top">
				<view class="order-cell-imgbox"><image src="../../static/img/details/f_pic1.png"></image></view>
				<view class="order-cell-bd">
					<view class="name">90元代100元券90元代100元券</view>
					<view class="tip">周一至周末可用</view>
					<view class="tip">
						<text>单价：</text><text class="txt">￥{{price}}</text>
						<text>购买数量：</text><text class="txt">{{orderNum}}</text>
						<!-- <text>退款：</text><text class="txt">1</text> -->
					</view>
				</view>
			</view>
			<view class="order-cell">
				<view class="order-cell-bd">
					退款数量
				</view>
				<view class="order-cell-right">
					<view class="number"><text class="reduce" @click="reduce">-</text><input class="input" v-model="num"/><text class="add" @click="add">+</text></view>
				</view>
			</view>
			<view class="order-cell">
				<view class="order-cell-bd">
					退款金额<text>(实付金额)</text>
				</view>
				<view class="order-cell-right orange">¥{{orderTotalAmount}}</view>
			</view>
			<view class="order-cell">
				<view class="order-cell-bd">
					退回账户
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
				<textarea class="textarea" placeholder="请填写问题描述，以便我们更好的帮您解决问题" placeholder-style="color:rgba(230, 231, 233, 1);"></textarea>
			</view>
			<!-- <view class="re-cause re-cause-noflex">
				<image class="upload-img" src="../../static/img/common/sc.png"></image>
				<text>上传问题截图 最多4张 (选填）</text>
			</view> -->
			<photo-component ref='photoUtil' photoTitle="上传图片" photoTip="提供4张上传图片" maxPhotoCount="4" mustSelect="NO" :attachments="imagePath"></photo-component>
		</view>
		<view class="bottombar">
			<view class="btn">申请退款</view>
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
				price:90,//单价
				orderNum:4, //订单明细总和
				num:4,//默认退款数量
				orderTotalAmount:"360.00",
				radio:'',
				radionList:[ //退款理由
					{"id":"A","name":"计划有变"},
					{"id":"B","name":"其他"}
				],
				applicant:'请选择退款原因',
				imagePath:[]
			}
		},
		methods:{
			//数量-
			reduce:function(){
				this.num--;
				if(this.num < 1){
					this.num =1;
				}
				this.orderTotalAmount = this.price * this.num;
				this.orderTotalAmount = this.orderTotalAmount.toFixed(2);
			},
			//数量+
			add:function(){
				this.num++;
				if(this.num >this.orderNum){ //最多只能退订单明细总数
					this.num =this.orderNum;
				}
				this.orderTotalAmount = this.price * this.num;
				this.orderTotalAmount = this.orderTotalAmount.toFixed(2);
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
