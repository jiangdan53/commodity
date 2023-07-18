//引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
//ES6  import输入  export 输出
// 模块化 默认私有，如何被别人使用？
// 通过export 输出
// 如何使用
// export default 默认输出
import Index from '@/views/static/index.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
//白名单
const whiteList = [
    "/",
    "/login",
    "/ums-member-task"
]
import { useUserStore } from '../store/user'

//路由表
const routes = [{
        path: '/', //访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf 
        name: 'home', //命名路由
        component: Index, //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
    },
    {
        path: '/adcate',
        name: 'adCate',
        component: () =>
            import ('../views/static/adCate.vue') // 懒加载
    },

    {
        path: '/pms-product-attribute-category',
        name: 'pms-product-attribute-category',
        component: () => import('@/views/admin/pms-product-attribute-category.vue'), // 懒加载
      },
      
     {
        path: '/ums-member-task',
        name: 'ums-member-task',
        component: () => import('@/views/admin/ums-member-task.vue') // 懒加载
      },
     {
        path: '/smsHomeAdvertise',
        name: 'smsHomeAdvertise',
        component: () => import('@/views/admin/smsHomeAdvertise.vue') // 懒加载
      },
      {
        path: '/sms-home-recommend-subject',
        name: 'sms-home-recommend-subject',
        component: () => import('@/views/admin/sms-home-recommend-subject.vue') // 懒加载
      },
      {
        path: '/sms-home-recommend-product',
        name: 'sms-home-recommend-product',
        component: () => import('@/views/admin/sms-home-recommend-product.vue') // 懒加载
      },
      // {
      //   path: '/recommendproduct',
      //   name: 'recommendproduct',
      //   component: () => import('@/views/admin/recommendproduct.vue') // 懒加载
      // },
      {
        path: '/sms-home-new-product',
        name: 'sms-home-new-product',
        component: () => import('@/views/admin/sms-home-new-product.vue') // 懒加载
      },
      {
        path: '/sms-home-brand',
        name: 'sms-home-brand',
        component: () => import('@/views/admin/sms-home-brand.vue') // 懒加载
      },
      {

        path: '/ums-admin',
        name: 'ums-admin',
        component: () => import('@/views/admin/ums-admin.vue'), // 懒加载
      },
      
    {
        path: '/sms-coupon',
        name: 'sms-coupon',
        component: () =>
            import ('@/views/admin/sms-coupon.vue') // 懒加载
    },
    {
        path: '/sms-flash-promotion-session',
        name: 'sms-flash-promotion-session',
        component: () =>
            import ('@/views/admin/sms-flash-promotion-session.vue') // 懒加载
    },
    {
        path: '/pms-brand',
        name: 'pms-brand',
        component: () =>
            import ('@/views/admin/pms-brand.vue') // 懒加载
    },
    {
        path: '/cms-subject-category',
        name: 'cms-subject-category',
        component: () =>
            import ('@/views/static/cms-subject-category.vue') // 懒加载
    },
    {
        path: '/admin',
        name: 'admin',
        component: LayoutAdmin,
        children: [{
                path: '',
                name: 'admin-index',
                component: () =>
                    import ('@/views/admin/index.vue')
            },
            {
                path: 'info',
                name: 'admin-info',
                component: () =>
                    import ('@/views/admin/info.vue')
            },
            {
                path: 'logout',
                name: 'admin-logout',
                component: () =>
                    import ('@/views/admin/logout.vue')
            }, {
                path: 'changepassword',
                name: 'admin-changepassword',
                component: () =>
                    import ('@/views/admin/changepassword.vue')
            },
            {
                path: 'forgetpassword',
                name: 'admin-forgetpassword',
                component: () =>
                    import ('@/views/admin/forgetpassword.vue')
            },
            {
                path: '/smsHomeAdvertise',
                name: 'smsHomeAdvertise',
                component: () => import('@/views/admin/smsHomeAdvertise.vue') // 懒加载
              },
              {
                path: '/sms-home-recommend-subject',
                name: 'sms-home-recommend-subject',
                component: () => import('@/views/admin/sms-home-recommend-subject.vue') // 懒加载
              },
              {
                path: '/sms-home-recommend-product',
                name: 'sms-home-recommend-product',
                component: () => import('@/views/admin/sms-home-recommend-product.vue') // 懒加载
              },
              {
                path: '/sms-home-new-product',
                name: 'sms-home-new-product',
                component: () => import('@/views/admin/sms-home-new-product.vue') // 懒加载
              },
              {
                path: '/sms-home-brand',
                name: 'sms-home-brand',
                component: () => import('@/views/admin/sms-home-brand.vue') // 懒加载
              },
              {
                path: '/smsview',
                name: 'smsview',
                component: () => import('@/views/admin/smsview.vue') // 懒加载
              },
              {
                path: '/userbrand',
                name: 'userbrand',
                component: () => import('@/views/admin/userbrand.vue') // 懒加载
              },
              {
                path: '/usernew',
                name: 'usernew',
                component: () => import('@/views/admin/usernew.vue') // 懒加载
              },
              {
                path: '/usersubject',
                name: 'usersubject',
                component: () => import('@/views/admin/usersubject.vue') // 懒加载
              },
              {
                path: '/userproduct',
                name: 'userproduct',
                component: () => import('@/views/admin/userproduct.vue') // 懒加载
              },

            {
                path: '/', //访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf
                name: 'home', //命名路由
                component: Index, //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
            },

            {
                path: '/cms_log', //访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf
                name: 'cms_log', //命名路由
                component: () =>
                    import ('@/views/admin/cms_log.vue'),
            },

            {
                path: '/ums-member-receive-address',
                name: 'ums-member-receive-address',
                component: () =>
                    import ('../views/admin/ums-member-receive-address.vue') // 懒加载
            },
            {
                path: '/cms-help-category',
                name: 'cms-help-category',
                component: () =>
                    import ('../views/admin/cms-help-category.vue') // 懒加载
            },
            {
                path: '/cms-topic',
                name: 'cms-topic',
                component: () =>
                    import ('@/views/admin/cms-topic.vue'), // 懒加载
            },
            {
                path: '/adcate',
                name: 'adCate',
                component: () =>
                    import ('@/views/static/adCate.vue'), // 懒加载
            },
            {
                path: '/sms-flash-promotion',
                name: 'sms-flash-promotion',
                component: () =>
                    import ('@/views/admin/sms-flash-promotion.vue'), // 懒加载
            },
            {
                path: '/cms-topic',
                name: 'cms-topic',
                component: () =>
                    import ('@/views/admin/cms-topic.vue'), // 懒加载
            },
            {
                path: '/pms-product-category',
                name: 'pms-product-category',
                component: () =>
                    import ('@/views/admin/pms-product-category.vue'), // 懒加载
            },

            {
                path: '/login',
                name: 'login',
                component: () =>
                    import ('@/views/static/login.vue'), // 懒加载
            },
            {
                path: '/admin',
                name: 'admin',
                component: LayoutAdmin,
                
            },
        ]
    },
    


    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () =>import ('../views/404.vue'), // 懒加载
    },
 
]
const router = createRouter({
    //模式
    history: createWebHashHistory(),
    routes
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (whiteList.includes(to.path)) {
        next();
    }
    else {
        if (userStore.token && userStore.token.length > 0) {
      next()

        }
        else {
            next({ name: "login" })
        }

    }


})
export default router;
