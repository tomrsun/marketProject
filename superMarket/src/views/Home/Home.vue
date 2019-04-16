<template>
    <div class="home">
        <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
                <!-- 导航 -->
                <LeftNav></LeftNav>
            </el-aside>

            <!-- 右侧 -->
            <el-container>
                <!-- 头 -->
                <el-header>
                    <Header ref="header"></Header>
                </el-header>
                <!-- 中 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view @A="B"></router-view>
                </el-main>
                <!-- 尾 -->
                <el-footer>
                    <Footer></Footer>
                </el-footer>
            </el-container>

        </el-container>    
    </div>
</template>
<script>
// 引入组件
// 引入左侧导航
import LeftNav from '@/components/LeftNav/LeftNav.vue'
// 引入头部组件
import Header from '@/components/Header/Header.vue'
// 引入底部组件
import Footer from '@/components/Footer/Footer.vue'
export default {
    // 注册组件
    components: {
        LeftNav,
        Header,
        Footer
    },
     methods: {
        B() {
            this.$refs.header.getCurrentAccount()
        }
    }
}
</script>
<style lang="less">
    // 引入样式
    @import './home.less';
</style>


