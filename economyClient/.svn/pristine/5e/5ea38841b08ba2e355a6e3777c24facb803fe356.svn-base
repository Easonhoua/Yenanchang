<template>
	<view class="page signup">
		<view class="formgroup">
			<view class="cell line-bottom">
				<text class="label">姓名</text>
				<view class="cell-bd">
					<input class="input" placeholder="请输入您的姓名" v-model="activityReserveData.userName" />
				</view>
			</view>
			<view class="cell line-bottom">
				<text class="label">性别</text>
				<view class="cell-bd agreement-input">
					<radio-group class="block" @change="radioChange">
						<radio class='blue radio' :class="activityReserveData.sexFlag==1?'checked':''" :checked="activityReserveData.sexFlag==1?true:false" value="1"></radio>男
						<radio class='blue radio' :class="activityReserveData.sexFlag==2?'checked':''" :checked="activityReserveData.sexFlag==2?true:false" value="2"></radio>女
					</radio-group>
				</view>
			</view>
			<view class="cell line-bottom">
				<text class="label">手机号</text>
				<view class="cell-bd">
					<input class="input" placeholder="请输入您的手机号码" v-model="activityReserveData.mobilePhone"/>
				</view>
			</view>
			<view class="cell line-bottom">
				<text class="label">身份证号</text>
				<view class="cell-bd">
					<input class="input" placeholder="请输入您的身份证号码" v-model="activityReserveData.identityCard"/>
				</view>
			</view>
			<view class="cell line-bottom">
				<view class="cell-bd">
					<input class="verify" placeholder="请输入验证码" v-model="data.code"/>
				</view>
				<view v-if="timeDownFlag" class="btn-verify" style="color: #000000;">{{timeDown}}秒</view>
				<view class="btn-verify" @click="getVerifyCode">获取验证码</view>
			</view>
			<view class="agreement">
				<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
				同意<text class="blue">《xxxxxxxxx活动规则说明书》</text>
			</view>
			<view class="btnbar" :loading="loading" :disabled="loading">
				<view class="btn-submit"  @click="saveData">立即报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					radio:'',
					loading: false,
					activityData:{},
					orderId:0, //订单编号
					activityReserveData:{
						activityId:0, //活动编号
						userName:'',//姓名
						sexFlag:1, //性别
						identityCard:'', //身份证号码
						mobilePhone:'',//手机号码
					},
					timeDownFlag:false,
					timeDown: 120,
					shortType:"activityReserve",
					data:{
						mobilePhone:"",
						password:"",//md5加密后的密码
						openId:"",
						code:"",
						type:"1"//登录方式:1:手机验证码、2:密码、3:QQ、4:微信、5:微博
					}
				}
			},
			onLoad(e){
				if(e.activityId){
					this.activityData.activityId = e.activityId;
					this.$set(this.activityReserveData, 'activityId',e.activityId);
					this.queryDetail(e.activityId);
				}
				var _this=this;
				uni.$on("payCallback",function(params){
					_this.util.gotoOrderDetail(7,_this.orderId,"2")
				});   
			},
			onUnload() {
				uni.$off("payCallback");
			},
			methods: {
				queryDetail:function(activityId){
					let url = '/memberapi/api/activity/read.do';
					let data = {
						activityId: activityId, //
					};
					var that = this;
					this.request.get(url, data).then(res => {
						if(res.returncode == 0){
							that.activityData = res.data;
						}
					})
				},
				radioChange: function(e) {
					this.$set(this.activityReserveData, 'sexFlag',e.detail.value);
				}, 
				saveData: function() {
					if(!this.checker.checkCode(this.data.code)) return;	
					if(this.request.alreadyLogin()){
						if(!this.checker.checkNullText(this.activityReserveData.userName,"请输入姓名")) return;
						if(!this.checker.checkNullText(this.activityReserveData.mobilePhone,"请输入联系手机")) return;
						if(!this.checker.checkNullText(this.activityReserveData.identityCard,"请输入身份证号")) return;
						if(!this.checker.checkPhone(this.activityReserveData.mobilePhone)) return;
						if(!this.checker.checkIdentityCardReg(this.activityReserveData.identityCard)) return;
						this.saveActivityReserveData();
						this.loading = true;
					}
				},
				saveActivityReserveData:function(){
					var _that = this;
					this.activityReserveData.activityCost = this.activityData.activityCost;
					const data = this.activityReserveData;
					let url = "/memberapi/api/activityReserve/add.do";
					this.request.post(url,data).then(res => {
						if (res.returncode === 0 && this.activityData.activityCost > 0) {
							 
							if (res.returnExtendData == 3) { //已支付，跳转订单详情页面
								uni.navigateTo({
									url:"pages/activity/orderDetails?orderId="+res.data.orderId
								})
							}else { //待支付
								_that.orderId = res.data.orderId;
								uni.navigateTo({
									url:"/pages/payment/payment?orderId="+res.data.orderId+'&payTotalAmount='+this.activityData.activityCost
								}) 
							}
						}else if (res.returncode === 0 && this.activityData.activityCost == 0) {
							//_that.request.toastTips("报名成功！");
							uni.navigateTo({
								url:'/pages/activity/success?activityId='+this.activityData.activityId 
							}) 	
						}else{
							_that.loading = false;
							_that.request.toastTips(res.message);
						}
					});
				},
				getVerifyCode: function() {
					this.data.mobilePhone = this.activityReserveData.mobilePhone;
					let data = {
						"mobilePhone": this.data.mobilePhone,
						"shortType": this.shortType
					}
					this.timeDownFlag = true;
					this.request.get("/memberapi/api/members/sendCode.do", data).then(res => {
						this.isSendCode=true;
						this.timeDownFlag = true;
						var time = 120;
						let a = setInterval(() => {
							this.timeDown = time;
							if (time <= 0) {
								this.timeDownFlag = false;
								clearInterval(a);
							}
							time--;
						}, 1000);
					}).catch(res=>{
						this.isSendCode = true;
						this.timeDownFlag = false;
					})
				},
			},
		}
</script>

<style lang="scss">
	/*其他scss */
	@import "@/common/css/other_new.scss";
	.agreement{
		padding-top:15rpx;
		padding-left:20rpx;
	}
	.agreement-input{
		// padding:40rpx 60rpx;
		font-size:20rpx;
		.radio{
			margin-right:10rpx;
			transform:scale(0.7);
			vertical-align: middle;
			margin-top:-5rpx;
		}
	}
	.block{
		font-size:28rpx;
	}
	.blue{
		color:#1ea3f0;
	}
</style>
