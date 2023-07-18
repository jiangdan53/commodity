import instance from "./axios";
import { method } from "lodash-es";
//添加
const brandadTaskPage = (data) => {
   return instance.request({
      url: 'mall/sms-home-brand/page', //url=baseURL+url
      method: 'post',
      data
   })
}
const brandadTaskAdd = (data) => {
   return instance.request({
      url:'mall/sms-home-brand/add',
      method:'post',
      data
   })
}

//删除
const  brandadTaskDelId = (params) => {
   return instance.request({
      url: 'mall/sms-home-brand/del/'+ params.id,
      params
   })
}

//数据回显
const brandcouponOne = (params) => {
   return instance.request({
      url:'mall/sms-home-brand/one/'+ params.id,
      params
   })
}

//分页查询


//编辑
const  brandadTaskEdit = (data) => {
   return instance.request({
      url:'mall/sms-home-brand/edit',
      method:'post',
      data
   })
}



export {
    brandadTaskAdd,
    brandadTaskDelId,
    brandadTaskPage,
    brandadTaskEdit,
    brandcouponOne
}