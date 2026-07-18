// pages/appraisal/appraisal.js
const { appraisalApi, assetApi, soe } = require('../../utils/api.js');
const { APPRAISAL_PURPOSE, findLabel } = require('../../utils/enum.js');

Page({
  data: {
    asset: null,
    list: [],
    orgs: [],
    orgIndex: 0,
    form: {
      appraisal_purpose: 'disposal',
      appraisal_base_date: '',
      appraisal_method: 'cost',
      book_value: '',
      appraisal_value: '',
      selected_org_id: ''
    },
    purposeOptions: APPRAISAL_PURPOSE,
    purposeIndex: 0,
    methodOptions: [
      { value: 'cost', label: '成本法' },
      { value: 'market', label: '市场法' },
      { value: 'income', label: '收益法' }
    ],
    methodIndex: 0,
    showForm: false
  },
  onLoad(options) {
    this.setData({
      orgs: appraisalApi.listOrgs(),
      list: appraisalApi.listReports()
    });
    if (options.assetId) {
      const asset = assetApi.getById(options.assetId);
      const appraisalCheck = soe.checkAppraisalRequired(asset.book_value, 'disposal');
      this.setData({
        asset,
        showForm: true,
        'form.book_value': asset.book_value
      });
      if (!appraisalCheck.required) {
        wx.showToast({ title: '该资产未达强制评估阈值', icon: 'none' });
      }
    }
  },
  onToggleForm() {
    this.setData({ showForm: !this.data.showForm });
  },
  onPurposeChange(e) {
    this.setData({ purposeIndex: e.detail.value, 'form.appraisal_purpose': this.data.purposeOptions[e.detail.value].value });
  },
  onMethodChange(e) {
    this.setData({ methodIndex: e.detail.value, 'form.appraisal_method': this.data.methodOptions[e.detail.value].value });
  },
  onOrgChange(e) {
    this.setData({ orgIndex: e.detail.value, 'form.selected_org_id': this.data.orgs[e.detail.value].id });
  },
  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },
  onSubmit() {
    const f = this.data.form;
    if (!f.selected_org_id || !f.appraisal_value) {
      wx.showToast({ title: '请完善评估信息', icon: 'none' });
      return;
    }
    const book = Number(f.book_value);
    const appr = Number(f.appraisal_value);
    const premium = book > 0 ? ((appr - book) / book * 100).toFixed(2) : 'N/A';
    const report = appraisalApi.createReport({
      asset_id: this.data.asset ? this.data.asset.id : '',
      appraisal_org_id: f.selected_org_id,
      appraisal_purpose: f.appraisal_purpose,
      appraisal_base_date: f.appraisal_base_date,
      appraisal_method: f.appraisal_method,
      book_value: book,
      appraisal_value: appr,
      appraisal_premium_rate: premium,
      filing_status: 'not_filed'
    });
    wx.showModal({
      title: '评估报告已生成',
      content: `报告编号：${report.ar_no}\n评估价值：¥${appr}\n增值率：${premium}%\n下一步：报国资委备案`,
      showCancel: false,
      success: () => {
        this.setData({ list: appraisalApi.listReports(), showForm: false });
      }
    });
  }
});
