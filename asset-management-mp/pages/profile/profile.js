// pages/profile/profile.js
const auth = require('../../utils/auth.js');
const { subsidiaryPolicyApi } = require('../../utils/api.js');

Page({
  data: {
    user: null,
    policies: [],
    canAudit: false
  },
  onShow() {
    const user = auth.getCurrentUser();
    if (!user) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    this.setData({
      user,
      policies: subsidiaryPolicyApi.list(),
      canAudit: auth.canDo('audit_subsidiary_policy')
    });
  },
  onAudit(e) {
    const id = e.currentTarget.dataset.id;
    const action = e.currentTarget.dataset.action;
    wx.showModal({
      title: action === 'approve' ? '审核通过' : '审核驳回',
      content: '请输入审核意见',
      editable: true,
      success: (r) => {
        if (r.confirm) {
          subsidiaryPolicyApi.audit(id, action === 'approve' ? 'approved' : 'rejected', r.content || '');
          this.setData({ policies: subsidiaryPolicyApi.list() });
        }
      }
    });
  },
  onLogout() {
    wx.showModal({
      title: '退出登录',
      success: (r) => {
        if (r.confirm) {
          auth.logout();
          wx.redirectTo({ url: '/pages/login/login' });
        }
      }
    });
  }
});
