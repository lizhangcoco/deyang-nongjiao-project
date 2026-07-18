// pages/dashboard/dashboard.js
const { assetApi, approvalApi } = require('../../utils/api.js');
const { getCurrentUser, canAccessMenu } = require('../../utils/auth.js');
const { soe } = require('../../utils/api.js');

Page({
  data: {
    user: null,
    stats: {},
    myApprovals: [],
    overdueList: [],
    menus: []
  },

  onShow() {
    const user = getCurrentUser();
    if (!user) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    this.setData({ user });
    this.loadData();
    this.buildMenus();
  },

  loadData() {
    const stats = assetApi.statistics();
    const myApprovals = approvalApi.listMyPending().slice(0, 3);
    // SOE逾期预警
    const overdueList = require('../../utils/api.js').propertyRegApi ? [] : [];
    const storage = require('../../utils/storage.js');
    const overdue = storage.get('property_changes', []).filter(c => c.overdue_alert && !c.is_registered);
    this.setData({ stats, myApprovals, overdueList: overdue });
  },

  buildMenus() {
    const allMenus = [
      { key: 'asset_inbound', icon: '📥', name: '资产入库', url: '/pages/asset-inbound/asset-inbound' },
      { key: 'asset_scrap', icon: '🗑️', name: '资产报废', url: '/pages/asset-scrap/asset-scrap' },
      { key: 'asset_receive', icon: '📤', name: '资产领用', url: '/pages/asset-receive/asset-receive' },
      { key: 'asset_transfer', icon: '🔀', name: '资产调拨', url: '/pages/asset-transfer/asset-transfer' },
      { key: 'inventory', icon: '📋', name: '资产盘点', url: '/pages/inventory/inventory' },
      { key: 'major_decision', icon: '⚖️', name: '三重一大', url: '/pages/major-decision/major-decision' },
      { key: 'property_reg', icon: '🏛️', name: '产权登记', url: '/pages/property-reg/property-reg' },
      { key: 'appraisal', icon: '💯', name: '资产评估', url: '/pages/appraisal/appraisal' },
      { key: 'exchange', icon: '🏪', name: '进场交易', url: '/pages/exchange/exchange' },
      { key: 'sasac_report', icon: '📊', name: '国资报送', url: '/pages/sasac-report/sasac-report' },
      { key: 'leave_clearance', icon: '🚪', name: '离职清收', url: '/pages/leave-clearance/leave-clearance' },
      { key: 'ai_assistant', icon: '🤖', name: 'AI助手', url: '/pages/ai-assistant/ai-assistant' },
      { key: 'archive', icon: '📁', name: '档案中心', url: '/pages/archive/archive' },
      { key: 'violation', icon: '⚠️', name: '违规追责', url: '/pages/violation/violation' }
    ];
    const menus = allMenus.filter(m => canAccessMenu(m.key));
    this.setData({ menus });
  },

  onMenuTap(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({ url });
  },

  onApprovalTap(e) {
    wx.switchTab({ url: '/pages/approval-list/approval-list' });
  },

  onScanCode() {
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({ url: `/pages/asset-detail/asset-detail?code=${res.result}` });
      },
      fail: () => {
        wx.showToast({ title: '扫码取消', icon: 'none' });
      }
    });
  }
});
