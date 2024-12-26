import { post } from '@/utils/http';
import * as Models from './model';  // 导入所有类型

export class PlatFormService {

    /**
     * 任务转办-获取数据、获取流程待办数据、获取统计数据、代办、获取代办人员
     */
    getTodoTasks = (params: Record<string, any>): Promise<Models.TableResponse> =>
        post('/base/baseWorkTaskNotification/findPage', params)
    getTodoFlowTasks = (params: Record<string, any>): Promise<Models.TableResponse> =>
        post('/workflow/toDoList', params)
    getStatisticalData = (params?: Record<string, any>): Promise<Models.StatisticalResponse> =>
        post('/base/baseWorkTaskNotification/findStatisticalData', params)
    assignTasks = (params: Record<string, any>): Promise<{ data: any }> =>
        post('/base/baseWorkTaskNotification/transferProcess', params)
    getOrgUsers = (params: Record<string, any>): Promise<Models.OrgUsersResponse> =>
        post('/base/baseWorkTaskNotification/findOrgUsers', params)


    // /**
    //  * 纳税主体-税费认定管理
    //  * @param {*} params 
    //  * @returns 
    //  */
    // getBaseTaxationDetermination = (params) =>
    //     post('/base/baseTaxationDetermination/findList', params)
    // addBaseTaxationDetermination = (params) =>
    //     postList('/base/baseTaxationDetermination/add', params)
    // editBaseTaxationDetermination = (params) =>
    //     post('/base/baseTaxationDetermination/set', params)
    // removeBaseTaxationDetermination = (params) =>
    //     post('/base/baseTaxationDetermination/remove', params)
    // /**
    //  * 纳税主体 导出模板
    //  */
    // taxImportTemp = (params) =>
    //     postdown('/base/taxationSubject/downLoadBaseTaxationSubjectTemplate', params)

}
export const platFormService = new PlatFormService()
