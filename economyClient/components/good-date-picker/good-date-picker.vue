<template>
	<view>
		<view v-if="option.isModal" @touchmove.stop.prevent="catchtouchmove" :class="{ move: isShow }" @click="close" class="select_date_bg"></view>
		<view class="select_date" :class="{ move: isShow && option.isModal, init: !option.isModal }">
			<view v-if="option.isModal" class="head">
				<text>选择日期</text>
				<text @click="close">X</text>
			</view>
			<view class="week">
				<view :class="{ weekend: index == 0 || index == 6 }" v-for="(item, index) in weekData" :key="index">{{ item }}</view>
			</view>
			<scroll-view scroll-y class="main" :class="{ init: !option.isModal ,show_submit:option.isShowSubmit}">
				<view class="list" v-for="(item, index) in totalDate" :key="index">
					<view class="title">{{ titleDateFormat(item.info[0].date) }}</view>
					<view class="date">
						<view
							@click="clickDay(index, y)"
							:class="{
								range_space: x.isRangeStyle,
								choosed: x.isChoosed || x.isRangeStart || x.isRangeEnd,
								disabled: x.isDisadled,
								weekend: x.isWeekend && !x.isDisadled
							}"
							v-for="(x, y) in item.info"
							:key="y"
						>
							<view v-if="!x.isDayOne && !x.isDayTwo && !x.isDayThree">{{ x.day }}</view>
							<view v-if="x.isDayOne">今天</view>
							<view v-if="x.isDayTwo">明天</view>
							<view v-if="x.isDayThree">后天</view>
							<!-- <view v-if="x.isChoosed">选择</view> -->
							<view v-if="!x.isDisadled && x.day">￥{{option.ticketPrice}}</view>
							<view v-if="x.currentRangeStartDate">入住</view>
							<view v-if="x.currentRangeEndDate">离店</view>
							<view v-if="x.currentRangeEndDate" class="num">共{{ currentDateNum }}晚</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view v-if="(option.isModal || option.isShowSubmit) && isShow" @click="clickSubmit" class="footer"><view :class="{ disabled: isDisabledBtn }" hover-class="hover">确定</view></view>
		</view>
	</view>
</template>

<script>
	/**
	 //弹窗-单选模式配置：
	 const option={
	     chooseOneDate: "2019-12-07", //根据实际业务需求设置的默认单选日期，可为空,默认今天
	     initStartDate: '2019-12-07', //可选起始时间限制，可为空,默认今天
	     initEndDate: '2020-06-08', //可选结束时间限制，可为空,默认4个月后
	     isRange: false //是否开启范围选择，必填
	 }
	 //弹窗-区间模式配置：
	 const option={
	     currentRangeStartDate: '2019-12-07', //根默认显示初始时间，可为空,默认今天
	     currentRangeEndDate: '2019-12-08', //根默认区间选择显示结束时间，可为空，默认明天
	     initStartDate: '2019-12-07', //可选起始时间限制，可为空,默认今天
	     initEndDate: '2020-06-08', //可选结束时间限制，可为空,默认4个月后
	     isRange: true //是否开启范围选择，必填
	 }
	 //页面模式-区间模式配置：
	 const option={
	        currentRangeStartDate: '2019-12-11', //根据实际业务需求设置的区间选择默认显示初始时间，可为空,默认今天
	        currentRangeEndDate: '2019-12-12', //根据实际业务需求设置的默认区间选择显示结束时间，可为空，默认明天
	        initStartDate: '2019-12-11', //可选起始时间，可为空,默认今天
	        initEndDate: '2020-06-05', //可选结束时间，可为空,默认4个月后
	        isRange: true, //是否开启范围选择，默认false
	        isModal:false,//是否弹窗模式，默认false
	        isShowSubmit:true,//页面模式中是否显示页面模式底部的确定按钮，默认false
	 }
	 //页面模式-单选模式配置：
	 const option={
	        chooseOneDate: '2019-12-11', //根据实际业务需求设置的默认单选日期，可为空,默认今天
	        initStartDate: '2019-12-11', //可选起始时间，可为空,默认今天
	        initEndDate: '2020-06-05', //可选结束时间，可为空,默认4个月后
	        isRange: false, //是否开启范围选择，默认false
	        isModal:false,//是否弹窗模式，默认false
	        isShowSubmit:true,//页面模式中是否显示页面模式底部的确定按钮，默认false
	 }
	 */
export default {
	props: ['option'], //配置参数
	data() {
		return {
			weekData: ['日', '一', '二', '三', '四', '五', '六'],
			totalDate: [],
			chooseOneDate: '', //单选模式当前点击的日期
			currentRangeStartDate: '', //区域选择模式当前点击的开始日期
			currentRangeEndDate: '', //区域选择模式当前点击的结束日期
			outIndex: 0, //当前点击外索引
			innerIndex: 0, //当前点击内索引
			isShow: false
		};
	},
	mounted() {
		this.totalDateInit();
		if(!this.option.isModal){
			setTimeout(()=>{
				this.open();
			},0)
		}
	},
	watch: {
		isShow(n) {
			if (n) {
				this.dateFirstInit();
			}
		}
	},
	computed: {
		currentDateNum() {
			//当前起始日期与结束日期之间的天数
			return this.dateSpace(this.currentRangeStartDate, this.currentRangeEndDate);
		},
		isDisabledBtn() {
			if (this.option.isRange) {
				return !(this.currentRangeStartDate && this.currentRangeEndDate);
			} else {
				return !this.chooseOneDate;
			}
		}
	},
	methods: {
		catchtouchmove() {
			return;
		},
		titleDateFormat(date) {
			//2019年9月格式化
			const _arr = date.split('-');
			return `${_arr[0]}年${_arr[1] - 0}月`;
		},
		getNextMonth(AddDayCount = 6, date = new Date()) {
			//获取x个月后的日期
			if (typeof date !== 'object') {
				date = date.replace(/-/g, '/');
			}
			let dd = new Date(date);
			dd.setMonth(dd.getMonth() + AddDayCount);
			let y = dd.getFullYear();
			let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
			let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
			return y + '-' + m + '-' + d;
		},
		getNextDate(day = 1, date = new Date()) {
			var dd = new Date(date);
			dd.setDate(dd.getDate() + day);
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
			var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
			return y + '-' + m + '-' + d;
		},
		noModalSubmit() {
			if (!this.option.isModal && !this.option.isShowSubmit) {
				setTimeout(()=>{
					this.clickSubmit();
				},500)
			}
		},
		clickSubmit() {
			if (!this.isDisabledBtn) {
				//点击确定逻辑
				if (!this.option.isRange) {
					//单选
					this.$emit('change', {
						currentDate: this.chooseOneDate
					});
				} else {
					// 区域选择
					this.$emit('change', {
						startDate: this.currentRangeStartDate,
						endDate: this.currentRangeEndDate,
						dateNum: this.currentDateNum
					});
				}
				this.close();
			}
		},
		dateFirstInit() {
			//首次数据初始化
			if (!this.option.isRange) {
				//单选
				this.chooseOneDate = this.option.chooseOneDate ? this.option.chooseOneDate : this.getNextDate(0);
				this.oneChooseFirstInit();
			} else {
				//区间选择
				this.currentRangeStartDate = this.option.currentRangeStartDate ? this.option.currentRangeStartDate : this.getNextDate(0);
				this.currentRangeEndDate = this.option.currentRangeEndDate ? this.option.currentRangeEndDate : this.getNextDate(1);
				this.rangeChooseFirstInit();
				this.spaceStyleRander();
			}
		},
		oneChooseFirstInit() {
			//首次引用单选初始化
			this.clearOneChoose();
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					if (a.date == this.chooseOneDate) {
						a.isChoosed = true;
					}
				});
			});
		},
		rangeChooseFirstInit() {
			//首次引用复选初始化
			this.clearRangeChoose();
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					if (a.date == this.currentRangeStartDate) {
						a.currentRangeStartDate = a.date;
						a.isRangeStart = true;
					}
					if (a.date == this.currentRangeEndDate) {
						a.currentRangeEndDate = a.date;
						a.isRangeEnd = true;
					}
				});
			});
		},

		close() {
			this.isShow = false;
		},
		open() {
			this.isShow = true;
		},
		//插件默认方法点击切换选中日期(弹窗不隐藏情况下切换选中)
		clickDay(outIndex, innerIndex) {
			this.outIndex = outIndex;
			this.innerIndex = innerIndex;
			if (this.option.isRange) {
				this.chooseRangeInit();
			} else {
				this.chooseOneInit();
			}
			//选中日期关闭弹窗并传值
			this.clickSubmit();
		},
		chooseRangeInit() {
			//区域选择点击逻辑
			const _item = this.totalDate[this.outIndex].info[this.innerIndex];
			if (!_item.isDisadled && !_item.isSpace) {
				if (!this.currentRangeStartDate && !this.currentRangeEndDate) {
					//选择清空状态
					_item.currentRangeStartDate = _item.date;
					_item.currentRangeEndDate = '';
					_item.isRangeStart = true;
					this.currentRangeStartDate = _item.currentRangeStartDate;
					this.currentRangeEndDate = '';
					return;
				}
				if (this.currentRangeStartDate && !this.currentRangeEndDate) {
					//选择中
					if (new Date(_item.date) > new Date(this.currentRangeStartDate)) {
						_item.currentRangeEndDate = _item.date;
						_item.isRangeEnd = true;
						this.currentRangeEndDate = _item.currentRangeEndDate;
						this.spaceStyleRander();
						this.noModalSubmit();
						return;
					} else {
						this.clearRangeChoose();
						_item.currentRangeStartDate = _item.date;
						_item.currentRangeEndDate = '';
						_item.isRangeStart = true;
						this.currentRangeStartDate = _item.currentRangeStartDate;
						this.currentRangeEndDate = '';
						return;
					}
				}
				if (this.currentRangeStartDate && this.currentRangeEndDate) {
					//选择好了
					this.clearRangeChoose();
					_item.currentRangeStartDate = _item.date;
					_item.currentRangeEndDate = '';
					_item.isRangeStart = true;
					this.currentRangeStartDate = _item.currentRangeStartDate;
					this.currentRangeEndDate = '';
					this.spaceStyleRander();
					return;
				}
			}
		},
		spaceStyleRander() {
			//区间样式渲染
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					if (!a.isSpace && new Date(a.date) > new Date(this.currentRangeStartDate) && new Date(a.date) < new Date(this.currentRangeEndDate)) {
						a.isRangeStyle = true;
					} else {
						a.isRangeStyle = false;
					}
				});
			});
		},
		chooseOneInit() {
			//单选点击逻辑
			const _item = this.totalDate[this.outIndex].info[this.innerIndex];
			if (!_item.isDisadled && !_item.isSpace) {
				this.clearOneChoose();
				this.chooseOneDate = _item.date;
				_item.isChoosed = true;
				this.noModalSubmit();
			}
		},
		clearRangeChoose() {
			//清楚区间选择状态
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					a.currentRangeStartDate = '';
					a.currentRangeEndDate = '';
					a.isRangeStart = false;
					a.isRangeEnd = false;
					a.isRangeStyle = false;
				});
			});
		},
		clearOneChoose() {
			//清楚单选选择状态
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					if (a.isChoosed) {
						a.isChoosed = false;
					}
					a.currentRangeStartDate = '';
					a.currentRangeEndDate = '';
				});
			});
		},
		getMaxDate(date) {
			//获取某一月份的最大日期数，参数传递类似2019-12-15，返回31
			let _arr = date.split('-');
			return new Date(_arr[0], _arr[1], 0).getDate();
		},
		getMonthBetween(date1, date2) {
			var _date1 = date1.split('-');
			_date1 = parseInt(_date1[0]) * 12 + parseInt(_date1[1]);
			var _date2 = date2.split('-');
			_date2 = parseInt(_date2[0]) * 12 + parseInt(_date2[1]);
			return Math.abs(_date1 - _date2) + 1;
		},
		weekInit(date) {
			//根据日期获得星期几
			var dateArray = date.split('-');
			var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
			var week = '0123456'.charAt(date.getDay());
			return week;
		},
		totalDateInit() {
			let _dateArr = [];
			let _initStartDate = this.option.initStartDate ? this.option.initStartDate : this.getNextDate(0);
			let _initEndDate = this.option.initEndDate ? this.option.initEndDate : this.getNextMonth(1);
			const _dateNum = this.getMonthBetween(_initStartDate, _initEndDate);
			const _arrStart = _initStartDate.split('-');
			const _arrEnd = _initEndDate.split('-');
			let _year = _arrStart[0] - 0;
			let _month = _arrStart[1] - 0;
			let _day = _arrStart[2] - 0;
			let _dayEnd = _arrEnd[2] - 0;
			this.totalDate = [];
			this.totalDate[0] = {};
			this.totalDate[0]['info'] = [];
			let _objMonth = '';
			_dateArr[0] = `${_year}-${_month < 10 ? '0' + _month : _month}-${_day < 10 ? '0' + _day : _day}`;
			let _num = 0;
			let _objYear = _year;
			for (var i = 1; i < _dateNum; i++) {
				let _obj = {};
				let _objDay = _day;
				if (i == _dateNum - 1) {
					_objDay = _dayEnd;
				}
				if (_month < 12 && i < _dateNum) {
					_month++;
					_objMonth = _month;
					_dateArr.push(`${_objYear}-${_objMonth < 10 ? '0' + _objMonth : _objMonth}-${_objDay < 10 ? '0' + _objDay : _objDay}`);
				} else if (_month == 12 && i < _dateNum) {
					_month = 1;
					_objYear++;
					_dateArr.push(`${_objYear}-01-${_objDay < 10 ? '0' + _objDay : _objDay}`);
				}
				_obj['info'] = [];
				this.totalDate.push(_obj);
			}
			this.totalDate.forEach((x, y) => {
				const _arr = _dateArr[y].split('-');
				const _endDate = _arr[2] - 0;
				let _totalDate = this.getMaxDate(_dateArr[y]) - 0;
				for (var i = 1; i <= _totalDate; i++) {
					let _currentDate = `${_dateArr[y].split('-')[0]}-${_dateArr[y].split('-')[1]}-${i < 10 ? '0' + i : i}`;
					let _obj = {
						date: _currentDate,
						day: i,
						isDisadled: false,
						isChoosed: false,
						isRangeStart: false,
						isRangeEnd: false,
						currentRangeStartDate: '',
						currentRangeEndDate: '',
						isRangeStyle: false
					};
					// 处理今天明天后天
					if (this.getNextDate(0) == _obj.date) {
						_obj.isDayOne = true;
					} else if (this.getNextDate(1) == _obj.date) {
						_obj.isDayTwo = true;
					}
					if (this.getNextDate(2) == _obj.date) {
						_obj.isDayThree = true;
					}

					// 处理周末加亮
					if (this.weekInit(_currentDate) == 0 || this.weekInit(_currentDate) == 6) {
						_obj.isWeekend = true;
					}
					if (this.totalDate.length <= 1) {
						if (y == 0 && (i < _day || i > _dayEnd)) {
							_obj.isDisadled = true;
						}
					} else {
						if ((y == 0 && i < _day) || (y == this.totalDate.length - 1 && i > _dayEnd)) {
							_obj.isDisadled = true;
						}
					}

					x['info'].push(_obj);
				}
				// 处理星期
				let weekDate = `${_dateArr[y].split('-')[0]}-${_dateArr[y].split('-')[1]}-01`;
				for (var i = 0; i < this.weekInit(weekDate); i++) {
					x['info'].unshift({ date: '', date: _dateArr[y], isSpace: true });
				}
			});
		},
		dateSpace(sDate1, sDate2) {
			//sDate1和sDate2是2006-12-18格式 得出量日期之间的天数
			var dateSpan, tempDate, iDays;
			sDate1 = Date.parse(sDate1);
			sDate2 = Date.parse(sDate2);
			dateSpan = sDate2 - sDate1;
			dateSpan = Math.abs(dateSpan);
			iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
			return iDays;
		}
	}
};
</script>

<style lang="scss" scoped>
.select_date_bg {
	position: fixed;
	top: -10vh;
	left: 0;
	width: 100%;
	height: 10vh;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 1000;
	transition: all 0.2s;
	&.move {
		top: 0vh;
	}
}
.select_date {
	width: 100%;
	height: 63vh;
	position: fixed;
	top: 100%;
	left: 0;
	background-color: #fff;
	z-index: 10001;
	transition: all 0.2s;
	&.move {
		top: 37vh;
	}
	&.init {
		top: 0;
		height: 100vh;
	}
	> .footer {
		height: 100rpx;
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		overflow: hidden;
		> view {
			background-color: #f63;
			color: #fff;
			font-size: 26rpx;
			height: 70rpx;
			line-height: 70rpx;
			margin-top: 15rpx;
			text-align: center;
			&.hover {
				background-color: #f61;
			}
			&.disabled {
				background-color: #ccc;
			}
		}
	}

	> .head {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		position: relative;
		> text {
			&:nth-child(1) {
			}
			&:nth-child(2) {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 20rpx;
				color: #f63;
			}
		}
	}

	> .main {
		height: calc(90vh - 240rpx);
		&.init {
			height: calc(100vh - 80rpx);
		}
		&.show_submit{
			height: calc(100vh - 180rpx);
		}
		.list {
			> .date {
				padding: 0 25rpx;
				display: flex;
				flex-wrap: wrap;
				> view {
					width: 100rpx;
					height: 120rpx;
					text-align: center;
					padding: 10rpx 0;
					position: relative;
					> view {
						&:nth-child(1) {
							font-size: 30rpx;
							color: #333;
							height: 60rpx;
							line-height: 60rpx;
						}
					}
					&.disabled {
						background-color: #eee;
						> view {
							color: #999;
						}
					}
					&.weekend {
						> view {
							color: #f63;
						}
					}
					&.choosed {
						background-color: #f90;
						border-radius: 10rpx;
						> view {
							color: #fff;
							font-size: 22rpx;
							height: 50rpx;
							line-height: 50rpx;
							&.num {
								position: absolute;
								width: 80rpx;
								text-align: center;
								top: -50rpx;
								left: 10rpx;
								background-color: rgba(0, 0, 0, 0.5);
								color: #fff;
							}
						}
					}
					&.range_space {
						background-color: #ffe0b2;
						> view {
							color: #333;
						}
					}
				}
			}
			> .title {
				font-size: 30rpx;
				color: #000;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	> .week {
		height: 80rpx;
		padding: 0 25rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #ccc;
		> view {
			width: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #333;
			&.weekend {
				color: #f63;
			}
		}
	}
}
</style>
