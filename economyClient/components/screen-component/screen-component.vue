<template>
	<view>
		<choose-lits :list="list" :arr="arr" @chooseLike="chooseLike" ref="myChoose"></choose-lits>
	</view>
</template>

<script>
	import ChooseLits from '@/components/choose-Cade/choose-Cade.vue'
	export default {
		props:{
			platformTypeId:{
				type:String,
				default:"1"
			},
			platformLabels:{
				type:String,
				default:""
			},
		},
		components: {
			ChooseLits
		},
		data() {
			return {
				searchData:{},
				list: [{labelkey:'labelId',labelId:'',labelName:'全部分类'}, {labelkey:'distance',labelId:'15',labelName:'附近'},{labelkey:'sortFlag',labelId:'',labelName:'智能排序'}],
				arr: [ [{labelkey:'labelId',labelId:'',labelName:'全部分类'}],
					[{labelkey:'distance',labelId:'1',labelName:'1km'}, {labelkey:'distance',labelId:'3',labelName:'3km'},{labelkey:'distance',labelId:'5',labelName:'5km'},{labelkey:'distance',labelId:'10',labelName:'10km'},{labelkey:'distance',labelId:'',labelName:'附近'}], 
					[{labelkey:'sortFlag',labelId:'discountPrice-desc',labelName:'价格从高到低'}, {labelkey:'sortFlag',labelId:'discountPrice-asc',labelName:'价格从低到高'},{labelkey:'sortFlag',labelId:'score-desc',labelName:'评分从高到低'},{labelkey:'sortFlag',labelId:'score-asc',labelName:'评分从低到高'},{labelkey:'sortFlag',labelId:'',labelName:'智能排序'}] 
				]
			}
		},
		methods: {
			chooseLike(obj){
				let key=this.list[obj.i].labelkey;
				this.searchData[key] = obj.item.labelId;
				//console.log("this.searchData: " + JSON.stringify(this.searchData));
				this.$emit('screenLike', this.searchData);
			},
			getTypeLabel(){
				//获取标签信息
				const url = '/memberapi/api/platform/queryLabelsByType.do';
				let data = {
					platformTypeId:this.platformTypeId,
				};
				let that = this;
				this.request.get(url,data).then(res=>{
					let newData=[];
					if(that.platformLabels){//见体魄场馆预约，只需要查询所有标签为运动广场的店铺
						newData=[{
							labelId:this.platformLabels,
							typeId:this.platformTypeId,
							labelName:'运动广场',
							sortNum:1
						}]
					}else{
						 newData= res.list;
					}
					newData.forEach(item => {
						item.labelkey = 'labelId';
					});
					that.arr[0] = that.arr[0].concat(newData);
					that.$refs.myChoose.reload(that.arr);
				});
			}
		}
	}
</script>

<style>

</style>
