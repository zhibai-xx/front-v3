// 三因素数据项
export interface ThreeFactorsItem {
    taxpayerName: string;
    year: string;
    taxpayerIdNumber: string;
    citThreeFactorsMgtId: string;
    originalGrossPayroll: string;
    originalRevenue: string;
    originalTotalAssets: string;
    adjustedGrossPayroll: string;
    adjustedRevenue: string;
    adjustedTotalAssets: string;
    creationTime: string;
    creatorName: string;
    lastUpdateTime: string;
    lastUpdatorName: string;
}

// 通用表头定义
export interface FieldName {
    fieldDesc: string; // 字段描述
    fieldName: string; // 字段名称
    fieldDataType: 'STRING' | 'DATE' | 'NUMBER' | 'BOOLEAN'; // 限定的数据类型
    compareType: 'LEFT_LIKE' | 'RIGHT_LIKE' | 'EQUAL' | 'NOT_EQUAL'; // 限定的比较类型
}

export interface OrgOptionItem {
    orgId: string;
    orgCodeName?: string;
    orgCode: string;
    orgName: string;
}

export interface DictOptionItem {
    code: string;
    desc: string;
}

// 查询表单
export interface QueryForm {
    [key: string]: any;
}

// 分页配置
export interface PaginationProps {
    currentPage: number;
    pageSize: number;
    total: number;
}

// 排序配置
export interface SortProps {
    orderByField: string | null;
    orderByType: string | null;
}