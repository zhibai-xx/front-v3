import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', // 配置相对地址或绝对地址，此处应为绝对地址，若将 Web 部署到 Nginx 所在的目录为 nginx-1.17.8/html/xxx ，则这个 base 的值就为 /xxx/
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
    //extensions数组的意思是在import组件的时候自动补全.vue等文件后缀
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    host: 'localhost', // 主机
    port: 8080, // 端口
    proxy: {
      // 项目 v1 的服务端接口地址
      '/apis': {
        target: 'http://localhost:8090/',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      // 项目 v2 的服务端接口地址
      '/abi531': {
        target: 'http://localhost:89/',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      // 项目 v3 的服务端接口地址
      '/apisaas': {
        target: 'http://saas.pdflux.com/',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      // // 默认服务端接口地址
      // '/': {

      //   target: 'http://127.0.0.1:8090/',
      //   changeOrigin: true,
      //   secure: false,
      //   ws: false
      // }
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        api: 'modern-compiler',
        additionalData: `@use "@/assets/style/mixin.scss" as *;`
      }
    }
  }
})
