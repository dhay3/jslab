import request from '@/utils/request'

export default {

  //添加小节
  statisticsRegisterCountByDate(date) {
    return request({
      url: `http://localhost:8080/statics/daily/${date}`,
      method: 'get',
    })
  },
  //图表显示
  showChartByCondition(queryDailyVo) {
    return request({
      url: `http://localhost:8080/statics/daily/showChart`,
      method: 'post',
      data: queryDailyVo
    })
  }
}




