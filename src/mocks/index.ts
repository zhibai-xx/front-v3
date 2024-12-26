// src/mocks/index.ts
import Mock from 'mockjs';

// 设置 Mock 请求拦截
Mock.setup({
    timeout: '300-600' // 随机延迟 300ms 到 600ms
});

const Random = Mock.Random

// 模拟用户数据接口
Mock.mock('/apis/base/baseWorkTaskNotification/findPage', 'post', (options) => {
    console.log('请求参数:', JSON.parse(options.body)); // 打印请求体
    return {
        code: 200,
        message: 'success',
        data: Mock.mock({
            'data': {
                total: 25,
                'list|25': [{
                    'string': '@string',
                    'date': '@date',
                    'number': '@natural(1, 1000)',
                    'boolean': '@boolean',
                }],
                fieldNames: [
                    { fieldDesc: "代办事项", fieldName: "string", fieldDataType: "STRING", compareType: "LEFT_LIKE" },
                    { fieldDesc: "日期", fieldName: "date", fieldDataType: "DATE", compareType: "LEFT_LIKE" },
                    { fieldDesc: "金额", fieldName: "number", fieldDataType: "NUMBER", compareType: "LEFT_LIKE" },
                    { fieldDesc: "状态", fieldName: "boolean", fieldDataType: "BOOLEAN", compareType: "LEFT_LIKE" }
                ]
            },
        })
    }
});

Mock.mock('/apis/workflow/toDoList', 'post', (options) => {
    console.log('请求参数:', JSON.parse(options.body)); // 打印请求体
    return {
        code: 200,
        message: 'success',
        data: Mock.mock({
            'data': {
                total: 30,
                'list|30': [{
                    'string': '@string',
                    'date': '@date',
                    'number': '@natural(1, 1000)',
                    'boolean': '@boolean',
                }],
                fieldNames: [
                    { fieldDesc: "审核代办事项", fieldName: "string", fieldDataType: "STRING", compareType: "LEFT_LIKE" },
                    { fieldDesc: "审核日期", fieldName: "date", fieldDataType: "DATE", compareType: "LEFT_LIKE" },
                    { fieldDesc: "审核金额", fieldName: "number", fieldDataType: "NUMBER", compareType: "LEFT_LIKE" },
                    { fieldDesc: "审核状态", fieldName: "boolean", fieldDataType: "BOOLEAN", compareType: "LEFT_LIKE" }
                ]
            },
        })
    }
});

Mock.mock('/apis/base/baseWorkTaskNotification/findStatisticalData', 'post', {
    code: 200,
    message: 'success',
    data: {
        'data': {
            allCount: '@natural(1, 100)',
            completedCount: '@natural(1, 100)',
            waitCount: '@natural(1, 100)',
            notCount: '@natural(1, 100)',
            postponeCount: '@natural(1, 100)',
        }
    },
});

Mock.mock('/apis/base/baseWorkTaskNotification/findOrgUsers', 'post', {
    code: 200,
    message: 'success',
    data: {
        'data|11': [{
            'desc': '@string',
            'code': '@natural(1, 100)',
        }],
    }

});

Mock.mock('/apis/mainTaxes/cit/citThreeFactorsMgt/findPage', 'post', (options) => {
    console.log('请求参数:', JSON.parse(options.body)); // 打印请求体
    return {
        code: 200,
        message: 'success',
        data: Mock.mock({
            'data': {
                total: 25,
                'list|25': [{
                    'taxpayerName': '@string',
                    'year': '@date',
                    'taxpayerIdNumber': '@natural(1, 1000)',
                    // 'boolean': '@boolean',
                }],
                fieldNames: [
                    { fieldName: 'taxpayerName', fieldDesc: '纳税主体名称', fieldDataType: "STRING", width: '220' },
                    { fieldName: 'taxpayerIdNumber', fieldDesc: '纳税人识别号', fieldDataType: "NUMBER", width: '170' },
                    { fieldName: 'year', fieldDesc: '年度', fieldDataType: "NUMBER", width: '150' },
                    {
                        fieldDesc: '原始数据',
                        children: [
                            { fieldName: 'originalGrossPayroll', fieldDesc: '工资总额', width: '130', align: 'right' },
                            { fieldName: 'originalRevenue', fieldDesc: '营业收入', width: '130', align: 'right' },
                            { fieldName: 'originalTotalAssets', fieldDesc: '资产总额', width: '130', align: 'right' }
                        ]
                    },
                    {
                        fieldDesc: '调整后数据',
                        children: [
                            { fieldName: 'adjustedGrossPayroll', fieldDesc: '工资总额', width: '130', align: 'right' },
                            { fieldName: 'adjustedRevenue', fieldDesc: '营业收入', width: '130', align: 'right' },
                            { fieldName: 'adjustedTotalAssets', fieldDesc: '资产总额', width: '130', align: 'right' }
                        ]
                    },
                    { fieldName: 'creationTime', fieldDesc: '创建时间', width: '150' },
                    { fieldName: 'creatorName', fieldDesc: '创建人', width: '120' },
                    { fieldName: 'lastUpdateTime', fieldDesc: '修改时间', width: '150' },
                    { fieldName: 'lastUpdatorName', fieldDesc: '修改人', width: '150' }
                ],
            },
        })
    }
});

Mock.mock('/apis/base/taxationSubject/findTaxpayerList', 'post', {
    code: 200,
    message: 'success',
    data: {
        'data|1': [{
            'name': '@string',
            'code': '@natural(1, 100)',
        }],
    }

});

Mock.mock('/apis/system/sysOrg/findOrganizationTreeWithTaxCategory', 'post', {
    code: 200,
    message: 'success',
    data: {
        'data|8': [{
            'orgName': '@string',
            'orgId': '@natural(1, 100)',
        }],
    }

});

/**
 * 获取表格查询参数
 */
Mock.mock('/apis/view/argumentField/findQueryConditionFields', 'post', {
    code: 200,
    message: 'success',
    data: {
        'data': [{
            'fieldDesc': '工资总额', // 字段描述
            'fieldName': 'originalGrossPayroll', // 字段名称
            'fieldDataType': 'NUMBER', // 限定的数据类型
            'compareType': 'LEFT_LIKE', // 限定的比较类型
        }, {
            'fieldDesc': '三因素名称', // 字段描述
            'fieldName': 'taxpayerName', // 字段名称
            'fieldDataType': 'STRING', // 限定的数据类型
            'compareType': 'LEFT_LIKE', // 限定的比较类型
        }, {
            'fieldDesc': '三因素日期', // 字段描述
            'fieldName': 'year', // 字段名称
            'fieldDataType': 'DATE', // 限定的数据类型
            'compareType': 'LEFT_LIKE', // 限定的比较类型
        }, {
            'fieldDesc': '选择字段1', // 字段描述
            'fieldName': 'originalRevenue', // 字段名称
            'fieldDataType': 'DICT', // 限定的数据类型
            'compareType': 'LEFT_LIKE', // 限定的比较类型
            'dictClasses': 'DICT_1'
        }, {
            'fieldDesc': '选择字段2', // 字段描述
            'fieldName': 'adjustedGrossPayroll', // 字段名称
            'fieldDataType': 'DICT', // 限定的数据类型
            'compareType': 'LEFT_LIKE', // 限定的比较类型
            'dictClasses': 'DICT_2'
        }],
    }

});

Mock.mock('/apis/dict', 'post', (option) => {
    console.log('option')
    return {
        code: 200,
        message: 'success',
        data: {
            'data': {
                'DICT_1': [{
                    code: 'a',
                    desc: '第一选项'
                }, {
                    code: 'b',
                    desc: '第二选项'
                }],
                'DICT_2': [{
                    code: 'c',
                    desc: '第三选项'
                }, {
                    code: 'd',
                    desc: '第四选项'
                }],
            },
        }

    }
});