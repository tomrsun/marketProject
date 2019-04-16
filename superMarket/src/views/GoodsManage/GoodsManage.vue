<template>
  <div class="goods-manage">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
       <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
         
          <el-form-item>
            <el-select v-model="searchForm.cateName" placeholder="选择分类">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="百货" value="百货"></el-option>
              <el-option label="食品" value="食品"></el-option>
              <el-option label="手机数码" value="手机数码"></el-option>
              <el-option label="女装" value="女装"></el-option>
              <el-option label="男装" value="男装"></el-option>
              <el-option label="家电" value="家电"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="关键字：">
            <el-input v-model="searchForm.keyword" placeholder=""></el-input>
          </el-form-item>
          <span class="tip">(商品名称,条形码)</span>
          <el-form-item>
            <el-button type="primary" @click="searchSubmit">查询</el-button>
          </el-form-item>
        </el-form>
               
               
      <!-- 内容 -->
      <div class="text item">
        <el-table ref="multipleTable" :data="goodsTableData" tooltip-effect="dark" style="width: 100%">
         

          <!-- 商品条形码 -->
          <el-table-column prop="goodBarCode" label="商品条形码"></el-table-column>

          <!-- 商品名称 -->
          <el-table-column prop="goodname" label="商品名称"></el-table-column>
          
          <!-- 所属分类 -->
          <el-table-column prop="classification" label="所属分类"></el-table-column>

          <!-- 售价-->
          <el-table-column prop="salePrice" label="售价(元)"></el-table-column>

          <!-- 促销价 -->
          <el-table-column prop="disCountPrice" label="促销价(元)"></el-table-column>

          <!-- 市场价 -->
          <el-table-column prop="marketPrice" label="市场价(元)"></el-table-column>

          <!-- 库存 -->
          <el-table-column prop="stockNumber" label="库存"></el-table-column>

          <!-- 库存总额 -->
          <el-table-column prop="stockTotalPrice" label="库存总额(元)"></el-table-column>

          <!-- 销售总额 -->
          <el-table-column prop="saleTotalPrice" label="销售总额(元)"></el-table-column>
          <!-- 操作 -->
          <el-table-column label="管理">
              <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  
                      <i class="el-icon-edit" @click="handleEdit()" type="success"></i>
                      
                  <!-- 删除按钮 -->
      
                      <i class="el-icon-delete" @click="handleDelete()"></i>
                      
              </template>
          </el-table-column>

        </el-table>
        <!-- 分页组件 -->
        <div style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10, 20, 50]"
            :page-size="pageSize"
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
      goodsTableData: [],
      currentPage: 1, 
      pageSize:3, // 当前页
      total: 1,
      formInline: {
          user: '',
          region: ''
        },
      searchForm: { // 搜索表格数据
        cateName: '',
        keyword: ''
      }
      
      
    };
  },
  methods: {
     //获取当前页数据
    gitCurrentData(){
      // 收集参数
      let params = {
          currentPage: this.currentPage, 
          pageSize: this.pageSize,
          cateName: this.searchForm.cateName,
          keyword: this.searchForm.keyword
      }
     
       // 发送axios 请求数据
        this.request.get('/goods/goodslist',params)
          .then(res => {
            
            let { total, data} =res
            this.goodsTableData = [];
            for(let i=0;i<data.length;i++){
               let { classification,goodBarCode,goodname,salePrice,marketPrice,inventoryQuantity } = data[i];
              let disCountPrice = Math.floor(salePrice*0.8) ;
              
              let stockTotalPrice = marketPrice*inventoryQuantity;
              let saleTotalPrice = disCountPrice*inventoryQuantity;
              let stockNumber = inventoryQuantity;
               this.goodsTableData.push({ classification,goodBarCode,goodname,salePrice,marketPrice,stockNumber,disCountPrice,stockTotalPrice,saleTotalPrice });
            }
            this.total = total;
          })
          .catch(err => {
            console.log(err)
          })

    },
    // 修改
    handleEdit() {
        console.log('修改吗？')
    },
    // 删除
    handleDelete() {
        console.log('删除吗？')
    },
    handleSizeChange(val) {
        this.pageSize = val;
        this.gitCurrentData();

    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.gitCurrentData();
    },
    searchSubmit() {
        this.gitCurrentData();
      }
  },
   created () {
   this.gitCurrentData();
  }
 
};
</script>
<style lang="less">
     @import "./goodsmanage.less";
</style>

