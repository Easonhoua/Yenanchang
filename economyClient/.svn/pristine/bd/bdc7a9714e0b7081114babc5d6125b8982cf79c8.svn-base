<template>
	<view>
		<choose-lits :list="list" :arr="arr" @chooseLike="chooseLike" ref="myChoose"></choose-lits>
	</view>
</template>

<script>
	import ChooseLits from '@/components/choose-Cade/choose-cade-product.vue'
	export default {
		components: {
			ChooseLits
		},
		data() {
			return {
				searchData:{},
				list: [{labelkey:'labelId',labelId:'',labelName:'综合'}, {labelkey:'distance',labelId:'',labelName:'销量'},{labelkey:'sortFlag',labelId:'',labelName:'价格'}],
				arr: [ [{labelkey:'labelId',labelId:'',labelName:''}],
					[{labelkey:'sortFlag',labelId:'saleCounts-desc',labelName:'销量从高到低'},{labelkey:'sortFlag',labelId:'saleCounts-asc',labelName:'销量从低到高'}], 
					[{labelkey:'sortFlag',labelId:'minSalePrice-desc',labelName:'价格从高到低'}, {labelkey:'sortFlag',labelId:'minSalePrice-asc',labelName:'价格从低到高'}] 
				]
			}
		},
		methods: {
			chooseLike(obj){
				let key=this.list[obj.i].labelkey;
				this.searchData[key] = obj.item.labelId;
				//console.log("this.searchData: " + JSON.stringify(this.searchData));
				this.$emit('screenLike', this.searchData);
			}
		}
	}
</script>

<style>
</style>
