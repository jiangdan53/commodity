import { method } from "lodash-es";
import instance from "./axios";
// 页面page展示接口
const couponPage = (data) => {
    return instance.request({
        url: 'mall/sms-coupon/page',
        method: 'post',
        data
    })
}
// 增
const couponAdd = (data) => {
    return instance.request({
        url: 'mall/sms-coupon/add',
        method: 'post',
        data
    })
}
// 删
const couponDelId = (params) => {
    return instance.request({
        url: 'mall/sms-coupon/del/' + params.id,
        params
    })
}
// 改
const couponEdit = (data) => {
    return instance.request({
        url: 'mall/sms-coupon/edit',
        method: 'post',
        data
    })
}
//按id
const couponOne = (params) => {
    return instance.request({
        url: 'mall/sms-coupon/one/' + params.id,
        params
    })
}

export {
    couponPage,
    couponAdd,
    couponEdit,
    couponDelId,
    couponOne

} 