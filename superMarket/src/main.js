import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'; // JS组件
import 'element-ui/lib/theme-chalk/index.css'; // CSS样式
// base.css
import './assets/css/base.css'
// 引入request请求
import request from '@/utils/request';
//将request请求挂载到原型上
Vue.prototype.request = request;
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
