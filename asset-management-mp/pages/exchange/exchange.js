// pages/exchange/exchange.js
const { exchangeApi, assetApi, soe } = require('../../utils/api.js');
const { EXCHANGE_TYPE, findLabel } = require('../../utils/enum.js');

Page({
  data: {
    asset: null,
    list: [],
    form: {
      transaction_type: 'transfer',
      listing_platform: 'cd_rural_exchange',
      listing_price: '',
      appraisal_value: '',
      annual_rent: '',
      bidding_method: 'public_auction'
    },
    typeOptions: EXCHANGE_TYPE,
    typeIndex: 0,
    platformOptions: [
      { value: 'cd_rural_exchange', label: '成都农村产权交易所' },
      { value: 'cd_property_exchange', label: '成都产权交易所' }
    ],
    platformIndex: 0,
    showForm: false,
    exchangeCheck: null,
    priceCheck: null
  },
  onLoad(options) {
    this.setData({ list: exchangeApi.list() });
    if (options.assetId) {
      const asset = assetApi.getById(options.assetId);
      this.setData({ asset, showForm: true, 'form.appraisal_value': asset.book_value });
    }
  },
  onToggleForm() {
    this.setData({ showForm: !this.data.showForm });
  },
  onTypeChange(e) {
    this.setData({ typeIndex: e.detail.value, 'form.transaction_type': this.data.typeOptions[e.detail.value].value });
    this.runCheck();
  },
  onPlatformChange(e) {
    this.setData({ platformIndex: e.detail.value, 'form.listing_platform': this.data.platformOptions[e.detail.value].value });
  },
  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
    if (['listing_price', 'appraisal_value', 'annual_rent'].includes(field)) {
      setTimeout(() => this.runCheck(), 100);
    }
  },
  runCheck() {
    const f = this.data.form;
    const exchangeCheck = soe.checkExchangeRequired(f.transaction_type, Number(f.annual_rent || 0));
    const priceCheck = soe.validateListingPrice(Number(f.listing_price || 0), Number(f.appraisal_value || 0));
    this.setData({ exchangeCheck, priceCheck });
  },
  onSubmit() {
    const f = this.data.form;
    if (!f.listing_price || !f.appraisal_value) {
      wx.showToast({ title: '请完善信息', icon: 'none' });
      return;
    }
    const exchangeCheck = soe.checkExchangeRequired(f.transaction_type, Number(f.annual_rent || 0));
    if (!exchangeCheck.required) {
      wx.showToast({ title: '该交易未达进场阈值', icon: 'none' });
      return;
    }
    const priceCheck = soe.validateListingPrice(Number(f.listing_price), Number(f.appraisal_value));
    if (!priceCheck.passed) {
      wx.showModal({ title: '挂牌价校验失败', content: priceCheck.reason, showCancel: false });
      return;
    }
    const listing = exchangeApi.create({
      asset_id: this.data.asset ? this.data.asset.id : '',
      transaction_type: f.transaction_type,
      listing_platform: f.listing_platform,
      listing_price: Number(f.listing_price),
      appraisal_value: Number(f.appraisal_value),
      bidding_method: f.bidding_method,
      listing_period_start: new Date().toISOString().split('T')[0],
      listing_period_end: '',
      status: 'listing'
    });
    wx.showModal({
      title: '挂牌成功',
      content: `挂牌编号：${listing.el_no}\n公示期不少于20个工作日\n挂牌结束后将公示交易结果(企业内网+国资委网站)`,
      showCancel: false,
      success: () => {
        this.setData({ list: exchangeApi.list(), showForm: false });
      }
    });
  }
});
