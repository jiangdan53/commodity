import instance from "./axios";
// data json
//通过分页获取产品信息
const getProductsPage=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'mall/pms-product/page', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data,
      
    })
}