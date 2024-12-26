import { ref } from 'vue'

export function useQueryForm() {
  const formData = ref<Record<string, any>>({})

  const updateFieldValue = (fieldName: string, value: any) => {
    formData.value[fieldName] = value
  }

  const resetForm = () => {
    formData.value = {}
  }

  return {
    formData,
    updateFieldValue,
    resetForm
  }
} 