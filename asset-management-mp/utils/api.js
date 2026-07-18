// utils/api.js - 业务API封装(本地存储版,生产环境可替换为后端接口)
const storage = require('./storage.js');
const auth = require('./auth.js');
const soe = require('./soe-rules.js');
const { findLabel, ASSET_STATUS, ROLE_CODE, DEPT_ROLE } = require('./enum.js');

// ============ 用户与登录 ============
const userApi = {
  // 登录(模拟,根据手机号+密码匹配)
  loginByPhone(phone, password) {
    const users = storage.get('users', []);
    const user = users.find(u => u.phone === phone && u.password === password && u.is_active);
    if (!user) return { success: false, message: '账号或密码错误' };
    const userWithMeta = { ...user };
    delete userWithMeta.password;
    // 附带组织/部门名
    const orgs = storage.get('orgs', []);
    const depts = storage.get('depts', []);
    userWithMeta.org_name = (orgs.find(o => o.id === user.org_id) || {}).org_name;
    userWithMeta.dept_name = (depts.find(d => d.id === user.dept_id) || {}).dept_name;
    userWithMeta.role_name = (Array.isArray(user.role_codes) ? user.role_codes : [user.role_codes])
      .map(r => findLabel(ROLE_CODE, r)).join(',');
    auth.login(userWithMeta);
    return { success: true, user: userWithMeta };
  },

  // 快速登录(选择测试账号,仅开发用)
  quickLogin(userId) {
    const users = storage.get('users', []);
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false };
    return this.loginByPhone(user.phone, user.password);
  },

  logout() {
    auth.logout();
  }
};

// ============ 资产 ============
const assetApi = {
  list(filters = {}) {
    let list = storage.get('assets', []);
    // 数据隔离过滤
    list = auth.filterByDataScope(list);
    // 应用筛选
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter(a => 
        (a.asset_name || '').toLowerCase().includes(kw) ||
        (a.asset_code || '').toLowerCase().includes(kw)
      );
    }
    if (filters.category_l1) list = list.filter(a => a.category_l1 === filters.category_l1);
    if (filters.category_l2) list = list.filter(a => a.category_l2 === filters.category_l2);
    if (filters.status) list = list.filter(a => a.status === filters.status);
    if (filters.manage_dept_role) list = list.filter(a => a.manage_dept_role === filters.manage_dept_role);
    return list.map(a => ({
      ...a,
      status_label: findLabel(ASSET_STATUS, a.status),
      category_l2_label: findLabel(ASSET_STATUS, a.category_l2) // 复用findLabel
    }));
  },

  getById(id) {
    const list = storage.get('assets', []);
    const asset = list.find(a => a.id === id);
    if (!asset) return null;
    return {
      ...asset,
      status_label: findLabel(ASSET_STATUS, asset.status)
    };
  },

  getByCode(code) {
    const list = storage.get('assets', []);
    return list.find(a => a.asset_code === code);
  },

  // 新增资产(入库)
  create(data) {
    const { genAssetCode } = storage;
    const year = new Date().getFullYear();
    const user = auth.getCurrentUser();
    const assetCode = genAssetCode(data.manage_dept_role, year);
    const asset = {
      id: storage.genId(),
      asset_code: assetCode,
      ...data,
      acc_depreciation: 0,
      book_value: data.original_value,
      status: 'pending_inbound',
      owner_org_id: user.org_id,
      created_at: new Date().toISOString()
    };
    storage.insert('assets', asset);
    // 自动生成产权占有登记
    propertyRegApi.createPossession(asset.id, user.org_id);
    return asset;
  },

  // 更新资产
  update(id, updates) {
    return storage.update('assets', id, updates);
  },

  // 更新状态
  updateStatus(id, status) {
    return storage.update('assets', id, { status });
  },

  // 统计
  statistics() {
    let list = storage.get('assets', []);
    list = auth.filterByDataScope(list);
    const stats = {
      total: list.length,
      in_use: list.filter(a => a.status === 'in_use').length,
      idle: list.filter(a => a.status === 'idle').length,
      under_repair: list.filter(a => a.status === 'under_repair').length,
      scrapped: list.filter(a => a.status === 'scrapped').length,
      pending_scrap: list.filter(a => a.status === 'pending_scrap').length,
      total_value: list.reduce((s, a) => s + Number(a.original_value || 0), 0)
    };
    return stats;
  }
};

// ============ 审批 ============
const approvalApi = {
  listMyPending() {
    const user = auth.getCurrentUser();
    if (!user) return [];
    const list = storage.get('approval_instances', []);
    // 简化:根据当前用户角色匹配待办
    return list.filter(a => a.status === 'running');
  },

  listMyInitiated() {
    const user = auth.getCurrentUser();
    if (!user) return [];
    return storage.get('approval_instances', []).filter(a => a.initiator_user_id === user.id);
  },

  listAll() {
    return storage.get('approval_instances', []);
  },

  approve(instanceId, opinion) {
    const list = storage.get('approval_instances', []);
    const idx = list.findIndex(a => a.id === instanceId);
    if (idx === -1) return false;
    list[idx].current_step += 1;
    if (list[idx].current_step > 5) {
      list[idx].status = 'approved';
    }
    storage.set('approval_instances', list);
    return true;
  },

  reject(instanceId, opinion) {
    const list = storage.get('approval_instances', []);
    const idx = list.findIndex(a => a.id === instanceId);
    if (idx === -1) return false;
    list[idx].status = 'rejected';
    storage.set('approval_instances', list);
    return true;
  }
};

// ============ 报废 ============
const scrapApi = {
  list() {
    return storage.get('scrap_applications', []);
  },
  create(data) {
    const user = auth.getCurrentUser();
    const item = storage.insert('scrap_applications', {
      scrap_no: storage.genBizNo('SCRAP'),
      ...data,
      status: 'drafting',
      initiator_user_id: user.id,
      initiator_name: user.real_name
    });
    return item;
  }
};

// ============ 领用/调拨 ============
const receiveTransferApi = {
  list() {
    return storage.get('receive_transfer', []);
  },
  createReceive(data) {
    const user = auth.getCurrentUser();
    return storage.insert('receive_transfer', {
      rt_no: storage.genBizNo('RT'),
      rt_type: 'receive',
      ...data,
      status: 'pending',
      initiator_user_id: user.id
    });
  },
  createTransfer(data) {
    const user = auth.getCurrentUser();
    return storage.insert('receive_transfer', {
      rt_no: storage.genBizNo('RT'),
      rt_type: 'transfer',
      ...data,
      status: 'pending',
      initiator_user_id: user.id
    });
  }
};

// ============ 盘点 ============
const inventoryApi = {
  list() {
    return storage.get('inventories', []);
  },
  create(data) {
    return storage.insert('inventories', {
      inv_no: storage.genBizNo('INV'),
      ...data,
      status: 'scanning',
      scanned_assets: []
    });
  },
  scan(invId, assetId, diffType = null) {
    const list = storage.get('inventories', []);
    const idx = list.findIndex(i => i.id === invId);
    if (idx === -1) return false;
    if (!list[idx].scanned_assets) list[idx].scanned_assets = [];
    list[idx].scanned_assets.push({ asset_id: assetId, diff_type: diffType, scan_time: new Date().toISOString() });
    storage.set('inventories', list);
    return true;
  }
};

// ============ 三重一大 ============
const majorDecisionApi = {
  list() {
    return storage.get('major_decisions', []);
  },
  create(data) {
    return storage.insert('major_decisions', {
      md_no: storage.genBizNo('MD'),
      ...data,
      status: 'pending_party_review',
      decision_result: 'pending'
    });
  },
  // 党委会前置研究
  submitPartyCommitteeReview(id, meetingData) {
    return storage.update('major_decisions', id, {
      ...meetingData,
      status: 'pending_board_decision'
    });
  },
  // 董事会决策
  submitBoardDecision(id, decision, voteResult) {
    return storage.update('major_decisions', id, {
      decision_result: decision,
      vote_result: voteResult,
      status: decision === 'approved' ? 'approved' : 'rejected',
      archive_date: new Date().toISOString()
    });
  }
};

// ============ 产权登记 ============
const propertyRegApi = {
  list() {
    return storage.get('property_registrations', []);
  },
  createPossession(assetId, orgId) {
    return storage.insert('property_registrations', {
      pr_no: storage.genBizNo('PR'),
      registration_type: 'possession',
      asset_id: assetId,
      org_id: orgId,
      property_right_nature: 'state_owned',
      status: 'draft'
    });
  },
  createChange(assetId, changeType, beforeValue, afterValue) {
    return storage.insert('property_changes', {
      asset_id: assetId,
      change_type: changeType,
      before_value: beforeValue,
      after_value: afterValue,
      change_date: new Date().toISOString().split('T')[0],
      is_registered: false,
      overdue_alert: false
    });
  },
  register(id, sasacFilingNo) {
    return storage.update('property_registrations', id, {
      sasac_filing_no: sasacFilingNo,
      sasac_filing_date: new Date().toISOString().split('T')[0],
      status: 'registered'
    });
  },
  // 逾期列表
  overdueList() {
    return storage.get('property_changes', []).filter(c => c.overdue_alert && !c.is_registered);
  }
};

// ============ 资产评估 ============
const appraisalApi = {
  listOrgs() {
    return storage.get('appraisal_orgs', []);
  },
  listReports() {
    return storage.get('appraisal_reports', []);
  },
  createReport(data) {
    return storage.insert('appraisal_reports', {
      ar_no: storage.genBizNo('AR'),
      ...data,
      filing_status: 'not_filed',
      created_at: new Date().toISOString()
    });
  }
};

// ============ 进场交易 ============
const exchangeApi = {
  list() {
    return storage.get('exchange_listings', []);
  },
  create(data) {
    return storage.insert('exchange_listings', {
      el_no: storage.genBizNo('EL'),
      ...data,
      status: 'drafting'
    });
  }
};

// ============ 国资监管报送 ============
const sasacReportApi = {
  list() {
    return storage.get('sasac_reports', []);
  },
  create(data) {
    return storage.insert('sasac_reports', {
      report_no: storage.genBizNo('SR'),
      ...data,
      status: 'draft',
      generated_by_ai: true
    });
  }
};

// ============ 追责 ============
const violationApi = {
  list() {
    return storage.get('violations', []);
  },
  create(data) {
    const user = auth.getCurrentUser();
    return storage.insert('violations', {
      violation_no: storage.genBizNo('V'),
      ...data,
      signoff_discipline: false,
      signoff_risk_legal: false,
      status: 'pending',
      archive_date: null
    });
  }
};

// ============ 子公司制度备案 ============
const subsidiaryPolicyApi = {
  list() {
    return storage.get('subsidiary_policies', []);
  },
  audit(id, status, opinion) {
    const user = auth.getCurrentUser();
    return storage.update('subsidiary_policies', id, {
      audit_status: status,
      audit_opinion: opinion,
      comprehensive_audit_user_id: user.id,
      audit_date: new Date().toISOString()
    });
  }
};

module.exports = {
  userApi, assetApi, approvalApi, scrapApi, receiveTransferApi,
  inventoryApi, majorDecisionApi, propertyRegApi, appraisalApi,
  exchangeApi, sasacReportApi, violationApi, subsidiaryPolicyApi,
  soe
};
