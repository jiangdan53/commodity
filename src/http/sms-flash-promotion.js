//统一api管理
import instance from "./axios";
// data json
const userLogin=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data,
      
    })
}
const adminLogin=(data)=>{
   return instance.request({
    url:'', //url=baseURL+url
        method:'post',
        data
   })
}
const promotionPage=(data)=>{
   return instance.request({
    url:'/mall/sms-flash-promotion/page',
    method:'post',
    data
   })
}
const promotionDelId=(params)=>{
    return instance.request({
        url:'/mall/sms-flash-promotion/del/' + params.id,
        params
    })
}
const promotionAdd=(data)=>{
    return instance.request({
        url:'/mall/sms-flash-promotion/add',
        method:'post',
        data
    })
}
const promotionEdit=(data)=>{
    return instance.request({
        url:'/mall/sms-flash-promotion/edit',
        method:'post',
        data
    })
}

// const isEven = n => n % 2 === 0;


export {
    userLogin,
    adminLogin,
    promotionPage,
    promotionDelId,
    promotionAdd,
    promotionEdit
} 