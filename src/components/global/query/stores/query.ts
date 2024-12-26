import { defineStore } from 'pinia'
import { taxService } from '@/apis/TaxManage'

interface DictOption {
  code: string
  desc: string
}

interface QueryState {
  compareOptions: Record<string, DictOption[]>
  dictCache: Record<string, DictOption[]>
}

export const useQueryStore = defineStore('query', {
  state: (): QueryState => ({
    compareOptions: {},
    dictCache: {}
  }),

  actions: {
    async loadDictOptions(dictClass: string) {
      // 如果缓存中已存在，直接返回
      if (this.dictCache[dictClass]) {
        return this.dictCache[dictClass]
      }

      try {
        const res = await taxService.getDictsEnum({
          dictClasses: dictClass
        })
        
        // 保存到缓存
        if (res.data?.[dictClass]) {
          this.dictCache[dictClass] = res.data[dictClass]
          return res.data[dictClass]
        }
        return []
      } catch (error) {
        console.error('Failed to load dict options:', error)
        return []
      }
    },

    // 批量加载字典
    async loadDictOptionsMultiple(dictClasses: string[]) {
      const notCached = dictClasses.filter(dc => !this.dictCache[dc])
      
      if (notCached.length === 0) {
        return dictClasses.reduce((acc, dc) => {
          acc[dc] = this.dictCache[dc]
          return acc
        }, {} as Record<string, DictOption[]>)
      }

      try {
        const res = await taxService.getDictsEnum({
          dictClasses: notCached.join(',')
        })

        // 更新缓存
        Object.entries(res.data || {}).forEach(([key, value]) => {
          this.dictCache[key] = value as DictOption[]
        })

        return dictClasses.reduce((acc, dc) => {
          acc[dc] = this.dictCache[dc] || []
          return acc
        }, {} as Record<string, DictOption[]>)
      } catch (error) {
        console.error('Failed to load dict options:', error)
        return {}
      }
    },

    async loadCompareOptions() {
      this.compareOptions = {
        NUMBER: [
          { code: 'EQ', desc: '等于' },
          { code: 'GT', desc: '大于' },
          { code: 'LT', desc: '小于' }
        ],
        STRING: [
          { code: 'EQ', desc: '等于' },
          { code: 'LIKE', desc: '包含' }
        ],
        DATE: [
          { code: 'EQ', desc: '等于' },
          { code: 'GT', desc: '大于' },
          { code: 'LT', desc: '小于' }
        ]
      }
    }
  }
})