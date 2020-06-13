<template>
	<view class="content signup cashcoupon fillorder">
		<!-- 滑动图片 -->
		<view class="topbox">	
			<view class="navbar">
				<image class="back" src="../../static/img/common/white-back.png" @tap="back" style="display: inline-block;margin-top: 36rpx;"></image>
				<text style="display: inline-block;">填写订单</text>
			</view>
				<view class="explain">
				<view class="inner">
					<view class="explain-cell bottom-line name line-limit-length">{{ticketName?ticketName:'---'}}</view>
					<view class="explain-cell explain-cell-noflex bottom-line">
						<view class="label">使用日期</view>
						<view class="datebox">
							<view v-if="currIndex == 1" :class="isDateDisable?'item disable':'item current'" @tap="chooseBookDate(1)">
								<text>今天{{today}}</text>
								<text v-if="isDateDisable">不可预订</text>
								<text v-else  class="orange">￥{{ticketPrice}}</text>
							</view>
							<view v-else :class="isDateDisable?'item disable':'item'" @tap="chooseBookDate(1)">
								<text>今天{{today}}</text>
								<text v-if="isDateDisable">不可预订</text>
								<text v-else  class="orange">￥{{ticketPrice}}</text>
							</view>
							<view :class="currIndex == 2 ? 'item current' : 'item'" @tap="chooseBookDate(2)">
								<text>明天{{tomorrow}}</text>
								<text class="orange">￥{{ticketPrice}}</text>
							</view>
							<view :class="currIndex == 3 ? 'item current' : 'item'" @tap="chooseBookDate(3)">
								<text>后天{{afterTomorrow}}</text>
								<text class="orange">￥{{ticketPrice}}</text>
							</view>
							<view :class="currIndex == 4 ? 'item current' : 'item'" style="width:auto;margin-right:0;" @tap="chooseBookDate(4)">
								<view style="width: 100rpx;vertical-align: middle;">更多日期</view>
								<text class="orange">{{currChooseDate}}</text>
							</view>
							<good-date-picker ref="goodDatePicker" @change="changeDate" :option="goodDatePickerOption"></good-date-picker>
						</view>
					</view>
					<view class="explain-cell">
						<view class="label">门票数量</view>
						<view class="explain-cell-bd">
							<view class="number"><text class="reduce" @click="reduce">-</text><input class="input" v-model="ticketNum"/><text class="add" @click="add">+</text></view>
						</view>
					</view>
				</view>
				<view class="inner fillin">
					<view class="explain-cell name">出行人信息</view>
					<view class="people bottom-line">
						<view v-for="(item,index) in travelList" :key="index">
							<view :class="currTravelIndex == index ? 'item travel-current' : 'item'" @click="chooseTravelUser(item,index)">
								{{item.travelUserName}}
								<image src="../../static/img/common/traver_delete.png" class="traver-delete" v-on:click.stop="deleteCurrTraver(item.travelUserId,index)"></image>
							</view>
						</view>
						<view v-if="totalRows <= 3" class="item add" @tap="travelListUser"><text class="txt">新增</text><text class="txt">更换</text></view>
						<view v-else class="item add" @tap="travelListUser"><text class="txt">查看</text><text class="txt">更多</text></view>
					</view>
					<!-- <view class="explain-cell mb20">
						<view class="label">出行人</view>
						<view class="explain-cell-bd">
							<text class="orange">点击补全游客信息</text>
						</view>
					</view> -->
					<view class="explain-cell bottom-line">
						<view class="label">出行人</view>
						<view class="explain-cell-bd">
							<input v-if="travelList.length > 0" v-model="userName" disabled="true"/>
							<input v-else placeholder="请填写出行人姓名" v-model="userName" placeholder-style="color:rgba(230, 231, 233, 1);" type="text" maxlength="50"/>
						</view>
					</view>
					<view class="explain-cell bottom-line">
						<view class="label">身份证号</view>
						<view class="explain-cell-bd">
							<input v-if="travelList.length > 0" v-model="identityHideCard?identityHideCard:identityCard" disabled="true"/>
							<input v-else placeholder="请填写身份证号码" v-model="identityHideCard?identityHideCard:identityCard" placeholder-style="color:rgba(230, 231, 233, 1);" maxlength="100"/>
						</view>
					</view>
					<view class="explain-cell">
						<view class="label">联系手机</view>
						<view class="explain-cell-bd">
							<input v-if="travelList.length > 0" v-model="mobilePhone" disabled="true"/>
							<input v-else placeholder="请填写手机号码" v-model="mobilePhone" placeholder-style="color:rgba(230, 231, 233, 1);" type="number" maxlength="30"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottombar">
			<view class="price" style="color: #31A2F8;">￥{{orderTotalAmount}}</view>
			<view class="btnbox">
				<!-- <text class="mx">明细</text> -->
				<view class="btn" :loading="loading" :disabled="loading"  @click="saveData">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import GoodDatePicker from '@/components/good-date-picker/good-date-picker.vue';
	export default {
		components: {
			GoodDatePicker
		},
		data() {
			return {
				loading:false,
				ticketId:'',
				ticketNum:1,
				ticketName:'',
				ticketPrice:0,
				shopId:'',
				userName:'',
				identityCard:'',
				identityHideCard:'',
				mobilePhone:'',
				isDateDisable:false,
				today:'',
				tomorrow:'',
				afterTomorrow:'',
				currIndex:1,//默认选中第一个选项
				currChooseDate:'',
				bookDate:'',
				totalMoney:'',
				goodDatePickerOption: {
					chooseOneDate: '', //根据实际业务需求设置的默认单选日期，可为空,默认今天
					initStartDate: '', //可选起始时间，可为空,默认今天
					initEndDate: '', //可选结束时间，可为空,默认4个月后
					isRange: false, //是否开启范围选择，默认false
					isModal:true,//是否弹窗模式，默认false
					isShowSubmit:false,//页面模式中是否显示页面模式底部的确定按钮，默认false
					ticketPrice:0,//日期上显示的价格
				},
				orderId:0,
				travelList:[],
				currTravelIndex:0,
				totalRows:0,
				travelUserId:0,
			}
		},
		onLoad(option) {
			if(option.shopId){
				this.shopId = option.shopId;
			}
			if(option.ticketId){
				this.ticketId = option.ticketId;
			}
			this.queryTicketInfo();
			this.initDate();
			this.queryTravelList();
			var _this=this;
			uni.$on("payCallback",function(params){
			    _this.util.gotoOrderDetail(4,_this.orderId,"2");
			});
			uni.$on("isRefreshTravel",function(param){
				if(param == 'refresh'){
					_this.queryTravelList();
				}
			});
		},
		onUnload() {
			uni.$off("payCallback");
			uni.$off("isRefreshTravel");
		},
		//实时计算返回值
		computed:{
			orderTotalAmount:function(){
				this.totalMoney = (this.ticketPrice * this.ticketNum).toFixed(2);
				return this.totalMoney;
			}
		},
		filters: {
			hideMiddle(val) {
				return `${val.substring(0,3)}************${val.substring(val.length-3)}`;
			}
		},
		methods:{
			queryTicketInfo:function(){
				let url = '/memberapi/api/ticket/read.do';
				let data={
					ticketId:this.ticketId
				}
				var that = this;
				that.request.get(url, data).then(res => {
					if(res.returncode == 0){
						that.bookTime = res.data.bookTime;
						that.ticketName = res.data.ticketName;
						that.ticketPrice = res.data.discountPrice;
						that.goodDatePickerOption.ticketPrice = res.data.discountPrice;
						that.changeIsDisAble();
					}else{
						uni.showToast({
							title: '获取门票信息出错,请稍后重试!',
							icon: 'none'
						});
					}
				})
			},
			queryTravelList:function(){
				let url = '/memberapi/api/travelInfo/list.do';
				let data={
					pageNo:1,
					pageSize:10000
				};
				var that = this;
				that.request.post(url, data).then(res => {
					that.totalRows = res.totalRows;
					res.list.forEach((item,index) => {
						if(item.isDefault == 1){
							that.currTravelIndex = index;
							that.userName = item.travelUserName;
							that.identityCard = item.cardNo;
							if(that.identityCard){
								that.identityHideCard  =  that.hideMiddle(that.identityCard);
							}
							that.mobilePhone = item.mobilePhone;
							that.travelUserId = item.travelUserId;
						}
					});
					if(res.list.length>3){
						that.travelList = that.travelList.concat(res.list[0]).concat(res.list[1]).concat(res.list[2]);
					}else{
						that.travelList = res.list;
					}
				})
			},
			hideMiddle(val) {
				return `${val.substring(0,3)}************${val.substring(val.length-3)}`;
			},
			//初始化订票日期
			initDate:function(){
				this.bookDate = this.util.getDateWithCount(0);
				this.today = this.util.getDateWithCount(0).substring(5).replace("-",".");
				this.tomorrow = this.util.getDateWithCount(1).substring(5).replace("-",".");
				this.afterTomorrow = this.util.getDateWithCount(2).substring(5).replace("-",".");
			},
			//如果当前时间超过当天票规定的时间则当天票不可预订
			changeIsDisAble:function(){
				var date = new Date();
				//获取当前年月日并拼接可购票时间
				var bookDate = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+' '+this.bookTime;
				//格式化当前日期去掉秒数使两个时间格式统一，时间戳比较大小
				if(new Date().getTime() > new Date(bookDate).getTime()){
					this.isDateDisable = true;
					//当天不可订默认选中第二个
					this.currIndex = 2;
					this.bookDate =  this.util.getDateWithCount(1);
					//更多日期里面修改今天不可选择
					this.goodDatePickerOption.chooseOneDate = this.util.getDateWithCount(1);
					this.goodDatePickerOption.initStartDate = this.util.getDateWithCount(1);
				}
			},
			chooseBookDate:function(index){
				if(this.isDateDisable && index == 1){
					this.currIndex = this.currIndex;
				}else{
					this.currIndex = index;
					if(index == 1){
						this.bookDate = this.util.getDateWithCount(0);
					}else if(index == 2){
						this.bookDate = this.util.getDateWithCount(1);
					}else if(index == 3){
						this.bookDate = this.util.getDateWithCount(2);
					}else{
						this.bookDate = this.util.getDateWithCount(3);
						this.openDate();
					}
				}
			},
			chooseTravelUser:function(item,index){
				this.currTravelIndex = index;
				this.userName = item.travelUserName;
				this.identityCard = item.cardNo;
				this.mobilePhone = item.mobilePhone;
				this.travelUserId = item.travelUserId;
			},
			changeDate:function(e) { //单选择完日期回调，
				let returnDate = e.currentDate;
				if(returnDate == this.util.getDateWithCount(0)){
					this.currIndex = 1;
				}else if(returnDate == this.util.getDateWithCount(1)){
					this.currIndex = 2;
				}else if(returnDate == this.util.getDateWithCount(2)){
					this.currIndex = 3;
				}else{
					this.currChooseDate = returnDate.substring(5).replace("-",".");
				}
				this.bookDate = returnDate;
				 //单选模式下返回当前选择的日期
				/* this.startDate = e.startDate; //区间选择模式下返回当前选择的开始日期
				this.endDate = e.endDate; //区间选择模式下返回当前选择的结束日期
				this.dateNum = e.dateNum; //区间选择模式下返回的开始于结束日期的天数 */
			},
			openDate:function() { //打开日期弹窗
				this.$refs.goodDatePicker.open();
			},
			reduce:function(){
				this.ticketNum--;
				if(this.ticketNum < 1){
					this.ticketNum =1;
				}
			},
			add:function(){
				this.ticketNum++;
				if(this.ticketNum > 99){
					this.ticketNum = 99;
				}
			},
			saveData: function() {
				if(!this.checker.checkNullText(this.userName,"请填写出行人")) return;
				if(!this.checker.checkNullText(this.identityCard,"请输入身份证号")) return;
				if(!this.checker.checkNullText(this.mobilePhone,"请输入联系手机")) return;
				if(!this.checker.checkIdentityCardReg(this.identityCard)) return;
				if(!this.checker.checkPhone(this.mobilePhone)) return;
				this.loading = true;
				this.checkIsBook();
			},
			checkIsBook:function(){
				let _this = this;
				let data = {
					contactPhone:_this.mobilePhone,
					shopId:_this.shopId
				};
				let url = "/memberapi/api/scenicSpot/checkIsBook.do";
				_this.request.post(url,data).then(res => {
					if(res.returnExtendData > 0){
						uni.showModal({
							title: '',
							content: "检测到您存在尚未支付的订单，为确保订单有效，请您尽快支付!",
							cancelText:"继续下单",
							confirmText: "去付款",
							confirmColor: "#FF871C",
							success: function (res) {
								if (res.confirm) {
									uni.navigateTo({
										url:'../user/userIndex/order'//'去付款'去订单页面
									})
								} else if (res.cancel) {
									_this.saveScenicTicketData(); //'继续下单'提交订单
								}
							}
						});
					}else{
						_this.saveScenicTicketData();//在支付有效时间内没有尚未支付的订单 直接提交订单
					}
				});
			},
			saveScenicTicketData:function(){
				let data = {
					ticketId: this.ticketId,
					buyNum: this.ticketNum,
					shopId:this.shopId,
					userName:this.userName,
					contactPhone:this.mobilePhone,
					idcardNo:this.identityCard,
					orderTotalAmount:this.totalMoney,
					bookDate:this.bookDate,
				};
				let url = "/memberapi/api/scenicSpot/addScenicOrder.do";
				this.request.post(url,data).then(res => {
					if (res.returncode === 0) {
						this.orderId = res.data.orderId;
						uni.navigateTo({
							url:"/pages/payment/payment?orderId="+res.data.orderId+'&payTotalAmount='+this.totalMoney
						})
					}else{
						this.loading = false;
						this.request.toastTips("提交订单失败");
					}
				});
			},
			back:function(){
				uni.navigateBack({});
			},
			travelListUser:function(){
				uni.navigateTo({
					url:'travelList'
				})
			},
			deleteCurrTraver:function(travelUserId,index){
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '是否要删除该出行人',
					cancelText:"否",
					confirmText:"是",
				    success: function (res) {
				        if (res.confirm) {
							that.confirmDelete(travelUserId,index);
				        } else if (res.cancel) {
							
				        }
				    }
				});
			},
			confirmDelete:function(travelUserId,index){
				let data = {
					travelUserId: travelUserId,
				};
				this.request.post('/memberapi/api/travelInfo/delete.do',data).then(res=>{
					if(res.returncode==0){
						this.request.toastTips("删除成功！");
						/* this.travelList.splice(index,1); *///从列表删除当前出行人
						this.queryTravelList();
					}else{
						this.request.toastTips("删除失败!");
					}
				})
			}
		}
	}
</script>

<style>
	.people{
		display: flex;
		padding:10rpx 30rpx 30rpx 30rpx;
	}
	.people .item{
		width:144rpx;
		height:86rpx;
		line-height:86rpx;
		text-align: center;
		border:1rpx solid #E6E7E9;
		border-radius: 15rpx;
		font-size:24rpx;
		font-weight:650;
		color:#4A4A4A;
		margin-right:16rpx;
		position: relative;
	}
	.people .item.add{
		width:109rpx;
		/* border:1rpx solid #31A2F8;
		color:#31A2F8; */
		padding-top:12rpx;
	}
	.people .item.add .txt{
		display: block;
		line-height:normal;
	}
	.orange{
		color:#FDBE48;
		font-size:32rpx;
	}
	.people .travel-current{
		border: 1px solid rgba(49, 162, 248, 1);
		background: rgba(236, 245, 255, 1);
	}
	.traver-delete{
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: -10rpx;
		right: -10rpx;
	}
</style>