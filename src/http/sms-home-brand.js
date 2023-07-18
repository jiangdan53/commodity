import instance from "./axios";
import { method } from "lodash-es";
//添加
const adTaskPage = (data) => {
   return instance.request({
      url: 'mall/sms-home-brand/page', //url=baseURL+url
      method: 'post',
      data
   })
}
const adTaskAdd = (data) => {
   return instance.request({
      url:'mall/sms-home-brand/add',
      method:'post',
      data
   })
}

//删除
const  adTaskDelId = (params) => {
   return instance.request({
      url: 'mall/sms-home-brand/del/'+ params.id,
      params
   })
}

//数据回显
const couponOne = (params) => {
   return instance.request({
      url:'mall/sms-home-brand/one/'+ params.id,
      params
   })
}

//分页查询


//编辑
const  adTaskEdit = (data) => {
   return instance.request({
      url:'mall/sms-home-brand/edit',
      method:'post',
      data
   })
}



export {
   adTaskPage,
   adTaskDelId,
   adTaskAdd,
   adTaskEdit,
   couponOne
}