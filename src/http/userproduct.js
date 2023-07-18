import instance from "./axios";
import { method } from "lodash-es";
//添加
const productadTaskPage = (data) => {
   return instance.request({
      url: 'mall/sms-home-recommend-product/page', //url=baseURL+url
      method: 'post',
      data
   })
}
const productadTaskAdd = (data) => {
   return instance.request({
      url:'mall/sms-home-recommend-product/add',
      method:'post',
      data
   })
}

//删除
const  productadTaskDelId = (params) => {
   return instance.request({
      url: 'mall/sms-home-recommend-product/del/'+ params.id,
      params
   })
}

//数据回显
const productcouponOne = (params) => {
   return instance.request({
      url:'mall/sms-home-recommend-product/one/'+ params.id,
      params
   })
}

//分页查询


//编辑
const  productadTaskEdit = (data) => {
   return instance.request({
      url:'mall/sms-home-recommend-product/edit',
      method:'post',
      data
   })
}



export {
    productadTaskAdd,
    productadTaskDelId,
    productadTaskEdit,
    productadTaskPage,
    productcouponOne,

}