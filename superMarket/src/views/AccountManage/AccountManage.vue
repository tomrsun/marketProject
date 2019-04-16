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
        <el-table @selection-change="handleSelectionChange" ref="multipleTable" :data="accountTableData" tooltip-effect="dark" style="width: 100%">
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
                        @click="handleEdit(scope.row.id)"
                        >
                        <i class="el-icon-edit"></i>
                        修改
                    </el-button>
                    <!-- 删除按钮 -->
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)"
                        >
                        <i class="el-icon-delete"></i>
                        删除
                    </el-button>
                </template>
            </el-table-column>
        
        </el-table>
         <!-- 修改模态框 -->
        <el-dialog width="400px" title="修改账号" :visible.sync="dialogFormVisible">
          <!-- 修改表单 -->
          <el-form :model="editForm" :rules="rules" ref="editForm">

            <!-- 账号 -->
            <el-form-item prop="account" style="width: 320px;" label="账号" :label-width="formLabelWidth">
              <el-input v-model="editForm.account" auto-complete="off"></el-input>
            </el-form-item>

            <!-- 用户组 -->
            <el-form-item prop="userGroup" label="用户组" :label-width="formLabelWidth">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
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
        <!-- 批量删除&取消选择 -->
        <div style="margin-top: 20px">
            <el-button type="danger" @click="batchDel">批量删除</el-button>
            <el-button type="success" @click="cancelSelect">取消选择</el-button>
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
       pageSize: 3,//每页显示条数
      total: 0, // 数据总条数
      dialogFormVisible: false,  // 模态框的显示和隐藏状态
      formLabelWidth: '100px', // 修改表单标签的宽度
      editForm:{
        account:"",
        userGroup:""
      },
      rules:{
        account:[
          {required: true, message: '账号不能为空', trigger: 'blur'}, // 非空
          {min: 3, max: 6, message: '账号长度 3~6 位', trigger: 'blur'} // 非空
        ]
      },
      editId:"",
      selectedId:''
    };
  },
  methods: {
    //获取当前页数据
    gitCurrentData(){
      // 收集参数
       let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
    
       // 发送axios 请求所有账号数据
        this.request.get('/account/accountlist',params)
          .then(res => {
            
            // 接收后端返回的数据
            let {total,  data} = res;
            // 赋值给对应变量
            this.total = total;
            this.accountTableData = data;
            // 如果这一页已经没有数据了
            if (!data.length && this.currentPage !== 1) {
              // 回到上一页
              this.currentPage -= 1;
              // 调用自己
              this.gitCurrentData();
            }
          })
          .catch(err => {
            console.log(err)
          })

    },
    // 修改回填
    handleEdit(id) {
      //显示模态框
        this.dialogFormVisible = true;

        this.editId = id;
        //发送id后端
        this.request.get('/account/editaccount',{ id })
                    .then((res) => {
                      //解构
                      
                      let { account, user_group } = res[0];
                      this.editForm.account = account,
                      this.editForm.userGroup = user_group
                    })
                    .catch((err) => {
                      console.log(err);
                    })
    },
    //保存修改
    saveEdit(){
      //通过验证后执行
      this.$refs.editForm.validate(valid => {
          if(valid){
                    //隐藏模态框
              this.dialogFormVisible = false;
              let params = {
                  id : this.editId,
                  account : this.editForm.account,
                  userGroup : this.editForm.userGroup
              };
              this.request.post('/account/saveeditaccount', params)
                          .then((res) => {
                              //解构
                              let { code, reason } = res;
                              if(code === 0){
                                this.$message({
                                type:'success',
                                message:reason
                              })
                              //刷新列表
                              this.gitCurrentData();
                              }else if(code === 1){
                                this.message.error(reason);
                              }         
                            })
                            .catch((err) => {
                              console.log(err);
                            })
          }
          else{
            return false;
          }
      })
     
    },
     // 取消选择
    cancelSelect() {
      this.$refs.multipleTable.clearSelection() // 选中整个表格 调用函数取消选择
    },
    // 删除
    handleDelete(id) {
      this.$confirm('你确定要删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() =>{
        //将id发送给后端
        this.request.get('/account/accountdel',{ id })
                     .then((res) => {
                       //解构res
                       let { code, reason } = res;
                       if(code === 0){
                         this.$message({
                           type: 'success',
                           message: reason
                         })
                          //刷新列表
                          this.gitCurrentData();
                       }else if(code === 1){
                         this.$message.error(reason)
                       }
                     })
                     .catch((err) => {
                       console.log(err);
                     })
      }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消删除'
        })
      })
        
    },
    //批量删除
    // 当选中选择框的状态发生变化，就会触发这个函数，而且传入被选中的数据 val是一个数组
    handleSelectionChange(val) {
      // 获取被选中的id 放入一个数组
      this.selectedId = val.map(v => v.id);
      
    },
     // 批量删除
    batchDel() {
      // 如果没有选中 给出错误提示 结束函数
      if (!this.selectedId.length) {
        // 弹错误提示
        this.$message.error('请选择删除账号！');
        return
      }
       // 优化删除体验
      this.$confirm('你确定要批量删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => { // 确定
        // 收集被选中的数据的id
        let params = {
          idArr: this.selectedId
        }
        // 发送请求给后端 把被选中的id一起发送给后端
        this.request.get('/account/batchdel', params)
          .then(res => {
            // 接收数据
            let {code, reason} = res;
            if (code === 0) {
              
              this.$message({
                type: 'success',
                message: reason
              })
              // 刷新列表
              this.gitCurrentData();
  
            } else if (code === 1) {
            
              this.$message.error(reason)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => { // 取消
        this.$message({
            type: 'info',
            message: '已取消删除'
        })
      })

    },
    handleSizeChange(val) {
       // 把每页条数赋值给pageSize
      this.pageSize = val;
      
      this.gitCurrentData();
    },
    handleCurrentChange(val) {
      // 把页码值赋值给currentPage
      this.currentPage = val;
      
      this.gitCurrentData();
    }
  },
  // 生命周期钩子函数 vue实例对象创建完成 dom还没有生成
  created () {
   this.gitCurrentData();
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

