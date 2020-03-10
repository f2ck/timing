import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/filter' // 引入全局过滤器
import '@/utils/components' // 引入全局组件
// import axios from "axios"
// Vue.prototype.$axios = axios;
// axios.defaults.baseURL = "/api";
// 导入全局样式表
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
