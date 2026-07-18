// utils/mock.js - 模拟数据初始化(开发演示用)
const storage = require('./storage.js');

function initMockData() {
  if (storage.get('mock_initialized')) return;

  // ============ 组织主体 ============
  const orgs = [
    { id: 'org_hq', org_name: '成都农村产权交易所有限责任公司', org_level: 'HQ', parent_org_id: null, is_isolated: 0 },
    { id: 'org_branch_1', org_name: '成都农交所天府分公司', org_level: 'branch', parent_org_id: 'org_hq', is_isolated: 0 },
    { id: 'org_sub_1', org_name: '成都农交所控股子公司A', org_level: 'subsidiary', parent_org_id: 'org_hq', is_isolated: 1 }
  ];
  storage.set('orgs', orgs);

  // ============ 部门 ============
  const depts = [
    { id: 'dept_zh', org_id: 'org_hq', dept_name: '综合部', dept_role: 'comprehensive', manager_user_id: 'u_zh_mgr' },
    { id: 'dept_sz', org_id: 'org_hq', dept_name: '数字信息中心', dept_role: 'digital_center', manager_user_id: 'u_sz_mgr' },
    { id: 'dept_zf', org_id: 'org_hq', dept_name: '战略发展部', dept_role: 'strategy', manager_user_id: 'u_zf_mgr' },
    { id: 'dept_cw', org_id: 'org_hq', dept_name: '财务部', dept_role: 'finance', manager_user_id: 'u_cw_mgr' },
    { id: 'dept_fk', org_id: 'org_hq', dept_name: '风控法务部', dept_role: 'risk_legal', manager_user_id: 'u_fk_mgr' },
    { id: 'dept_jj', org_id: 'org_hq', dept_name: '纪检工作部', dept_role: 'discipline', manager_user_id: 'u_jj_mgr' },
    { id: 'dept_yw1', org_id: 'org_hq', dept_name: '业务一部', dept_role: 'business_dept', manager_user_id: 'u_yw1_mgr' },
    { id: 'dept_sub1_zh', org_id: 'org_sub_1', dept_name: '子公司综合部', dept_role: 'comprehensive', manager_user_id: 'u_sub1_zh' }
  ];
  storage.set('depts', depts);

  // ============ 用户(测试账号) ============
  const users = [
    { id: 'u_admin', openid: '', phone: '13800000001', real_name: '系统管理员', org_id: 'org_hq', dept_id: 'dept_zh', role_codes: ['super_admin'], is_active: 1, password: '123456' },
    { id: 'u_zh_mgr', openid: '', phone: '13800000002', real_name: '张综合', org_id: 'org_hq', dept_id: 'dept_zh', role_codes: ['comprehensive'], is_active: 1, password: '123456' },
    { id: 'u_sz_mgr', openid: '', phone: '13800000003', real_name: '李数信', org_id: 'org_hq', dept_id: 'dept_sz', role_codes: ['digital_center'], is_active: 1, password: '123456' },
    { id: 'u_zf_mgr', openid: '', phone: '13800000004', real_name: '王战略', org_id: 'org_hq', dept_id: 'dept_zf', role_codes: ['strategy'], is_active: 1, password: '123456' },
    { id: 'u_cw_mgr', openid: '', phone: '13800000005', real_name: '赵财务', org_id: 'org_hq', dept_id: 'dept_cw', role_codes: ['finance'], is_active: 1, password: '123456' },
    { id: 'u_fk_mgr', openid: '', phone: '13800000006', real_name: '钱风控', org_id: 'org_hq', dept_id: 'dept_fk', role_codes: ['risk_legal'], is_active: 1, password: '123456' },
    { id: 'u_jj_mgr', openid: '', phone: '13800000007', real_name: '孙纪检', org_id: 'org_hq', dept_id: 'dept_jj', role_codes: ['discipline'], is_active: 1, password: '123456' },
    { id: 'u_yw1_admin', openid: '', phone: '13800000008', real_name: '周一部', org_id: 'org_hq', dept_id: 'dept_yw1', role_codes: ['dept_admin'], is_active: 1, password: '123456' },
    { id: 'u_emp1', openid: '', phone: '13800000009', real_name: '吴员工', org_id: 'org_hq', dept_id: 'dept_yw1', role_codes: ['employee'], is_active: 1, password: '123456' },
    { id: 'u_sub1_admin', openid: '', phone: '13800000010', real_name: '郑子公', org_id: 'org_sub_1', dept_id: 'dept_sub1_zh', role_codes: ['subsidiary_admin'], is_active: 1, password: '123456' },
    { id: 'u_chairman', openid: '', phone: '13800000011', real_name: '马董事长', org_id: 'org_hq', dept_id: 'dept_zh', role_codes: ['chairman'], is_active: 1, password: '123456' },
    { id: 'u_gm', openid: '', phone: '13800000012', real_name: '冯总经理', org_id: 'org_hq', dept_id: 'dept_zh', role_codes: ['general_manager'], is_active: 1, password: '123456' },
    { id: 'u_party', openid: '', phone: '13800000013', real_name: '陈书记', org_id: 'org_hq', dept_id: 'dept_zh', role_codes: ['party_secretary'], is_active: 1, password: '123456' },
    { id: 'u_supervisor', openid: '', phone: '13800000014', real_name: '褚监事', org_id: 'org_hq', dept_id: 'dept_jj', role_codes: ['supervisor'], is_active: 1, password: '123456' }
  ];
  storage.set('users', users);

  // ============ 资产 ============
  const assets = [
    {
      id: 'a_001', asset_code: 'ZH-2026-00001', asset_name: '联想ThinkPad X1 Carbon笔记本电脑',
      category_l1: 'non_operating', category_l2: 'it_hardware', asset_type: 'fixed_asset',
      unit_price: 9800, quantity: 1, original_value: 9800, residual_rate: 0.05,
      useful_life_years: 5, acc_depreciation: 980, book_value: 8820,
      enable_date: '2026-01-15', status: 'in_use', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_sz', manage_dept_role: 'digital_center',
      use_dept_id: 'dept_yw1', use_user_id: 'u_emp1',
      location: '总部办公楼3楼301工位', is_public: 0, is_leader_asset: 0,
      produced_by: 'purchase', related_external_system: null
    },
    {
      id: 'a_002', asset_code: 'ZH-2026-00002', asset_name: 'HP LaserJet Pro激光打印机',
      category_l1: 'non_operating', category_l2: 'office_equipment', asset_type: 'fixed_asset',
      unit_price: 3500, quantity: 1, original_value: 3500, residual_rate: 0.05,
      useful_life_years: 6, acc_depreciation: 280, book_value: 3220,
      enable_date: '2026-02-01', status: 'in_use', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_zh', manage_dept_role: 'comprehensive',
      use_dept_id: 'dept_yw1', use_user_id: 'u_emp1',
      location: '总部办公楼3楼301', is_public: 1, is_leader_asset: 0,
      produced_by: 'purchase'
    },
    {
      id: 'a_003', asset_code: 'ZF-2026-00001', asset_name: '成都天府大道经营用房A栋',
      category_l1: 'operating', category_l2: 'operating_house', asset_type: 'fixed_asset',
      unit_price: 5800000, quantity: 1, original_value: 5800000, residual_rate: 0.05,
      useful_life_years: 40, acc_depreciation: 145000, book_value: 5655000,
      enable_date: '2025-06-01', status: 'leased_out', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_zf', manage_dept_role: 'strategy',
      use_dept_id: 'dept_zf', use_user_id: 'u_zf_mgr',
      location: '成都天府大道北段1700号', is_public: 1, is_leader_asset: 0,
      produced_by: 'purchase'
    },
    {
      id: 'a_004', asset_code: 'ZH-2026-00003', asset_name: '会议室桌椅(大批量)',
      category_l1: 'non_operating', category_l2: 'office_equipment', asset_type: 'fixed_asset',
      unit_price: 1800, quantity: 20, original_value: 36000, residual_rate: 0.05,
      useful_life_years: 8, acc_depreciation: 720, book_value: 35280,
      enable_date: '2026-03-01', status: 'in_use', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_zh', manage_dept_role: 'comprehensive',
      use_dept_id: 'dept_zh', use_user_id: 'u_zh_mgr',
      location: '总部办公楼5楼会议室', is_public: 1, is_leader_asset: 0,
      produced_by: 'purchase', batch_no: 'BATCH_2026_001', is_batch_long_term: true
    },
    {
      id: 'a_005', asset_code: 'ZH-2026-00004', asset_name: '办公用纸(批次)',
      category_l1: 'non_operating', category_l2: 'office_equipment', asset_type: 'low_value_consumable',
      unit_price: 200, quantity: 50, original_value: 10000, residual_rate: 0,
      useful_life_years: 0, acc_depreciation: 0, book_value: 10000,
      enable_date: '2026-06-01', status: 'in_use', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_zh', manage_dept_role: 'comprehensive',
      use_dept_id: 'dept_yw1', use_user_id: 'u_yw1_admin',
      location: '总部办公楼3楼储物间', is_public: 1, is_leader_asset: 0,
      produced_by: 'purchase'
    },
    {
      id: 'a_006', asset_code: 'SZ-2026-00001', asset_name: '用友NC财务软件授权',
      category_l1: 'non_operating', category_l2: 'it_software', asset_type: 'fixed_asset',
      unit_price: 120000, quantity: 1, original_value: 120000, residual_rate: 0,
      useful_life_years: 10, acc_depreciation: 6000, book_value: 114000,
      enable_date: '2025-09-01', status: 'in_use', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_sz', manage_dept_role: 'digital_center',
      use_dept_id: 'dept_cw', use_user_id: 'u_cw_mgr',
      location: '财务部服务器', is_public: 1, is_leader_asset: 0,
      produced_by: 'purchase'
    },
    {
      id: 'a_007', asset_code: 'ZH-2026-00005', asset_name: '奥迪A6L公务车辆',
      category_l1: 'non_operating', category_l2: 'official_vehicle', asset_type: 'fixed_asset',
      unit_price: 420000, quantity: 1, original_value: 420000, residual_rate: 0.05,
      useful_life_years: 12, acc_depreciation: 35000, book_value: 385000,
      enable_date: '2024-05-01', status: 'in_use', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_zh', manage_dept_role: 'comprehensive',
      use_dept_id: 'dept_zh', use_user_id: 'u_zh_mgr',
      location: '总部地下车库A12车位', is_public: 0, is_leader_asset: 1,
      produced_by: 'purchase', related_external_system: 'vehicle_management'
    },
    {
      id: 'a_008', asset_code: 'ZH-2026-00006', asset_name: '闲置办公桌',
      category_l1: 'non_operating', category_l2: 'office_equipment', asset_type: 'fixed_asset',
      unit_price: 2800, quantity: 1, original_value: 2800, residual_rate: 0.05,
      useful_life_years: 10, acc_depreciation: 560, book_value: 2240,
      enable_date: '2024-08-01', status: 'idle', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_zh', manage_dept_role: 'comprehensive',
      use_dept_id: 'dept_zh', use_user_id: null,
      location: '总部办公楼3楼储物间', is_public: 1, is_leader_asset: 0,
      produced_by: 'purchase'
    },
    {
      id: 'a_009', asset_code: 'ZH-2026-00007', asset_name: '子公司会议室空调',
      category_l1: 'non_operating', category_l2: 'office_equipment', asset_type: 'fixed_asset',
      unit_price: 6500, quantity: 1, original_value: 6500, residual_rate: 0.05,
      useful_life_years: 8, acc_depreciation: 812, book_value: 5688,
      enable_date: '2025-10-01', status: 'in_use', owner_org_id: 'org_sub_1',
      manage_dept_id: 'dept_sub1_zh', manage_dept_role: 'comprehensive',
      use_dept_id: 'dept_sub1_zh', use_user_id: 'u_sub1_admin',
      location: '子公司A会议室', is_public: 1, is_leader_asset: 0,
      produced_by: 'purchase'
    },
    {
      id: 'a_010', asset_code: 'ZH-2026-00008', asset_name: '已报废旧投影仪',
      category_l1: 'non_operating', category_l2: 'office_equipment', asset_type: 'fixed_asset',
      unit_price: 4200, quantity: 1, original_value: 4200, residual_rate: 0.05,
      useful_life_years: 6, acc_depreciation: 4200, book_value: 0,
      enable_date: '2020-03-01', status: 'scrapped', owner_org_id: 'org_hq',
      manage_dept_id: 'dept_zh', manage_dept_role: 'comprehensive',
      use_dept_id: 'dept_zh', use_user_id: null,
      location: '已处置', is_public: 1, is_leader_asset: 0,
      produced_by: 'purchase', scrap_type: 'normal'
    }
  ];
  storage.set('assets', assets);

  // ============ 年度预算 ============
  storage.set('budgets', [
    { id: 'b_001', budget_year: 2026, budget_type: 'procurement', dept_id: 'dept_sz', manage_dept_id: 'dept_sz', org_id: 'org_hq', total_amount: 500000, used_amount: 9800, status: 'approved' },
    { id: 'b_002', budget_year: 2026, budget_type: 'procurement', dept_id: 'dept_zh', manage_dept_id: 'dept_zh', org_id: 'org_hq', total_amount: 800000, used_amount: 38800, status: 'approved' },
    { id: 'b_003', budget_year: 2026, budget_type: 'maintenance', dept_id: 'dept_zh', manage_dept_id: 'dept_zh', org_id: 'org_hq', total_amount: 200000, used_amount: 0, status: 'approved' },
    { id: 'b_004', budget_year: 2026, budget_type: 'renovation', dept_id: 'dept_zf', manage_dept_id: 'dept_zf', org_id: 'org_hq', total_amount: 1500000, used_amount: 0, status: 'approved' }
  ]);

  // ============ 关联方库 ============
  storage.set('related_parties', [
    { id: 'rp_001', name: '成都农交所控股子公司A', credit_code: '91510100MA68XXXX1X', relationship: 'subsidiary' },
    { id: 'rp_002', name: '成都交易集团有限公司', credit_code: '91510100MA68XXXX2X', relationship: 'parent' },
    { id: 'rp_003', name: '成都农交所控股子公司B', credit_code: '91510100MA68XXXX3X', relationship: 'fellow_subsidiary' }
  ]);

  // ============ 评估机构库 ============
  storage.set('appraisal_orgs', [
    { id: 'ao_001', org_name: '四川XX资产评估有限公司', qualification_no: '川资评字第001号', qualification_level: 'AAA', business_scope: '各类资产评估', validity_date: '2027-12-31', is_blacklisted: 0, rating_score: 4.8 },
    { id: 'ao_002', org_name: '成都YY房地产评估有限公司', qualification_no: '成房评字第002号', qualification_level: 'AA', business_scope: '房地产评估', validity_date: '2027-06-30', is_blacklisted: 0, rating_score: 4.5 }
  ]);

  // ============ 审批实例(待办) ============
  storage.set('approval_instances', [
    { id: 'ai_001', biz_type: 'inbound', biz_id: 'temp_inbound_001', initiator_user_id: 'u_yw1_admin', initiator_name: '周一部', current_step: 2, status: 'running', start_time: '2026-07-10 10:00:00', title: '业务一部-办公电脑采购入库申请', amount: 9800, summary: '联想ThinkPad X1 Carbon 1台' },
    { id: 'ai_002', biz_type: 'scrap', biz_id: 'temp_scrap_001', initiator_user_id: 'u_zh_mgr', initiator_name: '张综合', current_step: 3, status: 'running', start_time: '2026-07-08 14:00:00', title: '综合部-旧投影仪报废申请', amount: 0, summary: '已提足折旧,无法修复' },
    { id: 'ai_003', biz_type: 'receive', biz_id: 'temp_receive_001', initiator_user_id: 'u_emp1', initiator_name: '吴员工', current_step: 1, status: 'running', start_time: '2026-07-15 09:00:00', title: '吴员工-领用闲置办公桌', amount: 2800, summary: '申请领用闲置资产a_008' }
  ]);

  // ============ 三重一大决策 ============
  storage.set('major_decisions', [
    { id: 'md_001', md_no: 'MD202607001', biz_type: 'asset_disposal', biz_id: 'a_003', amount: 5800000, trigger_rule: '单笔处置≥100万', party_committee_meeting_id: null, decision_meeting_type: 'board', decision_meeting_id: null, decision_result: 'pending', recording_url: '', video_url: '', minutes_url: '', participants: [], archive_date: null, status: 'pending_party_review', title: '天府大道经营用房A栋处置', created_at: '2026-07-12 10:00:00' }
  ]);

  // ============ 产权登记 ============
  storage.set('property_registrations', [
    { id: 'pr_001', pr_no: 'PR202601001', registration_type: 'possession', asset_id: 'a_001', org_id: 'org_hq', property_right_nature: 'state_owned', registration_date: '2026-01-16', sasac_filing_no: '川国资产权〔2026〕001号', sasac_filing_date: '2026-01-20', certificate_url: '', status: 'registered' }
  ]);

  // 产权变动日志(含逾期示例)
  storage.set('property_changes', [
    { id: 'pcl_001', asset_id: 'a_010', change_type: 'disposal', before_value: 4200, after_value: 0, change_date: '2026-06-10', is_registered: false, overdue_alert: false }
  ]);

  // ============ 追责记录 ============
  storage.set('violations', [
    { id: 'v_001', violation_no: 'V202606001', violation_type: 'V1', asset_id: 'a_008', responsible_user_id: 'u_yw1_admin', responsible_user_name: '周一部', violation_desc: '办公桌长期闲置未及时上报', penalty_type: 'admonishment', penalty_detail: '诫勉谈话,限期整改', signoff_discipline: true, signoff_risk_legal: true, archive_date: '2026-06-20', status: 'closed' }
  ]);

  // ============ SOE KPI ============
  storage.set('kpi_indicators', [
    { id: 'k_001', indicator_code: 'value_preservation_rate', indicator_name: '国有资产保值增值率', indicator_type: 'value_preservation', target_value: 1.0, actual_value: 1.05, achievement_rate: 1.05, evaluation_period: '2026-Q2', status: 'achieved' },
    { id: 'k_002', indicator_code: 'idle_rate', indicator_name: '固定资产闲置率', indicator_type: 'idle_rate', target_value: 5.0, actual_value: 2.1, achievement_rate: 1.0, evaluation_period: '2026-Q2', status: 'achieved' }
  ]);

  // ============ 国资报送 ============
  storage.set('sasac_reports', [
    { id: 'sr_001', report_no: 'SR202606001', report_type: 'monthly_stats', report_period: '2026-06', generated_by_ai: true, submit_user_id: 'u_cw_mgr', submit_date: '2026-07-05 10:00:00', sasac_receipt_no: '川国资回执〔2026〕06号', status: 'acknowledged' }
  ]);

  // ============ 子公司制度备案 ============
  storage.set('subsidiary_policies', [
    { id: 'sp_001', subsidiary_org_id: 'org_sub_1', policy_name: '子公司A资产管理制度(2026版)', policy_file_url: '', submit_date: '2026-07-01', comprehensive_audit_user_id: null, audit_status: 'pending', audit_opinion: '' }
  ]);

  storage.set('mock_initialized', true);
}

module.exports = { initMockData };
