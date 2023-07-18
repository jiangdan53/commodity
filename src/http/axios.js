import axios from "axios";
import { useUserStore } from "../store/user";
import {showLoading,hideLoading } from '@/utils/eloading'

//创建axios实例
const instance=axios.create({
    baseURL:'http://mall.qzimp.cn/',
    timeout:6000
})
//请求拦截器
instance.interceptors.request.use((config)=>{
    showLoading()
    const userStore=useUserStore();
    const {token}=userStore;
    // console.log(token);
    config.headers.token=token;
    return config
},(err)=>{
   return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use((res)=>{
    hideLoading()
    return res.data;
},(err)=>{
    hideLoading()
    return Promise.reject(err)
})

export default instance;

