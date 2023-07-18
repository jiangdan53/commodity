import { ElLoading } from 'element-plus'
import api from './index.js'

let loadingInstance // 定义加载实例

const showLoading = () => {
  // 创建加载实例并显示加载动画
  loadingInstance = ElLoading.service({
    lock: true,
    text: '加载中...', // 可自定义加载提示文本
    spinner: 'wave', // 加载样式为旋转图标
  })
}

const hideLoading = () => {
  // 关闭加载实例，隐藏加载动画
  if (loadingInstance) {
    loadingInstance.close()
  }
}

const One = async (id) => {
  showLoading() // 显示加载动画

  try {
    const response = await api.request({
      url: '/mall/cms-log' + id,
      method: 'get',
    })
    return response
  } catch (error) {
    throw error
  } finally {
    hideLoading() // 隐藏加载动画
  }
}

const Del = async (id) => {
  showLoading() // 显示加载动画

  try {
    const response = await api.request({
      url: '/mall/cms-log/del/' + id,
      method: 'get',
    })
    return response
  } catch (error) {
    throw error
  } finally {
    hideLoading() // 隐藏加载动画
  }
}

const Edit = async (data) => {
  showLoading() // 显示加载动画

  try {
    const response = await api.request({
      url: '/mall/cms-log/edit',
      method: 'post',
      data,
    })
    return response
  } catch (error) {
    throw error
  } finally {
    hideLoading() // 隐藏加载动画
  }
}

const Add = async (data) => {
  showLoading() // 显示加载动画
  try {
    const response = await api.request({
      url: '/mall/cms-log/add',
      method: 'post',
      data,
    })
    return response
  } catch (error) {
    throw error
  } finally {
    hideLoading() // 隐藏加载动画
  }
}

const Page = async (data) => {
  showLoading() // 显示加载动画

  try {
    const response = await api.request({
      url: '/mall/cms-log/page',
      method: 'post',
      data,
    })
    return response
  } catch (error) {
    throw error
  } finally {
    hideLoading() // 隐藏加载动画
  }
}

export default { One, Del, Edit, Add, Page }
