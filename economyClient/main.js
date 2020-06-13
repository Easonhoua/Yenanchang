import Vue from 'vue'
import App from './App'
import api from './api'
import util from "@/common/js/util.js"
import check from "@/common/js/checkRule.js"
import imageCache from '@/components/ImageCache/ImageCache';
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";


//请求类
Vue.prototype.request = api;
//工具类
Vue.prototype.util = util;
//效验器
Vue.prototype.checker = check;

// 上下拉刷新组件（全局组件）
// MescrollBody和MescrollUni的区别请到官网查看:http://www.mescroll.com/uni.html#load
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
//图片缓存组件（全局组件）
Vue.component("image-cache",imageCache);

export default {
	mixins: [MescrollMixin]
}



//默认配置
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	api,
    ...App
})
app.$mount()
