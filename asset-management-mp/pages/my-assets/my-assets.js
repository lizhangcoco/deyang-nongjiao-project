// pages/my-assets/my-assets.js
const { assetApi } = require('../../utils/api.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    user: null,
    list: [],
    stats: {}
  },
  onShow() {
    const user = auth.getCurrentUser();
    if (!user) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    // 普通员工:仅本人名下
    let list = assetApi.list();
    if (!auth.isSuperAdmin() && !auth.hasAnyRole(['comprehensive', 'digital_center', 'strategy', 'finance'])) {
      list = list.filter(a => a.use_user_id === user.id);
    }
    this.setData({
      user,
      list,
      stats: {
        total: list.length,
        in_use: list.filter(a => a.status === 'in_use').length,
        idle: list.filter(a => a.status === 'idle').length
      }
    });
  },
  onAssetTap(e) {
    const id = e.detail.asset.id;
    wx.navigateTo({ url: `/pages/asset-detail/asset-detail?id=${id}` });
  },
  onLogout() {
    wx.showModal({
      title: '确认退出登录',
      success: (r) => {
        if (r.confirm) {
          auth.logout();
          wx.redirectTo({ url: '/pages/login/login' });
        }
      }
    });
  }
});
