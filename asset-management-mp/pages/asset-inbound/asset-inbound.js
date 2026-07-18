// pages/asset-inbound/asset-inbound.js
const { assetApi, soe } = require('../../utils/api.js');
const { ASSET_CATEGORY_L2, findLabel } = require('../../utils/enum.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    form: {
      asset_name: '',
      category_l2: '',
      unit_price: '',
      quantity: 1,
      is_batch_long_term: false,
      useful_life_years: '',
      location: '',
      supplier: '',
      budget_id: ''
    },
    categoryOptions: ASSET_CATEGORY_L2,
    categoryIndex: -1,
    // AI判定结果
    judgeResult: null,
    // SOE规则结果
    majorCheck: null,
    appraisalCheck: null,
    budgetCheck: null,
    flowMatch: null
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onCategoryChange(e) {
    const idx = e.detail.value;
    this.setData({ categoryIndex: idx, 'form.category_l2': this.data.categoryOptions[idx].value });
    this.runAIJudge();
  },

  onPriceBlur() {
    this.runAIJudge();
  },

  onBatchChange(e) {
    this.setData({ 'form.is_batch_long_term': e.detail.value });
    setTimeout(() => this.runAIJudge(), 100);
  },

  // AI资产自动判定 + SOE规则联动
  runAIJudge() {
    const f = this.data.form;
    if (!f.category_l2 || !f.unit_price) return;

    // AI-1 资产判定
    const judge = soe.judgeAsset({
      unit_price: Number(f.unit_price),
      quantity: Number(f.quantity),
      is_batch_long_term: f.is_batch_long_term,
      useful_life_years: Number(f.useful_life_years) || 0,
      category_l2: f.category_l2
    });

    // AI-6 预算校验
    const user = auth.getCurrentUser();
    const budgetCheck = soe.checkBudget('procurement', judge.original_value, user.dept_id, new Date().getFullYear());

    // AI-2 审批流匹配
    const flowMatch = soe.matchApprovalFlow('inbound', judge.original_value, 'HQ');

    // AI-7 三重一大识别
    const majorCheck = soe.identifyMajorDecision('procurement', judge.original_value, 'HQ');

    this.setData({
      judgeResult: {
        ...judge,
        category_l2_label: findLabel(ASSET_CATEGORY_L2, judge.category_l2),
        manage_dept_label: findLabel([
          { value: 'comprehensive', label: '综合部' },
          { value: 'digital_center', label: '数字信息中心' },
          { value: 'strategy', label: '战略发展部' }
        ], judge.manage_dept),
        asset_type_label: judge.asset_type === 'fixed_asset' ? '固定资产' : '低值易耗品'
      },
      budgetCheck,
      flowMatch,
      majorCheck
    });
  },

  onSubmit() {
    const f = this.data.form;
    if (!f.asset_name || !f.category_l2 || !f.unit_price || !f.location) {
      wx.showToast({ title: '请完善必填字段', icon: 'none' });
      return;
    }
    if (!this.data.judgeResult) {
      wx.showToast({ title: '请先完成AI判定', icon: 'none' });
      return;
    }
    // 预算拦截
    if (!this.data.budgetCheck.passed) {
      wx.showModal({
        title: '预算拦截',
        content: this.data.budgetCheck.reason,
        confirmText: '追加预算',
        success: (r) => {
          if (r.confirm) wx.showToast({ title: '跳转追加预算流程', icon: 'none' });
        }
      });
      return;
    }
    // 三重一大拦截
    if (this.data.majorCheck.is_major_decision) {
      wx.showModal({
        title: '触发三重一大',
        content: `触发：${this.data.majorCheck.triggers.join('、')}，需先完成党委会前置研究`,
        confirmText: '去发起',
        success: (r) => {
          if (r.confirm) {
            wx.navigateTo({ url: `/pages/major-decision/major-decision?bizType=procurement&amount=${this.data.judgeResult.original_value}` });
          }
        }
      });
      return;
    }
    // 跳转采购流程
    if (this.data.flowMatch.redirect === 'procurement') {
      wx.showModal({
        title: '跳转采购流程',
        content: '单价>20000元，自动跳转《采购管理办法》流程',
        showCancel: false
      });
      return;
    }

    // 创建资产
    const j = this.data.judgeResult;
    const asset = assetApi.create({
      asset_name: f.asset_name,
      category_l1: j.category_l1,
      category_l2: j.category_l2,
      asset_type: j.asset_type,
      unit_price: Number(f.unit_price),
      quantity: Number(f.quantity),
      original_value: j.original_value,
      residual_rate: j.asset_type === 'fixed_asset' ? 0.05 : 0,
      useful_life_years: Number(f.useful_life_years) || 0,
      enable_date: new Date().toISOString().split('T')[0],
      manage_dept_id: '',
      manage_dept_role: j.manage_dept,
      use_dept_id: auth.getCurrentUser().dept_id,
      use_user_id: auth.getCurrentUser().id,
      location: f.location,
      is_public: 0,
      is_leader_asset: 0,
      produced_by: 'purchase',
      supplier: f.supplier,
      batch_no: f.is_batch_long_term ? `BATCH_${Date.now()}` : null,
      is_batch_long_term: f.is_batch_long_term
    });

    wx.showModal({
      title: '入库成功',
      content: `资产编号：${asset.asset_code}\nAI判定：${j.asset_type_label}\n归口部门：${j.manage_dept_label}\n已自动生成电子标牌+产权占有登记申请`,
      showCancel: false,
      success: () => wx.navigateBack()
    });
  }
});
