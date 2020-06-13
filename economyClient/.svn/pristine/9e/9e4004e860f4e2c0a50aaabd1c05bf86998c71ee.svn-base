<template>
	<view>
		<view class="reserve-title">预定人数</view>
		<view class="display-row warp" >
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" >
				<view v-for="(item,index) in peopleRanges" :key="index" @click="selectPeopleNumber(index,item)" class="scroll-view-item_H">
					<view v-if="bookOrder.dinersNum === item" class="room-type-select">{{item}}人</view>
					<view v-else class="room-type-normoal">{{item}}人</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="reserve-title">预定日期</view>
		<view class="display-row warp">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view v-for="(item,index) in reserveConfig.dateRange" :key="index" @click="selectBookDate(index,item.bookDate,item.displayDate)" class="scroll-view-item_H">
					<view v-if="bookOrder.bookDate === item.bookDate" class="room-type-select">{{item.displayDate}}<br/><label class="font-12">{{item.weekName}}</label></view>
					<view v-else class="room-type-normoal">{{item.displayDate}}<br/><label class="font-12">{{item.weekName}}</label></view>
				</view>
			</scroll-view>
		</view>
		<view class="reserve-title">预定时间</view>
		<view class="display-row warp">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view v-for="(item,index) in currBookTimeList" :key="index" @click="selectBookTime(index,item)" class="scroll-view-item_H">
					<view v-if="bookOrder.bookTime === item" class="room-type-select">{{item}}</view>
					<view v-else class="room-type-normoal">{{item}}</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="reserve-title">预定房间</view>
		<view class="display-row warp">
			<view v-for="(item,index) in bookRoomTypes" :key="index" @click="selectRoomType(index,item)">
				<view v-if="bookOrder.bookRoomType == item.value" class="room-type-select">{{item.name}}<br/><label class="font-12">{{item.minNumberName}}</label></view>
				<view v-else class="room-type-normoal">{{item.name}}<br/><label class="font-12">{{item.minNumberName}}</label></view>
			</view>
		</view>
		<view class="room-reserve-view display-row" @click="orderRoom">
			<view class="room-reserve-left">{{bookOrder.displayDate}}  {{bookOrder.bookTime}}  {{bookOrder.dinersNum}}人  {{bookOrder.bookRoomTypeName}}</view>
			<view class="room-reserve-line"></view>
			<view class="room-reserve-right">立即预定</view>
			<view v-if="depositFlag" class="bubble">
				<view class="bold">每单需预付 ￥{{bookOrder.depositAmount}} 订金</view>
				<view>可用于抵消餐费，提前{{bookOrder.allowRefundTime}}小时取消可退</view>
				<view class="arrow-down"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				depositFlag:false,
				shopId: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				bookRoomTypes:[{name:'大厅',value:1}],
				countIndex:-1,
				peopleRanges:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
				dateRanges:[],
				selectTime:"",
				roomOrder:{},
				reserveConfig:{},
				bookTimeList:[],
				currBookTimeList:[],
				bookOrder:{
					dinersNum:1,
					bookRoomType:1,
					bookRoomTypeName:'大厅'
				},
				selectBookOrder:{}
			}
		},
		onLoad(e) {
			
			if (e.shopId) {
				this.shopId = e.shopId;
				this.$set(this.bookOrder,'shopId',e.shopId);
			}else if(e.bookOrder){
				this.selectBookOrder =JSON.parse(e.bookOrder);
				this.shopId = this.selectBookOrder.shopId;
			}
			
			this.readDetail();
		},
		methods: {
			readDetail: function() {
				//获取商家订座配置
				const url = '/memberapi/api/delicacyReserveConfig/readByShopId.do';
				let sendDate = {
					shopId: this.shopId
				};
				this.request.get(url, sendDate).then(res => {
					this.reserveConfig = res.data;
					if(res.data.roomFlag == 1){
						var roomtype ={name:"包间",value:2};
						if(res.data.minNumber && res.data.minNumber > 0){
							roomtype.minNumber = res.data.minNumber;
							roomtype.minNumberName = res.data.minNumber+"人起订";
						}
						this.bookRoomTypes.push(roomtype);
					}
					
					if(this.selectBookOrder && this.selectBookOrder.shopId){
						this.bookOrder = this.selectBookOrder;
					}else{
						let dateRange = this.reserveConfig.dateRange[0];
						this.$set(this.bookOrder,'bookDate',dateRange.bookDate);
						this.$set(this.bookOrder,'displayDate',dateRange.displayDate);
					
						this.bookTimeList = this.reserveConfig.bookTimeList;
						let bookTime = this.reserveConfig.bookTimeList[0];
						this.$set(this.bookOrder,'bookTime',bookTime);
						
						this.setBookTimeList(dateRange.bookDate);
					}
					if(this.reserveConfig.depositAmount && this.reserveConfig.depositAmount > 0){
						this.depositFlag = true;
						this.$set(this.bookOrder,'depositAmount',this.reserveConfig.depositAmount);
						this.$set(this.bookOrder,'allowRefundTime',this.reserveConfig.allowRefundTime);
					}else{
						this.$set(this.bookOrder,'depositAmount',0);
					}
					
				});
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			selectBookDate:function(index,bookDate,displayDate){
				this.$set(this.bookOrder,'bookDate',bookDate);
				this.$set(this.bookOrder,'displayDate',displayDate);
				this.setBookTimeList(bookDate);
			},
			selectBookTime:function(index,bookTime){
				this.$set(this.bookOrder,'bookTime',bookTime);
			},
			selectPeopleNumber:function(index,item){
				this.$set(this.bookOrder,'dinersNum',item);
			},
			// 选择房间类型
			selectRoomType:function(index,bookRoomType){
				if(bookRoomType.minNumber && bookRoomType.minNumber > 0){
					if(this.bookOrder.dinersNum < bookRoomType.minNumber){
						this.request.toastTips(bookRoomType.name+bookRoomType.minNumberName);
						return false;
					}
				}
				
				this.$set(this.bookOrder,'bookRoomType',bookRoomType.value);
				this.$set(this.bookOrder,'bookRoomTypeName',bookRoomType.name);
			},
			setBookTimeList(bookDate){
				var currDate = new Date();
				if(this.isToday(bookDate)){
					var currDate = new Date();
					currDate.setMinutes(currDate.getMinutes () + 30);
					var currTime = currDate.getHours()+":"+currDate.getMinutes();
					this.currBookTimeList = [];
					this.bookTimeList.forEach(bookTime => {
						if(bookTime > currTime){
							this.currBookTimeList.push(bookTime);
						}
					});
				}else{
					this.currBookTimeList = this.bookTimeList;
				}
				this.$set(this.bookOrder,'bookTime',this.currBookTimeList[0]);
				
			},
			isToday(str){
			    var d = new Date(str.replace(/-/g,"/"));
			    var todaysDate = new Date();
			    if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
			        return true;
			    } else {
			        return false;
			    }
			},
			// 立即订座
			orderRoom:function(){
				if(this.request.alreadyLogin()){
					//订座下单
					uni.navigateTo({
						url:"/pages/food/foodPlaceOrder?bookOrder="+JSON.stringify(this.bookOrder)
					});
				}
				
			}
		}
	}
</script>

<style>
	.bubble{
		position: absolute;
		padding:12rpx 30rpx;
		border-radius: 100rpx;
		background: linear-gradient(to right, #FFC449,#FF9223);
		box-shadow: 0 0 10rpx rgba(0,0,0,.1);
		color:rgba(255,255,255,.7);
		display: inline-block;
		bottom:130rpx;
		font-size:20rpx;
	}
	.bubble .bold{
		font-size:24rpx;
		color:#fff;
		margin-bottom:5rpx;
	}
	.bubble .arrow-down{
		width: 0;
		height: 0;
		border-right: 15px solid transparent;
		border-left: 1px solid transparent;
		border-top: 15px solid #FFC449;
		position: absolute;
		bottom: -13px;
		left: 30px;
	}
	.warp{
		width: 375px;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item_H {
		display: inline-block;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 28rpx;
	}
	.reserve-title{
		padding: 30rpx;
		font-size: 36rpx;
		font-weight: 500;
	}
	.reserve-select-view{
		background-color: #F6F6F6;
		border-radius: 8rpx;
		width: 250rpx;
		height: 70rpx;
		margin-left: 30rpx;
	}
	.reserve-down-image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		/* padding: 10rpx 20rpx 10rpx 60rpx; */
	}
	.reserve-select-text
	{
		margin-left: 30rpx;
		font-size: 32rpx;
		color: #FF9223;
	}
	
	
	.room-type-select{
		font-size: 28rpx;
		border-radius: 8rpx;
		margin-left: 30rpx;
		padding: 10rpx 30rpx;
		background-color:#FFEFDA;
		color: #FF871C;
		display: inline-block;
		overflow:hidden;
	}
	.room-type-normoal{
		font-size: 28rpx;
		border-radius: 8rpx;
		margin-left: 30rpx;
		padding: 10rpx 30rpx;
		background-color:#F6F6F6;
		color: #989898;
		display: inline-block;
		overflow:hidden;
	}
	.room-reserve-view{
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 30rpx;
		height: 100rpx;
		color: #FFFFFF;
		border-radius: 15rpx;
		background: linear-gradient(to right, #FFC449,#FF9223);
	}
	.room-reserve-left{
		font-size: 28rpx;
		margin-left: 60rpx;
	}
	.room-reserve-line{
		width: 2rpx;
		height: 60rpx;
		background-color: #FFFFFF;
		margin-left: 80rpx;
	}
	.room-reserve-right{
		font-size: 36rpx;
		font-weight: 500;
		margin-left: auto;
		margin-right: 40rpx;
	}
	
</style>
