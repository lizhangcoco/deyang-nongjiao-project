// pages/asset-list/asset-list.js
const { assetApi } = require('../../utils/api.js');
const { ASSET_STATUS, ASSET_CATEGORY_L2, findLabel } = require('../../utils/enum.js');

Page({
  data: {
    list: [],
    keyword: '',
    filters: {
      category_l1: '',
      status: ''
    },
    statusOptions: ASSET_STATUS,
    categoryTabs: [
      { value: '', label: '全部' },
      { value: 'operating', label: '经营性' },
      { value: 'non_operating', label: '非经营性' }
    ],
    activeCategory: '',
    activeStatus: '',
    loading: false
  },

  onShow() {
    this.loadData();
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  },

  loadData() {
    this.setData({ loading: true });
    const filters = { ...this.data.filters };
    if (this.data.keyword) filters.keyword = this.data.keyword;
    const list = assetApi.list(filters);
    this.setData({ list, loading: false });
  },

  onSearchInput(e) {
    this.setData({ keyword: e.detail.value });
  },

  onSearch() {
    this.loadData();
  },

  onCategoryTap(e) {
    const val = e.currentTarget.dataset.value;
    this.setData({
      activeCategory: val,
      'filters.category_l1': val
    });
    this.loadData();
  },

  onStatusChange(e) {
    const val = this.data.statusOptions[e.detail.value].value;
    this.setData({
      activeStatus: val,
      'filters.status': val
    });
    this.loadData();
  },

  onAssetTap(e) {
    const id = e.detail.asset.id;
    wx.navigateTo({ url: `/pages/asset-detail/asset-detail?id=${id}` });
  },

  onScanCode() {
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({ url: `/pages/asset-detail/asset-detail?code=${res.result}` });
      }
    });
  },

  onAdd() {
    wx.navigateTo({ url: '/pages/asset-inbound/asset-inbound' });
  }
});
