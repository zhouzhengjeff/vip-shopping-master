import axios from '@/utils/request'

export const getGoodsList = (params) => {
  return axios({
    url: '/goods/list',
    method: 'get',
    params
  })
}

export const getGoodsDetail = (id) => {
  return axios({
    url: '/goods/detail',
    method: 'get',
    params: {
      goodsId: id
    }
  })
}
