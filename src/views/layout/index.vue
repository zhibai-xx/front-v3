<template>
  <div class="layout-container">
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header height="60px">
        <nav-header />
      </el-header>

      <!-- 主要内容区 -->
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive :include="['TodoTasks', 'ThreeFactors']">
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavHeader from './components/NavHeader.vue'
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  :deep(.el-container) {
    height: 100%;
  }

  :deep(.el-header) {
    padding: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    background-color: #fff;
    position: relative;
    z-index: 100;
  }

  :deep(.el-main) {
    padding: 20px;
    background-color: #f5f7fa;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>