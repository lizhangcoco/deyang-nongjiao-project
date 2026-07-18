// utils/auth.js - 鉴权与角色管理
const storage = require('./storage.js');
const { ROLE_CODE, DEPT_ROLE } = require('./enum.js');

const CURRENT_USER_KEY = 'current_user';

// 登录
function login(user) {
  storage.set(CURRENT_USER_KEY, user);
  return user;
}

// 登出
function logout() {
  storage.remove(CURRENT_USER_KEY);
}

// 获取当前登录用户
function getCurrentUser() {
  return storage.get(CURRENT_USER_KEY, null);
}

// 是否已登录
function isLoggedIn() {
  return !!getCurrentUser();
}

// 当前用户是否拥有某角色
function hasRole(roleCode) {
  const user = getCurrentUser();
  if (!user) return false;
  if (Array.isArray(user.role_codes)) {
    return user.role_codes.includes(roleCode);
  }
  return user.role_codes === roleCode;
}

// 当前用户是否拥有任一角色
function hasAnyRole(roleCodes = []) {
  return roleCodes.some(r => hasRole(r));
}

// 是否超级管理员
function isSuperAdmin() {
  return hasRole('super_admin');
}

// 数据范围(用于多租户隔离)
function getDataScope() {
  const user = getCurrentUser();
  if (!user) return 'none';
  if (isSuperAdmin()) return 'all';
  if (hasRole('subsidiary_admin')) return 'org';  // 子公司仅本主体
  if (hasRole('dept_admin')) return 'dept';
  return 'self';
}

// 菜单可见性判断(对应交付物四权限矩阵)
function canAccessMenu(menuKey) {
  const user = getCurrentUser();
  if (!user) return false;
  if (isSuperAdmin()) return true;

  const matrix = {
    dashboard: true,
    asset_list: true,
    asset_detail: true,
    asset_inbound: hasAnyRole(['comprehensive', 'digital_center', 'strategy', 'dept_admin', 'employee', 'subsidiary_admin']),
    asset_scrap: hasAnyRole(['comprehensive', 'digital_center', 'strategy', 'dept_admin', 'employee', 'subsidiary_admin']),
    asset_receive: true,
    asset_transfer: true,
    inventory: true,
    inventory_scan: true,
    approval_list: true,
    major_decision: hasAnyRole(['party_secretary', 'chairman', 'general_manager', 'supervisor', 'super_admin']),
    property_reg: hasAnyRole(['comprehensive', 'strategy', 'super_admin']),
    appraisal: hasAnyRole(['comprehensive', 'digital_center', 'strategy', 'super_admin']),
    exchange: hasAnyRole(['strategy', 'finance', 'risk_legal', 'discipline', 'chairman', 'general_manager', 'super_admin']),
    sasac_report: hasAnyRole(['finance', 'comprehensive', 'general_manager', 'cfo', 'super_admin']),
    my_assets: true,
    leave_clearance: true,
    ai_assistant: true,
    archive: true,
    violation: hasAnyRole(['discipline', 'risk_legal', 'super_admin', 'comprehensive']),
    profile: true
  };
  return matrix[menuKey] !== undefined ? matrix[menuKey] : false;
}

// 按钮级权限
function canDo(action, context = {}) {
  const user = getCurrentUser();
  if (!user) return false;
  if (isSuperAdmin()) return true;

  const rules = {
    // 资产卡片维护:仅归口部门
    edit_asset_card: hasAnyRole(['comprehensive', 'digital_center', 'strategy']),
    // 审批流配置:仅超管
    config_approval_flow: false,
    // 导出全公司数据:仅超管
    export_all_data: false,
    // 离职流程解锁:仅综合部
    unlock_leave_flow: hasRole('comprehensive'),
    // 子公司制度备案审核:仅综合部+超管
    audit_subsidiary_policy: hasRole('comprehensive'),
    // 金额阈值修改:仅超管
    modify_threshold: false,
    // 三重一大决策:党委/董事/总办会成员
    make_major_decision: hasAnyRole(['party_secretary', 'chairman', 'general_manager']),
    // 追责录入:纪检/风控
    record_violation: hasAnyRole(['discipline', 'risk_legal']),
    // 国资报送签发:总经理
    sign_sasac_report: hasAnyRole(['general_manager', 'chairman']),
    // 进场交易发起:战略发展部
    initiate_exchange: hasRole('strategy'),
    // 财务核销:财务部
    finance_write_off: hasRole('finance'),
    // 评估发起:归口部门
    initiate_appraisal: hasAnyRole(['comprehensive', 'digital_center', 'strategy'])
  };
  return rules[action] !== undefined ? rules[action] : true;
}

// 数据隔离过滤(子公司只能看本主体)
function filterByDataScope(list, ownerField = 'owner_org_id') {
  const user = getCurrentUser();
  if (!user) return [];
  if (isSuperAdmin()) return list;
  if (hasRole('subsidiary_admin')) {
    return list.filter(i => i[ownerField] === user.org_id);
  }
  if (hasRole('dept_admin')) {
    return list.filter(i => i.use_dept_id === user.dept_id || i.manage_dept_id === user.dept_id);
  }
  if (hasRole('employee')) {
    return list.filter(i => i.use_user_id === user.id);
  }
  // 归口部门管理员:看本归口范围
  if (hasAnyRole(['comprehensive', 'digital_center', 'strategy'])) {
    const roleToDept = {
      comprehensive: 'comprehensive',
      digital_center: 'digital_center',
      strategy: 'strategy'
    };
    const userDeptRole = user.role_codes.find(r => roleToDept[r]);
    if (userDeptRole) {
      return list.filter(i => i.manage_dept_role === roleToDept[userDeptRole]);
    }
  }
  return list;
}

module.exports = {
  login, logout, getCurrentUser, isLoggedIn,
  hasRole, hasAnyRole, isSuperAdmin, getDataScope,
  canAccessMenu, canDo, filterByDataScope
};
