//统一api管理
import instance from "./axios";
const userLogin=(data)=>{
    //返回Promise对象
    return instance.request({
        url:'api/mobile/elogin', //url=baseUrl+url,
        method:'post',
        data,
        headers:{

        }
    })
}

const adminLogin=(data)=>{
    return instance.request({
        url:'',
        method:'',
        data
    })
}
const brandPage=(data)=>{
    return instance.request({
        url:'/mall/pms-brand/page',
        method:'post',
        data
    })
}
const brandDelId=(params)=>{
    return instance.request({
        url:'/mall/pms-brand/del/'+params.id,
        params
    })
}
const brandAdd=(data)=>{
    return instance.request({
      url:'/mall/pms-brand/add',
      method :'post',
      data
  })
  }
  const brandEdit=(data)=>{
    return instance.request({
      url:'/mall/pms-brand/edit',
      method :'post',
     data
  })
  } 
const adminLogin1=function(data){
    return instance.request({
    url:'', 
    method:'post',
    data
})
}

export {
    userLogin,
    adminLogin,
    brandPage,
    brandDelId,
    brandAdd,
    brandEdit
} 