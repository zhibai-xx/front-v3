import { defineStore } from 'pinia';

// 定义状态类型
interface State {
  erji: Record<string, any>;
  sanji: Record<string, any>;
  tbas: any[];
  clicks: string;
  caidan: boolean;
  tabsBuio: boolean;
  fullPath: string | null;
  riskIndexId: string | null;
  allAmountVo: Record<string, any>;
  selectRow: Record<string, any>;
}

// 使用 Pinia 定义 Store
export const useMainStore = defineStore('main', {
  // 定义状态
  state: (): State => ({
    erji: {},               // 二级菜单数据
    sanji: {},              // 三级菜单数据
    tbas: [],               // Tab 列表数据
    clicks: '',             // 点击次数/标识
    caidan: false,          // 菜单开关
    tabsBuio: true,         // Tabs 布局控制
    fullPath: null,         // 当前路由全路径
    riskIndexId: null,      // 风险指标 ID
    allAmountVo: {},        // 全量金额信息
    selectRow: {},          // 选中的行数据
  }),

  // 定义同步修改状态的方法
  actions: {
    // 设置二级菜单数据
    setErji(val: Record<string, any>) {
      this.erji = val;
    },
    // 设置三级菜单数据
    setSanji(val: Record<string, any>) {
      this.sanji = val;
    },
    // 设置 Tab 数据
    setTbas(val: any[]) {
      this.tbas = val;
    },
    // 设置菜单开关
    setCaidan(val: boolean) {
      this.caidan = val;
    },
    // 设置 Tabs 布局控制
    setTabsBuio(val: boolean) {
      this.tabsBuio = val;
    },
    // 设置路由全路径
    setFullPath(val: string | null) {
      this.fullPath = val;
    },
    // 设置风险指标 ID
    setRiskIndexId(val: string | null) {
      this.riskIndexId = val;
    },
    // 设置全量金额信息
    setAllAmountVo(val: Record<string, any>) {
      this.allAmountVo = val;
    },
    // 设置选中的行数据
    setSelectRow(val: Record<string, any>) {
      this.selectRow = val;
    },
  },
});

// <script setup lang="ts">
// import { useMainStore } from '@/stores/counter';

// const mainStore = useMainStore();

// // 访问状态
// console.log(mainStore.erji);

// // 调用方法修改状态
// mainStore.setErji({ key: 'value' });
// </script>