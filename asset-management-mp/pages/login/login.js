// pages/login/login.js
const { userApi } = require('../../utils/api.js');
const { isLoggedIn } = require('../../utils/auth.js');
const storage = require('../../utils/storage.js');

Page({
  data: {
    phone: '',
    password: '',
    quickAccounts: []
  },

  onLoad() {
    if (isLoggedIn()) {
      wx.switchTab({ url: '/pages/dashboard/dashboard' });
      return;
    }
    // 加载快速登录账号
    const users = storage.get('users', []);
    this.setData({
      quickAccounts: users.map(u => ({
        id: u.id,
        name: u.real_name,
        role: (Array.isArray(u.role_codes) ? u.role_codes[0] : u.role_codes),
        phone: u.phone
      }))
    });
  },

  onPhoneInput(e) { this.setData({ phone: e.detail.value }); },
  onPasswordInput(e) { this.setData({ password: e.detail.value }); },

  onLogin() {
    if (!this.data.phone || !this.data.password) {
      wx.showToast({ title: '请输入手机号和密码', icon: 'none' });
      return;
    }
    const res = userApi.loginByPhone(this.data.phone, this.data.password);
    if (!res.success) {
      wx.showToast({ title: res.message, icon: 'none' });
      return;
    }
    wx.showToast({ title: '登录成功', icon: 'success' });
    setTimeout(() => wx.switchTab({ url: '/pages/dashboard/dashboard' }), 500);
  },

  // 快速登录(开发演示用)
  onQuickLogin(e) {
    const userId = e.currentTarget.dataset.id;
    const res = userApi.quickLogin(userId);
    if (res.success) {
      wx.showToast({ title: '已切换为' + res.user.real_name, icon: 'none' });
      setTimeout(() => wx.switchTab({ url: '/pages/dashboard/dashboard' }), 500);
    }
  }
});
