import axios from '@/utils/request'

/**
 * 登录相关的api
 */
export const getPicCode = () => {
  return axios({
    url: '/captcha/image',
    method: 'get'
  })
}

export const login = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}
