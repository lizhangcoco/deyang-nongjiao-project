// utils/soe-rules.js - SOE国资监管规则引擎(核心合规逻辑)
const app = getApp();

// ============ 资产自动判定 (AI-1) ============
// 严格按59号制度1.1.2条
function judgeAsset(input) {
  const { unit_price, quantity = 1, is_batch_long_term = false, useful_life_years = 0, category_l2 } = input;
  const total = Number(unit_price) * Number(quantity);
  const thresholds = app.globalData.thresholds;

  // 规则1:固资判定
  let is_fixed = false;
  // (1) 单价≥2000 + 使用年限>1年
  if (Number(unit_price) >= thresholds.fixedAssetMinPrice && useful_life_years > 1) {
    is_fixed = true;
  }
  // (2) 单价<2000 但大批量同类物资+耐用周期超1年
  if (Number(unit_price) < thresholds.fixedAssetMinPrice && is_batch_long_term && useful_life_years > 1) {
    is_fixed = true;
  }
  const asset_type = is_fixed ? 'fixed_asset' : 'low_value_consumable';

  // 规则2:归口部门映射
  const deptMap = {
    operating_house: 'strategy',
    official_vehicle: 'comprehensive',  // 跳转公车模块
    office_house: 'comprehensive',
    office_equipment: 'comprehensive',
    it_hardware: 'digital_center',
    it_software: 'digital_center'
  };
  const manage_dept = deptMap[category_l2] || 'comprehensive';

  // 规则3:一级分类
  const l1Map = {
    operating_house: 'operating',
    official_vehicle: 'non_operating',
    office_house: 'non_operating',
    office_equipment: 'non_operating',
    it_hardware: 'non_operating',
    it_software: 'non_operating'
  };
  const category_l1 = l1Map[category_l2] || 'non_operating';

  return {
    asset_type,
    category_l1,
    category_l2,
    manage_dept,
    original_value: total,
    is_high_value: total > 20000  // 高价值固定资产(三级审签)
  };
}

// ============ 审批流自动匹配 (AI-2) ============
// 严格按59号制度3.2条
function matchApprovalFlow(bizType, amount, orgLevel, extra = {}) {
  amount = Number(amount);
  const thresholds = app.globalData.thresholds;

  // 资产取得审批分级
  if (bizType === 'inbound') {
    if (amount < thresholds.fixedAssetMinPrice) {
      return {
        flow: 'low_value',
        flow_name: '低值易耗品-综合部审核',
        steps: [
          { step: 1, role: 'dept_admin', name: '需求部门提交' },
          { step: 2, role: 'comprehensive', name: '综合部审核通过' }
        ]
      };
    }
    if (amount >= thresholds.fixedAssetMinPrice && amount <= thresholds.procurementRedirectMax) {
      return {
        flow: 'fixed_dual',
        flow_name: '固定资产-双分管领导审批',
        steps: [
          { step: 1, role: 'dept_admin', name: '需求部门提交' },
          { step: 2, role: 'dept_leader', name: '需求部门分管领导审批' },
          { step: 3, role: 'manage_dept_leader', name: '资产归口部门分管领导审批' }
        ]
      };
    }
    // >20000元 跳采购流程
    return {
      flow: 'redirect_procurement',
      flow_name: '跳转《采购管理办法》流程',
      steps: [
        { step: 1, role: 'system', name: '自动跳转采购管理系统' }
      ],
      redirect: 'procurement'
    };
  }

  // 维修审批
  if (bizType === 'maintenance') {
    if (amount > thresholds.maintenanceRedirectMax) {
      return {
        flow: 'redirect_procurement',
        flow_name: '维修>2万跳转采购流程选定服务商',
        steps: [{ step: 1, role: 'system', name: '跳转采购流程' }],
        redirect: 'procurement'
      };
    }
    return {
      flow: 'maintenance_normal',
      flow_name: '普通维修审批',
      steps: [
        { step: 1, role: 'dept_admin', name: '使用部门提交' },
        { step: 2, role: 'manage_dept', name: '归口部门审批' }
      ]
    };
  }

  // 装修审批(严格按M4金额阈值)
  if (bizType === 'renovation') {
    return matchRenovationFlow(amount, orgLevel);
  }

  // 报废审批
  if (bizType === 'scrap') {
    return {
      flow: 'scrap_full',
      flow_name: '报废全流程',
      steps: [
        { step: 1, role: 'dept_admin', name: '使用部门填报报废申请' },
        { step: 2, role: 'joint', name: '归口+使用+财务联合处置方案' },
        { step: 3, role: 'gm_office', name: '总经理办公会线上审批' },
        { step: 4, role: 'disposal_team', name: '处置小组(归口/财务/风控法务/纪检)' },
        { step: 5, role: 'finance', name: '财务账务核销' }
      ]
    };
  }

  // 领用审批(高价值三级审签)
  if (bizType === 'receive') {
    if (extra.is_high_value) {
      return {
        flow: 'receive_high_value',
        flow_name: '高价值固定资产三级审签',
        steps: [
          { step: 1, role: 'employee', name: '员工申领' },
          { step: 2, role: 'dept_leader', name: '部门分管领导' },
          { step: 3, role: 'manage_dept_leader', name: '归口分管领导' },
          { step: 4, role: 'gm', name: '总经理审签' }
        ]
      };
    }
    return {
      flow: 'receive_normal',
      flow_name: '普通资产申领',
      steps: [
        { step: 1, role: 'employee', name: '员工申领' },
        { step: 2, role: 'manage_dept', name: '归口部门审批' }
      ]
    };
  }

  return null;
}

// 装修审批金额分级(严格按M4规则)
function matchRenovationFlow(amount, orgLevel) {
  amount = Number(amount);
  // 子公司装修
  if (orgLevel === 'subsidiary') {
    if (amount <= 500000) {
      return {
        flow: 'renovation_subsidiary_internal',
        flow_name: '子公司自主审批(≤50万)',
        steps: [{ step: 1, role: 'subsidiary_admin', name: '子公司自主审批' }]
      };
    }
    if (amount < 1000000) {
      return {
        flow: 'renovation_subsidiary_parent_gm',
        flow_name: '推送母公司总经理办公会(50-100万)',
        steps: [{ step: 1, role: 'parent_gm_office', name: '母公司总办会审批' }]
      };
    }
    return {
      flow: 'renovation_group_two_level',
      flow_name: '集团两级审批(≥100万)',
      steps: [
        { step: 1, role: 'parent_gm_office', name: '母公司总办会' },
        { step: 2, role: 'group_board', name: '集团董事会' }
      ]
    };
  }
  // 本部/分公司装修
  if (amount <= 1000000) {
    return {
      flow: 'renovation_internal',
      flow_name: '公司内部审批(≤100万)',
      steps: [{ step: 1, role: 'gm_office', name: '公司内部审批' }]
    };
  }
  if (amount < 2000000) {
    return {
      flow: 'renovation_group_gm',
      flow_name: '集团总经理办公会(100-200万)',
      steps: [{ step: 1, role: 'group_gm_office', name: '集团总办会' }]
    };
  }
  return {
    flow: 'renovation_group_board',
    flow_name: '集团董事会(≥200万)',
    steps: [{ step: 1, role: 'group_board', name: '集团董事会审批' }]
  };
}

// ============ 三重一大识别 (AI-7) ============
function identifyMajorDecision(bizType, amount, orgLevel) {
  amount = Number(amount);
  const thresholds = app.globalData.thresholds;
  const triggers = [];

  if (bizType === 'asset_disposal' && amount >= thresholds.majorDecisionDisposal) {
    triggers.push(`单笔处置≥${thresholds.majorDecisionDisposal / 10000}万`);
  }
  if (bizType === 'procurement' && amount >= thresholds.majorDecisionProcurement) {
    triggers.push(`单笔采购≥${thresholds.majorDecisionProcurement / 10000}万`);
  }
  if (bizType === 'property_change') {
    triggers.push('产权变动(任何金额)');
  }
  if (bizType === 'major_investment' && amount >= thresholds.majorDecisionProcurement) {
    triggers.push(`重大投资≥${thresholds.majorDecisionProcurement / 10000}万`);
  }
  if (bizType === 'reorganization') {
    triggers.push('企业重组');
  }
  if (bizType === 'budget') {
    triggers.push('年度预算');
  }

  return {
    is_major_decision: triggers.length > 0,
    triggers,
    required_meetings: triggers.length > 0 ? ['party_committee', 'board'] : []
  };
}

// ============ 预算校验 (AI-6) ============
function checkBudget(bizType, amount, deptId, year) {
  const storage = require('./storage.js');
  const budgets = storage.get('budgets', []);
  const budget = budgets.find(b => 
    b.budget_type === bizType && 
    b.dept_id === deptId && 
    b.budget_year === year &&
    b.status === 'approved'
  );
  
  if (!budget) {
    return { passed: false, reason: '无对应预算,需先发起追加预算审批', redirect: 'budget_extra' };
  }
  const remaining = Number(budget.total_amount) - Number(budget.used_amount);
  if (Number(amount) > remaining) {
    return {
      passed: false,
      reason: `超预算(剩余${remaining}元,申请${amount}元),请先发起追加预算审批`,
      redirect: 'budget_extra',
      budget_id: budget.id
    };
  }
  return { passed: true, budget_id: budget.id, remaining };
}

// ============ 评估必要性判定 ============
function checkAppraisalRequired(bookValue, bizType) {
  const thresholds = app.globalData.thresholds;
  // 账面净值≥10万或无账面价值 强制评估
  if (bizType === 'disposal' || bizType === 'transfer' || bizType === 'investment' || bizType === 'mortgage') {
    if (Number(bookValue) >= thresholds.appraisalRequired || Number(bookValue) === 0) {
      return { required: true, reason: `账面净值≥${thresholds.appraisalRequired / 10000}万或无账面价值,强制评估` };
    }
  }
  return { required: false };
}

// ============ 进场交易必要性判定 ============
function checkExchangeRequired(transactionType, annualRent = 0) {
  const thresholds = app.globalData.thresholds;
  if (transactionType === 'transfer') {
    return { required: true, reason: '资产转让一律进场交易' };
  }
  if (transactionType === 'lease' && Number(annualRent) >= thresholds.exchangeListingRent) {
    return { required: true, reason: `年租≥${thresholds.exchangeListingRent / 10000}万,强制进场` };
  }
  if (transactionType === 'investment_exit') {
    return { required: true, reason: '对外投资退出强制进场' };
  }
  return { required: false };
}

// ============ 挂牌价校验 ============
function validateListingPrice(listingPrice, appraisalValue, isRelisting = false, previousPrice = 0) {
  if (Number(listingPrice) < Number(appraisalValue)) {
    return { passed: false, reason: `挂牌价(${listingPrice})不得低于评估价(${appraisalValue})` };
  }
  if (isRelisting) {
    const maxDiscount = Number(previousPrice) * 0.9;
    if (Number(listingPrice) < maxDiscount) {
      return { passed: false, reason: '重新挂牌降价不得超过10%' };
    }
  }
  return { passed: true };
}

// ============ 资产损失分级 ============
function classifyAssetLoss(lossAmount) {
  lossAmount = Number(lossAmount);
  if (lossAmount < 100000) {
    return { level: 'dept', desc: '部门认定+公司核销', sasac_filing: false };
  }
  if (lossAmount < 1000000) {
    return { level: 'company', desc: '公司认定+财务核销+追责', sasac_filing: false };
  }
  return { level: 'sasac', desc: '逐级认定+国资委备案+法律意见书', sasac_filing: true };
}

// ============ 关联方识别 (AI-8 简化版) ============
function identifyRelatedParty(counterpartyName, counterpartyCreditCode) {
  const storage = require('./storage.js');
  const lib = storage.get('related_parties', []);
  const match = lib.find(p => 
    p.name === counterpartyName || p.credit_code === counterpartyCreditCode
  );
  return {
    is_related: !!match,
    relationship: match ? match.relationship : null,
    related_party_id: match ? match.id : null
  };
}

// ============ 国资考核KPI计算 (AI-10) ============
function calculateKPI(periodStart, periodEnd, orgId) {
  const storage = require('./storage.js');
  const assets = storage.get('assets', []);
  const scopedAssets = orgId ? assets.filter(a => a.owner_org_id === orgId) : assets;
  
  const totalAssets = scopedAssets.length;
  const inUseAssets = scopedAssets.filter(a => a.status === 'in_use').length;
  const idleAssets = scopedAssets.filter(a => a.status === 'idle');
  const idleValue = idleAssets.reduce((sum, a) => sum + Number(a.original_value || 0), 0);
  const totalValue = scopedAssets.reduce((sum, a) => sum + Number(a.original_value || 0), 0);

  return {
    utilization_rate: totalAssets > 0 ? (inUseAssets / totalAssets * 100).toFixed(2) : 0,
    idle_rate: totalValue > 0 ? (idleValue / totalValue * 100).toFixed(2) : 0,
    total_assets: totalAssets,
    total_value: totalValue.toFixed(2),
    idle_count: idleAssets.length
  };
}

// ============ 保值增值率 ============
function calculatePreservationRate(netAssetsStart, netAssetsEnd, adjustments = 0) {
  if (Number(netAssetsStart) === 0) return 0;
  const adjustedEnd = Number(netAssetsEnd) - Number(adjustments);
  return (adjustedEnd / Number(netAssetsStart)).toFixed(4);
}

module.exports = {
  judgeAsset,
  matchApprovalFlow,
  matchRenovationFlow,
  identifyMajorDecision,
  checkBudget,
  checkAppraisalRequired,
  checkExchangeRequired,
  validateListingPrice,
  classifyAssetLoss,
  identifyRelatedParty,
  calculateKPI,
  calculatePreservationRate
};
