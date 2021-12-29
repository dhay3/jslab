<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="日期">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择要统计的日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>

      <el-button
        :disabled="btnDisabled"
        type="primary"
        @click="statisticsRegisterCountByDate">生成
      </el-button>
    </el-form>

  </div>
</template>

<script>
  import statistics from "@/api/edu/statistics";

  export default {
    name: "create",
    data() {
      return {
        date: '',
        btnDisabled: false
      }
    },
    created() {
    },
    methods: {
      statisticsRegisterCountByDate() {
        statistics.statisticsRegisterCountByDate(this.date)
          .then(response => {
            this.btnDisabled = true
            this.$message({
              type: 'success',
              message: '生成数据成功'
            })
            this.$route.push({path: '/sta/show'})
          })
      }
    }
  }
</script>

<style scoped>

</style>
