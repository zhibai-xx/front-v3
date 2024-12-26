import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '../views/layout/index.vue'

// 导入模块路由
import platformManageRoutes from './modules/platformManage'
import platformConfigRoutes from './modules/platformConfig'

// 定义路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/homepages',
    children: [
      {
        path: '/homepages',
        name: 'Homepages',
        component: () => import('../views/dashboard/index.vue'),
        meta: {
          title: '首页'
        }
      },
      // 引入模块路由
      platformManageRoutes,
      platformConfigRoutes
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

// 路由后置守卫
router.afterEach(() => {
  NProgress.done()
})

export default router