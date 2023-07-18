import instance from "./axios";
import { method } from "lodash-es";
//添加
const newadTaskPage = (data) => {
   return instance.request({
      url: 'mall/sms-home-new-product/page', //url=baseURL+url
      method: 'post',
      data
   })
}
const newadTaskAdd = (data) => {
   return instance.request({
      url:'mall/sms-home-new-product/add',
      method:'post',
      data
   })
}

//删除
const  newadTaskDelId = (params) => {
   return instance.request({
      url: 'mall/sms-home-new-product/del/'+ params.id,
      params
   })
}

//数据回显
const newcouponOne = (params) => {
   return instance.request({
      url:'mall/sms-home-new-product/one/'+ params.id,
      params
   })
}

//分页查询


//编辑
const  newadTaskEdit = (data) => {
   return instance.request({
      url:'mall/sms-home-new-product/edit',
      method:'post',
      data
   })
}



export {
    newadTaskAdd,
    newadTaskDelId,
    newadTaskEdit,
    newadTaskPage,
    newcouponOne

}