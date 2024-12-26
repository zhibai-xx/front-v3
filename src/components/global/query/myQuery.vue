<template>
  <div class="my-query">
    <el-collapse accordion>
      <el-collapse-item>
        <template #title>
          <div class="title-container">
            <div class="button-group">
              <slot name="btn" />
              <!-- <el-button
                v-if="!hideHistory"
                size="small"
                type="primary"
                @click.stop="handleHistory"
              >
                修改记录
              </el-button> -->
            </div>
            <div class="query-container app-h-end" @click.stop>
              <QueryField v-for="(field, index) in firstRowFields" :key="field.fieldName" :field="field"
                :model-value="formData[field.fieldName]" :compare-options="compareOptions[field.fieldDataType] || []"
                @update:model-value="updateFieldValue(field.fieldName, $event)"
                @compare-change="updateCompareType(field, $event)" />
              <div class="action-buttons pl-3">
                <el-button icon="Search" type="primary" size="small" @click="handleSearch" />
                <el-button icon="Refresh" size="small" @click="handleReset" />
              </div>
            </div>
          </div>
        </template>
        <div class="expanded-fields">
          <QueryField v-for="field in expandedFields" :key="field.fieldName" :field="field"
            :model-value="formData[field.fieldName]" :compare-options="compareOptions[field.fieldDataType] || []"
            @update:model-value="updateFieldValue(field.fieldName, $event)"
            @compare-change="updateCompareType(field, $event)" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQueryStore } from './stores/query'
import QueryField from './components/QueryField.vue'
import type { QueryField as QueryFieldType } from './types'
import { useCompareOptions } from './composables/useCompareOptions'
import { useQueryForm } from './composables/useQueryForm'

const props = defineProps<{
  queryFields: QueryFieldType[]
  hideHistory?: boolean
}>()

const emit = defineEmits<{
  (e: 'query', conditions: any): void
}>()

const queryStore = useQueryStore()
const { compareOptions, initCompareOptions } = useCompareOptions()
const { formData, updateFieldValue, resetForm } = useQueryForm()

// 将查询字段分为第一行和展开部分
const firstRowFields = computed(() => props.queryFields.slice(0, 1))
const expandedFields = computed(() => props.queryFields.slice(1))

// 替换为初始化不同类型的比较选项
// compareOptions.value = {
//   NUMBER: [
//     { code: 'EQ', desc: '等于' },
//     { code: 'GT', desc: '大于' },
//     { code: 'LT', desc: '小于' }
//   ],
//   STRING: [
//     { code: 'EQ', desc: '等于' },
//     { code: 'GT', desc: '大于' },
//     { code: 'LT', desc: '小于' }
//   ],
//   DATE: [
//     { code: 'EQ', desc: '等于' },
//     { code: 'GT', desc: '大于' },
//     { code: 'LT', desc: '小于' }
//   ]
// }

// 监听字段变化，重新初始化
watch(() => props.queryFields, async () => {
  // 加载比较选项
  await initCompareOptions()
  
  // 收集所有需要加载的字典类型
  const dictClasses = props.queryFields
    .filter(field => field.fieldDataType === 'DICT' && field.dictClasses)
    .map(field => field.dictClasses as string)
  
  if (dictClasses.length > 0) {
    await queryStore.loadDictOptionsMultiple(dictClasses)
  }
}, { immediate: true })

// 处理搜索
const handleSearch = () => {
  const conditions = props.queryFields
    .filter(field => {
      const value = formData.value[field.fieldName]
      return value !== undefined && value !== '' && value !== null
    })
    .map(field => ({
      columnName: field.columnName,
      compareType: field.compareType,
      fieldName: field.fieldName,
      fieldDataType: field.fieldDataType,
      fieldValue: formData.value[field.fieldName]
    }))
  console.log('查询参数', conditions)
  emit('query', { queryConditions: conditions })
}

// 处理重置
const handleReset = () => {
  resetForm()
  handleSearch()
}

// 处理历史记录
const handleHistory = () => {
  // 实现历史记录逻辑
}

// 更新比较类型
const updateCompareType = (field: QueryFieldType, type: string) => {
  field.compareType = type
}
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 12px;
}

.expanded-fields {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>