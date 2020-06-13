<!--根据主题查找标签集合-->
<template>
	<view class="top-scroll">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="true">
			<view v-for="(tab,index) in platformLabelList" :key="tab.labelId" class="uni-tab-item" :id="tab.labelId" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="labelId==index ? 'uni-tab-item-title-active' : ''">{{tab.labelName}}<text
					 :class="labelId==index ? 'line' : ''"></text></text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			// 主题编号
			platformSubjectId:{
				type:String,
				default:"1"
			},
			// 是否精选
			essenceType:{
				type:String,
				default:'2' //1是2否
			},
			// 是否显示附近
			// nearbyType:{
			// 	type:String,
			// 	default:'1' //1是2否
			// },
			// 标题
			platformTitle:{
				type:String,
				default:'精选推荐' //1是2否
			},
			
		},
		data() {
			return {
				nearbyType:1,
				platformLabelList:[],  //tabbar
				labelId: 0,
				labelIds:"", 
			}
		},
		created() 
		{
			if(this.platformSubjectId ==0){
				this.queryEssenceInfo();
			}else{
				this.querySubjectLabels(this.platformSubjectId);
			}	
		},
		methods:{
			//6大主题对应的标签集合
			querySubjectLabels:function(platformSubjectId){
				this.platformLabelList = [];
				if(platformSubjectId){
					const data = {
						platformSubjectId: platformSubjectId
					};
					var self = this;
					this.request.get("/memberapi/api/platform/querySubjectLabels.do",data).then( res => {
						let data={nearby:2};
						if(self.nearbyType ==1 || self.essenceType ==1){
							self.labelIds="";
							if(self.essenceType ==1){
								let list = [{labelId: 0,typeId:this.platformSubjectId,labelName: "精选推荐",sortNum:2,}];
								self.platformLabelList = self.platformLabelList.concat(list); 
							}
							if(self.nearbyType ==1){
								let list = [{labelId: -1,typeId:this.platformSubjectId,labelName: "附近",sortNum:1,}];
								self.platformLabelList = self.platformLabelList.concat(list); 
								data.nearby = 1;
							}
							self.platformLabelList = self.platformLabelList.concat(res.list);
							if(res.list && res.list.length > 0){
								for(var ii=0; ii <res.list.length; ii++){
									self.labelIds = res.list[ii].labelId+","+self.labelIds;
								}
							}
							if(self.labelIds){
								self.labelIds = self.labelIds.slice(0,self.labelIds.length-1);
								data.labelIds = self.labelIds;
								self.$emit('refreshTableList', data);
							}
						}else{
							
							if(self.platformLabelList && self.platformLabelList.length){//第一个list值传递给主界面
								data.labelIds = self.platformLabelList[0].labelId;
								self.$emit('refreshTableList', data);
							}
						}
						//console.log("self.platformLabelList===",JSON.stringify(self.platformLabelList));
					});
				}
			},
			//首页精选标签集合
			queryEssenceInfo:function(){
				this.platformLabelList = [];
				const data = { };
				var self = this;
				this.request.get("/memberapi/api/platform/queryEssenceInfo.do",data).then( res => {
					
					if(self.essenceType ==1){
						self.labelIds="";
						self.platformLabelList= [{labelId: 0,typeId:this.platformSubjectId,labelName: this.platformTitle,sortNum:1,}];
						self.platformLabelList = self.platformLabelList.concat(res.list); 
						
						if(res.list && res.list.length > 0){
							for(var ii=0; ii <res.list.length; ii++){
								self.labelIds = res.list[ii].labelId+","+self.labelIds;
							}
						}
						if(self.labelIds){
							self.labelIds = self.labelIds.slice(0,self.labelIds.length-1);
							self.$emit('refreshTableList', self.labelIds);
						}
					}else{
						self.platformLabelList = res.list;
						if(self.platformLabelList && self.platformLabelList.length){//第一个list值传递给主界面
							self.$emit('refreshTableList', self.platformLabelList[0].labelId);
						}
					}
				});
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.labelId = index;
				let data={labelIds : this.labelIds,nearby:2};
				if(index == 1){
					data.nearby = 1;
				}else if(this.essenceType ==1 && index == 0){
					data.nearby = 1;
				}else{
					data.labelIds = e.currentTarget.id;
					data.nearby = 2;
				}	
				this.$emit('refreshTableList',data); //点击的labelId值传递到主页面
			},
		}
	}
	
</script>

<style>
	.top-scroll {
		width: 100vw;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		/* #ifdef APP-PLUS */
		top: var(--window-top);
		/* #endif */
		z-index: 99;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		margin: 0px;
		/* #ifdef H5 */
		top: 0rpx;
		/* #endif */
	}
	.scroll-h {
		width: 750rpx;
		height: 68rpx;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		background: #FFFFFF;
	}

	.scroll-h.fixed {
		position: fixed;
		background: #FFFFFF;
		top: 88rpx;
		margin-top: var(--status-bar-height);
		left: 0;
		right: 0;
		z-index: 100;
	}
	.uni-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		margin-right: 42rpx;
	}
	
	.uni-tab-item:first-child {
		margin-left: 35rpx;
	}
	
	.uni-tab-item-title {
		color: #555;
		font-size: 32rpx;
		height: 45rpx;
		line-height: 45rpx;
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	
	.uni-tab-item-title-active {
		color: #31A2F8;
	}
	
	.uni-tab-item-title-active .line {
		width: 48rpx;
		height: 6rpx;
		line-height: 1;
		display: block;
		background: #31A2F8;
		border-radius: 2rpx;
		position: relative;
		margin: auto;
		top: 0rpx;
	}
</style>
