<template>
    <div class="passwordmodify">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
                
            </div>
            <el-form 
            :model="passwordModifyForm"
            status-icon
            :rules="rules"
            ref="passwordModifyForm"
            label-width="100px"
            class="demo-ruleForm"
            size='small'
                  >
                <!-- 用户名 -->
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input type="text" v-model="passwordModifyForm.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="text" v-model="passwordModifyForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkNewPass">
                    <el-input type="text" v-model="passwordModifyForm.checkNewPass" autocomplete="off"></el-input>
                </el-form-item>
               
                <!-- 按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">修改</el-button>
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
    
  data() {
       //密码的自定义验证函数
        const checkPassword=(rule, value, callback) =>{
            if(value === ''){
                callback(new Error('密码不能为空'))
            }else if(!passwordReg(value)){
                callback(new Error('以字母开头，长度为3~6，只能包含数字，字母，下划线'))
            }else{
                if(this.passwordModifyForm.checkNewPass !== ''){
                    //触发一致性验证
                    this.$refs.passwordModifyForm.validateField('checkNewPass')
                }
                callback()//成功回调
            }
        }
       //确认密码的自定义验证函数
        const confirmPassword=(rule, value, callback) =>{
             if(value === ''){
                callback(new Error('确认密码不能为空'))
            }else if(value !== this.passwordModifyForm.newPassword){
                callback(new Error('两次密码不一致'))
            }else{
                callback()//成功回调
            }
        }

      return {
          passwordModifyForm:{
              oldPassword:"",
              newPassword:"",
              checkNewPass:""
          },
          rules:{
              oldPassword:[
                   { required: true, message:'请输入原密码', trigger:'blur' },//非空验证
              ],
              newPassword:[
                    { required: true, validator:checkPassword, trigger:'blur'}
              ],
              checkNewPass:[
                    { required: true, validator:confirmPassword, trigger:'blur'}
              ],
          }
      }
  },
   methods:{
        //添加
        submitForm(){
            this.$refs.passwordModifyForm.validate(valid =>{
                    //接收数据
                    if(valid){
                       console.log('修改成功');
                    }else{
                        console.log('修改失败');
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
    @import 'passwordmodify.less';
</style>