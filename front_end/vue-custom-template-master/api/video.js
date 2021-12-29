import request from '@/utils/request'

export default {
  //获取视频播放凭证
  getPlayAuth(videoId) {
    return request({
      url: `/eduvod/video/${videoId}`,
      method: 'get'
    })
  },
}
