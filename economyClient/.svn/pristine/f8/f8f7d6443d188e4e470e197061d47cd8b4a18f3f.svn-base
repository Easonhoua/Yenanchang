<template>
	<view class="content" style="height: 100vh;">
		<view class="top-view"></view>
		<view class="hotel-info">
			<view class="shop-name">{{hotelData.shopName}}</view>
			<view class="time">{{util.formatMinutesDay(reserveDate.inDate)}}（{{util.getDateWeekend(reserveDate.inDate)}}) - {{util.formatMinutesDay(reserveDate.outDate)}}（{{util.getDateWeekend(reserveDate.outDate)}}）共{{reserveDate.days}}晚<text class="text-edit">\n{{roomData.roomName}} {{roomData.roomTypeName}} : {{roomData.roomSize}}㎡  {{roomData.windowName}} {{roomData.internetName}}</text></view>
			
			
			<view class="display-row" style="height: 100rpx;line-height: 100rpx;">
				<view class="left-text">房间价格</view>
				<view class="text-edit" style="margin-left: 30rpx;color:rgba(255,135,28,1) ;">￥{{roomData.platformPrice}}</view>
				
			</view>
			
		</view>
		
		<view class="user-info">
		<!-- 	<view class="display-row"  @click="selectRoomCount">
				<view class="text-edit">房间数量</view>
				<view class="text-detail" style="margin-left: 20rpx;">{{roomData.count}}间</view>
				<image class="arrow" :src="isSelectRoomCount?'/static/choose-Cade/choose-Cades.png' : '/static/choose-Cade/choose-Cadex.png' "></image>
			</view> -->
			<view class="info-cell display-row border-bottom-gray-line" @click="selectRoomCount">
				<view class="left-text">房间数量</view>
				<input class="right-input" :disabled='true' type="text" v-model="roomData.count" placeholder="请选择房间数量"/>
				<image class="right-image" :src="isSelectRoomCount?'/static/choose-Cade/choose-Cades.png' : '/static/choose-Cade/choose-Cadex.png' "></image>
			</view>
			<view v-if="isSelectRoomCount" class="room-count">
				<view class="number" v-for="(item,index) in roomCounts" :key="index" @click="roomCountItemClick(item)">{{item}}</view>
			</view>
			<view class="info-cell display-row border-bottom-gray-line">
				<view class="left-text">住客姓名</view>
				<input class="right-input" type="text" v-model="userData.name" placeholder="请填写入住人姓名"/>
				<image class="right-image" src="/static/img/hotel/user.png"></image>
			</view>
			<view class="info-cell display-row border-bottom-gray-line">
				<view class="left-text">联系电话</view>
				<input class="right-input" type="text" v-model="userData.mobilePhone" placeholder="填写手机号码接收确认短信"/>
				<image class="right-image" src="/static/img/hotel/phone.png"></image>
			</view>
			<view class="info-cell display-row" @click="selectArrivalTime">
				<view class="left-text">预计到店</view>
				<input class="right-input" :disabled='true' type="text" v-model="arrivalTime" placeholder="请输入预计到店时间,房间将整晚保留"></input>
				<image class="right-image" src="/static/img/hotel/right.png"></image>
				<!-- <text>房间将整晚保留11</text> -->
			</view>
		</view>
		
		<view class="bottom-view display-row">
			<view class="price">￥{{totalPrice}}</view>
			<!-- <text class="detail">明细</text> <image class="arrow" src="/static/choose-Cade/choose-Cades.png"></image> -->
			<button class="order-button" type="primary" @click="submitOrder">提交订单</button>
		</view>
		
		<view v-if="showArrival" class="arrival-view" @click="hideArrivalView">
			<view class="white">
				<view class="text-detail" style="font-size: 36rpx;">预计到店</view>
				<view class="text-edit">房间整晚保留，14:00前到店可能需要等房</view>
				<scroll-view class="time-view" scroll-x="true">
					<view class="time-cell" v-for="(item,index) in arrivarTimeList" :key="index" v-on:click.stop="arrivarTimeCellClick(item)">{{item}}</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
				// reserveDate:{
				// 	inDate:""
				// },
				reserveDate:{
					inDate:'',//入住时间
					outDate:'',//离店时间
					days:""//入住天数
				},
				hotelData: {},
				roomData:{
					count : "1",
					surplusRoomNum:5
				},
				userData:{},
				roomCounts:[],
				isSelectRoomCount:false,
				arrivalTime:"12:00",
				showArrival:false,
				arrivarTimeList:[],
				totalPrice:100
			}
		},
		onHide() {
			// uni.removeStorageSync("reserveDate");
		},
		onLoad() {
			if(uni.getStorageSync("reserveDate")) this.reserveDate = uni.getStorageSync("reserveDate");
			if(!this.reserveDate.inDate){
				var inDate = new Date();
				this.reserveDate.inDate = this.util.formatDate(inDate);
				this.reserveDate.outDate = this.util.getDateWithCount(1);
				this.reserveDate.days = '1';
			}
			
			this.hotelData = uni.getStorageSync("hotelData");
			this.roomData = uni.getStorageSync("hotelRoomData");
			this.userData = uni.getStorageSync("user");
			this.roomData.count = "1";
			var today = new Date();
			//var tt = today.getTime();
			// var ntt = tt + 1 * 60 * 60 * 1000;//到店时间为预定时间往后1小时
			// this.arrivalTime = this.util.formatMinutesTime(ntt);
			var hour = today.getHours();
			console.log("hourhour == ",hour);
			this.arrivarTimeList = [];
			for (var i = hour+1; i < 24; i++) {
				this.arrivarTimeList.push(i+':00');
			}
			for (var i = 0; i < 7; i++) {
				this.arrivarTimeList.push('0'+i+':00');
			}
			this.arrivalTime = this.arrivarTimeList[0];
			for (var i = 1; i < this.roomData.surplusRoomNum+1; i++) {
				this.roomCounts.push(i);
			}
			this.totalPrice = this.roomData.count * this.roomData.platformPrice * Number(this.reserveDate.days);
			this.totalPrice = this.totalPrice.toFixed(2);
			this.roomData.platformPrice = this.roomData.platformPrice.toFixed(2);
		},
		methods: {
			selectRoomCount:function(){
				this.isSelectRoomCount = !this.isSelectRoomCount;
			},
			roomCountItemClick:function(item){
				this.roomData.count = item;
				this.isSelectRoomCount = false;
				this.totalPrice = this.roomData.count * this.roomData.platformPrice * Number(this.reserveDate.days);
				this.totalPrice = this.totalPrice.toFixed(2);
				
			},
			// 选择预计到店时间
			selectArrivalTime:function(){
				this.showArrival = true;
			},
			hideArrivalView:function(){
				this.showArrival = false;
			},
			arrivarTimeCellClick:function(item){
				console.log("itemitem = ",item);
				this.arrivalTime = item;
				this.showArrival = false;
			},
			submitOrder:function(){
				if(!this.checker.checkNullText(this.userData.name,"请输入住客姓名")) return;
				if(!this.checker.checkPhone(this.userData.mobilePhone,"请输入联系电话")) return;
				if(!this.checker.checkNullText(this.arrivalTime,"请输入预计到店时间,房间将整晚保留")) return;
				var url = "/memberapi/api/hotelRoomRule/createOrder.do"
				var data = {
					roomTypeId : this.roomData.roomTypeId,
					hotelIncomeDate : this.reserveDate.inDate,
					hotelOutDate : this.reserveDate.outDate,
					hotelRommNum : this.roomData.count,
					hotelOccupant : this.userData.name,
					contactPhone : this.userData.mobilePhone,
					expectedArrivalTime : this.arrivalTime,
					platformPrice : this.roomData.platformPrice
				}
				this.request.post(url,data).then(res=>{
					uni.navigateTo({
						url:"/pages/payment/payment?orderId="+res.data.orderId + "&payTotalAmount=" + res.data.payTotalAmount
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.top-view{
		width: 750rpx;
		height: 240rpx;
		background:linear-gradient(to bottom ,#FFC448,rgba(255,147,36,0.8) 100%);
	}
	
	.hotel-info{
		margin: 20rpx;
		width: 710rpx;
		padding: 30rpx;
		padding-bottom: 10rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		margin-top: -200rpx;
		.shop-name{
			font-size: 36rpx;
			font-weight: bold;
		}
		.time{
			font-size:32rpx;
			margin-top: 30rpx;
			padding: 30rpx 0rpx;
			border-top: 2rpx solid #F5F5F5;
			border-bottom: 2rpx solid #F5F5F5;
		}
		.arrow{
			width: 90rpx;
			height: 90rpx;
			padding: 27rpx 0rpx 27rpx 54rpx;
			margin-left: auto;
		}
		
	}
	
	.user-info{
		margin: 20rpx;
		margin-top: 0rpx;
		width: 710rpx;
		padding: 20rpx 30rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		line-height: 100rpx;
		.info-cell{
			height: 100rpx;
			.left-text{
				width: 160rpx;
				font-size:32rpx;
				font-weight:400;
				color:#9B9B9B;
			}
			.right-input{
				font-size:32rpx;
				font-weight:400;
				text-align: left;
				color: #000000;
			}
			.right-image{
				width: 45rpx;
				height: 40rpx;
				// margin-right: 30rpx;
				margin-left: auto;
			}
		}
		
	}
	.room-count{
		background-color: #F5F5F5;
		padding: 20rpx 14rpx 10rpx 30rpx;
		overflow: hidden;//加上背景色才自动填充
		margin-bottom: 20rpx;
		.number{
			float: left;
			box-sizing: border-box;
			color: #FFFFFF;
			width: 104rpx;
			height: 46rpx;
			margin-right: 16rpx;
			margin-bottom: 16rpx;
			line-height: 46rpx;
			font-size: 28rpx;
			text-align: center;
			background:#FFC448;
			border-radius: 6rpx;
		}
	}
	.bottom-view{
		width:750rpx;
		height:120rpx;
		background:rgba(255,255,255,1);
		position: absolute;
		bottom: 0rpx;
		.price{
			height:50rpx;
			margin-left: 30rpx;
			font-size:36rpx;
			font-weight:500;
			line-height:50rpx;
			color:rgba(255,135,28,1);
		}
		.detail{
			height:33rpx;
			font-size:24rpx;
			font-weight:400;
			line-height:33rpx;
			color:rgba(255,137,29,1);
			margin-left: auto;
		}
		.arrow{
			width: 80rpx;
			height: 90rpx;
			padding: 28rpx 0rpx;
			padding-left: 15rpx;
			padding-right: 30rpx;
			margin-right: 0rpx;
		}
		.order-button{
			min-width: 240rpx;
			width:240rpx;
			height:80rpx;
			line-height: 80rpx;
			margin-right: 30rpx;
			margin-left: auto;
			background:linear-gradient(to right ,#FFC448,rgba(255,147,36,0.9) 100%);
			
			border-radius:8rpx;
		}
	}
	
	.arrival-view{
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3);
		.white{
			position: absolute;
			width: 100vw;
			padding: 30rpx;
			padding-right: 0rpx;
			background-color: #FFFFFF;
			bottom: 0rpx;
			.time-view{
				width: 100%;
				display: flex;
				white-space: normal;
				flex-direction: row;
				.time-cell{
					display: inline-block;
					color: #FFFFFF;
					background-color: #FFC448;
					width: 210rpx;
					height: 70rpx;
					line-height: 70rpx;
					margin-right: 30rpx;
					margin-top: 20rpx;
					text-align: center;
				}
			}
		}
	}
</style>