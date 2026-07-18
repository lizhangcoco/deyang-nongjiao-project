// pages/asset-receive/asset-receive.js
const { assetApi, receiveTransferApi, soe } = require('../../utils/api.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    asset: null,
    flowMatch: null,
    isHighValue: false
  },
  onLoad(options) {
    if (options.assetId) {
      const asset = assetApi.getById(options.assetId);
      if (asset) {
        const isHighValue = Number(asset.original_value) > 20000;
        const flowMatch = soe.matchApprovalFlow('receive', asset.original_value, 'HQ', { is_high_value: isHighValue });
        this.setData({ asset, isHighValue, flowMatch });
      }
    }
  },
  onSubmit() {
    receiveTransferApi.createReceive({
      asset_id: this.data.asset.id,
      asset_code: this.data.asset.asset_code,
      asset_name: this.data.asset.asset_name,
      from_dept_id: this.data.asset.use_dept_id,
      to_dept_id: auth.getCurrentUser().dept_id,
      from_user_id: this.data.asset.use_user_id,
      to_user_id: auth.getCurrentUser().id,
      is_high_value: this.data.isHighValue
    });
    wx.showModal({
      title: '领用申请已提交',
      content: `审批流程：${this.data.flowMatch.flow_name}`,
      showCancel: false,
      success: () => wx.navigateBack()
    });
  }
});
