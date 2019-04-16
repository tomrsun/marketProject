<template>
    <div class="left-nav">
        <!-- 导航组件 -->
         <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            active-text-color="rgb(64, 158, 255)"
            unique-opened
            router
            >
             <!-- 导航 -->
            <el-submenu :index="(index + 1) + ''" v-for="(menu, index) in menus" :key="index">
                <!-- 图标和标题 -->
                <template slot="title">
                    <i :class="menu.iconClass"></i>
                    <span>{{ menu.title }}</span>
                </template>
                <!-- 二级导航 -->
                <el-menu-item 
                    v-for="(subMenu, index) in menu.children"
                    :index="subMenu.path"
                    :key="index"
                    >
                    {{ subMenu.subTitle }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
     data () {
        return {
            // 导航菜单数据
            menus: []
        }
    },
    methods: {
        getMenus() {
            this.request.get('/login/menus')
             .then(res => {
                // 接收后端响应的菜单
                this.menus = res.accessMenu;
             })
             .catch(err => {
                 console.log(err)
             })
        }
    },
    created() {
        // 调用请求 请求菜单数据
        this.getMenus();
    }
}
</script>
<style lang="less">
    // 引入样式
    @import './leftnav.less';
</style>


