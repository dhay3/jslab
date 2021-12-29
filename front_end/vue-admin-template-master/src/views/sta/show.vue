<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="学员登录数统计" value="LoginNum"/>
          <el-option label="学员注册数统计" value="RegisterNum"/>
          <el-option label="课程播放数统计" value="VideoViewNum"/>
          <el-option label="每日课程数统计" value="CourseNum"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询
      </el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%"/>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  import statistics from "@/api/edu/statistics";


  export default {
    name: "show",
    data() {
      return {
        searchObj: {},
        btnDisabled: false,
        // x
      }
    },
    created() {
      // this.createChart()
    },
    methods: {
      showChart() {
        statistics.showChartByCondition(this.searchObj)
          .then(response => {
            var myChart = echarts.init(document.getElementById('chart'))
            myChart.setOption({
              title: {
                text: this.searchObj.begin+'/'+this.searchObj.end+'/'+this.searchObj.type
              },
              tooltip: {
              },
              xAxis: {
                data: response.data.data.xAxisData
              },
              yAxis: {},
              series: [{
                name: this.searchObj.type,
                type: 'bar',
                data: response.data.data.data
              }]
            });
          })
      },
      // showChart(){
      //   var myChart = echarts.init(document.getElementById('chart'))
      //   console.log(myChart)
      //   myChart.setOption({
      //     title: {
      //       text: 'ECharts 入门示例'
      //     },
      //     tooltip: {},
      //     xAxis: {
      //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      //     },
      //     yAxis: {},
      //     series: [{
      //       name: '销量',
      //       type: 'bar',
      //       data: [5, 20, 36, 10, 10, 20]
      //     }]
      //   });
      // }
    }
  }
</script>

<style scoped>

</style>
