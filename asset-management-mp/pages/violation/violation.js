// pages/violation/violation.js
const { violationApi } = require('../../utils/api.js');
const { VIOLATION_TYPE, PENALTY_TYPE, findLabel } = require('../../utils/enum.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    list: [],
    canRecord: false,
    showForm: false,
    form: {
      violation_type: 'V1',
      asset_id: '',
      responsible_user_name: '',
      violation_desc: '',
      penalty_type: 'admonishment',
      penalty_detail: ''
    },
    violationOptions: VIOLATION_TYPE,
    violationIndex: 0,
    penaltyOptions: PENALTY_TYPE,
    penaltyIndex: 0
  },
  onShow() {
    this.setData({
      list: violationApi.list().map(v => ({
        ...v,
        violation_label: findLabel(VIOLATION_TYPE, v.violation_type),
        penalty_label: findLabel(PENALTY_TYPE, v.penalty_type)
      })),
      canRecord: auth.canDo('record_violation')
    });
  },
  onToggleForm() {
    this.setData({ showForm: !this.data.showForm });
  },
  onViolationChange(e) {
    this.setData({ violationIndex: e.detail.value, 'form.violation_type': this.data.violationOptions[e.detail.value].value });
  },
  onPenaltyChange(e) {
    this.setData({ penaltyIndex: e.detail.value, 'form.penalty_type': this.data.penaltyOptions[e.detail.value].value });
  },
  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },
  onSubmit() {
    const f = this.data.form;
    if (!f.violation_desc || !f.responsible_user_name) {
      wx.showToast({ title: '请完善信息', icon: 'none' });
      return;
    }
    const v = violationApi.create({
      violation_type: f.violation_type,
      asset_id: f.asset_id,
      responsible_user_name: f.responsible_user_name,
      violation_desc: f.violation_desc,
      penalty_type: f.penalty_type,
      penalty_detail: f.penalty_detail
    });
    wx.showModal({
      title: '追责记录已创建',
      content: `编号：${v.violation_no}\n绑定资产：${v.asset_id || '无'}\n责任人：${v.responsible_user_name}\n\n纪检+风控法务强制会签后归档(永久存档)`,
      showCancel: false,
      success: () => {
        this.setData({ showForm: false });
        this.onShow();
      }
    });
  }
});
