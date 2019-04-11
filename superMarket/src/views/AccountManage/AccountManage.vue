<template>
  <div class="account-manage">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-table ref="multipleTable" :data="accountTableData" tooltip-effect="dark" style="width: 100%">
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 账号 -->
          <el-table-column prop="account" label="账号"></el-table-column>

          <!-- 用户组 -->
          <el-table-column prop="user_group" label="用户组"></el-table-column>
          
          <!-- 账号创建日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.create_date | filterDate }}</template>
          </el-table-column>

          <!-- 操作 -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)"
                        >
                        <i class="el-icon-edit"></i>
                        修改
                    </el-button>
                    <!-- 删除按钮 -->
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >
                        <i class="el-icon-delete"></i>
                        删除
                    </el-button>
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
        <!-- 批量删除&取消选择 -->
        <div style="margin-top: 20px">
            <el-button type="danger">批量删除</el-button>
            <el-button type="success">取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
// 引入moment
import moment from 'moment';

export default {
  data() {
    return {
      // 账号表格数据   
      accountTableData: [
          
      
      ],
      currentPage: 1,  // 当前页
      total: 11 // 数据总条数
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

    }
  },
  // 生命周期钩子函数 vue实例对象创建完成 dom还没有生成
  created () {
    // 发送axios 请求所有账号数据
    this.request.get('/account/accountlist')
      .then(res => {
        // 把后端请求到的数据 直接赋值给accountTableData 
        console.log(res)
        this.accountTableData = res;
      })
      .catch(err => {
        console.log(err)
      })
  },
  filters: {
    // 过滤时间
    filterDate (time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    }
  }
};
</script>
<style lang="less">
@import "./accountmanage.less";
</style>

