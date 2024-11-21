import axios from '@/utils/request'

export const getHomeData = (pageId) => {
  return axios({
    url: '/page/detail',
    method: 'get',
    params: {
      pageId
    }
  })
}
