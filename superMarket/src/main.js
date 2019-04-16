import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'; // JS组件
import 'element-ui/lib/theme-chalk/index.css'; // CSS样式
// base.css
import './assets/css/base.css'
// 引入request请求
import request from '@/utils/request';
// 引入 local 文件
import local from '@/utils/local'
//将request请求挂载到原型上
Vue.prototype.request = request;
Vue.use(ElementUI);
// 路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  
  // 获取浏览器中的token
  const token = local.get('tomrsun');
  // 如果有token 直接放行
  if (token) {
     // 放行
    next()
  } else { // 没有token
    // 如果要去登录 放行
    if (to.path === '/login') {
      next()
    } else {
      // 如果想去其他界面 直接跳转到登录
      next('/login')
    }
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
