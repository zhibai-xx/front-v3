export interface TableResponse<T = any> {
    data: {
        list: T[];
        total: number;
        fieldNames: string[];
    }
}

export interface StatisticalResponse {
    data: {
        allCount: number;
        completedCount: number;
        waitCount: number;
        notCount: number;
        postponeCount: number;
    }
}

export interface OrgUsersResponse {
    data: Array<{
        userId: string;
        cnName: string;
        // ... 其他字段
    }>;
}