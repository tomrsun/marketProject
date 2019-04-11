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
            <!-- 系统管理 -->
            <el-submenu index="1">
                <!-- 图标和标题 -->
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>系统管理</span>
                </template>
                <!-- 二级导航 -->
                <el-menu-item index="/home/systeminfo">系统信息</el-menu-item>
            </el-submenu>

            <!-- 账号管理 -->
            <el-submenu index="2">
                <!-- 图标和标题 -->
                <template slot="title">
                    <i class="el-icon-news"></i>
                    <span>账号管理</span>
                </template>
                <!-- 二级导航 -->
                <el-menu-item index="/home/accountmanage">账号管理</el-menu-item>
                <el-menu-item index="/home/accountadd">添加账号</el-menu-item>
                <el-menu-item index="/home/passwordmodify">密码修改</el-menu-item>
            </el-submenu>

            <!-- 商品管理 -->
            <el-submenu index="3">
                <!-- 图标和标题 -->
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>商品管理</span>
                </template>
                <!-- 二级导航 -->
                <el-menu-item index="/home/goodsmanage">商品管理</el-menu-item>
                <el-menu-item index="/home/goodsadd">添加商品</el-menu-item>
            </el-submenu>

            <!-- 统计管理 -->
            <el-submenu index="4">
                <!-- 图标和标题 -->
                <template slot="title">
                    <i class="el-icon-edit-outline"></i>
                    <span>统计管理</span>
                </template>
                <!-- 二级导航 -->
                <el-menu-item index="/home/salestotal">销售统计</el-menu-item>
                <el-menu-item index="/home/stocktotal">进货统计</el-menu-item>
            </el-submenu>

        </el-menu>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
    // 引入样式
    @import './leftnav.less';
</style>


