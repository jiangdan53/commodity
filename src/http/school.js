//统一api管理
import instance from './axios'
const userLogin = (data) => {
  //返回Promise对象
  return instance.request({
    url: 'api/mobile/elogin', //url=baseUrl+url,
    method: 'post',
    data,
    headers: {},
  })
}

const adminLogin = (data) => {
  return instance.request({
    url: '',
    method: '',
    data,
  })
}
const adCatePage = (data) => {
  return instance.request({
    url: 'api/adcate/page',
    method: 'post',
    data,
  })
}
const adCateDelId = (params) => {
  return instance.request({
    url: 'api/adcate/delete',
    params,
  })
}
const adCateAdd = (data) => {
  return instance.request({
    url: 'api/adcate/add',
    method: 'post',
    data,
  })
}
const adCateEdit = (data) => {
  return instance.request({
    url: 'api/adcate/edit',
    method: 'post',
    data,
  })
}
const adminLogin1 = function (data) {
  return instance.request({
    url: '',
    method: 'post',
    data,
  })
}

export { userLogin, adminLogin, adCatePage, adCateDelId, adCateAdd, adCateEdit }
