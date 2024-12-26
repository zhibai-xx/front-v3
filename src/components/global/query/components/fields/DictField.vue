<template>
    <div class="dict-field">
        <div class="input-outlined">
            <el-select v-model="inputValue" :placeholder="placeholder" size="small" clearable>
                <el-option v-for="item in dictOptions" :key="item.code" :label="item.desc" :value="item.code" />
            </el-select>
        </div>
        <div v-if="field.ios" class="select-compare">
            <el-select v-model="field.compareType" size="small"
                :class="[field.compareType ? 'input-valid' : 'input-none']" @change="handleCompareChange"
                placeholder="请选择">
                <el-option v-for="item in compareOptions" :key="item.code" :label="item.desc" :value="item.code" />
            </el-select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQueryStore } from '../../stores/query'
import type { QueryField } from '../../types'

const props = defineProps<{
    field: QueryField,
    modelValue?: string | undefined,
    placeholder?: string,
    compareOptions: Array<{ code: string; desc: string }>
}>()

// 简单实现与父组件的数据的双向绑定和上传
const emit = defineEmits<{
    'update:model-value': [value: string]
    'compare-change': [type: string]
}>()

const queryStore = useQueryStore()
const dictOptions = computed(() => {
    if (!props.field.dictClasses) return []
    return queryStore.dictCache[props.field.dictClasses] || []
})

const inputValue = computed({
    get: () => props.modelValue || '',
    set: (value) => emit('update:model-value', value)
})

const handleBlur = () => {
    // 可以添加额外的验证逻辑
}

const handleCompareChange = (value: string) => {
    emit('compare-change', value)
}
</script>

<style lang="scss" scoped>
.dict-field {
    display: flex;
    align-items: center;
    gap: 8px;

    .select-compare {
        width: 100px;
    }
}
</style>