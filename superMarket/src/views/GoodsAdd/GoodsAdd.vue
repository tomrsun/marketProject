<template>
    <div class="goodsadd">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
                
            </div>
            <el-form 
            :model="goodsAddForm"
            :rules="rules"
            ref="goodsAddForm"
            label-width="100px"
            class="demo-goodsAddForm"
            size="mini"
                >
                 <el-form-item label="所属分类" prop="classification">
                    <el-select v-model="goodsAddForm.classification" placeholder="选择分类">
                    <el-option label="百货" value="百货"></el-option>
                    <el-option label="食品" value="食品"></el-option>
                    <el-option label="手机数码" value="手机数码"></el-option>
                    <el-option label="女装" value="女装"></el-option>
                    <el-option label="男装" value="男装"></el-option>
                    <el-option label="家电" value="家电"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品条形码" prop="goodBarCode">
                    <el-input v-model="goodsAddForm.goodBarCode"></el-input>
                    <el-button type="success" @click="barCodeRandom()">生成条形码</el-button>
                </el-form-item>
                <el-form-item label="商品名称" prop="goodname">
                    <el-input v-model="goodsAddForm.goodname"></el-input>
                </el-form-item>
                <el-form-item label="商品售价" prop="salePrice">
                    <el-input v-model="goodsAddForm.salePrice"></el-input>元
                </el-form-item>
                <el-form-item label="市场价" prop="marketPrice">
                    <el-input v-model="goodsAddForm.marketPrice"></el-input>元
                    <span class="prompt">默认市场价为售价的1.2倍</span>
                </el-form-item>
               <el-form-item label="商品进价" prop="purchasePrice">
                    <el-input v-model="goodsAddForm.purchasePrice"></el-input>元
                </el-form-item>
                <el-form-item label="入库数量" prop="inventoryQuantity">
                    <el-input v-model="goodsAddForm.inventoryQuantity"></el-input>
                    
                </el-form-item>
                <el-form-item label="商品重量" prop="goodWeight">
                    <el-input v-model="goodsAddForm.goodWeight"></el-input>
                    <span class="prompt">记中商品单位为千克</span>
                </el-form-item>
                <el-form-item label="商品单位" prop="goodUnit">
                    <el-input v-model="goodsAddForm.goodUnit"></el-input>
                </el-form-item>
                <el-form-item label="会员优惠" prop="memberDiscount">
                    <el-radio-group v-model="goodsAddForm.memberDiscount">
                    <el-radio label="享受"></el-radio>
                    <el-radio label="不享受"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否促销" prop="promotion">
                    <el-radio-group v-model="goodsAddForm.promotion">
                    <el-radio label="启用"></el-radio>
                    <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品简介" prop="description">
                    <el-input type="textarea" v-model="goodsAddForm.description"></el-input>
                    <span class="prompt">不超过200个汉字</span>
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
                classification:"", //商品分类
                goodBarCode:"", //条形码
                goodname:"", //商品名称
                salePrice:"", //商品售价
                marketPrice:"", //市场价
                purchasePrice:"", //进价
                inventoryQuantity:"", //商品数量
                goodWeight:"", //商品重量
                goodUnit:"", //商品单位
                memberDiscount:"", //会员优惠
                promotion:"", //是否促销
                description:"" //商品简介
            },
            rules:{
                classification:[
                    { required:true, message:'请选择种类', trigger:'change'}
                ],
                goodBarCode:[
                    { required:true, message:'条形码不能为空', trigger:'change'}
                ],
                goodname:[
                    { required:true, message:'请填写商品名称', trigger:'blur'},
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
                salePrice:[
                    { required:true, message:'请填写商品售价', trigger:'blur'},
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
                marketPrice:[
                    { required:true, message:'请填写市场价', trigger:'blur'},
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
                purchasePrice:[
                    { required:true, message:'请填写进价', trigger:'blur'},
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
               
                inventoryQuantity:[
                    { required:true, message:'请填写数量', trigger:'blur'},
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
                goodWeight:[
                    { required:true, message:'请填写重量', trigger:'blur'},
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
                goodUnit:[
                    { required:true, message:'请填写单位', trigger:'blur'},
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
                memberDiscount:[
                    { required:true, message:'请选择会员优惠', trigger:'change'},
                    
                ],
                promotion:[
                    { required:true, message:'请选择是否促销', trigger:'change'},
                   
                ],
                description:[
                    { required:true, message:'请填写进价', trigger:'blur'},
                    { min: 3, max: 200, message: '最多200个字符', trigger: 'blur' }
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
                            classification:this.goodsAddForm.classification,
                            goodBarCode:this.goodsAddForm.goodBarCode,
                            goodname:this.goodsAddForm.goodname,
                            salePrice:this.goodsAddForm.salePrice,
                            marketPrice:this.goodsAddForm.marketPrice,
                            purchasePrice:this.goodsAddForm.purchasePrice,
                            inventoryQuantity:this.goodsAddForm.inventoryQuantity,
                            goodWeight:this.goodsAddForm.goodWeight,
                            goodUnit:this.goodsAddForm.goodUnit,
                            memberDiscount:this.goodsAddForm.memberDiscount,
                            promotion:this.goodsAddForm.promotion,
                            description:this.goodsAddForm.description
                        } 
                        
                        this.request.post('/goods/goodsadd',params)
                                    .then(res => {
                                       let {code, reason} = res;
                                        // 判断
                                        if (code === 0) {
                                            // 弹成功提示
                                            this.$message({
                                                type: 'success',
                                                message: reason
                                            })
                                            // 跳账号列表
                                            this.$router.push('/home/goodsmanage')
                                        } else if (code === 1) {
                                            // 弹失败提示
                                            this.$message.error(reason)
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })

                        // this.$router.push('/home/accountmanage')
                    }else{
                        console.log('添加失败');
                        return

                    }
            })
        },
        resetForm() {
            this.$refs.goodsAddForm.resetFields();
        },
        //生成随机条形码
        barCodeRandom() {
            var rnd = ''
            for(var i=0;i<5;i++){
                rnd+=Math.floor(Math.random()*10);
            }
            this.goodsAddForm.goodBarCode = rnd;
            console.log(this.goodsAddForm.goodBarCode)
        }
    }
}
</script>
<style lang="less">
    @import './goodadd.less';
</style>