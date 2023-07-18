/**
 * 使用element plus 封装的loading模块
 */
import { ElLoading } from 'element-plus'
import { nextTick } from 'vue'
let loadingInstance;
export const showLoading = () => {

    loadingInstance = ElLoading.service({
        lock: true,
        text: "加载中……",
        background: 'rgba(0, 0, 0, 0.1)'
    });

}
export const hideLoading = () => {

    nextTick(() => {
        setTimeout(() => {
            loadingInstance.close();
        }, 1000)
    })
}