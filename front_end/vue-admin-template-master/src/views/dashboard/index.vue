<template>
  <div class="dashboard-container">
    <!--    <div class="dashboard-text">Welcome Back: {{ name }}</div>-->
    <div class="block">
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="item in items" :key="item">
<!--          <img height="150px" width="1400px" :src="item" class="small">-->
          <h3 class="small" style="text-align: center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div style="padding: 50px"></div>

      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '首页',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        items: [
          '内部公告1',
          '内部公告2',
          '内部公告3',
          '内部公告4'
        ],
        reverse: false,
        activities: [
          {content: '近三次登入时间'},
          {
            content: '',
            timestamp: '2020-04-15'
          }, {
            content: '',
            timestamp: '2020-04-13'
          }, {
            content: '',
            timestamp: '2020-04-11'
          }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
