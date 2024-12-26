<template>
  <div class="todoTasks">
    <div class="ml-3 mb-6 mt-2 app-h-start">
      <span class="app-font-18 app-font-black">工作任务</span>
    </div>
    <div class="mb-3 pl-3">
      <el-radio-group v-model="taskPosition" size="small" class="app-h-start">
        <el-radio :value="true">任务待办</el-radio>
        <el-radio :value="false">审核待办</el-radio>
      </el-radio-group>
    </div>
    <div class="app-v-center mb-6 pl-100px" v-if="taskPosition">
      <div class="top-task app-pointer" @click="clickDiv('')">
        <span class="d-block app-font-28 mb-3">{{
          state.statisticalData.allCount
        }}</span>
        <span class="d-block app-font-20">全部任务</span>
      </div>
      <div class="top-task app-pointer" @click="clickDiv('COMPLETED')">
        <span class="d-block app-font-28 mb-3">{{
          state.statisticalData.completedCount
        }}</span>
        <span class="d-block app-font-20">已办任务</span>
      </div>
      <div class="top-task app-pointer" @click="clickDiv('WAIT_PROCESS')">
        <span class="d-block app-font-28 mb-3">{{
          state.statisticalData.waitCount
        }}</span>
        <span class="d-block app-font-20">待办任务</span>
      </div>
      <div class="top-task app-pointer" @click="clickDiv('NOT_PROCESS')">
        <span class="d-block app-font-28 mb-3">{{
          state.statisticalData.notCount
        }}</span>
        <span class="d-block app-font-20">不予处理</span>
      </div>
      <div class="top-task app-pointer" @click="clickDiv('POSTPONE')">
        <span class="d-block app-font-28 mb-3">{{
          state.statisticalData.postponeCount
        }}</span>
        <span class="d-block app-font-20">延期处理</span>
      </div>
    </div>
    <div v-if="taskPosition">
      <div class="app-v-center pl-3 app-wrap">
        <div class="mr-3">
          <span>任务类型：</span>
          <el-input clearable size="small" class="app-w-200px" v-model="state.searchForm.taskType"></el-input>
        </div>
        <div class="mr-3">
          <span>任务状态：</span>
          <el-select clearable v-model="state.searchForm.taskState" placeholder="请选择" size="small" class="app-w-200px">
            <el-option v-for="item in state.typeOption" :key="item.code" :label="item.desc" :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="mr-3">
          <span>任务发布人：</span>
          <el-input size="small" clearable class="app-w-200px" v-model="state.searchForm.taskIssuer"></el-input>
        </div>
        <div class="mr-3">
          <span>发布时间：</span>
          <el-date-picker class="app-w-200px" size="small" v-model="state.searchForm.taskReleaseTime" type="date"
            placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div>
          <el-button :icon="Search" type="primary" size="small" @click="getTableData"></el-button>
          <el-button :icon="Delete" size="small" @click="clear"></el-button>
        </div>
      </div>
      <div class="pl-3 pr-3 pt-3">
        <MyTable :data="state.tableData" :header="state.tableHeader" v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize" @paging-change="handlePagingChange" :total="totalRecords"
          :height="500" :showPagination="true">
          <template #tablebtn>
            <el-table-column fixed="right" label="操作" width="90" align="center">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.row)">处理</el-button>
              </template>
            </el-table-column>
          </template>
        </MyTable>
      </div>
    </div>
    <div v-else>
      <div class="pl-3 pr-3 pt-3">
        <MyTable :data="state.tableDataSc" :header="state.tableHeaderSc" v-model:current-page="paginationSc.currentPage"
          v-model:page-size="paginationSc.pageSize" @paging-change="handlePagingChangeSc" :total="totalRecordsSc"
          :height="500" :showPagination="true">
          <!-- <template #tableall>
            <el-table-column fixed="left" type="index" width="46" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip v-for="(item, index) in tableHeaderSc" :key="index"
              :prop="item.fieldName" :label="item.fieldDesc" align="left">
              <template slot-scope="scope">
                <span v-if="item.fieldName == 'startUserId'">{{
                  scope.row[item.fieldName]
                    ? scope.row[item.fieldName].split("|")[1] +
                    "," +
                    scope.row[item.fieldName].split("|")[3]
                    : ""
                }}</span>
                <span v-else>{{ scope.row[item.fieldName] }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClickSc(scope.row)">处理</el-button>
              </template>
            </el-table-column>
          </template> -->
        </MyTable>
      </div>
    </div>
    <el-dialog :draggable="true" :modal="true" :close-on-click-modal="false" class="dialog" title="转办"
      v-model="transferVisible" width="630px">
      <div class="pb-2 app-hv-center">
        <span class="app-w-72px app-block text-right mr-2">转办至：</span>
        <el-select v-model="state.transferForm.transferUserId" placeholder="请选择" class="app-w-300px">
          <el-option v-for="item in state.orgUserList" :key="item.code" :label="item.desc" :value="item.code">
          </el-option>
        </el-select>
      </div>
      <div class="pb-4 app-v-start app-h-center">
        <span class="app-w-72px text-right mr-2">转办说明：</span>
        <el-input type="textarea" class="app-w-300px" :rows="4" placeholder="请输入内容" v-model="state.transferForm.note">
        </el-input>
      </div>
      <div class="app-hv-center mt-3">
        <el-button type="primary" size="small" @click="assignTasks()">确定</el-button>
        <el-button size="small" @click="transferVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  computed,
  defineOptions
} from "vue";
import { platFormService } from "@/apis/UserManage/index";
import {
  Delete,
  Search,
} from '@element-plus/icons-vue'

defineOptions({
  name: 'TodoTasks'
})
// 定义接口响应数据类型
interface TableResponse<T> {
  data: {
    list: T[];
    total: number;
    fieldNames: string[];
  }
}

// 分组状态：通用状态
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0,
});

const paginationSc = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0,
});

interface StatisticalData {
  allCount: number;
  completedCount: number;
  waitCount: number;
  notCount: number;
  postponeCount: number;
}

interface TransferForm {
  transferUserId: string;
  note: string;
}

const state = reactive({
  tableData: [] as Record<string, any>[],
  tableHeader: [] as string[],
  tableDataSc: [] as Record<string, any>[],
  tableHeaderSc: [] as string[],
  searchForm: {} as Record<string, any>,
  typeOption: [] as Record<string, any>[],
  statisticalData: {} as StatisticalData,
  transferForm: {} as TransferForm,
  orgUserList: [] as Record<string, any>[],
  workTaskId: null as string | null,
});

const transferVisible = ref(false);
const taskPosition = ref(true);

// 通用获取表格数据函数
const fetchTableData = async <T>(
  apiFunction: (params: Record<string, any>) => Promise<TableResponse<T>>,
  paginationState: typeof pagination,
  tableState: { tableData: T[]; tableHeader: string[] }
) => {
  const params = {
    pageNumber: paginationState.currentPage,
    pageSize: paginationState.pageSize,
    ...state.searchForm,
  };
  try {
    const res = await apiFunction(params);
    tableState.tableData.splice(0, tableState.tableData.length, ...res.data.list);
    tableState.tableHeader.splice(0, tableState.tableHeader.length, ...res.data.fieldNames);
    // 直接替换，不会监听到变化
    // tableState.tableData = res.data.list;
    // tableState.tableHeader = res.data.fieldNames;
    paginationState.total = res.data.total;
  } catch (error) {
    console.error('Failed to fetch table data:', error);
  }
};

// 获取第一个表格数据
const getTableData = () =>
  fetchTableData(
    platFormService.getTodoTasks,
    pagination,
    { tableData: state.tableData, tableHeader: state.tableHeader }
  );

// 获取第二个表格数据
const getTableDataSc = () =>
  fetchTableData(
    platFormService.getTodoFlowTasks,
    paginationSc,
    { tableData: state.tableDataSc, tableHeader: state.tableHeaderSc }
  );

const totalRecords = computed(() => pagination.total);
const totalRecordsSc = computed(() => paginationSc.total);

const getStatisticalData = () => {
  platFormService.getStatisticalData().then((res) => {
    state.statisticalData = res.data;
  });
};
const handleClick = (row: Record<string, any>): void => {
  transferVisible.value = true
};
const assignTasks = () => {
  const params = {
    // primary: state.workTaskId,
    ...state.transferForm
  };
  platFormService.assignTasks(params).then((res) => {
    transferVisible.value = false;
    getTableData();
  });
};

const clickDiv = (type: string) => {
  state.searchForm.taskState = type;
  getTableData();
};

const handlePagingChange = (page: number, type: 'page' | 'size') => {
  if (type === 'size') {
    pagination.currentPage = 1
    pagination.pageSize = page
  } else {
    pagination.currentPage = page
  }
  getTableData()
}
const handlePagingChangeSc = (page: number, type: 'page' | 'size') => {
  if (type === 'size') {
    paginationSc.currentPage = 1
    paginationSc.pageSize = page
  } else {
    paginationSc.currentPage = page
  }
  getTableDataSc()
}
// const handleSizeChange = (val: number) => {
//   pagination.pageSize = val;
//   getTableData();
// };
// const handleSizeChangeSc = (val: number) => {
//   paginationSc.pageSize = val;
//   getTableDataSc();
// };
// const handleCurrentChange = (val: number) => {
//   pagination.currentPage = val;
//   getTableData();
// };
// const handleCurrentChangeSc = (val: number) => {
//   paginationSc.currentPage = val;
//   getTableDataSc();
// };
const getDictEnum = () => {
  platFormService.getOrgUsers({}).then((res) => {
    state.orgUserList = res.data;
  });
};
const clear = () => {
  state.searchForm = {};
  getTableData();
};
onMounted(() => {
  // Bus.$on("switchRoutes", () => {
  //   if (useRouter.history.current.path == "/todoTasks") {
  //     if (useRouter.history.current.query.type == "approve") {
  //       state.taskPosition = false;
  //     } else {
  //       state.taskPosition = true;
  //     }
  //     getTableData();
  //     getTableDataSc();
  //   }
  // });
  // if (useRouter.history.current.query?.type == "approve") {
  //   state.taskPosition = false;
  // } else {
  //   state.taskPosition = true;
  // }
  getTableData();
  getTableDataSc();
  getDictEnum();
  getStatisticalData();
});
// return {
//   ...toRefs(state),
//   clickDiv,
//   openTransferDialog,
//   DTProcessRef,
//   getTableData,
//   notHandled,
//   delayClick,
//   handleClick,
//   handleClickSc,
//   closeDialog,
//   handleSizeChange,
//   handleSizeChangeSc,
//   handleCurrentChange,
//   handleCurrentChangeSc,
//   assignTasks,
//   clear
// };  
</script>
<style lang="scss" scoped>
.todoTasks {
  background-color: #fff;
  padding: 12px;
}

.top-task {
  width: 130px !important;
  height: 145px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdfe6;
  margin-right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.app-w-72px {
  min-width: 72px !important;
  width: 72px !important;
}

.pl-100px {
  padding-left: 100px;
}
</style>
