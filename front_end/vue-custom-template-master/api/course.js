import request from '@/utils/request'

export default {
  //讲师分页
  getFrontCoursesByCondition(cur, size, frontCourseQueryVo) {
    return request({
      url: `/eduservice/front/course/${cur}/${size}`,
      method: 'post',
      data: frontCourseQueryVo
    })
  },
  //查询单个讲师
  getTeacherDetailsById(id) {
    return request({
      url: `/eduservice/front/teacher/${id}`,
      method: 'get'
    })
  },
  //获取所有一级二级分类
  listSubject() {
    return request({
      url: `/eduservice/subject`,
      method: 'get'
    })
  },
  // 根据课程id查询所有课程相关信息, 包括讲师,课程描述,一二级类别
  getFrontCourseDetailsByCourseId(courseId) {
    return request({
      url: `/eduservice/front/course/${courseId}`,
      method: 'get'
    })
  }
}
