//ͳһapi����
import instance from "./axios";
import { method } from "lodash-es";
// data json
const userLogin=(data)=>{
    //����Promise����
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
const adTopicPage=(data)=>{
   return instance.request({
    url:'mall/pms-feight-template/page',
    method:'post',
    data
   })
}
const adTopicDelId=(params)=>{
    return instance.request({
        url:'mall/pms-feight-template/del/' + params.id,
        params
    })
}
const adTopicAdd=(data)=>{
    return instance.request({
        url:'mall/pms-feight-template/add',
        method:'post',
        data
    })
}
const adTopicEdit=(data)=>{
    return instance.request({
        url:'mall/pms-feight-template/edit',
        method:'post',
        data
    })
}

//��id
const couponOne = (params) => {
    return instance.request({
        url: 'mall/pms-feight-template/one/' + params.id,
        params
    })
}

import axios from 'axios'


// �����Զ���� Axios ʵ��
const api = axios.create({
  baseURL: 'http://mall.qzimp.cn', // ���û���URL
  withCredentials: true, // ����Я�����������ƾ֤
})

// �������������
api.interceptors.request.use(
  (config) => {
    // �ڷ�������֮ǰ��һЩ����
    return config
  },
  (error) => {
    // �����������
    return Promise.reject(error)
  }
)
export {
    userLogin,
    adminLogin,
    adTopicPage,
    adTopicDelId,
    adTopicAdd,
    adTopicEdit,
    couponOne
} 
// �����Ӧ������
api.interceptors.response.use(
  (response) => {
    // ����Ӧ������һЩ����
    return response
  },
  (error) => {
    // ������Ӧ����
    return Promise.reject(error)
  }
)
export default api

