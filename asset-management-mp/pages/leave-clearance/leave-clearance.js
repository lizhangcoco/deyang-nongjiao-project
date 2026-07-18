// pages/leave-clearance/leave-clearance.js
const { assetApi } = require('../../utils/api.js');
const storage = require('../../utils/storage.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    leaveUser: null,
    assetList: [],
    canConfirm: false
  },
  onShow() {
    const user = auth.getCurrentUser();
    // 模拟:当前用户作为离职员工
    const allAssets = storage.get('assets', []);
    const myAssets = allAssets.filter(a => a.use_user_id === user.id && a.status !== 'scrapped');
    this.setData({
      leaveUser: user,
      assetList: myAssets.map(a => ({ ...a, action: 'pending' })),
      canConfirm: auth.canDo('unlock_leave_flow')
    });
  },
  onReassign(e) {
    const id = e.currentTarget.dataset.id;
    const list = this.data.assetList.map(a => a.id === id ? { ...a, action: 'reassign' } : a);
    this.setData({ assetList: list });
  },
  onReturn(e) {
    const id = e.currentTarget.dataset.id;
    const list = this.data.assetList.map(a => a.id === id ? { ...a, action: 'returned' } : a);
    this.setData({ assetList: list });
  },
  onConfirmClear() {
    const pending = this.data.assetList.filter(a => a.action === 'pending');
    if (pending.length > 0) {
      wx.showToast({ title: '还有资产未处理', icon: 'none' });
      return;
    }
    // 更新资产状态
    const list = this.data.assetList;
    list.forEach(a => {
      if (a.action === 'returned') {
        assetApi.update(a.id, { use_user_id: null, use_dept_id: 'dept_zh', status: 'idle', location: '综合部回收区' });
      } else if (a.action === 'reassign') {
        // 简化:使用人清空,待分配
        assetApi.update(a.id, { use_user_id: null });
      }
    });
    wx.showModal({
      title: '资产清收完成',
      content: '离职流程已解锁，可继续流转',
      showCancel: false
    });
  }
});
