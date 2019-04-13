<template>
    <div class="salestotal">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>进货数据统计</span>
                
            </div>
            <div class="selectDate">
                <span>时间：</span>
                <el-date-picker
                    size='small'
                    v-model="value1"
                    align="left"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
                <span>-</span>
                <el-date-picker
                    size='small'
                    v-model="value2"
                    align="left"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
               
                <!-- 按钮 -->
                <el-button type="primary" size='small'>查询</el-button>
            </div>
            
        </el-card>
    </div>
</template>
<script>
export default {
     data() {
      return {
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
        value1:"",
        value2:""
      }
    }
}
</script>
<style lang="less">
    @import './stocktotal.less';
</style>