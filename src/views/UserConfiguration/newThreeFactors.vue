<template>
  <el-dialog v-model="dialogVisible" :title="isNew ? '新增三因素' : '修改三因素'" width="920px" :close-on-click-modal="false"
    class="dialog">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" class="rules_no_error">
      <!-- 基本信息 -->
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="纳税主体名称" prop="taxpayerName">
            <el-select v-model="form.taxpayerName" placeholder="请选择" ref="selectTreeRef" class="app-w-220px" filterable
              size="small">
              <el-option v-for="item in taxAbleOptions" :key="item.orgId" :label="item.orgName" :value="item.orgId" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="纳税人识别号" prop="taxpayerIdNumber">
            <el-select v-model="form.taxpayerIdNumber" placeholder="选择纳税人识别号" class="app-w-220px" size="small" disabled>
              <el-option v-for="item in taxAbleOptions" :key="item.orgId" :label="item.orgName" :value="item.orgId" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="年度" prop="year">
            <el-date-picker v-model="form.year" type="year" format="YYYY" value-format="YYYY" placeholder="选择年" size="small" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 数据录入区域 -->
      <div class="app-flex app-v-center app-h-around mt-4">
        <!-- 原始数据 -->
        <div class="app-width-45p app-ba-1px-l2">
          <div class="col-blue app-flex app-bb-1px-l2 pl-1 pt-1 pb-1 app-font-black">
            原始数据
          </div>
          <div class="pa-3">
            <el-form-item label="营业收入：" prop="originalRevenue">
              <el-input v-model="form.originalRevenue" size="small" @input="handleOriginalRevenueInput"
                class="app-width-200px" />
            </el-form-item>
            <el-form-item label="工资总额：" prop="originalGrossPayroll">
              <el-input v-model="form.originalGrossPayroll" size="small" @input="handleOriginalPayrollInput"
                class="app-width-200px" />
            </el-form-item>
            <el-form-item label="资产总额：" prop="originalTotalAssets">
              <el-input v-model="form.originalTotalAssets" size="small" @input="handleOriginalAssetsInput"
                class="app-width-200px" />
            </el-form-item>
          </div>
        </div>

        <!-- 调整后数据 -->
        <div class="app-width-45p app-ba-1px-l2">
          <div class="col-blue app-flex app-bb-1px-l2 pl-1 pt-1 pb-1 app-font-black">
            调整后数据
          </div>
          <div class="pa-3">
            <el-form-item label="营业收入：" prop="adjustedRevenue">
              <el-input v-model="form.adjustedRevenue" size="small" class="app-width-200px" />
            </el-form-item>
            <el-form-item label="工资总额：" prop="adjustedGrossPayroll">
              <el-input v-model="form.adjustedGrossPayroll" size="small" class="app-width-200px" />
            </el-form-item>
            <el-form-item label="资产总额：" prop="adjustedTotalAssets">
              <el-input v-model="form.adjustedTotalAssets" size="small" class="app-width-200px" />
            </el-form-item>
          </div>
        </div>
      </div>

      <!-- 按钮区域 -->
      <div class="app-flex app-h-center mt-4">
        <el-button size="small" type="primary" @click="handleSubmit">保存</el-button>
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { taxService } from '@/apis/TaxManage/index'
import type { ThreeFactorsItem } from '@/types/threeFactor'
import type { OrgOptionItem } from '@/types/main'

// Props & Emits
const emit = defineEmits(['refresh'])

// 响应式状态
const dialogVisible = ref(false)
const isNew = ref(true)
const formRef = ref<FormInstance>()
const selectTreeRef = ref()
const treeRef = ref()
const taxAbleOptions = ref<OrgOptionItem[]>([])

// 表单数据
const form = reactive<ThreeFactorsItem>({} as ThreeFactorsItem)

// 表单校验规则
const rules = {
  year: [{ required: true, message: '请选择年度', trigger: 'change' }],
  originalRevenue: [{ required: true, message: '请输入原始营业收入', trigger: 'blur' }],
  originalGrossPayroll: [{ required: true, message: '请输入原始工资总额', trigger: 'blur' }],
  originalTotalAssets: [{ required: true, message: '请输入原始资产总额', trigger: 'blur' }],
  adjustedRevenue: [{ required: true, message: '请输入调整后营业收入', trigger: 'blur' }],
  adjustedGrossPayroll: [{ required: true, message: '请输入调整后工资总额', trigger: 'blur' }],
  adjustedTotalAssets: [{ required: true, message: '请输入调整后资产总额', trigger: 'blur' }]
}

// 方法
const openDialog = (isNewRecord: boolean, selectedData: ThreeFactorsItem[]) => {
  isNew.value = isNewRecord
  if (!isNewRecord && selectedData.length === 1) {
    Object.assign(form, selectedData[0])
  } else {
    resetForm()
  }
  dialogVisible.value = true
}

const handleOriginalRevenueInput = (value: string) => {
  if (isNew.value) {
    form.adjustedRevenue = value
  }
}

const handleOriginalPayrollInput = (value: string) => {
  if (isNew.value) {
    form.adjustedGrossPayroll = value
  }
}

const handleOriginalAssetsInput = (value: string) => {
  if (isNew.value) {
    form.adjustedTotalAssets = value
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    const service = isNew.value ? taxService.addThreeFactors : taxService.editThreeFactors
    await service(form)
    ElMessage.success(`${isNew.value ? '新增' : '修改'}成功`)
    dialogVisible.value = false
    emit('refresh')
  } catch (error) {
    ElMessage.error(`${isNew.value ? '新增' : '修改'}失败`)
  }
}

// 获取纳税主体列表
const fetchTaxableList = async () => {
  try {
    const res = await taxService.getTaxCategory({
      orgFamilyType: 'COR_INCOME_TAX',
      taxCategories: 'COR_INCOME_TAX'
    })
    taxAbleOptions.value = res.data || []
  } catch (error) {
    ElMessage.error('获取纳税主体列表失败')
  }
}

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    citThreeFactorsMgtId: '',
    taxpayerName: '',
    taxpayerIdNumber: '',
    year: '',
    originalGrossPayroll: '',
    originalRevenue: '',
    originalTotalAssets: '',
    adjustedGrossPayroll: '',
    adjustedRevenue: '',
    adjustedTotalAssets: '',
    creationTime: '',
    creatorName: '',
    lastUpdateTime: '',
    lastUpdatorName: ''
  })
}

// 暴露方法
defineExpose({
  openDialog
})

// 生命周期
onMounted(() => {
  fetchTaxableList()
})
</script>

<style lang="scss" scoped>
.app-w-220px {
  width: 220px !important;
}

.app-width-200px {
  width: 200px !important;
}

.app-width-45p {
  width: 45% !important;
}

.rules_no_error :deep(.el-form-item__error) {
  display: none;
}
</style>
