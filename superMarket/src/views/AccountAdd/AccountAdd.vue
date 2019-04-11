<template>
    <div class="accountadd">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
                
            </div>
            <el-form 
            :model="accountForm"
            status-icon
            :rules="rules"
            ref="accountForm"
            label-width="100px"
            class="demo-ruleForm"
            size='small'
                  >
                <!-- 用户名 -->
                <el-form-item label="用户名" prop="account">
                    <el-input type="text" v-model="accountForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="accountForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="accountForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择用户组" prop="userGroup">
                    <el-select v-model="accountForm.userGroup" placeholder="选择用户组">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通用户" value="普通用户"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">添加</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>
<script>
// 引入正则验证
import { passwordReg } from '@/utils/validator';


export default {
    data(){
        //密码的自定义验证函数
        const checkPassword=(rule, value, callback) =>{
            if(value === ''){
                callback(new Error('密码不能为空'))
            }else if(!passwordReg(value)){
                callback(new Error('以字母开头，长度为3~6，只能包含数字，字母，下划线'))
            }else{
                if(this.accountForm.checkPass !== ''){
                    //触发一致性验证
                    this.$refs.accountForm.validateField('checkPass')
                }
                callback()//成功回调
            }
        }
       //确认密码的自定义验证函数
        const confirmPassword=(rule, value, callback) =>{
             if(value === ''){
                callback(new Error('确认密码不能为空'))
            }else if(value !== this.accountForm.password){
                callback(new Error('两次密码不一致'))
            }else{
                callback()//成功回调
            }
        }


        return {
            // 数据
            accountForm:{
                account:"",
                password:"",
                checkPass:"",
                userGroup:""
            },
            rules:{
                account:[
                    { required: true, message:'请输入用户名', trigger:'blur' },//非空验证
                    { min: 3, max: 6, message:'账号长度 3~6 位', trigger:'blur'}//长度验证
                ],
                password:[
                    { required: true, validator:checkPassword, trigger:'blur'}
                ],
                checkPass:[
                    { required: true, validator:confirmPassword, trigger:'blur'}
                ],
                userGroup:[
                     { required: true, message:'请选择用户组', trigger:'change' },//非空验证
                ]
            }
        }
    },
    
    methods:{
        //添加
        submitForm(){
            this.$refs.accountForm.validate(valid =>{
                    //接收数据
                    if(valid){
                        let params = {
                            account: this.accountForm.account,
                            password: this.accountForm.password,
                            userGroup:this.accountForm.userGroup
                        } 
                        // console.log(this.request);
                        this.request.post('/account/accountadd',params)
                                    .then(res => {
                                       console.log(res);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })

                        this.$router.push('/home/accountmanage')
                    }else{
                        console.log('添加失败');
                        return

                    }
            })
        },
        // 重置
        resetForm(){
            this.$refs.accountForm.resetFields();
        }
    }
}
</script>
<style lang="less">
    @import 'accountadd.less';
</style>