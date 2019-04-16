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
                            <img :src="imgUrl" alt="">
                        </div>
                        
                    </el-col>
                    <!-- 账号 -->
                    <el-col :span="16">
                       <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ account }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                               
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
        </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// 引入local
import local from '@/utils/local';

export default {
    data () {
        return {
            account: '',
            imgUrl: ''
        }
    },
    methods: {
        // 点击下拉框菜单项触发函数
        handleCommand(command) {
            if (command === 'personal') {
                this.$router.push('/home/personal')
            } else if (command === 'logout') {
                // 清除token
                local.remove('tomrsun');

                // 退出提示
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                })

                setTimeout(() => {
                    // 跳转到登录页
                    this.$router.push('/login')
                }, 1000);
            }
        },
        // 获取当前登录账号
        getCurrentAccount() {
            this.request.get('/account/accountinfo')
                .then(res => {
                    let {account, img_url} = res[0];
                    // 赋值给对应的变量
                    this.account = account;
                    this.imgUrl = `http://127.0.0.1:666/${img_url}`;
                    
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() {
        // 调用函数 获取当前登录账号
        this.getCurrentAccount();
    }
}

</script>
<style lang="less">
    @import 'header.less';
</style>
