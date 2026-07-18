// app.js - 成都农交所资产管理小程序 (SOE合规升级版)
const { initMockData } = require('./utils/mock.js');
const { getCurrentUser } = require('./utils/auth.js');

App({
  globalData: {
    // 系统元信息
    systemName: '成都农交所资产管理小程序',
    version: '1.0.0 SOE',
    policyVersion: '成农交【2026】59号',
    effectiveDate: '2026-07-17',
    // 当前登录用户(登录后写入)
    currentUser: null,
    // 全局配置阈值(后台可调,SOE法规优先级最高)
    thresholds: {
      fixedAssetMinPrice: 2000,         // 固资单价阈值
      procurementRedirectMax: 20000,    // 跳采购流程阈值
      maintenanceRedirectMax: 20000,    // 维修跳采购阈值
      subsidiaryParentReview: 500000,   // 子公司推送母公司阈值
      majorDecisionDisposal: 100000,    // 三重一大处置阈值
      majorDecisionProcurement: 500000, // 三重一大采购阈值
      appraisalRequired: 100000,        // 强制评估阈值(账面净值)
      exchangeListingRent: 100000,      // 进场交易年租阈值
      lossSasacFiling: 100000,          // 损失国资委备案阈值
      propertyChangeDeadlineDays: 30,   // 产权变动登记期限
      disclosureMinDays: 20             // 公示期最少工作日
    },
    // AI能力开关
    aiEnabled: true
  },

  onLaunch() {
    // 初始化本地Mock数据(模拟后端)
    initMockData();
    // 恢复登录态
    const user = getCurrentUser();
    if (user) {
      this.globalData.currentUser = user;
    }
    // 检查产权登记逾期
    this.checkPropertyChangeOverdue();
  },

  // 产权变动登记逾期检查(SOE合规)
  checkPropertyChangeOverdue() {
    const storage = require('./utils/storage.js');
    const changes = storage.get('property_changes', []);
    const today = new Date();
    let updated = false;
    changes.forEach(c => {
      if (!c.is_registered && c.change_date) {
        const deadline = new Date(c.change_date);
        deadline.setDate(deadline.getDate() + this.globalData.thresholds.propertyChangeDeadlineDays);
        if (today > deadline && !c.overdue_alert) {
          c.overdue_alert = true;
          updated = true;
        }
      }
    });
    if (updated) storage.set('property_changes', changes);
  }
});
