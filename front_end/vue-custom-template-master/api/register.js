import request from '@/utils/request'

export default {
  //根据手机号码发送短信
  sendCode(phoneNumber) {
    return request({
      url: `/edusms/sms/${phoneNumber}`,
      method: 'get'
    })
  },
  //用户注册
  registerMember(MemberRegisterVo) {
    return request({
      url: `/edumember/member/register`,
      method: 'post',
      data: MemberRegisterVo
    })
  }
}
