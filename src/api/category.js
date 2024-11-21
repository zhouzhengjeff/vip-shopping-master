import axios from '@/utils/request'

export const getCategoryData = () => {
  return axios({
    url: '/category/list',
    method: 'get'
  })
}
