import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: null
  }),

  actions: {
    logout() {
      this.userInfo = null
      this.token = null
      // 清除其他相关状态
    }
  }
}) 