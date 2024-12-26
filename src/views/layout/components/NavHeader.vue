<template>
  <div class="nav-header">
    <!-- Logo区域 -->
    <div class="logo">
      <img src="@/assets/vue.svg" alt="Logo">
      <span>后台管理系统</span>
    </div>

    <!-- 导航菜单 -->
    <el-menu :default-active="activeMenu" mode="horizontal" router @select="handleSelect">
      <el-menu-item v-for="menu in menus" :key="menu.path" :index="menu.path">
        <el-icon>
          <component :is="menu.icon" />
        </el-icon>
        <span>{{ menu.title }}</span>
      </el-menu-item>
    </el-menu>

    <!-- 用户信息区域 -->
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="user-dropdown">
          <el-avatar :size="32" :src="userAvatar" />
          <span>{{ userName }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="settings">系统设置</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 菜单配置
const menus = [
  {
    path: '/homepages',
    title: '首页',
    icon: 'HomeFilled'
  },
  {
    path: '/platformManage/todoTasks',
    title: '待办任务',
    icon: 'Document'
  },
  {
    path: '/platformConfig/threeFactors',
    title: '三因素管理',
    icon: 'Setting'
  }
]

// 当前激活的菜单
const activeMenu = computed(() => {
  // 找到匹配的菜单项
  const currentMenu = menus.find(menu => route.path.startsWith(menu.path))
  return currentMenu?.path || route.path
})

// 用户信息
const userName = ref('Admin')
const userAvatar = ref('https://placeholder.com/32')

// 菜单选择处理
const handleSelect = (key: string) => {
  if (key !== route.path) {
    router.push(key)
  }
}

// 下拉菜单命令处理
const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      userStore.logout()
      router.push('/login')
      break
  }
}
</script>

<style lang="scss" scoped>
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .logo {
    display: flex;
    align-items: center;
    margin-right: 40px;

    img {
      height: 32px;
      margin-right: 8px;
    }

    span {
      font-size: 18px;
      font-weight: bold;
      color: #303133;
    }
  }

  .el-menu {
    flex: 1;
    border-bottom: none;

    :deep(.el-menu-item) {
      display: flex;
      align-items: center;

      .el-icon {
        margin-right: 4px;
      }
    }
  }

  .user-info {
    margin-left: 20px;

    .user-dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;

      .el-avatar {
        margin-right: 8px;
      }

      span {
        font-size: 14px;
        color: #606266;
      }
    }
  }
}
</style>