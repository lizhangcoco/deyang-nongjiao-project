// pages/major-decision/major-decision.js
const { majorDecisionApi } = require('../../utils/api.js');
const { soe } = require('../../utils/api.js');
const { MEETING_TYPE, MAJOR_DECISION_TYPE, findLabel } = require('../../utils/enum.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    list: [],
    showForm: false,
    form: {
      biz_type: 'asset_disposal',
      amount: '',
      title: '',
      trigger_reason: ''
    },
    bizTypeOptions: MAJOR_DECISION_TYPE,
    bizTypeIndex: 0,
    meetingTypeOptions: MEETING_TYPE,
    autoTrigger: null,
    canCreate: false
  },
  onLoad(options) {
    this.setData({ canCreate: auth.canDo('make_major_decision') });
    if (options.bizType && options.amount) {
      // 从其他页面跳转自动触发
      const majorCheck = soe.identifyMajorDecision(options.bizType, Number(options.amount), 'HQ');
      this.setData({
        showForm: true,
        'form.biz_type': options.bizType,
        'form.amount': options.amount,
        autoTrigger: majorCheck
      });
    }
    this.loadList();
  },
  loadList() {
    const list = majorDecisionApi.list().map(item => ({
      ...item,
      biz_type_label: findLabel(MAJOR_DECISION_TYPE, item.biz_type),
      meeting_type_label: findLabel(MEETING_TYPE, item.decision_meeting_type)
    }));
    this.setData({ list });
  },
  onToggleForm() {
    this.setData({ showForm: !this.data.showForm });
  },
  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },
  onBizTypeChange(e) {
    this.setData({ bizTypeIndex: e.detail.value, 'form.biz_type': this.data.bizTypeOptions[e.detail.value].value });
  },
  onSubmit() {
    const f = this.data.form;
    if (!f.amount || !f.title) {
      wx.showToast({ title: '请完善信息', icon: 'none' });
      return;
    }
    const majorCheck = soe.identifyMajorDecision(f.biz_type, Number(f.amount), 'HQ');
    if (!majorCheck.is_major_decision) {
      wx.showToast({ title: '未触发三重一大', icon: 'none' });
      return;
    }
    const md = majorDecisionApi.create({
      biz_type: f.biz_type,
      amount: Number(f.amount),
      title: f.title,
      trigger_rule: majorCheck.triggers.join('、'),
      status: 'pending_party_review'
    });
    wx.showModal({
      title: '已发起三重一大决策',
      content: `决策编号：${md.md_no}\n下一步：党委会前置研究(应到过半+党委成员过半通过)→董事会集体决策(录音录像归档)→区块链存证`,
      showCancel: false,
      success: () => {
        this.setData({ showForm: false, form: { biz_type: 'asset_disposal', amount: '', title: '' } });
        this.loadList();
      }
    });
  },
  onProcess(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.list.find(i => i.id === id);
    if (!item) return;
    let content = '';
    if (item.status === 'pending_party_review') {
      content = '当前：党委会前置研究\n法定人数：应到过半出席+出席过半通过\n完成后进入董事会决策';
    } else if (item.status === 'pending_board_decision') {
      content = '当前：董事会集体决策\n法定人数：应到过半出席+出席过半通过\n全程录音录像+区块链存证';
    }
    wx.showModal({
      title: '决策推进',
      content,
      confirmText: '推进',
      success: (r) => {
        if (r.confirm) {
          if (item.status === 'pending_party_review') {
            majorDecisionApi.submitPartyCommitteeReview(id, { party_review_passed: true });
          } else if (item.status === 'pending_board_decision') {
            majorDecisionApi.submitBoardDecision(id, 'approved', { agree: 5, oppose: 0, abstain: 0 });
          }
          this.loadList();
          wx.showToast({ title: '已推进', icon: 'success' });
        }
      }
    });
  }
});
