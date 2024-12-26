import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import './styles/main.scss'
import App from './App.vue'
import axios from 'axios'
// import { platFormService } from './apis/UserManage/index'
import router from './router'

import './mocks'; // 引入 Mock 数据

import GlobalComponents from '@/components/global'  // 导入全局组件插件

// createApp(App).mount('#app')
const app = createApp(App)

const pinia = createPinia();
app.use(pinia);
app.use(GlobalComponents);  // 使用全局组件插件

app.config.globalProperties.$axios = axios

// 引入 ElementPlus 插件(npm i element-plus)
import ElementPlusPlugin from './plugins/element-plus'

// 全局注册 ElementPlus 图标组件(npm install @element-plus/icons-vue)
import * as ElementPlusIcons from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component)
}

app
  .use(ElementPlusPlugin)
  .use(router)
  .mount('#app')

