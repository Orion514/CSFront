import request from '@/utils/system/request'

// 登录api
export function loginApi(data) {
  return request({
    url: '/user/login',
    method: 'post',
    // baseURL: '/mock',
    data
  })
}

// 获取用户信息Api
export function getInfoApi(data) {
  return request({
    url: '/user/info',
    method: 'post',
    // baseURL: '/mock',
    data
  })
}

// 退出登录Api
export function loginOutApi() {
  return request({
    url: '/user/out',
    method: 'post',
    baseURL: '/mock'
  })
}

// 获取用户信息Api
export function passwordChange(data) {
  return request({
    url: '/user/passwordChange',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    // baseURL: '/mock',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    // baseURL: '/mock',
    data
  })
}
