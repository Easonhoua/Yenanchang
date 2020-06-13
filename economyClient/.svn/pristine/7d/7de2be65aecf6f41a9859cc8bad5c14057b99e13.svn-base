<template>
	<view class="content-white payment">
		<view class="input-group">
			<view class="input-cell">
				<view class="label">收货人<text class="red">*</text></view>
				<view class="input-cell-bd">
					<input class="input" placeholder="填写收货人" v-model="addressData.shipTo" maxlength="50"/>
				</view>
			</view>
			<view class="input-cell">
				<view class="label">手机号码<text class="red">*</text></view>
				<view class="input-cell-bd">
					<input class="input" placeholder="填写手机号码" v-model="addressData.phone" type="number"  maxlength="11"/>
				</view>
			</view>
			<view class="input-cell">
				<view class="label">省市区<text class="red">*</text></view>
				<view class="input-cell-bd" @click="selectAddress">
					<text>{{addressData.areaAddress}}</text>
				</view>
			</view>
			<!--地址选择显示列表-->
			<mpvue-city-picker themeColor="#FE350F" ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault"
			 @onCancel="selectAddressCancel" @onConfirm="selectAddressConfirm"></mpvue-city-picker>
			<view class="input-cell">
				<view class="label">详细地址<text class="red">*</text></view>
				<view class="input-cell-bd">
					<input class="input" placeholder="填写详细地址" v-model="addressData.address" type="text" maxlength="100"/>
				</view>
			</view>
			<view class="input-cell">
				<view class="label" style="width:250rpx">标签</view>
				<view class="input-cell-bd text-right">
					<view class='cu-tag round' :class="item.itemValue == addressData.labelType?'bg-orange':''" v-for="(item,index) in dictionaryItemList" :key="index" @click="selectLabelType(item.itemValue)">{{item.itemName}}</view>
				</view>
			</view>
			<view class="input-cell">
				<view class="label">设置为默认地址</view>
				<view class="input-cell-bd text-right" style="flex: 1;">
					<switch  style="transform:scale(0.7)"  :checked="addressData.defaultFlag==1?true:false"  @change="switchDefaultFlag"/>
				</view>
			</view>
			<view class="bottombar"  :loading="loading" :disabled="loading">
				<view class="btn" @click="saveData">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
	var graceChecker = require("@/common/js/graceChecker.js");
	var rule = [{name: "shipTo",checkType: "notnull",checkRule: "",errorMsg: "收货人不能为空"},
				{name: "phone",checkType: "phoneno",checkRule: "^[1][3,4,5,6,7,8,9][0-9]{9}$",errorMsg: "请输入正确的手机号码"},
				{name: "areaAddress",checkType: "notnull",checkRule: "",errorMsg: "省市区不能为空"},
				{name: "address",checkType: "notnull",checkRule: "",errorMsg: "详细地址不能为空"},
	];
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				loading: false,
				addressData:{
					defaultFlag:2,
					areaAddress:'请选择省市区'
				},
				dictionaryItemList:[],
				pickerValueDefault: [0,0,1]
			}
		},
		onLoad(e) {
			if(e.addressId){
				this.$set(this.addressData, 'addressId', e.addressId);
				this.queryDetail(e.addressId);
			}
			
			this.loadLabelType();
		},
		methods: {
			queryDetail(addressId){
				let url = "/memberapi/api/shippingAddresses/read.do";
				let data = {
					addressId: addressId,
				}
				this.request.post(url,data).then(res => {
					this.addressData = res.data;
				})
			},
			loadLabelType(){
				let url = "/memberapi/api/dictionaryType/list.do";
				let data = {
					dictionaryCode: 'AddressLabelType',
				}
				this.request.get(url,data).then(res => {
					this.dictionaryItemList = res.list;
				})
			},
			selectLabelType(itemValue){
				this.$set(this.addressData, 'labelType',itemValue);
			},
			//省市区选择
			selectAddress:function(){
				// #ifdef APP-PLUS
					plus.key.hideSoftKeybord();
				// #endif
				this.$refs.mpvueCityPicker.show();
			},
			//省市区选择点击取消
			selectAddressCancel:function(e) {
				this.$refs.mpvueCityPicker.hide();
			},
			//省市区选择点击确定
			selectAddressConfirm:function(e) {
				//console.log("clickAreaAddress == ",e);
				this.areaAddress = e.label;
				this.$set(this.addressData, 'areaAddress',e.label);
				this.$set(this.addressData, 'province',e.provinceCode);
				this.$set(this.addressData, 'city',e.cityCode);
				this.$set(this.addressData, 'area',e.areaCode);
			},
			switchDefaultFlag: function(e) {
				if (e.target.value) {
					this.$set(this.addressData, 'defaultFlag', 1);
				} else {
					this.$set(this.addressData, 'defaultFlag', 2);
				}
			},
			saveData(){
				//表单验证
				var checkRes = graceChecker.check(this.addressData, rule);
				if (checkRes) {
					this.loading = true;
					this.saveShoppingAddress();
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			saveShoppingAddress:function(){
				var _that = this;
				const data = _that.addressData;
				let url = "/memberapi/api/shippingAddresses/add.do";
				if(this.addressData.addressId){
					url = "/memberapi/api/shippingAddresses/update.do";
				}
				this.request.post(url,data).then(res => {
					if (res.returncode === 0) {
						if(_that.addressData.addressId){
							this.request.toastTips("编辑成功");
						}else{
							this.request.toastTips("新增成功");
						}
						uni.$emit("updateAddress",true);
						setTimeout(function(){
							uni.navigateBack();
						},1000);
					}else{
						if(_that.addressData.addressId){
							this.request.toastTips("编辑失败");
						}else{
							this.request.toastTips("新增失败");
						}
					}
				}).catch(res=>{
					
				});
			}
		}
	}
</script>

<style>
	.red{
		color: red;
	}
</style>
