//统一api管理
import instance from "./axios";
import { method } from "lodash-es";

const adTaskPage=(data)=>{
   return instance.request({
    url:'mall/ums-member-task/page',
    method:'post',
    data
   })
}
const adTaskDelId=(params)=>{
    return instance.request({
        url:'mall/ums-member-task/del/' + params.id,
        params
    })
}
const adTaskAdd=(data)=>{
    return instance.request({
        url:'mall/ums-member-task/add',
        method:'post',
        data
    })
}
const adTaskEdit=(data)=>{
    return instance.request({
        url:'mall/ums-member-task/edit',
        method:'post',
        data
    })
}
const couponOne = (params) => {
    return instance.request({
        url: 'mall/ums-member-task/one/' + params.id,
        params
    })
}
export {
    adTaskPage,
    adTaskDelId,
    adTaskAdd,
    adTaskEdit,
    couponOne

} 


