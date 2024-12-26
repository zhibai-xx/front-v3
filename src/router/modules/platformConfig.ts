import { RouteRecordRaw } from 'vue-router'

const platformConfigRoutes: RouteRecordRaw = {
    path: '/platformConfig',
    name: 'PlatformConfig',
    // component: () => import('@/views/platform/PlatformConfig.vue'),
    meta: {
        title: '平台配置'
    },
    children: [
        {
            path: 'threeFactors',
            name: 'ThreeFactors',
            component: () => import('@/views/UserConfiguration/threeFactors.vue'),
            meta: {
                keepAlive: true,
                title: '三因素管理'
            }
        }
    ]
}

export default platformConfigRoutes 