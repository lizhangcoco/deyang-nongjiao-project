// pages/archive/archive.js
const storage = require('../../utils/storage.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    archives: []
  },
  onShow() {
    const archives = [
      { key: 'assets', name: '资产主台账', icon: '📦', count: storage.get('assets', []).length },
      { key: 'scrap_applications', name: '报废申请档案', icon: '🗑️', count: storage.get('scrap_applications', []).length },
      { key: 'receive_transfer', name: '领用调拨档案', icon: '🔀', count: storage.get('receive_transfer', []).length },
      { key: 'inventories', name: '盘点记录', icon: '📋', count: storage.get('inventories', []).length },
      { key: 'major_decisions', name: '三重一大档案', icon: '⚖️', count: storage.get('major_decisions', []).length },
      { key: 'property_registrations', name: '产权登记档案', icon: '🏛️', count: storage.get('property_registrations', []).length },
      { key: 'appraisal_reports', name: '评估报告档案', icon: '💯', count: storage.get('appraisal_reports', []).length },
      { key: 'exchange_listings', name: '进场交易档案', icon: '🏪', count: storage.get('exchange_listings', []).length },
      { key: 'sasac_reports', name: '国资报送档案', icon: '📊', count: storage.get('sasac_reports', []).length },
      { key: 'violations', name: '追责记录档案', icon: '⚠️', count: storage.get('violations', []).length },
      { key: 'subsidiary_policies', name: '子公司制度备案', icon: '📂', count: storage.get('subsidiary_policies', []).length },
      { key: 'property_changes', name: '产权变动日志', icon: '📝', count: storage.get('property_changes', []).length }
    ];
    this.setData({ archives });
  },
  onTap(e) {
    const key = e.currentTarget.dataset.key;
    wx.showToast({ title: '档案详情:' + key, icon: 'none' });
  }
});
