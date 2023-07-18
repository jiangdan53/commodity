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
const categoryPage=(data)=>{
   return instance.request({
    url:'/mall/cms-help-category/page',
    method:'post',
    data
   })
}
const categoryDelId=(params)=>{
    return instance.request({
        url:'/mall/cms-help-category/del/' + params.id,
        params
    })
}
const categoryAdd=(data)=>{
    return instance.request({
        url:'/mall/cms-help-category/add',
        method:'post',
        data
    })
}
const categoryEdit=(data)=>{
    return instance.request({
        url:'/mall/cms-help-category/edit',
        method:'post',
        data
    })
}

// const isEven = n => n % 2 === 0;


export {
    userLogin,
    adminLogin,
    categoryPage,
    categoryDelId,
    categoryAdd,
    categoryEdit
} 