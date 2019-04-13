import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/', // 路径
        redirect:'/login'
    },
    // 登录
    {
      path: '/login', // 路径
      component: () => import('./views/Login/Login.vue') // 组件
  },
  // 后台主界面
  {
      path: '/home',
      redirect: '/home/systeminfo',
      component: () => import('./views/Home/Home.vue'),
      children: [
          // 系统信息
          {
              path: '/home/systeminfo',
              component: () => import('./views/SystemInfo/SystemInfo.vue'),
          },
          // 账号添加
          {
              path: '/home/accountadd',
              component: () => import('./views/AccountAdd/AccountAdd.vue'),
          },
          // 账号管理
          {
              path: '/home/accountmanage',
              component: () => import('./views/AccountManage/AccountManage.vue'),
          },
           // 密码修改
        {
            path: '/home/passwordmodify',
            component: () => import('./views/PasswordModify/PasswordModify.vue'),
          },
          // 商品添加
          {
            path: '/home/goodsadd',
            component: () => import('./views/GoodsAdd/GoodsAdd.vue'),
          },
          // 商品管理
          {
            path: '/home/goodsmanage',
            component: () => import('./views/GoodsManage/GoodsManage.vue'),
          },
          // 销售统计
          {
            path: '/home/salestotal',
            component: () => import('./views/SalesTotal/SalesTotal.vue'),
          },
          // 进货统计
          {
            path: '/home/stocktotal',
            component: () => import('./views/StockTotal/StockTotal.vue'),
          },
           // 进货管理
           {
            path: '/home/stockmanage',
            component: () => import('./views/StockManage/StockManage.vue'),
          },
           // 添加库存
           {
            path: '/home/stockadd',
            component: () => import('./views/StockAdd/StockAdd.vue'),
          },
           // 销售列表
           {
            path: '/home/shipmentlist',
            component: () => import('./views/ShipmentList/ShipmentList.vue'),
          },
           // 商品出库
           {
            path: '/home/commodityship',
            component: () => import('./views/ComodityShip/ComodityShip.vue'),
          },
           // 商品退货
           {
            path: '/home/commodityreject',
            component: () => import('./views/ComodityReject/ComodityReject.vue'),
          },
           // 添加会员账号
           {
            path: '/home/memberadd',
            component: () => import('./views/MemberAdd/MemberAdd.vue'),
          },
           // 会员账号管理
           {
            path: '/home/membermanage',
            component: () => import('./views/MemberManage/MemberManage.vue'),
          }
      ]
  }
  ]
})
