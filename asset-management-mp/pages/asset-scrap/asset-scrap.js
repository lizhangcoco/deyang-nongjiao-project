// pages/asset-scrap/asset-scrap.js
const { assetApi, scrapApi, soe } = require('../../utils/api.js');
const { SCRAP_TYPE, findLabel } = require('../../utils/enum.js');

Page({
  data: {
    asset: null,
    form: {
      scrap_type: 'normal',
      scrap_reason: '',
      is_large_equipment: false,
      has_special_regulation: false,
      is_transfer_out: false
    },
    scrapTypeOptions: SCRAP_TYPE,
    scrapTypeIndex: 0,
    appraisalRequired: false,
    majorCheck: null,
    flowMatch: null
  },

  onLoad(options) {
    if (options.assetId) {
      const asset = assetApi.getById(options.assetId);
      if (asset) {
        // SOE评估必要性
        const appraisalCheck = soe.checkAppraisalRequired(asset.book_value, 'disposal');
        // SOE三重一大
        const majorCheck = soe.identifyMajorDecision('asset_disposal', asset.original_value, 'HQ');
        // 审批流
        const flowMatch = soe.matchApprovalFlow('scrap', 0, 'HQ');
        this.setData({ asset, appraisalRequired: appraisalCheck.required, majorCheck, flowMatch });
      }
    } else {
      // 列表页
      this.setData({ list: scrapApi.list() });
    }
  },

  onScrapTypeChange(e) {
    const idx = e.detail.value;
    this.setData({ scrapTypeIndex: idx, 'form.scrap_type': this.data.scrapTypeOptions[idx].value });
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onSwitchChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onSubmit() {
    if (!this.data.form.scrap_reason) {
      wx.showToast({ title: '请填写报废事由', icon: 'none' });
      return;
    }
    // 三重一大拦截
    if (this.data.majorCheck && this.data.majorCheck.is_major_decision) {
      wx.showModal({
        title: '触发三重一大',
        content: '资产原值≥100万，需先完成集体决策',
        confirmText: '去发起',
        success: (r) => {
          if (r.confirm) wx.navigateTo({ url: `/pages/major-decision/major-decision?bizType=asset_disposal&bizId=${this.data.asset.id}&amount=${this.data.asset.original_value}` });
        }
      });
      return;
    }
    // 评估拦截
    if (this.data.appraisalRequired) {
      wx.showModal({
        title: '需先评估',
        content: '账面净值≥10万或无账面价值，处置前需强制评估',
        confirmText: '去评估',
        success: (r) => {
          if (r.confirm) wx.navigateTo({ url: `/pages/appraisal/appraisal?assetId=${this.data.asset.id}` });
        }
      });
      return;
    }

    scrapApi.create({
      asset_id: this.data.asset.id,
      asset_code: this.data.asset.asset_code,
      asset_name: this.data.asset.asset_name,
      original_value: this.data.asset.original_value,
      book_value: this.data.asset.book_value,
      scrap_type: this.data.form.scrap_type,
      scrap_reason: this.data.form.scrap_reason,
      is_large_equipment: this.data.form.is_large_equipment,
      has_special_regulation: this.data.form.has_special_regulation,
      is_transfer_out: this.data.form.is_transfer_out
    });

    // 更新资产状态为待报废
    assetApi.updateStatus(this.data.asset.id, 'pending_scrap');

    wx.showModal({
      title: '报废申请已提交',
      content: '审批流：使用部门填报 → 联合处置方案 → 总办会审批 → 处置小组(归口/财务/风控法务/纪检) → 财务核销',
      showCancel: false,
      success: () => wx.navigateBack()
    });
  }
});
