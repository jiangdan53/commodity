//统一api管理
import instance from './axios'
const adCateOne = (params) => {
  return instance.request({
    url: 'mall/ums-member-rule-setting/one/'+params.id,
    params
  })
}

const adCatePage = (data) => {
  return instance.request({
    url: 'mall/ums-member-rule-setting/page',
    method: 'post',
    data,
  })
}
const adCateDelId = (params) => {
  return instance.request({
    url: 'mall/ums-member-rule-setting/del/'+params.id,
    params,
  })
}
const adCateAdd = (data) => {
  return instance.request({
    url: 'mall/ums-member-rule-setting/add',
    method: 'post',
    data,
  })
}
const adCateEdit = (data) => {
  return instance.request({
    url: 'mall/ums-member-rule-setting/edit',
    method: 'post',
    data,
  })
}
export { adCatePage, adCateDelId, adCateAdd, adCateEdit,adCateOne }
