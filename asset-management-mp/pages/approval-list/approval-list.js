// pages/approval-list/approval-list.js
const { approvalApi } = require('../../utils/api.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    tab: 'pending',
    pendingList: [],
    initiatedList: [],
    allList: []
  },
  onShow() {
    this.setData({
      pendingList: approvalApi.listMyPending(),
      initiatedList: approvalApi.listMyInitiated(),
      allList: auth.isSuperAdmin() ? approvalApi.listAll() : []
    });
  },
  onTabChange(e) {
    this.setData({ tab: e.currentTarget.dataset.tab });
  },
  onApprove(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '审批通过',
      content: '确认通过该审批节点？',
      success: (r) => {
        if (r.confirm) {
          approvalApi.approve(id, '通过');
          this.onShow();
          wx.showToast({ title: '已通过', icon: 'success' });
        }
      }
    });
  },
  onReject(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '审批驳回',
      content: '确认驳回？',
      success: (r) => {
        if (r.confirm) {
          approvalApi.reject(id, '驳回');
          this.onShow();
        }
      }
    });
  }
});
