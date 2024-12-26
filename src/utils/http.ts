import axios, { AxiosInstance, AxiosResponse, AxiosHeaders } from 'axios';
import { ElLoading, ElNotification, ElMessageBox } from 'element-plus';
import qs from 'qs';

// 创建一个 Axios 实例
const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || '/apis',
    timeout: 90000,
});

// 定义全局 Loading 实例
let loadingInstance: ReturnType<typeof ElLoading.service> | null = null;

// 启动加载动画
const startLoading = () => {
    loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.2)',
    });
};

// 关闭加载动画
const endLoading = () => {
    loadingInstance?.close();
    loadingInstance = null;
};

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        startLoading();

        // 使用 AxiosHeaders 创建 headers
        const headers = new AxiosHeaders();
        headers.set('X-CSRF-TOKEN', sessionStorage.getItem('csrf') || '');
        headers.set('Token-Jwt', sessionStorage.getItem('tokenJwt') || '');

        // 将创建的 headers 赋值到 config.headers
        config.headers = headers;

        return config;
    },
    (error) => {
        endLoading();
        ElNotification.error({ title: '请求错误', message: '网络异常，请稍后重试' });
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse) => {
        endLoading();
        const { data } = response;

        if (data.responseType === 'SUCCESS_EMPTY') {
            ElNotification.success({ title: '成功', message: data.message || '操作成功' });
            return Promise.resolve(data);
        }
        // 重复确认
        if (data.responseType === 'CONFIRM') {
            return new Promise((resolve, reject) => {
                ElMessageBox.confirm(data.message || '请确认操作').then(() => {
                    resolve(data);
                }).catch(() => {
                    reject(new Error('用户取消操作'));
                });
            });
        }

        return data;
    },
    (error) => {
        endLoading();
        const { response } = error;
        if (response?.data?.responseType === 'FAIL') {
            ElNotification.error({ title: '失败', message: response.data.message || '请求失败' });
        } else {
            ElNotification.error({ title: '错误', message: '未知错误，请稍后重试' });
        }
        return Promise.reject(error);
    }
);

// export default http;

// 通用 POST 请求
export const post = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    return http.post(url, params).then((res) => res.data);
};
// 通用 GET 请求
export const get = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    return http.get(url, { params }).then((res) => res.data);
};
// 下载文件
export const downloadFile = async (url: string, params?: Record<string, any>): Promise<void> => {
    const response = await http.post(url, params, { responseType: 'blob' });
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'file_name';
    link.click();
    URL.revokeObjectURL(link.href);
};

// 下载接口
export const postdown = async (url: string, params?: Record<string, any>): Promise<void> => {
    return http.post(url, qs.stringify(Object.assign({}, params)), {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        responseType: 'blob'
    })
}

export const postList = async (url: string, params?: Record<string, any>): Promise<void> => {
    return http.post(url, params, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

// 上传文件（FormData 示例）
export const uploadFile = async (url: string, formData: FormData): Promise<any> => {
    return http.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};