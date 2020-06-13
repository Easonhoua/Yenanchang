<template>
	<view class="content signup cashcoupon fillorder">
		<!-- 滑动图片 -->
		<view class="topbox" style="background: none;">	
			<view class="explain">
				<view class="inner fillin">
					<view class="explain-cell mb20" style="margin-top: 2rpx;">
						<view class="label">出行人</view>
						<view class="explain-cell-bd">
							<input placeholder="请填写出行人姓名" v-model="userName" placeholder-style="color:rgba(230, 231, 233, 1);" type="text" maxlength="50"/>
						</view>
					</view>
					<view class="explain-cell bottom-line">
						<view class="label">证件类型</view>
						<view class="explain-cell-bd">
							<input value="身份证"/>
							<!-- <picker class="input" mode="selector">
								<view>
									<input placeholder="未选择" placeholder-style="color:rgba(230, 231, 233, 1)" />
								</view>
							</picker> -->
						</view>
						<!-- <view class="arrow-rt"></view> -->
					</view>
					<view class="explain-cell mb20">
						<view class="label">身份证号</view>
						<view class="explain-cell-bd">
							<input placeholder="请填写身份证号码" v-model="identityCard" placeholder-style="color:rgba(230, 231, 233, 1);" maxlength="100"/>
						</view>
					</view>
					<view class="explain-cell bottom-line">
						<view class="label">联系手机</view>
						<view class="explain-cell-bd">
							<input placeholder="请填写手机号码" v-model="mobilePhone" placeholder-style="color:rgba(230, 231, 233, 1);" type="number" maxlength="30"/>
						</view>
					</view>
					<view class="explain-cell">
						<view class="label" >是否默认</view>
						<view class="explain-cell-bd">
							<switch color="#76D2FC" style="transform:scale(0.7)" :checked="isDefault==1?true:false" @change="switchChangeIsFree"  />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottombar">
			<view class="btn" :loading="loading" :disabled="loading" @click="saveData">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				loading:false,
				handleType:'',
				userName:'',
				identityCard:'',
				mobilePhone:'',
				isDefault:2,//非默认
				travelUserId:0,
			}
		},
		onLoad(option){
			if(option.type){
				this.handleType = option.type;
			}
			if(option.travelUserId){
				this.travelUserId = option.travelUserId;
				this.readCurrTravelInfo();
			}
		},
		methods:{
			readCurrTravelInfo:function(){
				let url = "/memberapi/api/travelInfo/read.do";
				let data = {
					travelUserId: this.travelUserId,
				}
				this.request.post(url,data).then(res => {
					this.travelUserId = res.data.travelUserId;
					this.userName = res.data.travelUserName;
					this.mobilePhone = res.data.mobilePhone;
					this.identityCard = res.data.cardNo;
					this.isDefault = res.data.isDefault;
				});
			},
			saveData: function() {
				if(!this.checker.checkNullText(this.userName,"请填写出行人")) return;
				if(!this.checker.checkNullText(this.identityCard,"请输入身份证号")) return;
				if(!this.checker.checkNullText(this.mobilePhone,"请输入联系手机")) return;
				if(!this.checker.checkIdentityCardReg(this.identityCard)) return;
				if(!this.checker.checkPhone(this.mobilePhone)) return;
				this.loading = true;
				this.saveTravelData();
			},
			saveTravelData:function(){
				let data = {
					travelUserName:this.userName,
					mobilePhone:this.mobilePhone,
					cardNo:this.identityCard,
					isDefault:this.isDefault,
				};
				let url = "/memberapi/api/travelInfo/add.do";
				if(this.handleType == 'update'){
					url = "/memberapi/api/travelInfo/update.do";
					this.$set(data, 'travelUserId', this.travelUserId);
				}
				this.request.post(url,data).then(res => {
					if (res.returncode === 0) {
						this.loading = false;
						uni.$emit("addTravelData");
						uni.navigateBack();
					}else{
						this.loading = false;
						if(this.handleType == 'update'){
							this.request.toastTips("修改出行人信息失败,请稍后再试!");
						}else{
							this.request.toastTips("添加出行人失败,请稍后再试!");
						}
					}
				});
			},
			//切换是否默认
			switchChangeIsFree:function(e){
				if (e.target.value) {
					this.isDefault = 1;
				} else {
					this.isDefault = 2;
				}
			},
		}
	}
</script>

<style>
	@import "../../common/css/icon.css";
	.topbox{
		
		background: none;
	}
	.signup .topbox .explain{
		padding:0;
	}
	.signup .topbox .explain .inner{
		background: none;
	}
	.signup .topbox .explain .inner .explain-cell{
		background: #fff;
	}
	.signup .topbox .explain .inner .mb20{
		margin-bottom:20rpx;
	}
	.arrow-rt {
		padding-right: 24rpx;
		position: relative;
	}
	
	.arrow-rt:after {
		content: " ";
		width: 30rpx;
		height: 30rpx;
		background-image: url('~@/static/img/common/right-choose-arrow.png');
		background-size: 30rpx 30rpx;
		background-position: right center;
		position: absolute;
		right: 0;
		top: 10rpx;
	}
	.bottombar{
		background: none;
	}
	.bottombar .btn{
		height:98rpx;
		line-height:98rpx;
		width:100%;
		text-align: center;
		border-radius: 15rpx;
		color:#fff;
		font-size:36rpx;
		font-weight:650;
		background:#31A2F8;
	}
</style>