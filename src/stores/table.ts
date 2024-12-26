import { defineStore } from 'pinia'

interface SelectRow {
  fieldName: string
  data: any[]
  length: number
}

interface TableState {
  selectRow: SelectRow | null
}

export const useTableStore = defineStore('table', {
  state: (): TableState => ({
    selectRow: null
  }),
  
  actions: {
    setSelectRow(row: SelectRow) {
      this.selectRow = row
    }
  }
}) 