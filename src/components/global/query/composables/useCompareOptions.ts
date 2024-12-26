import { ref } from 'vue'
import { useQueryStore } from '../stores/query'
import type { CompareOption } from '../types'

export function useCompareOptions() {
  const store = useQueryStore()
  const compareOptions = ref<Record<string, CompareOption[]>>({})

  const initCompareOptions = async () => {
    await store.loadCompareOptions()
    compareOptions.value = store.compareOptions
  }

  return {
    compareOptions,
    initCompareOptions
  }
} 