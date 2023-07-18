import { createApp } from 'vue'
import App from './App.vue'//首页面
import router from './router'
import 'element-plus/dist/index.css' //全局样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from './http/axios'
import  pinia from './utils/pinia'
import { TroisJSVuePlugin } from 'troisjs';
//引入组件
//import MyComponent from './components/MyComponent.vue'
const app = createApp(App)
app.use(pinia) //挂载pinia
//全局注册组件  全局组件
//app.component('MyComponent',MyComponent)

app.use(router) //挂载router

// 将element-ui 组件 挂载到全局 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(TroisJSVuePlugin);

app.mount('#app') //挂在index.html

app.config.globalProperties.$axios = axios
