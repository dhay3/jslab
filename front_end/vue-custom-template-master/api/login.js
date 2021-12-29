import request from '@/utils/request'
import cookie from "js-cookie";
export default {
  //登录
  submitLogin(MemberLoginVo) {
    return request({
      url: `/api/ucenter/login`,
      method: 'post',
      data: MemberLoginVo
    })
  },
  //根据token获取用户信息
  getUserInfoByToken() {
    return request({
      url: `/api/ucenter/token`,
      method: 'get',
      // headers: {'token': cookie.get('token')}
    })
  }
}
