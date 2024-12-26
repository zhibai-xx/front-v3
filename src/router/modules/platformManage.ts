import { RouteRecordRaw } from 'vue-router'

const platformManageRoutes: RouteRecordRaw = {
    path: '/platformManage',
    name: 'PlatformManage',
    // component: () => import('@/views/platform/PlatformManage.vue'),
    meta: {
        title: '平台管理'
    },
    children: [
        {
            path: 'todoTasks',
            name: 'TodoTasks',
            component: () => import('@/views/UserConfiguration/todoTasks.vue'),
            meta: {
                keepAlive: true,
                title: '待办任务'
            }
        }
    ]
}

export default platformManageRoutes 