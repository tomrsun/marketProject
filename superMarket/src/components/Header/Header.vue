<template>
    <div class="header">
        <el-row>
            <!-- 标题 -->
            <el-col :span="20"><span class="el-icon-menu title">华联超市管理系统</span></el-col>
            <!-- 用户 -->
            <el-col :span="4">
                <el-row>
                    <!-- 头像 -->
                    <el-col :span="8">
                        <div class="avater">
                            <img src="./pikaqiu.jpg" alt="">
                        </div>
                        
                    </el-col>
                    <!-- 账号 -->
                    <el-col :span="16">
                       <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                曹操<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>退出登录</el-dropdown-item>
                               
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
        </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
    @import 'header.less';
</style>
