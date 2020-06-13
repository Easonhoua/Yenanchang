<template>
	<view class="content">
		<view class="room-view display-row">
			<image class="room-view-image" src="../../static/img/common/icon_edit.png"></image>
			<view class="text-detail">{{bookOrder.displayDate}} {{bookOrder.bookTime}} {{bookOrder.dinersNum}}人
				{{bookOrder.bookRoomTypeName}}</view>
			<view class="room-view-button" @tap="updateOrder">修改</view>
		</view>
		<view class="info-view">
			<view class="info-view-tiem">
				<image class="room-view-image" src="../../static/img/common/icon_name.png"></image>
				<input class="info-input" v-model="bookOrder.occupant" type="text" placeholder="请填写用餐人姓名" placeholder-style="color: #C1C1C1;"></input>
				<radio-group name="">
					<label class="cu-form-group">
						<radio class="orange" @tap="selectSex(1)" :checked="bookOrder.sexFlag==1" value="1" style="transform:scale(0.7);margin-left: 10rpx;" /><text>先生</text>
						<radio class="orange" @tap="selectSex(2)" :checked="bookOrder.sexFlag==2" value="2" style="transform:scale(0.7);margin-left: 10rpx;" /><text>女士</text>
					</label>
				</radio-group>
			</view>
			<view class="info-view-tiem">
				<image class="room-view-image" src="../../static/img/common/icon_phone.png"></image>
				<input class="phone-input" v-model="bookOrder.contactPhone" type="text" placeholder="请输入电话号码" placeholder-style="color: #C1C1C1;"></input>
			</view>
			<view class="info-view-tiem">
				<image class="room-view-image" src="../../static/img/common/icon_message.png"></image>
				<input type="text" maxlength="25" v-model="bookOrder.orderRemark" placeholder="留言备注,我们将尽快安排" placeholder-style="color: #C1C1C1;"
				 style="width: 500rpx;"></input>
				<view class="text-edit right-style" style="margin-right: 30rpx;">{{bookOrder.orderRemark.length}}/25</view>
			</view>
		</view>
		<view class="menu-view" v-if="foodMenuList.length > 0">
			<view class="recommend-title">推荐菜品</view>
			<checkbox-group class="block" @change="checkboxChange">
				<view class="menu-item display-row" v-for="(item,index) in foodMenuList" :key="index">
					<view class="cu-form-group">
						<checkbox class='round orange' :class="item.checked?'checked':''" :checked="item.checked?true:false" :value="item.foodId+''"></checkbox>
					</view>
					<image class="menu-item-image" :src="item.imagePath" mode="aspectFill"></image>
					<view class="display-column">
						<view class="recommend-name">{{item.foodName}}</view>
						<view class="recommend-sale-count"></view>
						<view class="display-row">
							<view class="recommend-discount-price">￥{{item.discountPrice}}</view>
							<view class="recommend-sale-price">￥{{item.originalCost}}</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view v-if="payFlag" class="room-reserve-view display-row" @click="gotoPay">
			<view class="room-reserve-price">￥{{payTotalAmount}}</view>
			<view class="room-reserve-pay">立即支付</view>
		</view>
		<view v-else class="room-reserve-view display-row" @click="gotoPay">
			<view>立即预订</view>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("@/common/js/graceChecker.js");
	var rule = [{name: "occupant",checkType: "notnull",checkRule: "",errorMsg: "用餐人姓名不能为空"},
				{name: "contactPhone",checkType: "notnull",checkRule: "",errorMsg: "手机号码不能为空"}
			];
	export default {
		data() {
			return {
				foodIds: [],
				payFlag: false,
				name: "",
				phone: "",
				message: "",
				foodMenuList: [],
				payTotalAmount:0,
				mobilePhone:'',
				bookOrder: {
					orderRemark: ''
				},
				checkdFoodList: []
			}
		},
		onLoad(e) {
			if (e.bookOrder) {
				this.bookOrder = JSON.parse(e.bookOrder);
				if (this.bookOrder.depositAmount && this.bookOrder.depositAmount > 0) {
					this.payFlag = true;
					this.payTotalAmount = this.bookOrder.depositAmount;
				}else{
					this.bookOrder.depositAmount = 0;
				}
			}
			this.initData();
			this.getFoodList();
		},
		methods: {
			initData: function() {
				let user = uni.getStorageSync("user");
				this.$set(this.bookOrder, 'occupant', user.userName);
				//var mobilePhone = user.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");
				this.$set(this.bookOrder, 'contactPhone', user.mobilePhone);
				this.$set(this.bookOrder, 'sexFlag', user.sexFlag);
				this.$set(this.bookOrder, 'orderRemark', '');
			},
			getFoodList() {
				//获取商家订座配置
				const url = '/memberapi/api/delicacyFood/list.do';
				var sendDate = {
					shopId: this.bookOrder.shopId,
					// recommendType: 1,
					pageNo: 1,
					pageSize: 100//查询所有菜单
				};
				this.request.get(url, sendDate).then(res => {
					let currListData = res.list;
					currListData.forEach(item => {
						item.imagePath = this.util.formatImagePaths(item.imagePath)[0];
						item.checked = false;
					});

					this.foodMenuList = currListData;
				});
			},
			selectSex: function(sexFlag) {
				this.$set(this.bookOrder, 'sexFlag', sexFlag);
			},
			gotoPay: function() {
				//表单验证
				var checkRes = graceChecker.check(this.bookOrder, rule);
				if (checkRes) {
					this.loading = true;
					this.submitOrder();
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			submitOrder(){
				this.foodMenuList.forEach(item => {
					if(item.checked){
						this.foodIds.push(item.foodId);
					}
				});
				if(this.foodIds.length > 0){
					this.$set(this.bookOrder, 'foodIds', this.foodIds.join(","));
				}
				//获取商家订座配置
				const url = '/memberapi/api/delicacy/orders/add.do';
				this.request.post(url, this.bookOrder).then(res => {
					
					if(res.data.orderStatus == 1){
						//提交订单
						uni.navigateTo({
							url:"/pages/payment/payment?orderId="+res.data.orderId+"&payTotalAmount="+res.data.payTotalAmount
						});
					}else{
						//跳转到下单成功页面
						uni.navigateTo({
							url:"/pages/food/foodOrderDetail?orderId="+res.data.orderId
						})
					}
					
				});
			},
			checkboxChange(e) {
				var items = this.foodMenuList,
					values = e.detail.value;
				var depositAmount = this.bookOrder.depositAmount?this.bookOrder.depositAmount:0;
				var amount = 0;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].foodId == values[j]) {
							items[i].checked = true;
							amount += items[i].discountPrice;
							break
						}
					}
				}
				this.payTotalAmount = depositAmount + amount;
				if(this.payTotalAmount > 0){
					this.payFlag = true;
				}else{
					this.payFlag = false;
				}
				
			},
			updateOrder: function() {
				uni.navigateTo({
					url: "/pages/food/foodReserve?bookOrder=" + JSON.stringify(this.bookOrder)
				})
			}
		}
	}
</script>

<style>
	@import "../../common/css/icon.css";
	.cu-form-group {
		padding: 0;
		min-height: 0;
	}
	
	radio .wx-radio-input,
	checkbox .wx-checkbox-input,
	radio .uni-radio-input,
	checkbox .uni-checkbox-input{
		margin: 0;
		width: 24px;
		height: 24px;
	}
	
	
	radio.radio[checked]::after,
	checkbox.checkbox[checked]::after,
	radio.radio .uni-radio-input-checked::after,
	checkbox.checkbox .uni-checkbox-input-checked::after {
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
	
	
	.room-view {
		margin: 20rpx 15rpx 0rpx 15rpx;
		width: 720rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 15rpx;
	}

	.room-view-image {
		width: 48rpx;
		height: 48rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.room-view-button {
		color: #FF871C;
		margin-left: auto;
		margin-right: 30rpx;
	}

	.info-view {
		margin: 20rpx 15rpx;
		width: 720rpx;
		height: 300rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.info-view-tiem {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 720rpx;
		height: 100rpx;
		background-color: #FFFFFF;
	}

	.info-input {
		font: 30rpx;

	}

	.phone-input {
		width: 600rpx;
		height: 100rpx;
		border-top: 1rpx solid #EEEEEE;
		border-bottom: 1rpx solid #EEEEEE;

	}

	.recommend-view {
		margin: 0rpx 15rpx 0rpx 15rpx;
		width: 720rpx;
		height: 380rpx;
		background-color: #FFFFFF;
		border-radius: 15rpx;
	}

	.recommend-scollview {
		margin-left: 30rpx;
		margin-right: 30rpx;
		width: 660rpx;
		height: 240rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.recommend-item {
		display: inline-block;
		width: 220rpx;
		height: 240rpx;
		margin-right: 30rpx;
	}

	.recommend-title {
		color: #4A4A4A;
		padding: 30rpx;
		font-size: 32rpx;
		font-weight: 500;
	}

	.recommend-image {
		width: 220rpx;
		height: 160rpx;
		border-radius: 8rpx;
	}

	.recommend-name {
		font-size: 28rpx;
		font-weight: 500;
	}

	.recommend-sale-price {
		color: #989898;
		font-size: 20rpx;
		margin-left: auto;
	}

	.recommend-sale-count {
		color: #989898;
		font-size: 20rpx;
	}

	.recommend-discount-price {
		color: #FF871C;
		font-size: 24rpx;
		margin-left: auto;
	}

	.menu-view {
		margin: 15rpx 15rpx 40rpx 15rpx;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		padding-bottom: 60rpx;
	}

	.menu-item {
		width: 720rpx;
		height: 180rpx;
	}

	.menu-select-image {
		width: 56rpx;
		height: 56rpx;
		padding: 10rpx;
		margin-left: 20rpx;
	}

	.menu-item-image {
		width: 160rpx;
		height: 140rpx;
		border-radius: 15rpx;
		margin-left: 10rpx;
		margin-right: 20rpx;
	}

	.room-reserve-view {
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 10rpx;
		height: 100rpx;
		color: #FFFFFF;
		border-radius: 15rpx;
		background: linear-gradient(to right, #FFC449, #FF9223);
		text-align: center;
		justify-content: center;
		z-index: 10;
	}

	.room-reserve-price {
		font-size: 40rpx;
		font-weight: 500;
	}

	.room-reserve-pay {
		margin-left: 40rpx;
		font-size: 32rpx;
		font-weight: 400;
	}

	.room-reserve-book {
		margin-left: 20rpx;
		font-size: 32rpx;
		font-weight: 400;
	}
</style>
