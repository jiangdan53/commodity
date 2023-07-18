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
const receivePage=(data)=>{
   return instance.request({
    url:'/mall/ums-member-receive-address/page',
    method:'post',
    data
   })
}
const receiveDelId=(params)=>{
    return instance.request({
        url:'/mall/ums-member-receive-address/del/' + params.id,
        params
    })
}
const receiveAdd=(data)=>{
    return instance.request({
        url:'/mall/ums-member-receive-address/add',
        method:'post',
        data
    })
}
const receiveEdit=(data)=>{
    return instance.request({
        url:'/mall/ums-member-receive-address/edit',
        method:'post',
        data
    })
}

// const isEven = n => n % 2 === 0;


export {
    userLogin,
    adminLogin,
    receivePage,
    receiveDelId,
    receiveAdd,
    receiveEdit
} 