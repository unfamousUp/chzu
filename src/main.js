import Vue from 'vue'
import App from './App.vue'
// 导入vuex
import store from './store/index'
//引入vue-router
import VueRouter from "vue-router";
import router from "./router/index.js"
// 引入axios
import axios from 'axios'
// axios.defaults.withCredentials = true
// 引入echarts
import * as echarts from "echarts";
// 引入ElementUI组件库
import ElementUI from 'element-ui'
// 引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
// 导入reset.css
import './assets/css/reset.css'
Vue.config.productionTip = false
// 引用ElementUI插件
Vue.use(ElementUI)
//应用vue-router插件
Vue.use(VueRouter);
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  beforeCreate() {

    Vue.prototype.$bus = this, // 全局事件总线
      Vue.prototype.$echarts = echarts // echarts
    Vue.prototype.$axios = axios // axios
    Vue.prototype.myHttp = 'http://192.168.85.107:8080' // 访问后端的接口的url
    this.$axios.defaults.baseURL = 'http://192.168.85.107:8080'
    console.log(this.$axios.defaults.baseURL);
    console.log(this.$axios.defaults.withCredentials);
  },
  mounted() {
    // console.log(this.$store.state);
    // console.dir(axios)
    // console.log(this.myHttp);
  },
})