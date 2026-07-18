// pages/asset-detail/asset-detail.js
const { assetApi, soe } = require('../../utils/api.js');
const { findLabel, ASSET_STATUS, ASSET_CATEGORY_L2, ASSET_TYPE, SCRAP_TYPE } = require('../../utils/enum.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    asset: null,
    showScrapBtn: false,
    showReceiveBtn: false,
    showTransferBtn: false,
    showRepairBtn: false,
    showExchangeBtn: false,
    appraisalRequired: false,
    majorDecisionTriggered: false
  },

  onLoad(options) {
    if (options.id) {
      this.loadAsset(options.id);
    } else if (options.code) {
      const asset = assetApi.getByCode(options.code);
      if (asset) this.loadAsset(asset.id);
      else wx.showToast({ title: '资产不存在', icon: 'none' });
    }
  },

  loadAsset(id) {
    const asset = assetApi.getById(id);
    if (!asset) {
      wx.showToast({ title: '资产不存在', icon: 'none' });
      return;
    }
    // 富化字段标签
    asset.category_l2_label = findLabel(ASSET_CATEGORY_L2, asset.category_l2);
    asset.asset_type_label = findLabel(ASSET_TYPE, asset.asset_type);
    asset.status_label = findLabel(ASSET_STATUS, asset.status);
    if (asset.scrap_type) asset.scrap_type_label = findLabel(SCRAP_TYPE, asset.scrap_type);

    // SOE评估必要性判定
    const appraisalCheck = soe.checkAppraisalRequired(asset.book_value, 'disposal');
    // SOE三重一大识别
    const majorCheck = soe.identifyMajorDecision('asset_disposal', asset.original_value, 'HQ');

    this.setData({
      asset,
      appraisalRequired: appraisalCheck.required,
      majorDecisionTriggered: majorCheck.is_major_decision,
      showScrapBtn: ['in_use', 'idle', 'under_repair'].includes(asset.status) && auth.canDo('initiate_appraisal'),
      showReceiveBtn: asset.status === 'idle',
      showTransferBtn: asset.status === 'in_use' && auth.canDo('edit_asset_card'),
      showRepairBtn: ['in_use', 'idle'].includes(asset.status),
      showExchangeBtn: asset.category_l1 === 'operating' && auth.canDo('initiate_exchange')
    });
  },

  onScrap() {
    wx.navigateTo({ url: `/pages/asset-scrap/asset-scrap?assetId=${this.data.asset.id}` });
  },
  onReceive() {
    wx.navigateTo({ url: `/pages/asset-receive/asset-receive?assetId=${this.data.asset.id}` });
  },
  onTransfer() {
    wx.navigateTo({ url: `/pages/asset-transfer/asset-transfer?assetId=${this.data.asset.id}` });
  },
  onRepair() {
    wx.showToast({ title: '维修申请:跳转维修模块', icon: 'none' });
  },
  onExchange() {
    wx.navigateTo({ url: `/pages/exchange/exchange?assetId=${this.data.asset.id}` });
  },
  onMajorDecision() {
    wx.navigateTo({ url: `/pages/major-decision/major-decision?bizType=asset_disposal&bizId=${this.data.asset.id}&amount=${this.data.asset.original_value}` });
  },
  onAppraisal() {
    wx.navigateTo({ url: `/pages/appraisal/appraisal?assetId=${this.data.asset.id}` });
  }
});
