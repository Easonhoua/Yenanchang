<template>
	<view class="contain addpeople">
		<view class="addbtn" @click="toAddTravel">
			<image class="icon" src="../../static/img/common/add.jpg"></image>
			<text>新增</text>
		</view>
		<mescroll-body @down="downCallBack" @init ="initMescroll" @up="upCallback" top="130">
			<view class="list" v-for="(item,index) in travelList" :key="index">
				<image class="icon" src="../../static/img/common/icon_edit2.jpg" @click="editCurrTravel(item.travelUserId)"></image>
				<view class="list-bd">
					<view class="name">{{item.travelUserName}}</view>
					<view class="sf">身份证 {{item.cardNo | hideMiddle}}</view>
					<view class="phone">手机号 {{item.mobilePhone}}</view>
				</view>
				<image class="del" src="../../static/img/common/del2.jpg" @click="deleteCurrTravel(item.travelUserId)"></image>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data(){
			return{
				mescroll : '',
				travelList:[],
				handleFlag:'',
			}
		},
		onLoad() {
			var that = this;
			uni.$on("addTravelData",function(){
				that.handleFlag = 'refresh';
			    that.refreshList();
			});
		},
		onUnload() {
			uni.$off("addTravelData");
		},
		methods:{
			initMescroll(mescroll){
				this.mescroll = mescroll;
			},
			downCallBack(mescroll)
			{
				this.travelList=[];
				mescroll.resetUpScroll();
			},
			upCallback(mescroll)
			{
				//获取项目信息列表
				const url = '/memberapi/api/travelInfo/list.do';
				let data = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
				};
				let that = this;
				this.request.post(url,data,mescroll).then(res=>{
					this.travelList = res.list;
				})
			},
			toAddTravel:function(){
				uni.navigateTo({
					url:'FillPersonalInfo?type=add'
				})
			},
			//新增回来刷新列表
			refreshList:function(){
				this.mescroll.num = 1;
				this.downCallBack(this.mescroll);
			},
			editCurrTravel:function(travelUserId){
				uni.navigateTo({
					url:'FillPersonalInfo?type=update&travelUserId='+travelUserId
				})
			},
			deleteCurrTravel:function(travelUserId){
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '是否要删除该出行人',
					cancelText:"否",
					confirmText:"是",
				    success: function (res) {
				        if (res.confirm) {
							that.confirmDelete(travelUserId);
				        } else if (res.cancel) {
							
				        }
				    }
				});
			},
			confirmDelete:function(travelUserId){
				let data = {
					travelUserId: travelUserId,
				};
				this.request.post('/memberapi/api/travelInfo/delete.do',data).then(res=>{
					if(res.returncode==0){
						this.request.toastTips("删除成功！");
						this.refreshList();
					}else{
						this.request.toastTips("删除失败!");
					}
				})
			},
			goBack:function(){
				let that = this;
				uni.$emit("isRefreshTravel",that.handleFlag);
				uni.navigateBack();
			}
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.goBack();
			return true;
		},
		filters: {
			hideMiddle(val) {
				return `${val.substring(0,3)}************${val.substring(val.length-3)}`;
			}
		}
	}
</script>

<style>
</style>
