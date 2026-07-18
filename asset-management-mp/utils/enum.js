// utils/enum.js - 全局枚举常量(严格对应59号制度第一部分)

// 一级资产大类
const ASSET_CATEGORY_L1 = [
  { value: 'operating', label: '经营性资产' },
  { value: 'non_operating', label: '非经营性资产' }
];

// 二级资产分类
const ASSET_CATEGORY_L2 = [
  { value: 'operating_house', label: '经营用房', l1: 'operating', manageDept: 'strategy' },
  { value: 'official_vehicle', label: '公务车辆', l1: 'non_operating', manageDept: 'comprehensive' },
  { value: 'office_house', label: '办公用房', l1: 'non_operating', manageDept: 'comprehensive' },
  { value: 'office_equipment', label: '办公设施设备', l1: 'non_operating', manageDept: 'comprehensive' },
  { value: 'it_hardware', label: '信息化硬件', l1: 'non_operating', manageDept: 'digital_center' },
  { value: 'it_software', label: '信息化软件', l1: 'non_operating', manageDept: 'digital_center' }
];

// 资产类型(系统判定)
const ASSET_TYPE = [
  { value: 'fixed_asset', label: '固定资产' },
  { value: 'low_value_consumable', label: '低值易耗品' }
];

// 资产状态(10种固定枚举)
const ASSET_STATUS = [
  { value: 'pending_inbound', label: '待入库', color: 'default' },
  { value: 'in_use', label: '在用', color: 'success' },
  { value: 'idle', label: '闲置', color: 'warning' },
  { value: 'under_repair', label: '维修中', color: 'info' },
  { value: 'transferring', label: '跨部门调拨中', color: 'info' },
  { value: 'pending_scrap', label: '待报废', color: 'warning' },
  { value: 'scrapped', label: '已报废', color: 'danger' },
  { value: 'leased_out', label: '对外出租', color: 'info' },
  { value: 'transferred_out', label: '对外转让', color: 'info' },
  { value: 'inventory_diff', label: '盘点差异待处理', color: 'danger' }
];

// 报废类型
const SCRAP_TYPE = [
  { value: 'normal', label: '正常报废' },
  { value: 'accidental', label: '意外报废' }
];

// 组织层级
const ORG_LEVEL = [
  { value: 'HQ', label: '公司本部' },
  { value: 'branch', label: '分公司' },
  { value: 'subsidiary', label: '控股子公司' },
  { value: 'group_external', label: '集团(外部审批通道)' }
];

// 部门归口枚举
const DEPT_ROLE = [
  { value: 'comprehensive', label: '综合部' },
  { value: 'digital_center', label: '数字信息中心' },
  { value: 'strategy', label: '战略发展部' },
  { value: 'finance', label: '财务部' },
  { value: 'business_dept', label: '各业务使用部门' },
  { value: 'discipline', label: '纪检工作部' },
  { value: 'risk_legal', label: '风控法务部' }
];

// 角色枚举(13类,SOE升级)
const ROLE_CODE = [
  { value: 'super_admin', label: '超级管理员' },
  { value: 'party_secretary', label: '党委书记' },
  { value: 'chairman', label: '董事长' },
  { value: 'general_manager', label: '总经理' },
  { value: 'supervisor', label: '监事' },
  { value: 'cfo', label: '总会计师' },
  { value: 'comprehensive', label: '综合部管理员' },
  { value: 'digital_center', label: '数信中心管理员' },
  { value: 'strategy', label: '战略发展部管理员' },
  { value: 'finance', label: '财务部管理员' },
  { value: 'risk_legal', label: '风控法务部' },
  { value: 'discipline', label: '纪检工作部' },
  { value: 'dept_admin', label: '部门资产管理员' },
  { value: 'employee', label: '普通员工' },
  { value: 'subsidiary_admin', label: '子公司管理员' }
];

// 违规行为类型(5类)
const VIOLATION_TYPE = [
  { value: 'V1', label: '资产管理不善,造成国有资产流失' },
  { value: 'V2', label: '隐瞒资产真实情况,不实申报资产' },
  { value: 'V3', label: '未履行审批手续,擅自处置国有资产' },
  { value: 'V4', label: '弄虚作假,利用国有资产谋取私利' },
  { value: 'V5', label: '其他违反国资管理法规、造成资产重大损失' }
];

// 处置结果(6类)
const PENALTY_TYPE = [
  { value: 'admonishment', label: '诫勉谈话' },
  { value: 'org_action', label: '组织处理' },
  { value: 'salary_cut', label: '扣减薪酬' },
  { value: 'disciplinary', label: '内部纪律处分' },
  { value: 'discipline_committee', label: '移交纪检监察部' },
  { value: 'judicial', label: '移送司法机关追究刑事责任' }
];

// 三重一大业务类型
const MAJOR_DECISION_TYPE = [
  { value: 'asset_disposal', label: '重大资产处置' },
  { value: 'budget', label: '年度预算' },
  { value: 'property_change', label: '产权变动' },
  { value: 'major_investment', label: '重大投资' },
  { value: 'reorganization', label: '重组' }
];

// 决策会议类型
const MEETING_TYPE = [
  { value: 'party_committee', label: '党委会' },
  { value: 'board', label: '董事会' },
  { value: 'gm_office', label: '总经理办公会' },
  { value: 'supervisor_board', label: '监事会' }
];

// 产权登记类型
const PROPERTY_REG_TYPE = [
  { value: 'possession', label: '占有登记' },
  { value: 'change', label: '变动登记' },
  { value: 'cancellation', label: '注销登记' }
];

// 评估目的
const APPRAISAL_PURPOSE = [
  { value: 'disposal', label: '处置' },
  { value: 'transfer', label: '转让' },
  { value: 'investment', label: '对外投资' },
  { value: 'mortgage', label: '抵押' },
  { value: 'finance', label: '财务核算' }
];

// 进场交易类型
const EXCHANGE_TYPE = [
  { value: 'transfer', label: '资产转让' },
  { value: 'lease', label: '资产出租' },
  { value: 'investment_exit', label: '对外投资退出' }
];

// 国资监管报送类型
const SASAC_REPORT_TYPE = [
  { value: 'monthly_stats', label: '月度资产统计' },
  { value: 'quarterly_analysis', label: '季度运行分析' },
  { value: 'annual_state_asset', label: '年度国有资产报告' },
  { value: 'major_event', label: '重大事项报告' }
];

// 工具函数:根据值查找标签
function findLabel(enumArr, value) {
  const item = enumArr.find(i => i.value === value);
  return item ? item.label : value;
}

// 工具函数:根据值查找状态颜色
function findColor(value) {
  const item = ASSET_STATUS.find(i => i.value === value);
  return item ? item.color : 'default';
}

module.exports = {
  ASSET_CATEGORY_L1, ASSET_CATEGORY_L2, ASSET_TYPE, ASSET_STATUS,
  SCRAP_TYPE, ORG_LEVEL, DEPT_ROLE, ROLE_CODE,
  VIOLATION_TYPE, PENALTY_TYPE,
  MAJOR_DECISION_TYPE, MEETING_TYPE, PROPERTY_REG_TYPE,
  APPRAISAL_PURPOSE, EXCHANGE_TYPE, SASAC_REPORT_TYPE,
  findLabel, findColor
};
