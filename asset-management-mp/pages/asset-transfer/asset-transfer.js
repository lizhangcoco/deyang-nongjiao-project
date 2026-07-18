// pages/asset-transfer/asset-transfer.js
const { assetApi, receiveTransferApi } = require('../../utils/api.js');
const auth = require('../../utils/auth.js');
const storage = require('../../utils/storage.js');

Page({
  data: {
    asset: null,
    toDeptId: '',
    deptOptions: [],
    deptIndex: -1,
    scope: 'internal'
  },
  onLoad(options) {
    if (options.assetId) {
      const asset = assetApi.getById(options.assetId);
      const depts = storage.get('depts', []).filter(d => d.org_id === auth.getCurrentUser().org_id && d.id !== asset.use_dept_id);
      this.setData({ asset, deptOptions: depts });
    }
  },
  onDeptChange(e) {
    this.setData({ deptIndex: e.detail.value, toDeptId: this.data.deptOptions[e.detail.value].id });
  },
  onScopeChange(e) {
    this.setData({ scope: e.detail.value });
  },
  onSubmit() {
    if (!this.data.toDeptId) {
      wx.showToast({ title: '请选择调入部门', icon: 'none' });
      return;
    }
    receiveTransferApi.createTransfer({
      asset_id: this.data.asset.id,
      asset_code: this.data.asset.asset_code,
      asset_name: this.data.asset.asset_name,
      from_dept_id: this.data.asset.use_dept_id,
      to_dept_id: this.data.toDeptId,
      transfer_scope: this.data.scope
    });
    wx.showModal({
      title: '调拨申请已提交',
      content: '流程：调出方确认 → 调入方确认 → 归口部门审批 → 自动更新台账+电子标牌+财务同步',
      showCancel: false,
      success: () => wx.navigateBack()
    });
  }
});
