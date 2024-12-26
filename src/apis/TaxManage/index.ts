import { post } from '@/utils/http';
import * as Models from './model';  // 导入所有类型

export class TaxManageService {

    /**
     * 查询参数
     * @param params 
     * @returns 
     */
    findQueryConditionFields = (params: Record<any, string>): Promise<{ data: any }> =>
        post('/view/argumentField/findQueryConditionFields', params)
    getDictsEnum = (params: Record<any, string>): Promise<{ data: any }> =>
        post('/dict', params)

    /**
     * 三因素管理-新增、修改、删除、编辑
     */
    getThreeFactors = (params: Record<any, any>): Promise<Models.TableResponse> =>
        post('/mainTaxes/cit/citThreeFactorsMgt/findPage', params)
    removeThreeFactors = (params: Record<any, string>): Promise<{ data: any }> =>
        post('/mainTaxes/cit/citThreeFactorsMgt/removeBatch', params)
    addThreeFactors = (params: Record<any, string>): Promise<{ data: any }> =>
        post('/mainTaxes/cit/citThreeFactorsMgt/add', params)
    editThreeFactors = (params: Record<any, string>): Promise<{ data: any }> =>
        post('/mainTaxes/cit/citThreeFactorsMgt/set', params)
    getTaxSubList = (params: Record<any, string>): Promise<{ data: any }> =>
        post('/base/taxationSubject/findTaxpayerList', params)
    getTaxCategory = (params: Record<any, string>): Promise<{ data: any }> =>
        post('/system/sysOrg/findOrganizationTreeWithTaxCategory', params)

}
export const taxService = new TaxManageService()
