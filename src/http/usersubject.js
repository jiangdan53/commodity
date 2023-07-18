import instance from "./axios";
import { method } from "lodash-es";
//添加
const subjectadTaskPage = (data) => {
   return instance.request({
      url: 'mall/sms-home-recommend-subject/page', //url=baseURL+url
      method: 'post',
      data
   })
}
const subjectadTaskAdd = (data) => {
   return instance.request({
      url:'mall/sms-home-recommend-subject/add',
      method:'post',
      data
   })
}

//删除
const  subjectadTaskDelId = (params) => {
   return instance.request({
      url: 'mall/sms-home-recommend-subject/del/'+ params.id,
      params
   })
}

//数据回显
const subjectcouponOne = (params) => {
   return instance.request({
      url:'mall/sms-home-recommend-subject/one/'+ params.id,
      params
   })
}

//分页查询


//编辑
const  subjectadTaskEdit = (data) => {
   return instance.request({
      url:'mall/sms-home-recommend-subject/edit',
      method:'post',
      data
   })
}



export {
    subjectadTaskAdd,
    subjectadTaskDelId,
    subjectadTaskEdit,
    subjectadTaskPage,
    subjectcouponOne

}