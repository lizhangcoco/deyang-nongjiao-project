// pages/inventory/inventory.js
const { inventoryApi, assetApi } = require('../../utils/api.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    list: [],
    canInitiate: false
  },
  onShow() {
    this.setData({
      list: inventoryApi.list(),
      canInitiate: auth.hasAnyRole(['comprehensive', 'digital_center', 'strategy', 'super_admin'])
    });
  },
  onCreate() {
    wx.showActionSheet({
      itemList: ['年终全资产大盘', '不定期抽查'],
      success: (res) => {
        const invType = res.tapIndex === 0 ? 'annual_full' : 'spot_check';
        const inv = inventoryApi.create({
          inv_type: invType,
          inv_year: new Date().getFullYear(),
          inv_scope: '全部资产',
          initiator_dept_id: auth.getCurrentUser().dept_id,
          start_date: new Date().toISOString().split('T')[0],
          participants: {
            manage_dept: auth.getCurrentUser().dept_id,
            use_dept: '',
            finance: ''
          }
        });
        wx.navigateTo({ url: `/pages/inventory-scan/inventory-scan?invId=${inv.id}` });
      }
    });
  },
  onEnterScan(e) {
    const invId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/inventory-scan/inventory-scan?invId=${invId}` });
  }
});
