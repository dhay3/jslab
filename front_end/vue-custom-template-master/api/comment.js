import request from '@/utils/request'

export default {
  //分页评论
  pageComments(courseId, cur, size) {
    return request({
      url: `/eduservice/comment/${courseId}/${cur}/${size}`,
      method: 'get'
    })
  },
  //保存评论
  saveComment(comment) {
    return request({
      url: `/eduservice/comment`,
      method: 'post',
      data: comment
    })
  }
}
