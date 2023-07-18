import instance from "./axios";
import { method } from "lodash-es";

//1.首页广告
//添加
const adTaskPagel = (data) => {
   return instance.request({
      url: 'mall/sms-home-advertise/page', //url=baseURL+url
      method: 'post',
      data
   })
}
const adTaskAddl = (data) => {
   return instance.request({
      url:'mall/sms-home-advertise/add',
      method:'post',
      data
   })
}

//删除
const  adTaskDelIdl = (params) => {
   return instance.request({
      url: 'mall/sms-home-advertise/del/'+ params.id,
      params
   })
}

//数据回显
const couponOnel = (params) => {
   return instance.request({
      url:'mall/sms-home-advertise/one/'+ params.id,
      params
   })
}

//分页查询


//编辑
const  adTaskEditl = (data) => {
   return instance.request({
      url:'mall/sms-home-advertise/edit',
      method:'post',
      data
   })
}






export {
   adTaskPagel,
   adTaskDelIdl,
   adTaskAddl,
   adTaskEditl,
   couponOnel,
}