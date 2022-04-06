import request from '@/utils/request'
export default {
  login(username, password) {
    return request({
      url: '/user/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  },
  //token:用户id
  getInfo(token) {
    return request({
      url: '/user/info',
      method: 'get',
      params: { token }
    })
  },
  logout() {
    return request({
      url: '/user/logout',
      method: 'post'
    })
  }
}
// export function login(username, password) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }