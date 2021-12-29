import request from '@/utils/request'

export default {
  //讲师分页
  pageTeachersFront(cur,size) {
    return request({
      url: `/eduservice/front/teacher/${cur}/${size}`,
      method: 'get'
    })
  },
  //查询单个讲师
  getTeacherDetailsById(id){
    return request({
      url: `/eduservice/front/teacher/${id}`,
      method: 'get'
    })
  }
}
