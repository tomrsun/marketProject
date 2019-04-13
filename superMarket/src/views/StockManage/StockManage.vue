<template>
  <div class="stock-manage">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
       <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
         
          <el-form-item>
            <el-select v-model="formInline.region" placeholder="选择分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="关键字：">
            <el-input v-model="formInline.user" placeholder=""></el-input>
          </el-form-item>
          <span class="tip">(商品名称,条形码)</span>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
               
               
      <!-- 内容 -->
      <div class="text item">
        <el-table ref="multipleTable" :data="goodsTableData" tooltip-effect="dark" style="width: 100%">
         

          <!-- 商品条形码 -->
          <el-table-column prop="goodBarCode" label="商品条形码"></el-table-column>

          <!-- 商品名称 -->
          <el-table-column prop="goodname" label="商品名称"></el-table-column>

          <!-- 进价-->
          <el-table-column prop="purchasePrice" label="进价(元)"></el-table-column>

          <!-- 入库 -->
          <el-table-column prop="inventoryQuantity" label="入库"></el-table-column>

          <!-- 库存 -->
          <el-table-column prop="stockNumber" label="库存"></el-table-column>

          <!-- 已售 -->
          <el-table-column prop="alreadySale" label="已售"></el-table-column>

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
        }
      
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
     @import "./stockmanage.less";
</style>

