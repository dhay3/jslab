import request from '@/utils/request'
export default {
  createOrderByCourseIdMemberId(courseId) {
    return request({
      url: `/eduorder/order/${courseId}`,
      method: 'post',
    })
  },
  //根据orderNo获取订单信息
  getOrderInfoByOrderId(orderNo) {
    return request({
      url: `/eduorder/order/${orderNo}`,
      method: 'get',
    })
  },
  createQRCodeMap(orderNo){
    return request({
      url: `/eduorder/paylog/qrcode/${orderNo}`,
      method: 'get',
    })
  },
  getOrderStatus(orderNo){
    return request({
      url: `/eduorder/paylog/${orderNo}`,
      method: 'get',
    })
  }
}
