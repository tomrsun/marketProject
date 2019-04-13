<template>
  <div class="shipmentlist">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div class="selectDate">
                <span>开始时间：</span>
                <el-date-picker
                    size='small'
                    v-model="value1"
                    align="left"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
                <span>结束时间：</span>
                <el-date-picker
                    size='small'
                    v-model="value2"
                    align="left"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
               <span>格式(2019-3-12)</span>
                
            </div>
       <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
         
         
           <el-form-item label="关键字：">
            <el-input v-model="formInline.user" placeholder=""></el-input>
          </el-form-item>
          <span class="tip">(商品名称,订单号,客户名字,会员卡号)</span>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
               
               
      <!-- 内容 -->
      <div class="text item">
        <el-table ref="multipleTable" :data="goodsTableData" tooltip-effect="dark" style="width: 100%">
         

          <!-- 商品条形码 -->
          <el-table-column prop="goodBarCode" label="订单号"></el-table-column>

          <!-- 商品名称 -->
          <el-table-column prop="goodname" label="商品名称"></el-table-column>

          <!-- 进价-->
          <el-table-column prop="purchasePrice" label="数量"></el-table-column>

          <!-- 入库 -->
          <el-table-column prop="inventoryQuantity" label="实际售价"></el-table-column>

          <!-- 库存 -->
          <el-table-column prop="stockNumber" label="优惠（促销/会员）"></el-table-column>

          <!-- 已售 -->
          <el-table-column prop="alreadySale" label="退款"></el-table-column>

             <!-- 已售 -->
          <el-table-column prop="alreadySale" label="销售时间"></el-table-column>
         

        </el-table>
        <!-- 分页组件 -->
        <div style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10, 20, 50]"
            :page-size="3"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>`
        </div>
       
      </div>
    </el-card>
  </div>
</template>
<script>


export default {
  data() {
    return {
      // 账号表格数据   
      goodsTableData: [{
          goodBarCode:"a",//条形码
          goodname:"b",//商品名称
          purchasePrice:"d",//进价
          inventoryQuantity:"c",//入库
          stockNumber:"他",//库存
          alreadySale:"q"//已售
      }],
      currentPage: 1,  // 当前页
      total: 11,
      formInline: {
          user: '',
          region: ''
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: ''
      
    };
  },
  methods: {
    // 修改
    handleEdit() {
        console.log('修改吗？')
    },
    // 删除
    handleDelete() {
        console.log('删除吗？')
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    onSubmit() {
        console.log('submit!');
      }
  }
 
};
</script>
<style lang="less">
     @import "./shipmentlist.less";
</style>

