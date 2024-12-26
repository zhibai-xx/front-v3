export interface QueryField {
  fieldName: string
  fieldDesc: string
  fieldDataType: 'STRING' | 'NUMBER' | 'DATE' | 'DICT' | 'BOOLEAN'
  columnName: string
  compareType?: string
  ios?: boolean
  dictClasses?: string
  parentclass?: boolean
  subclasses?: boolean
  arr?: DictOption[]
  aubArr?: DictOption[]
}

export interface DictOption {
  code: string | number
  desc: string
  parentCode?: string | null
}

export interface CompareOption {
  code: string
  desc: string
} 