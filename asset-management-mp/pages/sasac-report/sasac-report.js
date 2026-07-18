// pages/sasac-report/sasac-report.js
const { sasacReportApi, soe } = require('../../utils/api.js');
const { SASAC_REPORT_TYPE, findLabel } = require('../../utils/enum.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    list: [],
    kpi: null,
    canSign: false,
    reportTypeOptions: SASAC_REPORT_TYPE,
    reportTypeIndex: 0,
    showForm: false,
    form: {
      report_type: 'monthly_stats',
      report_period: '',
      content: ''
    }
  },
  onShow() {
    this.setData({
      list: sasacReportApi.list().map(r => ({ ...r, type_label: findLabel(SASAC_REPORT_TYPE, r.report_type) })),
      kpi: soe.calculateKPI('', '', null),
      canSign: auth.canDo('sign_sasac_report')
    });
  },
  onToggleForm() {
    this.setData({ showForm: !this.data.showForm });
  },
  onTypeChange(e) {
    this.setData({ reportTypeIndex: e.detail.value, 'form.report_type': this.data.reportTypeOptions[e.detail.value].value });
  },
  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },
  onAutoGenerate() {
    const kpi = soe.calculateKPI('', '', null);
    const content = `【AI自动生成国资监管报告】\n报告期：${this.data.form.report_period}\n\n1. 资产存量：${kpi.total_assets}项，原值合计¥${kpi.total_value}\n2. 资产利用率：${kpi.utilization_rate}%\n3. 闲置率：${kpi.idle_rate}%\n4. 闲置资产：${kpi.idle_count}项\n\n建议加强闲置资产盘活。`;
    this.setData({ 'form.content': content });
    wx.showToast({ title: 'AI已生成', icon: 'success' });
  },
  onSubmit() {
    const f = this.data.form;
    if (!f.report_period) {
      wx.showToast({ title: '请填写报告期', icon: 'none' });
      return;
    }
    const report = sasacReportApi.create({
      report_type: f.report_type,
      report_period: f.report_period,
      report_content: f.content
    });
    wx.showModal({
      title: '报告已生成',
      content: `编号：${report.report_no}\n下一步：财务部+综合部联合复核 → 分管领导审签 → 法定代表人签发 → 推送国资监管平台`,
      showCancel: false,
      success: () => {
        this.setData({ showForm: false, list: sasacReportApi.list().map(r => ({ ...r, type_label: findLabel(SASAC_REPORT_TYPE, r.report_type) })) });
      }
    });
  }
});
