<template>
  <div class="three-factors">
    <!-- 查询区域 -->
    <div class="head">
      <MyQuery :query-fields="queryList" @queryBtn="handleQuery">
        <template #btn>
          <div>
            <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
            <el-button type="primary" size="small" @click="handleEdit">修改</el-button>
            <!-- <el-dele-btn :deleList="selectedRows" @deleidBtns="handleDelete" /> -->
            <!-- <export-button :id="'citThreeFactorsMgtId'" :tableData="tableData" :list="selectedRows"
              :url="'/mainTaxes/cit/citThreeFactorsMgt/exportExcel'"
              :temUrl="'/mainTaxes/cit/citThreeFactorsMgt/exportExcel'" :fileName="'三因素管理'" /> -->
            <!-- <el-upload class="ml-2" :action="uploadAction" :multiple="false" :show-file-list="false"
              :on-error="handleUploadError" :on-success="handleUploadSuccess" accept=".xls, .xlsx">
              <el-button size="small" type="primary">导入</el-button>
            </el-upload> -->
          </div>
        </template>
      </MyQuery>
    </div>

    <!-- 表格区域 -->
    <div>
      <MyTable :data="tableData" :header="tableHeader" @selection-change="handleSelectionChange"
        :height="500" @sort-change="handleSortChange" show-pagination @paging-change="handlePagingChange"
        v-model:current-page="pagination.currentPage" :total="pagination.total" v-model:page-size="pagination.pageSize">
      </MyTable>
    </div>

    <!-- 新增/编辑弹窗 -->
    <NewThreeFactors ref="dialogRef" @refresh="fetchTableData" />
  </div>
</template>
<!-- 
<script lang="ts">
export default {
  name: 'ThreeFactors'
}
</script> -->

<script setup lang="ts">
import { ref, onMounted, reactive, defineOptions } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { taxService } from '@/apis/TaxManage/index'
import type { ThreeFactorsItem } from '@/types/threeFactor'
import type { QueryForm, PaginationProps, SortProps, FieldName } from '@/types/main'
import NewThreeFactors from './newThreeFactors.vue'

defineOptions({
  name: 'ThreeFactors'
})

// 响应式状态
const loading = ref(false)
const tableData = ref<ThreeFactorsItem[]>([])
const tableHeader = ref<FieldName[]>([])
const selectedRows = ref<ThreeFactorsItem[]>([])
const queryList = ref([])
const dialogRef = ref()

// 分页配置
const pagination = reactive<PaginationProps>({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

// 排序配置
const sort = reactive<SortProps>({
  orderByField: null,
  orderByType: null
})

// 查询条件
const queryForm = reactive<QueryForm>({})

// 上传配置
const uploadAction = '/mainTaxes/cit/citThreeFactorsMgt/importExcel'

// 表格列配置
// const columns = [
//   { prop: 'taxpayerName', label: '纳税主体名称', width: '220' },
//   { prop: 'taxpayerIdNumber', label: '纳税人识别号', width: '170' },
//   { prop: 'year', label: '年度', width: '150' },
// ]

// 获取表格数据
const fetchTableData = async () => {
  try {
    loading.value = true
    const params = {
      pageSize: pagination.pageSize,
      pageNumber: pagination.currentPage,
      orderByField: sort.orderByField,
      orderByType: sort.orderByType,
      ...queryForm
    }
    const res = await taxService.getThreeFactors(params)
    console.log(res.data)
    tableData.value = res.data?.list || []
    tableHeader.value = res.data?.fieldNames || []
    pagination.total = Number(res.data?.total) || 0
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const dictOptionsOne = ref([])
const dictOptionsTwo = ref([])

const getDictsEnum = () => {
  const dictParams = [
    "MT_ABNORMAL_REASON",
    "DEFINING_AUTHORITY",
  ];
  taxService
    .getDictsEnum({
      dictClasses: dictParams.join(",")
    })
    .then(res => {
      dictOptionsOne.value = res.data["MT_ABNORMAL_REASON"];
      dictOptionsTwo.value = res.data["DEFINING_AUTHORITY"];
    });
};

// 获取查询条件
const fetchQueryConditions = async () => {
  try {
    const res = await taxService.findQueryConditionFields({
      uri: '/mainTaxes/cit/citThreeFactorsMgt/findPage'
    })
    console.log('三因素页面-查询参数', res.data)
    queryList.value = res.data
  } catch (error) {
    ElMessage.error('获取查询条件失败')
  }
}

// 事件处理
const handleQuery = (query: QueryForm) => {
  queryForm.value = query
  pagination.currentPage = 1
  fetchTableData()
}

const handleAdd = () => {
  dialogRef.value?.openDialog(true, [])
}

const handleEdit = () => {
  if (selectedRows.value.length !== 1) {
    ElMessage.warning('请选择一条记录进行修改')
    return
  }
  dialogRef.value?.openDialog(false, selectedRows.value)
}

const handleDelete = async (confirm: string) => {
  try {
    const primaryKeys = selectedRows.value.map((row: Record<any, string>) => row.citThreeFactorsMgtId).join(',')
    await taxService.removeThreeFactors({ primaryKeys, confirm })
    ElMessage.success('删除成功')
    fetchTableData()
  } catch (error: any) {
    if (confirm !== 'OK' && error?.data?.errorMessage) {
      ElMessageBox.confirm(error.data.errorMessage, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => handleDelete('OK'))
    }
  }
}

const handleSelectionChange = (selection: ThreeFactorsItem[]) => {
  selectedRows.value = selection
}

const handleSortChange = ({ prop, order }: { prop: string, order: string }) => {
  sort.orderByField = prop
  sort.orderByType = order
  fetchTableData()
}

const handlePagingChange = (page: number, type: 'page' | 'size') => {
  if (type === 'size') {
    pagination.currentPage = 1
    pagination.pageSize = page
  } else {
    pagination.currentPage = page
  }
  fetchTableData()
}


const handleUploadSuccess = () => {
  ElMessage.success('上传成功')
  fetchTableData()
}

const handleUploadError = (err: any) => {
  const errObj = JSON.parse(err.toString().replace('Error: ', ''))
  ElMessage.error(errObj.errorMessage || errObj.errorMap || '上传失败')
}

// 生命周期
onMounted(() => {
  console.log('sanyinsukaishi')
  fetchQueryConditions()
  fetchTableData()
})
</script>

<style lang="scss" scoped>
.three-factors {
  padding: 12px;
  background: #fff;
  // box-shadow: 0 0 4px 1px rgb(0 0 0 / 5%);
  // border-radius: 3px;
}
</style>
