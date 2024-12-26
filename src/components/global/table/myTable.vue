<template>
    <div class="my-table">
        <div class="tables" id="TABLE_CONTAINER">
            <el-table ref="tableRef" :data="props.data" :border="props.border" style="width: 100%"
                @sort-change="handleSortChange" @selection-change="handleSelectionChange" @row-click="handleRowClick"
                :span-method="props.spanMethod" :height="tableHeight" :show-summary="props.showSummary"
                :summary-method="props.summaryMethod" :row-class-name="props.rowClassName"
                :highlight-current-row="computedHighlightCurrentRow" :show-header="props.showHeader"
                :header-cell-style="{ background: '#F4F4F4', color: '#002257' }">
                <!-- 简单模式 -->
                <template v-if="props.simpleMode">
                    <!-- 选择列 -->
                    <el-table-column v-if="!computedHideIndexRow && !computedHideSelectRow" type="selection" width="36"
                        fixed />

                    <!-- 序号列 -->
                    <el-table-column v-if="!computedHideIndexRow" type="index" label="序号" fixed width="56">
                        <template #default="{ $index }">
                            <div>{{ (currentPage - 1) * pageSize + $index + 1 }}</div>
                        </template>
                    </el-table-column>

                    <!-- 动态列 -->
                    <template v-for="(item, index) in props.header" :key="item.fieldName || index">
                        <!-- 带子列的列 -->
                        <el-table-column v-if="item.children?.length && !item.primaryKey" :prop="item.fieldName"
                            :label="item.fieldDesc" show-overflow-tooltip :align="getColumnAlign(item.fieldDataType)">
                            <template v-for="child in item.children" :key="child.fieldName">
                                <el-table-column :label="child.fieldDesc" :prop="child.fieldName" show-overflow-tooltip
                                    :align="getColumnAlign(child.fieldDataType)"
                                    :min-width="getColumnWidth(child.fieldName, props.data, child.fieldDesc)">
                                    <template #default="scope">
                                        {{ scope.row[child.fieldName] }}
                                    </template>
                                </el-table-column>
                            </template>
                        </el-table-column>

                        <!-- 普通列 -->
                        <el-table-column v-else-if="!item.primaryKey" :prop="item.fieldName" :label="item.fieldDesc"
                            :sortable="item.columnName !== null" show-overflow-tooltip
                            :align="getColumnAlign(item.fieldDataType)"
                            :min-width="getColumnWidth(item.fieldName, props.data, item.fieldDesc)">
                            <template #default="scope">
                                {{ scope.row[item.fieldName] }}
                            </template>
                        </el-table-column>
                    </template>

                    <slot name="tablebtn" />
                </template>

                <!-- 自定义模式 -->
                <template v-else>
                    <slot name="tableall" />
                </template>
            </el-table>
        </div>

        <!-- 分页器 -->
        <div v-if="computedShowPagination" class="pagination-container">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[20, 50, 100, 200, 500]" :total="props.total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" :size="'small'"
                layout="total, sizes, prev, pager, next, jumper" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import { useTableStore } from '@/stores/table'

// 定义Props类型
interface Props {
    data: any[]
    header?: any[]
    height?: number
    total?: number
    currentPage?: number
    pageSize?: number
    simpleMode?: boolean
    showHeader?: boolean
    border?: boolean
    showSummary?: boolean
    hideIndex?: boolean
    hideSelect?: boolean
    showPagination?: boolean
    autoHeight?: boolean
    highlightCurrentRow?: boolean
    spanMethod?: (data: { row: any, column: TableColumnCtx<any>, rowIndex: number, columnIndex: number }) => number[] | { rowspan: number, colspan: number }
    summaryMethod?: (param: { columns: TableColumnCtx<any>[], data: any[] }) => string[]
    rowClassName?: (param: { row: any, rowIndex: number }) => string
    paginationObj?: {
        pageSize: number
        total: number
        pageNumber: number
    }
}

// 定义默认值
const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    header: () => [],
    height: 0,
    total: 0,
    currentPage: 1,
    pageSize: 20,
    simpleMode: true,
    showHeader: true,
    border: true,
    showSummary: false,
    hideIndex: false,
    hideSelect: false,
    showPagination: false,
    autoHeight: false,
    highlightCurrentRow: false
})

// 定义Emits
const emit = defineEmits<{
    'sort-change': [order: string, prop: string]
    'selection-change': [selection: any[]]
    'current-change': [currentRow: any]
    'size-change': [pageSize: any],
    'row-click': [row: any]
    'paging-change': [val: number, key: string]
}>()

// Store
const tableStore = useTableStore()

// Refs
const tableRef = ref()
const tableHeight = ref<number | null>(null)
const currentPage = ref(props.currentPage)
const pageSize = ref(props.pageSize)

// Computed
const computedShowPagination = computed(() => props.showPagination === true)
const computedHideIndexRow = computed(() => props.hideIndex === true)
const computedHideSelectRow = computed(() => props.hideSelect === true)
const computedHighlightCurrentRow = computed(() => props.highlightCurrentRow === true)

// Methods
const getColumnAlign = (fieldDataType: string): 'left' | 'right' | 'center' => {
    if (fieldDataType === 'NUMBER') return 'right'
    if (fieldDataType === 'DATE' || fieldDataType === 'BOOLEAN') return 'center'
    return 'left'
}

const getColumnWidth = (fieldName: string, data: any[], fieldDesc: string): string => {
    // 这里可以实现动态列宽计算逻辑
    return '150px'
}

const handleSortChange = ({ prop, order }: { prop: string, order: string }) => {
    const sortOrder = order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : ''
    emit('sort-change', sortOrder, prop)
}

const handleSelectionChange = (selection: any[]) => {
    // 选中行
    emit('selection-change', selection)
    // 用于同步选中行数据给其他组件，例如查看操作历史
    const primaryKeyField = props.header?.find(h => h.primaryKey)?.fieldName
    if (primaryKeyField) {
        tableStore.setSelectRow({
            fieldName: primaryKeyField,
            data: selection.length === 1 ? selection : [],
            length: selection.length
        })
    }
}

const handleCurrentChange = (currentRow: any) => {
    emit('paging-change', currentRow, 'page')
}

const handleSizeChange = (pageSize: any) => {
    emit('paging-change', pageSize, 'size')
}

const handleRowClick = (row: any) => {
    emit('row-click', row)
}

// const handleSizeChange = (val: number) => {
//     emit('paging-change', val, 'ts')
// }

const updateTableHeight = async () => {
    if (props.autoHeight) {
        await nextTick()
        const table = document.querySelector('#TABLE_CONTAINER')
        if (table) {
            const tableRect = table.getBoundingClientRect()
            const windowHeight = window.innerHeight
            tableHeight.value = windowHeight - tableRect.bottom - 35
        }
    } else {
        tableHeight.value = props.height
    }
}

// Watchers
// watch(() => props.data, () => {
//     nextTick(() => {
//         console.log(props.data, 'mytable-1')
//         tableRef.value?.doLayout()
//     })
// }, { deep: true })

watch(() => props.paginationObj, (newVal) => {
    if (newVal) {
        currentPage.value = newVal.pageNumber
        pageSize.value = newVal.pageSize
    }
}, { deep: true })

// Lifecycle
onMounted(() => {
    updateTableHeight()
    window.addEventListener('resize', updateTableHeight)
})

// Expose methods
defineExpose({
    doLayout: () => tableRef.value?.doLayout()
})
</script>

<style lang="scss" scoped>
.my-table {
    .pagination-container {
        display: flex;
        justify-content: flex-end;
        padding: 12px 16px;
        margin-top: 12px;
    }

    :deep(.hover-row) {
        td.el-table__cell {
            background-color: #fafafa;
        }
    }
}
</style>