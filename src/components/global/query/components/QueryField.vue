<template>
  <div class="query-field pl-1 pr-1">
    <component :is="fieldComponent" v-bind="fieldProps" :model-value="modelValue"
      @update:model-value="$emit('update:model-value', $event)" class="query-field-component" />

    <!-- <CompareSelect
      v-if="field.ios"
      :model-value="field.compareType"
      :options="compareOptions"
      @update:model-value="$emit('compare-change', $event)"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'
import DateField from './fields/DateField.vue'
import DictField from './fields/DictField.vue'
import BooleanField from './fields/StringField.vue'
// import CompareSelect from './CompareSelect.vue'
import type { QueryField } from '../types'

const props = defineProps<{
  field: QueryField
  modelValue: any
  compareOptions: any[]
}>()

const fieldComponent = computed(() => {
  const map = {
    STRING: StringField,
    NUMBER: NumberField,
    DATE: DateField,
    DICT: DictField,
    BOOLEAN: BooleanField
  }
  return map[props.field.fieldDataType] || StringField
})

const fieldProps = computed(() => ({
  field: props.field,
  placeholder: `请选择${props.field.fieldDesc}`,
  compareOptions: props.compareOptions
}))

</script>

<style lang="scss" scoped>
:deep(.query-field-component) {
  .el-input,
  .el-select,
  .el-date-editor {
    width: 200px !important;
  }
  
  .select-compare {
    width: 107px !important;
  }
}
</style>