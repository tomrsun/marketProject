<template>
    <div class="salestotal">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售数据统计</span>
                
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
                <!-- 选择统计方式 -->
                 <el-select v-model="value" placeholder="" size='small'>
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <!-- 按钮 -->
                <el-button type="primary" size='small'>提交</el-button>
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
        options: [{
          value: '选项1',
          label: '销售情况统计'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '选项1',
        value1: '',
        value2: '',
      };
    }
}
</script>
<style lang="less">
    @import './salestotal.less';
</style>