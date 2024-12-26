export interface TableResponse<T = any> {
    data: {
        list: T[];
        total: number;
        fieldNames: T[];
    }
}
