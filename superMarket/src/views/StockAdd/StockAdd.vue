<template>
    <div class="stockadd">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品入库</span>
                
            </div>
            <el-form 
            :model="goodsAddForm"
            :rules="rules"
            ref="goodsAddForm"
            label-width="100px"
            class="demo-goodsAddForm"
            size="mini"
                >
                
                <el-form-item label="商品条形码" prop="goodBarCode">
                    <el-input v-model="goodsAddForm.goodBarCode"></el-input>
                    
                </el-form-item>
               
            
                <el-form-item label="数量" prop="number">
                    <el-input v-model="goodsAddForm.number"></el-input>
                    <span class="prompt">记中商品单位为千克</span>
                </el-form-item>
                <el-form-item label="进价" prop="purchasePrice">
                    <el-input v-model="goodsAddForm.purchasePrice"></el-input>
                </el-form-item>
               
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">添加</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            goodsAddForm:{
               
                goodBarCode:"", //条形码
                number:"",//数量
                purchasePrice:"", //进价
                
            },
            rules:{
               
                goodBarCode:[
                    { required:true, message:'条形码不能为空', trigger:'blur'}
                ],
               
                number:[
                    { required:true, message:'请填写数量', trigger:'blur'},
                    { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                ],
               
                purchasePrice:[
                    { required:true, message:'请填写进价', trigger:'blur'},
                    { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                ]
               
               
                
            }
        }
    },
    methods:{
        submitForm() {
            this.$refs.goodsAddForm.validate(valid =>{
                    //接收数据
                    if(valid){
                        let params = {
                            
                        } 
                        alert('库存添加成功');
                        this.$router.push('/home/stockmanage')
                    }else{
                        alert('添加失败')
                    }
            })
        },
        resetForm() {
            this.$refs.goodsAddForm.resetFields();
        }
       
    }
}
</script>
<style lang="less">
    @import './stockadd.less';
</style>