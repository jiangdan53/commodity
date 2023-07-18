import instance from "./axios";
import { method } from "lodash-es";
//添加
const adTaskPage = (data) => {
   return instance.request({
      url: 'mall/sms-home-advertise/page', //url=baseURL+url
      method: 'post',
      data
   })
}
const adTaskAdd = (data) => {
   return instance.request({
      url:'mall/sms-home-advertise/add',
      method:'post',
      data
   })
}

//删除
const  adTaskDelId = (params) => {
   return instance.request({
      url: 'mall/sms-home-advertise/del/'+ params.id,
      params
   })
}

//数据回显
const couponOne = (params) => {
   return instance.request({
      url:'mall/sms-home-advertise/one/'+ params.id,
      params
   })
}

//分页查询


//编辑
const  adTaskEdit = (data) => {
   return instance.request({
      url:'mall/sms-home-advertise/edit',
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