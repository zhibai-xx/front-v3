<template>
  <div class="number-field">
    <div class="input-outlined">
      <el-input
        v-model="inputValue"
        clearable
        type="text"
        :placeholder="placeholder"
        size="small"
        @input="handleInput"
        @blur="handleBlur"
      />
      <!-- <label v-if="inputValue">{{ field.fieldDesc }}</label> -->
    </div>
    
    <div v-if="field.ios" class="select-compare">
      <el-select
        v-model="field.compareType"
        size="small"
        :class="[field.compareType ? 'input-valid' : 'input-none']"
        @change="handleCompareChange"
        placeholder="请选择"
      >
        <el-option
          v-for="item in compareOptions"
          :key="item.code"
          :label="item.desc"
          :value="item.code"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { QueryField } from '../../types'

const props = defineProps<{
  field: QueryField
  modelValue?: string | undefined
  placeholder?: string
  compareOptions: Array<{ code: string; desc: string }>
}>()

// defineEmits 可以为事件的参数提供类型约束，防止开发者传递错误的参数，增强可读性和可维护性。
const emit = defineEmits<{
  'update:model-value': [value: string]
  'compare-change': [type: string]
}>()

const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:model-value', value)
})

const handleInput = (value: string) => {
  // 只允许输入数字和小数点
  let newValue = value.replace(/[^\d.]/g, '')
  // 保证只有一个小数点
  newValue = newValue.replace(/\.{2,}/g, '.')
  newValue = newValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  // 保证小数点不在第一位
  newValue = newValue.replace(/^\./, '')
  
  emit('update:model-value', newValue)
}

const handleBlur = () => {
  // 可以添加额外的验证逻辑
}

const handleCompareChange = (value: string) => {
  emit('compare-change', value)
}
</script>

<style lang="scss" scoped>
.number-field {
  display: flex;
  align-items: center;
  gap: 8px;
  .select-compare {
    width: 100px;
  }
}
</style> 