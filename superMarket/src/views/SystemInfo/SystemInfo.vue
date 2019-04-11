<template>
     <div class="systeminfo">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统信息</span>
                
            </div>
             
            <!-- 商品信息 -->
            <el-alert
                class="el-icon-warning"
                title="商品总数：，已经销售的总金额：，库存商品总价："
                type="info"
                >
                
            </el-alert>
            <!-- 导入数据 -->
            <el-alert
                class="el-icon-warning"
                title="导入数据"
                type="info"
                :closable="false"
                >
                
            </el-alert>


            <!-- 销售排行和缺货商品 -->
            <el-row>
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                 <span>销售排行</span>
                            </div>
                             <el-table
                                :data="bestSaleData"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                prop="goodsName"
                                label="商品名称"
                                width="340">
                                </el-table-column>
                                <el-table-column
                                prop="saleNumber"
                                label="销量"
                                width="100">
                                </el-table-column>
                               
                            </el-table>
                        </el-card>
                    </div>
                </el-col>
                <!-- 缺货的商品 -->
                <el-col :span="11" class="mleft">
                    <div class="grid-content bg-purple-light">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                 <span>缺货的商品</span>
                            </div>
                             <el-table
                                :data="lackGoodsData"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                prop="goodsName"
                                label="商品名称"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="inventory"
                                label="库存"
                                width="160">
                                </el-table-column>
                               <el-table-column
                                    label="操作"
                                    width="100">   
                                   <el-button @click="handleClick()" type="text" size="small">入库</el-button>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
      return {
        bestSaleData: [
        {
          goodsName: '伊利牛奶',
          saleNumber: '10',
          
        }, {
          goodsName: '海飞丝',
          saleNumber: '10',
        }, {
          goodsName: '奥利奥',
          saleNumber: '10',
        }, {
          goodsName: '茅台',
          saleNumber: '10',
        },
         {
          goodsName: '茅台',
          saleNumber: '10',
        }
        ],
        lackGoodsData:[
             {
          goodsName: '伊利牛奶',
          saleNumber: '10',
          
        }, {
          goodsName: '海飞丝',
          saleNumber: '10',
        }, {
          goodsName: '奥利奥',
          saleNumber: '10',
        }
        ]
      }
    }
}
</script>
<style lang="less">
    @import './systeminfo.less';
</style>